import React from 'react';
import AppLayout from '../Layouts/AppLayout';
import { ayurpravahDimensions, themeConvergence, pinnedConcepts } from '../content/ecosystem';

export default function AyurPravah() {
    return (
        <AppLayout
            title="The AyurPravah Conclave Philosophy"
            description="Explore the 9 circular dimensions, theme convergence, and clinical-technological synthesis defining AYURPRAVAH 2027."
        >
            {({ openRegisterWithTier }) => (
                <div className="py-16 space-y-20">
                    {/* Header Banner */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                            Conclave Ethos & Synthesis
                        </span>
                        <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-black text-[#164a08]">
                            The AyurPravah Confluence
                        </h1>
                        <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg font-sans text-[#503323] leading-relaxed">
                            "Pravah" (प्रवाह) signifies the perpetual, unceasing flow of authentic healing wisdom.
                            AYURPRAVAH 2027 harmonizes classical Vedic medical texts with cutting-edge 21st-century
                            clinical trials, biomedical engineering, and global healthcare policy.
                        </p>
                    </div>

                    {/* 9 Dimensions Circular Wheel / Grid */}
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-[#164a08] text-white rounded-3xl p-8 sm:p-14 border border-[#164a08]/30 shadow-xl">
                            <div className="text-center max-w-2xl mx-auto mb-10">
                                <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#DFC479] uppercase">
                                    Comprehensive Holism
                                </span>
                                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mt-2">
                                    9 Convergent Dimensions
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
                                {ayurpravahDimensions.map((dim, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-[#164a08]/40 border border-[#164a08]/30 p-6 rounded-3xl text-center flex flex-col items-center justify-center hover:border-[#DFC479] transition hover:scale-105"
                                    >
                                        <div className="font-mono text-sm text-[#DFC479] mb-1 font-semibold">
                                            0{idx + 1}
                                        </div>
                                        <div className="font-heading text-sm sm:text-base font-bold tracking-wider text-white">
                                            {dim}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Theme Convergence (6-way with x) */}
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                                Epistemological Confluence
                            </span>
                            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold text-[#164a08]">
                                The 6-Way Thematic Synthesis
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {themeConvergence.map((theme, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-md transition"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#164a08]/10 text-[#164a08] flex items-center justify-center font-heading font-bold text-sm mb-4">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="font-heading text-lg font-bold text-[#164a08]">
                                        {theme.title}
                                    </h3>
                                    <p className="mt-2 text-sm font-sans text-[#503323] leading-relaxed">
                                        {theme.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Pinned Concepts */}
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-[#F7F5EC] rounded-3xl p-8 sm:p-14 border border-[#164a08]/15">
                            <div className="text-center max-w-2xl mx-auto mb-10">
                                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#164a08]">
                                    Cornerstone Commitments of the Conclave
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {pinnedConcepts.map((item, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200/80">
                                        <h4 className="font-heading text-base font-bold text-[#164a08]">
                                            {item.title}
                                        </h4>
                                        <p className="mt-2 text-sm font-sans text-[#503323] leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 text-center">
                                <button
                                    onClick={() => openRegisterWithTier(null)}
                                    className="bg-[#164a08] text-white px-9 py-4 rounded-full font-heading text-sm font-bold tracking-wider hover:bg-[#0e3005] transition shadow-md"
                                >
                                    JOIN THE CONFLUENCE AS DELEGATE →
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </AppLayout>
    );
}
