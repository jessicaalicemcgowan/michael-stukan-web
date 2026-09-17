"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import FadeUp from "@/components/FadeUp";
import styles from "./page.module.css";

const GRID_STORAGE_KEY = "ms-grid";

// TODO: placeholder studio address until a real one is confirmed —
// mirrors the "no lorem ipsum, use realistic placeholder text" rule
// this whole Phase 1 build follows for everything else.
const BESPOKE_MAILTO = `mailto:studio@michaelstukan.com?subject=${encodeURIComponent(
  "Bespoke order inquiry",
)}&body=${encodeURIComponent(
  "Hi Michael Stukan team,\n\nI'd like to enquire about a bespoke order.\n\n",
)}`;

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

// Receives products/categories/colours as props rather than importing
// hardcoded data directly — products now come live from Shopify (see
// app/shop/page.jsx), categories/colours are still the fixed taxonomy
// from data/products.js.
export default function ShopClient({ products, categories, colours }) {
  const [grid, setGrid] = useState("sml");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeColours, setActiveColours] = useState([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(GRID_STORAGE_KEY);
    if (stored === "sml" || stored === "lrg") {
      setGrid(stored);
    }
  }, []);

  const selectGrid = (value) => {
    setGrid(value);
    window.localStorage.setItem(GRID_STORAGE_KEY, value);
  };

  const hasFilters = activeCategories.length > 0 || activeColours.length > 0;

  const clearFilters = () => {
    setActiveCategories([]);
    setActiveColours([]);
  };

  const isDimmed = (product) => {
    if (!hasFilters) return false;
    const matchesCategory =
      activeCategories.length === 0 || activeCategories.includes(product.category);
    const matchesColour = activeColours.length === 0 || activeColours.includes(product.colour);
    return !(matchesCategory && matchesColour);
  };

  return (
    <main className={styles.shop}>
      <div className={styles.toolbar}>
        <p className={styles.gridToggle}>
          grid:{" "}
          <button
            type="button"
            className={grid === "sml" ? styles.gridActive : styles.gridOption}
            onClick={() => selectGrid("sml")}
          >
            sml
          </button>{" "}
          |{" "}
          <button
            type="button"
            className={grid === "lrg" ? styles.gridActive : styles.gridOption}
            onClick={() => selectGrid("lrg")}
          >
            lrg
          </button>
        </p>
        <button
          type="button"
          className={styles.filterToggle}
          aria-expanded={filterOpen}
          onClick={() => setFilterOpen((open) => !open)}
        >
          filter{" "}
          <span
            aria-hidden="true"
            className={filterOpen ? undefined : styles.filterIconPlus}
          >
            {filterOpen ? "—" : "+"}
          </span>
        </button>
      </div>

      {filterOpen && (
        <div className={styles.filterPanel}>
          <div className={styles.filterGroup}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  activeCategories.includes(category) ? styles.filterActive : styles.filterOption
                }
                onClick={() => setActiveCategories((prev) => toggleValue(prev, category))}
              >
                {category}
              </button>
            ))}
          </div>
          <div className={styles.filterGroup}>
            {colours.map((colour) => (
              <button
                key={colour}
                type="button"
                className={
                  activeColours.includes(colour) ? styles.filterActive : styles.filterOption
                }
                onClick={() => setActiveColours((prev) => toggleValue(prev, colour))}
              >
                {colour}
              </button>
            ))}
            <button
              type="button"
              className={styles.filterClear}
              disabled={!hasFilters}
              onClick={clearFilters}
            >
              ( clear )
            </button>
          </div>
        </div>
      )}

      <FadeUp as="div" className={grid === "lrg" ? styles.gridLrg : styles.gridSml}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} dimmed={isDimmed(product)} />
        ))}
      </FadeUp>

      {/* Bespoke is a separate customer journey (an enquiry, not a
          product fulfilment state) — see data/products.js's
          getFulfilmentStatus comment. This is the standalone section
          for it, not part of any product's own PDP. Same label/body
          row layout as the Collection page's "about the collection"
          section (.aboutRow there, .bespokeRow here) — .bespokeBleed
          wraps it to cancel out .shop's own padding-inline, since
          .aboutRow's parent (.collection) carries no padding of its
          own for it to compute against; see the CSS comment. */}
      <FadeUp as="section" className={styles.bespokeBleed}>
        <div className={styles.bespokeRow}>
          <p className={styles.bespokeLabel}>Bespoke orders</p>
          <div className={styles.bespokeCol}>
            <p className={styles.bespokeBody}>
              We collaborate on bespoke and custom orders. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Phasellus varius tempor fringilla. Vestibulum id
              purus quis purus convallis condimentum. Vestibulum et semper nulla. In eu ante
              quis augue mollis vehicula semper id risus. Aliquam mauris urna, bibendum a sem
              sollicitudin, lacinia tristique nulla. Aenean at mauris ac ante vestibulum
              placerat. Nunc elementum metus vitae diam rutrum finibus. Nulla facilisi.
            </p>
            <a href={BESPOKE_MAILTO} className={styles.bespokeInquire}>
              Inquire <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>
      </FadeUp>
    </main>
  );
}
