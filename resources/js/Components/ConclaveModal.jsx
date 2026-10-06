import React from 'react';
import { X, CheckCircle, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function ConclaveModal({ conclave, isOpen, onClose }) {
    if (!isOpen || !conclave) return null;

    const focusAreas = Array.isArray(conclave.focus_areas)
        ? conclave.focus_areas
        : (typeof conclave.focus_areas === 'string' ? JSON.parse(conclave.focus_areas || '[]') : []);

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-stone-200/60 relative animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0e3005] via-[#164a08] to-[#164a08] text-white p-7 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="text-xs font-sans font-bold tracking-[0.25em] text-[#DFC479] uppercase mb-2">
                        <span>AYURPRAVAH 2027 • THEMATIC CONCLAVE</span>
                    </div>
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold pr-10 leading-snug">
                        {conclave.title}
                    </h2>
                </div>

                {/* Body */}
                <div className="p-7 space-y-6 max-h-[70vh] overflow-y-auto">
                    {/* Description */}
                    <div>
                        <h4 className="font-heading text-sm font-bold text-[#164a08] uppercase tracking-wider mb-2">
                            Overview & Vision
                        </h4>
                        <p className="text-base font-sans text-[#503323] leading-relaxed">
                            {conclave.description || conclave.short_description}
                        </p>
                    </div>

                    {/* Focus Areas */}
                    {focusAreas && focusAreas.length > 0 && (
                        <div className="bg-[#F7F5EC] p-5 rounded-2xl border border-[#164a08]/15">
                            <h4 className="font-heading text-sm font-bold text-[#164a08] uppercase tracking-wider mb-3 flex items-center space-x-2">
                                <BookOpen className="w-4 h-4 text-[#164a08]" />
                                <span>Key Scientific & Clinical Focus Areas</span>
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {focusAreas.map((area, idx) => (
                                    <div key={idx} className="flex items-start space-x-2 text-sm text-[#503323]">
                                        <CheckCircle className="w-4 h-4 text-[#164a08] shrink-0 mt-0.5" />
                                        <span>{area}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Workshop Info */}
                    {conclave.workshop_info && (
                        <div className="border-l-4 border-[#164a08] pl-4 py-2 bg-[#164a08]/5 rounded-r-2xl">
                            <div className="text-xs font-heading font-bold text-[#164a08] uppercase tracking-wider">
                                Hands-On Workshop & Masterclass
                            </div>
                            <p className="text-sm text-[#503323] mt-1 leading-relaxed">
                                {conclave.workshop_info}
                            </p>
                        </div>
                    )}

                    {/* Action Footers */}
                    <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-end items-center border-t border-stone-200">
                        <Link
                            href={`/submit-abstract?track=${encodeURIComponent(conclave.title)}`}
                            className="w-full sm:w-auto text-center px-6 py-3 text-sm font-sans font-semibold text-[#164a08] border border-[#164a08] rounded-full hover:bg-[#164a08]/5 transition shadow-sm"
                        >
                            Submit Paper for this Track
                        </Link>
                        <Link
                            href={`/conclaves/${conclave.slug}`}
                            className="w-full sm:w-auto text-center px-7 py-3 text-sm font-heading font-bold tracking-wider text-white bg-[#164a08] rounded-full hover:bg-[#0e3005] transition flex items-center justify-center space-x-2 shadow-md"
                        >
                            <span>VIEW FULL CONCLAVE PAGE</span>
                            <ArrowRight className="w-4 h-4 text-[#DFC479]" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
