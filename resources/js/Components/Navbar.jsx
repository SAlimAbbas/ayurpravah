import React, { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Menu,
    X,
    ChevronDown,
    ArrowRight,
    BookOpen,
    Calendar,
    Users,
    Layers,
    Building2,
    Hotel,
    Image as ImageIcon,
    Mail,
    Send,
    MessageCircle,
    Info,
} from "lucide-react";

export default function Navbar({ onOpenRegister }) {
    const { url, props } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

    const aboutDropdownRef = useRef(null);
    const moreDropdownRef = useRef(null);

    const siteSettings = props.site_settings || {};
    const brandHindi = siteSettings.brand_hindi || "आयुर प्रवाह";
    const eventName = siteSettings.event_name || "AYURPRAVAH 2027";
    const whatsappNumber = siteSettings.whatsapp || "+919450362145";
    const cleanPhone = whatsappNumber.replace(/[^0-9]/g, "");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 15);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent background scrolling when mobile navigation drawer is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    // Close mobile drawer on route change
    useEffect(() => {
        setMobileOpen(false);
        setAboutDropdownOpen(false);
        setMoreDropdownOpen(false);
    }, [url]);

    // Handle escape key to close menus
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setMobileOpen(false);
                setAboutDropdownOpen(false);
                setMoreDropdownOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const isActive = (path) =>
        url === path || (path !== "/" && url.startsWith(path));

    // Core primary links displayed on desktop
    const primaryNavLinks = [
        { label: "AyurPravah", href: "/ayurpravah" },
        { label: "13 Conclaves", href: "/conclaves" },
        { label: "Speakers", href: "/speakers" },
        { label: "Program", href: "/program" },
        { label: "Expo", href: "/expo" },
    ];

    // About dropdown items
    const aboutItems = [
        {
            title: "AyurPravah Vision & Ecosystem",
            desc: "Organisers, advisory council & global mission",
            href: "/about",
            icon: Info,
        },
        {
            title: "Yasharth Veda Foundation",
            desc: "Apex non-profit research & traditional medicine body",
            href: "/about#yasharth",
            icon: BookOpen,
        },
        {
            title: "AyurWings Health Tech",
            desc: "AI-driven AYUSH technology & digital infrastructure",
            href: "/about#ayurwings",
            icon: Layers,
        },
        {
            title: "Venue & City Guide",
            desc: "Yashobhoomi IICC, New Delhi travel & accessibility",
            href: "/venue",
            icon: Building2,
        },
    ];

    // More dropdown items
    const moreItems = [
        {
            title: "Partners & Patrons",
            desc: "Ministries, institutional allies & global sponsors",
            href: "/partners",
            icon: Users,
        },
        {
            title: "Accommodations & Hospitality",
            desc: "Partner luxury hotels & shuttle services",
            href: "/accommodation",
            icon: Hotel,
        },
        {
            title: "Photo & Video Gallery",
            desc: "Conclave moments, workshops & visual archives",
            href: "/gallery",
            icon: ImageIcon,
        },
        {
            title: "Contact & Support",
            desc: "Delegate helpdesk, inquiries & venue directions",
            href: "/contact",
            icon: Mail,
        },
    ];

    const isAboutActive = isActive("/about") || isActive("/venue");
    const isMoreActive =
        isActive("/partners") ||
        isActive("/accommodation") ||
        isActive("/gallery") ||
        isActive("/contact");

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
                mobileOpen
                    ? "bg-white shadow-xl"
                    : scrolled
                      ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5"
                      : "bg-[#F7F5EC]/95 backdrop-blur-sm border-b border-black/5"
            }`}
        >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
                <div className="flex items-center justify-between gap-3">
                    {/* Brand Wordmark & Official Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-3 group shrink-0 select-none"
                    >
                        <img
                            src="/logo.png"
                            alt="AyurPravah Yasharth Logo"
                            className="w-20 h-20 sm:w-20 sm:h-20 rounded-full object-contain shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0 bg-white p-0.5 border border-black/5"
                        />
                        <div className="flex flex-col">
                            <div className="flex items-baseline space-x-1.5 sm:space-x-2">
                                <span className="font-hindi text-lg sm:text-xl md:text-2xl font-bold text-[#164a08] tracking-wide leading-none whitespace-nowrap">
                                    {brandHindi}
                                </span>
                                <span className="font-heading text-sm sm:text-base md:text-lg font-black tracking-wider text-[#164a08] leading-none whitespace-nowrap">
                                    {eventName}
                                </span>
                            </div>
                            <span className="text-[10px] sm:text-xs font-sans font-semibold tracking-wider text-[#3e7405] uppercase mt-0.5 sm:mt-1 whitespace-nowrap hidden xs:inline-block">
                                International Conclave & Expo
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation (>= 1200px / xl) */}
                    <nav className="hidden xl:flex items-center space-x-1 2xl:space-x-1.5">
                        {/* Home Link */}
                        <Link
                            href="/"
                            className={`px-3 py-1.5 2xl:px-3.5 2xl:py-2 text-sm font-sans font-semibold rounded-full transition-all duration-200 whitespace-nowrap ${
                                url === "/"
                                    ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                    : "text-[#503323] hover:text-[#164a08] hover:bg-black/5"
                            }`}
                        >
                            Home
                        </Link>

                        {/* About Dropdown */}
                        <div
                            ref={aboutDropdownRef}
                            className="relative group"
                            onMouseEnter={() => setAboutDropdownOpen(true)}
                            onMouseLeave={() => setAboutDropdownOpen(false)}
                        >
                            <Link
                                href="/about"
                                className={`px-3 py-1.5 2xl:px-3.5 2xl:py-2 text-sm font-sans font-semibold rounded-full transition-all duration-200 flex items-center space-x-1 whitespace-nowrap ${
                                    isAboutActive
                                        ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                        : "text-[#503323] hover:text-[#164a08] hover:bg-black/5"
                                }`}
                            >
                                <span>About</span>
                                <ChevronDown
                                    className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${
                                        aboutDropdownOpen
                                            ? "rotate-180 text-[#164a08]"
                                            : ""
                                    }`}
                                />
                            </Link>

                            {/* Dropdown Popup Menu */}
                            <div
                                className={`absolute top-full left-0 pt-2 w-80 transition-all duration-200 ${
                                    aboutDropdownOpen
                                        ? "opacity-100 visible translate-y-0 pointer-events-auto"
                                        : "opacity-0 invisible -translate-y-1 pointer-events-none"
                                }`}
                            >
                                <div className="bg-white rounded-2xl shadow-xl border border-black/5 p-2 space-y-0.5">
                                    {aboutItems.map((item) => {
                                        const IconComp = item.icon;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() =>
                                                    setAboutDropdownOpen(false)
                                                }
                                                className="flex items-start space-x-3 p-3 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-sans font-bold text-[#164a08] group-hover/item:text-[#3e7405] transition-colors">
                                                        {item.title}
                                                    </span>
                                                    <span className="text-xs text-[#503323]/75 mt-0.5 line-clamp-1">
                                                        {item.desc}
                                                    </span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Primary Nav Links (AyurPravah, 13 Conclaves, Speakers, Program, Expo) */}
                        {primaryNavLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-1.5 2xl:px-3.5 2xl:py-2 text-sm font-sans font-semibold rounded-full transition-all duration-200 whitespace-nowrap ${
                                    isActive(link.href)
                                        ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                        : "text-[#503323] hover:text-[#164a08] hover:bg-black/5"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* More / Explore Dropdown */}
                        <div
                            ref={moreDropdownRef}
                            className="relative group"
                            onMouseEnter={() => setMoreDropdownOpen(true)}
                            onMouseLeave={() => setMoreDropdownOpen(false)}
                        >
                            <button
                                type="button"
                                className={`px-3 py-1.5 2xl:px-3.5 2xl:py-2 text-sm font-sans font-semibold rounded-full transition-all duration-200 flex items-center space-x-1 whitespace-nowrap cursor-pointer ${
                                    isMoreActive
                                        ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                        : "text-[#503323] hover:text-[#164a08] hover:bg-black/5"
                                }`}
                            >
                                <span>Explore</span>
                                <ChevronDown
                                    className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${
                                        moreDropdownOpen
                                            ? "rotate-180 text-[#164a08]"
                                            : ""
                                    }`}
                                />
                            </button>

                            {/* Dropdown Popup Menu */}
                            <div
                                className={`absolute top-full left-0 pt-2 w-84 transition-all duration-200 ${
                                    moreDropdownOpen
                                        ? "opacity-100 visible translate-y-0 pointer-events-auto"
                                        : "opacity-0 invisible -translate-y-1 pointer-events-none"
                                }`}
                            >
                                <div className="bg-white rounded-2xl shadow-xl border border-black/5 p-2 space-y-0.5">
                                    {moreItems.map((item) => {
                                        const IconComp = item.icon;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() =>
                                                    setMoreDropdownOpen(false)
                                                }
                                                className="flex items-start space-x-3 p-3 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-sans font-bold text-[#164a08] group-hover/item:text-[#3e7405] transition-colors">
                                                        {item.title}
                                                    </span>
                                                    <span className="text-xs text-[#503323]/75 mt-0.5 line-clamp-1">
                                                        {item.desc}
                                                    </span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* Desktop Right Action CTAs */}
                    <div className="hidden xl:flex items-center space-x-2.5 shrink-0">
                        <Link
                            href="/submit-abstract"
                            className="text-sm font-sans font-semibold text-[#164a08] hover:text-[#0e3005] transition-colors px-3.5 py-2 rounded-full hover:bg-black/5 whitespace-nowrap"
                        >
                            Submit Abstract
                        </Link>

                        {onOpenRegister ? (
                            <button
                                onClick={onOpenRegister}
                                className="inline-flex items-center space-x-2 bg-[#164a08] text-white px-5 py-2.5 rounded-full text-sm font-heading font-bold tracking-wider hover:bg-[#0e3005] shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0 group"
                            >
                                <span>REGISTER NOW</span>
                                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <Link
                                href="/register/delegate"
                                className="inline-flex items-center space-x-2 bg-[#164a08] text-white px-5 py-2.5 rounded-full text-sm font-heading font-bold tracking-wider hover:bg-[#0e3005] shadow-sm hover:shadow-md transition-all whitespace-nowrap shrink-0 group"
                            >
                                <span>REGISTER NOW</span>
                                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile & Tablet Bar Controls */}
                    <div className="flex xl:hidden items-center space-x-2 shrink-0">
                        {/* Submit Abstract link on tablet/md screens */}
                        <Link
                            href="/submit-abstract"
                            className="hidden md:inline-flex text-xs lg:text-sm font-sans font-semibold text-[#164a08] hover:text-[#0e3005] px-3 py-1.5 rounded-full hover:bg-black/5 whitespace-nowrap"
                        >
                            Submit Abstract
                        </Link>

                        {/* Primary Register Button on Mobile/Tablet */}
                        {onOpenRegister ? (
                            <button
                                onClick={onOpenRegister}
                                className="bg-[#164a08] text-white text-xs sm:text-sm font-heading font-bold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm hover:bg-[#0e3005] transition-colors whitespace-nowrap cursor-pointer shrink-0"
                            >
                                REGISTER
                            </button>
                        ) : (
                            <Link
                                href="/register/delegate"
                                className="bg-[#164a08] text-white text-xs sm:text-sm font-heading font-bold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm hover:bg-[#0e3005] transition-colors whitespace-nowrap shrink-0"
                            >
                                REGISTER
                            </Link>
                        )}

                        {/* Hamburger Button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 sm:p-2.5 rounded-full text-[#164a08] hover:bg-black/5 focus:outline-none cursor-pointer shrink-0 transition-colors"
                            aria-label="Toggle Navigation Menu"
                        >
                            {mobileOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile & Tablet Full Navigation Menu Dropdown */}
            {mobileOpen && (
                <div className="xl:hidden border-t border-black/5 bg-white shadow-2xl max-h-[calc(100vh-75px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-6 space-y-6">
                        {/* 2-column grid on tablet, 1-column on mobile */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Section: Main Conclave Pages */}
                            <div>
                                <span className="text-xs font-sans font-bold tracking-widest text-[#3e7405] uppercase px-3">
                                    Conference Agenda
                                </span>
                                <div className="mt-2 space-y-1">
                                    <Link
                                        href="/"
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-sans font-semibold transition ${
                                            url === "/"
                                                ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                                : "text-[#503323] hover:bg-stone-50"
                                        }`}
                                    >
                                        <span>Home Overview</span>
                                    </Link>
                                    <Link
                                        href="/ayurpravah"
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-sans font-semibold transition ${
                                            isActive("/ayurpravah")
                                                ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                                : "text-[#503323] hover:bg-stone-50"
                                        }`}
                                    >
                                        <span>AyurPravah Concept</span>
                                    </Link>
                                    <Link
                                        href="/conclaves"
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-sans font-semibold transition ${
                                            isActive("/conclaves")
                                                ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                                : "text-[#503323] hover:bg-stone-50"
                                        }`}
                                    >
                                        <span>13 Conclaves Directory</span>
                                    </Link>
                                    <Link
                                        href="/speakers"
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-sans font-semibold transition ${
                                            isActive("/speakers")
                                                ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                                : "text-[#503323] hover:bg-stone-50"
                                        }`}
                                    >
                                        <span>Distinguished Speakers</span>
                                    </Link>
                                    <Link
                                        href="/program"
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-sans font-semibold transition ${
                                            isActive("/program")
                                                ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                                : "text-[#503323] hover:bg-stone-50"
                                        }`}
                                    >
                                        <span>Program Schedule</span>
                                    </Link>
                                    <Link
                                        href="/expo"
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-sans font-semibold transition ${
                                            isActive("/expo")
                                                ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                                : "text-[#503323] hover:bg-stone-50"
                                        }`}
                                    >
                                        <span>International Expo</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Section: Organisers & Details */}
                            <div>
                                <span className="text-xs font-sans font-bold tracking-widest text-[#3e7405] uppercase px-3">
                                    Explore & Logistics
                                </span>
                                <div className="mt-2 space-y-1">
                                    <Link
                                        href="/about"
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-sans font-semibold transition ${
                                            isActive("/about")
                                                ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                                : "text-[#503323] hover:bg-stone-50"
                                        }`}
                                    >
                                        <span>
                                            About Ecosystem & Organisers
                                        </span>
                                    </Link>
                                    <Link
                                        href="/partners"
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-sans font-semibold transition ${
                                            isActive("/partners")
                                                ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                                : "text-[#503323] hover:bg-stone-50"
                                        }`}
                                    >
                                        <span>Partners & Patrons</span>
                                    </Link>
                                    <Link
                                        href="/accommodation"
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-sans font-semibold transition ${
                                            isActive("/accommodation")
                                                ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                                : "text-[#503323] hover:bg-stone-50"
                                        }`}
                                    >
                                        <span>
                                            Hospitality & Accommodations
                                        </span>
                                    </Link>
                                    <Link
                                        href="/venue"
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-sans font-semibold transition ${
                                            isActive("/venue")
                                                ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                                : "text-[#503323] hover:bg-stone-50"
                                        }`}
                                    >
                                        <span>Venue & City Guide (IICC)</span>
                                    </Link>
                                    <Link
                                        href="/gallery"
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-sans font-semibold transition ${
                                            isActive("/gallery")
                                                ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                                : "text-[#503323] hover:bg-stone-50"
                                        }`}
                                    >
                                        <span>Conclave Visual Gallery</span>
                                    </Link>
                                    <Link
                                        href="/contact"
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-sans font-semibold transition ${
                                            isActive("/contact")
                                                ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                                : "text-[#503323] hover:bg-stone-50"
                                        }`}
                                    >
                                        <span>Contact Secretariat & FAQs</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Section: Direct CTAs */}
                        <div className="pt-4 border-t border-black/5 space-y-2.5 max-w-lg mx-auto">
                            <Link
                                href="/submit-abstract"
                                onClick={() => setMobileOpen(false)}
                                className="w-full flex items-center justify-center space-x-2 py-3 rounded-full border-2 border-[#164a08] text-[#164a08] font-heading font-bold text-xs tracking-wider hover:bg-[#164a08]/5 transition"
                            >
                                <Send className="w-3.5 h-3.5" />
                                <span>SUBMIT SCIENTIFIC ABSTRACT</span>
                            </Link>

                            <button
                                onClick={() => {
                                    setMobileOpen(false);
                                    if (onOpenRegister) onOpenRegister();
                                }}
                                className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-full bg-[#164a08] text-white font-heading font-bold text-xs tracking-wider shadow-md hover:bg-[#0e3005] transition cursor-pointer"
                            >
                                <span>REGISTER AS DELEGATE</span>
                                <ArrowRight className="w-4 h-4 text-white" />
                            </button>

                            <Link
                                href="/register/exhibitor"
                                onClick={() => setMobileOpen(false)}
                                className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-[#3e7405] text-white font-heading font-bold text-xs tracking-wider hover:bg-[#325e04] transition"
                            >
                                <span>BOOK EXHIBITION STALL</span>
                            </Link>

                            {/* WhatsApp Direct Concierge */}
                            <a
                                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hello AyurPravah Desk, I would like to inquire about delegate registration.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 font-sans font-semibold text-xs transition"
                            >
                                <MessageCircle className="w-4 h-4 fill-current" />
                                <span>Chat with Secretariat on WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
