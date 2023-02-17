import styles from "../../styles/components/views/Changelog.module.scss";

export default function ChangelogContent({ version }: { version: string }) {
  const colors = {
    accent: "#ad82ff",
    background: "#26193d",
  };

  return (
    <>
      <p>
        You are on <b style={{ color: colors.accent }}>{version}</b>, and the
        main changes on this version were:
      </p>
      <ul className={styles.list}>
        <li>
          <label>Fixed popup header background</label>
        </li>
        <li>
          <label>
            Interests window tooltip images now wrap if they exceed the
            container width
          </label>
        </li>
        <li>
          <label>Added fun little hidden stuff</label>
        </li>
      </ul>
    </>
  );
}
