import Link from "next/link";
import { PhoneLink } from "../PhoneLink";

export function MobileActionBar({ phone, e164, requestHref = "/request-service/" }: { phone: string; e164: string; requestHref?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-line bg-white p-2 lg:hidden">
      <PhoneLink phone={phone} e164={e164} label="Call now" location="mobile_bar" className="btn btn-primary w-full" />
      <Link href={requestHref} className="btn btn-secondary w-full">
        Request service
      </Link>
    </div>
  );
}
