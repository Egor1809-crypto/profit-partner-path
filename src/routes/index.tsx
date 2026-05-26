import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ForWhomSection } from "@/components/site/ForWhomSection";
import { IncomeSection } from "@/components/site/IncomeSection";
import { HowItWorks } from "@/components/site/HowItWorks";
import { ClientsSection } from "@/components/site/ClientsSection";
import { WorkSection } from "@/components/site/WorkSection";
import { ToolsSection } from "@/components/site/ToolsSection";
import { SourcesSection } from "@/components/site/SourcesSection";
import { AdvantagesSection } from "@/components/site/AdvantagesSection";
import { TrustSection } from "@/components/site/TrustSection";
import { CasesSection } from "@/components/site/CasesSection";
import { ClientHelpSection } from "@/components/site/ClientHelpSection";
import { FAQSection } from "@/components/site/FAQSection";
import { PartnerForm, ClientForm } from "@/components/site/Forms";
import { ContactsSection } from "@/components/site/ContactsSection";
import { Footer } from "@/components/site/Footer";
import { StickyMobileCTA } from "@/components/site/StickyMobileCTA";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Header />
      <main>
        <Hero />
        <ForWhomSection />
        <IncomeSection />
        <HowItWorks />
        <ClientsSection />
        <WorkSection />
        <ToolsSection />
        <SourcesSection />
        <AdvantagesSection />
        <TrustSection />
        <CasesSection />
        <ClientHelpSection />
        <FAQSection />
        <PartnerForm />
        <ClientForm />
        <ContactsSection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
