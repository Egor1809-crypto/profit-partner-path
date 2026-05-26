import { SectionHeader } from "./ForWhomSection";
import { Search, Send, BadgeDollarSign } from "lucide-react";

export function HowItWorks() {
  const steps = [
    { icon: Search, title: "Вы находите клиента", text: "У человека есть долги, кредиты или просрочки. Самостоятельно проводить юридическую консультацию не нужно." },
    { icon: Send, title: "Передаёте контакт", text: "Оставляете заявку через форму, Telegram или личный кабинет. Мы берём общение с клиентом на себя." },
    { icon: BadgeDollarSign, title: "Получаете вознаграждение", text: "Когда клиент заключает договор и оплачивает услуги — вы получаете выплату по согласованным условиям." },
  ];
  return (
    <section id="how" className="py-20 lg:py-28 bg-surface">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader eyebrow="Простая схема" title="Как работает партнёрская программа" subtitle="Три шага — и вы зарабатываете без юридической нагрузки." />
        <div className="grid gap-6 md:grid-cols-3 relative">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="relative bg-card rounded-2xl p-7 border border-border shadow-[var(--shadow-card)]">
              <div className="absolute -top-5 -left-2 font-display text-6xl font-extrabold text-gold/30 leading-none select-none">0{i+1}</div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-5">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
