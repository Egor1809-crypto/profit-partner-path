import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/personal-data")({
  head: () => ({ meta: [{ title: "Согласие на обработку персональных данных" }] }),
  component: PD,
});

function PD() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← На главную</Link>
      <h1 className="font-display text-4xl font-bold mt-6 mb-6">Согласие на обработку персональных данных</h1>
      <div className="space-y-4 text-foreground/85 leading-relaxed text-sm">
        <p>Оставляя заявку на сайте, я даю согласие ООО «Юридический Партнёр» (далее — Оператор) на обработку моих персональных данных в соответствии с ФЗ-152 «О персональных данных».</p>
        <p><b>Состав данных:</b> фамилия, имя, телефон, email, город, сфера деятельности, комментарий, иная информация, переданная через формы сайта.</p>
        <p><b>Цели обработки:</b> рассмотрение заявки, связь с пользователем, оказание услуг, исполнение договорных обязательств, информирование о партнёрской программе.</p>
        <p><b>Действия с данными:</b> сбор, запись, систематизация, накопление, хранение, уточнение, использование, блокирование, удаление, уничтожение.</p>
        <p><b>Срок согласия:</b> до момента его отзыва. Отзыв осуществляется письменным заявлением на partner@example.ru.</p>
        <p className="text-xs text-muted-foreground pt-8">* Текст демонстрационный. Перед публикацией согласуйте с юристами компании.</p>
      </div>
    </article>
  );
}
