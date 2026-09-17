const campaign = {
  name: "campaign",
  title: "Campaign",
  type: "document",
  fields: [
    {
      name: "collection",
      title: "Collection",
      type: "reference",
      to: [{ type: "collection" }],
      description:
        "Number, artist name and signature are pulled from this collection rather than duplicated here.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "collection.artistName" },
      validation: (Rule) => Rule.required(),
    },
    { name: "credits", title: "Credits", type: "text", rows: 6 },

    // Modules 15–20 — an ordered, reorderable list of campaign blocks.
    {
      name: "blocks",
      title: "Campaign blocks",
      type: "array",
      of: [{ type: "campaignBlock" }],
      description: "Drag to reorder — the order here is the order on the page.",
    },

    // Module 21 — Campaign Credits
    { name: "creditsText", title: "Credits text", type: "text", rows: 4 },
    {
      name: "creditsLinkText",
      title: "Credits link text",
      type: "string",
      description: 'e.g. "VIEW THE COLLECTION"',
    },
    {
      name: "creditsLinkTarget",
      title: "Credits link target",
      type: "string",
      options: {
        list: [
          { title: "This collection's page", value: "collection" },
          { title: "Shop page", value: "shop" },
        ],
      },
    },
  ],
  preview: {
    select: { title: "collection.artistName", subtitle: "collection.number" },
    prepare({ title, subtitle }) {
      return { title: `Campaign ${subtitle} — ${title}` };
    },
  },
};

export default campaign;
