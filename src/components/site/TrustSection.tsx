import { SectionHeader } from "./ForWhomSection";

const stats = [
  { n: "17 000+", l: "завершённых процедур" },
  { n: "11 лет", l: "опыта на рынке" },
  { n: "800+", l: "партнёров доверяют нам" },
  { n: "80+", l: "специалистов в команде" },
  { n: "По всей России", l: "работаем удалённо и очно" },
];

export function TrustSection() {
  return (
    <section id="about" className="bg-primary py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            dark
            eyebrow="// О компании"
            title="Юридическая команда, которой можно доверить клиента"
          />
          <div>
            <p className="text-xl font-medium leading-relaxed text-white lg:text-2xl">
              Вы передаёте клиента на правовую оценку ситуации по банкротству физлиц. Юристы
              проверяют документы, объясняют возможные варианты и сопровождают процедуру, если она
              подходит клиенту.
            </p>
            <p className="mt-6 text-lg font-medium leading-relaxed text-white lg:text-xl">
              Мы не обещаем клиенту списание долгов до анализа ситуации. Итог зависит от документов,
              доходов, имущества и судебной практики по конкретному делу.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.l}
              className="flex min-h-40 flex-col rounded-[1.25rem] border border-white/12 bg-[#0d1b32]/20 p-5 shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.05)] lg:min-h-44 lg:p-6"
            >
              <div className="text-[clamp(2.35rem,3vw,3.5rem)] font-semibold leading-[1.05] text-white">
                {stat.n}
              </div>
              <div className="mt-2 max-w-40 text-sm leading-snug text-white">{stat.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
