"use client";

import { useEffect } from "react";
import styles from "./VideoLightbox.module.css";

// Video drawer matching Figma node 188:2768 — same slide-in-from-the-right
// mechanics as LookDrawer/CartDrawer, but on a dedicated dark maroon ground
// (not used anywhere else on the site) with the "I. / Richard Kilroy" label
// centered above the video and the close button pinned to the panel's top
// right corner. Opened from module 9's video on the collection page.
export default function VideoLightbox({ isOpen, onClose, src, caption }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={styles.backdrop}
        data-open={isOpen}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={styles.drawer}
        data-open={isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Collection I, Richard Kilroy video"
      >
        <div className={styles.header}>
          <p className={styles.label}>
            I. <span>Richard Kilroy</span>
          </p>
          <button type="button" className={styles.close} onClick={onClose}>
            {"( "}
            <span className={styles.closeText}>CLOSE</span>
            {" )"}
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.frame}>
            {isOpen && (
              <video
                src={src}
                className={styles.video}
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            )}
          </div>
          <p className={styles.caption}>{caption}</p>
        </div>
      </div>
    </>
  );
}
