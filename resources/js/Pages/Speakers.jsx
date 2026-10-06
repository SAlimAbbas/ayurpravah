import React, { useState } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { User, MessageSquare, ArrowRight, Building, Globe, Search } from 'lucide-react';
import { Link } from '@inertiajs/react';
import SpeakerModal from '../Components/SpeakerModal';

export default function Speakers({ speakers = [], categories = [] }) {
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [search, setSearch] = useState('');

    const allCategories = ['ALL', ...categories];

    const filtered = speakers.filter(s => {
        const matchesCategory = activeCategory === 'ALL' || s.category === activeCategory;
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
            (s.talk_topic && s.talk_topic.toLowerCase().includes(search.toLowerCase())) ||
            (s.institution && s.institution.toLowerCase().includes(search.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const resolveSpeakerPhoto = (speaker) => {
        const path = speaker?.photo_url || speaker?.photo;
        if (!path) return null;
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        if (path.startsWith('/storage/')) return path;
        if (path.startsWith('storage/')) return `/${path}`;
        return `/storage/${path.replace(/^\/+/, '')}`;
    };

    const handleOpenModal = (speaker) => {
        setSelectedSpeaker(speaker);
        setModalOpen(true);
    };

    return (
        <AppLayout
            title="Conclave Faculty & Speakers Directory"
            description="Explore the distinguished keynote speakers, medical researchers, vaidyas, and healthcare directors speaking at AYURPRAVAH 2027."
        >
            {({ openRegisterWithTier }) => (
                <div className="py-16 space-y-16">
                    {/* Header */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-sm font-sans font-bold tracking-[0.2em] text-[#3e7405] uppercase">
                            Global Academic & Clinical Faculty
                        </span>
                        <h1 className="mt-3 font-heading text-3xl sm:text-5xl md:text-6xl font-black text-[#164a08]">
                            Speakers & Faculty
                        </h1>
                        <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg font-sans text-[#503323]/90 leading-relaxed">
                            Discover the visionary clinicians, scientists, and healthcare innovators
                            delivering keynotes, leading panels, and conducting masterclasses at AYURPRAVAH 2027.
                        </p>

                        {/* Search & Categories (Pure 50px curves) */}
                        <div className="mt-8 max-w-lg mx-auto relative">
                            <Search className="w-5 h-5 text-gray-400 absolute left-4.5 top-3.5" />
                            <input
                                type="text"
                                placeholder="Search by faculty name, topic, or institution..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full text-sm font-sans pl-12 pr-6 py-3.5 rounded-full border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#164a08]/30 shadow-sm"
                            />
                        </div>

                        {allCategories.length > 2 && (
                            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
                                {allCategories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-5 py-2.5 rounded-full text-sm font-sans font-medium transition cursor-pointer ${
                                            activeCategory === cat
                                                ? 'bg-[#164a08] text-white shadow-md'
                                                : 'bg-white text-[#503323] border border-black/5 hover:border-[#164a08]'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Speakers Grid */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filtered.map((speaker) => (
                                <div
                                    key={speaker.id}
                                    className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                                >
                                    <div>
                                        {/* Avatar */}
                                        <div className="w-28 h-28 mx-auto rounded-full bg-[#F7F5EC] border border-[#164a08]/20 flex items-center justify-center text-[#164a08] shadow-inner mb-5 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                            {resolveSpeakerPhoto(speaker) ? (
                                                <img src={resolveSpeakerPhoto(speaker)} alt={speaker.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-[#164a08]/15 to-[#3e7405]/20 flex items-center justify-center">
                                                    <User className="w-12 h-12 text-[#164a08]/70" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-center">
                                            <span className="text-sm font-sans font-bold tracking-wider text-[#3e7405] uppercase">
                                                {speaker.category}
                                            </span>
                                            <h3 className="font-heading text-lg font-bold text-[#164a08] mt-1 group-hover:text-[#164a08] transition">
                                                {speaker.name}
                                            </h3>
                                            <p className="text-sm font-sans text-[#503323]/85 mt-1 line-clamp-2">
                                                {speaker.designation}
                                            </p>
                                            {speaker.institution && (
                                                <p className="text-sm font-sans text-[#3e7405] font-semibold mt-1 truncate">
                                                    {speaker.institution}
                                                </p>
                                            )}
                                        </div>

                                        {speaker.talk_topic && (
                                            <div className="mt-5 bg-[#F7F5EC] p-4 rounded-2xl border border-black/5 text-left">
                                                <div className="text-sm font-heading font-bold text-[#164a08] uppercase tracking-wider flex items-center space-x-1.5">
                                                    <MessageSquare className="w-3.5 h-3.5 text-[#164a08]" />
                                                    <span>Presentation Topic</span>
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
                                            <span>Full Profile</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Modal placed INSIDE layout render */}
                    <SpeakerModal
                        speaker={selectedSpeaker}
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                    />
                </div>
            )}
        </AppLayout>
    );
}
