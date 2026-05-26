import { useState } from "react";
import { Menu, X, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#for-whom", label: "Для кого" },
  { href: "#income", label: "Доход" },
  { href: "#how", label: "Как работает" },
  { href: "#clients", label: "Кого передавать" },
  { href: "#tools", label: "Инструменты" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <a href="#top" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Scale className="h-5 w-5" />
          </div>
          <span className="font-display text-base font-bold leading-tight">
            Партнёрская<br className="hidden sm:inline" /><span className="text-muted-foreground font-medium"> программа</span>
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button asChild variant="gold" size="sm">
            <a href="#partner-form">Стать партнёром</a>
          </Button>
        </div>
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Меню">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container mx-auto flex flex-col px-4 py-4 gap-3">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium py-2">{l.label}</a>
            ))}
            <Button asChild variant="gold" className="mt-2"><a href="#partner-form" onClick={() => setOpen(false)}>Стать партнёром</a></Button>
          </nav>
        </div>
      )}
    </header>
  );
}
