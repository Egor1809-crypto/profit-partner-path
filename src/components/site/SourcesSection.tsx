import { Card } from "@/components/ui/card";
import { SectionHeader } from "./ForWhomSection";
import { Users2, Share2, Globe2, Target, FileSignature, Network, AlertTriangle } from "lucide-react";

const sources = [
  { i: Users2, t: "Сарафанное радио", d: "Рекомендации знакомым, коллегам и клиентам." },
  { i: Share2, t: "Социальные сети", d: "Посты, сторис и личные сообщения в подходящих сообществах." },
  { i: Globe2, t: "Сайт или лендинг", d: "Размещение информации о банкротстве на собственном ресурсе." },
  { i: Target, t: "Контекстная и таргетированная реклама", d: "Платный трафик по согласованным правилам." },
  { i: FileSignature, t: "Офлайн-реклама", d: "Объявления, листовки, печатные материалы в регионах присутствия." },
  { i: Network, t: "Партнёрская база из смежных сфер", d: "Кросс-рекомендации с риелторами, бухгалтерами, брокерами." },
];

export function SourcesSection() {
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader eyebrow="Источники клиентов" title="Как партнёр может находить клиентов" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sources.map(({ i: Icon, t, d }) => (
            <Card key={t} className="p-6 border-border">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-2">{t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-5 max-w-3xl">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed">
            Рекламные материалы должны быть корректными: нельзя обещать гарантированное списание всех долгов, 100% результат или призывать клиента не платить долги.
          </p>
        </div>
      </div>
    </section>
  );
}
