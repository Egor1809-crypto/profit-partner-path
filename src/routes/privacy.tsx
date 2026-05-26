import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Политика конфиденциальности" }, { name: "description", content: "Политика конфиденциальности и обработки персональных данных." }] }),
  component: Privacy,
});

function Privacy() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← На главную</Link>
      <h1 className="font-display text-4xl font-bold mt-6 mb-6">Политика конфиденциальности</h1>
      <div className="prose prose-sm max-w-none space-y-4 text-foreground/85 leading-relaxed">
        <p>Настоящая Политика описывает порядок обработки персональных данных пользователей сайта.</p>
        <h2 className="font-display text-xl font-bold mt-8">1. Общие положения</h2>
        <p>Оператором персональных данных является ООО «Юридический Партнёр». Используя сайт и отправляя формы, вы выражаете согласие с условиями настоящей Политики.</p>
        <h2 className="font-display text-xl font-bold mt-8">2. Состав обрабатываемых данных</h2>
        <p>Имя, телефон, email, город, сфера деятельности, комментарий, а также сведения о клиенте, которые партнёр передаёт через форму «Передать клиента».</p>
        <h2 className="font-display text-xl font-bold mt-8">3. Цели обработки</h2>
        <p>Связь с пользователем, обработка заявок, исполнение договорных обязательств, информирование о программе.</p>
        <h2 className="font-display text-xl font-bold mt-8">4. Передача данных</h2>
        <p>Персональные данные не передаются третьим лицам, за исключением случаев, предусмотренных законодательством РФ.</p>
        <h2 className="font-display text-xl font-bold mt-8">5. Контакты</h2>
        <p>По вопросам обработки данных: partner@example.ru</p>
        <p className="text-xs text-muted-foreground pt-8">* Текст демонстрационный. Замените его на согласованную юристами компании редакцию.</p>
      </div>
    </article>
  );
}
