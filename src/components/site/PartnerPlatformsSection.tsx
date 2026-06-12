import { ArrowUpRight, Globe, Link2, MonitorSmartphone, Smartphone } from "lucide-react";
import { SectionHeader } from "./ForWhomSection";

const platforms = [
  {
    icon: MonitorSmartphone,
    title: "Сайты партнёров",
    text: "Подключаем тематические страницы, лендинги и ресурсы, где уже есть аудитория по финансовым и юридическим темам.",
  },
  {
    icon: Globe,
    title: "Партнёрские платформы",
    text: "Работаем через площадки и витрины, где удобно отслеживать заявки, статусы и качество обращений.",
  },
  {
    icon: Smartphone,
    title: "Мессенджеры и соцсети",
    text: "Принимаем обращения из чатов, сообществ, личных рекомендаций и контентных каналов.",
  },
  {
    icon: Link2,
    title: "Сетки сайтов и связки",
    text: "Помогаем аккуратно разделять источники, чтобы партнёр видел, откуда пришла заявка и как она обработана.",
  },
];

export function PartnerPlatformsSection() {
  return (
    <section id="platforms" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <SectionHeader
            eyebrow="// Партнёрские платформы"
            title="Сайты, площадки и каналы, через которые приходят обращения"
          />

          <div className="rounded-[1.5rem] border border-primary/15 bg-[#cfeeff] p-5 text-primary shadow-[0_24px_70px_rgb(29_85_136_/_0.12)] sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="font-display text-3xl uppercase leading-tight text-primary">
                Источник → заявка → проверка → договор → выплата
              </div>
              <ArrowUpRight className="h-6 w-6 shrink-0 text-primary" />
            </div>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary/80">
              Все каналы сводятся в понятную цепочку: заявка фиксируется за источником, проходит
              проверку, попадает в работу и отображается в статусах партнёра.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {platforms.map((platform) => {
            const Icon = platform.icon;

            return (
              <article
                key={platform.title}
                className="group min-h-72 rounded-[1.4rem] border border-border bg-white p-6 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <ArrowUpRight className="h-6 w-6 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <h3 className="mt-8 font-display text-3xl uppercase leading-tight">
                  {platform.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {platform.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
