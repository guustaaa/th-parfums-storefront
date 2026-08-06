import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Wide full-bleed promo panel between product sections. Image bleeds edge to
 * edge with a side gradient so text stays legible.
 */
export function FeatureBanner({
  eyebrow,
  title,
  text,
  ctaLabel,
  href,
  image,
  align = "left",
  priority = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  ctaLabel: string;
  href: string;
  image?: string;
  align?: "left" | "right";
  priority?: boolean;
}) {
  return (
    <section className="container-page">
      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-border">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 1340px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(120%_140%_at_85%_0%,#2c2c36_0%,#15151b_55%)]" />
        )}
        <div
          className={
            align === "left"
              ? "absolute inset-0 bg-gradient-to-r from-bg/92 via-bg/75 to-bg/15"
              : "absolute inset-0 bg-gradient-to-l from-bg/92 via-bg/75 to-bg/15"
          }
        />
        <div
          className={
            "relative flex min-h-[20rem] flex-col justify-center gap-4 p-8 md:min-h-[24rem] md:p-14 " +
            (align === "right" ? "items-end text-right md:ml-auto" : "")
          }
        >
          <div className="max-w-md space-y-4">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              <span className="text-metallic">{title}</span>
            </h2>
            <p className="text-sm text-muted md:text-base">{text}</p>
            <Link href={href} className="inline-block">
              <Button variant="metallic" size="lg">
                {ctaLabel}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
