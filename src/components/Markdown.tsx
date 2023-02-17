import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import rehypeRaw from "rehype-raw";

import styles from "../styles/components/Markdown.module.scss";

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      className={styles.content}
      components={{
        pre: ({ children }) => <>{children}</>,
        code: ({ node, inline, className, children, ...props }) => {
          return inline ? (
            <code {...props} className={styles.inlineCode}>
              {children}
            </code>
          ) : (
            <code {...props}>{children}</code>
          );
        },
        img: ({ src, alt, ...props }) => {
          return (
            <span className={styles.imageWrapper}>
              <img src={src} alt={alt} {...props} />
              <small>{alt}</small>
            </span>
          );
        },
      }}
      remarkPlugins={[remarkGfm, remarkEmoji]}
      rehypePlugins={[rehypeRaw]}
    >
      {children}
    </ReactMarkdown>
  );
}
