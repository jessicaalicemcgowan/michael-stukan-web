// "About text" module (7) and "About the artist" module (9) are the same
// shape — a heading plus a long-but-plain-text field on the right. Reused
// on the Collection page (twice), the About page, and the Shop page
// (with an extra inquire link there — see shopAboutText.js).
const headingTextBlock = {
  name: "headingTextBlock",
  title: "Heading + text",
  type: "object",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
    },
    {
      name: "text",
      title: "Text",
      type: "text",
      rows: 6,
      description: "Plain long-form text — not rich text, per the CMS spec.",
    },
  ],
  preview: {
    select: { title: "heading" },
  },
};

export default headingTextBlock;
