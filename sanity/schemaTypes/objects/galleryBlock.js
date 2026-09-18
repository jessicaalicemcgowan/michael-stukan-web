// One block inside a Gallery row (module 10, reused on the About page).
// blockType drives which fields matter and what the frontend renders:
//   image        — a single captioned image, no caption "+"
//   carousel     — multiple images the visitor pages through; caption
//                  reads "I / III" style, driven by position, not stored
//   shopTheLook  — a captioned image whose "+" opens a Shop the Look
//                  slider for the tagged products
//   stack        — two stacked images (small over tall) sharing one
//                  caption, optionally shoppable — matches the Collection
//                  page's "module 4" treatment
//   video        — a captioned video whose "+" opens the video slider
//   textImage    — About-page-only variant (gallery Row 7): a text block
//                  next to an image instead of image(s) alone
const galleryBlock = {
  name: "galleryBlock",
  title: "Gallery block",
  type: "object",
  fields: [
    {
      name: "blockType",
      title: "Block type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Carousel", value: "carousel" },
          { title: "Shop the look", value: "shopTheLook" },
          { title: "Stack (two images)", value: "stack" },
          { title: "Video", value: "video" },
          { title: "Text + image (About page only)", value: "textImage" },
        ],
        layout: "radio",
      },
      initialValue: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) =>
        !["image", "shopTheLook", "stack", "textImage"].includes(parent?.blockType),
    },
    {
      name: "secondaryImage",
      title: "Second image (bottom of stack)",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.blockType !== "stack",
    },
    {
      name: "tint",
      title: "Darken with tint overlay",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.blockType !== "image",
    },
    {
      name: "images",
      title: "Carousel images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      hidden: ({ parent }) => parent?.blockType !== "carousel",
    },
    {
      name: "video",
      title: "Video file",
      type: "file",
      options: { accept: "video/*" },
      hidden: ({ parent }) => parent?.blockType !== "video",
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
      hidden: ({ parent }) => !["image", "carousel", "stack", "video"].includes(parent?.blockType),
    },
    {
      name: "products",
      title: "Tagged products (Shop the look)",
      type: "array",
      of: [{ type: "shopifyProductRef" }],
      hidden: ({ parent }) => !["shopTheLook", "stack"].includes(parent?.blockType),
    },
    {
      name: "text",
      title: "Text",
      type: "text",
      rows: 6,
      hidden: ({ parent }) => parent?.blockType !== "textImage",
    },
  ],
  preview: {
    select: { media: "image", blockType: "blockType" },
    prepare({ media, blockType }) {
      return { title: blockType, media };
    },
  },
};

export default galleryBlock;
