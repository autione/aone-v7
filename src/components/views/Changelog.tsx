import styles from "../../styles/components/views/Changelog.module.scss";
import Icon from "../Icon";
import { useModalsContext } from "../contexts/Modals";
import PopupComparison from "../extras/PopupComparison";

export default function ChangelogContent({ version }: { version: string }) {
  const colors = {
    accent: "#ad82ff",
    background: "#26193d",
  };

  const modalsContext = useModalsContext();

  return (
    <>
      <p>
        You are on <b style={{ color: colors.accent }}>{version}</b>, and the main changes on this version were:
      </p>
      <ul className={styles.list}>
        <li>
          <label>Minor enhancements and changes to Interests;</label>
        </li>
        <li>
          <label>
            Slight tweaks on the popup window animation,{" "}
            <u
              onClick={() =>
                modalsContext.show(
                  {
                    title: "Comparison",
                    icon: <Icon i="info" />,
                    content: <PopupComparison />,
                  },
                  colors
                )
              }
            >
              view comparison
            </u>
            ;
          </label>
        </li>
        <li>
          <label>
            Fixed footer link to Vercel Analytics&apos;{" "}
            <u>
              <a href="https://vercel.com/docs/concepts/analytics/privacy-policy">privacy policy</a>
            </u>
            .
          </label>
        </li>
      </ul>
    </>
  );
}
