import { SectionHeader } from "./ForWhomSection";

const articles = [
  {
    title: "5 признаков, что клиента пора передать юристу",
    text: "Когда не стоит откладывать первичную правовую оценку ситуации по долгам.",
    date: "14.04.2026",
  },
  {
    title: "Что нельзя обещать клиенту при передаче заявки",
    text: "Формулировки для партнёра без гарантий результата и юридических рисков.",
    date: "13.04.2026",
  },
  {
    title: "Чек-лист документов для первичной оценки",
    text: "Какие данные помогают юристу быстрее понять ситуацию клиента.",
    date: "08.04.2026",
  },
];

export function ToolsSection() {
  return (
    <section id="blog" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <SectionHeader eyebrow="// Блог" title="Полезные материалы для партнёров и клиентов" />
        <div className="grid gap-px overflow-hidden rounded-md bg-border lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.title}
              className="flex min-h-72 flex-col bg-background p-6 lg:p-8"
            >
              <time className="text-xs uppercase tracking-[0.2em] text-foreground">
                {article.date}
              </time>
              <h3 className="mt-8 flex min-h-[6.5rem] items-start font-display text-3xl uppercase leading-tight">
                {article.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-foreground">{article.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
