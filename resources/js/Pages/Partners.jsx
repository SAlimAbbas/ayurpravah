import React, { useState } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { ShieldCheck, Handshake, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Partners({ sponsors = {} }) {
    const [formData, setFormData] = useState({
        type: 'partner',
        name: '',
        organisation: '',
        email: '',
        phone: '',
        message: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);

    const categories = Object.keys(sponsors);

    const sponsorshipTiers = [
        {
            tier: 'Platinum Patron',
            slots: 'Exclusive 2 Slots',
            benefits: [
                'Premier logo branding on all main stage backdrops, archways, and delegate kits',
                'Complimentary 36 sqm Bare Space Island pavilion in prime expo foyer',
                'Keynote address in the Inaugural Plenary session',
                '15 Complimentary VIP delegate passes + VIP Lounge Access',
                'Double-page spread in official conclave printed proceedings',
            ],
        },
        {
            tier: 'Gold Partner',
            slots: '4 Available',
            benefits: [
                'Prominent logo branding across all conference collateral and digital screens',
                'Complimentary 18 sqm Double Shell Scheme stall in Hall A',
                'Panelist representation in one thematic conclave track',
                '8 Complimentary delegate passes',
                'Full-page colour advertisement in conclave directory',
            ],
        },
        {
            tier: 'Silver / Associate Partner',
            slots: '8 Available',
            benefits: [
                'Logo display on website, digital screens, and printed agenda',
                'Complimentary 9 sqm Standard Shell Scheme stall',
                '4 Complimentary delegate passes',
                'Half-page profile in conclave compendium',
            ],
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('/api/enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                setSuccessMsg('Thank you. Your partnership proposal has been received. Our secretariat will connect with you.');
                setFormData({ type: 'partner', name: '', organisation: '', email: '', phone: '', message: '' });
            }
        } catch (e) {
            console.error('Error submitting enquiry', e);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AppLayout
            title="Partnership & Sponsorship Opportunities"
            description="Collaborate with AYURPRAVAH 2027 as a Knowledge Partner, Institutional Patron, or Corporate Sponsor."
        >
            {({ openRegisterWithTier }) => (
                <div className="py-12 space-y-16">
                    {/* Header */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                            Institutional Alliance
                        </span>
                        <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-black text-[#164a08]">
                            Partners & Patrons
                        </h1>
                        <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg font-sans text-[#503323] leading-relaxed">
                            Join a prestigious alliance of universities, healthcare networks, pharmaceutical innovators,
                            and global research organizations co-creating the landmark conclave of 2027.
                        </p>
                    </div>

                    {/* Organisers Strip */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-[#164a08] text-white rounded-3xl p-8 sm:p-10 border border-[#164a08]/30 text-center space-y-5 shadow-xl">
                            <span className="text-sm font-sans font-bold tracking-widest text-[#DFC479] uppercase">
                                Joint Conclave Stewardship
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                <div className="bg-[#164a08]/40 p-5 rounded-2xl border border-[#164a08]/20">
                                    <h3 className="font-heading text-lg font-bold text-white">
                                        Yasharth Veda Foundation
                                    </h3>
                                    <p className="text-base text-[#DFC479] mt-1">Ecosystem-Building Non-Profit Trust</p>
                                </div>
                                <div className="bg-[#164a08]/40 p-5 rounded-2xl border border-[#164a08]/20">
                                    <h3 className="font-heading text-lg font-bold text-white">
                                        AyurWings Health Tech
                                    </h3>
                                    <p className="text-base text-[#DFC479] mt-1">Digital Backbone & Health Tech Enterprise</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sponsorship Tiers */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-10">
                            <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                                Partnership Packages
                            </span>
                            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold text-[#164a08]">
                                Sponsorship Tiers
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {sponsorshipTiers.map((tier, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition"
                                >
                                    <div>
                                        <span className="text-sm font-sans font-bold text-[#3e7405] uppercase">
                                            {tier.slots}
                                        </span>
                                        <h3 className="font-heading text-2xl font-bold text-[#164a08] mt-1">
                                            {tier.tier}
                                        </h3>

                                        <ul className="mt-6 space-y-3 text-sm text-[#503323]">
                                            {tier.benefits.map((b, i) => (
                                                <li key={i} className="flex items-start space-x-2.5">
                                                    <CheckCircle2 className="w-4 h-4 text-[#164a08] shrink-0 mt-0.5" />
                                                    <span>{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-8 pt-5 border-t border-stone-100">
                                        <a
                                            href="#partner-inquiry"
                                            className="w-full block text-center bg-[#164a08] text-white py-3 rounded-full font-heading text-sm font-bold tracking-wider hover:bg-[#0e3005] transition shadow-sm"
                                        >
                                            Inquire for {tier.tier} →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Partnership Inquiry Form */}
                    <div id="partner-inquiry" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-md">
                            <h3 className="font-heading text-2xl font-bold text-[#164a08] text-center">
                                Propose an Institutional MoU or Sponsorship
                            </h3>
                            <p className="text-base text-stone-600 text-center mt-2 mb-8">
                                Submit your proposal directly to the Secretary of Partnerships & MoUs.
                            </p>

                            {successMsg ? (
                                <div className="p-5 bg-green-50 border border-green-200 text-green-800 rounded-2xl text-sm text-center font-medium">
                                    {successMsg}
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#503323] mb-1.5">
                                                Your Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#503323] mb-1.5">
                                                Organisation / University *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.organisation}
                                                onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                                                className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#503323] mb-1.5">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#503323] mb-1.5">
                                                Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#503323] mb-1.5">
                                            Partnership Intent / Message *
                                        </label>
                                        <textarea
                                            rows="4"
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Detail your interest: Knowledge Partnership, Academic MoU, Corporate Sponsorship tier..."
                                            className="w-full text-sm border border-stone-300 rounded-2xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-[#164a08] text-white py-4 rounded-full font-heading text-sm font-bold tracking-wider hover:bg-[#0e3005] transition flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
                                    >
                                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>SUBMIT PARTNERSHIP PROPOSAL</span>}
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
