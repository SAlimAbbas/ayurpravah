import React from "react";
import AppLayout from "../Layouts/AppLayout";
import {
    yasharthPillars,
    yasharthStats,
    ayurWingsNodes,
    ayurWingsStats,
} from "../content/ecosystem";
import { User } from "lucide-react";

export default function About({ team = [] }) {
    return (
        <AppLayout
            title="About Organisers & Ecosystem"
            description="Discover Yasharth Veda Foundation and AyurWings Health Tech — the institutional vision behind AYURPRAVAH 2027."
        >
            {() => (
                <div className="py-16 space-y-16">
                    {/* Header Banner */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                            Institutional Genesis
                        </span>
                        <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-black text-[#164a08]">
                            About The Ecosystem
                        </h1>
                        <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg font-sans text-[#503323] leading-relaxed">
                            AYURPRAVAH 2027 represents the collective confluence
                            of foundational non-profit research, clinical
                            mastery, and high-performance digital healthcare
                            infrastructure.
                        </p>
                    </div>

                    {/* Yasharth Veda Foundation Deep Dive */}
                    <section
                        id="yasharth"
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    >
                        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-sm space-y-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-100 pb-8">
                                <div className="space-y-2">
                                    <span className="text-sm font-sans font-bold tracking-widest text-[#3e7405] uppercase">
                                        Foundational Non-Profit Trust
                                    </span>
                                    <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#164a08]">
                                        Yasharth Veda Foundation
                                    </h2>
                                    <p className="text-base font-sans text-[#3e7405] font-semibold italic">
                                        "Builds the ecosystem."
                                    </p>
                                </div>
                                <div className="text-base text-[#503323] max-w-md leading-relaxed">
                                    Working across traditional knowledge,
                                    translational research, clinical excellence,
                                    academic modernization, emerging technology,
                                    and community health.
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
                                        <div className="text-sm font-sans text-[#503323] mt-1.5 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 8 Operational Pillars */}
                            <div>
                                <h3 className="font-heading text-lg font-bold text-[#164a08] uppercase tracking-wider mb-5">
                                    8 Core Operational Pillars
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                                            <p className="text-sm font-sans text-[#503323] leading-relaxed">
                                                {p.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* AyurWings Health Tech Deep Dive */}
                    <section
                        id="ayurwings"
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    >
                        <div className="bg-[#164a08] text-white rounded-3xl p-8 sm:p-12 border border-[#164a08]/30 shadow-xl space-y-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#164a08] pb-8">
                                <div className="space-y-2">
                                    <span className="text-sm font-sans font-bold tracking-widest text-[#DFC479] uppercase">
                                        Digital Healthcare Enterprise
                                    </span>
                                    <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                                        AyurWings Health Tech
                                    </h2>
                                    <p className="text-base font-sans text-[#DFC479] font-semibold italic">
                                        "Powers the ecosystem digitally."
                                    </p>
                                </div>
                                <div className="text-base text-[#ECE7D6]/90 max-w-md leading-relaxed">
                                    A premier digital health platform empowering
                                    Ayurvedic professionals and healthcare
                                    institutions worldwide through advanced
                                    medical education, digital workflows, and
                                    telehealth.
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
                                        <div className="text-sm font-sans text-[#ECE7D6]/90 mt-1.5 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* AyurWings 8 Nodes */}
                            <div>
                                <h3 className="font-heading text-base font-bold text-[#DFC479] uppercase tracking-wider mb-4">
                                    Key Functional Verticals
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {ayurWingsNodes.map((node, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-[#164a08]/30 px-5 py-3 rounded-full border border-[#DFC479]/20 text-sm font-heading font-medium text-white flex items-center space-x-2"
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
