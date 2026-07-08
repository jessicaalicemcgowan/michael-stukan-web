"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import FadeUp from "@/components/FadeUp";
import { categories, colours, products } from "@/data/products";
import styles from "./page.module.css";

const GRID_STORAGE_KEY = "ms-grid";

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export default function Shop() {
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
          filter <span aria-hidden="true">{filterOpen ? "—" : "+"}</span>
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
    </main>
  );
}
