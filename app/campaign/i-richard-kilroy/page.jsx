import Image from "next/image";
import Link from "next/link";
import CaptionToggle from "@/components/CaptionToggle";
import FadeUp from "@/components/FadeUp";
import { client, imageUrl, fileUrl } from "@/lib/sanity";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

const CAMPAIGN_QUERY = `*[_type == "campaign" && slug.current == "i-richard-kilroy"][0]{
  blocks,
  creditsText,
  creditsLinkText,
  creditsLinkTarget,
  "collectionNumber": collection->number,
  "collectionArtist": collection->artistName,
  "collectionSlug": collection->slug.current,
}`;

const LAYOUT_CLASS = {
  fullBleed: "full",
  imageRight: "alignEnd",
  imageCenter: "alignCenter",
  imageLeft: "alignStart",
  doubleImage: "halfRow",
  overlap: "fullVideoInset",
};

function MediaFrame({ media }) {
  const video = fileUrl(media?.video);
  const image = media?.image ? imageUrl(media.image, 2000) : null;
  if (video) {
    return <video src={video} className={styles.video} autoPlay loop muted playsInline />;
  }
  if (image) {
    return <Image src={image} alt="Collection I SS27 campaign" fill className={styles.image} />;
  }
  return null;
}

export default async function Campaign() {
  const campaign = await client.fetch(CAMPAIGN_QUERY);
  const blocks = campaign?.blocks || [];

  return (
    <main className={styles.campaign}>
      <div className={styles.essay}>
        {blocks.map((block) => {
          const layoutClass = styles[LAYOUT_CLASS[block.blockType]] || styles.full;

          if (block.blockType === "fullBleed") {
            return (
              <FadeUp key={block._key} as="div" className={layoutClass}>
                <MediaFrame media={block.media} />
              </FadeUp>
            );
          }

          if (["imageRight", "imageCenter", "imageLeft"].includes(block.blockType)) {
            return (
              <FadeUp key={block._key} as="div" className={layoutClass}>
                <div className={styles.portrait}>
                  <MediaFrame media={block.media} />
                  {block.caption && <CaptionToggle caption={block.caption} />}
                </div>
              </FadeUp>
            );
          }

          if (block.blockType === "doubleImage") {
            return (
              <FadeUp key={block._key} as="div" className={layoutClass}>
                <div className={styles.halfVideo}>
                  <MediaFrame media={block.mediaPrimaryFor2Up} />
                </div>
                <div className={`${styles.portrait} ${styles.halfStill}`}>
                  <MediaFrame media={block.mediaSecondary} />
                </div>
              </FadeUp>
            );
          }

          if (block.blockType === "overlap") {
            return (
              <FadeUp key={block._key} as="div" className={layoutClass}>
                <MediaFrame media={block.mediaPrimaryFor2Up} />
                <div className={styles.insetVideoFrame}>
                  <MediaFrame media={block.mediaSecondary} />
                </div>
              </FadeUp>
            );
          }

          return null;
        })}
      </div>

      <FadeUp as="p" className={styles.credits}>
        {campaign?.creditsText}
      </FadeUp>

      <FadeUp as="div" className={styles.ctaRow}>
        <p className={styles.ctaLabel}>
          {campaign?.collectionNumber}. <span>{campaign?.collectionArtist}</span>
        </p>
        <Link
          href={
            campaign?.creditsLinkTarget === "shop"
              ? "/shop"
              : `/collection/${campaign?.collectionSlug || "i-richard-kilroy"}`
          }
          className={styles.ctaLink}
        >
          {campaign?.creditsLinkText || "View the collection"} <span aria-hidden="true">›</span>
        </Link>
      </FadeUp>
    </main>
  );
}
