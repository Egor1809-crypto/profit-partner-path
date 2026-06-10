import { ArrowUpRight } from "lucide-react";
import { contacts } from "@/config/contacts";
import { SectionHeader } from "./ForWhomSection";

export function ContactsSection() {
  return (
    <section id="contacts" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <SectionHeader eyebrow="// Контакты" title="Свяжитесь с отделом партнёров" />
        <div className="divide-y divide-border border-y border-border">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              className="group flex items-center justify-between gap-6 py-5 transition-colors hover:text-primary lg:py-7"
            >
              <span className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                {contact.label}
              </span>
              <span className="ml-auto font-display text-2xl uppercase sm:text-4xl">
                {contact.value}
              </span>
              <ArrowUpRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
