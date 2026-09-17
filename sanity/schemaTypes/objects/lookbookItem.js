const lookbookItem = {
  name: "lookbookItem",
  title: "Look",
  type: "object",
  fields: [
    {
      name: "lookNumber",
      title: "Look number",
      type: "string",
      description: 'e.g. "I", "II" — displayed as I / III etc.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "products",
      title: "Tagged products (Shop the look)",
      type: "array",
      of: [{ type: "shopifyProductRef" }],
      description:
        "Products that appear in the Shop the Look slider when this look is clicked. Leave empty for a look with no shoppable products.",
    },
  ],
  preview: {
    select: { media: "image", title: "lookNumber" },
    prepare({ media, title }) {
      return { title: `Look ${title}`, media };
    },
  },
};

export default lookbookItem;
