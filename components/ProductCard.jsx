import Image from "next/image";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, dimmed = false }) {
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
        <span className={styles.add} aria-hidden="true">+</span>
        <span className={product.soldOut ? styles.soldOut : styles.price}>
          {product.soldOut ? "sold out" : product.price}
        </span>
      </div>
    </article>
  );
}
