import React from 'react';
import { conferenceStages } from '../content/ecosystem';
import { GraduationCap, Lightbulb, Users, Compass, Handshake, TrendingUp } from 'lucide-react';

export default function StagesSection() {
    const icons = [GraduationCap, Lightbulb, Users, Compass, Handshake, TrendingUp];

    return (
        <section className="py-24 bg-white border-b border-black/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-sans font-bold tracking-[0.2em] text-[#3e7405] uppercase">
                        The Participant Journey
                    </span>
                    <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#164a08]">
                        More Than a Conference
                    </h2>
                    <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                    <p className="mt-4 text-base font-sans text-[#503323]/90 leading-relaxed">
                        A transformative 6-stage developmental immersion designed to enrich every
                        vaidya, scientist, student, and entrepreneur who walks into our halls.
                    </p>
                </div>

                {/* 6 Stages Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {conferenceStages.map((stage, idx) => {
                        const Icon = icons[idx] || Lightbulb;
                        return (
                            <div
                                key={idx}
                                className="bg-[#F7F5EC] p-8 rounded-3xl border border-black/5 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="w-13 h-13 rounded-full bg-[#164a08] text-white flex items-center justify-center font-bold text-base group-hover:scale-105 transition-transform">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="px-3.5 py-1 rounded-full bg-white font-mono text-xs font-bold text-[#164a08] border border-black/5">
                                            STAGE 0{idx + 1}
                                        </span>
                                    </div>

                                    <h3 className="font-heading text-xl font-bold text-[#164a08]">
                                        {stage.stage}
                                    </h3>
                                    <div className="text-sm font-sans font-semibold text-[#3e7405] mt-1">
                                        {stage.tag}
                                    </div>

                                    <p className="mt-4 text-sm sm:text-base font-sans text-[#503323]/90 leading-relaxed">
                                        {stage.copy}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
