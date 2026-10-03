import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";

export function LogoMark({ className = "h-9 w-9" }: { className?: string; light?: boolean }) {
  return (
    <Image
      src="/brand/icon.png"
      alt={`${site.name} emblem`}
      width={128}
      height={128}
      className={`${className} object-contain`}
    />
  );
}

export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  if (light) {
    return (
      <Link href="/" className={`inline-block shrink-0 ${className}`} aria-label={`${site.name} home`}>
        <div className="inline-flex items-center rounded-lg bg-white/95 px-3 py-1.5 shadow-sm transition-opacity hover:opacity-90">
          <Image
            src="/brand/logo.png"
            alt={site.name}
            width={970}
            height={345}
            className="h-9 w-auto object-contain"
          />
        </div>
      </Link>
    );
  }

  return (
    <Link href="/" className={`flex shrink-0 items-center ${className}`} aria-label={`${site.name} home`}>
      <Image
        src="/brand/logo.png"
        alt={site.name}
        width={970}
        height={345}
        priority
        className="h-11 sm:h-12 w-auto object-contain"
      />
    </Link>
  );
}
