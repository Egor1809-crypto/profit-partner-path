import { Card } from "@/components/ui/card";
import { SectionHeader } from "./ForWhomSection";
import { MessageCircle, ClipboardList, ShieldCheck, FileText, Workflow, Headphones, RefreshCw } from "lucide-react";

const work = [
  { i: MessageCircle, t: "Первичная консультация клиента", d: "Юрист общается с клиентом, отвечает на вопросы и выясняет ситуацию." },
  { i: ClipboardList, t: "Анализ суммы долга, дохода и имущества", d: "Финансовая оценка положения клиента для подбора решения." },
  { i: ShieldCheck, t: "Проверка возможности банкротства", d: "Юридический анализ оснований и рисков процедуры." },
  { i: FileText, t: "Подготовка документов", d: "Сбор пакета документов и подготовка заявления в суд." },
  { i: Workflow, t: "Сопровождение процедуры", d: "Ведение дела до завершения с участием профильных юристов." },
  { i: Headphones, t: "Коммуникация с клиентом", d: "Менеджеры держат клиента в курсе на каждом этапе." },
  { i: RefreshCw, t: "Обратная связь партнёру по заявке", d: "Партнёр всегда знает статус каждой переданной заявки." },
];

export function WorkSection() {
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader eyebrow="Юридическая работа" title="Мы берём юридическую работу на себя" subtitle="Вы передаёте контакт — дальше всё делают наши специалисты." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {work.map(({ i: Icon, t, d }) => (
            <Card key={t} className="p-6 border-border">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground mb-4">
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
