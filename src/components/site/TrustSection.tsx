import { SectionHeader } from "./ForWhomSection";

const stats = [
  { n: "10+", l: "лет опыта" },
  { n: "30+", l: "регионов работы" },
  { n: "500+", l: "завершённых процедур" },
  { n: "1 000+", l: "консультаций" },
  { n: "50+", l: "активных партнёров" },
  { n: "24 часа", l: "среднее время обработки заявки" },
];

export function TrustSection() {
  return (
    <section className="relative py-20 lg:py-28 text-white overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full opacity-15 blur-3xl" style={{ background: "var(--gradient-gold)" }} />
      <div className="container relative mx-auto px-4 lg:px-8">
        <SectionHeader dark eyebrow="Доверие" title="Почему нам можно доверять клиентов" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(s => (
            <div key={s.l} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-7">
              <div className="font-display text-4xl lg:text-5xl font-bold text-gold mb-2">{s.n}</div>
              <div className="text-white/75">{s.l}</div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-white/50 max-w-2xl">
          * Цифры демонстрационные. Перед запуском сайта замените их на реальные данные компании.
        </p>
      </div>
    </section>
  );
}
