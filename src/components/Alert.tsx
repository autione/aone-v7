import { ReactNode } from "react";

import styles from "../styles/components/Alert.module.scss";

interface Props {
  children: ReactNode;
  icon?: ReactNode;
  color?: string;
}

export default function Alert({ children, icon, color }: Props) {
  return (
    <div
      style={
        {
          ...(color
            ? {
                "--accent": color,
                "--background": `${color}33`,
              }
            : {}),
        } as any
      }
      className={styles.alert}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </div>
  );
}
