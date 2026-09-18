// Sanity can't natively reference a Shopify product (it isn't a Sanity
// document), so product selections are stored as plain handles instead.
// Next.js resolves each handle against the Shopify Storefront API at
// render time (see lib/shopify.js) — Sanity never duplicates product
// data, only points at it. If Shopify's official "Connect" app is added
// to this project later, this can be swapped for a true synced
// reference type with no change to how it's used in queries.
const shopifyProductRef = {
  name: "shopifyProductRef",
  title: "Shopify product",
  type: "object",
  fields: [
    {
      name: "productHandle",
      title: "Shopify product handle",
      type: "string",
      description:
        "The product's handle from the Shopify Admin URL (e.g. the \"jacquard-dress\" in /products/jacquard-dress).",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: { title: "productHandle" },
    prepare({ title }) {
      return { title: title || "(no handle set)" };
    },
  },
};

export default shopifyProductRef;
