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
        Sorted by most preferred to least preferred. Click a card to visit the page.
      </p>
      <a href="https://discord.com/users/226484318959173632" rel="noreferrer" target="_blank">
        <div className={styles.socialCard}>
          <i>
            <img src="/brands/discord.svg" alt="Discord Logo" />
            {avatars.discord && <Image className={styles.avatar} src={avatars.discord} alt="Discord Profile Picture" layout="fill" />}
          </i>
          <main className={styles.content}>
            <span className={styles.textContent}>
              <span className={styles.title}>Discord</span>
              @autione
            </span>
          </main>
        </div>
      </a>
      <a href="https://matrix.to/#/@autione:envs.net" rel="noreferrer" target="_blank">
        <div className={styles.socialCard}>
          <i>
            <img src="/brands/matrix.svg" alt="Matrix Logo" />
            {avatars.matrix && <Image className={styles.avatar} src={avatars.matrix} alt="Matrix Profile Picture" layout="fill" />}
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
      <a href="https://github.com/AutiOne" rel="noreferrer" target="_blank">
        <div className={styles.socialCard}>
          <i>
            <img src="/brands/github.svg" alt="GitHub Logo" />
            {avatars.github && <Image className={styles.avatar} src={avatars.github} alt="GitHub Profile Picture" layout="fill" />}
          </i>
          <main className={styles.content}>
            <span className={styles.textContent}>
              <span className={styles.title}>GitHub</span>
              AutiOne
            </span>
          </main>
        </div>
      </a>
      <a href="https://mastodon.social/@autione@mastodon.social" rel="noreferrer" target="_blank">
        <div className={styles.socialCard}>
          <i>
            <img src="/brands/mastodon.svg" alt="Mastodon Logo" />
            {avatars.mastodon && <Image className={styles.avatar} src={avatars.mastodon} alt="Mastodon Profile Picture" layout="fill" />}
          </i>
          <main className={styles.content}>
            <span className={styles.textContent}>
              <span className={styles.title}>Mastodon</span>
              autione@mastodon.social
            </span>
          </main>
        </div>
      </a>
      <a href="https://ch.tetr.io/u/autione" rel="noreferrer" target="_blank">
        <div className={styles.socialCard}>
          <i>
            <img src="/brands/tetrio-mono.svg" alt="TETR.IO Logo" />
          </i>
          <main className={styles.content}>
            <span className={styles.textContent}>
              <span className={styles.title}>TETR.IO</span>
              <span>
                AUTIONE <small>(not really a social profile lol)</small>
              </span>
            </span>
          </main>
        </div>
      </a>
      <a href="https://reddit.com/u/FiveManiaFifty" rel="noreferrer" target="_blank">
        <div className={styles.socialCard}>
          <i>
            <img src="/brands/reddit.svg" alt="Reddit Logo" />
          </i>
          <main className={styles.content}>
            <span className={styles.textContent}>
              <span className={styles.title}>Reddit</span>
              u/FiveManiaFifty
            </span>
          </main>
        </div>
      </a>
      <div className={`${styles.socialCard} ${styles.noElevation}`}>
        <i>
          <img src="/brands/mail.svg" alt="Envelope Icon" />
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
