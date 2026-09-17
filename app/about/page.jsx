import Image from "next/image";
import PressSection from "@/components/PressSection";
import FadeUp from "@/components/FadeUp";
import EditorialCarousel from "@/components/EditorialCarousel";
import styles from "./page.module.css";

// Matches the literal-space run used by the Collection page's editorial
// captions, to keep the numeral-to-text gap identical.
const SPACER = "            ";

const stockists = [
  { city: "London", country: "UK", store: "Liberty London", url: "https://www.libertylondon.com" },
  { city: "London", country: "UK", store: "Dover Street", url: "https://london.doverstreetmarket.com" },
  { city: "Berlin", country: "DE", store: "VOO Store", url: "https://voostore.com" },
  { city: "Madrid", country: "SP", store: "Ekseption", url: "https://www.ekseption.com" },
  { city: "NYC", country: "USA", store: "Assembly", url: "https://www.assemblynewyork.com" },
];

export default function About() {
  return (
    <main className={styles.about}>
      <FadeUp as="section" className={styles.intro}>
        <p className={styles.introText}>
          Founded by Michael Stukan in 2026, Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Phasellus varius tempor fringilla.
          Vestibulum id purus quis purus convallis condimentum. Vestibulum et
          semper nulla. In eu ante quis augue mollis vehicula semper id
          risus. Aliquam mauris urna, bibendum a sem sollicitudin.
        </p>
        <div className={styles.introImage}>
          <Image
            src="/937f452742e5ae86fcbd719a56ce9a6e8fa1ca53.png"
            alt="Michael Stukan, studio portrait"
            fill
            priority
            className={styles.image}
          />
        </div>
      </FadeUp>

      <FadeUp as="section" className={styles.collabRow}>
        <p className={styles.collabLabel}>Artist collaborations</p>
        <div className={styles.collabBody}>
          <p>
            Lorem ipsum dolor sit amet, consectetur varius to adipiscing
            elit. Phasellus varius tempor fringilla. Vestibulum id wit purus
            quis purus convallis condimentum. Vestibulum et semper to nulla.
            In eu ante quis augue mollis vehicula semper id risus. Aliquam
            mauris urna, bibendum a sem sollicitudin, lacinia tristique
            nulla. Aenean at mauris ac ante vestibulum placerat. Lorem ipsum
            dolor sit amet, consectetur varius to adipiscing elit. Phasellus
            varius tempor fringilla. Vestibulum id wit purus quis purus
            convallis condimentum. Vestibulum et semper to nulla. In eu ante
            quis augue mollis vehicula semper id risus. Aliquam mauris urna.
          </p>
        </div>
      </FadeUp>

      <FadeUp as="div" className={styles.pairRow}>
        <div className={styles.pairSmall}>
          <div className={styles.pairSmallImage}>
            <Image
              src="/810e6f402ef0c401acd416ccd3810a0131ec8715.png"
              alt="Studio fitting"
              fill
              className={styles.image}
            />
          </div>
          <p className={styles.caption}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className={styles.pairLarge}>
          <Image
            src="/lookbook-strip-01.png"
            alt="Collection I, studio portrait"
            fill
            className={styles.image}
          />
          <div className={styles.pairTint} aria-hidden="true" />
        </div>
      </FadeUp>

      <FadeUp as="section" className={styles.bioRow}>
        <div className={styles.bioPortrait}>
          <div className={styles.bioPortraitImage}>
            <Image
              src="/9960d39ffdd55438198ee5c1b8a311cd1d2b6bbe.png"
              alt="Michael Stukan"
              fill
              className={styles.image}
            />
          </div>
          <p className={styles.caption}>I / III — michael stukan</p>
        </div>
        <p className={styles.bioText}>
          Michael Stukan is a menswear designer in London and a graduate of
          Central Saint Martins whose work is driven by a fundamentally
          conceptual ideal. He seeks to reappropriate ideas from womenswear,
          placing these shapes, fabrications and finishings on a man&rsquo;s
          body. His practice is founded upon continual collaboration with
          interdisciplinary artists, designers, and practitioners. He has
          worked for JW Anderson, Ludovic de Saint Sernin and Gareth Pugh,
          and alongside dancers from the Royal Ballet, Hofesh Shechter
          Company, Lucinda Childs Dance Company and the Los Angeles Ballet,
          among others. He has been featured in Hero Magazine and The Face,
          on British Vogue, i-D and Kaltblut Magazine, and his work has been
          on display at the Lethaby Gallery.
        </p>
      </FadeUp>

      <FadeUp as="section" className={styles.wideModule}>
        <EditorialCarousel
          images={[
            {
              src: "/51ecd9127db5309a6bf137bb8fa1be17641f3e6e.png",
              alt: "Studio process",
            },
            { src: "/lookbook-strip-04.png", alt: "Collection I look" },
          ]}
          total="II"
          captionText="Toiles pinned and unpinned, over and over, until the line felt right."
          spacer={SPACER}
          frameClassName={styles.wideImage}
          captionClassName={styles.caption}
          imageClassName={styles.image}
        />
      </FadeUp>

      <FadeUp>
        <PressSection />
      </FadeUp>

      <FadeUp as="section" className={styles.stockists}>
        <p className={styles.stockistsLabel}>Stockists</p>
        <div className={styles.stockistsList}>
          <div className={styles.divider} />
          {stockists.map((stockist) => (
            <div key={`${stockist.city}-${stockist.store}`}>
              {/* External destination (each stockist's own site), not an
                  internal route — a plain <a>, not next/link, is the right
                  tool here. */}
              <a
                href={stockist.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.stockistLink}
              >
                <div className={styles.stockistRow}>
                  <p className={styles.stockistCity}>{stockist.city.toLowerCase()}</p>
                  <p className={styles.stockistCountry}>{stockist.country.toLowerCase()}</p>
                  <p className={styles.stockistStore}>{stockist.store.toLowerCase()}</p>
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
