import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ id: String(product.id) }));
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    notFound();
  }

  const related = products.filter((item) => item.id !== product.id).slice(0, 6);

  return <ProductDetail product={product} related={related} />;
}
