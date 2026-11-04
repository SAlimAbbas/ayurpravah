import React, { useState, createContext, useContext } from "react";
import { Head, usePage } from "@inertiajs/react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import RegistrationModal from "../Components/RegistrationModal";
import { MessageCircle, Ticket } from "lucide-react";

export const RegisterModalContext = createContext({
    openRegisterWithTier: () => {},
});

export const useRegisterModal = () => useContext(RegisterModalContext);

export default function AppLayout({
    children,
    title = null,
    description = null,
}) {
    const { props } = usePage();
    const [regModalOpen, setRegModalOpen] = useState(false);
    const [selectedTierId, setSelectedTierId] = useState(null);

    const siteSettings = props.site_settings || {};
    const eventName = siteSettings.event_name || "AYURPRAVAH 2027";
    const whatsappNumber = siteSettings.whatsapp || "+919704321786";
    const cleanPhone = whatsappNumber.replace(/[^0-9]/g, "");

    const { url } = usePage();
    const isActionFormPage =
        url.startsWith("/register") || url.startsWith("/submit-abstract");

    const pageTitle = title
        ? `${title} — ${eventName}`
        : `${eventName} | International AYUSH Conclave & Expo | IIT Delhi`;

    const pageDesc =
        description ||
        siteSettings.supporting ||
        "Uniting Global Experts, Researchers, Innovators & Industry Leaders to Shape the Future of AYUR. 16–18 April 2027 at IIT Delhi.";

    const openRegisterWithTier = (tierId = null) => {
        setSelectedTierId(tierId);
        setRegModalOpen(true);
    };

    return (
        <RegisterModalContext.Provider value={{ openRegisterWithTier }}>
            <div className="min-h-screen flex flex-col bg-[#F7F5EC] text-[#503323] selection:bg-[#164a08] selection:text-white relative font-sans text-base w-full overflow-x-hidden">
                <Head>
                    <title>{pageTitle}</title>
                    <meta name="description" content={pageDesc} />
                    <meta property="og:title" content={pageTitle} />
                    <meta property="og:description" content={pageDesc} />
                    <meta property="og:type" content="website" />
                </Head>

                {/* Sticky Navigation */}
                <Navbar onOpenRegister={() => openRegisterWithTier(null)} />

                {/* Main Content Area */}
                <main className="flex-grow pt-16 sm:pt-20 lg:pt-24 w-full overflow-x-hidden">
                    {typeof children === "function"
                        ? children({ openRegisterWithTier })
                        : children}
                </main>

                {/* Global Footer */}
                <Footer />

                {/* Floating Action Elements (Hidden when modal is open, properly positioned on mobile) */}
                {!regModalOpen && (
                    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex flex-col items-end space-y-2 sm:space-y-3 pointer-events-auto">
                        {/* Floating WhatsApp Helpdesk */}
                        <a
                            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hello AyurPravah 2027 Desk, I would like to inquire about the conclave at IIT Delhi.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 border-2 border-white group relative shrink-0"
                            aria-label="Chat on WhatsApp"
                        >
                            <MessageCircle className="w-5 h-5 sm:w-7 sm:h-7 fill-current" />
                            <span className="absolute right-14 sm:right-16 bg-white text-[#503323] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-sans font-medium shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-black/5">
                                AyurPravah Helpdesk
                            </span>
                        </a>

                        {/* Floating Register Badge on Mobile (Only shown on non-action/non-form pages so it never covers form submit buttons) */}
                        {!isActionFormPage && (
                            <button
                                onClick={() => openRegisterWithTier(null)}
                                className="md:hidden flex items-center space-x-1.5 bg-[#164a08] text-white px-4 py-2.5 rounded-full shadow-xl text-xs font-heading font-bold hover:bg-[#0e3005] transition-colors whitespace-nowrap border border-white/20"
                            >
                                <Ticket className="w-3.5 h-3.5 text-[#DFC479] shrink-0" />
                                <span>REGISTER NOW</span>
                            </button>
                        )}
                    </div>
                )}

                {/* Global Registration Modal */}
                <RegistrationModal
                    isOpen={regModalOpen}
                    onClose={() => setRegModalOpen(false)}
                    preselectedTierId={selectedTierId}
                    tiers={props.tiers || []}
                />
            </div>
        </RegisterModalContext.Provider>
    );
}
