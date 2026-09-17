"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/page.module.css";

export default function LookbookMarquee({ images }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          observer.unobserve(node);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const loopedImages = [...images, ...images];

  return (
    <div ref={ref} className={styles.stripWrapper}>
      <div className={styles.stripTrack} data-playing={playing}>
        {loopedImages.map((img, index) => (
          <Link
            key={`${img.src}-${index}`}
            href="/collection/i-richard-kilroy"
            className={styles.stripFrame}
          >
            <Image src={img.src} alt={img.alt} fill className={styles.image} />
          </Link>
        ))}
      </div>
      <Link href="/collection/i-richard-kilroy" className={styles.stripCta}>
        Explore the collection ›
      </Link>
    </div>
  );
}
