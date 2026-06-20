import { SectionHeader } from "./ForWhomSection";
import { BadgeDollarSign, Clock3, LayoutDashboard, Scale } from "lucide-react";

const advantages = [
  {
    icon: BadgeDollarSign,
    title: "Вознаграждение",
    description: "Партнёр получает выплату за заявку, которая прошла проверку и принята в работу.",
    items: [
      "Фиксируем источник обращения",
      "Обсуждаем условия до старта",
      "Подключаем несколько каналов",
    ],
  },
  {
    icon: Clock3,
    title: "Быстрая обработка",
    description: "Заявка быстро попадает к менеджеру, а клиент не остаётся без обратной связи.",
    items: [
      "Передача занимает около минуты",
      "Первичный контакт — до 24 часов",
      "Помогаем партнёру на старте",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Личный кабинет",
    description: "Партнёр видит движение обращений и понимает, какие источники дают результат.",
    items: [
      "Статусы по каждому клиенту",
      "История обращений и этапы",
      "Понятная аналитика источников",
    ],
  },
  {
    icon: Scale,
    title: "Юридическая проверка",
    description: "Перед работой юристы оценивают документы, риски и применимость процедуры.",
    items: [
      "Правовая оценка ситуации",
      "Без гарантий до анализа",
      "Корректное сопровождение клиента",
    ],
  },
];

export function AdvantagesSection() {
  return (
    <section id="benefits" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <SectionHeader
          eyebrow="// Преимущества"
          title="Партнёрская программа для тех, у кого есть заявки, аудитория или трафик"
          subtitle="Если у вас есть клиенты с долгами, сайт, блог, сообщество, база или рекомендации — передавайте обращения, отслеживайте заявки и получайте вознаграждение по прозрачным условиям."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {advantages.map((advantage) => {
            const Icon = advantage.icon;

            return (
              <article
                key={advantage.title}
                className="rounded-[1.4rem] border border-border bg-white p-6 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <span className="flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-6 font-display text-[2.1rem] uppercase leading-[0.95] tracking-[-0.03em]">
                    {advantage.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-foreground">
                    {advantage.description}
                  </p>
                </div>
                <ul className="mt-7 space-y-3">
                  {advantage.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[0.92rem] leading-relaxed text-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
