/**
 * Unsplash / image URL optimizer.
 *
 * Appends size, quality, and format params to Unsplash CDN URLs.
 * Non-Unsplash URLs are returned unchanged.
 *
 * Use `optimizeImage(url)` everywhere an image src is set
 * to reduce file size without visible quality loss.
 */

const UNSPLASH_HOST = "images.unsplash.com";

export interface OptimizeOptions {
  /** Max width in px (default 1200 for heroes, 600 for cards) */
  width?: number;
  /** JPEG/WebP quality 1–100 (default 75) */
  quality?: number;
  /** Format: "auto" lets CDN pick best (webp when supported) */
  format?: "auto" | "webp" | "jpg";
}

/**
 * Optimize an Unsplash image URL for faster loading.
 * Replaces existing w= and q= params, adds fm=webp & auto=format.
 */
export function optimizeImage(
  url: string | undefined,
  opts: OptimizeOptions = {}
): string {
  if (!url) return "";
  try {
    const u = new URL(url);
    if (!u.hostname.includes(UNSPLASH_HOST)) return url;

    const { width = 1200, quality = 75, format = "auto" } = opts;

    // Set sizing — replace existing w param
    u.searchParams.set("w", String(width));
    // Quality
    u.searchParams.set("q", String(quality));
    // Format
    if (format === "auto") {
      u.searchParams.set("auto", "format");
      u.searchParams.delete("fm"); // let CDN decide
    } else {
      u.searchParams.set("fm", format);
      u.searchParams.delete("auto");
    }

    return u.toString();
  } catch {
    return url;
  }
}

/** Hero-sized image (1200px wide, quality 75) */
export function heroImage(url: string | undefined): string {
  return optimizeImage(url, { width: 1200, quality: 75 });
}

/** Card/thumbnail image (600px wide, quality 70) */
export function cardImage(url: string | undefined): string {
  return optimizeImage(url, { width: 600, quality: 70 });
}

/** Small thumbnail (400px wide, quality 65) */
export function thumbImage(url: string | undefined): string {
  return optimizeImage(url, { width: 400, quality: 65 });
}
