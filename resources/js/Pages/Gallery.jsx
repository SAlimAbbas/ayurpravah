import React, { useState } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function Gallery({ albums = [] }) {
    const [selectedAlbumId, setSelectedAlbumId] = useState('ALL');
    const [lightboxIndex, setLightboxIndex] = useState(null);

    // Normalizes storage media paths reliably
    const resolveImageUrl = (item) => {
        const path = item?.image_url || item?.media_path;
        if (!path) return '';
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        if (path.startsWith('/storage/')) return path;
        if (path.startsWith('storage/')) return `/${path}`;
        return `/storage/${path.replace(/^\/+/, '')}`;
    };

    // Flatten all items across albums for 'ALL' tab or active album
    const allItems = albums.flatMap(album =>
        (album.items || []).map(item => ({
            ...item,
            albumTitle: album.title,
        }))
    );

    const activeItems = selectedAlbumId === 'ALL'
        ? allItems
        : (albums.find(a => a.id === selectedAlbumId)?.items || []).map(item => ({
            ...item,
            albumTitle: albums.find(a => a.id === selectedAlbumId)?.title || 'AYURPRAVAH Gallery',
        }));

    const openLightbox = (index) => {
        setLightboxIndex(index);
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
    };

    const nextImage = (e) => {
        e?.stopPropagation();
        if (lightboxIndex !== null && activeItems.length > 0) {
            setLightboxIndex((lightboxIndex + 1) % activeItems.length);
        }
    };

    const prevImage = (e) => {
        e?.stopPropagation();
        if (lightboxIndex !== null && activeItems.length > 0) {
            setLightboxIndex((lightboxIndex - 1 + activeItems.length) % activeItems.length);
        }
    };

    const currentLightboxItem = lightboxIndex !== null ? activeItems[lightboxIndex] : null;

    return (
        <AppLayout
            title="Conclave Photo & Video Gallery"
            description="Explore moments, webinars, health camps, and academic assemblies curated by Yasharth Veda Foundation and AyurWings."
        >
            {() => (
                <div className="py-16 space-y-12">
                    {/* Header */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                            Visual Chronicles
                        </span>
                        <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-black text-[#164a08]">
                            Conclave Gallery
                        </h1>
                        <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg font-sans text-[#503323] leading-relaxed">
                            A curated look at international health camps, educational masterclasses,
                            academic ceremonies, and scientific deliberations leading up to AYURPRAVAH 2027.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    {albums.length > 0 && (
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-wrap items-center justify-center gap-2.5">
                                <button
                                    onClick={() => setSelectedAlbumId('ALL')}
                                    className={`px-5 py-2.5 rounded-full text-sm font-sans font-semibold transition-all duration-200 cursor-pointer ${
                                        selectedAlbumId === 'ALL'
                                            ? 'bg-[#164a08] text-white shadow-md'
                                            : 'bg-white text-[#503323] hover:bg-[#164a08]/10 border border-black/5'
                                    }`}
                                >
                                    All Albums ({allItems.length})
                                </button>
                                {albums.map((album) => (
                                    <button
                                        key={album.id}
                                        onClick={() => setSelectedAlbumId(album.id)}
                                        className={`px-5 py-2.5 rounded-full text-sm font-sans font-semibold transition-all duration-200 cursor-pointer ${
                                            selectedAlbumId === album.id
                                                ? 'bg-[#164a08] text-white shadow-md'
                                                : 'bg-white text-[#503323] hover:bg-[#164a08]/10 border border-black/5'
                                        }`}
                                    >
                                        {album.title} ({album.items?.length || 0})
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Gallery Items Grid */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {activeItems.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                                {activeItems.map((item, idx) => {
                                    const imgUrl = resolveImageUrl(item);
                                    return (
                                        <div
                                            key={item.id || idx}
                                            onClick={() => openLightbox(idx)}
                                            className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                                        >
                                            <div className="relative aspect-[16/10] bg-stone-100 flex items-center justify-center overflow-hidden">
                                                {imgUrl ? (
                                                    <img
                                                        src={imgUrl}
                                                        alt={item.caption || item.alt_text || 'Conclave Gallery Image'}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <ImageIcon className="w-12 h-12 text-stone-300" />
                                                )}

                                                {/* Album Badge */}
                                                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-sm font-sans font-bold text-[#164a08] shadow-sm">
                                                    {item.albumTitle || 'Conclave Archive'}
                                                </div>

                                                {/* Hover Overlay with Zoom Icon */}
                                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <div className="w-11 h-11 rounded-full bg-white/90 text-[#164a08] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                                                        <ZoomIn className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </div>

                                            {item.caption && (
                                                <div className="p-5">
                                                    <p className="text-base text-[#164a08] font-sans font-medium line-clamp-2">
                                                        {item.caption}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            /* Visual highlights teaser cards if no items exist */
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { title: 'National AYUSH Research Conclaves', subtitle: 'Academic & Clinical Exchange', tag: 'Conference' },
                                    { title: 'Free Health Screening & Diagnosis Camps', subtitle: 'Grassroots Community Wellness', tag: 'Community' },
                                    { title: 'Hands-on Panchakarma Upskilling', subtitle: 'Physician Continuing Medical Education', tag: 'Masterclass' },
                                    { title: 'Digital AYUSH & AI Hackathons', subtitle: 'Emerging Healthcare Technology', tag: 'Innovation' },
                                    { title: 'Himalayan Medicinal Plant Expeditions', subtitle: 'Botanical Conservation & GAP Cultivation', tag: 'Botanicals' },
                                    { title: 'Bilateral Global Knowledge MoUs', subtitle: 'Cross-Continental Collaborations', tag: 'Global' },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                                    >
                                        <div className="space-y-4">
                                            <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#164a08]/15 via-[#3e7405]/20 to-[#DFC479]/20 flex flex-col items-center justify-center p-4 text-center border border-[#164a08]/10">
                                                <ImageIcon className="w-10 h-10 text-[#164a08]/70 mb-2" />
                                                <span className="text-sm font-mono text-[#3e7405] font-semibold">
                                                    Official Conclave Archive
                                                </span>
                                            </div>
                                            <span className="text-sm font-sans font-bold tracking-wider text-[#3e7405] uppercase">
                                                {item.tag}
                                            </span>
                                            <h4 className="font-heading text-lg font-bold text-[#164a08]">
                                                {item.title}
                                            </h4>
                                            <p className="text-base text-[#503323]">
                                                {item.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Lightbox Modal */}
                    {currentLightboxItem && (
                        <div
                            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
                            onClick={closeLightbox}
                        >
                            <div
                                className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Top Bar */}
                                <div className="bg-[#164a08] text-white px-6 py-4 flex items-center justify-between shrink-0">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-sm font-sans font-bold tracking-wider text-[#DFC479] uppercase">
                                            {currentLightboxItem.albumTitle || 'AYURPRAVAH 2027 Gallery'}
                                        </span>
                                        <span className="text-sm text-white/50">
                                            {lightboxIndex + 1} of {activeItems.length}
                                        </span>
                                    </div>
                                    <button
                                        onClick={closeLightbox}
                                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition cursor-pointer"
                                        aria-label="Close Lightbox"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Main Image with Prev/Next Controls */}
                                <div className="relative flex-1 bg-stone-900 flex items-center justify-center p-2 min-h-[300px] overflow-hidden">
                                    {resolveImageUrl(currentLightboxItem) ? (
                                        <img
                                            src={resolveImageUrl(currentLightboxItem)}
                                            alt={currentLightboxItem.caption || 'Expanded Photo'}
                                            className="max-h-[65vh] w-auto max-w-full object-contain select-none"
                                        />
                                    ) : (
                                        <ImageIcon className="w-16 h-16 text-stone-500" />
                                    )}

                                    {/* Prev Button */}
                                    {activeItems.length > 1 && (
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center shadow-lg transition cursor-pointer"
                                            aria-label="Previous Image"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                    )}

                                    {/* Next Button */}
                                    {activeItems.length > 1 && (
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center shadow-lg transition cursor-pointer"
                                            aria-label="Next Image"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    )}
                                </div>

                                {/* Caption Bottom Bar */}
                                {currentLightboxItem.caption && (
                                    <div className="p-5 bg-white border-t border-black/5 shrink-0">
                                        <p className="text-base text-[#164a08] font-sans font-medium">
                                            {currentLightboxItem.caption}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </AppLayout>
    );
}
