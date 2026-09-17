const pressItem = {
  name: "pressItem",
  title: "Press item",
  type: "object",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "publication",
      title: "Publication",
      type: "string",
      description: 'e.g. "British Vogue"',
    },
    {
      name: "link",
      title: "Link",
      type: "url",
    },
  ],
  preview: {
    select: { title: "publication", media: "image" },
  },
};

export default pressItem;
