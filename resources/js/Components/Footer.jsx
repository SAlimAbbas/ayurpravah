import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Footer() {
    const { props } = usePage();
    const siteSettings = props.site_settings || {};
    const brandHindi = siteSettings.brand_hindi || "आयुर प्रवाह";
    const eventName = siteSettings.event_name || "AYURPRAVAH 2027";
    const datesLabel =
        siteSettings.dates_label || "16th, 17th & 18th April 2027";
    const venueName = siteSettings.venue?.name || "To Be Announced";

    const defaultDepartments = [
        {
            name: "Delegate Registration",
            email: "registration@ayurpravah.in",
            phone: "+91 94503 62145",
        },
        {
            name: "Exhibition & Stalls",
            email: "expo@ayurpravah.in",
            phone: "+91 94503 62145",
        },
        {
            name: "Scientific Committee",
            email: "abstracts@ayurpravah.in",
            phone: "+91 80040 03000",
        },
        {
            name: "Sponsorships & MoUs",
            email: "partners@ayurpravah.in",
            phone: "+91 94503 62145",
        },
    ];

    const departments =
        siteSettings.departments && siteSettings.departments.length > 0
            ? siteSettings.departments
            : defaultDepartments;

    return (
        <footer className="bg-[#164a08] text-[#ECE7D6] pt-20 pb-14 border-t border-black/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Upper Grid: Brand + Departments + Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-white/10">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center space-x-3.5">
                            <img
                                src="/logo.png"
                                alt="AyurPravah Yasharth Logo"
                                className="w-15 h-15 rounded-full object-contain shadow-md bg-white p-0.5 border border-white/10 shrink-0"
                            />
                            <div>
                                <div className="flex items-baseline space-x-2">
                                    <span className="font-hindi text-2xl font-bold text-[#DFC479]">
                                        {brandHindi}
                                    </span>
                                    <span className="font-heading text-xl font-bold text-white tracking-wide">
                                        {eventName}
                                    </span>
                                </div>
                                <div className="text-xs font-sans text-[#DFC479] tracking-widest font-semibold uppercase mt-0.5">
                                    International Ayurveda Conclave & Expo
                                </div>
                            </div>
                        </div>

                        <p className="text-sm sm:text-base font-sans text-[#ECE7D6]/85 leading-relaxed max-w-md pt-2">
                            Uniting global healthcare experts, clinical
                            researchers, visionary startups, traditional
                            scholars and pharmaceutical innovators under one
                            sacred banner to shape the evidence-based future of
                            global Ayurveda.
                        </p>

                        <div className="space-y-2 pt-3 text-sm font-sans text-[#DFC479]">
                            <div className="flex items-center space-x-2">
                                <span className="text-white font-bold">
                                    Dates:
                                </span>
                                <span>{datesLabel}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-white font-bold">
                                    Venue:
                                </span>
                                <span>{venueName}</span>
                            </div>
                        </div>

                        {/* Joint Organisers */}
                        <div className="pt-4">
                            <div className="text-xs font-sans font-semibold tracking-wider text-[#DFC479] uppercase mb-2">
                                Organized In Joint Confluence By
                            </div>
                            <div className="flex flex-col space-y-1.5 text-sm text-white">
                                <span className="font-heading font-medium tracking-wide">
                                    • Yasharth Veda Foundation
                                </span>
                                <span className="font-heading font-medium tracking-wide">
                                    • AyurWings Health Tech Private Limited
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="space-y-4">
                        <h4 className="font-heading text-base font-bold text-white uppercase tracking-wider border-l-2 border-[#3e7405] pl-3">
                            Conclave Pillars
                        </h4>
                        <ul className="space-y-2.5 text-sm font-sans text-[#ECE7D6]/85">
                            <li>
                                <Link
                                    href="/conclaves"
                                    className="hover:text-white transition"
                                >
                                    13 Scientific Conclaves
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/speakers"
                                    className="hover:text-white transition"
                                >
                                    Eminent Speakers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/program"
                                    className="hover:text-white transition"
                                >
                                    Day-wise Schedule
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/expo"
                                    className="hover:text-white transition"
                                >
                                    International Expo
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/submit-abstract"
                                    className="hover:text-white transition"
                                >
                                    Call for Scientific Papers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-white transition"
                                >
                                    About Yasharth & AyurWings
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/gallery"
                                    className="hover:text-white transition"
                                >
                                    Conclave Gallery
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Delegate Services Column */}
                    <div className="space-y-4">
                        <h4 className="font-heading text-base font-bold text-white uppercase tracking-wider border-l-2 border-[#3e7405] pl-3">
                            Delegate Portal
                        </h4>
                        <ul className="space-y-2.5 text-sm font-sans text-[#ECE7D6]/85">
                            <li>
                                <Link
                                    href="/register/delegate"
                                    className="hover:text-white transition font-semibold text-[#DFC479]"
                                >
                                    Register as Delegate →
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/register/exhibitor"
                                    className="hover:text-white transition"
                                >
                                    Book Exhibition Stall
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/accommodation"
                                    className="hover:text-white transition"
                                >
                                    Partner Accommodations
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/venue"
                                    className="hover:text-white transition"
                                >
                                    Venue & Travel Advisory
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/partners"
                                    className="hover:text-white transition"
                                >
                                    Partnership Opportunities
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-white transition"
                                >
                                    Frequently Asked Questions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Department Coordinators Column */}
                    <div className="space-y-4">
                        <h4 className="font-heading text-base font-bold text-white uppercase tracking-wider border-l-2 border-[#3e7405] pl-3">
                            Helpdesk Cells
                        </h4>
                        <div className="space-y-3 text-sm font-sans">
                            {departments.slice(0, 3).map((dept, i) => (
                                <div
                                    key={i}
                                    className="bg-[#0e3005]/60 p-3.5 rounded-2xl border border-white/10"
                                >
                                    <div className="font-bold text-white text-sm">
                                        {dept.name}
                                    </div>
                                    {dept.email && (
                                        <div className="text-xs text-[#DFC479] truncate mt-0.5">
                                            {dept.email}
                                        </div>
                                    )}
                                    {dept.phone && (
                                        <div className="text-xs text-gray-300 mt-0.5">
                                            {dept.phone}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Copyright, Compliance, Policies */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-sm font-sans text-[#ECE7D6]/75 space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        © {new Date().getFullYear()} {eventName} (आयुर प्रवाह).
                        All rights reserved.
                        <span className="block sm:inline sm:ml-2 text-xs text-[#DFC479]">
                            An official initiative of Yasharth Veda Foundation &
                            AyurWings.
                        </span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-5 text-sm text-[#DFC479]">
                        <Link
                            href="/privacy-policy"
                            className="hover:underline"
                        >
                            Privacy Policy
                        </Link>
                        <span>•</span>
                        <Link href="/terms" className="hover:underline">
                            Terms & Conditions
                        </Link>
                        <span>•</span>
                        <Link href="/refund-policy" className="hover:underline">
                            Cancellation & Refund Policy
                        </Link>
                        <span>•</span>
                        <a
                            href="/sitemap.xml"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            Sitemap
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
