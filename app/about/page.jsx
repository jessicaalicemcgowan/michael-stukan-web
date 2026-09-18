import Image from "next/image";
import PressSection from "@/components/PressSection";
import FadeUp from "@/components/FadeUp";
import EditorialCarousel from "@/components/EditorialCarousel";
import { client, imageUrl } from "@/lib/sanity";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

// Matches the literal-space run used by the Collection page's editorial
// captions, to keep the numeral-to-text gap identical.
const SPACER = "            ";

const ABOUT_QUERY = `*[_id == "aboutPage"][0]{
  headerText,
  headerImage,
  aboutText,
  gallery,
  pressImages,
  pressLinks,
  stockists,
}`;

export default async function About() {
  const about = await client.fetch(ABOUT_QUERY);

  const pairRow = about?.gallery?.[0]?.blocks || [];
  const bioBlock = about?.gallery?.[1]?.blocks?.[0];
  const wideBlock = about?.gallery?.[2]?.blocks?.[0];

  const pressImages = (about?.pressImages || []).map((image) => imageUrl(image, 800));
  const press = (about?.pressLinks || []).map((item) => ({ name: item.publication, url: item.link }));
  const stockists = about?.stockists || [];

  return (
    <main className={styles.about}>
      <FadeUp as="section" className={styles.intro}>
        <p className={styles.introText}>{about?.headerText}</p>
        <div className={styles.introImage}>
          {about?.headerImage && (
            <Image
              src={imageUrl(about.headerImage, 1200)}
              alt="Michael Stukan, studio portrait"
              fill
              priority
              className={styles.image}
            />
          )}
        </div>
      </FadeUp>

      <FadeUp as="section" className={styles.collabRow}>
        <p className={styles.collabLabel}>{about?.aboutText?.heading}</p>
        <div className={styles.collabBody}>
          <p>{about?.aboutText?.text}</p>
        </div>
      </FadeUp>

      <FadeUp as="div" className={styles.pairRow}>
        <div className={styles.pairSmall}>
          <div className={styles.pairSmallImage}>
            {pairRow[0]?.image && (
              <Image src={imageUrl(pairRow[0].image, 900)} alt="Studio fitting" fill className={styles.image} />
            )}
          </div>
          <p className={styles.caption}>{pairRow[0]?.caption}</p>
        </div>
        <div className={styles.pairLarge}>
          {pairRow[1]?.image && (
            <Image
              src={imageUrl(pairRow[1].image, 1600)}
              alt="Collection I, studio portrait"
              fill
              className={styles.image}
            />
          )}
          <div className={styles.pairTint} aria-hidden="true" />
        </div>
      </FadeUp>

      <FadeUp as="section" className={styles.bioRow}>
        <div className={styles.bioPortrait}>
          <div className={styles.bioPortraitImage}>
            {bioBlock?.image && (
              <Image src={imageUrl(bioBlock.image, 500)} alt="Michael Stukan" fill className={styles.image} />
            )}
          </div>
          <p className={styles.caption}>I / III — michael stukan</p>
        </div>
        <p className={styles.bioText}>{bioBlock?.text}</p>
      </FadeUp>

      <FadeUp as="section" className={styles.wideModule}>
        <EditorialCarousel
          images={(wideBlock?.images || []).map((image) => ({
            src: imageUrl(image, 1600),
            alt: "Studio process",
          }))}
          total="II"
          captionText={wideBlock?.caption}
          spacer={SPACER}
          frameClassName={styles.wideImage}
          captionClassName={styles.caption}
          imageClassName={styles.image}
        />
      </FadeUp>

      <FadeUp>
        <PressSection images={pressImages} press={press} />
      </FadeUp>

      <FadeUp as="section" className={styles.stockists}>
        <p className={styles.stockistsLabel}>Stockists</p>
        <div className={styles.stockistsList}>
          <div className={styles.divider} />
          {stockists.map((stockist) => (
            <div key={`${stockist.city}-${stockist.name}`}>
              {/* External destination (each stockist's own site), not an
                  internal route — a plain <a>, not next/link, is the right
                  tool here. */}
              <a
                href={stockist.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.stockistLink}
              >
                <div className={styles.stockistRow}>
                  <p className={styles.stockistCity}>{stockist.city?.toLowerCase()}</p>
                  <p className={styles.stockistCountry}>{stockist.country?.toLowerCase()}</p>
                  <p className={styles.stockistStore}>{stockist.name?.toLowerCase()}</p>
                  <p className={styles.stockistArrow} aria-hidden="true">
                    ›
                  </p>
                </div>
              </a>
              <div className={styles.divider} />
            </div>
          ))}
        </div>
      </FadeUp>
    </main>
  );
}
