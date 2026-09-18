"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const LOGO_START_DELAY_MS = 1000;
const REVEAL_DELAY_MS = 1500;

export const HERO_REVEAL_MS = LOGO_START_DELAY_MS + REVEAL_DELAY_MS;

function scrollToNext() {
  window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
}

const FALLBACK_VIDEO = "/driesvannoten_1775210400_3866544573632005601_281383630.mp4";

export default function Hero({ videoSrc }) {
  const [logoVisible, setLogoVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const showLogo = window.setTimeout(() => setLogoVisible(true), LOGO_START_DELAY_MS);
    const reveal = window.setTimeout(() => setRevealed(true), HERO_REVEAL_MS);
    return () => {
      window.clearTimeout(showLogo);
      window.clearTimeout(reveal);
    };
  }, []);

  // Locks page scroll for the duration of the pink loading animation,
  // releasing it the moment the hero is revealed. globals.css gives
  // <html> its own explicit overflow-y, which stops body's overflow
  // from propagating to the viewport — so body alone can't block
  // scroll here, <html> has to be locked too.
  useEffect(() => {
    if (revealed) return undefined;
    const html = document.documentElement;
    const { overflow: htmlOverflow } = html.style;
    const { overflow: bodyOverflow } = document.body.style;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, [revealed]);

  return (
    <section className={styles.hero} data-revealed={revealed}>
      <video
        src={videoSrc || FALLBACK_VIDEO}
        className={styles.heroImage}
        data-visible={revealed}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className={styles.logotypeWrap}>
        <img
          src="/icons/logotype-brush-ext.svg"
          alt="Michael Stukan"
          className={styles.logotype}
          data-visible={logoVisible && !revealed}
        />
        <img
          src="/icons/logotype-brush-ext.svg"
          alt=""
          aria-hidden="true"
          className={`${styles.logotype} ${styles.logotypeReveal}`}
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
