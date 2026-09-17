// One block inside a Gallery row (module 10, reused on the About page).
// blockType drives which fields matter and what the frontend renders:
//   image        — a single captioned image, no caption "+"
//   carousel     — multiple images the visitor pages through; caption
//                  reads "I / III" style, driven by position, not stored
//   shopTheLook  — a captioned image whose "+" opens a Shop the Look
//                  slider for the tagged products
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
      hidden: ({ parent }) => !["image", "shopTheLook", "textImage"].includes(parent?.blockType),
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
      hidden: ({ parent }) => !["image", "carousel"].includes(parent?.blockType),
    },
    {
      name: "products",
      title: "Tagged products (Shop the look)",
      type: "array",
      of: [{ type: "shopifyProductRef" }],
      hidden: ({ parent }) => parent?.blockType !== "shopTheLook",
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
