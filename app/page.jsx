import Link from "next/link";
import CollectionHeaderCarousel from "@/components/CollectionHeaderCarousel";
import FadeUp from "@/components/FadeUp";
import Hero from "@/components/Hero";
import LookbookMarquee from "@/components/LookbookMarquee";
import ShopCollectionStrip from "@/components/ShopCollectionStrip";
import { client, imageUrl, fileUrl } from "@/lib/sanity";
import { getProductsByHandles } from "@/lib/shopify";
import styles from "./page.module.css";

// Content (Sanity) and product data (Shopify) can both change
// independently of a deploy, so this renders per-request rather than
// being baked in at build time.
export const dynamic = "force-dynamic";

const HOMEPAGE_QUERY = `*[_id == "homepage"][0]{
  headerMedia,
  "collectionNumber": marqueeCollection->number,
  "collectionArtist": marqueeCollection->artistName,
  "collectionSlug": marqueeCollection->slug.current,
  marqueeImages,
  campaignMedia,
  shopTextLine1,
  shopTextLine2,
  shopRandomProducts,
  "shopProductHandles": shopProducts[].productHandle,
  carouselImages,
  carouselCaption,
}`;

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default async function Home() {
  const home = await client.fetch(HOMEPAGE_QUERY);

  const shopProducts = home?.shopProductHandles?.length
    ? await getProductsByHandles(home.shopProductHandles)
    : [];

  const lookbookImages = (home?.marqueeImages || []).map((image, index) => ({
    src: imageUrl(image, 1200),
    alt: `Collection ${home?.collectionNumber || "I"}, look ${String(index + 1).padStart(2, "0")}`,
  }));

  const editorialCarouselImages = (home?.carouselImages || []).map((image) => ({
    src: imageUrl(image, 1600),
    alt: `Editorial portrait, Collection ${home?.collectionNumber || "I"}`,
  }));

  const finalStripImages = shopProducts.map((product) => ({
    src: product.image,
    alt: product.name,
    productId: product.id,
    product,
  }));

  const heroVideo = fileUrl(home?.headerMedia?.video);
  const campaignVideo = fileUrl(home?.campaignMedia?.video);

  return (
    <main className={styles.page}>
      <Hero videoSrc={heroVideo} />

      <FadeUp as="section" className={styles.lookbook}>
        <div className={styles.lookbookHeading}>
          <p className={styles.lookbookLabel}>Collection {home?.collectionNumber || "I"}.</p>
          <img
            src="/icons/artist-signature.svg"
            alt={home?.collectionArtist || "Richard Kilroy"}
            className={styles.artistSignature}
          />
        </div>
        <LookbookMarquee images={shuffle(lookbookImages)} />
      </FadeUp>

      <FadeUp as="section" className={styles.campaign}>
        <div className={styles.campaignHeading}>
          <Link href={`/campaign/${home?.collectionSlug || "i-richard-kilroy"}`} className={styles.campaignLink}>
            View the campaign <span aria-hidden="true">›</span>
          </Link>
        </div>
        <div className={styles.campaignImage}>
          {campaignVideo && (
            <video
              src={campaignVideo}
              className={styles.campaignVideo}
              autoPlay
              loop
              muted
              playsInline
            />
          )}
        </div>
      </FadeUp>

      <ShopCollectionStrip
        images={finalStripImages}
        ctaLine1={home?.shopTextLine1 || "I."}
        ctaLine2={home?.shopTextLine2 || "Richard Kilroy"}
        showPrices
        showScrollCta={false}
        scrollInsetLeft
        scrollFromTablet
      />

      <FadeUp as="section" className={styles.editorial}>
        <CollectionHeaderCarousel
          images={editorialCarouselImages}
          caption={home?.carouselCaption}
          variant="home"
        />
      </FadeUp>
    </main>
  );
}
