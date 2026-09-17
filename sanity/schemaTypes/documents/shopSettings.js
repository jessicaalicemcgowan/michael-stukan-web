// The Shop page's product grid itself comes straight from Shopify — this
// document only covers the one editorial block on that page: the
// About Text module repeated with a bespoke-orders inquire link.
const shopSettings = {
  name: "shopSettings",
  title: "Shop page settings",
  type: "document",
  fields: [
    { name: "bespokeText", title: "Bespoke orders text", type: "headingTextBlock" },
    { name: "inquireLinkText", title: "Inquire link text", type: "string", initialValue: "Inquire" },
    { name: "inquireEmail", title: "Inquire email address", type: "string" },
  ],
  preview: {
    prepare() {
      return { title: "Shop page settings" };
    },
  },
};

export default shopSettings;
