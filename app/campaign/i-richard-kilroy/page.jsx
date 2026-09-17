import Image from "next/image";
import Link from "next/link";
import CaptionToggle from "@/components/CaptionToggle";
import FadeUp from "@/components/FadeUp";
import styles from "./page.module.css";

export default function Campaign() {
  return (
    <main className={styles.campaign}>
      <div className={styles.essay}>
        <FadeUp as="div" className={styles.full}>
          <Image
            src="/592f5b2b5ed256ef69b0355ff34e513a61124165.png"
            alt="Collection I SS27 campaign"
            fill
            priority
            className={styles.image}
          />
        </FadeUp>

        <FadeUp as="div" className={styles.alignEnd}>
          <div className={styles.portrait}>
            <Image
              src="/b5d235f0332967a0d94c2f1e7ed397908fc2e2f9.png"
              alt="Collection I SS27 campaign"
              fill
              className={styles.image}
            />
            <CaptionToggle caption="Actor Jack Wolfe wears the jacquard dress and blazer" />
          </div>
        </FadeUp>

        <FadeUp as="div" className={styles.fullVideo}>
          <video
            src="/hangschlitt_1772558028_3844815316450830777_18128197641.mp4"
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
          />
        </FadeUp>

        <FadeUp as="div" className={styles.alignCenter}>
          <div className={styles.portrait}>
            <Image
              src="/12aa74b4aef63a6db0812d7831d9a166e7bde6b2.png"
              alt="Collection I SS27 campaign"
              fill
              className={styles.image}
            />
            <CaptionToggle caption="Geoffrey Amadi, Elin Voss, Marcus Chen, Ingrid Solberg and Tobias Renner wear Collection I, SS27" />
          </div>
        </FadeUp>

        <FadeUp as="div" className={styles.halfRow}>
          <div className={styles.halfVideo}>
            <video
              src="/driesvannoten_1769261695_3817166014316823011_281383630.mp4"
              className={styles.video}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <div className={`${styles.portrait} ${styles.halfStill}`}>
            <Image
              src="/cacfb78687cb067fe1db807a56f38e0863350dcc.png"
              alt="Collection I SS27 campaign"
              fill
              className={styles.image}
            />
          </div>
        </FadeUp>

        <FadeUp as="div" className={styles.alignStart}>
          <div className={styles.wide}>
            <Image
              src="/99061b993677557089035dde969fd6aaa33effb1.png"
              alt="Collection I SS27 campaign"
              fill
              className={styles.image}
            />
            <CaptionToggle side="right" caption="Tobias Renner wears the painted silk skirt" />
          </div>
        </FadeUp>

        <FadeUp as="div" className={styles.fullVideoInset}>
          <video
            src="/driesvannoten_1775210400_3866544573632005601_281383630.mp4"
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className={styles.insetVideoFrame}>
            <video
              src="/driesvannoten_1772795563_3846810326637750148_281383630.mp4"
              className={styles.video}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </FadeUp>

        <FadeUp as="div" className={styles.alignCenter}>
          <div className={styles.portrait}>
            <Image
              src="/9eadeeefd4546bcfd5f7836b052dd3215272063a.png"
              alt="Collection I SS27 campaign"
              fill
              className={styles.image}
            />
            <CaptionToggle caption="Aya Fujimoto wears the draped cape dress" />
          </div>
        </FadeUp>

        <FadeUp as="div" className={styles.alignEnd}>
          <div className={styles.portrait}>
            <Image
              src="/3f7eee2323a02b2af9ac47a6801c38cdf82a2d43.png"
              alt="Collection I SS27 campaign"
              fill
              className={styles.image}
            />
            <CaptionToggle caption="Marcus Chen wears the tailored blazer and skirt" />
          </div>
        </FadeUp>

        <FadeUp as="div" className={styles.halfRow}>
          <div className={styles.halfVideo}>
            <video
              src="/driesvannoten_1772795563_3846810326637750148_281383630.mp4"
              className={styles.video}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <div className={`${styles.portrait} ${styles.halfStill}`}>
            <Image
              src="/af15889fc55f7a2018137c2d84be6d3bd155c702.png"
              alt="Collection I SS27 campaign"
              fill
              className={styles.image}
            />
          </div>
        </FadeUp>

        <FadeUp as="div" className={styles.fullVideo}>
          <video
            src="/driesvannoten_1769535781_3819465270675437087_281383630.mp4"
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
          />
        </FadeUp>

        <FadeUp as="div" className={styles.alignCenter}>
          <div className={styles.portrait}>
            <Image
              src="/001f208c1e5a801666a6008d35775fcb6c82fc30.png"
              alt="Collection I SS27 campaign"
              fill
              className={styles.image}
            />
            <CaptionToggle side="right" caption="Ingrid Solberg wears the lace slip dress" />
          </div>
        </FadeUp>

        <div className={styles.full}>
          <Image
            src="/d15d9818746ff7ca75a456c60e9f88a97a4b0aa0.png"
            alt="Collection I SS27 campaign"
            fill
            className={styles.image}
          />
        </div>
      </div>

      <FadeUp as="p" className={styles.credits}>
        credits — photography Otto Lang · hair Marisol Duarte · makeup Priya
        Anand · styling Théo Marchetti · assistance by Sam Okafor, Nadia
        Reyes, Luca Bianchi · location Villa Serena, Lake Como · talent
        Geoffrey Amadi, Elin Voss, Marcus Chen, Ingrid Solberg, Tobias
        Renner, Aya Fujimoto · special thanks Studio CGT, the Kilroy estate,
        Hangschlitt Archive
      </FadeUp>

      <FadeUp as="div" className={styles.ctaRow}>
        <p className={styles.ctaLabel}>
          I. <span>Richard Kilroy</span>
        </p>
        <Link href="/collection/i-richard-kilroy" className={styles.ctaLink}>
          View the collection <span aria-hidden="true">›</span>
        </Link>
      </FadeUp>
    </main>
  );
}
