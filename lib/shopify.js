// Minimal Shopify Storefront API client — hand-rolled with fetch rather
// than an SDK, per CLAUDE.md's "no unnecessary dependencies" rule. Reads
// only (product catalog, availability, price) — cart/checkout mutations
// are a separate, later piece of work once the read side is verified.
//
// Required env vars (see .env.local.example):
//   SHOPIFY_STORE_DOMAIN            e.g. michaelstukan-dev.myshopify.com
//   SHOPIFY_STOREFRONT_ACCESS_TOKEN a Storefront API token from a custom
//                                   app (Shopify Admin → Settings →
//                                   Apps and sales channels → Develop
//                                   apps). Public-safe, read-only scope.
const API_VERSION = "2025-01";

function endpoint() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  if (!domain) {
    throw new Error("SHOPIFY_STORE_DOMAIN is not set — see .env.local.example");
  }
  return `https://${domain}/api/${API_VERSION}/graphql.json`;
}

async function shopifyFetch({ query, variables }) {
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!token) {
    throw new Error("SHOPIFY_STOREFRONT_ACCESS_TOKEN is not set — see .env.local.example");
  }

  const res = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    // Revalidate reasonably often rather than caching forever — content
    // here (price/availability) can change independently of a deploy.
    next: { revalidate: 60 },
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(`Shopify Storefront API error: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

// custom.fulfilment_type / custom.lead_time are the two metafields the
// PDP's getFulfilmentStatus() logic already expects (see
// data/products.js). category/colour read from tags using a
// "category:x" / "colour:x" convention — set these tags on each product
// in Shopify when it's created.
const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  tags
  availableForSale
  featuredImage { url altText }
  images(first: 10) { nodes { url altText } }
  priceRange { minVariantPrice { amount currencyCode } }
  fulfilmentType: metafield(namespace: "custom", key: "fulfilment_type") { value }
  leadTime: metafield(namespace: "custom", key: "lead_time") { value }
  variants(first: 20) {
    nodes {
      id
      availableForSale
      selectedOptions { name value }
      price { amount currencyCode }
    }
  }
`;

const ALL_PRODUCTS_QUERY = `
  query AllProducts($first: Int!) {
    products(first: $first) {
      nodes { ${PRODUCT_FIELDS} }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

function tagValue(tags, prefix) {
  const tag = (tags || []).find((t) => t.toLowerCase().startsWith(`${prefix}:`));
  return tag ? tag.slice(prefix.length + 1).toLowerCase() : undefined;
}

// Converts a raw Storefront API product into the same shape
// data/products.js has used since Phase 1, so ProductDetail /
// ProductCard / ShopCollectionStrip / LookDrawer and getFulfilmentStatus
// keep working unchanged. Extra real-data fields (handle, images,
// variants, priceAmount/priceCurrency) are included alongside so
// components can be upgraded incrementally — e.g. the size selector
// currently reads a flat, shared `sizes` list from data/products.js;
// real products should switch it to read `variants` per-product instead.
export function mapShopifyProduct(node) {
  const amount = Number(node.priceRange?.minVariantPrice?.amount ?? 0);
  const currency = node.priceRange?.minVariantPrice?.currencyCode;
  const fulfilmentType = node.fulfilmentType?.value === "made_to_order" ? "made_to_order" : "available";

  return {
    id: node.handle,
    handle: node.handle,
    name: node.title,
    description: node.description,
    price: currency === "GBP" ? `${amount}£` : `${amount} ${currency}`,
    priceAmount: amount,
    priceCurrency: currency,
    category: tagValue(node.tags, "category"),
    colour: tagValue(node.tags, "colour"),
    // Ordinary sold-out vs. made-to-order stay independent, per the
    // fulfilment rules already built into getFulfilmentStatus(): a
    // made-to-order product must stay purchasable even when
    // availableForSale is false at zero inventory.
    soldOut: !node.availableForSale,
    fulfilmentType,
    leadTime: node.leadTime?.value || null,
    image: node.featuredImage?.url,
    images: node.images?.nodes?.map((img) => img.url) || [],
    variants: node.variants?.nodes || [],
  };
}

export async function getAllProducts(first = 100) {
  const data = await shopifyFetch({ query: ALL_PRODUCTS_QUERY, variables: { first } });
  return data.products.nodes.map(mapShopifyProduct);
}

export async function getProductByHandle(handle) {
  const data = await shopifyFetch({ query: PRODUCT_BY_HANDLE_QUERY, variables: { handle } });
  return data.product ? mapShopifyProduct(data.product) : null;
}

// Used to resolve the shopifyProductRef handles stored in Sanity (Shop
// the collection, Shop the look, etc.) back into real product data.
export async function getProductsByHandles(handles) {
  const unique = [...new Set(handles.filter(Boolean))];
  const products = await Promise.all(unique.map((handle) => getProductByHandle(handle)));
  return products.filter(Boolean);
}
