import Image from "next/image";
import Link from "next/link";
import LookbookStrip from "@/components/LookbookStrip";
import CollectionArchive from "@/components/CollectionArchive";
import FadeUp from "@/components/FadeUp";
import { products } from "@/data/products";
import styles from "./page.module.css";

const thumbnails = products.slice(0, 6);
const lookbookItems = products.slice(0, 8);

export default function Collection() {
  return (
    <main className={styles.collection}>
      <FadeUp as="header" className={styles.header}>
        <p className={styles.headerLabel}>
          Collection I <span>SS27</span>
        </p>
        <img
          src="/icons/artist-signature.svg"
          alt="Richard Kilroy"
          className={styles.headerSignature}
        />
        <div className={styles.headerImage}>
          <Image
            src="/3b9ae38a0e5c8b7747e8e233b4d1a8b600f41750.png"
            alt="Collection I, SS27"
            fill
            priority
            className={styles.image}
          />
        </div>
        <p className={styles.headerCaption}>
          I / IV — Studio portraits from the Collection I development process.
        </p>
      </FadeUp>

      <FadeUp as="section" className={styles.aboutRow}>
        <p className={styles.aboutLabel}>About the collection</p>
        <p className={styles.aboutBody}>
          Collection I is a study in restraint — tailoring stripped back to its
          essential lines, worked in raw and washed fabrications sourced from
          mills across Northern Italy. Developed over eighteen months with
          illustrator Richard Kilroy, the collection borrows from his
          sketchbooks: loose figures, unfinished gestures, the marks left
          before a drawing is called done. Nothing here is precious. Pieces
          are cut to be worn hard, and to soften with time.
        </p>
      </FadeUp>

      <FadeUp>
        <LookbookStrip items={lookbookItems} />
      </FadeUp>

      <FadeUp as="section" className={styles.artistRow}>
        <p className={styles.artistLabel}>About the artist</p>
        <p className={styles.artistBody}>
          Richard Kilroy is an illustrator and printmaker based in London. His
          work moves between fashion editorial and fine art — loose, gestural
          figures rendered in ink and gouache, often left intentionally
          unresolved. For Collection I, his sketchbooks became the starting
          point for print, embroidery, and silhouette.
        </p>
      </FadeUp>

      <section className={styles.editorial}>
        <FadeUp as="div" className={styles.moduleA}>
          <div className={styles.moduleAText}>
            <div className={styles.moduleAImage}>
              <Image
                src="/9a3cc7410568936f2189e4c0608bb9ad0ccc4f05.png"
                alt="Collection I studio sketches"
                fill
                className={styles.image}
              />
            </div>
            <p className={styles.caption}>
              I / III — Richard Kilroy is an illustrator based in London.
            </p>
          </div>
          <div className={styles.moduleATall}>
            <Image
              src="/66edcd148b6fa7cefcdaa4340cfbd019e00ae212.png"
              alt="Collection I look, portrait"
              fill
              className={styles.image}
            />
          </div>
        </FadeUp>

        <FadeUp as="div" className={styles.moduleWide}>
          <div className={styles.moduleWideImage}>
            <Image
              src="/51ecd9127db5309a6bf137bb8fa1be17641f3e6e.png"
              alt="Collection I studio"
              fill
              className={styles.image}
            />
          </div>
          <p className={styles.caption}>
            I / II — Hand-finished jacquard, woven in small batches
            exclusively for Collection I.
          </p>
        </FadeUp>

        <FadeUp as="div" className={styles.moduleOffset}>
          <div className={styles.moduleOffsetLarge}>
            <Image
              src="/600c36c8475328317c3eb98b968648d364ea53a2.png"
              alt="Collection I look"
              fill
              className={styles.image}
            />
          </div>
          <div className={styles.moduleOffsetSmall}>
            <div className={styles.moduleOffsetSmallImage}>
              <Image
                src="/19cf7050de4e0127cc5053b8aa40160ea96cd6c7.png"
                alt="Collection I detail"
                fill
                className={styles.image}
              />
            </div>
            <p className={styles.caption}>
              + Sourced deadstock silk, hand-dyed in small batches.
            </p>
          </div>
        </FadeUp>

        <FadeUp as="div" className={styles.moduleStack}>
          <div className={styles.moduleStackSmall}>
            <Image
              src="/982531d64d76229eaad212012fff7c5e787582c2.png"
              alt="Collection I detail"
              fill
              className={styles.image}
            />
          </div>
          <div className={styles.moduleStackTall}>
            <Image
              src="/cacfb78687cb067fe1db807a56f38e0863350dcc.png"
              alt="Collection I look"
              fill
              className={styles.image}
            />
          </div>
          <p className={styles.caption}>
            + Raw-edge tailoring, finished entirely by hand.
          </p>
        </FadeUp>

        <FadeUp as="div" className={styles.moduleReverse}>
          <div className={styles.moduleReverseSmall}>
            <div className={styles.moduleReverseSmallImage}>
              <Image
                src="/d16b2a8a716f1aff81a776102cfaea579e6e609a.png"
                alt="Collection I detail"
                fill
                className={styles.image}
              />
            </div>
            <p className={styles.caption}>
              + Every piece numbered from the original sketchbook page.
            </p>
          </div>
          <div className={styles.moduleReverseLarge}>
            <Image
              src="/923069e93063d2dfd897bb0ca8006c1cdfc7fe4a.png"
              alt="Collection I look, tinted portrait"
              fill
              className={styles.image}
            />
            <div className={styles.moduleReverseTint} aria-hidden="true" />
          </div>
        </FadeUp>
      </section>

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

      <FadeUp as="div" className={styles.shopCtaRow}>
        <p className={styles.shopLabel}>
          Collection I <span>SS27</span>
        </p>
        <Link href="/shop" className={styles.shopCta}>
          Shop the collection <span aria-hidden="true">›</span>
        </Link>
      </FadeUp>

      <FadeUp as="div" className={styles.thumbStrip}>
        {thumbnails.map((product) => (
          <div key={product.id} className={styles.thumbFrame}>
            <Image src={product.image} alt={product.name} fill className={styles.image} />
          </div>
        ))}
      </FadeUp>

      <div className={styles.shopFootnote}>
        <Link href="/shop">
          SS27 <span aria-hidden="true">—</span> shop the collection ›
        </Link>
      </div>

      <FadeUp>
        <CollectionArchive />
      </FadeUp>
    </main>
  );
}
