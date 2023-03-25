/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import styles from "../../styles/components/views/Socials.module.scss";

export default function SocialsContent({ avatars }: { avatars: { [key: string]: string } }) {
  return (
    <>
      <p>
        If something on this site got you interested in what I do, or you want to stalk me, below you&apos;ll have my most used social media accounts and ways
        to get in touch with me. Beware of randomness.
        <br />
        <br />
        Click a card to visit the page.
      </p>
      <a href="https://twitter.com/AutiOne_" rel="noreferrer" target="_blank">
        <div className={styles.socialCard}>
          <i>
            <img src="/twitter.svg" alt="Twitter Logo" />
            <Image className={styles.avatar} src="/pieces/twitter.svg" alt="Twitter Profile Picture" layout="fill" />
          </i>
          <main className={styles.content}>
            <span className={styles.textContent}>
              <span className={styles.title}>Twitter</span>
              @AutiOne_
            </span>
          </main>
        </div>
      </a>
      <a href="https://reddit.com/u/FiveManiaFifty" rel="noreferrer" target="_blank">
        <div className={styles.socialCard}>
          <i>
            <img src="/reddit.svg" alt="Reddit Logo" />
          </i>
          <main className={styles.content}>
            <span className={styles.textContent}>
              <span className={styles.title}>Reddit</span>
              u/FiveManiaFifty
            </span>
          </main>
        </div>
      </a>
      <a href="https://discord.com/users/226484318959173632" rel="noreferrer" target="_blank">
        <div className={styles.socialCard}>
          <i>
            <img src="/discord.svg" alt="Discord Logo" />
            <Image className={styles.avatar} src={avatars.discord} alt="Discord Profile Picture" layout="fill" />
          </i>
          <main className={styles.content}>
            <span className={styles.textContent}>
              <span className={styles.title}>Discord</span>
              AutiOne#4827
            </span>
          </main>
        </div>
      </a>
      <a href="https://ch.tetr.io/u/autione" rel="noreferrer" target="_blank">
        <div className={styles.socialCard}>
          <i>
            <img src="/tetrio-mono.svg" alt="TETR.IO Logo" />
          </i>
          <main className={styles.content}>
            <span className={styles.textContent}>
              <span className={styles.title}>TETR.IO</span>
              <span>AUTIONE</span>
            </span>
          </main>
        </div>
      </a>
      <a href="https://github.com/AutiOne" rel="noreferrer" target="_blank">
        <div className={styles.socialCard}>
          <i>
            <img src="/github.svg" alt="GitHub Logo" />
            <Image className={styles.avatar} src={avatars.github} alt="GitHub Profile Picture" layout="fill" />
          </i>
          <main className={styles.content}>
            <span className={styles.textContent}>
              <span className={styles.title}>GitHub</span>
              AutiOne
            </span>
          </main>
        </div>
      </a>
      <a href="https://matrix.to/#/@autione:envs.net" rel="noreferrer" target="_blank">
        <div className={styles.socialCard}>
          <i>
            <img src="/matrix.svg" alt="Matrix Logo" />
          </i>
          <main className={styles.content}>
            <span className={styles.textContent}>
              <span className={styles.title}>Matrix</span>
              <span>
                @autione:envs.net <small>(via matrix.to)</small>
              </span>
            </span>
          </main>
        </div>
      </a>
      <div className={`${styles.socialCard} ${styles.noElevation}`}>
        <i>
          <img src="/mail.svg" alt="Envelope Icon" />
        </i>
        <main className={styles.content}>
          <span className={styles.textContent}>
            <span className={styles.title}>E-mail</span>
            <span>
              <span className={styles.reveal}>
                m​e <small style={{ color: "inherit", opacity: 0.75 }}>​[​a​t​]</small> ​​​a​u​t​i​{" "}
                <small style={{ color: "inherit", opacity: 0.75 }}>[​d​o​t​]</small> ​o​n​e
              </span>{" "}
              <small>(hover to reveal)</small>
            </span>
          </span>
        </main>
      </div>
    </>
  );
}
