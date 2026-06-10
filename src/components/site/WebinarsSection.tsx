import { ArrowUpRight, CalendarDays, ClipboardCheck, MessageSquareText, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./ForWhomSection";

const webinars = [
  {
    icon: ClipboardCheck,
    title: "Процедуры и этапы работы",
    text: "Показываем, что происходит с заявкой после передачи: контакт, оценка, документы, договор и сопровождение.",
    meta: "60 минут / практический эфир",
  },
  {
    icon: Play,
    title: "Разбор реальных кейсов",
    text: "Разбираем ситуации клиентов без персональных данных: долги, имущество, доходы и возможные риски.",
    meta: "Кейсы без персональных данных",
  },
  {
    icon: MessageSquareText,
    title: "Вопросы партнёров",
    text: "Обсуждаем, как говорить с клиентом, что нельзя обещать и как не терять обращение между этапами.",
    meta: "Живой Q&A после эфира",
  },
];

export function WebinarsSection() {
  return (
    <section id="webinars" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <SectionHeader
            eyebrow="// Вебинары"
            title="Обучающие эфиры по процедурам и кейсам"
            subtitle="Регулярные встречи для партнёров: объясняем юридические этапы простым языком, разбираем ситуации клиентов и показываем, как передавать обращения без рискованных обещаний."
          />
          <div className="rounded-md border border-primary/15 bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
            <div className="flex items-center gap-3 text-primary">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <CalendarDays className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Ближайший эфир
                </div>
                <div className="font-display text-3xl uppercase leading-tight">
                  Каждый четверг, 19:00
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Тема ближайшей встречи появится после подключения партнёра.
            </p>
            <Button asChild className="mt-6 rounded-full" variant="outline">
              <a href="#req-partner">Узнать о вебинаре</a>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {webinars.map((webinar) => {
            const Icon = webinar.icon;

            return (
              <article
                key={webinar.title}
                className="group flex min-h-80 flex-col rounded-md border border-border bg-white p-6 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <ArrowUpRight className="h-6 w-6 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <h3 className="mt-8 font-display text-3xl uppercase leading-tight">
                  {webinar.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{webinar.text}</p>
                <div className="mt-auto pt-8 text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                  {webinar.meta}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
