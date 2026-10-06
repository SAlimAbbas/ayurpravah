import React, { useState } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { Calendar, Clock, MapPin, Search, ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Program({ sessions = [], tracks = [], days = [] }) {
    const [activeDay, setActiveDay] = useState(1);
    const [selectedTrack, setSelectedTrack] = useState('All');
    const [search, setSearch] = useState('');

    const filtered = sessions.filter((s) => {
        const matchesDay = s.day_number === activeDay;
        const matchesTrack = selectedTrack === 'All' || s.track === selectedTrack;
        const matchesSearch =
            !search ||
            s.title.toLowerCase().includes(search.toLowerCase()) ||
            (s.description && s.description.toLowerCase().includes(search.toLowerCase())) ||
            (s.hall_room && s.hall_room.toLowerCase().includes(search.toLowerCase()));
        return matchesDay && matchesTrack && matchesSearch;
    });

    return (
        <AppLayout
            title="Scientific Schedule & Detailed Agenda"
            description="Explore the complete 3-day scientific agenda of AYURPRAVAH 2027 across multiple concurrent auditoriums and clinical arenas."
        >
            {() => (
                <div className="py-16 space-y-14">
                    {/* Header */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                            Scientific Timetable
                        </span>
                        <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-black text-[#164a08]">
                            Conclave Program Schedule
                        </h1>
                        <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg font-sans text-[#503323] leading-relaxed">
                            Filter sessions by day, scientific track, or search keywords. All sessions take place in accordance with the Indian Standard Time (IST).
                        </p>
                    </div>

                    {/* Day Selection Tabs */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                            {days.map((d) => (
                                <button
                                    key={d.day}
                                    onClick={() => setActiveDay(d.day)}
                                    className={`p-6 rounded-3xl text-left border transition-all ${
                                        activeDay === d.day
                                            ? 'bg-[#164a08] text-white border-[#164a08] shadow-lg'
                                            : 'bg-white text-[#503323] border-stone-200 hover:border-[#164a08]/40'
                                    }`}
                                >
                                    <div className="font-heading text-base sm:text-lg font-bold tracking-wider">
                                        {d.label}
                                    </div>
                                    <p className={`text-sm mt-1.5 ${activeDay === d.day ? 'text-[#DFC479]' : 'text-[#3e7405]'}`}>
                                        {d.theme}
                                    </p>
                                </button>
                            ))}
                        </div>

                        {/* Filters & Search */}
                        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
                            <div className="w-full md:w-96 relative">
                                <Search className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
                                <input
                                    type="text"
                                    placeholder="Search by topic, speaker, hall..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full text-sm pl-11 pr-4 py-2.5 border border-stone-300 rounded-full focus:ring-2 focus:ring-[#164a08]/30"
                                />
                            </div>

                            {tracks.length > 2 && (
                                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                                    <span className="text-sm font-sans font-bold text-[#3e7405] uppercase mr-1">
                                        Track:
                                    </span>
                                    {tracks.map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setSelectedTrack(t)}
                                            className={`px-4 py-2 rounded-full text-sm font-sans font-medium transition ${
                                                selectedTrack === t
                                                    ? 'bg-[#164a08] text-white shadow-sm'
                                                    : 'bg-[#F7F5EC] text-stone-700 hover:bg-stone-200'
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sessions List */}
                        <div className="space-y-4">
                            {filtered.length > 0 ? (
                                filtered.map((session) => (
                                    <div
                                        key={session.id}
                                        className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between gap-6"
                                    >
                                        <div className="space-y-2.5 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-sm font-bold text-[#164a08] uppercase bg-[#164a08]/10 px-3.5 py-1 rounded-full">
                                                    {session.type}
                                                </span>
                                                {session.track && (
                                                    <span className="text-sm font-bold text-[#3e7405] uppercase bg-[#3e7405]/10 px-3.5 py-1 rounded-full">
                                                        {session.track}
                                                    </span>
                                                )}
                                                {session.conclave && (
                                                    <span className="text-sm text-stone-500 font-medium">
                                                        Conclave: {session.conclave.title}
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#164a08]">
                                                {session.title}
                                            </h3>

                                            {session.description && (
                                                <p className="text-base font-sans text-[#503323] leading-relaxed">
                                                    {session.description}
                                                </p>
                                            )}

                                            {session.speakers && session.speakers.length > 0 && (
                                                <div className="pt-2 flex flex-wrap items-center gap-3 text-sm text-[#164a08]">
                                                    <span className="font-semibold text-stone-500">Speakers:</span>
                                                    {session.speakers.map((sp) => (
                                                        <Link
                                                            key={sp.id}
                                                            href={`/speakers/${sp.slug}`}
                                                            className="hover:underline font-semibold text-[#164a08]"
                                                        >
                                                            {sp.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="border-t md:border-t-0 md:border-l md:pl-6 pt-3 md:pt-0 border-stone-100 shrink-0 text-left md:text-right space-y-1.5">
                                            <div className="flex md:justify-end items-center space-x-1.5 font-mono text-base font-bold text-[#164a08]">
                                                <Clock className="w-4 h-4 text-[#164a08]" />
                                                <span>
                                                    {session.start_time?.slice(0, 5)} - {session.end_time?.slice(0, 5)}
                                                </span>
                                            </div>
                                            {session.hall_room && (
                                                <div className="flex md:justify-end items-center space-x-1 text-sm text-[#3e7405]">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{session.hall_room}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white rounded-3xl p-12 text-center text-sm text-stone-500 border border-stone-200">
                                    No sessions matching your filter criteria.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
