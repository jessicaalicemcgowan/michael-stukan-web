"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LookbookStrip from "@/components/LookbookStrip";
import CollectionArchive from "@/components/CollectionArchive";
import CollectionHeaderCarousel from "@/components/CollectionHeaderCarousel";
import EditorialCarousel from "@/components/EditorialCarousel";
import LookDrawer from "@/components/LookDrawer";
import VideoLightbox from "@/components/VideoLightbox";
import FadeUp from "@/components/FadeUp";
import ShopCollectionStrip from "@/components/ShopCollectionStrip";
import { products } from "@/data/products";
import styles from "./page.module.css";

// Matches the wide label-to-text gap used by the lookbook's own captions
// (LookbookStrip.jsx), so every labeled caption on this page reads the same.
const SPACER = "            ";

const headerCarouselImages = [
  { src: "/3b9ae38a0e5c8b7747e8e233b4d1a8b600f41750.png", alt: "Collection I, SS27 studio portrait" },
  { src: "/Carousel-2-Straight.png", alt: "Collection I, SS27 sketchbook artwork" },
  { src: "/Carousel-3-Straight.png", alt: "Collection I, SS27 sketchbook artwork" },
  { src: "/Carousel-4-Straight.png", alt: "Collection I, SS27 sketchbook artwork" },
  { src: "/Carousel-5-Straight.png", alt: "Collection I, SS27 sketchbook artwork" },
];

const finalStripImages = products
  .slice(0, 6)
  .map((product) => ({ src: product.image, alt: product.name, productId: product.id }));

const lookbookItems = [
  {
    id: "look-01",
    image: "/lookbook-look-01.png",
    name: "Collection I. Look I",
    description: "Lorem ipsum dress in royal and forest, lorem ipsum veil in sheer black tulle, finished with a hand-stitched trim.",
    products: [1, 3, 5],
  },
  {
    id: "look-02",
    image: "/lookbook-look-02.png",
    name: "Collection I. Look II",
    description: "Lorem ipsum dress in royal and forest, lorem ipsum veil in sheer black tulle, finished with a hand-stitched trim.",
    products: [2, 6, 9],
  },
  {
    id: "look-03",
    image: "/lookbook-look-03.png",
    name: "Collection I. Look III",
    description: "Lorem ipsum dress in royal and forest, lorem ipsum veil in sheer black tulle, finished with a hand-stitched trim.",
    products: [4, 7, 8],
  },
  {
    id: "look-04",
    image: "/lookbook-look-04.png",
    name: "Collection I. Look IV",
    description: "Lorem ipsum dress in royal and forest, lorem ipsum veil in sheer black tulle, finished with a hand-stitched trim.",
    products: [10, 3, 1],
  },
  {
    id: "look-05",
    image: "/lookbook-look-05.png",
    name: "Collection I. Look V",
    description: "Lorem ipsum dress in royal and forest, lorem ipsum veil in sheer black tulle, finished with a hand-stitched trim.",
    products: [5, 9, 2],
  },
  {
    id: "look-06",
    image: "/lookbook-look-06.png",
    name: "Collection I. Look VI",
    description: "Lorem ipsum dress in royal and forest, lorem ipsum veil in sheer black tulle, finished with a hand-stitched trim.",
    products: [7, 8, 4],
  },
  {
    id: "look-07",
    image: "/lookbook-look-07.png",
    name: "Collection I. Look VII",
    description: "Lorem ipsum dress in royal and forest, lorem ipsum veil in sheer black tulle, finished with a hand-stitched trim.",
    products: [6, 10, 3],
  },
  {
    id: "look-08",
    image: "/lookbook-look-08.png",
    name: "Collection I. Look VIII",
    description: "Lorem ipsum dress in royal and forest, lorem ipsum veil in sheer black tulle, finished with a hand-stitched trim.",
    products: [1, 5, 9],
  },
  {
    id: "look-09",
    image: "/lookbook-strip-02.png",
    name: "Collection I. Look IX",
    description: "Lorem ipsum dress in royal and forest, lorem ipsum veil in sheer black tulle, finished with a hand-stitched trim.",
    products: [2, 7, 10],
  },
  {
    id: "look-10",
    image: "/lookbook-strip-03.png",
    name: "Collection I. Look X",
    description: "Lorem ipsum dress in royal and forest, lorem ipsum veil in sheer black tulle, finished with a hand-stitched trim.",
    products: [8, 4, 6],
  },
];

