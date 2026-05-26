import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SectionHeader } from "./ForWhomSection";
import { CheckCircle2 } from "lucide-react";

export function PartnerForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [channel, setChannel] = useState("telegram");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setOpen(true); (e.target as HTMLFormElement).reset(); setAgree(false); }, 600);
  };

  return (
    <section id="partner-form" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <div>
            <SectionHeader eyebrow="Заявка" title="Стать партнёром" subtitle="Заполните форму — менеджер свяжется с вами и расскажет об условиях работы." />
            <ul className="space-y-3 text-sm">
              {["Подключение в течение 24 часов","Персональный менеджер","Прозрачные условия выплат","Готовые материалы для работы"].map(t => (
                <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-gold" />{t}</li>
              ))}
            </ul>
          </div>
          <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[var(--shadow-card)] space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Имя"><Input required name="name" placeholder="Иван" /></Field>
              <Field label="Телефон"><Input required type="tel" name="phone" placeholder="+7 ___ ___-__-__" /></Field>
              <Field label="Город"><Input required name="city" placeholder="Москва" /></Field>
              <Field label="Сфера деятельности"><Input required name="field" placeholder="Например, риелтор" /></Field>
            </div>
            <Field label="Есть ли уже потенциальные клиенты">
              <Select>
                <SelectTrigger><SelectValue placeholder="Выберите" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Да</SelectItem>
                  <SelectItem value="no">Нет</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Сколько заявок примерно можете передавать в месяц">
              <Input name="volume" placeholder="Например, 5–10" />
            </Field>
            <Field label="Удобный способ связи">
              <RadioGroup value={channel} onValueChange={setChannel} className="flex flex-wrap gap-4 pt-1">
                {[["telegram","Telegram"],["whatsapp","WhatsApp"],["call","Звонок"]].map(([v,l]) => (
                  <label key={v} className="flex items-center gap-2 cursor-pointer text-sm">
                    <RadioGroupItem value={v} /> {l}
                  </label>
                ))}
              </RadioGroup>
            </Field>
            <Field label="Комментарий"><Textarea name="comment" rows={3} placeholder="Расскажите о себе или задайте вопрос" /></Field>
            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <Checkbox checked={agree} onCheckedChange={v => setAgree(!!v)} className="mt-0.5" />
              <span>Я даю согласие на обработку <a href="/personal-data" className="underline">персональных данных</a> и принимаю <a href="/privacy" className="underline">политику конфиденциальности</a>.</span>
            </label>
            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={loading || !agree}>
              {loading ? "Отправка..." : "Стать партнёром"}
            </Button>
          </form>
        </div>
      </div>
      <SuccessDialog open={open} onOpenChange={setOpen} title="Спасибо! Заявка отправлена" description="Специалист по партнёрской программе свяжется с вами." />
    </section>
  );
}

export function ClientForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setOpen(true); (e.target as HTMLFormElement).reset(); setAgree(false); }, 600);
  };

  return (
    <section id="client-form" className="py-20 lg:py-28 bg-surface">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <div>
            <SectionHeader eyebrow="Заявка клиента" title="Передать клиента" subtitle="Уже есть человек, которому нужна консультация? Передайте его контакты — мы свяжемся с ним в течение 24 часов." />
          </div>
          <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[var(--shadow-card)] space-y-4">
            <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Партнёр</div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Имя партнёра"><Input required name="pname" /></Field>
              <Field label="Телефон партнёра"><Input required type="tel" name="pphone" /></Field>
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground pt-2">Клиент</div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Имя клиента"><Input required name="cname" /></Field>
              <Field label="Телефон клиента"><Input required type="tel" name="cphone" /></Field>
              <Field label="Город клиента"><Input required name="ccity" /></Field>
              <Field label="Сумма долга"><Input name="debt" placeholder="Например, 500 000 ₽" /></Field>
            </div>
            <Field label="Комментарий по ситуации"><Textarea name="comment" rows={3} /></Field>
            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <Checkbox checked={agree} onCheckedChange={v => setAgree(!!v)} className="mt-0.5" />
              <span>Согласие на обработку <a href="/personal-data" className="underline">персональных данных</a>.</span>
            </label>
            <Button type="submit" variant="default" size="lg" className="w-full" disabled={loading || !agree}>
              {loading ? "Отправка..." : "Передать заявку"}
            </Button>
          </form>
        </div>
      </div>
      <SuccessDialog open={open} onOpenChange={setOpen} title="Спасибо! Заявка клиента передана" description="Мы свяжемся с клиентом в ближайшее время и держим вас в курсе." />
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-foreground/80">{label}</Label>
      {children}
    </div>
  );
}

function SuccessDialog({ open, onOpenChange, title, description }: { open: boolean; onOpenChange: (v: boolean) => void; title: string; description: string }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md text-center">
        <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-display">{title}</DialogTitle>
          <DialogDescription className="text-center text-base pt-1">{description}</DialogDescription>
        </DialogHeader>
        <Button onClick={() => onOpenChange(false)} variant="gold" className="mt-2">Хорошо</Button>
      </DialogContent>
    </Dialog>
  );
}
