"use client";

import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

const TAX_RATE = 0.09;

function parsePrice(price) {
  const value = parseInt(price, 10);
  return Number.isNaN(value) ? 0 : value;
}

const ROMAN_NUMERALS = [
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

export function toRoman(num) {
  if (num <= 0) return "0";
  let result = "";
  let remaining = num;
  for (const [value, numeral] of ROMAN_NUMERALS) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  return result;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const addItem = (item) => {
    setItems((prev) => [...prev, { ...item, lineId: `${item.id}-${Date.now()}` }]);
    setIsOpen(true);
  };

  const removeItem = (lineId) => {
    setItems((prev) => prev.filter((item) => item.lineId !== lineId));
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + parsePrice(item.price), 0),
    [items]
  );
  const taxes = Math.round(subtotal * TAX_RATE);
  const total = subtotal + taxes;

  const value = {
    items,
    addItem,
    removeItem,
    isOpen,
    openCart,
    closeCart,
    discountCode,
    setDiscountCode,
    subtotal,
    taxes,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
