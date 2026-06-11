import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionHeader } from "./ForWhomSection";
import { CheckCircle2 } from "lucide-react";

type FormMode = "partner" | "client";

const partnerHighlights = [
  "Менеджер свяжется с вами",
  "Покажем условия выплат",
  "Подключим личный кабинет",
  "Передадим материалы для старта",
];

const clientHighlights = [
  "Заявка фиксируется за партнёром",
  "Юристы проведут первичную оценку",
  "Свяжемся с клиентом до 24 часов",
  "Статус обращения будет понятен",
];

const fieldBaseClass =
  "h-12 font-sans text-base shadow-sm placeholder:text-slate-400 focus-visible:ring-primary/40";

const textareaBaseClass =
  "min-h-28 font-sans text-base shadow-sm placeholder:text-slate-400 focus-visible:ring-primary/40";

// Russian phone numbers normalise to 11 digits (a leading 7/8 + 10). We only
// validate the digit count so masks/spaces/brackets are accepted, but obviously
// incomplete or junk values are rejected before a dead lead is captured.
function isValidRuPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 && /^[78]/.test(digits);
}

async function sendTelegramLead(payload: Record<string, FormDataEntryValue | string>) {
  const response = await fetch("/api/telegram", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(result?.error ?? "Не удалось отправить заявку");
  }
}

