"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

const LOGO_FADE_MS = 2500;
const HOLD_MS = 200;
const REVEAL_DELAY_MS = LOGO_FADE_MS + HOLD_MS;

function scrollToNext() {
  window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
}

export default function Hero() {
  const [logoVisible, setLogoVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const showLogo = window.setTimeout(() => setLogoVisible(true), 50);
    const reveal = window.setTimeout(() => setRevealed(true), REVEAL_DELAY_MS);
    return () => {
      window.clearTimeout(showLogo);
      window.clearTimeout(reveal);
    };
  }, []);

  return (
    <section className={styles.hero} data-revealed={revealed}>
      <Image
        src="/b5d235f0332967a0d94c2f1e7ed397908fc2e2f9.png"
        alt="Michael Stukan, Collection I SS27"
        fill
        priority
        className={styles.heroImage}
        data-visible={revealed}
      />
      <div className={styles.logotypeWrap}>
        <img
          src="/icons/logotype-brush.svg"
          alt="Michael Stukan"
          className={styles.logotype}
          data-visible={logoVisible && !revealed}
        />
        <img
          src="/icons/logotype-brush.svg"
          alt=""
          aria-hidden="true"
          className={`${styles.logotype} ${styles.logotypeWhite}`}
          data-visible={revealed}
        />
      </div>
      <button
        type="button"
        className={styles.arrow}
        data-visible={revealed}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
      >
        <svg viewBox="0 0 34 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 1L17 16L33 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}
