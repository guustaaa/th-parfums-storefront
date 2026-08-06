import { AnnouncementBar } from "@/components/site/announcement-bar";
import { SiteHeader } from "@/components/site/site-header";
import { ContactSection } from "@/components/site/contact-section";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsappFab } from "@/components/site/whatsapp-fab";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { getSettings } from "@/lib/settings";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  return (
    <>
      <AnnouncementBar text={settings.announcement_text} />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <ContactSection whatsappNumber={settings.whatsapp_number} />
      <SiteFooter settings={settings} />
      <WhatsappFab number={settings.whatsapp_number} />
      <CartDrawer
        whatsappNumber={settings.whatsapp_number}
        freeShippingThresholdCents={settings.free_shipping_threshold_cents}
      />
    </>
  );
}
