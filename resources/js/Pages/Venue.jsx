import React from 'react';
import AppLayout from '../Layouts/AppLayout';
import { Plane, Train, Hotel, Info } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Venue() {
    return (
        <AppLayout
            title="Venue & Destination City Guide"
            description="Logistical details, international travel connectivity, and hospitality advisory for AYURPRAVAH 2027."
        >
            {() => (
                <div className="py-16 space-y-16">
                    {/* Header */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                            Destination & Logistics
                        </span>
                        <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-black text-[#164a08]">
                            Venue & City Advisory
                        </h1>
                        <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg font-sans text-[#503323] leading-relaxed">
                            AYURPRAVAH 2027 will take place in a world-class convention center in India equipped with
                            modern plenary auditoriums, simultaneous translation booths, high-density Wi-Fi, and expansive expo pavilions.
                        </p>
                    </div>

                    {/* Venue Status Card */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-[#164a08] text-white rounded-3xl p-8 sm:p-12 border border-[#164a08]/30 text-center space-y-5 shadow-xl">
                            <div className="inline-flex items-center space-x-2 bg-white/10 text-[#DFC479] px-4 py-1.5 rounded-full text-sm font-semibold uppercase">
                                <Info className="w-4 h-4" />
                                <span>Official Venue Announcement Pending</span>
                            </div>
                            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                                Premier Convention Center • India
                            </h2>
                            <p className="text-base sm:text-lg text-[#ECE7D6]/90 max-w-xl mx-auto leading-relaxed">
                                The venue selection committee is finalizing agreements with top tier international convention
                                centers offering full multi-track simultaneous capacity and metro connectivity. Registered delegates will receive direct notifications upon confirmation.
                            </p>
                            <div className="pt-2 text-sm font-mono text-[#DFC479] font-medium">
                                Conclave Dates: 16th, 17th & 18th April 2027
                            </div>
                        </div>
                    </div>

                    {/* Travel & Connectivity Features */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-4 hover:shadow-md transition">
                                <div className="w-12 h-12 rounded-2xl bg-[#164a08] text-[#DFC479] flex items-center justify-center">
                                    <Plane className="w-6 h-6" />
                                </div>
                                <h3 className="font-heading text-xl font-bold text-[#164a08]">
                                    Airport Connectivity
                                </h3>
                                <p className="text-base text-[#503323] leading-relaxed">
                                    Easily accessible via international and domestic flights. Dedicated AyurPravah welcome
                                    and transfer desks will be operational across all major terminals during conclave dates.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-4 hover:shadow-md transition">
                                <div className="w-12 h-12 rounded-2xl bg-[#164a08] text-[#DFC479] flex items-center justify-center">
                                    <Train className="w-6 h-6" />
                                </div>
                                <h3 className="font-heading text-xl font-bold text-[#164a08]">
                                    Rail & Rapid Transit
                                </h3>
                                <p className="text-base text-[#503323] leading-relaxed">
                                    Directly connected to high-speed metro lines and primary railway junctions with ample
                                    valet and delegate parking bays at the convention center.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-4 hover:shadow-md transition">
                                <div className="w-12 h-12 rounded-2xl bg-[#164a08] text-[#DFC479] flex items-center justify-center">
                                    <Hotel className="w-6 h-6" />
                                </div>
                                <h3 className="font-heading text-xl font-bold text-[#164a08]">
                                    Hospitality & Stays
                                </h3>
                                <p className="text-base text-[#503323] leading-relaxed">
                                    Preferred room blocks have been negotiated with 4-star, 5-star, and subsidized academic
                                    residencies within a 15-minute radius of the venue.
                                </p>
                                <div className="pt-2">
                                    <Link href="/accommodation" className="inline-flex items-center text-sm font-bold text-[#164a08] hover:underline">
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
