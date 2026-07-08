"use client";

import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, dimmed = false }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    if (product.soldOut) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: "II",
      colour: product.colour,
    });
  };

  return (
    <article
      className={styles.card}
      data-dimmed={dimmed}
      aria-label={`${product.name}, ${product.soldOut ? "sold out" : product.price}`}
    >
      <div className={styles.frame}>
        <Image src={product.image} alt={product.name} fill className={styles.image} />
      </div>
      <div className={styles.meta}>
        <button
          type="button"
          className={styles.add}
          onClick={handleAdd}
          disabled={product.soldOut}
          aria-label={`Add ${product.name} to bag`}
        >
          +
        </button>
        <span className={product.soldOut ? styles.soldOut : styles.price}>
          {product.soldOut ? "sold out" : product.price}
        </span>
      </div>
    </article>
  );
}
