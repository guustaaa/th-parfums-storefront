import { SubmitButton } from "@/components/ui/submit-button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { getSettings } from "@/lib/settings";
import { saveSettingsAction } from "../actions";

export const dynamic = "force-dynamic";

const centsToReais = (c: number) => (c / 100).toFixed(2).replace(".", ",");

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const [settings, sp] = await Promise.all([getSettings(), searchParams]);

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-2xl">Configurações da loja</h1>

      {sp.ok && (
        <p className="rounded-lg border border-success/30 bg-success/10 px-4 py-2 text-sm text-green-300">
          Configurações salvas.
        </p>
      )}

      <form action={saveSettingsAction} className="space-y-5">
        <Field
          label="WhatsApp (com DDI/DDD)"
          htmlFor="whatsapp_number"
          hint="Somente números, ex.: 5511999998888"
        >
          <Input
            id="whatsapp_number"
            name="whatsapp_number"
            defaultValue={settings.whatsapp_number}
          />
        </Field>
        <Field label="Título do hero" htmlFor="hero_title">
          <Input
            id="hero_title"
            name="hero_title"
            defaultValue={settings.hero_title}
          />
        </Field>
        <Field label="Subtítulo do hero" htmlFor="hero_subtitle">
          <Textarea
            id="hero_subtitle"
            name="hero_subtitle"
            defaultValue={settings.hero_subtitle}
          />
        </Field>
        <Field label="Texto da barra de aviso" htmlFor="announcement_text">
          <Input
            id="announcement_text"
            name="announcement_text"
            defaultValue={settings.announcement_text}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Frete grátis a partir de (R$)" htmlFor="free_shipping_threshold">
            <Input
              id="free_shipping_threshold"
              name="free_shipping_threshold"
              inputMode="decimal"
              defaultValue={centsToReais(settings.free_shipping_threshold_cents)}
            />
          </Field>
          <Field label="Instagram (URL)" htmlFor="instagram_url">
            <Input
              id="instagram_url"
              name="instagram_url"
              defaultValue={settings.instagram_url ?? ""}
            />
          </Field>
        </div>
        <div className="border-t border-border pt-5">
          <SubmitButton variant="metallic" size="lg">
            Salvar configurações
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
