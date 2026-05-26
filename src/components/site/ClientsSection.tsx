import { Card } from "@/components/ui/card";
import { SectionHeader } from "./ForWhomSection";
import { CreditCard, AlertTriangle, Banknote, Phone, FileWarning, Lock, Wallet, Home, MessageSquare, HelpCircle, Info } from "lucide-react";

const signs = [
  { i: CreditCard, t: "Есть кредиты или микрозаймы" },
  { i: AlertTriangle, t: "Есть просрочки" },
  { i: Banknote, t: "Долг от 300 000 ₽" },
  { i: Phone, t: "Звонят коллекторы или кредиторы" },
  { i: FileWarning, t: "Есть исполнительные производства" },
  { i: Lock, t: "Арестованы счета" },
  { i: Wallet, t: "Удерживают деньги с зарплаты" },
  { i: Home, t: "Есть долги по ЖКХ или налогам" },
  { i: HelpCircle, t: "Клиент хочет узнать про банкротство" },
  { i: MessageSquare, t: "Клиенту нужна консультация по долговой нагрузке" },
];

export function ClientsSection() {
  return (
    <section id="clients" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader eyebrow="Идеальный клиент" title="Какие клиенты нам подходят" subtitle="Если у человека есть хотя бы один из признаков — заявку можно передавать." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {signs.map(({ i: Icon, t }) => (
            <Card key={t} className="flex items-center gap-3 p-4 border-border hover:border-gold/40 transition-colors">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">{t}</span>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-primary/15 bg-primary/5 p-5 max-w-3xl">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed"><span className="font-semibold">Не уверены, подходит ли клиент?</span> Передайте заявку — юрист сам проведёт первичную оценку ситуации.</p>
        </div>
      </div>
    </section>
  );
}
