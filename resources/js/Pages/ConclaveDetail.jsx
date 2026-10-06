import React from 'react';
import AppLayout from '../Layouts/AppLayout';
import { ArrowLeft, CheckCircle2, Clock, MapPin, BookOpen } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function ConclaveDetail({ conclave, otherConclaves = [] }) {
    const focusAreas = Array.isArray(conclave.focus_areas)
        ? conclave.focus_areas
        : (typeof conclave.focus_areas === 'string' ? JSON.parse(conclave.focus_areas || '[]') : []);

    return (
        <AppLayout
            title={conclave.title}
            description={conclave.short_description}
        >
            {({ openRegisterWithTier }) => (
                <div className="py-16 space-y-14">
                    {/* Breadcrumbs & Header */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link
                            href="/conclaves"
                            className="inline-flex items-center space-x-2 text-sm font-sans font-semibold text-[#3e7405] hover:text-[#164a08] mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to All 13 Conclaves</span>
                        </Link>

                        <div className="bg-[#164a08] text-white rounded-3xl p-8 sm:p-12 border border-[#164a08]/30 shadow-xl relative overflow-hidden">
                            <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#DFC479] uppercase">
                                Thematic Conclave Track
                            </span>
                            <h1 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                                {conclave.title}
                            </h1>
                            <p className="mt-4 text-base sm:text-lg font-sans text-[#ECE7D6]/90 max-w-3xl leading-relaxed">
                                {conclave.description || conclave.short_description}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    href={`/submit-abstract?track=${encodeURIComponent(conclave.title)}`}
                                    className="bg-[#DFC479] text-[#164a08] px-8 py-3.5 rounded-full font-heading text-sm font-bold tracking-wider hover:bg-white transition shadow-md"
                                >
                                    SUBMIT SCIENTIFIC ABSTRACT →
                                </Link>
                                <button
                                    onClick={() => openRegisterWithTier(null)}
                                    className="border border-white/40 text-white px-8 py-3.5 rounded-full font-heading text-sm font-bold tracking-wider hover:bg-white/10 transition"
                                >
                                    REGISTER FOR THIS CONCLAVE
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Focus Areas & Workshop Grid */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {/* Focus Areas */}
                            {focusAreas.length > 0 && (
                                <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm">
                                    <h3 className="font-heading text-lg font-bold text-[#164a08] uppercase tracking-wider mb-5 flex items-center space-x-2">
                                        <BookOpen className="w-5 h-5 text-[#164a08]" />
                                        <span>Key Focus Areas & Academic Scope</span>
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        {focusAreas.map((area, idx) => (
                                            <div key={idx} className="flex items-start space-x-2.5 text-sm text-[#503323]">
                                                <CheckCircle2 className="w-4 h-4 text-[#164a08] shrink-0 mt-0.5" />
                                                <span>{area}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Workshop Info */}
                            {conclave.workshop_info && (
                                <div className="bg-[#F7F5EC] rounded-3xl p-8 border border-[#164a08]/15">
                                    <span className="text-sm font-sans font-bold tracking-wider text-[#3e7405] uppercase">
                                        Hands-On Masterclass
                                    </span>
                                    <h3 className="font-heading text-xl font-bold text-[#164a08] mt-1 mb-2">
                                        Clinical Demonstrations & Workshop
                                    </h3>
                                    <p className="text-base font-sans text-[#503323] leading-relaxed">
                                        {conclave.workshop_info}
                                    </p>
                                </div>
                            )}

                            {/* Associated Sessions */}
                            {conclave.sessions && conclave.sessions.length > 0 && (
                                <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm">
                                    <h3 className="font-heading text-lg font-bold text-[#164a08] uppercase tracking-wider mb-5">
                                        Scheduled Sessions for this Conclave
                                    </h3>
                                    <div className="space-y-4">
                                        {conclave.sessions.map((s) => (
                                            <div key={s.id} className="p-5 rounded-2xl bg-[#F7F5EC] border border-stone-200/60 flex flex-col sm:flex-row justify-between gap-3">
                                                <div>
                                                    <span className="text-sm font-bold text-[#164a08] uppercase bg-[#164a08]/10 px-3.5 py-1 rounded-full">
                                                        Day {s.day_number} • {s.type}
                                                    </span>
                                                    <h4 className="font-heading text-base font-bold text-[#164a08] mt-2">
                                                        {s.title}
                                                    </h4>
                                                    {s.description && (
                                                        <p className="text-base font-sans text-[#503323] mt-1 leading-relaxed">{s.description}</p>
                                                    )}
                                                </div>
                                                <div className="text-right text-sm shrink-0 font-mono text-[#164a08]">
                                                    {s.start_time?.slice(0, 5)} - {s.end_time?.slice(0, 5)}
                                                    {s.hall_room && <div className="text-sm text-stone-500 font-sans mt-0.5">{s.hall_room}</div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar: Other Conclaves */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm">
                                <h4 className="font-heading text-base font-bold text-[#164a08] uppercase tracking-wider mb-4">
                                    Other Conclaves
                                </h4>
                                <div className="space-y-3">
                                    {otherConclaves.map((other) => (
                                        <Link
                                            key={other.id}
                                            href={`/conclaves/${other.slug}`}
                                            className="block p-4 rounded-2xl bg-[#F7F5EC] hover:bg-[#164a08]/10 transition"
                                        >
                                            <div className="font-heading text-base font-bold text-[#164a08]">
                                                {other.title}
                                            </div>
                                            <p className="text-sm text-stone-600 line-clamp-1 mt-1">
                                                {other.short_description}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
