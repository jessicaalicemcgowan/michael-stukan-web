"use client";

import Image from "next/image";
import { useCursorImages } from "@/hooks/useCursorImages";
import styles from "./PressSection.module.css";

const cursorImages = [
  "/ffe02ae682b0bd4f88ee0ccad474e1cbc17180ed.png",
  "/dddbc089c06c195476610db484bdc1f2320e1b70.png",
  "/7e45adf7b92fd4248484ab46817512097bef01c5.png",
  "/9390d943e61bf6df3df6f9370f88a02b74a34626.png",
  "/3d32bf8135339ba78e314240a592c3e7f7512f51.png",
  "/18aff5820c2560b6691d8873f29534ce1c26d9b5.png",
  "/85fb268ddab3461c50eea3147b99fa87b44c4e05.png",
];

const press = [
  "British Vogue",
  "Vogue USA",
  "T Style Magazine",
  "Harper's Bazaar",
  "Purple",
  "W Magazine",
];

export default function PressSection() {
  const { containerRef, positions, active } = useCursorImages(cursorImages.length);

  return (
    <section ref={containerRef} className={styles.press}>
      <div className={styles.trail} aria-hidden="true">
        {cursorImages.map((src, index) => {
          const point = positions[index];
          return (
            <div
              key={src}
              className={styles.trailFrame}
              data-active={active}
              style={{
                transform: `translate(${point.x}px, ${point.y}px) rotate(${point.rotation}deg)`,
              }}
            >
              <Image src={src} alt="" fill className={styles.image} />
            </div>
          );
        })}
      </div>

      <div className={styles.lists}>
        <p className={styles.label}>Worn by</p>
        <div className={styles.pressGroup}>
          <p className={styles.label}>Press</p>
          <ul className={styles.list}>
            {press.map((name) => (
              <li key={name}>
                {name} <span aria-hidden="true">›</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
