import Link from "next/link";
import CollectionHeaderCarousel from "@/components/CollectionHeaderCarousel";
import FadeUp from "@/components/FadeUp";
import Hero from "@/components/Hero";
import LookbookMarquee from "@/components/LookbookMarquee";
import ShopCollectionStrip from "@/components/ShopCollectionStrip";
import styles from "./page.module.css";

const editorialCarouselImages = [
  { src: "/923069e93063d2dfd897bb0ca8006c1cdfc7fe4a.png", alt: "Editorial portrait, Collection I SS27" },
  { src: "/Carousel-2-Straight.png", alt: "Collection I, SS27 sketchbook artwork" },
  { src: "/Carousel-3-Straight.png", alt: "Collection I, SS27 sketchbook artwork" },
  { src: "/Carousel-4-Straight.png", alt: "Collection I, SS27 sketchbook artwork" },
  { src: "/Carousel-5-Straight.png", alt: "Collection I, SS27 sketchbook artwork" },
];

const lookbookImages = [
  { src: "/99061b993677557089035dde969fd6aaa33effb1.png", alt: "Collection I, look 01" },
  { src: "/c094515651c5534773f6236d9b9e146bc96bc97d.png", alt: "Collection I, look 02" },
  { src: "/9c4b95af9a0cba34b33eaeefc7365e511066ef79.png", alt: "Collection I, look 03" },
  { src: "/250e25b8512098575fb5fff15c9bdf6baaefe172.png", alt: "Collection I, look 04" },
  { src: "/001f208c1e5a801666a6008d35775fcb6c82fc30.png", alt: "Collection I, look 05" },
  { src: "/3f7eee2323a02b2af9ac47a6801c38cdf82a2d43.png", alt: "Collection I, look 06" },
  { src: "/9eadeeefd4546bcfd5f7836b052dd3215272063a.png", alt: "Collection I, look 07" },
  { src: "/51ecd9127db5309a6bf137bb8fa1be17641f3e6e.png", alt: "Collection I, look 08" },
  { src: "/937f452742e5ae86fcbd719a56ce9a6e8fa1ca53.png", alt: "Collection I, look 09" },
  { src: "/af15889fc55f7a2018137c2d84be6d3bd155c702.png", alt: "Collection I, look 10" },
  { src: "/b5d235f0332967a0d94c2f1e7ed397908fc2e2f9.png", alt: "Collection I, look 11" },
  { src: "/cacfb78687cb067fe1db807a56f38e0863350dcc.png", alt: "Collection I, look 12" },
];

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const finalStripImages = [
  { src: "/d83dfc612a8476e2dc3e6d4c1bd991b10fd07918.png", alt: "Collection I, look 01", productId: 4 },
  { src: "/d16b2a8a716f1aff81a776102cfaea579e6e609a.png", alt: "Collection I, look 02", productId: 3 },
  { src: "/810e6f402ef0c401acd416ccd3810a0131ec8715.png", alt: "Collection I, look 03", productId: 5 },
  { src: "/28bc13f77ef92fd92935737a84e7fa06112f708e.png", alt: "Collection I, look 04", productId: 6 },
  { src: "/2c8609148bc55cc04ffa38160daacd8eef90f2fc.png", alt: "Collection I, look 05", productId: 1 },
  { src: "/76120a8e5ea863917d96656cbe20ee24b45b6a87.png", alt: "Collection I, look 06", productId: 7 },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <Hero />

      <FadeUp as="section" className={styles.lookbook}>
        <div className={styles.lookbookHeading}>
          <p className={styles.lookbookLabel}>Collection I.</p>
          <img
            src="/icons/artist-signature.svg"
            alt="Richard Kilroy"
            className={styles.artistSignature}
          />
        </div>
        <LookbookMarquee images={shuffle(lookbookImages)} />
      </FadeUp>

      <FadeUp as="section" className={styles.campaign}>
        <div className={styles.campaignHeading}>
          <Link href="/campaign/i-richard-kilroy" className={styles.campaignLink}>
            View the campaign <span aria-hidden="true">›</span>
          </Link>
        </div>
        <div className={styles.campaignImage}>
          <video
            src="/driesvannoten_1769201565_3816661668361699191_281383630-2.mp4"
            className={styles.campaignVideo}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </FadeUp>

      <ShopCollectionStrip
        images={finalStripImages}
        ctaLine1="I."
        ctaLine2="Richard Kilroy"
        showPrices
        showScrollCta={false}
        scrollInsetLeft
        scrollFromTablet
      />

      <FadeUp as="section" className={styles.editorial}>
        <CollectionHeaderCarousel
          images={editorialCarouselImages}
          caption="On craft, tension and the space between them: an ongoing conversation with Richard Kilroy for Collection I, SS27."
          variant="home"
        />
      </FadeUp>
    </main>
  );
}
