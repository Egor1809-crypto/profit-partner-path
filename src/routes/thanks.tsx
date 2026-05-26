import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/thanks")({
  head: () => ({ meta: [{ title: "Спасибо за заявку" }] }),
  component: Thanks,
});

function Thanks() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-surface">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="font-display text-3xl font-bold mb-3">Спасибо! Заявка отправлена</h1>
        <p className="text-muted-foreground mb-8">Специалист по партнёрской программе свяжется с вами в ближайшее время.</p>
        <Button asChild variant="gold" size="lg"><Link to="/">На главную</Link></Button>
      </div>
    </div>
  );
}
