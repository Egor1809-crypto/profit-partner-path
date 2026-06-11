import { useState } from "react";
import { ArrowUpRight, BadgeCheck, ChevronDown, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./ForWhomSection";

const locations = [
  {
    city: "Санкт-Петербург",
    top: "43%",
    left: "11%",
    office: "Офис партнёрской сети",
    note: "Согласование заявок и сопровождение обращений.",
  },
  {
    city: "Москва",
    top: "57%",
    left: "11%",
    office: "Главный офис",
    note: "Координация партнёров и проверка заявок.",
  },
  {
    city: "Краснодар",
    top: "76.5%",
    left: "3.8%",
    office: "Региональная точка",
    note: "Приём обращений по южному направлению.",
  },
  {
    city: "Ростов-на-Дону",
    top: "74%",
    left: "6%",
    office: "Региональный офис",
    note: "Передача клиентов и проверка данных.",
  },
  {
    city: "Ставрополь",
    top: "81%",
    left: "5%",
    office: "Офис сети",
    note: "Подключение партнёров и контроль заявок.",
  },
  {
    city: "Саратов",
    top: "72%",
    left: "13%",
    office: "Региональная точка",
    note: "Обработка обращений и сопровождение партнёров.",
  },
  {
    city: "Воронеж",
    top: "68%",
    left: "9%",
    office: "Региональная точка",
    note: "Первичная передача заявок и связь с партнёрами.",
  },
  {
    city: "Волгоград",
    top: "75.4%",
    left: "10.4%",
    office: "Офис сети",
    note: "Проверка обращений и передача клиентов юристам.",
  },
  {
    city: "Нижний Новгород",
    top: "62%",
    left: "15%",
    office: "Региональный офис",
    note: "Работа с партнёрскими заявками и статусами.",
  },
  {
    city: "Казань",
    top: "66.2%",
    left: "17.8%",
    office: "Офис сети",
    note: "Приём обращений и сопровождение партнёрского канала.",
  },
  {
    city: "Самара",
    top: "70.3%",
    left: "16.7%",
    office: "Офис сети",
    note: "Проверка обращений и учёт партнёрских заявок.",
  },
  {
    city: "Уфа",
    top: "72.2%",
    left: "21.3%",
    office: "Региональная точка",
    note: "Обработка заявок и контроль качества обращений.",
  },
  {
    city: "Пермь",
    top: "66.8%",
    left: "23.5%",
    office: "Офис сети",
    note: "Сопровождение партнёров и фиксация обращений.",
  },
  {
    city: "Екатеринбург",
    top: "70.4%",
    left: "26.6%",
    office: "Региональный офис",
    note: "Согласование клиентов и передача в работу.",
  },
  {
    city: "Челябинск",
    top: "75.1%",
    left: "25.8%",
    office: "Региональная точка",
    note: "Проверка заявок и обратная связь по клиентам.",
  },
  {
    city: "Тюмень",
    top: "75.3%",
    left: "30.2%",
    office: "Офис сети",
    note: "Учёт заявок и поддержка партнёрских источников.",
  },
  {
    city: "Омск",
    top: "77.4%",
    left: "35.2%",
    office: "Региональная точка",
    note: "Передача клиентов на правовую оценку.",
  },
  {
    city: "Новосибирск",
    top: "80%",
    left: "40%",
    office: "Сибирский офис",
    note: "Работа с заявками и подключение партнёров.",
  },
  {
    city: "Красноярск",
    top: "78.1%",
    left: "49.5%",
    office: "Офис сети",
    note: "Контроль обращений и сопровождение партнёров.",
  },
  {
    city: "Иркутск",
    top: "81.2%",
    left: "58.3%",
    office: "Региональная точка",
    note: "Приём заявок и передача в юридическую работу.",
  },
  {
    city: "Хабаровск",
    top: "76.4%",
    left: "84.1%",
    office: "Офис сети",
    note: "Дистанционная работа с партнёрскими обращениями.",
  },
  {
    city: "Владивосток",
    top: "88.1%",
    left: "88.9%",
    office: "Региональная точка",
    note: "Фиксация заявок и обратная связь по статусам.",
  },
];

const keyCities = [
  "Москва",
  "Санкт-Петербург",
  "Казань",
  "Екатеринбург",
  "Краснодар",
  "Новосибирск",
  "Самара",
  "Ростов-на-Дону",
  "Красноярск",
  "Владивосток",
];

export function PartnerMapSection() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  return (
    <section id="geography" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[94rem] px-5 lg:px-10">
        <SectionHeader
          eyebrow="// Карта партнёров"
          title="Сеть офисов по всей России"
          subtitle="Работаем с партнёрами и клиентами дистанционно. Очные офисы и точки присутствия подключаются после проверки заявки администратором."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {keyCities.map((city) => (
            <span
              key={city}
              className="rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm"
            >
              {city}
            </span>
          ))}
        </div>

        <div className="mt-12">
          <div className="relative">
            <div className="relative mx-auto w-full max-w-[90rem]">
              <div className="relative aspect-[1.65/1] w-full">
                <img
                  src="/assets/map/russia-regions.svg"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full opacity-70"
                />
                {locations.map((location) => (
                  <button
                    key={location.city}
                    type="button"
                    aria-label={`Информация об офисе: ${location.city}`}
                    style={{ top: location.top, left: location.left }}
                    onClick={() =>
                      setActiveCity((current) => (current === location.city ? null : location.city))
                    }
                    onMouseEnter={() => setActiveCity(location.city)}
                    onMouseLeave={() => setActiveCity(null)}
                    onFocus={() => setActiveCity(location.city)}
                    onBlur={() => setActiveCity(null)}
                    className="group/map-pin absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
                  >
                    <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 transition-transform duration-300 group-hover/map-pin:scale-125 group-focus-visible/map-pin:scale-125" />
                    <span className="relative block h-3.5 w-3.5 rounded-full bg-primary/60 ring-4 ring-white transition-colors duration-300 group-hover/map-pin:bg-primary group-focus-visible/map-pin:bg-primary" />
                    <span
                      className={`pointer-events-none absolute bottom-6 left-1/2 z-20 w-56 -translate-x-1/2 rounded-[1rem] border border-border bg-white/95 p-3 text-left shadow-[0_20px_40px_rgb(14_31_55_/_0.14)] backdrop-blur-sm transition-all duration-300 ${activeCity === location.city ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                    >
                      <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Офис сети
                      </span>
                      <span className="mt-1 block font-display text-2xl uppercase leading-tight text-foreground">
                        {location.city}
                      </span>
                      <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                        {location.office}
                      </span>
                      <span className="mt-3 block text-xs leading-relaxed text-primary/80">
                        {location.note}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-end px-1 sm:px-2 lg:px-4">
              <aside className="w-full max-w-md bg-white shadow-[var(--shadow-card)]">
                <button
                  type="button"
                  onClick={() => setIsWidgetOpen((current) => !current)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left outline-none transition-colors hover:bg-surface focus-visible:bg-surface"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-display text-2xl uppercase leading-tight">
                        Стать партнёром
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        Добавить свой город на карту
                      </span>
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${isWidgetOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isWidgetOpen ? (
                  <div className="border-t border-border px-5 pb-5 pt-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Скоро
                      </span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <BadgeCheck className="h-4 w-4 text-primary" />
                        Проверка администратором
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      Оставьте заявку. После проверки данных в админском кабинете подтверждённая
                      точка появится на карте.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                      <BadgeCheck className="h-4 w-4 text-primary" />
                      Заявка
                      <span className="text-border">/</span>
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Проверка
                      <span className="text-border">/</span>
                      Метка
                    </div>
                    <Button asChild className="mt-6 w-full rounded-full" size="lg">
                      <a href="#req-partner">
                        Стать партнёром
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                ) : null}
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
