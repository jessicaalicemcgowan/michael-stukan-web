import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN reads are fine for this site (no per-request personalization);
  // set NEXT_PUBLIC_SANITY_USE_CDN=false locally if you need to see
  // draft/unpublished edits immediately while authoring.
  useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN !== "false",
});
