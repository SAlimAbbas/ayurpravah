import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck, Tag, Loader2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RegistrationModal({ isOpen, onClose, preselectedTierId = null, tiers = [] }) {
    const [step, setStep] = useState(1);
    const [tierList, setTierList] = useState(tiers);
    const [selectedTier, setSelectedTier] = useState(null);
    const [formData, setFormData] = useState({
        title: 'Dr.',
        full_name: '',
        email: '',
        phone: '',
        designation: '',
        organisation_college: '',
        city: '',
        state: '',
        country: 'India',
        registration_council_no: '',
        gstin: '',
        coupon_code: '',
    });

    const [couponInput, setCouponInput] = useState('');
    const [couponLoading, setCouponLoading] = useState(false);
    const [couponError, setCouponError] = useState(null);
    const [couponSuccess, setCouponSuccess] = useState(null);
    const [quote, setQuote] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [successResult, setSuccessResult] = useState(null);

    // Fetch tiers if not provided
    useEffect(() => {
        if (tiers && tiers.length > 0) {
            setTierList(tiers);
            if (preselectedTierId) {
                const found = tiers.find(t => t.id === preselectedTierId);
                if (found) setSelectedTier(found);
            } else if (!selectedTier && tiers[0]) {
                setSelectedTier(tiers[0]);
            }
        } else if (isOpen) {
            fetch('/api/tiers')
                .then(r => r.json())
                .then(data => {
                    setTierList(data);
                    if (data && data.length > 0) {
                        setSelectedTier(data[0]);
                    }
                })
                .catch(err => console.error('Error fetching tiers', err));
        }
    }, [isOpen, tiers, preselectedTierId]);

    // Update quote whenever selectedTier or coupon changes
    useEffect(() => {
        if (selectedTier) {
            fetchQuote(selectedTier.id, formData.coupon_code);
        }
    }, [selectedTier]);

    const fetchQuote = async (tierId, coupon) => {
        try {
            const res = await fetch('/api/pricing/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    tier_id: tierId,
                    coupon_code: coupon || null,
                    quantity: 1,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setQuote(data);
                setErrorMsg(null);
            } else {
                // If tier is not available for payment quote, create fallback quote for interest registration
                setQuote({
                    tier_id: tierId,
                    tier_name: selectedTier?.name,
                    subtotal: 0,
                    discount: 0,
                    tax: 0,
                    total: 0,
                    is_free: true,
                });
            }
        } catch (e) {
            console.error('Quote error', e);
        }
    };

    const handleApplyCoupon = async (e) => {
        e.preventDefault();
        if (!couponInput.trim()) return;

        setCouponLoading(true);
        setCouponError(null);
        setCouponSuccess(null);

        try {
            const res = await fetch('/api/pricing/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    tier_id: selectedTier.id,
                    coupon_code: couponInput.trim(),
                    quantity: 1,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setQuote(data);
                setFormData(prev => ({ ...prev, coupon_code: couponInput.trim() }));
                setCouponSuccess(`Coupon applied! Discount: ₹${(data.discount / 100).toFixed(2)}`);
            } else {
                setCouponError(data.error || 'Invalid or expired coupon code.');
            }
        } catch (err) {
            setCouponError('Network error while validating coupon.');
        } finally {
            setCouponLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitRegistration = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        setSubmitting(true);

        const payload = {
            ...formData,
            tier_id: selectedTier.id,
        };

        try {
            const res = await fetch('/api/registrations/draft', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.error || 'Failed to process registration. Please check fields.');
                setSubmitting(false);
                return;
            }

            // If Razorpay order is returned and requires client payment
            if (data.requires_payment && data.order_id && window.Razorpay) {
                const options = {
                    key: data.key_id,
                    amount: data.amount,
                    currency: data.currency,
                    name: 'AYURPRAVAH 2027',
                    description: `Delegate Pass - ${selectedTier.name}`,
                    order_id: data.order_id,
                    prefill: {
                        name: `${formData.title} ${formData.full_name}`,
                        email: formData.email,
                        contact: formData.phone,
                    },
                    theme: {
                        color: '#164a08',
                    },
                    handler: function (response) {
                        // Payment successful via Razorpay modal
                        triggerSuccess({
                            reference: data.reference,
                            uuid: data.registration_uuid,
                            name: `${formData.title} ${formData.full_name}`,
                            tier: selectedTier.name,
                        });
                    },
                    modal: {
                        ondismiss: function () {
                            setSubmitting(false);
                        }
                    }
                };
                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                // Free tier / Pre-registration / Zero amount
                triggerSuccess({
                    reference: data.reference,
                    uuid: data.registration_uuid,
                    name: `${formData.title} ${formData.full_name}`,
                    tier: selectedTier.name,
                });
            }
        } catch (err) {
            setErrorMsg('Network error while processing registration. Please try again.');
            setSubmitting(false);
        }
    };

    const triggerSuccess = (result) => {
        setSubmitting(false);
        setSuccessResult(result);
        setStep(3);
        try {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            });
        } catch (e) {
            // Confetti optional
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-stone-200/60 relative animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0e3005] to-[#164a08] text-white p-6 flex items-center justify-between">
                    <div>
                        <div className="flex items-center space-x-2">
                            <span className="font-hindi text-lg text-[#DFC479]">आयुर प्रवाह</span>
                            <span className="font-heading text-xl font-bold">AYURPRAVAH 2027</span>
                        </div>
                        <p className="text-sm text-[#ECE7D6]/90 font-sans mt-0.5">
                            Official Delegate Registration & Pass Confirmation
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 text-white transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Progress Indicators */}
                {step < 3 && (
                    <div className="bg-[#F7F5EC] px-6 py-3 border-b border-[#164a08]/10 flex items-center justify-between text-sm font-sans">
                        <span className={`font-semibold ${step === 1 ? 'text-[#164a08]' : 'text-gray-400'}`}>
                            1. Select Pass Tier
                        </span>
                        <span className="text-gray-300">→</span>
                        <span className={`font-semibold ${step === 2 ? 'text-[#164a08]' : 'text-gray-400'}`}>
                            2. Delegate Details & Verification
                        </span>
                    </div>
                )}

                {/* Body Content */}
                <div className="p-6 sm:p-8">
                    {errorMsg && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-2 text-sm text-red-700">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    {/* Step 1: Tier Selection */}
                    {step === 1 && (
                        <div className="space-y-5">
                            <h3 className="font-heading text-base font-bold text-[#164a08] uppercase tracking-wider">
                                Choose Delegate Category / Tier
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[360px] overflow-y-auto pr-1">
                                {tierList.map((tier) => {
                                    const isSelected = selectedTier?.id === tier.id;
                                    const isFreeOrTbc = tier.price === 0 || !tier.is_active;

                                    return (
                                        <div
                                            key={tier.id}
                                            onClick={() => setSelectedTier(tier)}
                                            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                                                isSelected
                                                    ? 'border-[#164a08] bg-[#F7F5EC] ring-2 ring-[#164a08]/20 shadow-md'
                                                    : 'border-stone-200 hover:border-[#164a08]/40 bg-white'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <span className="text-xs font-sans font-bold tracking-wider text-[#3e7405] uppercase">
                                                        {tier.category}
                                                    </span>
                                                    <h4 className="font-heading text-base font-bold text-[#164a08]">
                                                        {tier.name}
                                                    </h4>
                                                </div>
                                                <div className="text-right">
                                                    {isFreeOrTbc ? (
                                                        <span className="text-xs font-bold text-[#3e7405] bg-[#3e7405]/10 px-3 py-1 rounded-full">
                                                            {tier.price > 0 ? `₹${(tier.price / 100).toLocaleString()}` : 'Pre-Registration'}
                                                        </span>
                                                    ) : (
                                                        <span className="text-base font-heading font-extrabold text-[#164a08]">
                                                            ₹{(tier.price / 100).toLocaleString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {tier.inclusions && (
                                                <ul className="mt-3 space-y-1.5 text-xs text-[#503323]">
                                                    {tier.inclusions.slice(0, 3).map((inc, i) => (
                                                        <li key={i} className="flex items-center space-x-1.5">
                                                            <CheckCircle className="w-3.5 h-3.5 text-[#164a08] shrink-0" />
                                                            <span className="truncate">{inc}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="pt-4 flex items-center justify-between border-t border-stone-200">
                                <div className="text-sm text-[#3e7405]">
                                    Selected: <strong className="text-[#164a08]">{selectedTier?.name || 'None'}</strong>
                                </div>
                                <button
                                    type="button"
                                    disabled={!selectedTier}
                                    onClick={() => setStep(2)}
                                    className="bg-[#164a08] text-white px-7 py-3 rounded-full text-sm font-heading font-semibold tracking-wider hover:bg-[#0e3005] transition flex items-center space-x-2 disabled:opacity-50 shadow-md"
                                >
                                    <span>CONTINUE TO DETAILS</span>
                                    <ArrowRight className="w-4 h-4 text-[#DFC479]" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Delegate Profile Form & Payment Summary */}
                    {step === 2 && (
                        <form onSubmit={handleSubmitRegistration} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                <div>
                                    <label className="block text-sm font-sans font-semibold text-[#503323] mb-1.5">
                                        Title *
                                    </label>
                                    <select
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full text-sm border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#164a08]/30 focus:border-[#164a08]"
                                        required
                                    >
                                        <option value="Dr.">Dr.</option>
                                        <option value="Prof.">Prof.</option>
                                        <option value="Vaidya">Vaidya</option>
                                        <option value="Mr.">Mr.</option>
                                        <option value="Ms.">Ms.</option>
                                    </select>
                                </div>

                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-sans font-semibold text-[#503323] mb-1.5">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Anand Sharma"
                                        className="w-full text-sm border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#164a08]/30 focus:border-[#164a08]"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-sans font-semibold text-[#503323] mb-1.5">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="doctor@hospital.org"
                                        className="w-full text-sm border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#164a08]/30 focus:border-[#164a08]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-sans font-semibold text-[#503323] mb-1.5">
                                        Phone / WhatsApp *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+91 98765 43210"
                                        className="w-full text-sm border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#164a08]/30 focus:border-[#164a08]"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-sans font-semibold text-[#503323] mb-1.5">
                                        Designation / Specialization
                                    </label>
                                    <input
                                        type="text"
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleInputChange}
                                        placeholder="Ayurveda Consultant / PG Scholar"
                                        className="w-full text-sm border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#164a08]/30 focus:border-[#164a08]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-sans font-semibold text-[#503323] mb-1.5">
                                        Organisation / College
                                    </label>
                                    <input
                                        type="text"
                                        name="organisation_college"
                                        value={formData.organisation_college}
                                        onChange={handleInputChange}
                                        placeholder="Hospital, University, or Clinic"
                                        className="w-full text-sm border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#164a08]/30 focus:border-[#164a08]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-sm font-sans font-semibold text-[#503323] mb-1.5">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="City"
                                        className="w-full text-sm border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#164a08]/30 focus:border-[#164a08]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-sans font-semibold text-[#503323] mb-1.5">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        placeholder="State"
                                        className="w-full text-sm border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#164a08]/30 focus:border-[#164a08]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-sans font-semibold text-[#503323] mb-1.5">
                                        Ayurveda Board Reg No
                                    </label>
                                    <input
                                        type="text"
                                        name="registration_council_no"
                                        value={formData.registration_council_no}
                                        onChange={handleInputChange}
                                        placeholder="Board / Council No."
                                        className="w-full text-sm border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#164a08]/30 focus:border-[#164a08]"
                                    />
                                </div>
                            </div>

                            {/* Coupon Code Section */}
                            <div className="bg-[#F7F5EC] p-4 rounded-2xl border border-[#164a08]/15 mt-3">
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                                        placeholder="PROMO / COUPON CODE"
                                        className="flex-1 text-sm border border-stone-300 rounded-full px-4 py-2 font-mono uppercase focus:ring-2 focus:ring-[#164a08]/30"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleApplyCoupon}
                                        disabled={couponLoading || !couponInput.trim()}
                                        className="bg-[#164a08] text-white px-5 py-2 rounded-full text-sm font-heading font-semibold hover:bg-[#0e3005] disabled:opacity-50 transition shadow-sm"
                                    >
                                        {couponLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'APPLY'}
                                    </button>
                                </div>
                                {couponSuccess && <p className="text-sm text-green-700 mt-2 font-medium">{couponSuccess}</p>}
                                {couponError && <p className="text-sm text-red-600 mt-2">{couponError}</p>}

                                {/* Dynamic Pricing Summary */}
                                {quote && (
                                    <div className="mt-3 pt-3 border-t border-[#164a08]/10 text-sm space-y-1.5 font-sans">
                                        <div className="flex justify-between text-stone-600">
                                            <span>Base Registration:</span>
                                            <span>₹{(quote.subtotal / 100).toFixed(2)}</span>
                                        </div>
                                        {quote.discount > 0 && (
                                            <div className="flex justify-between text-green-700 font-medium">
                                                <span>Coupon Discount:</span>
                                                <span>-₹{(quote.discount / 100).toFixed(2)}</span>
                                            </div>
                                        )}
                                        {quote.tax > 0 && (
                                            <div className="flex justify-between text-stone-600">
                                                <span>GST (18%):</span>
                                                <span>₹{(quote.tax / 100).toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between font-heading font-bold text-base text-[#164a08] pt-2 border-t border-[#164a08]/10">
                                            <span>Payable Total:</span>
                                            <span>₹{(quote.total / 100).toFixed(2)}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="pt-3 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-sm text-stone-500 hover:text-[#164a08] font-medium"
                                >
                                    ← Back to Tiers
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-gradient-to-r from-[#164a08] to-[#164a08] text-white px-7 py-3 rounded-full text-sm font-heading font-bold tracking-wider hover:brightness-110 shadow-md transition flex items-center space-x-2 disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin text-[#DFC479]" />
                                            <span>PROCESSING...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>COMPLETE REGISTRATION</span>
                                            <ArrowRight className="w-4 h-4 text-[#DFC479]" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 3: Confirmation & Ticket View */}
                    {step === 3 && successResult && (
                        <div className="text-center py-8 space-y-5">
                            <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                <CheckCircle className="w-9 h-9" />
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-[#164a08]">
                                Registration Confirmed!
                            </h3>
                            <p className="text-base text-[#503323] max-w-md mx-auto leading-relaxed">
                                Welcome, <strong>{successResult.name}</strong>. Your delegate registration for{' '}
                                <strong>{successResult.tier}</strong> at AYURPRAVAH 2027 is recorded.
                            </p>

                            <div className="bg-[#F7F5EC] p-5 rounded-2xl border border-[#164a08]/20 max-w-sm mx-auto text-sm space-y-2">
                                <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                                    Reference ID
                                </div>
                                <div className="font-mono text-lg font-bold text-[#164a08]">
                                    {successResult.reference}
                                </div>
                                <p className="text-sm text-[#3e7405]">
                                    A confirmation notice has been dispatched to your email and phone.
                                </p>
                            </div>

                            <div className="pt-3 flex justify-center space-x-3">
                                <button
                                    onClick={onClose}
                                    className="bg-[#164a08] text-white px-8 py-3 rounded-full text-sm font-heading font-semibold hover:bg-[#0e3005] transition shadow-md"
                                >
                                    DONE
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
