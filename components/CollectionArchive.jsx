"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { collections } from "@/data/archive";
import styles from "./CollectionArchive.module.css";

export default function CollectionArchive() {
  const pathname = usePathname();
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className={styles.archive}>
      <p className={styles.label}>Collection archive</p>
      <div className={styles.list}>
        <div className={styles.divider} />
        {collections.map((collection) => {
          const isCurrent = collection.url === pathname;
          const row = (
            <div className={styles.row}>
              <p className={styles.name}>{collection.name}</p>
              <p className={styles.artist}>{collection.artist}</p>
            </div>
          );

          return (
            <div key={collection.id} className={styles.item}>
              {isCurrent ? (
                <div className={styles.current}>{row}</div>
              ) : (
                <Link
                  href={collection.url}
                  className={styles.link}
                  onMouseEnter={() => setHoveredId(collection.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {row}
                </Link>
              )}
              <div className={styles.divider} />

              {/* Positioned relative to this row specifically (not the
                  whole section) so it tracks whichever row is hovered,
                  instead of staying pinned to one fixed spot. */}
              <div
                className={styles.preview}
                data-visible={collection.id === hoveredId}
                aria-hidden="true"
              >
                <Image
                  src={collection.previewImage}
                  alt=""
                  fill
                  className={styles.previewImage}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
