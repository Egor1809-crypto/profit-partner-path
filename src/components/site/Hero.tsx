import { Button } from "@/components/ui/button";
import { Check, ShieldAlert } from "lucide-react";

export function Hero() {
  const perks = [
    "Не нужно быть юристом",
    "Можно работать из любого региона",
    "Клиента консультируют специалисты",
    "Выплата после заключения договора и оплаты",
    "Заявки можно передавать удалённо",
  ];
  return (
    <section id="top" className="relative overflow-hidden text-white" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
        backgroundSize: "60px 60px, 80px 80px",
      }} />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl" style={{ background: "var(--gradient-gold)" }} />
      <div className="container relative mx-auto px-4 lg:px-8 py-20 lg:py-28">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-medium mb-6 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            Партнёрская программа федеральной юридической компании
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            Станьте партнёром юридической компании и <span className="text-gold">зарабатывайте</span> на передаче клиентов по банкротству
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-white/75 max-w-3xl leading-relaxed">
            Передавайте контакты людей с долгами, кредитами, МФО или исполнительными производствами. Мы консультируем клиента, ведём юридическую работу, а вы получаете вознаграждение после заключения договора.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl"><a href="#partner-form">Стать партнёром</a></Button>
            <Button asChild size="xl" variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white"><a href="#income">Узнать условия</a></Button>
            <Button asChild size="xl" variant="ghost" className="text-white hover:bg-white/10 hover:text-white"><a href="#client-form">Передать клиента</a></Button>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
            {perks.map(p => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-white/85">
                <Check className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-start gap-3 max-w-3xl rounded-lg border border-white/10 bg-white/5 p-4 text-xs text-white/60 leading-relaxed">
            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-white/50" />
            <p>Результат по делу клиента зависит от его индивидуальной ситуации. Компания не гарантирует списание всех долгов и не призывает не исполнять денежные обязательства.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
