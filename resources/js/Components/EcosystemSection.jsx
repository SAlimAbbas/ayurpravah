import React from 'react';
import { brandChain, yasharthPillars, yasharthStats } from '../content/ecosystem';
import { Building2, Cpu, Globe2, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function EcosystemSection() {
    const chainIcons = [Building2, Cpu, Globe2];

    return (
        <section id="ecosystem" className="py-24 bg-white border-b border-black/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-sans font-bold tracking-[0.2em] text-[#3e7405] uppercase">
                        The Institutional Foundation
                    </span>
                    <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#164a08]">
                        The Ecosystem Architecture
                    </h2>
                    <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                    <p className="mt-4 text-base font-sans text-[#503323]/90 leading-relaxed">
                        AYURPRAVAH 2027 is not an isolated assembly. It is the flagship convergence
                        of a comprehensive ecosystem operating year-round across medical education,
                        scientific research, digital technology, and grassroots public health.
                    </p>
                </div>

                {/* 3-Tier Brand Chain */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {brandChain.map((item, idx) => {
                        const Icon = chainIcons[idx] || Building2;
                        return (
                            <div
                                key={idx}
                                className="relative bg-[#F7F5EC] rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="w-14 h-14 rounded-full bg-[#164a08] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <span className="text-xs font-sans font-bold tracking-wider text-[#164a08] bg-white px-4 py-1.5 rounded-full border border-black/5">
                                            {item.badge}
                                        </span>
                                    </div>
                                    <h3 className="font-heading text-xl font-bold text-[#164a08] leading-snug">
                                        {item.title}
                                    </h3>
                                    <div className="text-sm font-sans font-semibold text-[#3e7405] mt-1.5 italic">
                                        "{item.role}"
                                    </div>
                                    <p className="mt-4 text-sm sm:text-base font-sans text-[#503323]/90 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>

                                <div className="mt-8 pt-5 border-t border-black/5">
                                    <Link
                                        href="/about"
                                        className="inline-flex items-center space-x-2 text-sm font-heading font-bold text-[#164a08] group-hover:translate-x-1 transition-transform"
                                    >
                                        <span>Discover Organisation</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Yasharth Impact Numbers */}
                <div className="bg-[#164a08] rounded-3xl p-8 sm:p-14 text-white mb-24 border border-black/10 shadow-xl">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#DFC479] uppercase">
                            Demonstrated Ground Impact
                        </span>
                        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
                            Yasharth Veda Foundation Reach
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
                        {yasharthStats.map((stat, i) => (
                            <div key={i} className="space-y-1.5">
                                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#DFC479]">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-sans text-[#ECE7D6]/90 leading-snug">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8 Operational Pillars */}
                <div>
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-sm font-sans font-bold tracking-[0.2em] text-[#3e7405] uppercase">
                            Enduring Mandate
                        </span>
                        <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#164a08] mt-1">
                            8 Core Operational Pillars
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {yasharthPillars.map((pillar, idx) => (
                            <div
                                key={idx}
                                className="bg-[#F7F5EC] p-6 rounded-3xl border border-black/5 hover:border-[#164a08]/20 transition shadow-sm hover:shadow"
                            >
                                <div className="font-mono text-sm font-bold text-[#164a08] mb-1.5">
                                    {pillar.number}
                                </div>
                                <h4 className="font-heading text-base font-bold text-[#164a08] mb-2 leading-snug">
                                    {pillar.title}
                                </h4>
                                <p className="text-sm font-sans text-[#503323]/85 leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
