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
import styles from "./page.module.css";

// Matches the wide label-to-text gap used by the lookbook's own captions
// (LookbookStrip.jsx), so every labeled caption on this page reads the same.
const SPACER = "            ";

export default function CollectionClient({
  collectionNumber,
  artistName,
  headerCarouselImages,
  headerCaption,
  aboutText,
  lookbookItems,
  aboutArtist,
  galleryModules,
  shopTextLine1,
  shopTextLine2,
  finalStripImages,
  campaignTeaserVideo,
}) {
  const [activeDrawerLook, setActiveDrawerLook] = useState(null);
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false);

  const m = galleryModules;

  return (
    <main className={styles.collection}>
      <FadeUp as="header" className={styles.header}>
        <p className={styles.headerLabel}>Collection {collectionNumber}.</p>
        <img
          src="/icons/artist-signature.svg"
          alt={artistName}
          className={styles.headerSignature}
        />
        <CollectionHeaderCarousel images={headerCarouselImages} caption={headerCaption} />
      </FadeUp>

      <FadeUp as="section" className={styles.aboutRow}>
        <p className={styles.aboutLabel}>{aboutText?.heading}</p>
        <p className={styles.aboutBody}>{aboutText?.text}</p>
      </FadeUp>

      <div className={styles.lookbookSection}>
        <LookbookStrip items={lookbookItems} />
      </div>

      <FadeUp as="section" className={styles.artistRow}>
        <p className={styles.artistLabel}>{aboutArtist?.heading}</p>
        <p className={styles.artistBody}>{aboutArtist?.text}</p>
      </FadeUp>

      <section className={styles.editorial}>
        {/* Module 1 */}
        <FadeUp as="div" className={styles.moduleA}>
          <div className={styles.moduleAText}>
            <EditorialCarousel
              images={(m.moduleA[0]?.images || []).map((src) => ({ src, alt: "Richard Kilroy at his desk" }))}
              total="III"
              captionText={m.moduleA[0]?.caption}
              spacer={SPACER}
              frameClassName={styles.moduleAImage}
              captionClassName={styles.caption}
              imageClassName={styles.image}
            />
          </div>
          <div className={styles.moduleATallWrap}>
            <EditorialCarousel
              images={(m.moduleA[1]?.images || []).map((src) => ({ src, alt: "Collection I, original artwork by Richard Kilroy" }))}
              total="II"
              captionText={m.moduleA[1]?.caption}
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
            onClick={() => setActiveDrawerLook({ name: "Shop the look", products: m.moduleWide1?.products })}
            aria-label="Shop this look"
          >
            <div className={styles.moduleWideImage}>
              {m.moduleWide1?.image && (
                <Image
                  src={m.moduleWide1.image}
                  alt="Collection I look, hand-painted patchwork skirt"
                  fill
                  className={styles.image}
                />
              )}
            </div>
          </button>
          <p className={styles.caption}>
            <button
              type="button"
              className={styles.plusButton}
              onClick={() => setActiveDrawerLook({ name: "Shop the look", products: m.moduleWide1?.products })}
              aria-label="Shop this look"
            >
              <span className={styles.plusLabel}>+</span>
            </button>
            {SPACER}
            {m.moduleWide1?.caption}
          </p>
          <button
            type="button"
            className={styles.shopHint}
            onClick={() => setActiveDrawerLook({ name: "Shop the look", products: m.moduleWide1?.products })}
          >
            Shop the look
          </button>
        </FadeUp>

        {/* Module 3 */}
        <FadeUp as="div" className={styles.moduleOffset}>
          <div className={`${styles.moduleOffsetLarge} ${styles.module3Large}`}>
            {m.moduleOffsetLarge?.image && (
              <Image
                src={m.moduleOffsetLarge.image}
                alt="Collection I, original artwork by Richard Kilroy"
                fill
                className={styles.image}
              />
            )}
          </div>
          <div className={`${styles.moduleOffsetSmall} ${styles.shopHover}`}>
            <button
              type="button"
              className={styles.imgButton}
              onClick={() => setActiveDrawerLook({ name: "Shop the look", products: m.moduleOffsetSmall?.products })}
              aria-label="Shop this look"
            >
              <div className={styles.moduleOffsetSmallImage}>
                {m.moduleOffsetSmall?.image && (
                  <Image src={m.moduleOffsetSmall.image} alt="Collection I detail" fill className={styles.image} />
                )}
              </div>
            </button>
            <p className={styles.caption}>
              <button
                type="button"
                className={styles.plusButton}
                onClick={() => setActiveDrawerLook({ name: "Shop the look", products: m.moduleOffsetSmall?.products })}
                aria-label="Shop this look"
              >
                <span className={styles.plusLabel}>+</span>
              </button>
              {SPACER}
              {m.moduleOffsetSmall?.caption}
            </p>
            <button
              type="button"
              className={styles.shopHint}
              onClick={() => setActiveDrawerLook({ name: "Shop the look", products: m.moduleOffsetSmall?.products })}
            >
              Shop the look
            </button>
          </div>
        </FadeUp>

        {/* Module 4 */}
        <FadeUp as="div" className={`${styles.moduleStack} ${styles.shopHover}`}>
          <div className={styles.moduleStackSmall}>
            {m.moduleStack?.image && (
              <Image src={m.moduleStack.image} alt="Collection I detail" fill className={styles.image} />
            )}
          </div>
          <button
            type="button"
            className={styles.imgButton}
            onClick={() => setActiveDrawerLook({ name: "Shop the look", products: m.moduleStack?.products })}
            aria-label="Shop this look"
          >
            <div className={styles.moduleStackTall}>
              {m.moduleStack?.secondaryImage && (
                <Image src={m.moduleStack.secondaryImage} alt="Collection I look" fill className={styles.image} />
              )}
            </div>
          </button>
          <p className={`${styles.caption} ${styles.stackCaption}`}>
            <button
              type="button"
              className={styles.plusButton}
              onClick={() => setActiveDrawerLook({ name: "Shop the look", products: m.moduleStack?.products })}
              aria-label="Shop this look"
            >
              <span className={styles.plusLabel}>+</span>
            </button>
            {SPACER}
            {m.moduleStack?.caption}
          </p>
          <button
            type="button"
            className={styles.shopHint}
            onClick={() => setActiveDrawerLook({ name: "Shop the look", products: m.moduleStack?.products })}
          >
            Shop the look
          </button>
        </FadeUp>

        {/* Module 5 */}
        <FadeUp as="div" className={styles.moduleReverse}>
          <div className={styles.moduleReverseSmall}>
            <EditorialCarousel
              images={(m.moduleReverseSmall?.images || []).map((src) => ({ src, alt: "Collection I detail" }))}
              total="II"
              captionText={m.moduleReverseSmall?.caption}
              spacer={SPACER}
              frameClassName={styles.moduleReverseSmallImage}
              captionClassName={styles.caption}
              imageClassName={styles.image}
            />
          </div>
          <div className={styles.moduleReverseLarge}>
            {m.moduleReverseLarge?.image && (
              <Image
                src={m.moduleReverseLarge.image}
                alt="Collection I, original artwork by Richard Kilroy"
                fill
                className={styles.image}
              />
            )}
            <div className={styles.moduleReverseTint} aria-hidden="true" />
          </div>
        </FadeUp>

        {/* Module 6 */}
        <FadeUp as="div" className={styles.moduleVideo}>
          <div className={styles.moduleVideoFrame}>
            {m.moduleVideo?.video && <video src={m.moduleVideo.video} autoPlay loop muted playsInline />}
          </div>
        </FadeUp>

        {/* Module 7 */}
        <FadeUp as="div" className={styles.moduleWide}>
          <EditorialCarousel
            images={(m.moduleWide2?.images || []).map((src) => ({ src, alt: "Collection I look, pleated skirt in black" }))}
            total="II"
            captionText={m.moduleWide2?.caption}
            spacer={SPACER}
            frameClassName={styles.moduleWideImage}
            captionClassName={styles.caption}
            imageClassName={styles.image}
          />
        </FadeUp>

        {/* Module 8 */}
        <FadeUp as="div" className={styles.modulePortrait}>
          <div className={styles.modulePortraitImage}>
            {m.modulePortrait1?.image && (
              <Image
                src={m.modulePortrait1.image}
                alt="Collection I studio moodboard, pinned sketches and photographs"
                fill
                className={styles.image}
              />
            )}
            <div className={styles.modulePortraitTint} aria-hidden="true" />
          </div>
        </FadeUp>

        {/* Module 9 */}
        <FadeUp as="div" className={styles.moduleSplit}>
          <div className={`${styles.moduleOffsetLarge} ${styles.module9Large}`}>
            {m.moduleSplitImage?.image && (
              <Image src={m.moduleSplitImage.image} alt="Collection I look" fill className={styles.image} />
            )}
          </div>
          <div className={`${styles.moduleSplitVideoWrap} ${styles.shopHover}`}>
            <div className={styles.moduleSplitVideoFrame}>
              {m.moduleSplitVideo?.video && (
                <video
                  src={m.moduleSplitVideo.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onClick={() => setVideoLightboxOpen(true)}
                />
              )}
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
              {SPACER}
              {m.moduleSplitVideo?.caption}
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
            {m.modulePortrait2?.image && (
              <Image src={m.modulePortrait2.image} alt="Collection I look, lace bodice" fill className={styles.image} />
            )}
          </div>
          <p className={`${styles.caption} ${styles.portraitCaptionWide}`}>{m.modulePortrait2?.caption}</p>
        </FadeUp>
      </section>

      <LookDrawer look={activeDrawerLook} onClose={() => setActiveDrawerLook(null)} />
      <VideoLightbox
        isOpen={videoLightboxOpen}
        onClose={() => setVideoLightboxOpen(false)}
        src={m.moduleSplitVideo?.video}
        caption={m.moduleSplitVideo?.caption}
      />

      <ShopCollectionStrip
        images={finalStripImages}
        ctaLine1={shopTextLine1}
        ctaLine2={shopTextLine2}
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
          {campaignTeaserVideo && (
            <video
              src={campaignTeaserVideo}
              className={styles.campaignVideo}
              autoPlay
              loop
              muted
              playsInline
            />
          )}
        </div>
      </FadeUp>

      <FadeUp>
        <CollectionArchive />
      </FadeUp>
    </main>
  );
}
