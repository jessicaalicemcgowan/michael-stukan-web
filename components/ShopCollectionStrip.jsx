"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import { useCart } from "@/hooks/useCart";
import { products, sizes, getFulfilmentStatus } from "@/data/products";
import styles from "./ShopCollectionStrip.module.css";

// I, II, III, IV — matches ProductCard's own compact size row.
const cardSizes = sizes.slice(0, 4);

// A horizontally scrollable row (no auto-scroll — the user drags/scrolls
// it themselves) with the CTA sitting below the row. Hidden below 1024px,
// where a 2-col/inline-row grid (.finalStrip) takes over instead — same
// fallback markup every page using this component shares.
export default function ShopCollectionStrip({
  images,
  ctaLine1 = "Collection I",
  ctaLine2 = "SS27",
  ctaText = "Shop the collection",
  showHeading = true,
  showPrices = false,
  showScrollCta = true,
  scrollInsetLeft = false,
  scrollFromTablet = false,
  scrollCtaInsetRight = false,
  finalStripCtaOnMobile = false,
}) {
  const { addItem } = useCart();
  const [openKey, setOpenKey] = useState(null);

  const findProduct = (id) => products.find((product) => product.id === id);

  const toggleSizes = (key, product) => {
    // Made-to-order products stay addable even at zero inventory — see
    // data/products.js's getFulfilmentStatus.
    if (getFulfilmentStatus(product) === "sold_out") return;
    setOpenKey((open) => (open === key ? null : key));
  };

  const handleSelectSize = (product, size) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      colour: product.colour,
    });
    setOpenKey(null);
  };

  const renderMeta = (key, img) => {
    const product = findProduct(img.productId);
    if (!product) return null;
    const open = openKey === key;
    const isSoldOut = getFulfilmentStatus(product) === "sold_out";

    return (
      <div className={styles.meta}>
        {/* Left empty (rather than omitted) when sold out — .meta relies
            on justify-content: space-between across exactly two children
            to keep "sold out" pinned to the right; dropping this div
            entirely would leave that as the only child and space-between
            would snap it back to the left instead. Matches ProductCard's
            own sold-out treatment (no "+" at all, rather than a disabled
            one). */}
        <div className={styles.addColumn}>
          {!isSoldOut && (
            <>
              <button
                type="button"
                className={styles.add}
                onClick={() => toggleSizes(key, product)}
                aria-expanded={open}
                aria-label={
                  open ? `Choose a size for ${product.name}` : `Add ${product.name} to bag`
                }
              >
                {open ? "−" : "+"}
              </button>
              <div className={styles.sizePanel} data-open={open}>
                <div className={styles.sizePanelInner}>
                  {cardSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={styles.sizeOption}
                      onClick={() => handleSelectSize(product, size)}
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
    );
  };

  const cta = (
    <FadeUp as="div" className={styles.finalCta}>
      <p className={styles.finalCtaLabel}>
        <span>{ctaLine1}</span>
        <span>{ctaLine2}</span>
      </p>
      <Link href="/shop" className={styles.finalCtaLink}>
        {ctaText} <span aria-hidden="true">›</span>
      </Link>
    </FadeUp>
  );

  const loopedImages = [...images, ...images];

  return (
    <>
      {showHeading && cta}

      {/* Desktop-only, user-scrollable — hidden below 1024px via CSS
          (or below 768px when scrollFromTablet opts in). */}
      <FadeUp
        as="div"
        className={
          scrollFromTablet
            ? `${styles.scrollWrapper} ${styles.scrollFromTablet}`
            : styles.scrollWrapper
        }
      >
        <div
          className={
            scrollInsetLeft
              ? `${styles.scrollTrack} ${styles.scrollTrackInsetLeft}`
              : styles.scrollTrack
          }
        >
          {loopedImages.map((img, index) => {
            const key = `scroll-${img.src}-${index}`;
            return (
              <div key={key} className={styles.scrollItem}>
                <Link href={`/shop/${img.productId}`} className={styles.scrollFrame}>
                  <Image src={img.src} alt={img.alt} fill className={styles.image} />
                </Link>
                {showPrices && renderMeta(key, img)}
              </div>
            );
          })}
        </div>
        {showScrollCta && (
          <Link
            href="/shop"
            className={
              scrollCtaInsetRight
                ? `${styles.scrollCta} ${styles.scrollCtaInsetRight}`
                : styles.scrollCta
            }
          >
            <span className={styles.scrollCtaText}>{ctaText} ›</span>
          </Link>
        )}
      </FadeUp>

      {/* Fallback below 1024px (or below 768px when scrollFromTablet
          opts in). */}
      <FadeUp
        as="div"
        className={
          scrollFromTablet
            ? `${styles.finalStrip} ${styles.finalStripBelowDesktop} ${styles.scrollFromTablet}`
            : `${styles.finalStrip} ${styles.finalStripBelowDesktop}`
        }
      >
        {images.slice(0, 5).map((img) => {
          const key = `final-${img.src}`;
          return (
            <div key={key} className={styles.finalStripItem}>
              <Link href={`/shop/${img.productId}`} className={styles.finalStripFrame}>
                <Image src={img.src} alt={img.alt} fill className={styles.image} />
              </Link>
              {showPrices && renderMeta(key, img)}
            </div>
          );
        })}
        <Link
          href="/shop"
          className={
            finalStripCtaOnMobile
              ? `${styles.finalStripCta} ${styles.finalStripCtaOnMobile}`
              : styles.finalStripCta
          }
        >
          {ctaText} ›
        </Link>
        <div className={styles.finalStripItem}>
          <Link href={`/shop/${images[5].productId}`} className={styles.finalStripFrame}>
            <Image src={images[5].src} alt={images[5].alt} fill className={styles.image} />
          </Link>
          {showPrices && renderMeta(`final-${images[5].src}`, images[5])}
        </div>
      </FadeUp>
    </>
  );
}
