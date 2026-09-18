const collection = {
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    // Collection-level identity (used on this page, the marquee, the
    // archive, and referenced by this collection's campaign)
    { name: "number", title: "Number (e.g. I)", type: "string", validation: (Rule) => Rule.required() },
    { name: "season", title: "Season (e.g. SS27)", type: "string" },
    { name: "artistName", title: "Artist name", type: "string", validation: (Rule) => Rule.required() },
    { name: "artistSignature", title: "Artist signature image", type: "image" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: (doc) => `${doc.number}-${doc.artistName}` },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "releaseDate",
      title: "Release date",
      type: "date",
      description: "Drives chronological order in the Collection Archive (module 11).",
    },

    // Module 6 — Collection Header
    {
      name: "headerImages",
      title: "Header images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.max(5),
      group: "module6",
    },
    {
      name: "headerCaption",
      title: "Header caption",
      description: "One shared caption shown below the whole header carousel.",
      type: "string",
      group: "module6",
    },

    // Module 7 — About Text
    { name: "aboutText", title: "About the collection", type: "headingTextBlock", group: "module7" },

    // Module 8 — Lookbook
    {
      name: "lookbook",
      title: "Lookbook",
      type: "array",
      of: [{ type: "lookbookItem" }],
      group: "module8",
    },
    {
      name: "lookbookCaption",
      title: "Lookbook caption (collapsed view)",
      type: "string",
      group: "module8",
    },

    // Module 9 — About the artist (same shape as module 7)
    { name: "aboutArtist", title: "About the artist", type: "headingTextBlock", group: "module9" },

    // Module 10 — Gallery
    {
      name: "gallery",
      title: "Gallery rows",
      type: "array",
      of: [{ type: "galleryRow" }],
      group: "module10",
    },

    // Module 4 — Shop the collection (repeated, this collection's products)
    {
      name: "shopTextLine1",
      title: "Shop the collection — text line 1",
      type: "string",
      group: "module4",
    },
    {
      name: "shopTextLine2",
      title: "Shop the collection — text line 2",
      type: "string",
      group: "module4",
    },
    {
      name: "shopProducts",
      title: "Shop the collection — products",
      type: "array",
      of: [{ type: "shopifyProductRef" }],
      group: "module4",
    },

    // Module 3 — Campaign CTA (repeated on this page, below the shop
    // strip). Stored here (rather than derived from the campaign
    // document) because the teaser clip shown here doesn't have to be
    // one of the campaign page's own blocks.
    {
      name: "campaignTeaserVideo",
      title: "Campaign CTA — teaser video",
      type: "mediaAsset",
      group: "module4",
    },
  ],
  groups: [
    { name: "module6", title: "6. Header" },
    { name: "module7", title: "7. About the collection" },
    { name: "module8", title: "8. Lookbook" },
    { name: "module9", title: "9. About the artist" },
    { name: "module10", title: "10. Gallery" },
    { name: "module4", title: "4. Shop the collection" },
  ],
  orderings: [
    {
      title: "Release date, newest first",
      name: "releaseDateDesc",
      by: [{ field: "releaseDate", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "artistName", subtitle: "number", media: "artistSignature" },
    prepare({ title, subtitle, media }) {
      return { title: `Collection ${subtitle} — ${title}`, media };
    },
  },
};

export default collection;
