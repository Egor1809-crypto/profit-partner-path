import { SectionHeader } from "./ForWhomSection";
import { Card } from "@/components/ui/card";

const rows = [
  ["Долги по кредитам и МФО", "Передал контакт клиента", "Компания провела консультацию и правовой анализ"],
  ["Аресты счетов у приставов", "Направил клиента на консультацию", "Компания объяснила возможные варианты действий"],
  ["Отказ в ипотеке из-за долгов", "Передал заявку", "Компания проверила долговую нагрузку и риски"],
  ["Просрочки и звонки кредиторов", "Рекомендовал консультацию", "Компания подобрала юридическую стратегию"],
];

export function CasesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader eyebrow="Кейсы" title="Примеры ситуаций клиентов" />
        <Card className="overflow-hidden border-border">
          {/* desktop */}
          <div className="hidden md:block">
            <div className="grid grid-cols-3 bg-primary text-primary-foreground text-sm font-semibold">
              <div className="px-6 py-4">Ситуация клиента</div>
              <div className="px-6 py-4 border-l border-white/10">Что сделал партнёр</div>
              <div className="px-6 py-4 border-l border-white/10">Что сделала компания</div>
            </div>
            {rows.map((r, i) => (
              <div key={i} className={`grid grid-cols-3 text-sm ${i % 2 ? "bg-surface" : ""}`}>
                <div className="px-6 py-5 font-medium">{r[0]}</div>
                <div className="px-6 py-5 text-muted-foreground border-l border-border">{r[1]}</div>
                <div className="px-6 py-5 text-muted-foreground border-l border-border">{r[2]}</div>
              </div>
            ))}
          </div>
          {/* mobile */}
          <div className="md:hidden divide-y divide-border">
            {rows.map((r, i) => (
              <div key={i} className="p-5 space-y-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Ситуация</div>
                  <div className="font-medium">{r[0]}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Партнёр</div>
                  <div className="text-sm">{r[1]}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Компания</div>
                  <div className="text-sm">{r[2]}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <p className="mt-6 text-xs text-muted-foreground max-w-2xl">
          * Кейсы демонстрационные. Для реального сайта нужно добавить подтверждённые примеры без нарушения конфиденциальности клиентов.
        </p>
      </div>
    </section>
  );
}
