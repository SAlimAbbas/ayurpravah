import React from 'react';
import { X, User, Award, Building, Globe, MessageSquare } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function SpeakerModal({ speaker, isOpen, onClose }) {
    if (!isOpen || !speaker) return null;

    const getInitials = (name) => {
        if (!name) return 'AP';
        const clean = name.replace(/^(Dr\.|Prof\.|Vd\.|Acharya|Ms\.|Mr\.)\s+/i, '').trim();
        const parts = clean.split(' ').filter(Boolean);
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 md:p-6">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-stone-200/60 relative animate-in fade-in zoom-in-95 duration-200 my-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0e3005] to-[#164a08] text-white p-5 sm:p-7 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-white transition cursor-pointer"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="flex items-center space-x-3.5 sm:space-x-4">
                        {(() => {
                            const photo = speaker?.photo_url || speaker?.photo;
                            const resolvedPhoto = !photo ? null : (photo.startsWith('http://') || photo.startsWith('https://') || photo.startsWith('/storage/') ? photo : (photo.startsWith('storage/') ? `/${photo}` : `/storage/${photo.replace(/^\/+/, '')}`));
                            return (
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 border-2 border-[#DFC479] flex items-center justify-center text-white shrink-0 overflow-hidden shadow-inner">
                                    {resolvedPhoto ? (
                                        <img
                                            src={resolvedPhoto}
                                            alt={speaker.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />
                                    ) : (
                                        <span className="font-heading font-bold text-lg sm:text-xl text-[#DFC479]">
                                            {getInitials(speaker.name)}
                                        </span>
                                    )}
                                </div>
                            );
                        })()}
                        <div className="min-w-0 pr-6">
                            <span className="text-[11px] sm:text-xs font-sans font-bold tracking-wider text-[#DFC479] uppercase block truncate">
                                {speaker.category || 'Conclave Speaker'}
                            </span>
                            <h3 className="font-heading text-lg sm:text-2xl font-bold text-white truncate">
                                {speaker.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#ECE7D6]/90 font-sans mt-0.5 line-clamp-2">
                                {speaker.designation}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-7 space-y-4 sm:space-y-5 max-h-[65vh] overflow-y-auto">
                    {speaker.institution && (
                        <div className="flex items-center space-x-2 text-sm text-[#503323]">
                            <Building className="w-4 h-4 text-[#164a08] shrink-0" />
                            <span><strong>Institution:</strong> {speaker.institution}</span>
                            {speaker.country && <span>({speaker.country})</span>}
                        </div>
                    )}

                    {speaker.talk_topic && (
                        <div className="bg-[#F7F5EC] p-4 rounded-2xl border border-[#164a08]/15">
                            <div className="text-xs font-heading font-bold text-[#164a08] uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>Keynote / Presentation Topic</span>
                            </div>
                            <p className="text-base font-heading font-semibold text-[#164a08]">
                                "{speaker.talk_topic}"
                            </p>
                        </div>
                    )}

                    {speaker.bio && (
                        <div>
                            <h4 className="font-heading text-sm font-bold text-[#164a08] uppercase tracking-wider mb-2">
                                Biography & Academic Contributions
                            </h4>
                            <p className="text-base font-sans text-[#503323] leading-relaxed whitespace-pre-line">
                                {speaker.bio}
                            </p>
                        </div>
                    )}

                    <div className="pt-3 flex justify-end border-t border-stone-200">
                        <Link
                            href={`/speakers/${speaker.slug}`}
                            className="bg-[#164a08] text-white px-7 py-3 rounded-full text-sm font-heading font-bold tracking-wider hover:bg-[#0e3005] transition shadow-md"
                        >
                            VIEW FULL PROFILE →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
