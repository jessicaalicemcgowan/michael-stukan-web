import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { getAllProducts, getProductByHandle } from "@/lib/shopify";

// Same reasoning as app/shop/page.jsx — product/price/inventory can
// change in Shopify at any time, independent of a deploy.
export const dynamic = "force-dynamic";

// [id] is the Shopify product handle (e.g. "jacquard-dress") — matches
// what mapShopifyProduct() in lib/shopify.js sets as `id`, and what
// ProductCard/ShopCollectionStrip link to via /shop/${product.id}.
export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductByHandle(id);

  if (!product) {
    notFound();
  }

  const allProducts = await getAllProducts();
  const related = allProducts.filter((item) => item.id !== product.id).slice(0, 6);

  return <ProductDetail product={product} related={related} />;
}
