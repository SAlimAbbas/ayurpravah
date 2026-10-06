import React, { useState } from 'react';
import { Clock, MapPin, User, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function ProgramPreviewSection({ sessions = [] }) {
    const [activeDay, setActiveDay] = useState(1);

    const days = [
        { day: 1, label: 'DAY 1', date: 'Fri, 16 April 2027', theme: 'Inaugural & Foundations' },
        { day: 2, label: 'DAY 2', date: 'Sat, 17 April 2027', theme: 'Clinical Mastery & AI' },
        { day: 3, label: 'DAY 3', date: 'Sun, 18 April 2027', theme: 'Research & Valedictory' },
    ];

    const currentSessions = sessions.filter(s => s.day_number === activeDay);

    return (
        <section id="program" className="relative py-24 bg-[#F7F5EC] border-b border-black/5 overflow-hidden">
            {/* Subtle Light Vedic Mandala & Jaali Arch Background Graphic */}
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
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="text-sm font-sans font-bold tracking-[0.2em] text-[#3e7405] uppercase">
                        Scientific Agenda
                    </span>
                    <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#164a08]">
                        3-Day Conclave Program Preview
                    </h2>
                    <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                    <p className="mt-4 text-base font-sans text-[#503323]/90 leading-relaxed">
                        Curated plenary addresses, concurrent symposia, tactile masterclasses,
                        and poster defenses across state-of-the-art auditoriums.
                    </p>
                </div>

                {/* Day Selection Tabs (Smooth 50px Pill Curves) */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12 max-w-3xl mx-auto">
                    {days.map((d) => (
                        <button
                            key={d.day}
                            onClick={() => setActiveDay(d.day)}
                            className={`w-full sm:w-1/3 py-3.5 px-6 rounded-full text-center transition-all cursor-pointer ${
                                activeDay === d.day
                                    ? 'bg-[#164a08] text-white shadow-md'
                                    : 'bg-white text-[#503323] border border-black/5 hover:border-[#164a08]/30'
                            }`}
                        >
                            <div className="font-heading text-sm font-bold tracking-wider">
                                {d.label}
                            </div>
                            <div className={`text-xs mt-0.5 ${activeDay === d.day ? 'text-[#DFC479]' : 'text-[#3e7405]'}`}>
                                {d.date}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Day Sessions List */}
                <div className="space-y-5 max-w-5xl mx-auto">
                    {currentSessions.length > 0 ? (
                        currentSessions.map((session) => (
                            <div
                                key={session.id}
                                className="bg-white rounded-3xl p-7 border border-black/5 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                            >
                                <div className="space-y-2 flex-1">
                                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-sans font-bold uppercase tracking-wider">
                                        <span className="bg-[#164a08]/10 text-[#164a08] px-3.5 py-1 rounded-full">
                                            {session.type}
                                        </span>
                                        {session.track && (
                                            <span className="bg-[#F7F5EC] text-[#3e7405] px-3.5 py-1 rounded-full">
                                                {session.track}
                                            </span>
                                        )}
                                    </div>

                                    <h4 className="font-heading text-lg font-bold text-[#164a08]">
                                        {session.title}
                                    </h4>

                                    {session.description && (
                                        <p className="text-sm font-sans text-[#503323]/85 leading-relaxed">
                                            {session.description}
                                        </p>
                                    )}

                                    {/* Speakers associated */}
                                    {session.speakers && session.speakers.length > 0 && (
                                        <div className="pt-2 flex flex-wrap items-center gap-2 text-sm text-[#164a08]">
                                            <User className="w-4 h-4 text-[#3e7405]" />
                                            {session.speakers.map((s, idx) => (
                                                <span key={s.id} className="font-semibold">
                                                    {s.name}{idx < session.speakers.length - 1 ? ',' : ''}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-black/5 shrink-0 text-right text-sm space-y-1.5">
                                    <div className="flex items-center space-x-2 font-mono font-bold text-[#164a08] text-base">
                                        <Clock className="w-4.5 h-4.5 text-[#164a08]" />
                                        <span>
                                            {session.start_time?.slice(0, 5)} - {session.end_time?.slice(0, 5)}
                                        </span>
                                    </div>
                                    {session.hall_room && (
                                        <div className="flex items-center space-x-1.5 text-xs text-[#3e7405] font-medium">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>{session.hall_room}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-3xl p-10 text-center text-sm text-gray-500 border border-black/5">
                            Session details for this day will be finalized shortly.
                        </div>
                    )}
                </div>

                {/* View Full Program Link (50px Pure Curve) */}
                <div className="mt-14 text-center">
                    <Link
                        href="/program"
                        className="inline-flex items-center space-x-2 bg-[#164a08] text-white px-8 py-3.5 rounded-full text-sm font-heading font-bold tracking-wider uppercase hover:bg-[#0e3005] transition shadow-md"
                    >
                        <span>VIEW COMPLETE SCHEDULE & VENUE TRACK MAP</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
