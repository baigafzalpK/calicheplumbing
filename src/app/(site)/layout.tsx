import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { site } from "@/content/site";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <MobileActionBar phone={site.phone} e164={site.phoneE164} />
    </>
  );
}
