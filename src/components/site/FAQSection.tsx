import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeader } from "./ForWhomSection";

const faq = [
  { q: "Нужно ли быть юристом, чтобы стать партнёром?", a: "Нет. Юридическую работу полностью выполняют наши специалисты. Ваша задача — передать контакт клиента." },
  { q: "Кого можно передавать?", a: "Людей с кредитами, микрозаймами, просрочками, исполнительными производствами, арестами счетов или долгами по ЖКХ и налогам." },
  { q: "Когда я получу вознаграждение?", a: "Выплата производится после того, как клиент заключит договор с компанией и оплатит услуги." },
  { q: "Можно ли работать из другого региона?", a: "Да. Программа работает удалённо — передавать заявки можно из любого региона России." },
  { q: "Что я должен говорить клиенту?", a: "Достаточно сообщить, что есть юридическая компания, которая бесплатно проконсультирует по долговой ситуации. Подробные скрипты мы предоставляем." },
  { q: "Можно ли рекламировать услугу?", a: "Да, но только корректными формулировками. Запрещено обещать гарантированное списание долгов или призывать не платить кредиторам." },
  { q: "Что будет, если клиент не подходит под банкротство?", a: "Юрист проведёт первичную оценку и предложит клиенту другие законные варианты решения долговой ситуации." },
  { q: "Будет ли обратная связь по заявкам?", a: "Да. По каждой заявке вы получаете статус: в работе, заключён договор, отказ и причина." },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-surface">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <SectionHeader eyebrow="FAQ" title="Частые вопросы партнёров" />
        <Accordion type="single" collapsible className="space-y-3">
          {faq.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-xl bg-card px-5">
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
