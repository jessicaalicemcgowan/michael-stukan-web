// Display order is the array's own order (drag to reorder in the
// Studio) — no separate "order" field needed.
const stockist = {
  name: "stockist",
  title: "Stockist",
  type: "object",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() },
    { name: "city", title: "City", type: "string" },
    { name: "country", title: "Country", type: "string" },
    { name: "link", title: "Link", type: "url" },
  ],
  preview: {
    select: { title: "name", city: "city", country: "country" },
    prepare({ title, city, country }) {
      return { title, subtitle: [city, country].filter(Boolean).join(", ") };
    },
  },
};

export default stockist;
