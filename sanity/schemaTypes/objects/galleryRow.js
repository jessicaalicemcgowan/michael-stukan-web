// A row in the flexible Gallery module (10). Rows are a fixed-position
// array (position on the page isn't reorderable per the spec — only the
// blocks' content changes), but each row can hold any number of blocks
// of any type, and rows can be repeated with different content.
const galleryRow = {
  name: "galleryRow",
  title: "Gallery row",
  type: "object",
  fields: [
    {
      name: "blocks",
      title: "Blocks",
      type: "array",
      of: [{ type: "galleryBlock" }],
      validation: (Rule) => Rule.min(1),
    },
  ],
  preview: {
    select: { blocks: "blocks" },
    prepare({ blocks }) {
      return { title: `Row — ${blocks?.length || 0} block(s)` };
    },
  },
};

export default galleryRow;
