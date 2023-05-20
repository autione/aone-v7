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
          <label>Slight changes on Fellows&apos; notes;</label>
        </li>
        <li>
          <label>Tiny additions to project list items;</label>
        </li>
        <li>
          <label>Inactive projects are no longer shown by default.</label>
        </li>
      </ul>
    </>
  );
}
