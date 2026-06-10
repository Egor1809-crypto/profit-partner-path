import { SectionHeader } from "./ForWhomSection";

const cases = [
  {
    place: "Москва",
    situation: "Клиент столкнулся с просрочками по кредитам и давлением кредиторов.",
    solution: "Команда провела правовую оценку и подготовила индивидуальный порядок действий.",
    result: "Клиент получил ясный законный маршрут и начал сопровождение.",
  },
  {
    place: "Регионы РФ",
    situation: "Партнёр передал обращение удалённо, без личной встречи с клиентом.",
    solution: "Консультация и проверка документов прошли онлайн.",
    result: "Партнёр получил статус обращения и вознаграждение по условиям программы.",
  },
];

export function CasesSection() {
  return (
    <section id="cases" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <SectionHeader
          eyebrow="// География и результат"
          title="Работаем с обращениями по всей России"
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {cases.map((item) => (
            <article
              key={item.place}
              className="rounded-md border border-border bg-white p-6 lg:p-8"
            >
              <div className="mb-8 font-display text-4xl uppercase text-primary">{item.place}</div>
              {[
                ["// Ситуация", item.situation],
                ["// Решение", item.solution],
                ["/ Результат", item.result],
              ].map(([label, text]) => (
                <div key={label} className="border-t border-border py-4">
                  <div className="mb-2 text-xs uppercase tracking-[0.18em] text-primary">
                    {label}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
