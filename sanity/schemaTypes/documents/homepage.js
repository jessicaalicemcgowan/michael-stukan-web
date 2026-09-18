const homepage = {
  name: "homepage",
  title: "Homepage",
  type: "document",
  // Singleton — the Studio structure (see sanity/structure.js) hides the
  // ability to create more than one of these.
  fields: [
    // Module 1 — Header (always top of page, no other fields)
    {
      name: "headerMedia",
      title: "Header background",
      type: "mediaAsset",
      group: "module1",
    },

    // Module 2 — Collection Marquee
    {
      name: "marqueeCollection",
      title: "Featured collection",
      type: "reference",
      to: [{ type: "collection" }],
      description:
        '"Explore the collection" always links to this collection\'s page.',
      group: "module2",
    },
    {
      name: "marqueeSignatureImage",
      title: "Name / signature image",
      type: "image",
      group: "module2",
    },
    {
      name: "marqueeImages",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.max(12),
      group: "module2",
    },

    // Module 3 — Campaign CTA
    {
      name: "campaignMedia",
      title: "Campaign CTA media",
      type: "mediaAsset",
      description: '"View the campaign" always links to the latest campaign page.',
      group: "module3",
    },

    // Module 4 — Shop the collection
    {
      name: "shopTextLine1",
      title: "Text line 1",
      type: "string",
      group: "module4",
    },
    {
      name: "shopTextLine2",
      title: "Text line 2",
      type: "string",
      group: "module4",
    },
    {
      name: "shopRandomProducts",
      title: "Show random products",
      type: "boolean",
      description: "When on, the grid shows a different random selection on every visit and shopProducts below is ignored.",
      initialValue: true,
      group: "module4",
    },
    {
      name: "shopProducts",
      title: "Products",
      type: "array",
      of: [{ type: "shopifyProductRef" }],
      hidden: ({ parent }) => parent?.shopRandomProducts,
      group: "module4",
    },

    // Module 5 — Image Carousel
    {
      name: "carouselImages",
      title: "Carousel images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.max(5),
      group: "module5",
    },
    {
      name: "carouselCaption",
      title: "Carousel caption",
      description: "One shared caption shown below the whole carousel.",
      type: "string",
      group: "module5",
    },
  ],
  groups: [
    { name: "module1", title: "1. Header" },
    { name: "module2", title: "2. Collection marquee" },
    { name: "module3", title: "3. Campaign CTA" },
    { name: "module4", title: "4. Shop the collection" },
    { name: "module5", title: "5. Image carousel" },
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
};

export default homepage;
