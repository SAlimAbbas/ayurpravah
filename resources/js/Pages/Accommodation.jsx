import React from 'react';
import AppLayout from '../Layouts/AppLayout';
import { Hotel, MapPin } from 'lucide-react';

export default function Accommodation({ accommodations = [] }) {
    return (
        <AppLayout
            title="Hospitality & Delegate Accommodations"
            description="Official partner hotels, special delegate tariffs, and accommodation booking advisory for AYURPRAVAH 2027."
        >
            {() => (
                <div className="py-16 space-y-16">
                    {/* Header */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                            Delegate Hospitality Desk
                        </span>
                        <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-black text-[#164a08]">
                            Partner Accommodations
                        </h1>
                        <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg font-sans text-[#503323] leading-relaxed">
                            Exclusive discounted room rates, daily shuttle transfers to the conclave center,
                            and Sattvic dining arrangements for all national and international delegates.
                        </p>
                    </div>

                    {/* Accommodation List */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {accommodations.map((acc) => (
                                <div
                                    key={acc.id}
                                    className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-2xl bg-[#164a08] text-[#DFC479] flex items-center justify-center font-bold text-base mb-4">
                                            <Hotel className="w-6 h-6" />
                                        </div>

                                        <h3 className="font-heading text-xl font-bold text-[#164a08]">
                                            {acc.name}
                                        </h3>

                                        {acc.distance && (
                                            <div className="flex items-center space-x-1.5 text-sm text-[#3e7405] font-medium mt-1.5">
                                                <MapPin className="w-4 h-4 shrink-0" />
                                                <span>{acc.distance}</span>
                                            </div>
                                        )}

                                        <p className="mt-3 text-base font-sans text-[#503323] leading-relaxed">
                                            {acc.description}
                                        </p>

                                        {acc.price_note && (
                                            <div className="mt-4 bg-[#F7F5EC] p-3.5 rounded-2xl border border-[#164a08]/10 text-sm font-semibold text-[#164a08]">
                                                {acc.price_note}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 pt-5 border-t border-stone-100 flex items-center justify-between">
                                        <div className="text-sm text-stone-500">
                                            {acc.contact_info || 'AyurPravah Hospitality'}
                                        </div>
                                        <a
                                            href={`https://wa.me/919450362145?text=${encodeURIComponent(`Inquiry for accommodation: ${acc.name}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-heading font-bold text-[#164a08] hover:underline"
                                        >
                                            Inquire →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Assistance Strip */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-[#164a08] text-white p-8 sm:p-10 rounded-3xl border border-[#164a08]/30 text-center space-y-3 shadow-xl">
                            <h4 className="font-heading text-xl font-bold text-white">
                                Need Dedicated Group Booking or University Delegation Accommodation?
                            </h4>
                            <p className="text-base text-[#ECE7D6]/90 max-w-lg mx-auto">
                                Contact our Hospitality & Logistics Secretariat directly at +91 94503 62145 or yasharthvedafoundation@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
