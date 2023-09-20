import { useEffect, useState } from "react";
import styles from "../../styles/components/extras/PopupComparison.module.scss";

export default function PopupComparison() {
  const [show, setShow] = useState(false);

  const Controls = () => (
    <svg width="80" height="20" viewBox="0 0 80 20" fill="#fff" xmlns="http://www.w3.org/2000/svg" className={styles.controls}>
      <path d="M0 12H14V8H0V12Z" />
      <path d="M29 20H42.7157V13.6993H49V0H35.2843V6.30072H29V20ZM37.6977 4.17661H46.5866V11.3126H42.7157V6.30072H37.6977V4.17661ZM31.4134 17.6134V10.4773H40.3023V17.6134H31.4134Z" />
      <path d="M65.8967 18C65.9939 18 66.1398 18 66.2371 17.8813L72 12.0178L77.7629 17.8813C77.8602 18 78.0061 18 78.1033 18C78.2492 18 78.3708 17.9525 78.4438 17.8813L79.8541 16.4807C79.9514 16.3858 80 16.2671 80 16.1484C80 16.0297 79.9514 15.9347 79.8541 15.8398L74.0912 10L79.8541 4.16024C79.9514 4.06528 80 3.97033 80 3.85163C80 3.73294 79.9514 3.61424 79.8541 3.51929L78.4438 2.11869C78.3708 2.04748 78.2492 2 78.1033 2C78.0061 2 77.8602 2 77.7629 2.11869L72 7.9822L66.2371 2.11869C66.1398 2 65.9939 2 65.8967 2C65.7508 2 65.6292 2.04748 65.5562 2.11869L64.1459 3.51929C64.0486 3.61424 64 3.73294 64 3.85163C64 3.97033 64.0486 4.06528 64.1459 4.16024L69.9088 10L64.1459 15.8398C64.0486 15.9347 64 16.0297 64 16.1484C64 16.2671 64.0486 16.3858 64.1459 16.4807L65.5562 17.8813C65.6292 17.9525 65.7508 18 65.8967 18Z" />
    </svg>
  );

  useEffect(() => {
    let _show = structuredClone(show);
    const interval = setInterval(() => {
      _show = !_show;
      setShow(_show);
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <main className={styles.container}>
        <section>
          <div className={`${styles.window} ${styles.before} ${!show ? styles.hide : ""}`}>
            <Controls />
          </div>
          <span>Before</span>
        </section>
        <section>
          <div className={`${styles.window} ${styles.after} ${!show ? styles.hide : ""}`}>
            <Controls />
          </div>
          <span>After</span>
        </section>
      </main>
    </>
  );
}
