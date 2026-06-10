import { Link } from "@tanstack/react-router";
import { contacts } from "@/config/contacts";

const footerContacts = contacts.filter((contact) => ["Телефон", "Email"].includes(contact.label));

export function Footer() {
  return (
    <footer className="bg-primary py-12 text-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-10 border-b border-white/20 pb-10 md:grid-cols-[1fr_auto_auto_auto]">
          <div>
            <div className="font-display text-5xl font-semibold tracking-[-0.08em]">ASPB</div>
            <div className="text-sm uppercase tracking-[0.18em] text-white/65">Partners</div>
          </div>
          <nav className="space-y-3 text-sm">
            <a className="block hover:text-blue-100" href="#services">
              Услуги
            </a>
            <a className="block hover:text-blue-100" href="#about">
              О компании
            </a>
            <a className="block hover:text-blue-100" href="#blog">
              Блог
            </a>
            <a className="block hover:text-blue-100" href="#contacts">
              Контакты
            </a>
          </nav>
          <nav className="space-y-3 text-sm text-white/72">
            <Link to="/privacy" className="block hover:text-white">
              Политика конфиденциальности
            </Link>
            <Link to="/personal-data" className="block hover:text-white">
              Обработка персональных данных
            </Link>
            <a href="#req-partner" className="block hover:text-white">
              Оставить заявку
            </a>
          </nav>
          <div className="space-y-3 text-sm text-white/72">
            {footerContacts.map((contact) => (
              <a key={contact.label} href={contact.href} className="block hover:text-white">
                <span className="block text-xs uppercase tracking-[0.18em] text-white/45">
                  {contact.label}
                </span>
                <span className="mt-1 block">{contact.value}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-4 text-xs leading-relaxed text-white/58 md:grid-cols-[1fr_auto]">
          <p className="max-w-2xl">
            Результат по делу зависит от индивидуальной ситуации клиента. Информация на сайте не
            является публичной офертой и не гарантирует списание обязательств.
          </p>
          <p>© {new Date().getFullYear()} ASPB Partners</p>
        </div>
      </div>
    </footer>
  );
}
