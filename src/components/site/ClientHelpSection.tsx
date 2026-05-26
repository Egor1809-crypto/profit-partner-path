import { Button } from "@/components/ui/button";
import { LifeBuoy } from "lucide-react";

export function ClientHelpSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <LifeBuoy className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-xl md:text-2xl font-bold mb-2">Нужна помощь с долгами?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Если у вас есть кредиты, микрозаймы, просрочки, исполнительные производства или давление кредиторов, оставьте заявку. Юрист проведёт первичную консультацию и объяснит возможные варианты решения.
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="shrink-0">
            <a href="#client-form">Получить консультацию</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
