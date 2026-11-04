import React from "react";
import AppLayout from "../Layouts/AppLayout";
import {
    Plane,
    Train,
    Hotel,
    MapPin,
    Navigation,
    Compass,
    CheckCircle2,
} from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Venue() {
    return (
        <AppLayout
            title="Venue & Destination City Guide | IIT Delhi"
            description="Logistical details, international travel connectivity, and venue directions for AYURPRAVAH 2027 at Indian Institute of Technology Delhi."
        >
            {() => (
                <div className="py-16 space-y-16">
                    {/* Header */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                            Destination & Logistics
                        </span>
                        <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-black text-[#164a08]">
                            Official Venue & Travel Guide
                        </h1>
                        <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg font-sans text-[#503323] leading-relaxed">
                            AYURPRAVAH 2027 is proudly hosted at the prestigious
                            Indian Institute of Technology Delhi, offering
                            world-class auditoriums, interdisciplinary research
                            facilities, and seamless rapid transit access.
                        </p>
                    </div>

                    {/* Venue Confirmed Card */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-[#164a08] text-white rounded-3xl p-8 sm:p-12 border border-[#164a08]/30 text-center space-y-6 shadow-xl relative overflow-hidden">
                            <div className="inline-flex items-center space-x-2 bg-white/10 text-[#DFC479] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider">
                                <MapPin className="w-4 h-4" />
                                <span>Confirmed Conclave Venue</span>
                            </div>
                            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                                Indian Institute of Technology Delhi
                            </h2>
                            <p className="text-lg sm:text-xl text-[#DFC479] font-heading font-medium">
                                Hauz Khas, New Delhi 110016, India
                            </p>
                            <p className="text-sm sm:text-base text-[#ECE7D6]/90 max-w-2xl mx-auto leading-relaxed">
                                Founded in 1961, IIT Delhi is one of India's
                                foremost centers for science, engineering and
                                technology education. Its inclusion provides an
                                ideal academic and scientific setting for
                                meaningful dialogue between classical Ayurveda,
                                contemporary science, biomedical engineering,
                                and emerging healthcare technology.
                            </p>

                            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                                <a
                                    href="https://maps.google.com/?q=IIT+Delhi+Hauz+Khas+New+Delhi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 bg-[#DFC479] text-[#164a08] px-6 py-3 rounded-full font-heading text-sm font-bold tracking-wider hover:bg-white transition shadow-md"
                                >
                                    <Navigation className="w-4 h-4" />
                                    <span>OPEN IN GOOGLE MAPS</span>
                                </a>
                                <span className="text-xs sm:text-sm font-mono text-[#ECE7D6]/90 bg-white/10 px-4 py-3 rounded-full">
                                    Dates: 16–18 April 2027
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Metro Connectivity Spotlight */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-[#F7F5EC] p-6 sm:p-8 rounded-3xl border border-[#164a08]/20 flex flex-col sm:flex-row items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-[#164a08] text-[#DFC479] flex items-center justify-center shrink-0">
                                <Compass className="w-8 h-8" />
                            </div>
                            <div className="space-y-1 text-center sm:text-left">
                                <span className="text-xs font-sans font-bold text-[#3e7405] uppercase tracking-wider">
                                    Direct High-Speed Metro Access
                                </span>
                                <h3 className="font-heading text-xl font-bold text-[#164a08]">
                                    IIT Delhi Metro Station (Magenta Line)
                                </h3>
                                <p className="text-sm text-[#503323] leading-relaxed">
                                    Use <strong>Gate No. 1</strong> of the IIT
                                    Delhi Metro Station on the Magenta Line,
                                    located just 200 metres from the conclave
                                    entrance. Directly connected to Indira
                                    Gandhi International Airport (Terminal 1)
                                    and Hauz Khas interchange.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Travel & Connectivity Features */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-8">
                            <h3 className="font-heading text-2xl font-bold text-[#164a08]">
                                Estimated Journey Times & Transit
                            </h3>
                            <p className="text-sm text-[#503323]/80 mt-1">
                                Source estimates; please allow extra time for
                                city traffic.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-4 hover:shadow-md transition">
                                <div className="w-12 h-12 rounded-2xl bg-[#164a08] text-[#DFC479] flex items-center justify-center">
                                    <Plane className="w-6 h-6" />
                                </div>
                                <h3 className="font-heading text-xl font-bold text-[#164a08]">
                                    IGI Airport Access
                                </h3>
                                <div className="text-xs font-mono font-bold text-[#3e7405] bg-[#3e7405]/10 px-3 py-1 rounded-full inline-block">
                                    ~25 Minutes
                                </div>
                                <p className="text-sm text-[#503323] leading-relaxed">
                                    Indira Gandhi International Airport
                                    (Terminals 1, 2, and 3) is approximately 25
                                    minutes by taxi or direct via the Magenta
                                    Line Metro.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-4 hover:shadow-md transition">
                                <div className="w-12 h-12 rounded-2xl bg-[#164a08] text-[#DFC479] flex items-center justify-center">
                                    <Train className="w-6 h-6" />
                                </div>
                                <h3 className="font-heading text-xl font-bold text-[#164a08]">
                                    Railway Terminals
                                </h3>
                                <div className="text-xs font-mono font-bold text-[#3e7405] bg-[#3e7405]/10 px-3 py-1 rounded-full inline-block">
                                    ~25 Minutes
                                </div>
                                <p className="text-sm text-[#503323] leading-relaxed">
                                    Both New Delhi Railway Station (NDLS) and
                                    Hazrat Nizamuddin Railway Station are
                                    approximately 25 minutes by metro or
                                    app-based cabs.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-4 hover:shadow-md transition">
                                <div className="w-12 h-12 rounded-2xl bg-[#164a08] text-[#DFC479] flex items-center justify-center">
                                    <Hotel className="w-6 h-6" />
                                </div>
                                <h3 className="font-heading text-xl font-bold text-[#164a08]">
                                    Accommodations & Stays
                                </h3>
                                <div className="text-xs font-mono font-bold text-[#3e7405] bg-[#3e7405]/10 px-3 py-1 rounded-full inline-block">
                                    Hauz Khas & South Delhi
                                </div>
                                <p className="text-sm text-[#503323] leading-relaxed">
                                    A wide selection of partner hotels, guest
                                    houses, and subsidized academic residencies
                                    are available in South Delhi within a short
                                    radius of IIT Delhi.
                                </p>
                                <div className="pt-2">
                                    <Link
                                        href="/accommodation"
                                        className="inline-flex items-center text-sm font-bold text-[#164a08] hover:underline"
                                    >
                                        View Partner Accommodations →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
