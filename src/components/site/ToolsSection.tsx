import { Card } from "@/components/ui/card";
import { SectionHeader } from "./ForWhomSection";
import { UserCheck, BookOpen, MessageSquareQuote, ListChecks, MessagesSquare, Laptop } from "lucide-react";

const tools = [
  { i: UserCheck, t: "Персональный менеджер", d: "Куратор по вашим заявкам и вопросам по программе." },
  { i: BookOpen, t: "Материалы для продвижения", d: "Готовые тексты, баннеры и презентации для использования в работе." },
  { i: MessageSquareQuote, t: "Скрипты общения с клиентом", d: "Шаблоны для корректного разговора без юридических обещаний." },
  { i: ListChecks, t: "Отслеживание заявок", d: "Понятная отчётность по статусу каждой переданной заявки." },
  { i: MessagesSquare, t: "Обратная связь по лидам", d: "Узнаёте, по каким причинам клиент дошёл или не дошёл до договора." },
  { i: Laptop, t: "Удалённый формат работы", d: "Передавайте клиентов из любого региона России — без офиса и встреч." },
];

export function ToolsSection() {
  return (
    <section id="tools" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader eyebrow="После подключения" title="Что получает партнёр после подключения" subtitle="Всё, что нужно, чтобы начать передавать заявки и получать вознаграждение." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map(({ i: Icon, t, d }) => (
            <Card key={t} className="p-6 border-border hover:shadow-[var(--shadow-elevated)] transition-shadow">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/15 text-gold mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-2">{t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
