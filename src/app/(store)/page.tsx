import { Hero } from "@/components/site/hero";
import { SectionHeading } from "@/components/site/section-heading";
import { FamilyGrid } from "@/components/site/family-grid";
import { BrandStory } from "@/components/site/brand-story";
import { TrustBar } from "@/components/site/trust-bar";
import { FeatureBanner } from "@/components/site/feature-banner";
import { ProductRail } from "@/components/product/product-rail";
import { getFeatured, getNewArrivals } from "@/lib/products";
import { getSettings } from "@/lib/settings";

export default async function HomePage() {
  const [settings, featuredMasc, featuredFem, novidades] = await Promise.all([
    getSettings(),
    getFeatured("masc"),
    getFeatured("fem"),
    getNewArrivals(),
  ]);

  const spotlight = featuredMasc[0] ?? featuredFem[0] ?? novidades[0] ?? null;

  return (
    <>
      <Hero settings={settings} spotlight={spotlight} />

      <TrustBar />

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Para eles"
          title="Destaques masculinos"
          href="/perfumes?genero=masc"
        />
        <ProductRail products={featuredMasc.slice(0, 4)} />
      </section>

      <FeatureBanner
        eyebrow="Alto luxo da perfumaria"
        title="Fragrâncias que definem presença"
        text="Uma curadoria de perfumes encorpados, de alta fixação e personalidade marcante. Descubra a sua assinatura olfativa."
        ctaLabel="Ver coleção completa"
        href="/perfumes"
        image="/brand/brand-mockups.jpg"
      />

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Sua nota preferida"
          title="Explore por família olfativa"
        />
        <FamilyGrid />
      </section>

      <section className="container-page pb-16 md:pb-20">
        <SectionHeading
          eyebrow="Para elas"
          title="Destaques femininos"
          href="/perfumes?genero=fem"
        />
        <ProductRail products={featuredFem.slice(0, 4)} />
      </section>

      <BrandStory />

      <FeatureBanner
        eyebrow="Atendimento personalizado"
        title="Não sabe qual escolher?"
        text="Conte o que você gosta e nossa equipe indica a fragrância certa para o seu estilo, pelo WhatsApp."
        ctaLabel="Falar com um especialista"
        href="/perfumes"
        align="right"
      />

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Recém-chegados"
          title="Lançamentos"
          href="/perfumes?ordenar=novidades"
        />
        <ProductRail products={novidades.slice(0, 4)} />
      </section>
    </>
  );
}
