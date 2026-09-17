"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

// Embeds Sanity Studio at /studio inside this same Next.js app — one
// deploy, one domain, no separate Studio hosting to manage.
export default function StudioPage() {
  return <NextStudio config={config} />;
}
