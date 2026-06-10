import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { AdvantagesSection } from "@/components/site/AdvantagesSection";
import { ForWhomSection } from "@/components/site/ForWhomSection";
import { PartnerPlatformsSection } from "@/components/site/PartnerPlatformsSection";
import { ToolsSection } from "@/components/site/ToolsSection";
import { TrustSection } from "@/components/site/TrustSection";
import { LeadersSection } from "@/components/site/LeadersSection";
import { PartnerMapSection } from "@/components/site/PartnerMapSection";
import { WebinarsSection } from "@/components/site/WebinarsSection";
import { PartnerForm } from "@/components/site/Forms";
import { ContactsSection } from "@/components/site/ContactsSection";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <AdvantagesSection />
        <ForWhomSection />
        <TrustSection />
        <LeadersSection />
        <PartnerPlatformsSection />
        <PartnerMapSection />
        <WebinarsSection />
        <ToolsSection />
        <PartnerForm />
        <ContactsSection />
      </main>
      <Footer />
    </div>
  );
}
