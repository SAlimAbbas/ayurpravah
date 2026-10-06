import React, { useState } from 'react';
import { ArrowRight, Layers, CheckCircle2, Search } from 'lucide-react';
import ConclaveModal from './ConclaveModal';
import { Link } from '@inertiajs/react';

export default function ConclavesSection({ conclaves = [] }) {
    const [selectedConclave, setSelectedConclave] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpenModal = (conclave) => {
        setSelectedConclave(conclave);
        setModalOpen(true);
    };

    const filteredConclaves = conclaves.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.short_description && c.short_description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <section id="conclaves" className="relative py-24 bg-[#F7F5EC] border-b border-black/5 overflow-hidden">
            {/* Subtle Light Herbal Botanical Background Graphic */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
                <img
                    src="/images/section-bg-herbal.jpg"
                    alt="Ayurvedic Herbal Botanical Pattern"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5EC]/70 via-[#F7F5EC]/40 to-[#F7F5EC]/80" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="text-sm font-sans font-bold tracking-[0.2em] text-[#3e7405] uppercase">
                        The Core Scientific Program
                    </span>
                    <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#164a08]">
                        13 Thematic Conclaves & Summits
                    </h2>
                    <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                    <p className="mt-4 text-base font-sans text-[#503323]/90 leading-relaxed">
                        Spanning every vital frontier of modern and classical Ayurveda — from clinical
                        panchakarma excellence and pharmaceutical innovations to AI prakriti diagnostics
                        and international health diplomacy.
                    </p>

                    {/* Quick Search (50px Pure Curve) */}
                    <div className="mt-8 max-w-lg mx-auto relative">
                        <Search className="w-5 h-5 text-gray-400 absolute left-4.5 top-3.5" />
                        <input
                            type="text"
                            placeholder="Filter by conclave title or keyword..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full text-sm font-sans pl-12 pr-6 py-3.5 rounded-full border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#164a08]/30 shadow-sm"
                        />
                    </div>
                </div>

                {/* 13 Conclaves Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredConclaves.map((conclave, idx) => {
                        const isFeatured = conclave.layout === 'featured' || idx === 0;
                        const focusAreas = Array.isArray(conclave.focus_areas)
                            ? conclave.focus_areas
                            : (typeof conclave.focus_areas === 'string' ? JSON.parse(conclave.focus_areas || '[]') : []);

                        if (isFeatured) {
                            return (
                                <div
                                    key={conclave.id}
                                    onClick={() => handleOpenModal(conclave)}
                                    className="md:col-span-2 bg-gradient-to-br from-[#0e3005] via-[#243F05] to-[#164a08] rounded-3xl p-8 sm:p-10 text-white shadow-xl cursor-pointer transform transition hover:-translate-y-1 group relative overflow-hidden flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="inline-flex items-center space-x-2 bg-white/10 text-[#DFC479] px-4 py-1.5 rounded-full text-xs font-sans font-bold tracking-wider uppercase">
                                                <span>Flagship Assembly</span>
                                            </div>
                                            <span className="font-mono text-sm text-[#DFC479] font-bold">01 / 13</span>
                                        </div>

                                        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white group-hover:text-[#DFC479] transition">
                                            {conclave.title}
                                        </h3>

                                        <p className="mt-4 text-base font-sans text-[#ECE7D6]/90 leading-relaxed max-w-2xl">
                                            {conclave.short_description}
                                        </p>

                                        {focusAreas.length > 0 && (
                                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#ECE7D6]/90">
                                                {focusAreas.slice(0, 4).map((f, i) => (
                                                    <div key={i} className="flex items-center space-x-2">
                                                        <CheckCircle2 className="w-4 h-4 text-[#DFC479] shrink-0" />
                                                        <span className="truncate">{f}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 flex items-center space-x-2 text-sm font-heading font-bold text-[#DFC479] group-hover:translate-x-1.5 transition-transform">
                                        <span>EXPLORE FOCUS AREAS & WORKSHOPS</span>
                                        <ArrowRight className="w-4.5 h-4.5" />
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={conclave.id}
                                onClick={() => handleOpenModal(conclave)}
                                className="bg-white rounded-3xl p-7 border border-black/5 shadow-sm hover:shadow-xl cursor-pointer transform transition hover:-translate-y-1 group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-11 h-11 rounded-full bg-[#164a08]/10 text-[#164a08] flex items-center justify-center font-bold text-sm">
                                            <Layers className="w-5 h-5 text-[#164a08]" />
                                        </div>
                                        <span className="px-3.5 py-1 rounded-full bg-[#F7F5EC] font-mono text-xs text-[#164a08] font-bold">
                                            Track {String(idx + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    <h3 className="font-heading text-lg sm:text-xl font-bold text-[#164a08] group-hover:text-[#164a08] transition leading-snug">
                                        {conclave.title}
                                    </h3>

                                    <p className="mt-3 text-sm sm:text-base font-sans text-[#503323]/85 leading-relaxed line-clamp-3">
                                        {conclave.short_description}
                                    </p>
                                </div>

                                <div className="mt-6 pt-5 border-t border-black/5 flex items-center justify-between text-sm font-heading font-semibold text-[#164a08]">
                                    <span className="group-hover:underline">View Details</span>
                                    <ArrowRight className="w-4 h-4 text-[#164a08] group-hover:translate-x-1.5 transition-transform" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View Full Conclaves Link (50px pure curve) */}
                <div className="mt-14 text-center">
                    <Link
                        href="/conclaves"
                        className="inline-flex items-center space-x-2 bg-[#164a08] text-white px-8 py-3.5 rounded-full text-sm font-heading font-bold tracking-wider uppercase hover:bg-[#0e3005] transition shadow-md"
                    >
                        <span>VIEW COMPLETE DIRECTORY & ABSTRACT GUIDELINES</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Interactive Conclave Modal */}
            <ConclaveModal
                conclave={selectedConclave}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </section>
    );
}
