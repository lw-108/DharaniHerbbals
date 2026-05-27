import * as React from "react";

/**
 * Demo YouTube Shorts video marquee.
 * The component scrolls one or more embedded Shorts horizontally using the Tailwind
 * `animate-marquee` animation defined in `tailwind.config.ts`.
 *
 * Props:
 * - `videoId` – YouTube Shorts video identifier (default demo ID).
 * - `width`    – Width of each iframe (default 300px).
 * - `height`   – Height of each iframe (default 170px).
 */
interface YoutubeMarqueeProps {
  videoId?: string;
  width?: string | number;
  height?: string | number;
}

export default function YoutubeMarquee({
  videoId = "dQw4w9WgXcQ", // demo short (replace with actual Shorts ID)
  width = 300,
  height = 170,
}: YoutubeMarqueeProps) {
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
  const iframeStyle = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  } as React.CSSProperties;

  return (
    <section className="relative py-6 bg-background">
      {/* Optional heading */}
      <h2 className="text-center text-2xl font-extrabold text-foreground mb-4">
        Discover the Difference – Shorts
      </h2>
      <div className="overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          <iframe
            src={src}
            title="YouTube Shorts"
            allow="autoplay; encrypted-media"
            style={iframeStyle}
            className="mr-8 rounded-xl"
          />
          {/* Duplicate for seamless looping */}
          <iframe
            src={src}
            title="YouTube Shorts duplicate"
            allow="autoplay; encrypted-media"
            style={iframeStyle}
            className="mr-8 rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
