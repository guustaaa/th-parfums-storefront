import { WhatsappIcon } from "./icons";
import { whatsappLink } from "@/lib/whatsapp";

export function WhatsappFab({ number }: { number: string }) {
  return (
    <a
      href={whatsappLink(number, "Olá THPARFUMS! Vim pelo site e gostaria de ajuda.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#1faa55] text-white shadow-lg shadow-black/40 transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <WhatsappIcon className="h-7 w-7" />
    </a>
  );
}
