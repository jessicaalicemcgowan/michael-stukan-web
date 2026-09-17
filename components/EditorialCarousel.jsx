"use client";

import { useState } from "react";
import Image from "next/image";
import { toRoman } from "@/hooks/useCart";
import styles from "./EditorialCarousel.module.css";

// A minimal click-to-advance carousel for editorial modules that need to
// cycle between two or more images. The caption's leading numeral updates
// with the current image (I, II, ...), wrapping back to I after the last
// image; the denominator and the descriptive text after it stay fixed,
// matching each module's original Figma-sourced caption. The numeral sits
// in a fixed-width box so the text that follows never shifts as the
// numeral's own width changes (I vs II vs III).
//
// Every image in the set is mounted up front, stacked in the same frame,
// and advancing just toggles which one is opacity: 1 via CSS transition —
// a true cross-dissolve with nothing unmounting or waiting on a fresh
// network fetch mid-transition, which is what caused the flashing in the
// previous src-swapping approach.
export default function EditorialCarousel({
  images,
  total,
  captionText,
  spacer,
  frameClassName,
  captionClassName,
  imageClassName,
}) {
  const [index, setIndex] = useState(0);
  const current = images[index];

  const advance = () => setIndex((i) => (i + 1) % images.length);

  return (
    <>
      <button
        type="button"
        className={styles.carouselButton}
        onClick={advance}
        aria-label={`Show next image. Currently showing ${current.alt}.`}
      >
        <div className={frameClassName}>
          {images.map((image, i) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              priority={i === 0}
              className={`${imageClassName} ${styles.carouselImage} ${
                i === index ? styles.carouselImageActive : ""
              }`}
            />
          ))}
        </div>
      </button>
      <p className={captionClassName}>
        <span className={styles.numeral}>{toRoman(index + 1)}</span>
        {` / ${total}`}
        {spacer}
        {captionText}
      </p>
    </>
  );
}
