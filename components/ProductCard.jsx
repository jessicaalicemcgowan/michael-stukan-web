"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { sizes, getFulfilmentStatus } from "@/data/products";
import styles from "./ProductCard.module.css";

// I, II, III, IV — matches the card's own compact size row (the PDP's
// full size selector still offers all five).
const cardSizes = sizes.slice(0, 4);

export default function ProductCard({ product, dimmed = false }) {
  const { addItem } = useCart();
  const [sizesOpen, setSizesOpen] = useState(false);
  // Made-to-order products stay addable even at zero inventory — only
  // "sold_out" (an ordinary available product with no stock) actually
  // gates the card. See data/products.js's getFulfilmentStatus.
  const isSoldOut = getFulfilmentStatus(product) === "sold_out";

  const toggleSizes = () => {
    if (isSoldOut) return;
    setSizesOpen((open) => !open);
  };

  const handleSelectSize = (size) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      colour: product.colour,
    });
    setSizesOpen(false);
  };

  return (
    <article
      className={styles.card}
      data-dimmed={dimmed}
      aria-label={`${product.name}, ${isSoldOut ? "sold out" : product.price}`}
    >
      <Link href={`/shop/${product.id}`} className={styles.frame}>
        <Image src={product.image} alt={product.name} fill className={styles.image} />
      </Link>
      <div className={styles.meta}>
        {/* Left empty (rather than omitted) when sold out — .meta relies
            on justify-content: space-between across exactly two children
            to keep "sold out" pinned to the right; dropping this div
            entirely would leave that as the only child and space-between
            would snap it back to the left instead. */}
        <div className={styles.addColumn}>
          {/* Sold-out items have nothing to add — no + at all, rather
              than a disabled one. */}
          {!isSoldOut && (
            <>
              <button
                type="button"
                className={styles.add}
                onClick={toggleSizes}
                aria-expanded={sizesOpen}
                aria-label={
                  sizesOpen ? `Choose a size for ${product.name}` : `Add ${product.name} to bag`
                }
              >
                {sizesOpen ? "−" : "+"}
              </button>
              <div className={styles.sizePanel} data-open={sizesOpen}>
                <div className={styles.sizePanelInner}>
                  {cardSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={styles.sizeOption}
                      onClick={() => handleSelectSize(size)}
                      aria-label={`Add ${product.name}, size ${size}, to bag`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <Link
          href={`/shop/${product.id}`}
          className={isSoldOut ? styles.soldOut : styles.price}
        >
          {isSoldOut ? "sold out" : product.price}
        </Link>
      </div>
    </article>
  );
}
