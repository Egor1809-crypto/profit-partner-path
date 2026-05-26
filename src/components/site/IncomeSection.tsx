import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./ForWhomSection";
import { Check, Users, Wifi } from "lucide-react";

const plans = [
  {
    icon: Users,
    name: "Встреча с клиентом",
    desc: "Подходит, если партнёр может направить клиента на очную консультацию",
    price: "от 2 500 до 5 000 ₽",
    features: [
      "Очная консультация клиента",
      "Выплата после заключения договора и оплаты клиентом",
      "Поддержка персонального менеджера",
    ],
  },
  {
    icon: Wifi,
    name: "Дистанция",
    desc: "Подходит для партнёров из регионов и онлайн-источников",
    price: "от 2 500 до 5 000 ₽",
    features: [
      "Клиент консультируется удалённо",
      "Передача заявки онлайн",
      "Выплата после заключения договора и оплаты",
    ],
    highlight: true,
  },
];

export function IncomeSection() {
  return (
    <section id="income" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader eyebrow="Вознаграждение" title="Сколько можно заработать" subtitle="Два прозрачных тарифа — выбирайте подходящий формат работы." />
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl">
          {plans.map(({ icon: Icon, name, desc, price, features, highlight }) => (
            <Card key={name} className={`relative p-8 ${highlight ? "border-gold border-2 shadow-[var(--shadow-elevated)]" : "border-border"}`}>
              {highlight && <span className="absolute -top-3 right-6 bg-gold text-gold-foreground text-xs font-bold px-3 py-1 rounded-full">Популярный</span>}
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl mb-5 ${highlight ? "bg-gold/15 text-gold" : "bg-primary/10 text-primary"}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">{name}</h3>
              <p className="text-sm text-muted-foreground mb-5">{desc}</p>
              <div className="text-3xl font-display font-bold text-primary mb-6">{price}</div>
              <ul className="space-y-3">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button asChild variant="gold" size="xl"><a href="#partner-form">Стать партнёром</a></Button>
        </div>
      </div>
    </section>
  );
}
