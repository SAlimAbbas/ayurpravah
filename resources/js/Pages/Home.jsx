import React from "react";
import AppLayout from "../Layouts/AppLayout";
import Hero from "../Components/Hero";
import InteractiveCoverflowShowcase from "../Components/InteractiveCoverflowShowcase";
import EcosystemSection from "../Components/EcosystemSection";
import ConclavesSection from "../Components/ConclavesSection";
import SpeakersSection from "../Components/SpeakersSection";
import ProgramPreviewSection from "../Components/ProgramPreviewSection";
import ExpoShowcaseSection from "../Components/ExpoShowcaseSection";
import GallerySection from "../Components/GallerySection";
import StagesSection from "../Components/StagesSection";
import GlanceStatsSection from "../Components/GlanceStatsSection";
import TicketTiersSection from "../Components/TicketTiersSection";
import SponsorsWallSection from "../Components/SponsorsWallSection";
import FaqSection from "../Components/FaqSection";

export default function Home({
    conclaves = [],
    speakers = [],
    tiers = [],
    sponsors = {},
    sessions = [],
    faqs = [],
    galleryItems = [],
}) {
    return (
        <AppLayout
            title="AYURPRAVAH 2027 | International Ayurveda Conclave & Expo"
            description="Uniting Global Experts, Researchers, Innovators & Industry Leaders to Shape the Future of Ayurveda."
        >
            {({ openRegisterWithTier }) => (
                <div className="space-y-0">
                    {/* Chapter 1: Hero */}
                    <Hero onOpenRegister={() => openRegisterWithTier(null)} />

                    {/* Chapter 2: Interactive 3D Coverflow Showcase */}
                    {/* <InteractiveCoverflowShowcase /> */}

                    {/* Chapter 3: The Ecosystem & Foundation */}
                    <EcosystemSection />

                    {/* Chapter 3: 13 Thematic Conclaves */}
                    <ConclavesSection conclaves={conclaves} />

                    {/* Chapter 4: Thought Leaders & Speakers */}
                    <SpeakersSection speakers={speakers} />

                    {/* Chapter 5: Program & Schedule Preview */}
                    <ProgramPreviewSection sessions={sessions} />

                    {/* Chapter 6: International Trade Expo */}
                    <ExpoShowcaseSection />

                    {/* Chapter 7: Dynamic Conclave Gallery (Replaces static world map) */}
                    <GallerySection galleryItems={galleryItems} />

                    {/* Chapter 8: The 6-Stage Immersion Journey */}
                    <StagesSection />

                    {/* Chapter 9: 11 Sequential Magnitude Metrics */}
                    <GlanceStatsSection />

                    {/* Chapter 10: Participation Passes & Registration Tiers */}
                    <TicketTiersSection
                        tiers={tiers}
                        onSelectTier={(tierId) => openRegisterWithTier(tierId)}
                    />

                    {/* Chapter 11: Organisers & Knowledge Partners */}
                    <SponsorsWallSection sponsors={sponsors} />

                    {/* Chapter 12: Frequently Asked Questions */}
                    <FaqSection faqs={faqs} />
                </div>
            )}
        </AppLayout>
    );
}
