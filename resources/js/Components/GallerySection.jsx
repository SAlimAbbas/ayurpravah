import React, { useState } from 'react';
import { Image as ImageIcon, Video, ArrowRight, X } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function GallerySection({ galleryItems = [] }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeFilter, setActiveFilter] = useState('ALL');

    const resolveImageUrl = (item) => {
        const path = item?.image_url || item?.media_path;
        if (!path) return '';
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        if (path.startsWith('/storage/')) return path;
        if (path.startsWith('storage/')) return `/${path}`;
        return `/storage/${path.replace(/^\/+/, '')}`;
    };

    // Extract unique albums
    const albums = ['ALL', ...new Set(galleryItems.map(item => item.album?.title).filter(Boolean))];

    const filtered = activeFilter === 'ALL'
        ? galleryItems
        : galleryItems.filter(item => item.album?.title === activeFilter);

    // Fallback if no gallery items in database yet
    const displayItems = filtered.length > 0 ? filtered : [
        {
            id: 1,
            caption: 'Plenary Address on Translational Pharmacology & Evidence-based Formulations',
            album: { title: 'Scientific Conclaves' },
            type: 'image',
        },
        {
            id: 2,
            caption: 'International Roundtable: Global Regulatory Harmonization & Botanical Monographs',
            album: { title: 'Scientific Conclaves' },
            type: 'image',
        },
        {
            id: 3,
            caption: 'Tactile Nadi Pariksha Masterclass: Arterial Compliance & Waveform Analysis',
            album: { title: 'Clinical Workshops' },
            type: 'image',
        },
        {
            id: 4,
            caption: 'Advanced Marma Chikitsa: Pain Modulation in Orthopedic Rehabilitation',
            album: { title: 'Clinical Workshops' },
            type: 'image',
        },
        {
            id: 5,
            caption: 'Comprehensive Rural Prakriti Assessment & Preventive Health Camp',
            album: { title: 'Community Health' },
            type: 'image',
        },
        {
            id: 6,
            caption: 'AYUSH Startup Arena: Founders Pitching Bio-Sensory Diagnostics to Investors',
            album: { title: 'Digital Innovation' },
            type: 'image',
        },
    ];

    return (
        <section id="gallery" className="relative py-24 bg-[#F7F5EC] border-b border-black/5 overflow-hidden">
            {/* Subtle Light Herbal Watercolor Background Graphic */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
                <img
                    src="/images/section-bg-herbal.jpg"
                    alt="Ayurvedic Herbal Texture"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5EC]/70 via-[#F7F5EC]/40 to-[#F7F5EC]/80" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="text-sm font-sans font-bold tracking-[0.2em] text-[#3e7405] uppercase">
                        Visual Archives & Moments
                    </span>
                    <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#164a08]">
                        Conclave Gallery
                    </h2>
                    <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                    <p className="mt-4 text-base font-sans text-[#503323]/90 leading-relaxed">
                        A photographic glimpse into international health camps, clinician upskilling masterclasses,
                        academic summits, and research assemblies leading to AYURPRAVAH 2027.
                    </p>
                </div>

                {/* Filter Tabs */}
                {albums.length > 2 && (
                    <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
                        {albums.map((albumName) => (
                            <button
                                key={albumName}
                                onClick={() => setActiveFilter(albumName)}
                                className={`px-5 py-2.5 rounded-full text-sm font-sans font-semibold transition-all duration-200 cursor-pointer ${
                                    activeFilter === albumName
                                        ? 'bg-[#164a08] text-white shadow-md'
                                        : 'bg-[#F7F5EC] text-[#503323] hover:bg-[#164a08]/10'
                                }`}
                            >
                                {albumName}
                            </button>
                        ))}
                    </div>
                )}

                {/* Dynamic Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="bg-[#F7F5EC] rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                        >
                            <div className="relative aspect-[16/10] bg-gradient-to-br from-[#164a08]/15 via-[#3e7405]/20 to-[#164a08]/10 flex items-center justify-center overflow-hidden">
                                {resolveImageUrl(item) ? (
                                    <img
                                        src={resolveImageUrl(item)}
                                        alt={item.caption || 'Conclave Gallery'}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-[#164a08]/70 p-6 text-center">
                                        <div className="w-14 h-14 rounded-full bg-white/80 shadow-sm flex items-center justify-center mb-3">
                                            {item.type === 'video' ? (
                                                <Video className="w-7 h-7 text-[#164a08]" />
                                            ) : (
                                                <ImageIcon className="w-7 h-7 text-[#164a08]" />
                                            )}
                                        </div>
                                        <span className="text-sm font-heading font-bold text-[#164a08]">
                                            {item.album?.title || 'AYURPRAVAH Media'}
                                        </span>
                                    </div>
                                )}

                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-sans font-bold text-[#164a08] shadow-sm">
                                    {item.album?.title || 'Archive'}
                                </div>
                            </div>

                            <div className="p-6">
                                <h4 className="font-heading text-base font-bold text-[#164a08] line-clamp-2 group-hover:text-[#164a08] transition">
                                    {item.caption}
                                </h4>
                                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-sm font-sans font-semibold text-[#164a08]">
                                    <span>Expand Photo</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View Full Gallery Link */}
                <div className="mt-14 text-center">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center space-x-2 bg-[#164a08] text-white px-8 py-3.5 rounded-full text-sm font-heading font-bold tracking-wider hover:bg-[#0e3005] transition shadow-md"
                    >
                        <span>EXPLORE COMPLETE PHOTO ARCHIVE</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Modal Lightbox */}
            {selectedItem && (
                <div
                    className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-[#164a08] text-white p-5 flex items-center justify-between">
                            <span className="text-sm font-sans font-bold text-[#DFC479]">
                                {selectedItem.album?.title || 'AYURPRAVAH 2027 Gallery'}
                            </span>
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-8 space-y-4">
                            <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                                {resolveImageUrl(selectedItem) ? (
                                    <img
                                        src={resolveImageUrl(selectedItem)}
                                        alt={selectedItem.caption}
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <ImageIcon className="w-16 h-16 text-gray-300" />
                                )}
                            </div>
                            <h3 className="font-heading text-lg font-bold text-[#164a08]">
                                {selectedItem.caption}
                            </h3>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
