import React, { useState, createContext, useContext } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import RegistrationModal from '../Components/RegistrationModal';
import { MessageCircle, Ticket } from 'lucide-react';

export const RegisterModalContext = createContext({
    openRegisterWithTier: () => {},
});

export const useRegisterModal = () => useContext(RegisterModalContext);

export default function AppLayout({ children, title = null, description = null }) {
    const { props } = usePage();
    const [regModalOpen, setRegModalOpen] = useState(false);
    const [selectedTierId, setSelectedTierId] = useState(null);

    const siteSettings = props.site_settings || {};
    const eventName = siteSettings.event_name || 'AYURPRAVAH 2027';
    const whatsappNumber = siteSettings.whatsapp || '+919450362145';
    const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');

    const pageTitle = title
        ? `${title} — ${eventName}`
        : `${eventName} | International Ayurveda Conclave & Expo`;

    const pageDesc = description || siteSettings.supporting ||
        'Uniting Global Experts, Researchers, Innovators & Industry Leaders to Shape the Future of Ayurveda.';

    const openRegisterWithTier = (tierId = null) => {
        setSelectedTierId(tierId);
        setRegModalOpen(true);
    };

    return (
        <RegisterModalContext.Provider value={{ openRegisterWithTier }}>
            <div className="min-h-screen flex flex-col bg-[#F7F5EC] text-[#503323] selection:bg-[#164a08] selection:text-white relative font-sans text-base">
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
                <main className="flex-grow pt-20 sm:pt-24">
                    {typeof children === 'function' ? children({ openRegisterWithTier }) : children}
                </main>

                {/* Global Footer */}
                <Footer />

                {/* Floating Action Elements */}
                <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
                    {/* Floating WhatsApp Helpdesk */}
                    <a
                        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello AyurPravah 2027 Desk, I would like to inquire about the conclave.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-13 h-13 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 border-2 border-white group relative"
                        aria-label="Chat on WhatsApp"
                    >
                        <MessageCircle className="w-7 h-7 fill-current" />
                        <span className="absolute right-16 bg-white text-[#503323] px-3.5 py-1.5 rounded-[50px] text-sm font-sans font-medium shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-black/5">
                            AyurPravah Helpdesk
                        </span>
                    </a>

                    {/* Floating Register Badge on Mobile */}
                    <button
                        onClick={() => openRegisterWithTier(null)}
                        className="md:hidden flex items-center space-x-2 bg-[#164a08] text-white px-5 py-3 rounded-full shadow-2xl text-sm font-heading font-bold hover:bg-[#0e3005] transition-colors"
                    >
                        <Ticket className="w-4 h-4 text-[#DFC479]" />
                        <span>REGISTER NOW</span>
                    </button>
                </div>

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
