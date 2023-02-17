import { ReactNode } from "react";

import styles from "../styles/components/Button.module.scss";

interface Props {
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "reduced" | "normal";
  colors?: string[];
}

export default function Button({
  children,
  icon,
  fullWidth,
  onClick,
  disabled,
  variant,
  colors,
}: Props) {
  const _variant = variant || "normal";

  return (
    <button
      style={
        {
          ...(colors && colors[0]
            ? {
                "--accent": colors[0],
                "--shadow-accent": `${colors[0]}66`,
              }
            : {}),
          ...(colors && colors[1] ? { "--background": colors[1] } : {}),
        } as any
      }
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${styles[_variant]} ${
        fullWidth ? styles.extend : ""
      }`}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}
