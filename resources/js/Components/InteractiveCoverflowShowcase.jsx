import React, { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import {
    FileText,
    BookOpen,
    Store,
    Activity,
    Users,
    Trophy,
    Handshake,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
} from "lucide-react";

const SHOWCASE_ITEMS = [
    {
        id: "paper-presentation",
        title: "Paper Presentation",
        hindi: "शोध पत्र प्रस्तुति",
        tagline: "Call for Abstracts & Research",
        desc: "Present clinical trials, herbal pharmacology studies, and Ayurvedic treatises to global peer reviewers.",
        icon: FileText,
        link: "/submit-abstract",
        badge: "Peer Reviewed",
        theme: "from-[#503323] via-[#3a2215] to-[#1c0f08]",
    },
    {
        id: "scientific-conclaves",
        title: "13 Scientific Conclaves",
        hindi: "वैज्ञानिक महासम्मेलन",
        tagline: "Specialized Discipline Tracks",
        desc: "Spanning Panchakarma, Rasashastra, Dravyaguna, Kayachikitsa, and Integrative Oncology.",
        icon: BookOpen,
        link: "/conclaves",
        badge: "13 Thematic Halls",
        theme: "from-[#164a08] via-[#245210] to-[#0e3005]",
    },
    {
        id: "ayush-expo",
        title: "AYUSH Trade Expo",
        hindi: "आयुष प्रदर्शनी मेला",
        tagline: "Innovations & Pharma Pavilion",
        desc: "Over 150+ pharmaceutical leaders, herbal extract innovators, and wellness equipment manufacturers.",
        icon: Store,
        link: "/expo",
        badge: "150+ Exhibitors",
        theme: "from-[#3e7405] via-[#2c5404] to-[#164a08]",
    },
    {
        id: "clinical-workshops",
        title: "Clinical Workshops",
        hindi: "व्यावहारिक कार्यशाला",
        tagline: "Hands-on Vaidya Immersion",
        desc: "Masterclass sessions on Nadi Pariksha, Marma therapy, and traditional formulations by master practitioners.",
        icon: Activity,
        link: "/program",
        badge: "Hands-on CME",
        theme: "from-[#6b4728] via-[#4d321b] to-[#2e1c0d]",
    },
    {
        id: "eminent-speakers",
        title: "Eminent Thought Leaders",
        hindi: "विद्वान वक्ता",
        tagline: "Global Faculty & Keynotes",
        desc: "Hear from visionary researchers, university chancellors, AYUSH dignitaries, and policy architects.",
        icon: Users,
        link: "/speakers",
        badge: "40+ Visionaries",
        theme: "from-[#1b4308] via-[#164a08] to-[#092403]",
    },
    {
        id: "b2b-awards",
        title: "B2B Excellence Awards",
        hindi: "उत्कृष्टता पुरस्कार",
        tagline: "Industry Honors & Recognition",
        desc: "Honoring breakthrough innovators, distinguished institutions, and lifetime contributors to Ayurveda.",
        icon: Trophy,
        link: "/partners",
        badge: "National Honors",
        theme: "from-[#82541a] via-[#5e3c12] to-[#382207]",
    },
    {
        id: "buyers-sellers",
        title: "Global Networking",
        hindi: "वैश्विक समागम",
        tagline: "Buyers, Sellers & Investors",
        desc: "Facilitating B2B trade MoUs, institutional partnerships, and export opportunities across 25+ nations.",
        icon: Handshake,
        link: "/registration",
        badge: "B2B Matchmaking",
        theme: "from-[#1e3a10] via-[#164a08] to-[#0a2003]",
    },
];

export default function InteractiveCoverflowShowcase() {
    // Start with the 2nd item (Paper Presentation / Scientific Conclaves) in center
    const [activeIndex, setActiveIndex] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const total = SHOWCASE_ITEMS.length;

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % total);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + total) % total);
    };

    // Auto-advance every 6 seconds when not hovered
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(timer);
    }, [isHovered, total]);

    // Handle touch swipe on mobile devices
    const handleTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchStartX.current - touchEndX.current;
        if (distance > 50) {
            nextSlide();
        } else if (distance < -50) {
            prevSlide();
        }
        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    return (
        <section
            className="relative py-16 sm:py-24 overflow-hidden border-b border-black/5 bg-[#F7F5EC]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Atmospheric Background with Ayurvedic Urns, Herbs & Jaali */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-45 overflow-hidden">
                <img
                    src="/images/showcase-bg.jpg"
                    alt="Ayurvedic Heritage Botanical Atmosphere"
                    className="w-full h-full object-cover object-bottom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F7F5EC] via-[#F7F5EC]/60 to-[#F7F5EC]/90" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
                    <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#164a08]/20 shadow-xs mb-3">
                        <span className="text-xs font-sans font-bold tracking-[0.2em] text-[#164a08] uppercase">
                            Interactive Conference Experience
                        </span>
                    </div>

                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#164a08] tracking-tight">
                        Explore the Core Pillars of AYURPRAVAH
                    </h2>
                    <div className="mt-3 w-20 h-1 bg-[#164a08] mx-auto rounded-full" />
                    <p className="mt-4 text-base sm:text-lg font-sans text-[#503323]/90 leading-relaxed">
                        Rotate through our flagship conclave tracks, paper
                        presentation symposiums, trade pavilion, and high-impact
                        industry gatherings.
                    </p>
                </div>

                {/* 3D Coverflow Viewport */}
                <div
                    className="relative w-full h-[460px] sm:h-[520px] md:h-[560px] flex items-center justify-center select-none"
                    style={{ perspective: "1200px" }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* The Cards Deck */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        {SHOWCASE_ITEMS.map((item, index) => {
                            // Calculate circular relative offset from activeIndex
                            let offset = index - activeIndex;
                            if (offset > Math.floor(total / 2)) {
                                offset -= total;
                            } else if (offset < -Math.floor(total / 2)) {
                                offset += total;
                            }

                            const isActive = offset === 0;
                            const isVisible = Math.abs(offset) <= 2;

                            if (!isVisible) return null;

                            // 3D Transform calculations
                            const translateX =
                                offset *
                                (typeof window !== "undefined" &&
                                window.innerWidth < 640
                                    ? 55
                                    : 68);
                            const rotateY = offset * -28;
                            const scale = isActive
                                ? 1.05
                                : Math.max(0.72, 1 - Math.abs(offset) * 0.16);
                            const zIndex = 30 - Math.abs(offset) * 10;
                            const opacity = isActive
                                ? 1
                                : Math.max(0.45, 1 - Math.abs(offset) * 0.28);

                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        if (!isActive) {
                                            setActiveIndex(index);
                                        }
                                    }}
                                    className={`absolute transition-all duration-600 ease-out cursor-pointer rounded-3xl ${
                                        isActive
                                            ? "cursor-default ring-4 ring-[#DFC479]/60"
                                            : "hover:opacity-90"
                                    }`}
                                    style={{
                                        transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
                                        zIndex,
                                        opacity,
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    {/* Plaque Card Container */}
                                    <div className="relative w-[270px] sm:w-[320px] md:w-[360px] h-[400px] sm:h-[460px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300 bg-[#2e1d12] border-2 border-[#DFC479]/50 flex flex-col justify-between">
                                        {/* Luxury Wooden Plaque Texture Overlay */}
                                        <div className="absolute inset-0 z-0">
                                            <img
                                                src="/images/card-texture-wood.jpg"
                                                alt="Carved Wood Texture"
                                                className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                                            />
                                            {/* Colored Gradient Cast */}
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-b ${item.theme} opacity-80 mix-blend-multiply`}
                                            />
                                            {/* Dark Vignette Overlay for Crisp Typography */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
                                        </div>

                                        {/* Card Top: Badges & Hindi Inscription */}
                                        <div className="relative z-10 p-6 sm:p-7 flex items-start justify-between">
                                            <span className="inline-flex items-center space-x-1.5 bg-[#DFC479]/20 backdrop-blur-md border border-[#DFC479]/50 text-[#F5E8C7] text-xs font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-inner">
                                                <span>{item.badge}</span>
                                            </span>

                                            <span className="font-hindi text-sm sm:text-base font-bold text-[#F5E8C7]/90 tracking-wide drop-shadow-xs">
                                                {item.hindi}
                                            </span>
                                        </div>

                                        {/* Card Center: Etched Sacred Icon & Title */}
                                        <div className="relative z-10 px-6 sm:px-7 text-center flex flex-col items-center">
                                            {/* Icon Medallion */}
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-white/20 to-black/40 backdrop-blur-md border-2 border-[#DFC479] flex items-center justify-center text-[#F5E8C7] shadow-xl mb-4 group-hover:scale-105 transition-transform duration-300">
                                                <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#DFC479] drop-shadow-md" />
                                            </div>

                                            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wide drop-shadow-md leading-tight">
                                                {item.title}
                                            </h3>

                                            <p className="mt-1 text-xs sm:text-sm font-sans font-semibold text-[#DFC479] tracking-wider uppercase">
                                                {item.tagline}
                                            </p>

                                            <p className="mt-3 text-xs sm:text-sm font-sans text-stone-200/90 leading-relaxed line-clamp-3">
                                                {item.desc}
                                            </p>
                                        </div>

                                        {/* Card Footer: Action Button */}
                                        <div className="relative z-10 p-6 sm:p-7 pt-2 flex items-center justify-center">
                                            {isActive ? (
                                                <Link
                                                    href={item.link}
                                                    className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#DFC479] to-[#c7a452] hover:from-[#eed994] hover:to-[#dfc479] text-[#164a08] font-heading font-bold text-xs sm:text-sm py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                                                >
                                                    <span className="tracking-wider uppercase">
                                                        EXPLORE THIS SECTION
                                                    </span>
                                                    <ArrowUpRight className="w-4 h-4 text-[#164a08]" />
                                                </Link>
                                            ) : (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveIndex(index);
                                                    }}
                                                    className="inline-flex items-center space-x-1.5 text-xs font-heading font-semibold text-[#DFC479] hover:text-white transition"
                                                >
                                                    <span>Click to View</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Chevrons (Round 50px pill buttons) */}
                    <button
                        onClick={prevSlide}
                        aria-label="Previous Showcase Card"
                        className="absolute left-2 sm:left-6 md:left-12 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 backdrop-blur-md border border-[#164a08]/20 shadow-xl flex items-center justify-center text-[#164a08] hover:bg-[#164a08] hover:text-white transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
                    >
                        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                    </button>

                    <button
                        onClick={nextSlide}
                        aria-label="Next Showcase Card"
                        className="absolute right-2 sm:right-6 md:right-12 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 backdrop-blur-md border border-[#164a08]/20 shadow-xl flex items-center justify-center text-[#164a08] hover:bg-[#164a08] hover:text-white transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
                    >
                        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="mt-6 sm:mt-8 flex items-center justify-center space-x-2.5">
                    {SHOWCASE_ITEMS.map((item, idx) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`transition-all duration-300 rounded-full cursor-pointer ${
                                activeIndex === idx
                                    ? "w-8 h-2.5 bg-[#164a08]"
                                    : "w-2.5 h-2.5 bg-[#164a08]/25 hover:bg-[#164a08]/60"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
