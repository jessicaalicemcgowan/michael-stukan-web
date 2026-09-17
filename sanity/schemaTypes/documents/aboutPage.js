const aboutPage = {
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    // Module 12 — About Header
    { name: "headerText", title: "Header text", type: "text", rows: 4, group: "module12" },
    { name: "headerImage", title: "Header image", type: "image", options: { hotspot: true }, group: "module12" },

    // Module 7 — About Text (maroon background, same shape as Collection)
    { name: "aboutText", title: "About text", type: "headingTextBlock", group: "module7" },

    // Module 10 — Gallery (maroon background; includes the About-only
    // "Row 7" text+image block type via galleryBlock's textImage variant)
    {
      name: "gallery",
      title: "Gallery rows",
      type: "array",
      of: [{ type: "galleryRow" }],
      group: "module10",
    },

    // Module 13 — Press
    {
      name: "pressImages",
      title: "Press images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.max(20),
      group: "module13",
    },
    {
      name: "pressLinks",
      title: "Press links",
      type: "array",
      of: [{ type: "pressItem" }],
      group: "module13",
    },

    // Module 14 — Stockists (array order = display order)
    {
      name: "stockists",
      title: "Stockists",
      type: "array",
      of: [{ type: "stockist" }],
      group: "module14",
    },
  ],
  groups: [
    { name: "module12", title: "12. Header" },
    { name: "module7", title: "7. About text" },
    { name: "module10", title: "10. Gallery" },
    { name: "module13", title: "13. Press" },
    { name: "module14", title: "14. Stockists" },
  ],
  preview: {
    prepare() {
      return { title: "About page" };
    },
  },
};

export default aboutPage;
