/* eslint-disable @next/next/no-img-element */
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import styles from "../styles/components/Markdown.module.scss";

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      className={styles.content}
      components={{
        pre: ({ children }) => <>{children}</>,
        code: ({ node, inline, className, children, ...props }) => {
          const splitted = String(children).split("\n");
          splitted.pop();

          return inline ? (
            <code {...props} className={styles.inlineCode}>
              {children}
            </code>
          ) : (
            <code {...props}>
              {splitted.map((val, i) => (
                <span style={{ whiteSpace: "pre" }} key={i}>
                  {val}
                  <br />
                </span>
              ))}
            </code>
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
      remarkPlugins={[remarkGfm, remarkEmoji, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
    >
      {children}
    </ReactMarkdown>
  );
}
