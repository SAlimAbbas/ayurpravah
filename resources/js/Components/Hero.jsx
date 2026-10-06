import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

export default function Hero({ onOpenRegister, siteSettings: customSiteSettings }) {
    const { props } = usePage();
    const siteSettings = customSiteSettings || props?.site_settings || {};

    const brandHindi = siteSettings.brand_hindi || "आयुर प्रवाह";
    const eventName = siteSettings.event_name || "AYURPRAVAH 2027";
    const eyebrow =
        siteSettings.eyebrow || "INTERNATIONAL AYURVEDA CONCLAVE & EXPO";
    const tagline =
        siteSettings.tagline || "One Vision. One Platform. One Future.";
    const supporting =
        siteSettings.supporting ||
        "Uniting Global Experts, Researchers, Innovators & Industry Leaders to Shape the Future of Ayurveda.";
    const datesLabel =
        siteSettings.dates_label || "16th, 17th & 18th April 2027";
    const countdownDate = siteSettings.countdown_date || "2027-04-16T09:00:00";
    const venueName = siteSettings.venue?.name || "To Be Announced";
    const venueCity = siteSettings.venue?.city || "";
    const venueDisplay = venueCity && venueCity !== "TBC" ? `${venueName} (${venueCity})` : `${venueName} (India)`;

    return (
        <section className="relative overflow-hidden bg-[#F7F5EC] pt-8 pb-16 sm:pt-14 sm:pb-10 lg:pt-10 lg:pb-10 border-b border-black/5">

            {/* Multi-Screen Responsive Hero Background Graphic */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <img
                    src="/images/hero-bg.jpg"
                    alt="AYURPRAVAH Sacred Heritage Architecture & Botanicals"
                    className="w-full h-full object-cover object-center scale-102 transform transition-transform duration-1000 ease-out"
                />
                {/* Adaptive overlays: keeps sacred motifs visible while ensuring 100% contrast & legibility across all viewports */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5EC]/88 via-[#F7F5EC]/70 to-[#F7F5EC]" />
                <div className="absolute inset-0 bg-radial from-transparent via-[#F7F5EC]/25 to-[#F7F5EC]/80" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Official Eyebrow Chip (50px pure curve) */}
                <div className="inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md border border-black/10 rounded-full px-5 py-2 shadow-sm mb-6 animate-in fade-in slide-in-from-top-3 duration-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#164a08] animate-pulse"></span>
                    <span className="text-xs sm:text-sm font-sans font-bold tracking-[0.2em] text-[#164a08] uppercase">
                        {eyebrow}
                    </span>
                </div>

                {/* Grand Sacred Hindi Wordmark */}
                <div className="mb-2">
                    <h2 className="font-hindi text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#164a08] tracking-wide drop-shadow-sm">
                        {brandHindi}
                    </h2>
                </div>

                {/* English Name */}
                <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#164a08] tracking-tight uppercase leading-none drop-shadow-sm">
                    {eventName}
                </h1>

                {/* Tagline */}
                <p className="mt-5 font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[#164a08] tracking-wide">
                    {tagline}
                </p>

                {/* Supporting Narrative */}
                <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg font-sans text-[#503323]/90 leading-relaxed">
                    {supporting}
                </p>

                {/* Meta Badges: Date & Venue (50px curves) */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base font-sans font-semibold text-[#164a08]">
                    <div className="inline-flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[#503323]">
                        <Calendar className="w-6 h-6 text-[#164a08]" />
                        <span className="text-lg">{datesLabel}</span>
                    </div>
                    <div className="inline-flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[#503323]">
                        <MapPin className="w-6 h-6 text-[#164a08]" />
                        <span className="text-lg">{venueDisplay}</span>
                    </div>
                </div>

                {/* Live Dynamic Countdown Timer */}
                <div className="mt-12 sm:mt-14">
                    <CountdownTimer
                        targetDate={countdownDate}
                        label="CONCLAVE COMMENCES IN"
                    />
                </div>

                {/* Call-to-Action Buttons (All Pure 50px Curves, No Yellow Border) */}
                <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
                    <button
                        onClick={onOpenRegister}
                        className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-[#164a08] text-white px-8 py-4 rounded-full font-heading text-sm sm:text-base font-bold tracking-wider hover:bg-[#0e3005] shadow-lg shadow-[#164a08]/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                    >
                        <span>REGISTER AS DELEGATE</span>
                        <ArrowRight className="w-5 h-5 text-white" />
                    </button>

                    <a
                        href="#conclaves"
                        className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white text-[#164a08] border border-black/10 px-8 py-4 rounded-full font-heading text-sm sm:text-base font-bold tracking-wider hover:bg-[#F7F5EC] transition-all shadow-sm"
                    >
                        <span>EXPLORE 13 CONCLAVES</span>
                    </a>

                    <a
                        href="/submit-abstract"
                        className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#3e7405] text-white px-8 py-4 rounded-full font-heading text-sm sm:text-base font-bold tracking-wider hover:bg-[#556543] transition-all shadow-sm"
                    >
                        <span>CALL FOR PAPERS</span>
                    </a>
                </div>

                {/* Organizers Credit Strip */}
                <div className="mt-14 pt-8 border-t border-black/5 text-sm font-sans text-[#3e7405] flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                    <span className="font-semibold uppercase tracking-wider text-xs text-[#164a08]">
                        Jointly Organized By:
                    </span>
                    <span className="font-heading font-semibold text-[#164a08]">
                        Yasharth Veda Foundation
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="font-heading font-semibold text-[#164a08]">
                        AyurWings Health Tech
                    </span>
                </div>
            </div>
        </section>
    );
}
