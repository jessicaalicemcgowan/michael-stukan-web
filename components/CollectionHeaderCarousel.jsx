"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./CollectionHeaderCarousel.module.css";

// Each image is permanently bound to one fixed geometric slot — its
// position, rotation and size never change. images[0] starts in the
// front slot; images[1..4] sit in the four rotated stack slots below.
// Clicking only changes which slot paints on top (z-order); whichever
// card is currently topmost stays visible even after the mouse leaves,
// the rest only reveal on hover.
const GEOMETRY = ["front", "slotD", "slotC", "slotB", "slotA"];
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

// "collection" matches the Collection page header's native Figma size
// (576x588, front ~458px wide at aspect 3349/4096). "home" reuses the
// exact same relative geometry, rescaled to fit the homepage editorial
// slot (front ~532px wide at aspect 532/697).
export default function CollectionHeaderCarousel({ images, caption, variant = "collection" }) {
  // Back-to-front paint order, holding each image's original index.
  // Index 0 (the front photo) starts on top, matching the idle state.
  const [zOrder, setZOrder] = useState([4, 3, 2, 1, 0]);
  const [page, setPage] = useState(0);

  const advance = () => {
    setZOrder((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setPage((prev) => (prev + 1) % images.length);
  };

  const current = ROMAN[page] ?? page + 1;
  const total = ROMAN[images.length - 1] ?? images.length;
  const topmostIndex = zOrder[zOrder.length - 1];
  const topmost = images[topmostIndex];
  const variantClass = variant === "home" ? styles.home : "";

  return (
    <>
      <button
        type="button"
        className={`${styles.carousel} ${variantClass}`}
        onClick={advance}
        aria-label={`Show next collection image. Currently showing ${topmost.alt}.`}
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`${styles.card} ${styles[GEOMETRY[i]]} ${
              i === topmostIndex ? styles.topmost : ""
            } ${GEOMETRY[i] === "front" ? variantClass : ""}`}
            style={{ zIndex: zOrder.indexOf(i) + 1 }}
          >
            <Image
              src={img.src}
              alt=""
              fill
              priority
              className={styles.image}
              sizes="(min-width: 1024px) 460px, 75vw"
            />
          </div>
        ))}
      </button>

      <p className={styles.captionRow}>
        <span className={styles.captionLabel}>
          {current} / {total}
        </span>
        <span className={styles.captionText}>{caption}</span>
      </p>
    </>
  );
}
