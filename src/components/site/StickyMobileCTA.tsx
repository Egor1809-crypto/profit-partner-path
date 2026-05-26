import { Button } from "@/components/ui/button";

export function StickyMobileCTA() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur border-t border-border">
      <Button asChild variant="gold" size="lg" className="w-full">
        <a href="#partner-form">Стать партнёром</a>
      </Button>
    </div>
  );
}
