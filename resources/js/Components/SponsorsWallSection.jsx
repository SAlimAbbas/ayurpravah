import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function SponsorsWallSection({ sponsors = {} }) {
    const categories = Object.keys(sponsors);

    return (
        <section id="partners" className="relative py-24 bg-[#F7F5EC] border-b border-black/5 overflow-hidden">
            {/* Subtle Light Vedic Mandala Background Graphic */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-55">
                <img
                    src="/images/section-bg-mandala.jpg"
                    alt="Ayurvedic Mandala & Jaali Pattern"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5EC]/70 via-[#F7F5EC]/40 to-[#F7F5EC]/80" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-sans font-bold tracking-[0.2em] text-[#3e7405] uppercase">
                        Patrons & Partners
                    </span>
                    <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#164a08]">
                        Organisers & Knowledge Alliance
                    </h2>
                    <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                    <p className="mt-4 text-base font-sans text-[#503323]/90 leading-relaxed">
                        AYURPRAVAH 2027 is convened under the shared stewardship of foundational
                        AYUSH research trusts, digital health enterprises, and premier academic bodies.
                    </p>
                </div>

                {/* Main Organizers Spotlight */}
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/5 shadow-sm mb-14 max-w-5xl mx-auto">
                    <div className="text-center text-xs font-sans font-bold tracking-[0.2em] text-[#3e7405] uppercase mb-8">
                        Joint Confluence Organisers
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="p-8 rounded-3xl bg-[#F7F5EC] border border-black/5 text-center space-y-3">
                            <div className="font-heading text-xl font-bold text-[#164a08]">
                                Yasharth Veda Foundation
                            </div>
                            <div className="text-sm text-[#3e7405] font-semibold">
                                Ecosystem-Building Public Health Trust
                            </div>
                            <p className="text-sm text-[#503323]/85 leading-relaxed pt-1">
                                Committed to traditional knowledge preservation, evidence-based research,
                                clinical mastery, and community wellness.
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl bg-[#F7F5EC] border border-black/5 text-center space-y-3">
                            <div className="font-heading text-xl font-bold text-[#164a08]">
                                AyurWings Health Tech
                            </div>
                            <div className="text-sm text-[#3e7405] font-semibold">
                                Digital Healthcare & Education Backbone
                            </div>
                            <p className="text-sm text-[#503323]/85 leading-relaxed pt-1">
                                Empowering clinicians and institutions through telehealth, CME accreditations,
                                and cutting-edge healthcare technology.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Partner Categories if seeded */}
                {categories.length > 0 && (
                    <div className="space-y-10">
                        {categories.map((cat) => {
                            if (cat === 'Organized By') return null;
                            const items = sponsors[cat] || [];
                            if (items.length === 0) return null;

                            return (
                                <div key={cat} className="text-center">
                                    <h4 className="font-heading text-sm font-bold text-[#164a08] uppercase tracking-wider mb-5">
                                        {cat}
                                    </h4>
                                    <div className="flex flex-wrap items-center justify-center gap-4">
                                        {items.map((sp) => (
                                            <div
                                                key={sp.id}
                                                className="bg-white px-6 py-3.5 rounded-full border border-black/5 text-sm font-heading font-semibold text-[#164a08] shadow-sm"
                                            >
                                                {sp.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Call for Partners / Sponsors (50px Pure Curve) */}
                <div className="mt-14 text-center">
                    <Link
                        href="/partners"
                        className="inline-flex items-center space-x-2 bg-[#164a08] text-white px-8 py-3.5 rounded-full text-sm font-heading font-bold tracking-wider uppercase hover:bg-[#0e3005] transition shadow-md"
                    >
                        <span>BECOME AN OFFICIAL KNOWLEDGE OR SPONSORSHIP PARTNER</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
