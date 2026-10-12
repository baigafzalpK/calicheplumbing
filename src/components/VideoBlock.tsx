import type { Video } from "@/content/videos";
import { site } from "@/content/site";
import { JsonLd } from "./ui";

// Click-to-play clip: preload="none" + poster keeps it off the critical path (no LCP/CLS cost).
export function VideoBlock({ video, className = "" }: { video: Video; className?: string }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: `${site.url}${video.poster}`,
    contentUrl: `${site.url}${video.src}`,
    uploadDate: video.uploaded,
    duration: `PT${video.duration}S`,
  };
  return (
    <figure className={className}>
      <JsonLd data={ld} />
      <video
        controls
        muted
        playsInline
        preload="none"
        poster={video.poster}
        width={1280}
        height={720}
        className="aspect-video w-full rounded-2xl bg-ink object-cover ring-1 ring-line"
        aria-label={video.title}
      >
        <source src={video.src} type="video/mp4" />
      </video>
      <figcaption className="mt-2 text-sm text-muted">
        <span className="font-semibold text-ink">{video.title}.</span> {video.description} <span className="text-xs">(Illustrative AI-generated clip, no sound.)</span>
      </figcaption>
    </figure>
  );
}
