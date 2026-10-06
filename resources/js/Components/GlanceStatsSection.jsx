import React from 'react';
import { glanceStats } from '../content/ecosystem';

export default function GlanceStatsSection() {
    return (
        <section className="py-24 bg-[#164a08] text-white border-b border-black/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#DFC479] uppercase">
                        Scale & Magnitude
                    </span>
                    <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                        AYURPRAVAH 2027 At A Glance
                    </h2>
                    <div className="mt-4 w-20 h-1 bg-[#DFC479] mx-auto rounded-full"></div>
                    <p className="mt-4 text-base font-sans text-[#ECE7D6]/90 leading-relaxed">
                        A grand assembly of national and international scale uniting every dimension
                        of clinical science, academic pedagogy, botanical enterprise, and digital innovation.
                    </p>
                </div>

                {/* 11 Stats Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 text-center">
                    {glanceStats.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-[#164a08]/30 border border-white/10 rounded-3xl p-6 hover:bg-[#164a08]/50 transition-colors"
                        >
                            <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#DFC479]">
                                {item.value}
                            </div>
                            <div className="text-sm font-sans text-[#ECE7D6]/90 mt-2 leading-snug">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
