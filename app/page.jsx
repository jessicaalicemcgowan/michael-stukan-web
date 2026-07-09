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

const finalStripImages = [
  { src: "/d83dfc612a8476e2dc3e6d4c1bd991b10fd07918.png", alt: "Collection I, look 01" },
  { src: "/d16b2a8a716f1aff81a776102cfaea579e6e609a.png", alt: "Collection I, look 02" },
  { src: "/810e6f402ef0c401acd416ccd3810a0131ec8715.png", alt: "Collection I, look 03" },
  { src: "/28bc13f77ef92fd92935737a84e7fa06112f708e.png", alt: "Collection I, look 04" },
  { src: "/2c8609148bc55cc04ffa38160daacd8eef90f2fc.png", alt: "Collection I, look 05" },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <FadeUp as="section" className={styles.hero}>
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
      </FadeUp>

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

      <FadeUp as="section" className={styles.editorial}>
        <div className={styles.editorialImage}>
          <Image
            src="/923069e93063d2dfd897bb0ca8006c1cdfc7fe4a.png"
            alt="Editorial portrait, Collection I SS27"
            fill
            className={styles.image}
          />
          <div className={styles.editorialTint} aria-hidden="true" />
        </div>
        <p className={styles.editorialCaption}>
          I / II — On craft, tension and the space between them: an ongoing
          conversation with Richard Kilroy for Collection I, SS27.
        </p>
      </FadeUp>

      <FadeUp as="div" className={styles.finalCta}>
        <p className={styles.finalCtaLabel}>Collection I SS27</p>
        <Link href="/shop" className={styles.finalCtaLink}>
          Shop the collection <span aria-hidden="true">›</span>
        </Link>
      </FadeUp>

      <FadeUp as="div" className={styles.finalStrip}>
        {finalStripImages.slice(0, 4).map((img) => (
          <div key={img.src} className={styles.finalStripFrame}>
            <Image src={img.src} alt={img.alt} fill className={styles.image} />
          </div>
        ))}
        <Link href="/shop" className={styles.finalStripCta}>
          Shop the collection ›
        </Link>
        <div className={styles.finalStripFrame}>
          <Image
            src={finalStripImages[4].src}
            alt={finalStripImages[4].alt}
            fill
            className={styles.image}
          />
        </div>
      </FadeUp>
    </main>
  );
}
