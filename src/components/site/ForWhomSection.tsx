import { Card } from "@/components/ui/card";
import {
  Users, Home as HomeIcon, Calculator, Briefcase, Megaphone, Video, Globe, User,
  Wallet, MapPin, MessageCircle, CheckCircle2, Wifi
} from "lucide-react";

export function ForWhomSection() {
  const items = [
    { icon: Briefcase, title: "Юристам", text: "Расширьте список услуг для клиентов и получайте вознаграждение за переданные заявки по банкротству." },
    { icon: HomeIcon, title: "Риелторам", text: "Клиентам отказывают в ипотеке из-за долгов — направляйте их на консультацию и зарабатывайте." },
    { icon: Wallet, title: "Ипотечным брокерам", text: "Помогите клиенту разобраться с долговой нагрузкой, чтобы он мог одобрить ипотеку позже." },
    { icon: Calculator, title: "Бухгалтерам и финконсультантам", text: "Ваши клиенты часто сталкиваются с долгами — у вас есть готовая аудитория для рекомендации." },
    { icon: Megaphone, title: "Маркетологам и веб-мастерам", text: "Монетизируйте трафик и лидогенерацию в нише долгов и финансов." },
    { icon: Video, title: "Блогерам и SMM-специалистам", text: "Тема банкротства актуальна — превращайте аудиторию в стабильный доход." },
    { icon: Globe, title: "Владельцам сайтов", text: "Получайте партнёрское вознаграждение за заявки с тематических ресурсов." },
    { icon: User, title: "Физическим лицам", text: "Не нужно быть юристом — достаточно рекомендовать услугу знакомым и коллегам." },
  ];
  return (
    <section id="for-whom" className="py-20 lg:py-28 bg-surface">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader eyebrow="Аудитория программы" title="Кому подходит партнёрская программа" subtitle="Подключиться может практически любой, кто общается с людьми и сталкивается с темой долгов." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="p-6 hover:shadow-[var(--shadow-elevated)] transition-shadow border-border">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-base mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, dark }: { eyebrow?: string; title: string; subtitle?: string; dark?: boolean }) {
  return (
    <div className="max-w-3xl mb-12 lg:mb-16">
      {eyebrow && <div className={`inline-block text-xs font-semibold uppercase tracking-wider mb-3 px-3 py-1 rounded-full ${dark ? "bg-gold/15 text-gold" : "bg-primary/10 text-primary"}`}>{eyebrow}</div>}
      <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${dark ? "text-white" : "text-foreground"}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-lg ${dark ? "text-white/70" : "text-muted-foreground"}`}>{subtitle}</p>}
    </div>
  );
}

export { Wallet, MapPin, MessageCircle, CheckCircle2, Wifi, Users };
