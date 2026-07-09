import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.utility} aria-label="Footer">
        <div className={styles.utilityGroup}>
          <Link href="/stockists">Stockists</Link>
          <Link href="/shipping-returns">Shipping &amp; Returns</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className={styles.utilityGroup}>
          <Link href="/terms">Terms &amp; Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <span>Site by JM Office</span>
        </div>
      </nav>
    </footer>
  );
}
