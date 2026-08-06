import Link from "next/link";
import { Logo } from "./logo";
import { InstagramIcon, WhatsappIcon } from "./icons";
import { MAIN_NAV, FAMILY_LABELS } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import { BUSINESS } from "@/lib/business";
import type { SiteSettings } from "@/lib/types";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo variant="stacked" className="items-start" />
          <p className="max-w-xs text-sm text-muted">
            Perfumaria de alto padrão. Fragrâncias selecionadas, alta fixação e
            atendimento próximo.
          </p>
          <div className="flex gap-2">
            <a
              href={whatsappLink(
                settings.whatsapp_number,
                "Olá THPARFUMS! Vim pelo site.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-silver hover:text-foreground"
            >
              <WhatsappIcon className="h-4 w-4" />
            </a>
            {settings.instagram_url && (
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-silver hover:text-foreground"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <FooterCol title="Navegação">
          {MAIN_NAV.map((i) => (
            <FooterLink key={i.href} href={i.href}>
              {i.label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Famílias">
          {Object.entries(FAMILY_LABELS).map(([key, label]) => (
            <FooterLink key={key} href={`/perfumes?familia=${key}`}>
              {label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Contato">
          <a
            href={whatsappLink(
              settings.whatsapp_number,
              "Olá THPARFUMS! Vim pelo site.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            WhatsApp: {BUSINESS.phoneDisplay}
          </a>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            {BUSINESS.email}
          </a>
          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            {BUSINESS.address}, {BUSINESS.city}
          </a>
          <span className="text-sm text-muted">{BUSINESS.hours}</span>
        </FooterCol>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-faint md:flex-row">
          <span>
            © {new Date().getFullYear()} THPARFUMS. Todos os direitos reservados.
          </span>
          <span>Site 100% seguro · Trocas em até 7 dias</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="eyebrow">{title}</h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-muted transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}
