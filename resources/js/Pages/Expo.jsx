import React from 'react';
import AppLayout from '../Layouts/AppLayout';
import { expoItems } from '../content/ecosystem';
import { Store, CheckCircle2 } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Expo() {
    const stallPackages = [
        {
            name: 'Standard Shell Scheme (9 sqm)',
            size: '3m x 3m (9 sqm)',
            features: [
                'Octanorm system stall with white panels',
                'Fascia name board with company lettering',
                '1 Reception table & 2 executive chairs',
                '3 Spotlight fixtures & 1 power socket (5A)',
                '1 Waste bin & carpeted flooring',
                '2 Complimentary delegate exhibitor passes',
                'Listing in official conclave exhibitor directory',
            ],
            cta: 'Inquire for 9 sqm Stall',
        },
        {
            name: 'Double Shell Scheme (18 sqm)',
            size: '6m x 3m (18 sqm)',
            features: [
                'Prime corner / double open booth visibility',
                'Customized fascia brand signages',
                '2 Information counters & 4 chairs',
                '6 Spotlights & 2 multi-pin power sockets (15A)',
                '4 Complimentary delegate exhibitor passes',
                'Full-page profile in printed conclave souvenir',
                'Direct B2B buyer lounge networking slots',
            ],
            cta: 'Inquire for 18 sqm Stall',
        },
        {
            name: 'Bare Space / Custom Pavilion (36+ sqm)',
            size: 'Custom Fabricated Bare Island',
            features: [
                '4-side open island position with maximum footfall',
                'Freedom of structural design & branding height',
                'Dedicated 3-phase heavy industrial power line',
                '8 Complimentary delegate exhibitor passes',
                'Speaker slot in Technology & Innovation Showcase',
                'Featured logo on all event backdrops & main stage',
            ],
            cta: 'Request Bare Space Proposal',
        },
    ];

    return (
        <AppLayout
            title="International Ayurveda Expo 2027"
            description="The premier global trade and innovation showcase for Ayurvedic pharmaceuticals, wellness products, diagnostic equipment, and medicinal farming."
        >
            {() => (
                <div className="py-16 space-y-16">
                    {/* Header */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                            Global Trade & Technology Pavilion
                        </span>
                        <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-black text-[#164a08]">
                            International Ayurveda Expo
                        </h1>
                        <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg font-sans text-[#503323] leading-relaxed">
                            Connecting 100+ premier brands, manufacturers, medical device innovators,
                            and organic cultivators with over 50,000 healthcare professionals, hospital buyers, and institutional delegations.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link
                                href="/register/exhibitor"
                                className="bg-[#164a08] text-white px-8 py-3.5 rounded-full font-heading text-sm font-bold tracking-wider hover:bg-[#0e3005] transition shadow-md"
                            >
                                REGISTER AS EXHIBITOR →
                            </Link>
                        </div>
                    </div>

                    {/* 8 Expo Showcase Sectors */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-10">
                            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#164a08]">
                                8 Thematic Exhibition Zones
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {expoItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-2xl bg-[#164a08] text-[#DFC479] flex items-center justify-center font-bold text-base mb-4">
                                            <Store className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-heading text-base font-bold text-[#164a08]">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm font-sans text-[#503323] leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="mt-5 pt-3 border-t border-stone-100 text-sm font-mono text-[#3e7405] font-bold">
                                        SECTOR 0{idx + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stall Packages */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                                Booth Configurations
                            </span>
                            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold text-[#164a08]">
                                Exhibition Stall Packages
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {stallPackages.map((pkg, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition"
                                >
                                    <div>
                                        <span className="text-sm font-sans font-bold text-[#3e7405] uppercase">
                                            {pkg.size}
                                        </span>
                                        <h3 className="font-heading text-xl font-bold text-[#164a08] mt-1">
                                            {pkg.name}
                                        </h3>

                                        <ul className="mt-6 space-y-3 text-base text-[#503323]">
                                            {pkg.features.map((f, i) => (
                                                <li key={i} className="flex items-start space-x-2.5">
                                                    <CheckCircle2 className="w-4 h-4 text-[#164a08] shrink-0 mt-0.5" />
                                                    <span>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-8 pt-5 border-t border-stone-100">
                                        <Link
                                            href={`/register/exhibitor?package=${encodeURIComponent(pkg.name)}`}
                                            className="w-full block text-center bg-[#164a08] text-white py-3 rounded-full font-heading text-sm font-bold tracking-wider hover:bg-[#0e3005] transition shadow-sm"
                                        >
                                            {pkg.cta} →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
