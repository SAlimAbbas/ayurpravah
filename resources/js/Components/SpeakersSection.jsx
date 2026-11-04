import React, { useState } from "react";
import { User, MessageSquare, ArrowRight } from "lucide-react";
import SpeakerModal from "./SpeakerModal";
import { Link } from "@inertiajs/react";

const SpeakerAvatar = ({ speaker }) => {
    const [imgError, setImgError] = useState(false);

    const resolvePath = (s) => {
        const path = s?.photo_url || s?.photo;
        if (!path) return null;
        if (path.startsWith("http://") || path.startsWith("https://"))
            return path;
        if (path.startsWith("/storage/")) return path;
        if (path.startsWith("storage/")) return `/${path}`;
        return `/storage/${path.replace(/^\/+/, "")}`;
    };

    const photo = resolvePath(speaker);

    const getInitials = (name) => {
        if (!name) return "AP";
        const clean = name
            .replace(/^(Dr\.|Prof\.|Vd\.|Acharya|Ms\.|Mr\.)\s+/i, "")
            .replace(/[\(\)\[\]#0-9]/g, "")
            .replace(/\bTBC\b/gi, "")
            .trim();
        const parts = clean.split(/\s+/).filter(Boolean);
        if (parts.length === 0) return "AP";
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    if (photo && !imgError) {
        return (
            <img
                src={photo}
                alt={speaker.name}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
            />
        );
    }

    return (
        <div className="w-full h-full bg-gradient-to-br from-[#0e3005] via-[#164a08] to-[#243F05] flex flex-col items-center justify-center text-[#DFC479] font-heading font-bold select-none p-2 text-center">
            <span className="text-2xl sm:text-3xl tracking-widest">
                {getInitials(speaker.name)}
            </span>
            {speaker.country && speaker.country !== "TBC" && (
                <span className="text-[10px] text-[#ECE7D6]/80 font-sans tracking-wide uppercase mt-0.5 truncate max-w-[90px]">
                    {speaker.country}
                </span>
            )}
        </div>
    );
};

export default function SpeakersSection({ speakers = [] }) {
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("ALL");

    const categories = [
        "ALL",
        ...new Set(speakers.map((s) => s.category).filter(Boolean)),
    ];

    const filtered =
        activeCategory === "ALL"
            ? speakers
            : speakers.filter((s) => s.category === activeCategory);

    const handleOpenModal = (speaker) => {
        setSelectedSpeaker(speaker);
        setModalOpen(true);
    };

    return (
        <section
            id="speakers"
            className="py-12 sm:py-16 md:py-20 bg-white border-b border-black/5"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                    <span className="text-sm font-sans font-bold tracking-[0.2em] text-[#3e7405] uppercase">
                        Global Thought Leaders
                    </span>
                    <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#164a08]">
                        Eminent Speakers & Visionaries
                    </h2>
                    <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                    <p className="mt-4 text-base font-sans text-[#503323]/90 leading-relaxed">
                        Gathering leading researchers, clinical vaidyas,
                        institutional directors, and international health
                        policymakers sharing groundbreaking evidence and vision.
                    </p>
                </div>

                {/* Category Pills (50px Pure Curves) */}
                {categories.length > 2 && (
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-sans font-semibold transition cursor-pointer ${
                                    activeCategory === cat
                                        ? "bg-[#164a08] text-white shadow-md"
                                        : "bg-[#F7F5EC] text-[#503323] hover:bg-[#164a08]/10"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Speakers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filtered.map((speaker) => (
                        <div
                            key={speaker.id}
                            className="bg-[#F7F5EC] rounded-3xl p-6 border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                        >
                            <div>
                                {/* Speaker Avatar Frame */}
                                <div className="w-28 h-28 mx-auto rounded-full bg-white border-2 border-[#164a08]/20 flex items-center justify-center text-[#164a08] shadow-sm mb-5 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                    <SpeakerAvatar speaker={speaker} />
                                </div>

                                <div className="text-center">
                                    <span className="text-sm font-sans font-bold tracking-wider text-[#3e7405] uppercase">
                                        {speaker.category}
                                    </span>
                                    <h3 className="font-heading text-lg font-bold text-[#164a08] mt-1 group-hover:text-[#164a08] transition">
                                        {speaker.name}
                                    </h3>
                                    <p className="text-sm font-sans text-[#503323]/85 line-clamp-2 mt-1">
                                        {speaker.designation}
                                    </p>
                                    {speaker.institution && (
                                        <p className="text-sm font-sans text-[#3e7405] font-semibold mt-1 truncate">
                                            {speaker.institution}
                                        </p>
                                    )}
                                </div>

                                {speaker.talk_topic && (
                                    <div className="mt-5 bg-white p-4 rounded-2xl border border-black/5 text-left">
                                        <div className="text-sm font-heading font-bold text-[#164a08] uppercase tracking-wider flex items-center space-x-1.5">
                                            <MessageSquare className="w-3.5 h-3.5 text-[#164a08]" />
                                            <span>Topic</span>
                                        </div>
                                        <p className="text-base font-sans text-[#164a08] font-medium mt-1 line-clamp-2">
                                            "{speaker.talk_topic}"
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-sm font-heading font-semibold text-[#164a08]">
                                <button
                                    onClick={() => handleOpenModal(speaker)}
                                    className="hover:underline cursor-pointer"
                                >
                                    Quick Bio
                                </button>
                                <Link
                                    href={`/speakers/${speaker.slug}`}
                                    className="inline-flex items-center space-x-1.5 bg-[#164a08] text-white px-5 py-2.5 rounded-full text-sm hover:bg-[#0e3005] transition"
                                >
                                    <span>Profile</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Speakers Link (50px Pure Curve) */}
                <div className="mt-14 text-center">
                    <Link
                        href="/speakers"
                        className="inline-flex items-center space-x-2 bg-[#164a08] text-white px-8 py-3.5 rounded-full text-sm font-heading font-bold tracking-wider uppercase hover:bg-[#0e3005] transition shadow-md"
                    >
                        <span>VIEW ALL FACULTY & KEYNOTE BIOGRAPHIES</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Interactive Speaker Profile Modal */}
            <SpeakerModal
                speaker={selectedSpeaker}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </section>
    );
}
