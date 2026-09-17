// Shared "image with a caption" shape — used anywhere the CMS breakdown
// calls for captioned images (homepage carousel, collection header,
// press). Keep this generic; page-specific limits (e.g. "max 5") are
// enforced on the array field that uses it, not here.
const captionedImage = {
  name: "captionedImage",
  title: "Image",
  type: "object",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
  ],
  preview: {
    select: { media: "image", title: "caption" },
    prepare({ media, title }) {
      return { title: title || "(no caption)", media };
    },
  },
};

export default captionedImage;
