import { SectionHeader } from "./ForWhomSection";

const leaders = [
  {
    name: "Василий Артин",
    role: "Генеральный директор",
    text: "Отвечает за подключение партнёров, условия работы и развитие каналов заявок.",
    photo: "/assets/leaders/vasily-artin.webp",
  },
  {
    name: "Елена Лященко",
    role: "Руководитель юридического отдела",
    text: "Контролирует правовую оценку обращений и качество юридического сопровождения.",
    photo: "/assets/leaders/elena-lyaschenko-new.jpeg",
  },
  {
    name: "Александр Герасимов",
    role: "Арбитражный управляющий",
    text: "Следит за коммуникацией с клиентами после передачи заявки.",
    photo: "/assets/leaders/alexander-gerasimov.webp",
  },
  {
    name: "Андрей Абукаев",
    role: "Арбитражный управляющий",
    text: "Проверяет сложные ситуации, документы и возможные риски перед процедурой.",
    photo: "/assets/leaders/andrey-abukaev.webp",
  },
];

export function LeadersSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <SectionHeader
          eyebrow="// Руководители направления"
          title="Кто отвечает за партнёрское направление"
          subtitle="Показываем людей, которые отвечают за обработку заявок, юридическую оценку и сопровождение партнёров."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {leaders.map((leader) => (
            <article
              key={leader.name}
              className="overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-[var(--shadow-card)]"
            >
              <div className="overflow-hidden bg-gradient-to-br from-[#eaf6ff] to-[#c9e6ff]">
                <img
                  src={leader.photo}
                  alt={leader.name}
                  loading="lazy"
                  className="aspect-[1.05/1] w-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <span className="rounded-full border border-primary/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary">
                  Команда
                </span>
                <h3 className="mt-5 font-display text-3xl uppercase leading-tight">
                  {leader.name}
                </h3>
                <div className="mt-2 text-sm font-semibold text-primary/75">{leader.role}</div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{leader.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
