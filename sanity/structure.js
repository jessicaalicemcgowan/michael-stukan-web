// Homepage, About page and Shop settings are singletons (one document
// each, edited directly rather than created/deleted as a list) —
// Collection and Campaign stay as regular, creatable document lists.
const SINGLETONS = [
  { id: "homepage", type: "homepage", title: "Homepage" },
  { id: "aboutPage", type: "aboutPage", title: "About page" },
  { id: "shopSettings", type: "shopSettings", title: "Shop page settings" },
];

export const structure = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map(({ id, type, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(type).documentId(id)),
      ),
      S.divider(),
      S.documentTypeListItem("collection").title("Collections"),
      S.documentTypeListItem("campaign").title("Campaigns"),
    ]);
