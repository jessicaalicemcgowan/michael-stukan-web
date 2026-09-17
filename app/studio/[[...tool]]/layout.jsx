// The Studio renders its own full-screen chrome — it must not inherit
// the site's Nav/Footer/CartDrawer from the root layout, so this layout
// intentionally stays bare.
export const metadata = {
  title: "Studio — Michael Stukan",
  robots: "noindex",
};

export default function StudioLayout({ children }) {
  return children;
}
