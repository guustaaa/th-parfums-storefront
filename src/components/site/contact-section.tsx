import { Clock, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "./icons";
import { BUSINESS } from "@/lib/business";
import { whatsappLink } from "@/lib/whatsapp";

/** "Visite e fale conosco" — pre-footer contact band, used on every page. */
export function ContactSection({
  whatsappNumber,
}: {
  whatsappNumber: string;
}) {
  return (
    <section className="border-t border-border bg-bg">
      <div className="container-page grid gap-8 py-16 md:grid-cols-2 md:py-20">
        <div className="space-y-5">
          <p className="eyebrow">Visite ou fale conosco</p>
          <h2 className="font-display text-3xl">Onde nos encontrar</h2>
          <ul className="space-y-4">
            <InfoRow icon={<MapPin className="h-5 w-5" />}>
              {BUSINESS.address}
              <br />
              {BUSINESS.city} · CEP {BUSINESS.cep}
            </InfoRow>
            <InfoRow icon={<Clock className="h-5 w-5" />}>
              {BUSINESS.hours}
            </InfoRow>
            <InfoRow icon={<Mail className="h-5 w-5" />}>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="hover:text-foreground"
              >
                {BUSINESS.email}
              </a>
            </InfoRow>
            <InfoRow icon={<WhatsappIcon className="h-5 w-5" />}>
              {BUSINESS.phoneDisplay}
            </InfoRow>
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={whatsappLink(
                whatsappNumber,
                "Olá TH Parfums! Vim pelo site e gostaria de uma consultoria.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="lg">
                <WhatsappIcon className="h-5 w-5" /> Falar no WhatsApp
              </Button>
            </a>
            <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                Ver no mapa
              </Button>
            </a>
          </div>
        </div>

        <div className="relative min-h-72 overflow-hidden rounded-[var(--radius-card)] border border-border md:h-full">
          <iframe
            src={BUSINESS.mapsEmbedUrl}
            title={`Mapa — ${BUSINESS.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            style={{ filter: "grayscale(0.35) contrast(1.05) brightness(0.92)" }}
          />
          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-border-strong bg-bg/85 px-4 py-2 text-sm backdrop-blur-md transition-colors hover:border-silver"
          >
            <MapPin className="h-4 w-4 text-silver" /> Abrir no Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3 text-sm text-muted">
      <span className="mt-0.5 text-silver">{icon}</span>
      <span>{children}</span>
    </li>
  );
}
