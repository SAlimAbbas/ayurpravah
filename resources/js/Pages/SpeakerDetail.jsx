import React from 'react';
import AppLayout from '../Layouts/AppLayout';
import { ArrowLeft, User, Building, MessageSquare } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function SpeakerDetail({ speaker, otherSpeakers = [] }) {
    const resolveSpeakerPhoto = (spk) => {
        const path = spk?.photo_url || spk?.photo;
        if (!path) return null;
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        if (path.startsWith('/storage/')) return path;
        if (path.startsWith('storage/')) return `/${path}`;
        return `/storage/${path.replace(/^\/+/, '')}`;
    };

    return (
        <AppLayout
            title={`${speaker.name} — Conclave Faculty`}
            description={speaker.talk_topic || speaker.designation}
        >
            {() => (
                <div className="py-16 space-y-14">
                    {/* Breadcrumbs */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link
                            href="/speakers"
                            className="inline-flex items-center space-x-2 text-sm font-sans font-semibold text-[#3e7405] hover:text-[#164a08] mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Speakers Directory</span>
                        </Link>

                        {/* Speaker Hero Card */}
                        <div className="bg-[#164a08] text-white rounded-3xl p-8 sm:p-12 border border-[#164a08]/30 shadow-xl flex flex-col md:flex-row items-center md:items-start gap-8">
                            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/10 border-4 border-[#DFC479] flex items-center justify-center text-white shrink-0 overflow-hidden shadow-inner">
                                {resolveSpeakerPhoto(speaker) ? (
                                    <img src={resolveSpeakerPhoto(speaker)} alt={speaker.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-16 h-16 text-[#DFC479]" />
                                )}
                            </div>

                            <div className="space-y-3 text-center md:text-left flex-1">
                                <span className="text-sm font-sans font-bold tracking-[0.2em] text-[#DFC479] uppercase">
                                    {speaker.category || 'Conclave Speaker'}
                                </span>
                                <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                                    {speaker.name}
                                </h1>
                                <p className="text-base sm:text-lg font-sans text-[#ECE7D6]/90">
                                    {speaker.designation}
                                </p>
                                {speaker.institution && (
                                    <div className="flex items-center justify-center md:justify-start space-x-2 text-sm sm:text-base text-[#DFC479]">
                                        <Building className="w-4 h-4 shrink-0" />
                                        <span>{speaker.institution}</span>
                                        {speaker.country && <span>({speaker.country})</span>}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bio & Talks Grid */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {/* Talk Topic Spotlight */}
                            {speaker.talk_topic && (
                                <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm">
                                    <div className="text-sm font-heading font-bold text-[#164a08] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                                        <MessageSquare className="w-4 h-4" />
                                        <span>Keynote Address / Topic</span>
                                    </div>
                                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#164a08] mt-1">
                                        "{speaker.talk_topic}"
                                    </h3>
                                </div>
                            )}

                            {/* Biography */}
                            {speaker.bio && (
                                <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm">
                                    <h3 className="font-heading text-lg font-bold text-[#164a08] uppercase tracking-wider mb-3">
                                        Faculty Biography & Credentials
                                    </h3>
                                    <p className="text-base font-sans text-[#503323] leading-relaxed whitespace-pre-line">
                                        {speaker.bio}
                                    </p>
                                </div>
                            )}

                            {/* Scheduled Sessions */}
                            {speaker.sessions && speaker.sessions.length > 0 && (
                                <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm">
                                    <h3 className="font-heading text-lg font-bold text-[#164a08] uppercase tracking-wider mb-5">
                                        Sessions & Timetable
                                    </h3>
                                    <div className="space-y-4">
                                        {speaker.sessions.map((sess) => (
                                            <div key={sess.id} className="p-5 rounded-2xl bg-[#F7F5EC] border border-stone-200/60 flex flex-col sm:flex-row justify-between gap-3">
                                                <div>
                                                    <span className="text-sm font-bold text-[#164a08] uppercase bg-[#164a08]/10 px-3.5 py-1 rounded-full">
                                                        Day {sess.day_number} • {sess.type}
                                                    </span>
                                                    <h4 className="font-heading text-base font-bold text-[#164a08] mt-2">
                                                        {sess.title}
                                                    </h4>
                                                </div>
                                                <div className="text-right text-sm shrink-0 font-mono text-[#164a08]">
                                                    {sess.start_time?.slice(0, 5)} - {sess.end_time?.slice(0, 5)}
                                                    {sess.hall_room && <div className="text-sm text-stone-500 font-sans mt-0.5">{sess.hall_room}</div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar: Other Faculty */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm">
                                <h4 className="font-heading text-base font-bold text-[#164a08] uppercase tracking-wider mb-4">
                                    Other Faculty Members
                                </h4>
                                <div className="space-y-3">
                                    {otherSpeakers.map((other) => (
                                        <Link
                                            key={other.id}
                                            href={`/speakers/${other.slug}`}
                                            className="block p-4 rounded-2xl bg-[#F7F5EC] hover:bg-[#164a08]/10 transition"
                                        >
                                            <div className="font-heading text-base font-bold text-[#164a08]">
                                                {other.name}
                                            </div>
                                            <p className="text-sm text-stone-600 line-clamp-1 mt-1">
                                                {other.designation}
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
