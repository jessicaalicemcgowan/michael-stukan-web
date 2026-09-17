"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toRoman } from "@/hooks/useCart";
import LookDrawer from "@/components/LookDrawer";
import FadeUp from "@/components/FadeUp";
import styles from "./LookbookStrip.module.css";

const SPACER = "            ";
// Matches --dur-slower, kept in sync so the JS-driven swap waits for the
// CSS opacity transition to actually finish before unmounting.
const TRANSITION_MS = 1000;

export default function LookbookStrip({ items }) {
  const [expanded, setExpanded] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [stripVisible, setStripVisible] = useState(true);
  const [activeLook, setActiveLook] = useState(null);
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const isFirstRender = useRef(true);
  const loopedItems = [...items, ...items, ...items];

  useEffect(() => {
    if (expanded) return;
    const node = trackRef.current;
    if (!node) return;
    node.scrollLeft = node.scrollWidth / 3;
  }, [expanded]);

  // Fades the expanded grid in a beat after it mounts, so opening the
  // lookbook reads as a soft cross-fade rather than an instant swap.
  // (gridVisible is already false by the time this runs — either from
  // its initial state or from the collapse handler below — so the
  // effect only ever schedules the true flip, never sets state inline.)
  useEffect(() => {
    if (!expanded) return undefined;
    const raf = requestAnimationFrame(() => setGridVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [expanded]);

  // Mirrors the same soft fade-in when the collapsed strip reappears
  // after closing the expanded grid (skipped on first mount, and
  // stripVisible is already set false by the collapse handler below).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }
    if (expanded) return undefined;
    const raf = requestAnimationFrame(() => setStripVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [expanded]);

  const handleToggle = () => {
    if (!expanded) {
      setExpanded(true);
      return;
    }

    // Collapsing: fade the grid out, and ease the page back up to the
    // strip's resting position *while* the grid is still mounted (its own
    // height doesn't change until it's swapped out, so the container's top
    // offset — and therefore the scroll target — is already stable). Only
    // swap the DOM over to the strip once that's had time to land, so the
    // height collapse happens after we're already sitting still at the
    // right spot instead of fighting the scroll animation mid-flight.
    setGridVisible(false);
    setStripVisible(false);
    setActiveLook(null);

    const node = containerRef.current;
    if (node) {
      const top = node.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }

    window.setTimeout(() => {
      setExpanded(false);
    }, TRANSITION_MS);
  };

  const handleScroll = () => {
    const node = trackRef.current;
    if (!node) return;
    const third = node.scrollWidth / 3;
    if (node.scrollLeft < third * 0.5) {
      node.scrollLeft += third;
    } else if (node.scrollLeft > third * 1.5) {
      node.scrollLeft -= third;
    }
  };

  return (
    <div ref={containerRef} className={styles.lookbook}>
      {expanded ? (
        <div className={styles.gridExpanded} data-visible={gridVisible}>
          {items.map((item, index) => {
            const content = (
              <>
                <button
                  type="button"
                  className={styles.frameLargeButton}
                  onClick={() => setActiveLook(item)}
                  aria-label={`Shop products from ${item.name}`}
                >
                  <div className={styles.frameLarge}>
                    <Image src={item.image} alt={item.name} fill className={styles.image} />
                  </div>
                </button>
                <p className={styles.itemCaption}>
                  {toRoman(index + 1)} / {toRoman(items.length)}
                  {SPACER}
                  {item.description}
                </p>
                <p className={styles.shopHint}>Shop the look</p>
              </>
            );

            // The first two images fade in with the grid itself; the rest
            // use the same scroll-triggered fade as everywhere else on site.
            if (index < 2) {
              return (
                <div key={item.id} className={styles.itemLarge} data-visible={gridVisible}>
                  {content}
                </div>
              );
            }

            return (
              <FadeUp key={item.id} as="div" className={styles.itemLarge}>
                {content}
              </FadeUp>
            );
          })}
        </div>
      ) : (
        <div
          ref={trackRef}
          className={styles.stripCollapsed}
          data-visible={stripVisible}
          onScroll={handleScroll}
        >
          {loopedItems.map((item, index) => (
            <button
              key={`${item.id}-${index}`}
              type="button"
              className={styles.itemSmall}
              onClick={() => setExpanded(true)}
              aria-label={`View ${item.name} in the expanded lookbook`}
            >
              <div className={styles.frameSmall}>
                <Image src={item.image} alt={item.name} fill className={styles.image} />
              </div>
            </button>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.toggle}
          onClick={handleToggle}
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse lookbook" : "Expand lookbook"}
        >
          {expanded ? "−" : "+"}
        </button>
        {!expanded && (
          <p className={styles.footerCaption}>
            {`lookbook${SPACER}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit.`}
          </p>
        )}
      </div>

      <LookDrawer look={activeLook} onClose={() => setActiveLook(null)} />
    </div>
  );
}
