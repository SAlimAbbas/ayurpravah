import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function FaqSection({ faqs = [] }) {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section className="py-24 bg-white border-b border-black/5">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-sm font-sans font-bold tracking-[0.2em] text-[#3e7405] uppercase">
                        Clarifications & Guidance
                    </span>
                    <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#164a08]">
                        Frequently Asked Questions
                    </h2>
                    <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                    <p className="mt-4 text-base font-sans text-[#503323]/90 leading-relaxed">
                        Find key answers regarding participation passes, paper submissions,
                        exhibition spaces, and logistical arrangements.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;

                        return (
                            <div
                                key={faq.id || idx}
                                className="border border-black/10 rounded-2xl overflow-hidden transition-all bg-[#F7F5EC]"
                            >
                                <button
                                    onClick={() => toggle(idx)}
                                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                                >
                                    <span className="font-heading text-base sm:text-lg font-bold text-[#164a08]">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-[#164a08] shrink-0 transition-transform duration-200 ${
                                            isOpen ? 'transform rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="px-5 sm:px-6 pb-6 pt-2 text-base font-sans text-[#503323]/90 leading-relaxed border-t border-black/5 bg-white">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Still Have Questions Box (50px Pure Curve) */}
                <div className="mt-14 bg-[#F7F5EC] p-8 rounded-3xl border border-black/5 text-center">
                    <h4 className="font-heading text-lg font-bold text-[#164a08]">
                        Have a Specific Inquiry or Institutional Delegation?
                    </h4>
                    <p className="text-sm sm:text-base text-[#503323]/85 mt-2 max-w-xl mx-auto">
                        Our secretarial coordination desk is accessible by phone, email, and live messaging.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contact"
                            className="bg-[#164a08] text-white px-8 py-3.5 rounded-full text-sm font-heading font-bold tracking-wider hover:bg-[#0e3005] transition shadow-md"
                        >
                            Contact Helpdesk →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
