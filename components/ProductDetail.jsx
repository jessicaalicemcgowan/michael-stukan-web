"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { sizes, getFulfilmentStatus } from "@/data/products";
import ShopCollectionStrip from "@/components/ShopCollectionStrip";
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

  // "made_to_order" | "available" | "sold_out" — same rules everywhere
  // else this is checked (Shop grid, ShopCollectionStrip, LookDrawer),
  // so a made-to-order product with zero inventory still reads as
  // purchasable here rather than sold out.
  const fulfilmentStatus = getFulfilmentStatus(product);
  const isSoldOut = fulfilmentStatus === "sold_out";
  const statusLabel =
    fulfilmentStatus === "made_to_order"
      ? `Made to order · ${product.leadTime}`
      : fulfilmentStatus === "sold_out"
        ? "Sold out"
        : "Available";

  const toggleSection = (id) => {
    setOpenSection((current) => (current === id ? null : id));
  };

  const handleAdd = () => {
    if (isSoldOut) return;
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
        <Link href="/shop" className={styles.backLink}>
          <span aria-hidden="true">‹</span> Back to shop
        </Link>

        <p className={styles.collectionLabel}>
          I. <span>Richard Kilroy</span>
        </p>
        <h1 className={styles.name}>{product.name}</h1>
        <p className={styles.price}>{product.price}</p>
        <p className={styles.description}>{product.description}</p>

        {/* Only made_to_order gets its own status line — "Available" has
            nothing to add beyond the price/CTA, and "Sold out" is
            already said once by the disabled button below, so this
            would just repeat it. */}
        {fulfilmentStatus === "made_to_order" && (
          <p className={styles.status}>{statusLabel}</p>
        )}

        <div className={styles.sizeRow}>
          <span>size:</span>
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              className={size === selectedSize ? styles.sizeActive : styles.sizeOption}
              onClick={() => setSelectedSize(size)}
              disabled={isSoldOut}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={styles.addToBag}
          onClick={handleAdd}
          disabled={isSoldOut}
        >
          {isSoldOut ? "sold out" : added ? "added" : "add to cart"}
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
        {/* Three distinct shots (mix of product photography and a
            lookbook look) rather than the same product image repeated. */}
        {[
          { src: product.image, alt: product.name },
          { src: related[0].image, alt: related[0].name },
          { src: "/lookbook-look-06.png", alt: "Collection I look" },
        ].map((img, index) => (
          <div key={`${img.src}-${index}`} className={styles.galleryFrame}>
            <Image src={img.src} alt={img.alt} fill className={styles.image} />
          </div>
        ))}
      </div>

      {/* Same stacked two-image module as the Collection page (module 4),
          minus its "+" shop-this-look button — this page has no product
          drawer for it to open, so the caption is plain text. The side
          margin lives on this outer wrap, not on .stackModule itself —
          see the CSS comment. */}
      <div className={styles.stackWrap}>
        <div className={styles.stackModule}>
          <div className={styles.stackSmall}>
            <Image
              src="/982531d64d76229eaad212012fff7c5e787582c2.png"
              alt="Collection I detail"
              fill
              className={styles.image}
            />
          </div>
          <div className={styles.stackTall}>
            <Image
              src="/cacfb78687cb067fe1db807a56f38e0863350dcc.png"
              alt="Collection I look"
              fill
              className={styles.image}
            />
          </div>
          <p className={styles.stackCaption}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            vitae nulla bibendum, convallis tortor sed, accumsan elit.
          </p>
        </div>
      </div>

      <ShopCollectionStrip
        images={related.map((item) => ({
          src: item.image,
          alt: item.name,
          productId: item.id,
        }))}
        showHeading={false}
        ctaText="Continue shopping"
        showPrices
        scrollInsetLeft
        scrollFromTablet
        scrollCtaInsetRight
        finalStripCtaOnMobile
      />
    </main>
  );
}
