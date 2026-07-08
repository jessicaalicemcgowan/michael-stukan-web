"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Nav.module.css";

const primaryLinks = [
  { href: "/about", label: "About" },
  { href: "/collection", label: "Collection", dropdown: "Collection I — SS27" },
  { href: "/campaign", label: "Campaign", dropdown: "SS27" },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.nav}>
      <button
        type="button"
        className={styles.toggle}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className={styles.toggleIcon} data-open={menuOpen}>
          <span />
          <span />
        </span>
      </button>

      <Link href="/" className={styles.brand} onClick={closeMenu}>
        Michael Stukan
      </Link>

      <nav className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>
        <div className={styles.primaryLinks}>
          {primaryLinks.map(({ href, label, dropdown }) => (
            <div key={href} className={styles.linkGroup}>
              <Link
                href={href}
                onClick={closeMenu}
                className={`${styles.link} ${isActive(href) ? styles.linkActive : ""}`}
              >
                {label}
              </Link>
              {dropdown && <span className={styles.dropdown}>{dropdown}</span>}
            </div>
          ))}
        </div>

        <div className={styles.secondaryLinks}>
          <Link
            href="/shop"
            onClick={closeMenu}
            className={`${styles.link} ${isActive("/shop") ? styles.linkActive : ""}`}
          >
            Shop
          </Link>
          <button type="button" className={styles.cart} aria-label="Open cart, 4 items">
            <span>(IV)</span>
            <img src="/icons/cart-dot.svg" alt="" className={styles.cartDot} />
          </button>
        </div>
      </nav>
    </header>
  );
}
