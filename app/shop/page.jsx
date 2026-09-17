import { getAllProducts } from "@/lib/shopify";
import { categories, colours } from "@/data/products";
import ShopClient from "./ShopClient";

// Product data (price/inventory) can change in Shopify independently of
// a site deploy, so this renders per-request rather than being baked in
// at build time — the underlying fetch is still cached for 60s (see
// lib/shopify.js) to avoid hammering the Storefront API.
export const dynamic = "force-dynamic";

// Server component: fetches the live Shopify catalog, then hands it to
// the client component that owns the grid/filter interactivity.
export default async function Shop() {
  const products = await getAllProducts();
  return <ShopClient products={products} categories={categories} colours={colours} />;
}
