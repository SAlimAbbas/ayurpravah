import React from "react";
import AppLayout from "../Layouts/AppLayout";
import {
    yasharthPillars,
    yasharthStats,
    ayurWingsNodes,
    ayurWingsStats,
} from "../content/ecosystem";
import { User, Building2, BookOpen, Layers, CheckCircle2 } from "lucide-react";

export default function About({ team = [] }) {
    return (
        <AppLayout
            title="About Organisers & Knowledge Partners"
            description="Discover the collaborative stewardship of IIT Delhi, Yasharth Veda Foundation, and AyurWings HealthTech behind AYURPRAVAH 2027."
        >
            {() => (
                <div className="py-16 space-y-16">
                    {/* Header Banner */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                            Stewardship & Governance
                        </span>
                        <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-black text-[#164a08]">
                            Organisers & Knowledge Partners
                        </h1>
                        <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg font-sans text-[#503323] leading-relaxed">
                            AYURPRAVAH 2027 represents the collective confluence
                            of India's premier technological institute,
                            foundational non-profit clinical research, and
                            forward-looking digital healthcare infrastructure.
                        </p>
                    </div>

                    {/* 1. Indian Institute of Technology Delhi (Section 3.1) */}
                    <section
                        id="iit-delhi"
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    >
                        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-sm space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-100 pb-6">
                                <div className="space-y-2">
                                    <span className="text-sm font-sans font-bold tracking-widest text-[#3e7405] uppercase">
                                        Host Institution & Academic Partner
                                    </span>
                                    <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#164a08]">
                                        Indian Institute of Technology Delhi
                                    </h2>
                                    <p className="text-base font-sans text-[#3e7405] font-semibold italic">
                                        "Connecting Knowledge. Inspiring
                                        Innovation. Advancing Ayurveda
                                        Globally."
                                    </p>
                                </div>
                                <div className="text-sm sm:text-base text-[#503323] max-w-md leading-relaxed">
                                    Founded in 1961, IIT Delhi is one of India's
                                    premier institutions for science,
                                    engineering and technology, providing a
                                    rigorous setting for dialogue between
                                    Ayurveda and contemporary scientific
                                    inquiry.
                                </div>
                            </div>

                            <p className="text-sm sm:text-base text-[#503323] leading-relaxed">
                                The event's interdisciplinary orientation
                                creates unprecedented opportunities to consider
                                how scientific inquiry, biomedical engineering,
                                digital telemetry, and technology-led innovation
                                can engage directly with questions relevant to
                                traditional healthcare—recognizing the distinct
                                expertise of clinicians, researchers,
                                technologists, and institutions.
                            </p>

                            <div className="pt-2 flex flex-wrap gap-3">
                                <span className="bg-[#F7F5EC] text-[#164a08] text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border border-[#164a08]/15">
                                    Hauz Khas, New Delhi 110016
                                </span>
                                <span className="bg-[#F7F5EC] text-[#164a08] text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border border-[#164a08]/15">
                                    IIT Delhi Metro Station (Magenta Line Gate
                                    No. 1)
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* 2. Yasharth Veda Foundation (Section 3.2) */}
                    <section
                        id="yasharth"
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    >
                        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-sm space-y-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-100 pb-8">
                                <div className="space-y-2">
                                    <span className="text-sm font-sans font-bold tracking-widest text-[#3e7405] uppercase">
                                        Organising Trust
                                    </span>
                                    <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#164a08]">
                                        Yasharth Veda Foundation
                                    </h2>
                                    <p className="text-base font-sans text-[#3e7405] font-semibold italic">
                                        "Builds the ecosystem."
                                    </p>
                                    <div className="text-sm font-heading font-bold text-[#503323]">
                                        Founder & Chairman:{" "}
                                        <span className="text-[#164a08]">
                                            Vd. Yash Chaudhary
                                        </span>
                                    </div>
                                </div>
                                <div className="text-sm sm:text-base text-[#503323] max-w-md leading-relaxed">
                                    A non-profit organization committed to the
                                    advancement of Ayurveda and AYUSH through
                                    traditional knowledge, clinical excellence,
                                    scientific research, education, technology,
                                    and global collaboration.
                                </div>
                            </div>

                            {/* Vision & Mission */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F7F5EC] p-6 rounded-2xl border border-stone-200/60">
                                <div>
                                    <h3 className="font-heading text-base font-bold text-[#164a08] uppercase tracking-wider mb-2">
                                        Vision
                                    </h3>
                                    <p className="text-sm text-[#503323] leading-relaxed">
                                        To bring the AYUSH community together
                                        under one roof, building a world in
                                        which time-honoured Vedic knowledge can
                                        contribute meaningfully to the future of
                                        healthcare.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-heading text-base font-bold text-[#164a08] uppercase tracking-wider mb-2">
                                        Mission
                                    </h3>
                                    <p className="text-sm text-[#503323] leading-relaxed">
                                        To empower the AYUSH fraternity through
                                        knowledge, collaboration, research,
                                        technology and professional
                                        opportunities, while advancing
                                        Ayurveda's global acceptance and impact.
                                    </p>
                                </div>
                            </div>

                            {/* Yasharth Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                                {yasharthStats.map((stat, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-[#F7F5EC] p-5 rounded-2xl border border-[#164a08]/10"
                                    >
                                        <div className="font-heading text-2xl sm:text-3xl font-bold text-[#164a08]">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs sm:text-sm font-sans text-[#503323] mt-1.5 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 7 Operational Pillars */}
                            <div>
                                <h3 className="font-heading text-lg font-bold text-[#164a08] uppercase tracking-wider mb-5">
                                    7 Core Operational Pillars
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {yasharthPillars.map((p, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-[#F7F5EC] p-5 rounded-2xl border border-stone-200/60"
                                        >
                                            <div className="font-mono text-base font-bold text-[#164a08] mb-1.5">
                                                {p.number}
                                            </div>
                                            <h4 className="font-heading text-base font-bold text-[#164a08] mb-1">
                                                {p.title}
                                            </h4>
                                            <p className="text-xs sm:text-sm font-sans text-[#503323] leading-relaxed">
                                                {p.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. AyurWings HealthTech (Section 3.3) */}
                    <section
                        id="ayurwings"
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    >
                        <div className="bg-[#164a08] text-white rounded-3xl p-8 sm:p-12 border border-[#164a08]/30 shadow-xl space-y-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
                                <div className="space-y-2">
                                    <span className="text-sm font-sans font-bold tracking-widest text-[#DFC479] uppercase">
                                        In Association With
                                    </span>
                                    <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                                        AyurWings HealthTech
                                    </h2>
                                    <p className="text-base font-sans text-[#DFC479] font-semibold italic">
                                        "Empowering Ayurveda Digitally."
                                    </p>
                                    <div className="text-sm font-heading font-bold text-[#ECE7D6]">
                                        Founder:{" "}
                                        <span className="text-[#DFC479]">
                                            Vd. Pooja Kohli
                                        </span>
                                    </div>
                                </div>
                                <div className="text-sm sm:text-base text-[#ECE7D6]/90 max-w-md leading-relaxed">
                                    A premier digital health platform empowering
                                    Ayurvedic professionals and healthcare
                                    institutions worldwide through specialized
                                    CME courses, digital marketing, online
                                    consultations, thesis support, and
                                    scientific writing.
                                </div>
                            </div>

                            {/* Vision & Mission */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#164a08]/50 p-6 rounded-2xl border border-white/10">
                                <div>
                                    <h3 className="font-heading text-base font-bold text-[#DFC479] uppercase tracking-wider mb-2">
                                        Vision
                                    </h3>
                                    <p className="text-sm text-[#ECE7D6]/90 leading-relaxed">
                                        To build a digitally empowered Ayurveda
                                        ecosystem in which authentic knowledge,
                                        modern technology, clinical excellence
                                        and global collaboration contribute to
                                        greater accessibility, credibility and
                                        impact.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-heading text-base font-bold text-[#DFC479] uppercase tracking-wider mb-2">
                                        Mission
                                    </h3>
                                    <p className="text-sm text-[#ECE7D6]/90 leading-relaxed">
                                        To equip Ayurveda stakeholders with
                                        knowledge, digital tools, professional
                                        opportunities and collaborative networks
                                        that help them participate confidently
                                        in the modern healthcare ecosystem.
                                    </p>
                                </div>
                            </div>

                            {/* AyurWings Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
                                {ayurWingsStats.map((stat, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-[#164a08]/40 p-5 rounded-2xl border border-[#164a08]/30"
                                    >
                                        <div className="font-heading text-2xl sm:text-3xl font-bold text-[#DFC479]">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs sm:text-sm font-sans text-[#ECE7D6]/90 mt-1.5 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* AyurWings 8 Nodes */}
                            <div>
                                <h3 className="font-heading text-base font-bold text-[#DFC479] uppercase tracking-wider mb-4">
                                    Core Services & Verticals
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {ayurWingsNodes.map((node, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-[#164a08]/30 px-5 py-3 rounded-full border border-[#DFC479]/20 text-xs sm:text-sm font-heading font-medium text-white flex items-center justify-center text-center"
                                        >
                                            <span>{node}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Governing Team & Committees */}
                    {team.length > 0 && (
                        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center max-w-2xl mx-auto mb-10">
                                <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                                    Leadership
                                </span>
                                <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold text-[#164a08]">
                                    Governing Committees & Councils
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {team.map((member) => (
                                    <div
                                        key={member.id}
                                        className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-md transition"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-[#F7F5EC] border border-[#164a08]/20 flex items-center justify-center text-[#164a08] mb-4">
                                            <User className="w-7 h-7" />
                                        </div>
                                        <h3 className="font-heading text-lg font-bold text-[#164a08]">
                                            {member.name}
                                        </h3>
                                        <div className="text-sm font-sans font-semibold text-[#3e7405] mt-0.5">
                                            {member.role}
                                        </div>
                                        <p className="mt-2.5 text-sm font-sans text-[#503323] leading-relaxed">
                                            {member.bio}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </AppLayout>
    );
}
