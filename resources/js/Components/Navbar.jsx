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
                    {/* Dual Brand Logos: Main Logo + Yasharth Emblem */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 sm:gap-3 group shrink-0 select-none py-1"
                    >
                        {/* 1. Main Logo (AyurPravah) */}
                        <img
                            src="/images/main-logo.png"
                            alt="AYURPRAVAH 2027 Main Logo"
                            className="w-auto object-contain transition-transform duration-200 group-hover:scale-102"
                        />

                        {/* Subtle Vertical Divider */}
                        <div className="h-6 sm:h-8 w-[1.5px] bg-stone-300 shrink-0" />

                        {/* 2. Secondary Logo (Yasharth Veda Foundation) */}
                        <img
                            src="/images/logo.png"
                            alt="Yasharth Veda Foundation Emblem"
                            className="h-14 sm:h-15 md:h-15 w-auto object-contain rounded-full bg-white p-0.5 border border-black/10 shadow-xs transition-transform duration-200 group-hover:scale-105"
                        />
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
                    <div className="flex xl:hidden items-center space-x-1.5 sm:space-x-2 shrink-0">
                        {/* Submit Abstract link on tablet/md screens */}
                        <Link
                            href="/submit-abstract"
                            className="hidden md:inline-flex text-xs font-sans font-semibold text-[#164a08] hover:text-[#0e3005] px-3 py-1.5 rounded-full hover:bg-black/5 whitespace-nowrap"
                        >
                            Submit Abstract
                        </Link>

                        {/* Primary Register Button on Mobile/Tablet */}
                        {onOpenRegister ? (
                            <button
                                onClick={onOpenRegister}
                                className="bg-[#164a08] text-white text-[11px] sm:text-xs font-heading font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm hover:bg-[#0e3005] transition-colors whitespace-nowrap cursor-pointer shrink-0"
                            >
                                REGISTER
                            </button>
                        ) : (
                            <Link
                                href="/register/delegate"
                                className="bg-[#164a08] text-white text-[11px] sm:text-xs font-heading font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm hover:bg-[#0e3005] transition-colors whitespace-nowrap shrink-0"
                            >
                                REGISTER
                            </Link>
                        )}

                        {/* Prominent Hamburger Button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-1.5 sm:p-2 rounded-full text-[#164a08] bg-[#164a08]/10 hover:bg-[#164a08]/20 focus:outline-none cursor-pointer shrink-0 transition-colors"
                            aria-label="Toggle Navigation Sidebar"
                        >
                            {mobileOpen ? (
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            ) : (
                                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile & Tablet Navigation Sidebar (Slide-over Drawer) */}
            {/* 1. Backdrop Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 xl:hidden ${
                    mobileOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
            />

            {/* 2. Slide-out Sidebar Drawer */}
            <aside
                className={`fixed top-0 right-0 bottom-0 w-[86vw] max-w-[360px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out xl:hidden ${
                    mobileOpen ? "translate-x-0" : "translate-x-full"
                }`}
                aria-label="Mobile Navigation Sidebar"
            >
                {/* Drawer Header: Dual Logos & Close Button */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/10 bg-[#F7F5EC] shrink-0">
                    <div className="flex items-center gap-2">
                        <img
                            src="/images/main-logo.png"
                            alt="AyurPravah Main Logo"
                            className="h-7 w-auto object-contain"
                        />
                        <div className="h-5 w-px bg-stone-300 shrink-0" />
                        <img
                            src="/images/logo.png"
                            alt="Yasharth Logo"
                            className="h-7 w-7 rounded-full object-contain bg-white p-0.5 border border-black/10"
                        />
                    </div>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-2 rounded-full text-[#164a08] bg-black/5 hover:bg-black/10 transition-colors cursor-pointer"
                        aria-label="Close Navigation Sidebar"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Navigation Body */}
                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
                    {/* Section: Conference Agenda */}
                    <div>
                        <span className="text-[11px] font-sans font-bold tracking-widest text-[#3e7405] uppercase px-1">
                            Conference Agenda
                        </span>
                        <div className="mt-2 space-y-1">
                            <Link
                                href="/"
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-sans font-semibold transition ${
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
                                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-sans font-semibold transition ${
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
                                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-sans font-semibold transition ${
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
                                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-sans font-semibold transition ${
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
                                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-sans font-semibold transition ${
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
                                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-sans font-semibold transition ${
                                    isActive("/expo")
                                        ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                        : "text-[#503323] hover:bg-stone-50"
                                }`}
                            >
                                <span>International Expo</span>
                            </Link>
                            <Link
                                href="/gallery"
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-sans font-semibold transition ${
                                    isActive("/gallery")
                                        ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                        : "text-[#503323] hover:bg-stone-50"
                                }`}
                            >
                                <span>Visual Gallery</span>
                            </Link>
                        </div>
                    </div>

                    {/* Section: Ecosystem & Logistics */}
                    <div>
                        <span className="text-[11px] font-sans font-bold tracking-widest text-[#3e7405] uppercase px-1">
                            Ecosystem & Logistics
                        </span>
                        <div className="mt-2 space-y-1">
                            <Link
                                href="/about"
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-sans font-semibold transition ${
                                    isActive("/about")
                                        ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                        : "text-[#503323] hover:bg-stone-50"
                                }`}
                            >
                                <span>About Ecosystem & Organisers</span>
                            </Link>
                            <Link
                                href="/partners"
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-sans font-semibold transition ${
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
                                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-sans font-semibold transition ${
                                    isActive("/accommodation")
                                        ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                        : "text-[#503323] hover:bg-stone-50"
                                }`}
                            >
                                <span>Hospitality & Stay</span>
                            </Link>
                            <Link
                                href="/venue"
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-sans font-semibold transition ${
                                    isActive("/venue")
                                        ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                        : "text-[#503323] hover:bg-stone-50"
                                }`}
                            >
                                <span>Venue & City Guide (IICC)</span>
                            </Link>
                            <Link
                                href="/contact"
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-sans font-semibold transition ${
                                    isActive("/contact")
                                        ? "text-[#164a08] bg-[#164a08]/10 font-bold"
                                        : "text-[#503323] hover:bg-stone-50"
                                }`}
                            >
                                <span>Contact & Support</span>
                            </Link>
                        </div>
                    </div>

                    {/* Section: Direct Action CTAs */}
                    <div className="pt-4 border-t border-black/10 space-y-2.5">
                        <button
                            onClick={() => {
                                setMobileOpen(false);
                                if (onOpenRegister) onOpenRegister();
                            }}
                            className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-[#164a08] text-white font-heading font-bold text-xs tracking-wider shadow-md hover:bg-[#0e3005] transition cursor-pointer"
                        >
                            <span>REGISTER AS DELEGATE</span>
                            <ArrowRight className="w-4 h-4 text-white" />
                        </button>

                        <Link
                            href="/submit-abstract"
                            onClick={() => setMobileOpen(false)}
                            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-full border border-[#164a08] text-[#164a08] font-heading font-bold text-xs tracking-wider hover:bg-[#164a08]/5 transition"
                        >
                            <Send className="w-3.5 h-3.5" />
                            <span>SUBMIT SCIENTIFIC ABSTRACT</span>
                        </Link>

                        <Link
                            href="/register/exhibitor"
                            onClick={() => setMobileOpen(false)}
                            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-full bg-[#3e7405] text-white font-heading font-bold text-xs tracking-wider hover:bg-[#325e04] transition"
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
            </aside>
        </header>
    );
}
