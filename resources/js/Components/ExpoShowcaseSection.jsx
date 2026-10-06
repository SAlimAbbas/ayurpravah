import React from 'react';
import { expoItems } from '../content/ecosystem';
import { Store, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function ExpoShowcaseSection() {
    return (
        <section id="expo" className="py-24 bg-white border-b border-black/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-sans font-bold tracking-[0.2em] text-[#3e7405] uppercase">
                        Trade, Innovation & Commerce
                    </span>
                    <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#164a08]">
                        International Ayurveda Expo 2027
                    </h2>
                    <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                    <p className="mt-4 text-base font-sans text-[#503323]/90 leading-relaxed">
                        A high-visibility global showcase uniting 100+ premier brands, manufacturers,
                        botanical cultivators, health tech startups, and over 50,000 visitors.
                    </p>
                </div>

                {/* 8 Expo Showcase Zones Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {expoItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-[#F7F5EC] p-7 rounded-3xl border border-black/5 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-13 h-13 rounded-full bg-[#164a08] text-white flex items-center justify-center font-bold text-base mb-5 group-hover:scale-105 transition-transform">
                                    <Store className="w-6 h-6" />
                                </div>
                                <h4 className="font-heading text-base sm:text-lg font-bold text-[#164a08] leading-snug">
                                    {item.title}
                                </h4>
                                <p className="mt-3 text-sm sm:text-base font-sans text-[#503323]/85 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-black/5 text-xs font-mono text-[#164a08] font-bold">
                                ZONE 0{idx + 1}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Expo Banner with CTAs (50px Pure Curves, No Yellow Border) */}
                <div className="bg-[#164a08] rounded-3xl p-8 sm:p-14 text-white border border-black/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                    <div className="space-y-3 max-w-xl text-center md:text-left">
                        <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#DFC479] uppercase">
                            Exhibition & Sponsorship Sales Open
                        </span>
                        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                            Showcase Your Brand Before 50,000+ Decision Makers
                        </h3>
                        <p className="text-sm sm:text-base font-sans text-[#ECE7D6]/85 leading-relaxed">
                            Custom bare spaces, 9 sqm / 18 sqm shell scheme stalls, B2B buyer lounge passes,
                            and prominent brand mentions across conclave collateral.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
                        <Link
                            href="/register/exhibitor"
                            className="bg-[#DFC479] text-[#164a08] hover:bg-white text-center px-8 py-3.5 rounded-full font-heading text-sm font-bold tracking-wider transition shadow-md"
                        >
                            BOOK EXHIBITION STALL →
                        </Link>
                        <Link
                            href="/expo"
                            className="border border-white/40 hover:bg-white/10 text-white text-center px-8 py-3.5 rounded-full font-heading text-sm font-bold tracking-wider transition"
                        >
                            VIEW EXPO BROCHURE
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
