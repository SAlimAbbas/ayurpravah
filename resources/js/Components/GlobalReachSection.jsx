import React, { useState } from 'react';
import { globalRegions } from '../content/ecosystem';
import { Globe, MapPin } from 'lucide-react';

export default function GlobalReachSection() {
    const [selectedRegion, setSelectedRegion] = useState(globalRegions.find(r => r.isOrigin) || globalRegions[5]);

    return (
        <section className="py-20 bg-[#164a08] text-white border-b border-[#B89A4A]/30 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#DFC479] uppercase">
                        Global Confluence
                    </span>
                    <h2 className="mt-2 font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                        Uniting 10+ Nations in Dialogue
                    </h2>
                    <div className="mt-3 w-16 h-1 bg-[#B89A4A] mx-auto rounded-full"></div>
                    <p className="mt-4 text-xs sm:text-sm font-sans text-[#ECE7D6]/80 leading-relaxed">
                        Connecting international delegations, research universities, regulatory boards,
                        and integrative medical societies worldwide with the epicentre in India.
                    </p>
                </div>

                {/* Interactive Map Visualizer */}
                <div className="bg-[#164a08]/40 border border-[#B89A4A]/30 rounded-2xl p-6 sm:p-10 relative">
                    <div className="relative w-full aspect-[2/1] min-h-[300px] max-h-[460px] bg-gradient-to-br from-[#0e3005] to-[#243F05] rounded-xl overflow-hidden border border-[#B89A4A]/20 flex items-center justify-center">
                        {/* World Map Outline SVG */}
                        <svg
                            viewBox="0 0 1000 500"
                            className="w-full h-full object-contain opacity-25"
                            fill="none"
                            stroke="#DFC479"
                            strokeWidth="1"
                        >
                            {/* Stylized continent vectors */}
                            <path d="M150,120 Q180,90 260,110 T320,180 T260,260 T180,240 Z" fill="#3e7405" />
                            <path d="M250,290 Q290,280 320,340 T300,430 T250,380 Z" fill="#3e7405" />
                            <path d="M460,110 Q520,80 570,120 T550,200 T480,180 Z" fill="#3e7405" />
                            <path d="M470,220 Q540,210 560,280 T530,390 T470,320 Z" fill="#3e7405" />
                            <path d="M600,100 Q780,70 850,150 T800,280 T680,220 Z" fill="#3e7405" />
                            <path d="M660,230 Q700,220 710,280 T670,330 T640,260 Z" fill="#B89A4A" fillOpacity="0.4" />
                            <path d="M780,340 Q850,330 870,390 T800,440 Z" fill="#3e7405" />
                        </svg>

                        {/* Interactive Region Dots */}
                        {globalRegions.map((region) => {
                            const isSelected = selectedRegion?.id === region.id;
                            const isOrigin = region.isOrigin;

                            return (
                                <button
                                    key={region.id}
                                    style={{ left: `${region.x}%`, top: `${region.y}%` }}
                                    onClick={() => setSelectedRegion(region)}
                                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 focus:outline-none group ${
                                        isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                                    }`}
                                    aria-label={region.name}
                                >
                                    <div
                                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center transition-all ${
                                            isOrigin
                                                ? 'bg-[#DFC479] ring-4 ring-[#DFC479]/40 animate-pulse'
                                                : isSelected
                                                ? 'bg-white ring-4 ring-[#B89A4A]/50'
                                                : 'bg-[#B89A4A] ring-2 ring-white/30'
                                        }`}
                                    >
                                        {isOrigin && <span className="w-1.5 h-1.5 rounded-full bg-[#164a08]"></span>}
                                    </div>

                                    {/* Tooltip on hover / active */}
                                    <span
                                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-sans font-semibold whitespace-nowrap transition-opacity ${
                                            isSelected
                                                ? 'bg-[#DFC479] text-[#164a08] opacity-100 shadow-md'
                                                : 'bg-black/75 text-white opacity-0 group-hover:opacity-100'
                                        }`}
                                    >
                                        {region.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Selected Region Insight Card */}
                    {selectedRegion && (
                        <div className="mt-6 bg-[#164a08] p-4 sm:p-5 rounded-xl border border-[#B89A4A]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-[#164a08] text-[#DFC479] flex items-center justify-center shrink-0 border border-[#B89A4A]">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <h4 className="font-heading text-sm sm:text-base font-bold text-white">
                                            {selectedRegion.name}
                                        </h4>
                                        {selectedRegion.isOrigin && (
                                            <span className="text-[10px] font-sans font-bold bg-[#B89A4A] text-[#164a08] px-2 py-0.5 rounded uppercase">
                                                Conclave Host Epicenter
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs font-sans text-[#ECE7D6]/80 mt-0.5">
                                        {selectedRegion.note}
                                    </p>
                                </div>
                            </div>

                            <a
                                href="/register/delegate"
                                className="text-xs font-heading font-bold text-[#DFC479] hover:underline whitespace-nowrap self-end sm:self-center"
                            >
                                International Delegate Portal →
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
