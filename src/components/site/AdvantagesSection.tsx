import { SectionHeader } from "./ForWhomSection";
import { Check } from "lucide-react";

const advantages = [
  "Прозрачные условия выплат",
  "Понятная схема работы",
  "Можно начать без юридического опыта",
  "Юридическую работу выполняет компания",
  "Партнёр получает обратную связь по заявкам",
  "Можно работать удалённо",
  "Востребованная услуга",
  "Подходит для разных сфер",
  "Есть материалы для продвижения",
  "Можно передавать клиентов регулярно",
];

export function AdvantagesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader eyebrow="Преимущества" title="Почему партнёры выбирают эту программу" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
          {advantages.map(a => (
            <div key={a} className="flex items-center gap-3 rounded-xl bg-card border border-border p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground">
                <Check className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
