"use client";

import { useState } from "react";
import styles from "./CaptionToggle.module.css";

// Small "+"/"−" caption reveal. Always rendered as a child of the image's
// own (position: relative) frame and absolutely positioned from there —
// so revealing the caption grows the toggle's own box outward into the
// row's blank space rather than pushing on the row's flex layout, which
// previously shifted the image itself out of its centered position.
// `side="left"` (default) sits in the blank space to the image's left,
// right-aligned against its edge, reading toward the toggle; `side=
// "right"` sits to the image's right, left-aligned, reading away from
// it. On mobile (see CSS) there's no blank space to sit in, so both
// sides instead overlay the image's own bottom corner.
export default function CaptionToggle({ caption, side = "left", className }) {
  const [expanded, setExpanded] = useState(false);
  const sideClass = side === "right" ? styles.right : styles.left;

  return (
    <div className={`${styles.captionToggle} ${sideClass} ${className || ""}`}>
      {expanded && <p className={styles.caption}>{caption}</p>}
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-label={expanded ? "Hide caption" : "Show caption"}
      >
        {expanded ? "−" : "+"}
      </button>
    </div>
  );
}
