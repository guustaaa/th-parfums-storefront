import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrandStory } from "@/components/site/brand-story";
import { Logo } from "@/components/site/logo";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "A TH Parfums é uma perfumaria de alto padrão: importados 100% originais, árabes, designers e nicho, com consultoria personalizada.",
};

export default function SobrePage() {
  return (
    <div>
      <section className="container-page py-16 text-center md:py-24">
        <Logo variant="stacked" className="mx-auto" wordClassName="text-xl" />
        <h1 className="mx-auto mt-8 max-w-2xl font-display text-3xl leading-tight md:text-5xl">
          <span className="text-metallic">
            Perfume é assinatura. A sua merece o melhor.
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-muted">
          Trabalhamos com perfumes <strong>importados 100% originais</strong> —
          árabes, designers e nicho — com consultoria personalizada para você
          encontrar a sua identidade olfativa com confiança.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/perfumes">
            <Button variant="metallic" size="lg">
              Conhecer a coleção
            </Button>
          </Link>
        </div>
      </section>

      <BrandStory />
    </div>
  );
}
