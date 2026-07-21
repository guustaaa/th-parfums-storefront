"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

/**
 * Renders a form bound to a server action, but routes the destructive submit
 * through an on-brand confirmation modal so a single misclick can't delete.
 */
export function ConfirmDeleteButton({
  action,
  hidden,
  title,
  message,
  confirmLabel = "Excluir",
  triggerLabel,
  triggerClassName,
  triggerChildren,
  formClassName,
}: {
  action: (formData: FormData) => void | Promise<void>;
  hidden: Record<string, string>;
  title: string;
  message: string;
  confirmLabel?: string;
  triggerLabel: string;
  triggerClassName?: string;
  triggerChildren: React.ReactNode;
  formClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <form ref={formRef} action={action} className={formClassName}>
        {Object.entries(hidden).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}
        <button
          type="button"
          aria-label={triggerLabel}
          onClick={() => setOpen(true)}
          className={triggerClassName}
        >
          {triggerChildren}
        </button>
      </form>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          />
          <div
            className={cn(
              "relative w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-2xl",
              "animate-rise",
            )}
          >
            <h3 className="font-display text-xl text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-muted">{message}</p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setOpen(false);
                  formRef.current?.requestSubmit();
                }}
              >
                {confirmLabel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
