"use client";

import { useEffect } from "react";
import Image from "next/image";
import { toRoman, useCart } from "@/hooks/useCart";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    isOpen,
    closeCart,
    discountCode,
    setDiscountCode,
    subtotal,
    taxes,
    total,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  return (
    <>
      <div
        className={styles.backdrop}
        data-open={isOpen}
        onClick={closeCart}
        aria-hidden="true"
      />
      <div
        className={styles.drawer}
        data-open={isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <img src="/icons/cart-dot.svg" alt="" className={styles.dot} />
            <p className={styles.title}>Cart ({toRoman(items.length)})</p>
          </div>
          <button type="button" className={styles.close} onClick={closeCart}>
            close
          </button>
        </div>

        <div className={styles.items}>
          {items.length === 0 ? (
            <p className={styles.empty}>Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.lineId} className={styles.item}>
                <div className={styles.itemImage}>
                  <Image src={item.image} alt={item.name} fill className={styles.image} />
                </div>
                <div className={styles.itemDetails}>
                  <div className={styles.itemTop}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemPrice}>{item.price}</p>
                  </div>
                  <p className={styles.itemMeta}>
                    size: ({item.size}) <br />
                    colour: {item.colour}
                  </p>
                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => removeItem(item.lineId)}
                  >
                    remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.discountRow}>
            <input
              type="text"
              value={discountCode}
              onChange={(event) => setDiscountCode(event.target.value)}
              placeholder="enter a discount code"
              className={styles.discountInput}
            />
            <button type="button" className={styles.apply}>
              apply <span aria-hidden="true">›</span>
            </button>
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <p>Subtotal</p>
              <p>{subtotal}£</p>
            </div>
            <div className={styles.summaryRow}>
              <p>Taxes</p>
              <p>{taxes}£</p>
            </div>
            <div className={styles.summaryTotal}>
              <p>Total</p>
              <p>{total}£</p>
            </div>
          </div>

          <button type="button" className={styles.checkout} disabled={items.length === 0}>
            Checkout
          </button>

          <p className={styles.note}>
            Shipping &amp; taxes may be re-calculated at checkout
          </p>
        </div>
      </div>
    </>
  );
}
