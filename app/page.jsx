import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import styles from "./page.module.css";

const lookbookImages = [
  { src: "/99061b993677557089035dde969fd6aaa33effb1.png", alt: "Collection I, look 01" },
  { src: "/c094515651c5534773f6236d9b9e146bc96bc97d.png", alt: "Collection I, look 02" },
  { src: "/9c4b95af9a0cba34b33eaeefc7365e511066ef79.png", alt: "Collection I, look 03" },
  { src: "/250e25b8512098575fb5fff15c9bdf6baaefe172.png", alt: "Collection I, look 04" },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/b5d235f0332967a0d94c2f1e7ed397908fc2e2f9.png"
          alt="Michael Stukan, Collection I SS27"
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <img
            src="/icons/logotype-brush.svg"
            alt="Michael Stukan"
            className={styles.logotype}
          />
          <p className={styles.heroSeason}>SS27</p>
          <Link href="/collection" className={styles.heroLink}>
            View collection <span aria-hidden="true">›</span>
          </Link>
        </div>
      </section>

      <FadeUp as="section" className={styles.lookbook}>
        <div className={styles.lookbookHeading}>
          <p className={styles.lookbookLabel}>Collection I SS27</p>
          <img
            src="/icons/artist-signature.svg"
            alt="Richard Kilroy"
            className={styles.artistSignature}
          />
        </div>
        <div className={styles.strip}>
          {lookbookImages.slice(0, 3).map((img) => (
            <div key={img.src} className={styles.stripFrame}>
              <Image src={img.src} alt={img.alt} fill className={styles.image} />
            </div>
          ))}
          <Link href="/collection" className={styles.stripCta}>
            Explore the collection ›
          </Link>
          <div className={styles.stripFrame}>
            <Image
              src={lookbookImages[3].src}
              alt={lookbookImages[3].alt}
              fill
              className={styles.image}
            />
          </div>
        </div>
      </FadeUp>

      <FadeUp as="section" className={styles.campaign}>
        <div className={styles.campaignHeading}>
          <p className={styles.campaignLabel}>SS27</p>
          <Link href="/campaign" className={styles.campaignLink}>
            View the campaign <span aria-hidden="true">›</span>
          </Link>
        </div>
        <div className={styles.campaignImage}>
          <Image
            src="/c3f89b8df864572e4e49415c97d6f704d4e2a180.png"
            alt="Collection I SS27 campaign"
            fill
            className={styles.image}
          />
        </div>
      </FadeUp>

      <FadeUp as="section" className={styles.shopLink}>
        <Link href="/shop" className={styles.shopCta}>
          Shop all <span aria-hidden="true">›</span>
        </Link>
      </FadeUp>
    </main>
  );
}
