import Image from "next/image";
import PressSection from "@/components/PressSection";
import FadeUp from "@/components/FadeUp";
import styles from "./page.module.css";

const stockists = [
  { city: "London", country: "UK", store: "Liberty London" },
  { city: "London", country: "UK", store: "Dover Street" },
  { city: "Berlin", country: "DE", store: "VOO Store" },
  { city: "Madrid", country: "SP", store: "Ekseption" },
  { city: "NYC", country: "USA", store: "Assembly" },
];

export default function About() {
  return (
    <main className={styles.about}>
      <section className={styles.intro}>
        <p className={styles.introText}>
          Founded by Michael Stukan in 2026, the studio began as a one-room
          workshop in East London, built around a single idea: that menswear
          could borrow its shape, its softness, its sense of drama, from
          clothes never intended for men at all. Every collection since has
          been a continuation of that argument, made in collaboration with
          artists, dancers, and image-makers who share the same restlessness.
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
      </section>

      <FadeUp as="section" className={styles.collabRow}>
        <p className={styles.collabLabel}>Artist collaborations</p>
        <div className={styles.collabBody}>
          <p>
            Collaboration sits at the centre of the studio&rsquo;s practice.
            Each collection begins not with a mood board but with a
            conversation — an illustrator, a choreographer, a photographer
            invited in before a single pattern is cut.
          </p>
          <p>
            Collection I was shaped by eighteen months of correspondence with
            illustrator Richard Kilroy, whose sketchbooks became the starting
            point for print, embroidery, and silhouette. The resulting
            garments carry his hand as much as ours.
          </p>
          <p>
            Future seasons will continue this pattern: a rotating cast of
            collaborators, each bringing a discipline the studio
            doesn&rsquo;t have on its own.
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
            + Fittings at the Central Saint Martins studio, spring 2026.
          </p>
        </div>
        <div className={styles.pairLarge}>
          <Image
            src="/923069e93063d2dfd897bb0ca8006c1cdfc7fe4a.png"
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
        <div className={styles.wideImage}>
          <Image
            src="/51ecd9127db5309a6bf137bb8fa1be17641f3e6e.png"
            alt="Studio process"
            fill
            className={styles.image}
          />
        </div>
        <p className={styles.caption}>
          I / II — Toiles pinned and unpinned, over and over, until the line
          felt right.
        </p>
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
              <div className={styles.stockistRow}>
                <p className={styles.stockistCity}>{stockist.city.toLowerCase()}</p>
                <p className={styles.stockistCountry}>{stockist.country.toLowerCase()}</p>
                <p className={styles.stockistStore}>{stockist.store.toLowerCase()}</p>
                <p className={styles.stockistArrow} aria-hidden="true">
                  ›
                </p>
              </div>
              <div className={styles.divider} />
            </div>
          ))}
        </div>
      </FadeUp>
    </main>
  );
}
