/**
 * Optimizes a Cloudinary image URL by injecting transformation parameters.
 * Converts to WebP, applies quality auto, and resizes to the requested width.
 * Falls back to the original URL for non-Cloudinary images.
 */
export function optimizeImage(url: string, width?: number, quality = "auto:good"): string {
  if (!url || !url.includes("res.cloudinary.com")) return url;

  // Already has transformations — replace them
  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return url;

  const base = url.slice(0, uploadIndex + 8); // includes "/upload/"
  const rest = url.slice(uploadIndex + 8);

  // Remove existing transformation segment if present (starts with letters like f_, q_, w_, etc.)
  const cleanRest = rest.replace(/^[^/]+\//, (seg) =>
    /^[a-z_,]+/.test(seg) ? "" : seg
  );

  const transforms: string[] = [
    "f_auto",       // Auto format (WebP for Chrome, AVIF for supported browsers)
    `q_${quality}`, // Auto quality
  ];
  if (width) transforms.push(`w_${width}`, "c_limit");

  return `${base}${transforms.join(",")}/${cleanRest}`;
}

/**
 * Generates a low-quality placeholder URL for blur-up loading effect.
 */
export function placeholderImage(url: string): string {
  return optimizeImage(url, 20, "10");
}
