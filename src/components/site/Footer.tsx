import { Link } from "@tanstack/react-router";
import { Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container mx-auto px-4 lg:px-8 py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Scale className="h-5 w-5" />
              </div>
              <span className="font-display font-bold">ООО «Юридический Партнёр»</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Федеральная юридическая компания. Сопровождение процедуры банкротства физических лиц и партнёрская программа.
            </p>
            <div className="mt-5 space-y-1 text-xs text-muted-foreground">
              <div>ИНН: 0000000000</div>
              <div>ОГРН: 0000000000000</div>
              <div>Юридический адрес: г. Москва, ул. Примерная, д. 1, оф. 1</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Документы</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-foreground">Политика конфиденциальности</Link></li>
              <li><Link to="/personal-data" className="hover:text-foreground">Согласие на обработку ПДн</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground">Пользовательское соглашение</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Партнёрам</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/#partner-form" className="hover:text-foreground">Стать партнёром</a></li>
              <li><a href="/#client-form" className="hover:text-foreground">Передать клиента</a></li>
              <li><a href="/#faq" className="hover:text-foreground">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-border space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            <span className="font-semibold text-foreground">Cookies:</span> используя сайт, вы соглашаетесь с использованием cookie-файлов для улучшения работы сервиса.
          </p>
          <p>
            <span className="font-semibold text-foreground">Дисклеймер:</span> результат по делу клиента зависит от его индивидуальной ситуации. Компания не гарантирует списание всех долгов и не призывает не исполнять денежные обязательства. Информация на сайте не является публичной офертой.
          </p>
          <p>© {new Date().getFullYear()} ООО «Юридический Партнёр». Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
