import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function TicketTiersSection({ tiers = [], onSelectTier }) {
    return (
        <section id="passes" className="py-24 bg-white border-b border-black/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-sans font-bold tracking-[0.2em] text-[#3e7405] uppercase">
                        Participation Passes
                    </span>
                    <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#164a08]">
                        Delegate Registration Tiers
                    </h2>
                    <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                    <p className="mt-4 text-base font-sans text-[#503323]/90 leading-relaxed">
                        Reserve your all-access pass to the scientific halls, hands-on masterclasses,
                        deliberation sessions, expo pavilion, and certified participation compendium.
                    </p>
                </div>

                {/* Tiers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, idx) => {
                        const isFeatured = idx === 1;
                        const isFreeOrTbc = tier.price === 0 || !tier.is_active;

                        return (
                            <div
                                key={tier.id}
                                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                                    isFeatured
                                        ? 'bg-[#164a08] text-white shadow-2xl md:-translate-y-2'
                                        : 'bg-[#F7F5EC] text-[#503323] border border-black/5 shadow-sm hover:shadow-xl'
                                }`}
                            >
                                {isFeatured && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#164a08] text-white px-4 py-1.5 rounded-full text-xs font-sans font-bold tracking-widest uppercase shadow">
                                        Most Popular
                                    </div>
                                )}

                                <div>
                                    <span className={`text-xs font-sans font-bold tracking-wider uppercase ${isFeatured ? 'text-[#DFC479]' : 'text-[#3e7405]'}`}>
                                        {tier.category} Pass
                                    </span>
                                    <h3 className={`font-heading text-xl sm:text-2xl font-bold mt-1 ${isFeatured ? 'text-white' : 'text-[#164a08]'}`}>
                                        {tier.name}
                                    </h3>

                                    <div className="mt-5 pb-5 border-b border-gray-200/20">
                                        {isFreeOrTbc ? (
                                            <div>
                                                <div className={`font-heading text-3xl font-bold ${isFeatured ? 'text-[#DFC479]' : 'text-[#164a08]'}`}>
                                                    {tier.price > 0 ? `₹${(tier.price / 100).toLocaleString()}` : 'Pre-Registration'}
                                                </div>
                                                <div className={`text-xs font-sans mt-1 ${isFeatured ? 'text-[#ECE7D6]/70' : 'text-[#3e7405]'}`}>
                                                    {tier.price > 0 ? '+ 18% GST Applicable' : 'Early Interest & Notification'}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className={`font-heading text-3xl sm:text-4xl font-black ${isFeatured ? 'text-[#DFC479]' : 'text-[#164a08]'}`}>
                                                    ₹{(tier.price / 100).toLocaleString()}
                                                </div>
                                                <div className={`text-xs font-sans mt-1 ${isFeatured ? 'text-[#ECE7D6]/70' : 'text-[#3e7405]'}`}>
                                                    + 18% GST ({tier.currency})
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {tier.inclusions && (
                                        <div className="mt-6 space-y-3">
                                            <div className={`text-xs font-sans font-bold uppercase tracking-wider ${isFeatured ? 'text-[#DFC479]' : 'text-[#3e7405]'}`}>
                                                Pass Inclusions:
                                            </div>
                                            <ul className="space-y-2.5 text-sm">
                                                {tier.inclusions.map((inc, i) => (
                                                    <li key={i} className="flex items-start space-x-2.5">
                                                        <CheckCircle2 className={`w-4.5 h-4.5 shrink-0 mt-0.5 ${isFeatured ? 'text-[#DFC479]' : 'text-[#164a08]'}`} />
                                                        <span className={isFeatured ? 'text-[#ECE7D6]' : 'text-[#503323]'}>
                                                            {inc}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 pt-5 border-t border-black/5">
                                    <button
                                        onClick={() => onSelectTier(tier.id)}
                                        className={`w-full py-3.5 rounded-full font-heading text-sm font-bold tracking-wider transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer ${
                                            isFeatured
                                                ? 'bg-[#DFC479] text-[#164a08] hover:bg-white'
                                                : 'bg-[#164a08] text-white hover:bg-[#0e3005]'
                                        }`}
                                    >
                                        <span>RESERVE PASS NOW</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
