import { Button } from "@/components/ui/button";

const leftLinks = [
  { href: "#services", label: "Услуги" },
  { href: "#about", label: "О компании" },
  { href: "#geography", label: "Офисы" },
];

const rightLinks = [
  { href: "#webinars", label: "Вебинары" },
  { href: "#platforms", label: "Платформы" },
  { href: "#contacts", label: "Контакты" },
];

const navLinks = [...leftLinks, ...rightLinks];

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 text-primary">
      <div className="border-t border-primary/15 bg-[#d9ecff]/85 px-4 py-4 shadow-[0_8px_22px_rgb(29_85_136_/_0.05)] backdrop-blur-sm lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-8">
          <a
            href="#top"
            className="block shrink-0 -translate-y-[1px] text-center leading-none"
            aria-label="ASPB Partners, на главную"
          >
            <span className="block font-display text-4xl font-semibold tracking-[-0.08em] lg:text-[3.55rem]">
              ASPB
            </span>
            <span className="mt-1 block text-xs font-medium uppercase tracking-[0.18em] text-primary/70">
              Partners
            </span>
          </a>

          <nav className="ml-auto flex flex-1 items-center justify-end gap-8 whitespace-nowrap text-[0.8rem] font-semibold uppercase tracking-[0.13em] text-primary/80 lg:gap-10 lg:text-[0.88rem]">
            <div className="hidden items-center gap-8 lg:flex lg:gap-10">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="transition-opacity hover:opacity-60">
                  {link.label}
                </a>
              ))}
            </div>
            <Button
              asChild
              variant="outline"
              className="h-11 shrink-0 border-primary/15 bg-white/70 px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary shadow-sm hover:bg-white/90 hover:text-primary lg:h-12 lg:px-7"
            >
              <a href="#req-partner">Стать партнёром</a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
