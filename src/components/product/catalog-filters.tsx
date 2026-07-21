"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterChip {
  label: string;
  href: string;
  active: boolean;
}
export interface FilterGroup {
  key: string;
  label: string;
  chips: FilterChip[];
}

function Chip({ chip, onClick }: { chip: FilterChip; onClick?: () => void }) {
  return (
    <Link
      href={chip.href}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-all duration-200",
        chip.active
          ? "border-silver bg-surface-2 text-foreground"
          : "border-border text-muted hover:border-border-strong hover:text-foreground",
      )}
    >
      {chip.label}
    </Link>
  );
}

function Rows({
  groups,
  onNavigate,
}: {
  groups: FilterGroup[];
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-4">
      {groups.map((g) => (
        <div key={g.key} className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1">{g.label}</span>
          {g.chips.map((c) => (
            <Chip key={`${c.href}-${c.label}`} chip={c} onClick={onNavigate} />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Inline filter rows on desktop; a "Filtros" bottom-sheet on mobile. */
export function CatalogFilters({
  groups,
  activeCount,
}: {
  groups: FilterGroup[];
  activeCount: number;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="hidden md:block">
        <Rows groups={groups} />
      </div>

      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between rounded-full border border-border-strong px-5 py-3 text-sm text-foreground"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" /> Filtros
          </span>
          {activeCount > 0 && (
            <span className="rounded-full bg-[linear-gradient(180deg,#f0f0f0,#bdbdbd)] px-2 py-0.5 text-xs font-semibold text-bg">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      <div
        className={cn("fixed inset-0 z-50 md:hidden", open ? "" : "pointer-events-none")}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filtros"
          className={cn(
            "absolute inset-x-0 bottom-0 max-h-[80dvh] overflow-y-auto rounded-t-2xl border-t border-border bg-bg p-5 transition-transform duration-300",
            open ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-lg">Filtros</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar filtros"
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-surface"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <Rows groups={groups} onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </>
  );
}
