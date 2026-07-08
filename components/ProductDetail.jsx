"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { sizes } from "@/data/products";
import styles from "./ProductDetail.module.css";

const accordionSections = [
  { id: "details", label: "product details" },
  { id: "fit", label: "size and fit" },
  { id: "care", label: "care" },
];

export default function ProductDetail({ product, related }) {
  const [selectedSize, setSelectedSize] = useState("II");
  const [openSection, setOpenSection] = useState(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const toggleSection = (id) => {
    setOpenSection((current) => (current === id ? null : id));
  };

  const handleAdd = () => {
    if (product.soldOut) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      colour: product.colour,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  const sectionCopy = {
    details: product.description,
    fit: "Cut true to size with a relaxed, dropped-shoulder fit. Model is 6'1\" and wears a size II.",
    care: "Dry clean only. Store folded, away from direct sunlight. Steam rather than iron where possible.",
  };

  return (
    <main className={styles.product}>
      <div className={styles.info}>
        <p className={styles.collectionLabel}>
          Collection I <span>SS27</span>
        </p>
        <h1 className={styles.name}>{product.name}</h1>
        <p className={styles.price}>{product.soldOut ? "Sold out" : product.price}</p>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.sizeRow}>
          <span>size:</span>
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              className={size === selectedSize ? styles.sizeActive : styles.sizeOption}
              onClick={() => setSelectedSize(size)}
              disabled={product.soldOut}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={styles.addToBag}
          onClick={handleAdd}
          disabled={product.soldOut}
        >
          {product.soldOut ? "sold out" : added ? "added" : "add to bag"}
        </button>

        <div className={styles.accordion}>
          <div className={styles.divider} />
          {accordionSections.map((section) => (
            <div key={section.id}>
              <button
                type="button"
                className={styles.accordionRow}
                onClick={() => toggleSection(section.id)}
                aria-expanded={openSection === section.id}
              >
                <span>{section.label}</span>
                <span aria-hidden="true">{openSection === section.id ? "—" : "+"}</span>
              </button>
              <div className={styles.accordionPanel} data-open={openSection === section.id}>
                <p className={styles.accordionInner}>{sectionCopy[section.id]}</p>
              </div>
              <div className={styles.divider} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.gallery}>
        {[product.image, product.image, product.image].map((src, index) => (
          <div key={index} className={styles.galleryFrame}>
            <Image src={src} alt={product.name} fill className={styles.image} />
          </div>
        ))}
      </div>

      <div className={styles.artistNote}>
        <div className={styles.artistImage}>
          <Image
            src="/923069e93063d2dfd897bb0ca8006c1cdfc7fe4a.png"
            alt="Richard Kilroy"
            fill
            className={styles.image}
          />
          <div className={styles.artistTint} aria-hidden="true" />
        </div>
        <p className={styles.artistCaption}>
          I / III — Richard Kilroy&rsquo;s sketchbooks were the starting point
          for this piece, translated from ink line to pattern and print.
        </p>
      </div>

      <div className={styles.relatedStrip}>
        {related.map((item) => (
          <Link key={item.id} href={`/shop/${item.id}`} className={styles.relatedFrame}>
            <Image src={item.image} alt={item.name} fill className={styles.image} />
          </Link>
        ))}
      </div>

      <div className={styles.continueRow}>
        <Link href="/shop">
          SS27 <span aria-hidden="true">—</span> continue shopping ›
        </Link>
      </div>
    </main>
  );
}
