import { ArrowUpRight } from "lucide-react";
import heroVideo from "@/assets/hero/aspb-handshake.mp4";
import heroPoster from "@/assets/hero/aspb-handshake-poster.webp";

const heroCards = [
  { title: "Стать партнёром", href: "#req-partner" },
  { title: "Передать клиента", href: "#req-client" },
];

const heroBenefits = [
  "Выплаты за подтверждённые заявки",
  "Первичная обработка до 24 часов",
  "Статусы по каждому клиенту",
];

const heroSteps = ["Заявка фиксируется", "Юристы проводят оценку", "Партнёр получает выплату"];

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-[#eef7ff] text-primary">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgb(255_255_255_/_0.95),transparent_34%),linear-gradient(115deg,rgb(255_255_255_/_0.82)_0%,rgb(238_247_255_/_0.9)_45%,rgb(213_235_255_/_0.9)_100%)]" />
      <div className="pointer-events-none absolute -bottom-36 left-0 h-72 w-72 rounded-full bg-white/80 blur-3xl" />
      <div className="mx-auto grid min-h-screen max-w-[88rem] items-start gap-12 px-5 pb-10 pt-48 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8 lg:px-10 lg:pb-14 lg:pt-40">
        <div className="relative z-10 max-w-3xl">
          <h1 className="font-display max-w-4xl text-[clamp(3rem,4.7vw,5.35rem)] font-medium uppercase leading-[1.02] tracking-[-0.045em] text-foreground">
            <span className="block">Зарабатывайте</span>
            <span className="block">на передаче клиентов</span>
            <span className="block">на банкротство физлиц</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-primary/76 lg:text-lg">
            Передавайте нам обращения клиентов с долгами. Юристы проверят ситуацию, свяжутся с
            клиентом, объяснят возможный порядок процедуры и возьмут сопровождение, если банкротство
            действительно подходит.
          </p>

          <div className="mt-8 flex max-w-4xl items-center gap-3 overflow-x-auto pb-2 text-sm font-semibold text-primary sm:overflow-visible lg:text-base">
            {heroSteps.map((step, index) => (
              <div key={step} className="flex shrink-0 items-center gap-3">
                <span className="whitespace-nowrap rounded-full bg-white/70 px-5 py-2.5 shadow-[0_14px_36px_rgb(29_85_136_/_0.08)] backdrop-blur-sm">
                  {step}
                </span>
                {index < heroSteps.length - 1 ? (
                  <span className="text-2xl text-primary/35">→</span>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
            {heroBenefits.map((benefit) => (
              <div
                key={benefit}
                className="border-l border-primary/25 bg-white/45 px-4 py-3 text-sm font-medium leading-snug text-primary/82 backdrop-blur-sm"
              >
                {benefit}
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-start gap-6 sm:flex-row sm:gap-10 lg:mt-24">
            {heroCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="group inline-flex items-center gap-4 font-display text-3xl uppercase leading-tight text-foreground transition-colors hover:text-primary"
              >
                <span>{card.title}</span>
                <ArrowUpRight className="h-6 w-6 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            ))}
          </div>
        </div>

        <div className="relative z-10 hidden self-start pt-0 lg:block">
          <div className="relative ml-auto w-full overflow-hidden rounded-[2.75rem] border border-white/80 bg-white/55 p-3 shadow-[0_32px_90px_rgb(27_91_150_/_0.18)] backdrop-blur-sm">
            <video
              src={heroVideo}
              poster={heroPoster}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-label="Партнёрское рукопожатие ASPB Partners"
              className="aspect-[4/3] w-full rounded-[2.15rem] object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
