"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "./button";

/**
 * Submit button that auto-disables and shows a pending label while the parent
 * form's server action runs. Place inside a <form action={serverAction}>.
 */
export function SubmitButton({
  children,
  pendingText = "Salvando...",
  ...props
}: ButtonProps & { pendingText?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} aria-busy={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
}
