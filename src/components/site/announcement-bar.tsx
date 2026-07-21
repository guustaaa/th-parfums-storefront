export function AnnouncementBar({ text }: { text: string }) {
  return (
    <div className="bg-surface-2 text-center">
      <p className="container-page py-2 text-xs uppercase tracking-[0.18em] text-muted">
        {text}
      </p>
    </div>
  );
}
