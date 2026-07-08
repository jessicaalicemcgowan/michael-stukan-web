"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./LookbookStrip.module.css";

export default function LookbookStrip({ items }) {
  const [size, setSize] = useState("sml");
  const [activeId, setActiveId] = useState(null);

  const active = items.find((item) => item.id === activeId);

  const selectItem = (id) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <div className={styles.lookbook}>
      <div className={styles.toggle}>
        <button
          type="button"
          className={size === "sml" ? styles.sizeActive : styles.sizeOption}
          onClick={() => setSize("sml")}
        >
          sml
        </button>
        <span aria-hidden="true">|</span>
        <button
          type="button"
          className={size === "lrg" ? styles.sizeActive : styles.sizeOption}
          onClick={() => setSize("lrg")}
        >
          lrg
        </button>
      </div>

      <div className={size === "lrg" ? styles.stripLrg : styles.stripSml}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={styles.frame}
            data-active={item.id === activeId}
            onClick={() => selectItem(item.id)}
            aria-expanded={item.id === activeId}
          >
            <Image src={item.image} alt={item.name} fill className={styles.image} />
          </button>
        ))}
      </div>

      <div className={styles.reveal} data-open={Boolean(active)}>
        <div className={styles.revealInner}>
          {active && (
            <>
              <div className={styles.revealFrame}>
                <Image src={active.image} alt={active.name} fill className={styles.image} />
              </div>
              <div className={styles.revealMeta}>
                <p className={styles.revealName}>{active.name}</p>
                <p className={styles.revealPrice}>
                  {active.soldOut ? "sold out" : active.price}
                </p>
                <button
                  type="button"
                  className={styles.revealClose}
                  onClick={() => setActiveId(null)}
                >
                  close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
