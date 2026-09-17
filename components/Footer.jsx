"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";

export default function Footer() {
  const pathname = usePathname();
  const isAbout = pathname === "/about";

  return (
    <footer className={styles.footer} data-on-about={isAbout}>
      <nav className={styles.utility} aria-label="Footer">
        <div className={styles.utilityGroup}>
          <Link href="/stockists" className={styles.link}>Stockists</Link>
          <Link href="/shipping-returns" className={styles.link}>Shipping &amp; Returns</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
          <a
            href="https://www.instagram.com/michaelstukan/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Follow
          </a>
        </div>
        <div className={`${styles.utilityGroup} ${styles.utilityGroupRow}`}>
          <div className={styles.utilityGroupLeft}>
            <Link href="/terms" className={styles.link}>Terms &amp; Conditions</Link>
            <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
          </div>
          <span>
            Site by{" "}
            <a
              href="https://www.jessicamcgowan-office.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              JM Office
            </a>
          </span>
        </div>
      </nav>
    </footer>
  );
}
