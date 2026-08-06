import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "./icons";
import { whatsappLink } from "@/lib/whatsapp";
import { primaryImage } from "@/lib/format";
import type { Product, SiteSettings } from "@/lib/types";

export function Hero({
  settings,
  spotlight,
}: {
  settings: SiteSettings;
  spotlight?: Product | null;
}) {
  const img = spotlight ? primaryImage(spotlight) : null;
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="container-page grid items-center gap-8 py-14 md:grid-cols-2 md:py-24">
        <div className="animate-rise space-y-6">
          <p className="eyebrow">Perfumaria de alto padrão</p>
          <h1 className="font-display text-4xl leading-[1.05] md:text-6xl">
            <span className="text-metallic">{settings.hero_title}</span>
          </h1>
          <p className="max-w-md text-base text-muted md:text-lg">
            {settings.hero_subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/perfumes">
              <Button variant="metallic" size="lg" className="w-full sm:w-auto">
                Ver coleção
              </Button>
            </Link>
            <a
              href={whatsappLink(
                settings.whatsapp_number,
                "Olá THPARFUMS! Quero uma recomendação de fragrância.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <WhatsappIcon className="h-5 w-5" /> Recomende um perfume
              </Button>
            </a>
          </div>
          <div className="flex items-center gap-6 pt-2 text-xs text-muted">
            <span>★★★★★ Clientes satisfeitos</span>
            <span className="hidden sm:inline">Alta fixação garantida</span>
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl product-spotlight">
            {img && (
              <Image
                src={img}
                alt={spotlight?.name ?? "Perfume em destaque"}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-contain p-10"
              />
            )}
            {spotlight && (
              <Link
                href={`/perfumes/${spotlight.slug}`}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-border-strong bg-bg/70 px-5 py-2 text-sm backdrop-blur-md transition-colors hover:border-silver"
              >
                {spotlight.name}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
