import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const stripImages = [
  { src: "/d83dfc612a8476e2dc3e6d4c1bd991b10fd07918.png", alt: "Collection I, look 01" },
  { src: "/d16b2a8a716f1aff81a776102cfaea579e6e609a.png", alt: "Collection I, look 02" },
  { src: "/810e6f402ef0c401acd416ccd3810a0131ec8715.png", alt: "Collection I, look 03" },
  { src: "/28bc13f77ef92fd92935737a84e7fa06112f708e.png", alt: "Collection I, look 04" },
  { src: "/2c8609148bc55cc04ffa38160daacd8eef90f2fc.png", alt: "Collection I, look 05" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.editorial}>
        <div className={styles.editorialImage}>
          <Image
            src="/923069e93063d2dfd897bb0ca8006c1cdfc7fe4a.png"
            alt="Editorial portrait, Collection I SS27"
            fill
            className={styles.image}
          />
          <div className={styles.editorialTint} aria-hidden="true" />
        </div>
        <p className={styles.caption}>
          I / II — On craft, tension and the space between them: an ongoing
          conversation with Richard Kilroy for Collection I, SS27.
        </p>
      </div>

      <div className={styles.shopCta}>
        <p className={styles.ctaLabel}>Collection I SS27</p>
        <Link href="/shop" className={styles.ctaLink}>
          Shop the collection <span aria-hidden="true">›</span>
        </Link>
      </div>

      <div className={styles.strip}>
        {stripImages.slice(0, 4).map((img) => (
          <div key={img.src} className={styles.stripFrame}>
            <Image src={img.src} alt={img.alt} fill className={styles.image} />
          </div>
        ))}
        <Link href="/shop" className={styles.stripCta}>
          Shop the collection ›
        </Link>
        <div className={styles.stripFrame}>
          <Image src={stripImages[4].src} alt={stripImages[4].alt} fill className={styles.image} />
        </div>
      </div>

      <nav className={styles.utility} aria-label="Footer">
        <div className={styles.utilityGroup}>
          <Link href="/stockists">Stockists</Link>
          <Link href="/shipping-returns">Shipping &amp; Returns</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <Link href="/terms">Terms &amp; Conditions</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <span className={styles.credit}>Site by JM Office</span>
      </nav>
    </footer>
  );
}
