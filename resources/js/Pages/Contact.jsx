import React, { useState } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, MessageSquare } from 'lucide-react';
import FaqSection from '../Components/FaqSection';

export default function Contact({ faqs = [] }) {
    const [formData, setFormData] = useState({
        type: 'contact',
        department: 'Delegate Registration',
        name: '',
        organisation: '',
        email: '',
        phone: '',
        message: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);

    const departments = [
        {
            name: 'General Enquiries & Secretariat',
            email: 'info@ayurpravah.com',
            phone: '+91 97043 21786 / +91 85869 59638',
            desc: 'General conclave information, delegate passes, venue directions, and official notices.',
        },
        {
            name: 'Exhibition, Stalls & Industry Booths',
            email: 'expo@ayurpravah.com',
            phone: '+91 97160 48074 / +91 76690 89388',
            desc: '9 sqm, 18 sqm shell schemes, bare spaces, sponsorship packages, and booth allocations.',
        },
        {
            name: 'Research, Scientific Papers & Abstracts',
            email: 'ayurpravah.research@gmail.com',
            phone: '+91 97043 21786',
            desc: 'Abstract review status, oral & poster guidelines, presentation awards, and proceedings.',
        },
        {
            name: 'Startups, Innovation & Venture Pitch',
            email: 'info@ayurpravah.com',
            phone: '+91 85869 59638',
            desc: 'Founder pitches, incubator participation, venture partner meetings, and demo tables.',
        },
        {
            name: 'Institutional MoUs & Strategic Patrons',
            email: 'info@ayurpravah.com',
            phone: '+91 97043 21786',
            desc: 'University partnerships, bilateral healthcare agreements, and global delegations.',
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
                setSuccessMsg('Your message has been successfully routed to the chosen department desk. A representative will contact you shortly.');
                setFormData({
                    type: 'contact',
                    department: 'Delegate Registration',
                    name: '',
                    organisation: '',
                    email: '',
                    phone: '',
                    message: '',
                });
            }
        } catch (e) {
            console.error('Error submitting enquiry', e);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AppLayout
            title="Contact Secretariats & Department Helpdesks"
            description="Get in touch with the specialized coordination cells for delegate registration, exhibition stalls, abstracts, and media."
        >
            {({ openRegisterWithTier }) => (
                <div className="py-12 space-y-16">
                    {/* Header */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                            Secretariat Directory
                        </span>
                        <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-black text-[#164a08]">
                            Contact Helpdesk
                        </h1>
                        <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg font-sans text-[#503323] leading-relaxed">
                            Have questions or need assistance? Reach out directly to our dedicated department coordinators.
                        </p>
                    </div>

                    {/* Department Cards Grid */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {departments.map((dept, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition"
                                >
                                    <div>
                                        <h3 className="font-heading text-lg font-bold text-[#164a08]">
                                            {dept.name}
                                        </h3>
                                        <p className="text-sm text-[#503323] mt-1.5 leading-relaxed">
                                            {dept.desc}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-stone-100 space-y-2 text-sm">
                                        <div className="flex items-center space-x-2 text-[#164a08] font-medium">
                                            <Mail className="w-4 h-4 text-[#164a08]" />
                                            <a href={`mailto:${dept.email}`} className="hover:underline truncate">
                                                {dept.email}
                                            </a>
                                        </div>
                                        <div className="flex items-center space-x-2 text-stone-700">
                                            <Phone className="w-4 h-4 text-[#164a08]" />
                                            <span>{dept.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Interactive Enquiry Form */}
                    <div className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-stone-200/80 shadow-md">
                            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#164a08] text-center">
                                Direct Online Message
                            </h2>
                            <p className="text-sm sm:text-base text-stone-600 text-center mt-1.5 mb-6 sm:mb-8">
                                Send a prioritized message directly to the secretariat.
                            </p>

                            {successMsg ? (
                                <div className="p-4 sm:p-5 bg-green-50 border border-green-200 text-green-800 rounded-2xl text-xs sm:text-sm text-center font-medium">
                                    {successMsg}
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-[#503323] mb-1">
                                            Target Department Desk *
                                        </label>
                                        <select
                                            value={formData.department}
                                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                            className="w-full text-xs sm:text-sm border border-stone-300 rounded-xl p-2.5 sm:p-3 bg-white focus:ring-2 focus:ring-[#164a08]/30"
                                        >
                                            {departments.map((d, i) => (
                                                <option key={i} value={d.name}>{d.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div className="min-w-0">
                                            <label className="block text-xs sm:text-sm font-semibold text-[#503323] mb-1">
                                                Your Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full text-xs sm:text-sm border border-stone-300 rounded-xl p-2.5 sm:p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <label className="block text-xs sm:text-sm font-semibold text-[#503323] mb-1">
                                                Organisation / Clinic / College
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.organisation}
                                                onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                                                className="w-full text-xs sm:text-sm border border-stone-300 rounded-xl p-2.5 sm:p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div className="min-w-0">
                                            <label className="block text-xs sm:text-sm font-semibold text-[#503323] mb-1">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full text-xs sm:text-sm border border-stone-300 rounded-xl p-2.5 sm:p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <label className="block text-xs sm:text-sm font-semibold text-[#503323] mb-1">
                                                Phone Number / WhatsApp *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full text-xs sm:text-sm border border-stone-300 rounded-xl p-2.5 sm:p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-[#503323] mb-1">
                                            Your Inquiry / Message *
                                        </label>
                                        <textarea
                                            rows="4"
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Write your query clearly..."
                                            className="w-full text-xs sm:text-sm border border-stone-300 rounded-2xl p-2.5 sm:p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-[#164a08] text-white py-3.5 sm:py-4 rounded-full font-heading text-xs sm:text-sm font-bold tracking-wider hover:bg-[#0e3005] transition flex items-center justify-center space-x-2 shadow-md disabled:opacity-50 whitespace-nowrap cursor-pointer"
                                    >
                                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>DISPATCH MESSAGE</span>}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* FAQs on Contact page */}
                    {faqs.length > 0 && <FaqSection faqs={faqs} />}
                </div>
            )}
        </AppLayout>
    );
}
