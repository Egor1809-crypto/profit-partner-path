import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Приём заявки",
    text: "Партнёр передаёт контакт клиента через форму, личный кабинет или согласованный канал.",
    image: "/assets/services/consultation-glass.webp",
    imageAlt: "Стеклянная фигура диалога",
  },
  {
    number: "02",
    title: "Правовой анализ",
    text: "Юристы проверяют долги, доходы, имущество, документы и возможные риски до заключения договора.",
    image: "/assets/services/analysis-glass.webp",
    imageAlt: "Стеклянная лупа над документом",
  },
  {
    number: "03",
    title: "Подготовка документов",
    text: "Команда собирает пакет документов и объясняет клиенту возможный порядок процедуры.",
    image: "/assets/services/documents-glass.webp",
    imageAlt: "Стеклянные листы документов",
  },
  {
    number: "04",
    title: "Сопровождение клиента",
    text: "Если процедура подходит, специалисты ведут юридическое сопровождение на согласованных условиях.",
    image: "/assets/services/guidance-glass.webp",
    imageAlt: "Стеклянный щит с маршрутом",
  },
];

export function ForWhomSection() {
  return (
    <section id="services" className="bg-background py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <div>
          <SectionHeader
            eyebrow="// Услуги"
            title="Что происходит после передачи клиента на банкротство физлиц"
          />
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            Вы приводите человека, которому нужна юридическая помощь по долгам. Компания берёт на
            себя правовую оценку, консультацию, проверку документов и сопровождение процедуры, если
            она подходит клиенту.
          </p>
          <figure className="mt-8 overflow-hidden rounded-[1.6rem]">
            <img
              src="/assets/services/partner-consultation.webp"
              alt="Консультация партнёра и клиента в светлом офисе"
              className="aspect-[3/2] h-full w-full object-cover"
            />
          </figure>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {services.map((service) => (
            <div
              key={service.number}
              tabIndex={0}
              className="group relative grid gap-4 overflow-hidden bg-white py-6 outline-none transition-colors sm:grid-cols-[4rem_1fr] sm:items-center lg:min-h-[11rem] lg:grid-cols-[4rem_minmax(0,1fr)_12rem]"
            >
              <span className="font-display text-3xl text-primary/45">{service.number}</span>
              <div>
                <h3 className="font-display text-3xl uppercase">{service.title}</h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {service.text}
                </p>
              </div>
              <figure className="relative flex h-40 items-center justify-center sm:col-start-2 lg:col-start-3 lg:row-start-1">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  className="service-glass-art h-40 w-40 object-contain lg:h-44 lg:w-44"
                />
              </figure>
              <ArrowUpRight className="absolute right-1 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-primary transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-8 group-hover:opacity-0 group-focus-visible:opacity-0 lg:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  dark,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      {eyebrow && (
        <div
          className={`mb-5 text-sm font-medium uppercase tracking-[0.18em] ${dark ? "text-white/65" : "text-primary"}`}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className={`font-display text-4xl uppercase leading-[1.06] md:text-5xl lg:text-6xl ${dark ? "text-white" : "text-foreground"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 max-w-xl leading-relaxed ${dark ? "text-white/72" : "text-muted-foreground"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
