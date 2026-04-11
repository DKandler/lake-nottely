/**
 * Cloudinary configuration and next/image loader.
 *
 * Every <Image> that uses `loader={cloudinaryLoader}` gets automatic srcSet —
 * the browser picks the best width for the viewport and pixel density.
 *
 * Usage:
 *   <Image loader={cloudinaryLoader} src="photo-02" width={1200} height={800}
 *          sizes="(max-width: 768px) 100vw, 50vw" alt="…" />
 *
 * `src` is just the Cloudinary public ID (no folder, no extension).
 */

const CLOUD = "dc6g4e3kf";
const FOLDER = "lake-nottely-stays/chanterelle-shores";

export const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUD}/image/upload`;

/** next/image-compatible loader — called once per srcSet entry. */
export function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const q = quality ?? 75;
  return `${CLOUDINARY_BASE}/w_${width},c_fill,q_${q},f_auto/${FOLDER}/${src}.jpg`;
}

/** Build a URL for a specific width (for non-next/image use cases). */
export function cldUrl(publicId: string, width: number, height?: number) {
  const dims = height ? `w_${width},h_${height}` : `w_${width}`;
  return `${CLOUDINARY_BASE}/${dims},c_fill,q_auto,f_auto/${FOLDER}/${publicId}.jpg`;
}
