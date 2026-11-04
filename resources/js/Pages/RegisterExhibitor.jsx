import React, { useState } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { Store, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export default function RegisterExhibitor() {
    const [formData, setFormData] = useState({
        company: '',
        contact_person: '',
        email: '',
        phone: '',
        website: '',
        category_industry: 'Ayurvedic Pharmaceuticals & Classical Formulations',
        stall_interest: '9 sqm Standard Shell Scheme (3m x 3m)',
        stall_size: '9 sqm',
        products_brief: '',
        message: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [successResult, setSuccessResult] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const industries = [
        'Ayurvedic Pharmaceuticals & Classical Formulations',
        'Medicinal Plants, Raw Herbs & Phytopharmaceuticals',
        'Personal Care, Cosmeceuticals & Beauty',
        'Panchakarma, Wellness & Rejuvenation',
        'AI & Digital HealthTech Startups',
        'Nutraceuticals & Dietary Supplements',
        'AYUSH Medical Devices & Diagnostics',
        'Education, Research & Publishing',
    ];

    const stallTypes = [
        '9 sqm Standard Shell Scheme (3m x 3m)',
        '18 sqm Double Shell Scheme (6m x 3m)',
        '36 sqm Bare Space Island Pavilion',
        'Custom Bare Space (50+ sqm)',
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg(null);

        try {
            const res = await fetch('/api/exhibitors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                setSuccessResult(data);
            } else {
                setErrorMsg(data.message || 'Error submitting exhibitor inquiry.');
            }
        } catch (e) {
            setErrorMsg('Network error while submitting lead.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AppLayout
            title="Book Exhibition Stall & Expo Space | AYURPRAVAH 2027"
            description="Register as an exhibitor at the International AYUSH Conclave & Expo 2027 at IIT Delhi. Connect with 150+ brands, 35,000+ projected visitors, clinicians, and buyers."
        >
            {() => (
                <div className="py-12 space-y-12 pb-20">
                    {/* Header */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                            Trade Exhibition Pavilion
                        </span>
                        <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-black text-[#164a08]">
                            Register as an Exhibitor
                        </h1>
                        <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg font-sans text-[#503323] leading-relaxed">
                            Position your brand in front of thousands of Ayurvedic practitioners, hospital purchasers,
                            retail chains, and international buyers over three high-impact days at IIT Delhi.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-stone-200/80 shadow-md">
                            {successResult ? (
                                <div className="text-center py-6 sm:py-8 space-y-4 sm:space-y-5">
                                    <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h2 className="font-heading text-2xl font-bold text-[#164a08]">
                                        Exhibitor Inquiry Received!
                                    </h2>
                                    <p className="text-base text-stone-700 max-w-md mx-auto leading-relaxed">
                                        {successResult.message}
                                    </p>
                                    <div className="bg-[#F7F5EC] p-4 sm:p-5 rounded-2xl text-xs sm:text-sm font-mono text-[#164a08] max-w-sm mx-auto">
                                        Inquiry UUID: {successResult.lead_id}
                                    </div>
                                    <p className="text-xs sm:text-sm text-[#3e7405]">
                                        Our Industry & Trade Secretariat will share the floor plan and allotment details shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                    {errorMsg && (
                                        <div className="p-3.5 sm:p-4 bg-red-50 text-red-700 text-xs sm:text-sm rounded-xl sm:rounded-2xl flex items-center space-x-2">
                                            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                            <span>{errorMsg}</span>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div className="min-w-0">
                                            <label className="block text-xs sm:text-sm font-semibold text-[#503323] mb-1">Company / Brand Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                placeholder="e.g. Rasayana Botanicals Ltd"
                                                className="w-full text-xs sm:text-sm border border-stone-300 rounded-xl p-2.5 sm:p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <label className="block text-xs sm:text-sm font-semibold text-[#503323] mb-1">Contact Person Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.contact_person}
                                                onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                                                placeholder="e.g. Rajesh Mehra"
                                                className="w-full text-xs sm:text-sm border border-stone-300 rounded-xl p-2.5 sm:p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div className="min-w-0">
                                            <label className="block text-xs sm:text-sm font-semibold text-[#503323] mb-1">Work Email Address *</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="contact@company.com"
                                                className="w-full text-xs sm:text-sm border border-stone-300 rounded-xl p-2.5 sm:p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <label className="block text-xs sm:text-sm font-semibold text-[#503323] mb-1">Phone / WhatsApp *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+91 98765 43210"
                                                className="w-full text-xs sm:text-sm border border-stone-300 rounded-xl p-2.5 sm:p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div className="min-w-0">
                                            <label className="block text-xs sm:text-sm font-semibold text-[#503323] mb-1">Industry Sector</label>
                                            <select
                                                value={formData.category_industry}
                                                onChange={(e) => setFormData({ ...formData, category_industry: e.target.value })}
                                                className="w-full text-xs sm:text-sm border border-stone-300 rounded-xl p-2.5 sm:p-3 bg-white focus:ring-2 focus:ring-[#164a08]/30"
                                            >
                                                {industries.map((ind, i) => (
                                                    <option key={i} value={ind}>{ind}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="min-w-0">
                                            <label className="block text-xs sm:text-sm font-semibold text-[#503323] mb-1">Stall Space Preference</label>
                                            <select
                                                value={formData.stall_interest}
                                                onChange={(e) => setFormData({ ...formData, stall_interest: e.target.value, stall_size: e.target.value })}
                                                className="w-full text-xs sm:text-sm border border-stone-300 rounded-xl p-2.5 sm:p-3 bg-white focus:ring-2 focus:ring-[#164a08]/30"
                                            >
                                                {stallTypes.map((st, i) => (
                                                    <option key={i} value={st}>{st}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-[#503323] mb-1">Website URL (Optional)</label>
                                        <input
                                            type="url"
                                            value={formData.website}
                                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                            placeholder="https://company.com"
                                            className="w-full text-xs sm:text-sm border border-stone-300 rounded-xl p-2.5 sm:p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-[#503323] mb-1">Brief Description of Products / Innovations</label>
                                        <textarea
                                            rows="3"
                                            value={formData.products_brief}
                                            onChange={(e) => setFormData({ ...formData, products_brief: e.target.value })}
                                            placeholder="Overview of formulations, equipment, or technologies you plan to showcase..."
                                            className="w-full text-xs sm:text-sm border border-stone-300 rounded-2xl p-2.5 sm:p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-[#164a08] text-white py-3.5 sm:py-4 rounded-full font-heading text-xs sm:text-sm font-bold tracking-wider hover:bg-[#0e3005] transition flex items-center justify-center space-x-2 shadow-md disabled:opacity-50 whitespace-nowrap cursor-pointer mt-4"
                                    >
                                        {submitting ? (
                                            <Loader2 className="w-5 h-5 animate-spin text-[#DFC479]" />
                                        ) : (
                                            <>
                                                <span>SUBMIT EXHIBITOR INQUIRY</span>
                                                <ArrowRight className="w-4 h-4 text-[#DFC479]" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
