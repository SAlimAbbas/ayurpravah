import React, { useState, useEffect } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { CheckCircle2, ArrowRight, ShieldCheck, Tag, Loader2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RegisterDelegate({ tiers = [] }) {
    const [selectedTier, setSelectedTier] = useState(tiers[0] || null);
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
    const [confirmedResult, setConfirmedResult] = useState(null);

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
            } else {
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
                setCouponError(data.error || 'Invalid coupon code.');
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
                setErrorMsg(data.error || 'Failed to complete registration.');
                setSubmitting(false);
                return;
            }

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
                    theme: { color: '#164a08' },
                    handler: function () {
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
                triggerSuccess({
                    reference: data.reference,
                    uuid: data.registration_uuid,
                    name: `${formData.title} ${formData.full_name}`,
                    tier: selectedTier.name,
                });
            }
        } catch (err) {
            setErrorMsg('Network error while processing registration.');
            setSubmitting(false);
        }
    };

    const triggerSuccess = (result) => {
        setSubmitting(false);
        setConfirmedResult(result);
        try {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
    };

    return (
        <AppLayout
            title="Official Delegate Registration Portal"
            description="Book your delegate pass for AYURPRAVAH 2027. Choose pass categories, apply promo coupons, and receive verified delegate credentials."
        >
            {() => (
                <div className="py-12 space-y-12">
                    {/* Header */}
                    {/* Header */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                            Official Pass Booking
                        </span>
                        <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-black text-[#164a08]">
                            Delegate Registration
                        </h1>
                        <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg font-sans text-[#503323] leading-relaxed">
                            Complete your registration to access 13 conclaves, keynotes, workshops, the trade expo, and verified CME participation certificate.
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        {confirmedResult ? (
                            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-lg text-center max-w-xl mx-auto space-y-5">
                                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h2 className="font-heading text-2xl font-bold text-[#164a08]">
                                    Registration Successful!
                                </h2>
                                <p className="text-base text-stone-700">
                                    Congratulations <strong>{confirmedResult.name}</strong>. Your pass for <strong>{confirmedResult.tier}</strong> is confirmed.
                                </p>
                                <div className="bg-[#F7F5EC] p-5 rounded-2xl border border-[#164a08]/20 max-w-sm mx-auto">
                                    <div className="text-xs text-stone-500 uppercase tracking-widest font-semibold">
                                        Booking Reference
                                    </div>
                                    <div className="font-mono text-xl font-bold text-[#164a08] mt-1">
                                        {confirmedResult.reference}
                                    </div>
                                </div>
                                <p className="text-sm text-stone-500">
                                    A confirmation email and SMS with your check-in instructions have been dispatched.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left 2 cols: Tier Choice & Form */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Tier Selector */}
                                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-4">
                                        <h3 className="font-heading text-base font-bold text-[#164a08] uppercase tracking-wider">
                                            1. Select Delegate Category
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                            {tiers.map((t) => {
                                                const isSelected = selectedTier?.id === t.id;
                                                return (
                                                    <div
                                                        key={t.id}
                                                        onClick={() => setSelectedTier(t)}
                                                        className={`p-4 rounded-2xl border cursor-pointer transition ${
                                                            isSelected
                                                                ? 'border-[#164a08] bg-[#F7F5EC] ring-2 ring-[#164a08]/20 shadow-md'
                                                                : 'border-stone-200 hover:border-[#164a08]/40 bg-white'
                                                        }`}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <span className="text-xs font-sans font-bold text-[#3e7405] uppercase">
                                                                    {t.category}
                                                                </span>
                                                                <h4 className="font-heading text-base font-bold text-[#164a08]">
                                                                    {t.name}
                                                                </h4>
                                                            </div>
                                                            <div className="font-heading text-base font-bold text-[#164a08]">
                                                                {t.price > 0 ? `₹${(t.price / 100).toLocaleString()}` : 'Pre-Reg'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Delegate Form */}
                                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-5">
                                        <h3 className="font-heading text-base font-bold text-[#164a08] uppercase tracking-wider">
                                            2. Delegate Details
                                        </h3>

                                        {errorMsg && (
                                            <div className="p-4 bg-red-50 text-red-700 text-sm rounded-2xl flex items-center space-x-2">
                                                <AlertCircle className="w-5 h-5 shrink-0" />
                                                <span>{errorMsg}</span>
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmitRegistration} className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                                <div>
                                                    <label className="block text-sm font-semibold text-[#503323] mb-1.5">Title *</label>
                                                    <select
                                                        name="title"
                                                        value={formData.title}
                                                        onChange={handleInputChange}
                                                        className="w-full text-sm border border-stone-300 rounded-xl p-3 bg-white focus:ring-2 focus:ring-[#164a08]/30"
                                                    >
                                                        <option value="Dr.">Dr.</option>
                                                        <option value="Prof.">Prof.</option>
                                                        <option value="Vaidya">Vaidya</option>
                                                        <option value="Mr.">Mr.</option>
                                                        <option value="Ms.">Ms.</option>
                                                    </select>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label className="block text-sm font-semibold text-[#503323] mb-1.5">Full Name *</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        name="full_name"
                                                        value={formData.full_name}
                                                        onChange={handleInputChange}
                                                        className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-sm font-semibold text-[#503323] mb-1.5">Email *</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-[#503323] mb-1.5">Phone / WhatsApp *</label>
                                                    <input
                                                        type="tel"
                                                        required
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-sm font-semibold text-[#503323] mb-1.5">Designation</label>
                                                    <input
                                                        type="text"
                                                        name="designation"
                                                        value={formData.designation}
                                                        onChange={handleInputChange}
                                                        className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-[#503323] mb-1.5">College / Hospital</label>
                                                    <input
                                                        type="text"
                                                        name="organisation_college"
                                                        value={formData.organisation_college}
                                                        onChange={handleInputChange}
                                                        className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <div>
                                                    <label className="block text-sm font-semibold text-[#503323] mb-1.5">City</label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-[#503323] mb-1.5">State</label>
                                                    <input
                                                        type="text"
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={handleInputChange}
                                                        className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-[#503323] mb-1.5">Ayurveda Board Reg No</label>
                                                    <input
                                                        type="text"
                                                        name="registration_council_no"
                                                        value={formData.registration_council_no}
                                                        onChange={handleInputChange}
                                                        className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full bg-[#164a08] text-white py-4 rounded-full font-heading text-sm font-bold tracking-wider hover:bg-[#0e3005] transition flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
                                            >
                                                {submitting ? (
                                                    <Loader2 className="w-5 h-5 animate-spin text-[#DFC479]" />
                                                ) : (
                                                    <>
                                                        <span>CONFIRM & PROCEED</span>
                                                        <ArrowRight className="w-4 h-4 text-[#DFC479]" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                {/* Right col: Order Summary & Coupon */}
                                <div className="space-y-6">
                                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-4">
                                        <h3 className="font-heading text-base font-bold text-[#164a08] uppercase tracking-wider">
                                            Summary & Quote
                                        </h3>

                                        {selectedTier && (
                                            <div className="bg-[#F7F5EC] p-4 rounded-2xl text-sm space-y-1">
                                                <div className="font-heading font-bold text-[#164a08]">
                                                    {selectedTier.name}
                                                </div>
                                                <div className="text-xs text-[#3e7405] uppercase font-semibold">
                                                    Category: {selectedTier.category}
                                                </div>
                                            </div>
                                        )}

                                        {/* Coupon */}
                                        <div className="space-y-2 pt-3 border-t border-stone-200">
                                            <label className="block text-sm font-semibold text-[#503323]">Promo Code</label>
                                            <div className="flex space-x-2">
                                                <input
                                                    type="text"
                                                    placeholder="CODE"
                                                    value={couponInput}
                                                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                                                    className="flex-1 text-sm border border-stone-300 rounded-full px-4 py-2 uppercase font-mono focus:ring-2 focus:ring-[#164a08]/30"
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
                                            {couponSuccess && <p className="text-sm text-green-700 font-medium">{couponSuccess}</p>}
                                            {couponError && <p className="text-sm text-red-600">{couponError}</p>}
                                        </div>

                                        {/* Breakdown */}
                                        {quote && (
                                            <div className="pt-3 border-t border-stone-200 text-sm space-y-2 font-sans">
                                                <div className="flex justify-between text-stone-600">
                                                    <span>Subtotal:</span>
                                                    <span>₹{(quote.subtotal / 100).toFixed(2)}</span>
                                                </div>
                                                {quote.discount > 0 && (
                                                    <div className="flex justify-between text-green-700 font-medium">
                                                        <span>Discount:</span>
                                                        <span>-₹{(quote.discount / 100).toFixed(2)}</span>
                                                    </div>
                                                )}
                                                {quote.tax > 0 && (
                                                    <div className="flex justify-between text-stone-600">
                                                        <span>GST (18%):</span>
                                                        <span>₹{(quote.tax / 100).toFixed(2)}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between font-heading font-bold text-base text-[#164a08] pt-2 border-t border-stone-200">
                                                    <span>Payable Amount:</span>
                                                    <span>₹{(quote.total / 100).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
