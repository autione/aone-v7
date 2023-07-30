import styles from "../../styles/components/views/Changelog.module.scss";

export default function ChangelogContent({ version }: { version: string }) {
  const colors = {
    accent: "#ad82ff",
    background: "#26193d",
  };

  return (
    <>
      <p>
        You are on <b style={{ color: colors.accent }}>{version}</b>, and the main changes on this version were:
      </p>
      <ul className={styles.list}>
        <li>
          <label>Spotify chip now displays private sessions, podcast listening and inactive sessions properly;</label>
        </li>
        <li>
          <label>Replaced Twitter (or X, idk lol) with Mastodon;</label>
        </li>
        <li>
          <label>Sorted socials by most preferred to least preferred;</label>
        </li>
        <li>
          <label>Socials with avatars now animate slightly differently;</label>
        </li>
        <li>
          <label>
            Site analytics are now collected using Vercel Web Analytics;
            <br />
            <small>
              It only contains basic visit data, for making up interesting data such as how many people are visting, and what are they looking for on the
              website.{" "}
              <u>
                <a href="https://vercel.com/docs/concepts/analytics/privacy-policy">Privacy policy</a>
              </u>
            </small>
          </label>
        </li>
      </ul>
    </>
  );
}
