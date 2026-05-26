import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle, Clock, Send } from "lucide-react";
import { SectionHeader } from "./ForWhomSection";

export function ContactsSection() {
  const items = [
    { i: Phone, l: "Телефон", v: "8 800 000-00-00", href: "tel:88000000000" },
    { i: Send, l: "Telegram", v: "@partner_bot", href: "https://t.me/" },
    { i: MessageCircle, l: "WhatsApp", v: "+7 800 000-00-00", href: "https://wa.me/78000000000" },
    { i: Mail, l: "Email", v: "partner@example.ru", href: "mailto:partner@example.ru" },
    { i: Clock, l: "Режим работы", v: "Пн–Пт, 10:00–18:00" },
  ];
  return (
    <section id="contacts" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader eyebrow="Контакты" title="Свяжитесь с отделом партнёров" />
        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {items.map(({ i: Icon, l, v, href }) => {
              const Wrap = href ? "a" : "div";
              return (
                <Wrap key={l} {...(href ? { href } : {})} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 hover:border-gold/40 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">{l}</div>
                    <div className="font-semibold">{v}</div>
                  </div>
                </Wrap>
              );
            })}
          </div>
          <div className="rounded-2xl p-7 text-white flex flex-col justify-between" style={{ background: "var(--gradient-hero)" }}>
            <div>
              <h3 className="font-display text-xl font-bold mb-3">Нужна персональная консультация?</h3>
              <p className="text-sm text-white/75">Напишите менеджеру партнёрской программы — ответим в течение рабочего дня.</p>
            </div>
            <Button asChild variant="hero" size="lg" className="mt-6"><a href="#partner-form">Написать менеджеру</a></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
