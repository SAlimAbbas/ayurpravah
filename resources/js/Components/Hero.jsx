import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

export default function Hero({
    onOpenRegister,
    siteSettings: customSiteSettings,
}) {
    const { props } = usePage();
    const siteSettings = customSiteSettings || props?.site_settings || {};

    const brandHindi = siteSettings.brand_hindi || "आयुर प्रवाह";
    const eventName = siteSettings.event_name || "AYURPRAVAH 2027";
    const eyebrow =
        siteSettings.eyebrow || "INTERNATIONAL AYUSH CONCLAVE & EXPO";
    const tagline =
        siteSettings.tagline || "One Vision. One Platform. One Future.";
    const supporting =
        siteSettings.supporting ||
        "A landmark international gathering bringing the Ayurveda and wider AYUSH ecosystem into meaningful conversation with contemporary science, evidence-led clinical practice, emerging technology, industry, entrepreneurship and global healthcare.";
    const datesLabel =
        siteSettings.dates_label || "16th, 17th & 18th April 2027";
    const countdownDate = siteSettings.countdown_date || "2027-04-16T09:00:00";
    const rawVenueName = siteSettings.venue?.name;
    const rawVenueCity = siteSettings.venue?.city;

    // Fallback to confirmed Master Document venue if DB setting is still default placeholder
    const venueName =
        rawVenueName && rawVenueName !== "To Be Announced"
            ? rawVenueName
            : "IIT Delhi (Hauz Khas)";
    const venueCity =
        rawVenueCity && rawVenueCity !== "TBC" ? rawVenueCity : "New Delhi";
    const venueDisplay = venueName.includes("Delhi")
        ? `${venueName}`
        : `${venueName}, ${venueCity}`;

    return (
        <section className="relative overflow-hidden bg-[#F7F5EC] pt-6 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-18 border-b border-black/5">
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
                <div className="inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md border border-black/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 shadow-sm mb-4 sm:mb-6 animate-in fade-in slide-in-from-top-3 duration-500">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#164a08] animate-pulse"></span>
                    <span className="text-[11px] sm:text-xs md:text-sm font-sans font-bold tracking-[0.15em] sm:tracking-[0.2em] text-[#164a08] uppercase">
                        {eyebrow}
                    </span>
                </div>

                {/* Grand Sacred Hindi Wordmark */}
                <div className="mb-1 sm:mb-2">
                    <h2 className="font-hindi text-3xl sm:text-6xl md:text-7xl font-extrabold text-[#164a08] tracking-wide drop-shadow-sm">
                        {brandHindi}
                    </h2>
                </div>

                {/* English Name */}
                <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#164a08] tracking-tight uppercase leading-none drop-shadow-sm">
                    {eventName}
                </h1>

                {/* Tagline */}
                <p className="mt-3 sm:mt-5 font-heading text-lg sm:text-2xl md:text-3xl font-bold text-[#164a08] tracking-wide">
                    {tagline}
                </p>

                {/* Supporting Narrative */}
                <p className="mt-3 sm:mt-4 max-w-3xl mx-auto text-sm sm:text-base md:text-lg font-sans text-[#503323]/90 leading-relaxed px-2">
                    {supporting}
                </p>

                {/* Meta Badges: Date & Venue (50px curves) */}
                <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 text-xs sm:text-sm md:text-base font-sans font-semibold text-[#164a08]">
                    <div className="inline-flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#503323]/25 shadow-xs">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#164a08]" />
                        <span className="text-sm sm:text-base md:text-lg">
                            {datesLabel}
                        </span>
                    </div>
                    <div className="inline-flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#503323]/25 shadow-xs">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#164a08]" />
                        <span className="text-sm sm:text-base md:text-lg">
                            {venueDisplay}
                        </span>
                    </div>
                </div>

                {/* Live Dynamic Countdown Timer */}
                <div className="mt-8 sm:mt-12">
                    <CountdownTimer
                        targetDate={countdownDate}
                        label="CONCLAVE COMMENCES IN"
                    />
                </div>

                {/* Call-to-Action Buttons (All Pure 50px Curves) */}
                <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
                    <button
                        onClick={onOpenRegister}
                        className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#164a08] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-heading text-xs sm:text-sm md:text-base font-bold tracking-wider hover:bg-[#0e3005] shadow-lg shadow-[#164a08]/20 transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                    >
                        <span>REGISTER AS DELEGATE</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                    </button>

                    <Link
                        href="/program"
                        className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white text-[#164a08] border border-black/10 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-heading text-xs sm:text-sm md:text-base font-bold tracking-wider hover:bg-[#F7F5EC] transition-all shadow-sm whitespace-nowrap"
                    >
                        <span>EXPLORE PROGRAMME</span>
                    </Link>

                    <Link
                        href="/submit-abstract"
                        className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#3e7405] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-heading text-xs sm:text-sm md:text-base font-bold tracking-wider hover:bg-[#325e04] transition-all shadow-sm whitespace-nowrap"
                    >
                        <span>CALL FOR PAPERS</span>
                    </Link>
                </div>

                {/* Organizers Credit Strip */}
                <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-black/5 text-xs sm:text-sm font-sans text-[#3e7405] flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2">
                    <span className="font-semibold uppercase tracking-wider text-[11px] sm:text-xs text-[#164a08]">
                        Jointly Organized By:
                    </span>
                    <span className="font-heading font-semibold text-[#164a08]">
                        Indian Institute of Technology Delhi
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="font-heading font-semibold text-[#164a08]">
                        Yasharth Veda Foundation
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="font-heading font-semibold text-[#164a08]">
                        In Association with AyurWings HealthTech
                    </span>
                </div>
            </div>
        </section>
    );
}
