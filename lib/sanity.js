import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { projectId, dataset, apiVersion } from "@/sanity/env";

// useCdn: false — pages already opt out of static generation (see each
// page's `export const dynamic = "force-dynamic"`), so every request is
// already live; skipping Sanity's CDN here avoids the ~60s staleness
// window it otherwise adds on top of that.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

// Central place every page/component asks for a Sanity image's URL, so
// image sizing/format policy (and the swap away from raw /public files
// that were loading slowly) lives in one spot.
export function urlFor(source) {
  return builder.image(source);
}

// Sized, auto-formatted URL for Next.js <Image>/<img> — width matches
// how big the image ever actually renders, not the multi-megabyte
// original, which is what made images slow before this was wired up.
export function imageUrl(source, width = 2000) {
  if (!source?.asset) return null;
  return builder.image(source).width(width).auto("format").url();
}

// Sanity file assets (video) resolve to a plain CDN URL from their
// asset reference — no transform pipeline like images get.
export function fileUrl(fileField) {
  const ref = fileField?.asset?._ref;
  if (!ref) return null;
  // file-<id>-<extension>
  const [, id, extension] = ref.split("-");
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
}

export async function sanityFetch(query, params = {}) {
  return client.fetch(query, params);
}
