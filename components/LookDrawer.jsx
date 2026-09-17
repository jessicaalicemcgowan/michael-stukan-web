"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { products, sizes, getFulfilmentStatus } from "@/data/products";
import styles from "./LookDrawer.module.css";

// I, II, III, IV — matches ProductCard's own compact size row (the PDP's
// full size selector still offers all five).
const cardSizes = sizes.slice(0, 4);

export default function LookDrawer({ look, onClose }) {
  const { addItem } = useCart();
  const [openSizesFor, setOpenSizesFor] = useState(null);
  const isOpen = Boolean(look);
  const lookProducts = look
    ? look.products
        .map((id) => products.find((product) => product.id === id))
        .filter(Boolean)
    : [];

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const toggleSizes = (product) => {
    // Made-to-order products stay addable even at zero inventory — see
    // data/products.js's getFulfilmentStatus.
    if (getFulfilmentStatus(product) === "sold_out") return;
    setOpenSizesFor((current) => (current === product.id ? null : product.id));
  };

  const handleSelectSize = (product, size) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      colour: product.colour,
    });
    setOpenSizesFor(null);
  };

  return (
    <>
      <div
        className={styles.backdrop}
        data-open={isOpen}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={
          lookProducts.length === 1
            ? `${styles.drawer} ${styles.drawerSingle}`
            : styles.drawer
        }
        data-open={isOpen}
        role="dialog"
        aria-modal="true"
        aria-label={look ? `Shop ${look.name}` : "Shop the look"}
      >
        <div className={styles.header}>
          <p className={styles.title}>{look ? look.name : ""}</p>
          <button type="button" className={styles.close} onClick={onClose}>
            {"( "}
            <span className={styles.closeText}>CLOSE</span>
            {" )"}
          </button>
        </div>

        <div
          className={
            lookProducts.length === 1
              ? `${styles.items} ${styles.itemsSingle}`
              : styles.items
          }
        >
          {lookProducts.map((product) => {
            const isSoldOut = getFulfilmentStatus(product) === "sold_out";
            return (
            <div key={product.id} className={styles.item}>
              <Link href={`/shop/${product.id}`} className={styles.itemImage}>
                <Image src={product.image} alt={product.name} fill className={styles.image} />
              </Link>
              <div className={styles.meta}>
                {/* Left empty (rather than omitted) when sold out — same
                    treatment as ProductCard/ShopCollectionStrip: no "+"
                    at all, rather than a disabled one. .addColumn stays
                    rendered so .meta's two-child layout doesn't shift. */}
                <div className={styles.addColumn}>
                  {!isSoldOut && (
                    <>
                      <button
                        type="button"
                        className={styles.add}
                        onClick={() => toggleSizes(product)}
                        aria-expanded={openSizesFor === product.id}
                        aria-label={
                          openSizesFor === product.id
                            ? `Choose a size for ${product.name}`
                            : `Add ${product.name} to bag`
                        }
                      >
                        {openSizesFor === product.id ? "−" : "+"}
                      </button>
                      <div className={styles.sizePanel} data-open={openSizesFor === product.id}>
                        <div className={styles.sizePanelInner}>
                          {cardSizes.map((size) => (
                            <button
                              key={size}
                              type="button"
                              className={styles.sizeOption}
                              onClick={() => handleSelectSize(product, size)}
                              aria-label={`Add ${product.name}, size ${size}, to bag`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <span className={isSoldOut ? styles.soldOut : styles.itemPrice}>
                  {isSoldOut ? "sold out" : product.price}
                </span>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
