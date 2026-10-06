import React, { useState } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { ArrowRight, Layers, CheckCircle2, Search } from 'lucide-react';
import { Link } from '@inertiajs/react';
import ConclaveModal from '../Components/ConclaveModal';

export default function Conclaves({ conclaves = [] }) {
    const [selectedConclave, setSelectedConclave] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState('');

    const filtered = conclaves.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        (c.short_description && c.short_description.toLowerCase().includes(search.toLowerCase()))
    );

    const handleOpenModal = (conclave) => {
        setSelectedConclave(conclave);
        setModalOpen(true);
    };

    return (
        <AppLayout
            title="13 Thematic Conclaves & Scientific Tracks"
            description="Explore all 13 specialized conclaves of AYURPRAVAH 2027 spanning clinical panchakarma, pharmacology, AI diagnostics, and policy."
        >
            {({ openRegisterWithTier }) => (
                <div className="py-16 space-y-16">
                    {/* Header */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-sm font-sans font-bold tracking-[0.2em] text-[#3e7405] uppercase">
                            Scientific & Thematic Tracks
                        </span>
                        <h1 className="mt-3 font-heading text-3xl sm:text-5xl md:text-6xl font-black text-[#164a08]">
                            13 Major Conclaves
                        </h1>
                        <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg font-sans text-[#503323]/90 leading-relaxed">
                            Each conclave operates as a dedicated scientific forum featuring keynotes,
                            evidence panels, hands-on masterclasses, and peer-reviewed oral and poster paper defenses.
                        </p>

                        {/* Search Input (50px pure curve) */}
                        <div className="mt-8 max-w-lg mx-auto relative">
                            <Search className="w-5 h-5 text-gray-400 absolute left-4.5 top-3.5" />
                            <input
                                type="text"
                                placeholder="Search tracks, clinical specialties, keywords..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full text-sm font-sans pl-12 pr-6 py-3.5 rounded-full border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#164a08]/30 shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Conclaves Grid */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((conclave, idx) => {
                                const focusAreas = Array.isArray(conclave.focus_areas)
                                    ? conclave.focus_areas
                                    : (typeof conclave.focus_areas === 'string' ? JSON.parse(conclave.focus_areas || '[]') : []);

                                return (
                                    <div
                                        key={conclave.id}
                                        className="bg-white rounded-3xl p-7 border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="w-11 h-11 rounded-full bg-[#164a08]/10 text-[#164a08] flex items-center justify-center font-bold text-sm">
                                                    <Layers className="w-5 h-5 text-[#164a08]" />
                                                </div>
                                                <span className="px-3.5 py-1 rounded-full bg-[#F7F5EC] font-mono text-sm text-[#164a08] font-bold tracking-wider">
                                                    TRACK {String(idx + 1).padStart(2, '0')}
                                                </span>
                                            </div>

                                            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#164a08] group-hover:text-[#164a08] transition leading-snug">
                                                {conclave.title}
                                            </h3>

                                            <p className="mt-3 text-base font-sans text-[#503323]/85 leading-relaxed line-clamp-3">
                                                {conclave.short_description}
                                            </p>

                                            {focusAreas.length > 0 && (
                                                <div className="mt-5 pt-4 border-t border-black/5 space-y-1.5 text-base text-[#503323]/85">
                                                    <span className="text-sm font-sans font-bold tracking-wider text-[#3e7405] uppercase block">
                                                        Core Focus Areas:
                                                    </span>
                                                    <p className="truncate text-sm sm:text-base">
                                                        • {focusAreas[0]}
                                                    </p>
                                                    {focusAreas[1] && (
                                                        <p className="truncate text-sm sm:text-base">
                                                            • {focusAreas[1]}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-6 pt-5 border-t border-black/5 flex items-center justify-between">
                                            <button
                                                onClick={() => handleOpenModal(conclave)}
                                                className="text-sm font-sans font-semibold text-[#3e7405] hover:text-[#164a08] cursor-pointer"
                                            >
                                                Quick Preview
                                            </button>
                                            <Link
                                                href={`/conclaves/${conclave.slug}`}
                                                className="inline-flex items-center space-x-2 bg-[#164a08] text-white px-5 py-2.5 rounded-full text-sm font-heading font-bold tracking-wider hover:bg-[#0e3005] transition shadow-sm"
                                            >
                                                <span>FULL TRACK</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Modal placed cleanly INSIDE layout render */}
                    <ConclaveModal
                        conclave={selectedConclave}
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                    />
                </div>
            )}
        </AppLayout>
    );
}