export function PartnerForm() {
  const [mode, setMode] = useState<FormMode>("partner");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);
  const [channel, setChannel] = useState("telegram");

  useEffect(() => {
    const syncModeFromHash = () => {
      if (window.location.hash === "#req-client") {
        setMode("client");
        return;
      }
      if (window.location.hash === "#req-partner" || window.location.hash === "#req") {
        setMode("partner");
      }
    };

    syncModeFromHash();
    window.addEventListener("hashchange", syncModeFromHash);
    return () => window.removeEventListener("hashchange", syncModeFromHash);
  }, []);

  const isClientMode = mode === "client";
  const sectionClass = isClientMode
    ? "bg-white py-20 text-primary lg:py-28"
    : "bg-primary py-20 text-white lg:py-28";
  const formClass = isClientMode
    ? "space-y-5 rounded-[1.75rem] border border-primary/20 bg-primary p-6 font-sans text-white shadow-[0_28px_80px_rgb(0_52_104_/_0.18)] md:p-8"
    : "space-y-5 rounded-[1.75rem] border border-white/70 bg-white p-6 font-sans text-[#112033] shadow-[0_28px_80px_rgb(0_52_104_/_0.18)] md:p-8";
  const inputClass = isClientMode
    ? `${fieldBaseClass} border-white/35 bg-white text-[#101828]`
    : `${fieldBaseClass} border-primary/20 bg-[#f4f8ff] text-[#101828]`;
  const textareaClass = isClientMode
    ? `${textareaBaseClass} border-white/35 bg-white text-[#101828]`
    : `${textareaBaseClass} border-primary/20 bg-[#f4f8ff] text-[#101828]`;
  const labelClass = isClientMode ? "text-white" : "text-[#0088df]";
  const mutedTextClass = isClientMode ? "text-white/78" : "text-slate-600";
  const highlights = isClientMode ? clientHighlights : partnerHighlights;

  const switchMode = (nextMode: FormMode) => {
    setMode(nextMode);
    setError("");
    window.history.replaceState(null, "", nextMode === "client" ? "#req-client" : "#req-partner");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agree) {
      setError("Поставьте галочку согласия на обработку персональных данных.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      type: mode,
      ...Object.fromEntries(formData),
      channel,
    };

    const phonesToCheck: Array<[string, FormDataEntryValue | null]> = isClientMode
      ? [
          ["Телефон партнёра", formData.get("pphone")],
          ["Телефон клиента", formData.get("cphone")],
        ]
      : [["Телефон", formData.get("phone")]];
    for (const [label, value] of phonesToCheck) {
      if (!isValidRuPhone(typeof value === "string" ? value : "")) {
        setError(`Проверьте поле «${label}»: укажите корректный номер, например +7 999 123-45-67.`);
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      await sendTelegramLead(payload);
      setLoading(false);
      setOpen(true);
      form.reset();
      setAgree(false);
      setChannel("telegram");
    } catch (submitError) {
      setLoading(false);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Не удалось отправить заявку. Попробуйте позже.",
      );
    }
  };

  return (
    <section id="req" className={sectionClass}>
      <span id="req-partner" className="block -translate-y-28" aria-hidden="true" />
      <span id="req-client" className="block -translate-y-28" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              dark={!isClientMode}
              eyebrow="// Заявка"
              title="Оставьте заявку"
              subtitle={
                isClientMode
                  ? "Передайте контакт клиента с долгами. Юристы проведут первичную правовую оценку и свяжутся с клиентом."
                  : "Заполните форму, чтобы обсудить подключение к партнёрской программе и порядок передачи клиентов."
              }
            />
            <div
              className={`mb-8 grid gap-2 rounded-[1.5rem] p-2 shadow-[0_20px_55px_rgb(0_52_104_/_0.14)] sm:grid-cols-2 ${
                isClientMode ? "bg-[#eef7ff]" : "bg-white/12"
              }`}
            >
              <button
                type="button"
                onClick={() => switchMode("partner")}
                className={`rounded-[1.1rem] px-5 py-4 text-left font-display text-xl uppercase leading-tight transition-colors ${
                  !isClientMode
                    ? "bg-white text-primary"
                    : "bg-transparent text-primary/55 hover:text-primary"
                }`}
              >
                Стать партнёром
              </button>
              <button
                type="button"
                onClick={() => switchMode("client")}
                className={`rounded-[1.1rem] px-5 py-4 text-left font-display text-xl uppercase leading-tight transition-colors ${
                  isClientMode
                    ? "bg-primary text-white"
                    : "bg-transparent text-white/65 hover:text-white"
                }`}
              >
                Передать клиента
              </button>
            </div>
            <ul className="space-y-3 text-sm">
              {highlights.map((t) => (
                <li
                  key={t}
                  className={`flex items-center gap-2 ${isClientMode ? "text-primary/75" : "text-white/80"}`}
                >
                  <CheckCircle2
                    className={`h-5 w-5 ${isClientMode ? "text-primary" : "text-blue-100"}`}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={onSubmit} className={formClass}>
            <input type="hidden" name="requestType" value={mode} />
            <div
              className={`border-b pb-5 ${isClientMode ? "border-white/20" : "border-primary/10"}`}
            >
              <div
                className={`font-display text-3xl uppercase leading-tight ${
                  isClientMode ? "text-white" : "text-primary"
                }`}
              >
                {isClientMode ? "Заявка: передать клиента" : "Заявка на партнёрство"}
              </div>
              <p className={`mt-2 text-sm leading-relaxed ${mutedTextClass}`}>
                {isClientMode
                  ? "Заполните данные партнёра и клиента. Заявка сразу уйдёт менеджеру в Telegram."
                  : "Заполните форму, и заявка сразу уйдёт менеджеру в Telegram."}
              </p>
            </div>

            {isClientMode ? (
              <>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                  Партнёр
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Имя партнёра" labelClassName={labelClass}>
                    <Input required name="pname" placeholder="Иван" className={inputClass} />
                  </Field>
                  <Field label="Телефон партнёра" labelClassName={labelClass}>
                    <Input
                      required
                      type="tel"
                      name="pphone"
                      placeholder="+7 ___ ___-__-__"
                      className={inputClass}
                    />
                  </Field>
                </div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                  Клиент
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Имя клиента" labelClassName={labelClass}>
                    <Input required name="cname" placeholder="Алексей" className={inputClass} />
                  </Field>
                  <Field label="Телефон клиента" labelClassName={labelClass}>
                    <Input
                      required
                      type="tel"
                      name="cphone"
                      placeholder="+7 ___ ___-__-__"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Город клиента" labelClassName={labelClass}>
                    <Input required name="ccity" placeholder="Москва" className={inputClass} />
                  </Field>
                  <Field label="Сумма долга" labelClassName={labelClass}>
                    <Input name="debt" placeholder="Например, 500 000 ₽" className={inputClass} />
                  </Field>
                </div>
              </>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Имя" labelClassName={labelClass}>
                  <Input required name="name" placeholder="Иван" className={inputClass} />
                </Field>
                <Field label="Телефон" labelClassName={labelClass}>
                  <Input
                    required
                    type="tel"
                    name="phone"
                    placeholder="+7 ___ ___-__-__"
                    className={inputClass}
                  />
                </Field>
                <Field label="Город" labelClassName={labelClass}>
                  <Input required name="city" placeholder="Москва" className={inputClass} />
                </Field>
                <Field label="Сфера деятельности" labelClassName={labelClass}>
                  <Input
                    required
                    name="field"
                    placeholder="Например, риелтор"
                    className={inputClass}
                  />
                </Field>
              </div>
            )}

            {!isClientMode ? (
              <>
                <Field label="Есть ли уже потенциальные клиенты" labelClassName={labelClass}>
                  <Select name="hasClients">
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="Выберите" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Да</SelectItem>
                      <SelectItem value="no">Нет</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field
                  label="Сколько заявок примерно можете передавать в месяц"
                  labelClassName={labelClass}
                >
                  <Input name="volume" placeholder="Например, 5–10" className={inputClass} />
                </Field>
              </>
            ) : null}

            <Field label="Удобный способ связи" labelClassName={labelClass}>
              <RadioGroup
                value={channel}
                onValueChange={setChannel}
                className="flex flex-wrap gap-4 pt-1"
              >
                {[
                  ["telegram", "Telegram"],
                  ["call", "Звонок"],
                ].map(([v, l]) => (
                  <label
                    key={v}
                    className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm font-medium ${
                      isClientMode
                        ? "border-white/35 bg-white text-[#112033]"
                        : "border-primary/15 bg-[#f4f8ff] text-[#112033]"
                    }`}
                  >
                    <RadioGroupItem value={v} /> {l}
                  </label>
                ))}
              </RadioGroup>
            </Field>
            <Field
              label={isClientMode ? "Комментарий по ситуации" : "Комментарий"}
              labelClassName={labelClass}
            >
              <Textarea
                name="comment"
                rows={3}
                placeholder={
                  isClientMode
                    ? "Коротко опишите ситуацию клиента"
                    : "Расскажите о себе или задайте вопрос"
                }
                className={textareaClass}
              />
            </Field>
            <label
              className={`flex cursor-pointer items-start gap-3 font-sans text-sm leading-relaxed ${
                isClientMode ? "text-white/80" : "text-muted-foreground"
              }`}
            >
              <Checkbox
                checked={agree}
                onCheckedChange={(v) => {
                  setAgree(!!v);
                  if (v) setError("");
                }}
                className="mt-0.5 h-5 w-5 shrink-0 rounded-full border-primary/70 bg-white"
              />
              <span>
                Я даю согласие на обработку{" "}
                <a
                  href="/personal-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  персональных данных
                </a>{" "}
                и принимаю{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline">
                  политику конфиденциальности
                </a>
                .
              </span>
            </label>
            <Button
              type="submit"
              variant="default"
              size="lg"
              className={`h-14 w-full rounded-full text-base font-semibold ${
                isClientMode
                  ? "bg-white text-primary hover:bg-white/90"
                  : "bg-primary text-white hover:bg-primary/90"
              }`}
              disabled={loading}
            >
              {loading ? "Отправка..." : isClientMode ? "Передать клиента" : "Отправить заявку"}
            </Button>
            {error ? (
              <p
                className={`font-sans text-sm ${isClientMode ? "text-white" : "text-destructive"}`}
              >
                {error}
              </p>
            ) : null}
          </form>
        </div>
      </div>
      <SuccessDialog
        open={open}
        onOpenChange={setOpen}
        title={isClientMode ? "Спасибо! Заявка клиента передана" : "Спасибо! Заявка отправлена"}
        description={
          isClientMode
            ? "Мы свяжемся с клиентом в ближайшее время и держим вас в курсе."
            : "Специалист по партнёрской программе свяжется с вами."
        }
      />
    </section>
  );
}

function Field({
  label,
  children,
  labelClassName = "text-[#0088df]",
}: {
  label: string;
  children: React.ReactNode;
  labelClassName?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className={`font-sans text-sm font-semibold ${labelClassName}`}>{label}</Label>
      {children}
    </div>
  );
}

function SuccessDialog({
  open,
  onOpenChange,
  title,
  description,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md text-center">
        <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-center font-display text-2xl">{title}</DialogTitle>
          <DialogDescription className="pt-1 text-center text-base font-sans">
            {description}
          </DialogDescription>
        </DialogHeader>
        <Button onClick={() => onOpenChange(false)} variant="gold" className="mt-2">
          Хорошо
        </Button>
      </DialogContent>
    </Dialog>
  );
}