export default function Collection() {
  const [activeDrawerLook, setActiveDrawerLook] = useState(null);
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false);

  return (
    <main className={styles.collection}>
      <FadeUp as="header" className={styles.header}>
        <p className={styles.headerLabel}>Collection I.</p>
        <img
          src="/icons/artist-signature.svg"
          alt="Richard Kilroy"
          className={styles.headerSignature}
        />
        <CollectionHeaderCarousel
          images={headerCarouselImages}
          caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit."
        />
      </FadeUp>

      <FadeUp as="section" className={styles.aboutRow}>
        <p className={styles.aboutLabel}>About the collection</p>
        <p className={styles.aboutBody}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          varius tempor fringilla. Vestibulum id purus quis purus convallis
          condimentum. Vestibulum et semper nulla. In eu ante quis augue
          mollis vehicula semper id risus. Aliquam mauris urna, bibendum a
          sem sollicitudin, lacinia tristique nulla. Aenean at mauris ac
          ante vestibulum placerat. Nunc elementum metus vitae diam rutrum
          finibus. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Phasellus varius tempor fringilla. Vestibulum id
          purus quis purus convallis condimentum. Vestibulum et semper
          nulla. In eu ante quis augue mollis vehicula semper id risus.
          Aliquam mauris urna, bibendum a sem sollicitudin, lacinia
          tristique nulla. Aenean at mauris ac ante vestibulum placerat.
          Nunc elementum metus vitae diam rutrum finibus. Nulla facilisi.
        </p>
      </FadeUp>

      <div className={styles.lookbookSection}>
        <LookbookStrip items={lookbookItems} />
      </div>

      <FadeUp as="section" className={styles.artistRow}>
        <p className={styles.artistLabel}>About the artist</p>
        <p className={styles.artistBody}>
          Richard Kilroy Lorem ipsum dolor sit amet, consectetur varius to
          adipiscing elit. Phasellus varius tempor fringilla. Vestibulum id
          wit purus quis purus convallis condimentum. Vestibulum et semper to
          nulla. In eu ante quis augue mollis vehicula semper id risus.
          Aliquam mauris urna, bibendum a sem sollicitudin, lacinia tristique
          nulla. Aenean at mauris ac ante vestibulum placerat.
        </p>
      </FadeUp>

      <section className={styles.editorial}>
        {/* Module 1 */}
        <FadeUp as="div" className={styles.moduleA}>
          <div className={styles.moduleAText}>
            <EditorialCarousel
              images={[
                {
                  src: "/9a3cc7410568936f2189e4c0608bb9ad0ccc4f05.png",
                  alt: "Richard Kilroy at his desk",
                },
                { src: "/studio.jpg", alt: "Collection I studio portrait" },
                { src: "/studio1.jpg", alt: "Collection I studio portrait" },
              ]}
              total="III"
              captionText="Richard Kilroy is an illustrator based in London."
              spacer={SPACER}
              frameClassName={styles.moduleAImage}
              captionClassName={styles.caption}
              imageClassName={styles.image}
            />
          </div>
          <div className={styles.moduleATallWrap}>
            <EditorialCarousel
              images={[
                {
                  src: "/66edcd148b6fa7cefcdaa4340cfbd019e00ae212.png",
                  alt: "Collection I, original artwork by Richard Kilroy",
                },
                {
                  src: "/99061b993677557089035dde969fd6aaa33effb1.png",
                  alt: "Collection I look",
                },
              ]}
              total="II"
              captionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit."
              spacer={SPACER}
              frameClassName={styles.moduleATall}
              captionClassName={styles.caption}
              imageClassName={styles.image}
            />
          </div>
        </FadeUp>

        {/* Module 2 */}
        <FadeUp as="div" className={`${styles.moduleWide} ${styles.shopHover}`}>
          <button
            type="button"
            className={styles.imgButton}
            onClick={() => setActiveDrawerLook({ products: [1] })}
            aria-label="Shop this look"
          >
            <div className={styles.moduleWideImage}>
              <Image
                src="/CGT House WEB jpgs-1-2 1.jpg"
                alt="Collection I look, hand-painted patchwork skirt"
                fill
                className={styles.image}
              />
            </div>
          </button>
          <p className={styles.caption}>
            <button
              type="button"
              className={styles.plusButton}
              onClick={() => setActiveDrawerLook({ products: [1] })}
              aria-label="Shop this look"
            >
              <span className={styles.plusLabel}>+</span>
            </button>
            {SPACER}Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Maecenas vitae nulla bibendum, convallis tortor sed, accumsan
            elit.
          </p>
          <button
            type="button"
            className={styles.shopHint}
            onClick={() => setActiveDrawerLook({ products: [1] })}
          >
            Shop the look
          </button>
        </FadeUp>

        {/* Module 3 */}
        <FadeUp as="div" className={styles.moduleOffset}>
          <div className={`${styles.moduleOffsetLarge} ${styles.module3Large}`}>
            <Image
              src="/923069e93063d2dfd897bb0ca8006c1cdfc7fe4a.png"
              alt="Collection I, original artwork by Richard Kilroy"
              fill
              className={styles.image}
            />
          </div>
          <div className={`${styles.moduleOffsetSmall} ${styles.shopHover}`}>
            <button
              type="button"
              className={styles.imgButton}
              onClick={() => setActiveDrawerLook({ products: [8] })}
              aria-label="Shop this look"
            >
              <div className={styles.moduleOffsetSmallImage}>
                <Image
                  src="/19cf7050de4e0127cc5053b8aa40160ea96cd6c7.png"
                  alt="Collection I detail"
                  fill
                  className={styles.image}
                />
              </div>
            </button>
            <p className={styles.caption}>
              <button
                type="button"
                className={styles.plusButton}
                onClick={() => setActiveDrawerLook({ products: [8] })}
                aria-label="Shop this look"
              >
                <span className={styles.plusLabel}>+</span>
              </button>
              {SPACER}Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Maecenas vitae nulla bibendum, convallis tortor sed,
              accumsan elit.
            </p>
            <button
              type="button"
              className={styles.shopHint}
              onClick={() => setActiveDrawerLook({ products: [8] })}
            >
              Shop the look
            </button>
          </div>
        </FadeUp>

        {/* Module 4 */}
        <FadeUp as="div" className={`${styles.moduleStack} ${styles.shopHover}`}>
          <div className={styles.moduleStackSmall}>
            <Image
              src="/982531d64d76229eaad212012fff7c5e787582c2.png"
              alt="Collection I detail"
              fill
              className={styles.image}
            />
          </div>
          <button
            type="button"
            className={styles.imgButton}
            onClick={() => setActiveDrawerLook({ products: [4, 3] })}
            aria-label="Shop this look"
          >
            <div className={styles.moduleStackTall}>
              <Image
                src="/cacfb78687cb067fe1db807a56f38e0863350dcc.png"
                alt="Collection I look"
                fill
                className={styles.image}
              />
            </div>
          </button>
          <p className={`${styles.caption} ${styles.stackCaption}`}>
            <button
              type="button"
              className={styles.plusButton}
              onClick={() => setActiveDrawerLook({ products: [4, 3] })}
              aria-label="Shop this look"
            >
              <span className={styles.plusLabel}>+</span>
            </button>
            {SPACER}Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Maecenas vitae nulla bibendum, convallis tortor sed, accumsan
            elit.
          </p>
          <button
            type="button"
            className={styles.shopHint}
            onClick={() => setActiveDrawerLook({ products: [4, 3] })}
          >
            Shop the look
          </button>
        </FadeUp>

        {/* Module 5 */}
        <FadeUp as="div" className={styles.moduleReverse}>
          <div className={styles.moduleReverseSmall}>
            <EditorialCarousel
              images={[
                {
                  src: "/d16b2a8a716f1aff81a776102cfaea579e6e609a.png",
                  alt: "Collection I detail",
                },
                {
                  src: "/937f452742e5ae86fcbd719a56ce9a6e8fa1ca53.png",
                  alt: "Collection I detail",
                },
              ]}
              total="II"
              captionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit."
              spacer={SPACER}
              frameClassName={styles.moduleReverseSmallImage}
              captionClassName={styles.caption}
              imageClassName={styles.image}
            />
          </div>
          <div className={styles.moduleReverseLarge}>
            <Image
              src="/600c36c8475328317c3eb98b968648d364ea53a2.png"
              alt="Collection I, original artwork by Richard Kilroy"
              fill
              className={styles.image}
            />
            <div className={styles.moduleReverseTint} aria-hidden="true" />
          </div>
        </FadeUp>

        {/* Module 6 */}
        <FadeUp as="div" className={styles.moduleVideo}>
          <div className={styles.moduleVideoFrame}>
            <video src="/IMG_8112.mp4" autoPlay loop muted playsInline />
          </div>
        </FadeUp>

        {/* Module 7 */}
        <FadeUp as="div" className={styles.moduleWide}>
          <EditorialCarousel
            images={[
              {
                src: "/51ecd9127db5309a6bf137bb8fa1be17641f3e6e.png",
                alt: "Collection I look, pleated skirt in black",
              },
              { src: "/lookbook-strip-04.png", alt: "Collection I look" },
            ]}
            total="II"
            captionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit."
            spacer={SPACER}
            frameClassName={styles.moduleWideImage}
            captionClassName={styles.caption}
            imageClassName={styles.image}
          />
        </FadeUp>

        {/* Module 8 */}
        <FadeUp as="div" className={styles.modulePortrait}>
          <div className={styles.modulePortraitImage}>
            <Image
              src="/20220522_Michael_Stukan_0034 3.jpg"
              alt="Collection I studio moodboard, pinned sketches and photographs"
              fill
              className={styles.image}
            />
            <div className={styles.modulePortraitTint} aria-hidden="true" />
          </div>
        </FadeUp>

        {/* Module 9 */}
        <FadeUp as="div" className={styles.moduleSplit}>
          <div className={`${styles.moduleOffsetLarge} ${styles.module9Large}`}>
            <Image
              src="/001f208c1e5a801666a6008d35775fcb6c82fc30.png"
              alt="Collection I look"
              fill
              className={styles.image}
            />
          </div>
          <div className={`${styles.moduleSplitVideoWrap} ${styles.shopHover}`}>
            <div className={styles.moduleSplitVideoFrame}>
              <video
                src="/IMG_8120.mp4"
                autoPlay
                loop
                muted
                playsInline
                onClick={() => setVideoLightboxOpen(true)}
              />
            </div>
            <p className={styles.caption}>
              <button
                type="button"
                className={styles.plusButton}
                onClick={() => setVideoLightboxOpen(true)}
                aria-label="View video"
              >
                <span className={styles.plusLabel}>+</span>
              </button>
              {SPACER}Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Maecenas vitae nulla bibendum, convallis tortor sed,
              accumsan elit.
            </p>
            <button
              type="button"
              className={styles.shopHint}
              onClick={() => setVideoLightboxOpen(true)}
            >
              Watch
            </button>
          </div>
        </FadeUp>

        {/* Module 10 — plain image + caption, no click/slider, no +, no
            hover state (matches module 8's non-interactive treatment). */}
        <FadeUp as="div" className={styles.modulePortrait}>
          <div className={`${styles.modulePortraitImage} ${styles.module10PortraitImage}`}>
            <Image
              src="/20220522_Michael_Stukan_0034 3b.jpg"
              alt="Collection I look, lace bodice"
              fill
              className={styles.image}
            />
          </div>
          <p className={`${styles.caption} ${styles.portraitCaptionWide}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            vitae nulla bibendum, convallis tortor sed, accumsan elit.
          </p>
        </FadeUp>
      </section>

      <LookDrawer look={activeDrawerLook} onClose={() => setActiveDrawerLook(null)} />
      <VideoLightbox
        isOpen={videoLightboxOpen}
        onClose={() => setVideoLightboxOpen(false)}
        src="/IMG_8120.mp4"
        caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit."
      />

      <ShopCollectionStrip
        images={finalStripImages}
        ctaLine1="I."
        ctaLine2="Richard Kilroy"
        showPrices
        showScrollCta={false}
        scrollInsetLeft
        scrollFromTablet
      />

      <FadeUp as="section" className={styles.campaign}>
        <div className={styles.campaignHeading}>
          <Link href="/campaign/i-richard-kilroy" className={styles.campaignLink}>
            View the campaign <span aria-hidden="true">›</span>
          </Link>
        </div>
        <div className={styles.campaignImage}>
          <video
            src="/driesvannoten_1769261695_3817166014316823011_281383630.mp4"
            className={styles.campaignVideo}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </FadeUp>

      <FadeUp>
        <CollectionArchive />
      </FadeUp>
    </main>
  );
}
