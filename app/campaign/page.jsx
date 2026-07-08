import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Campaign() {
  return (
    <main className={styles.campaign}>
      <div className={styles.essay}>
        <div className={styles.full}>
          <Image
            src="/592f5b2b5ed256ef69b0355ff34e513a61124165.png"
            alt="Collection I SS27 campaign"
            fill
            priority
            className={styles.image}
          />
        </div>

        <div className={styles.alignEnd}>
          <div className={styles.portrait}>
            <Image
              src="/b5d235f0332967a0d94c2f1e7ed397908fc2e2f9.png"
              alt="Collection I SS27 campaign"
              fill
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.alignCenter}>
          <div className={styles.portrait}>
            <Image
              src="/12aa74b4aef63a6db0812d7831d9a166e7bde6b2.png"
              alt="Collection I SS27 campaign"
              fill
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.alignEnd}>
          <div className={styles.portrait}>
            <Image
              src="/cacfb78687cb067fe1db807a56f38e0863350dcc.png"
              alt="Collection I SS27 campaign"
              fill
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.alignStart}>
          <div className={styles.wide}>
            <Image
              src="/99061b993677557089035dde969fd6aaa33effb1.png"
              alt="Collection I SS27 campaign"
              fill
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.alignCenter}>
          <div className={styles.portrait}>
            <Image
              src="/9eadeeefd4546bcfd5f7836b052dd3215272063a.png"
              alt="Collection I SS27 campaign"
              fill
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.alignEnd}>
          <div className={styles.portrait}>
            <Image
              src="/3f7eee2323a02b2af9ac47a6801c38cdf82a2d43.png"
              alt="Collection I SS27 campaign"
              fill
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.alignEnd}>
          <div className={styles.portrait}>
            <Image
              src="/af15889fc55f7a2018137c2d84be6d3bd155c702.png"
              alt="Collection I SS27 campaign"
              fill
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.alignCenter}>
          <div className={styles.portrait}>
            <Image
              src="/001f208c1e5a801666a6008d35775fcb6c82fc30.png"
              alt="Collection I SS27 campaign"
              fill
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.full}>
          <Image
            src="/d15d9818746ff7ca75a456c60e9f88a97a4b0aa0.png"
            alt="Collection I SS27 campaign"
            fill
            className={styles.image}
          />
        </div>
      </div>

      <p className={styles.credits}>
        credits — photography Otto Lang · hair Marisol Duarte · makeup Priya
        Anand · styling Théo Marchetti · assistance by Sam Okafor, Nadia
        Reyes, Luca Bianchi · location Villa Serena, Lake Como · talent
        Geoffrey Amadi, Elin Voss, Marcus Chen, Ingrid Solberg, Tobias
        Renner, Aya Fujimoto · special thanks Studio CGT, the Kilroy estate,
        Hangschlitt Archive
      </p>

      <div className={styles.ctaRow}>
        <p className={styles.ctaLabel}>
          Collection I <span>SS27</span>
        </p>
        <Link href="/collection" className={styles.ctaLink}>
          View the collection <span aria-hidden="true">›</span>
        </Link>
      </div>
    </main>
  );
}
