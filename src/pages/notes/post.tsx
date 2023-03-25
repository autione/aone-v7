import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/Button";
import { useModalsContext } from "../../components/contexts/Modals";

import Icon from "../../components/Icon";
import Markdown from "../../components/Markdown";
import styles from "../../styles/Notes.module.scss";

export default function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const [views, setViews] = useState<boolean[]>([true, true]);

  const modalsContext = useModalsContext();
  const router = useRouter();

  const SnippetContent = () => (
    <div className={styles.infoContent}>
      <section>
        <h2>
          <Icon i="article" /> Callouts
        </h2>
        <code>
          &lt;div class=&quot;callout&quot;&gt;
          <br />
          &lt;i class=&quot;icon&quot;&gt;article&lt;/i&gt;
          <br />
          &lt;main&gt;
          <br />
          &lt;b&gt;Callout Title&lt;/b&gt;
          <br />
          &lt;span&gt;Callout Description&lt;/span&gt;
          <br />
          &lt;/main&gt;
          <br />
          &lt;/div&gt;
        </code>
        <small>
          <b>Additional class names:</b> info · success · warning · danger
        </small>
      </section>

      <section>
        <h2>
          <Icon i="format_quote" /> Quotes
        </h2>
        <code>
          &lt;blockquote&gt;
          <br />
          Citation Content&lt;br/&gt;
          <br />
          &lt;small style=&quot;opacity: 0.65;&quot;&gt;Citation Author&lt;/small&gt;
          <br />
          &lt;/blockquote&gt;
        </code>
        <small>
          <b>Additional class names:</b> info · success · warning · danger
        </small>
      </section>

      <section>
        <h2>
          <Icon i="shape_line" /> Icons
        </h2>
        <code>&lt;i class=&quot;icon&quot;&gt;...&lt;/i&gt;</code>
      </section>
    </div>
  );

  const PublishContent = () => {
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [hidden, setHidden] = useState(false);

    return (
      <div className={styles.infoContent}>
        <section>
          <h2>Password</h2>
          <input
            type="password"
            placeholder="Type it here..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>

        <div className={styles.buttonActions}>
          <Button
            disabled={disabled}
            onClick={() => {
              setDisabled(true);

              fetch("/api/notes/publish", {
                method: "POST",
                headers: {
                  authorization: password,
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  title,
                  description,
                  content,
                  hidden,
                }),
              })
                .then((r) => r.json())
                .then((data) => {
                  if (!data.success) {
                    console.error(data);
                    return modalsContext.data.set({
                      icon: <Icon i="send" />,
                      title: "Publish » Failed",
                      content: (
                        <>
                          <p>
                            Server returned an error: {data.error}.
                            {data.message && (
                              <>
                                <br />
                                Message: {data.message}
                              </>
                            )}
                          </p>
                        </>
                      ),
                    });
                  }

                  router.push(`/notes/${data.id}`);
                  modalsContext.visible.set(false);
                })
                .catch((err) => {
                  console.error("Failed to request publish", err);
                  modalsContext.data.set({
                    icon: <Icon i="send" />,
                    title: "Publish » Failed",
                    content: (
                      <>
                        <p>A fetch error occurred while publishing. Check console for more details.</p>
                      </>
                    ),
                  });
                });
            }}
            fullWidth
          >
            Publish note
          </Button>

          <Button disabled={disabled} onClick={() => setHidden(!hidden)} fullWidth>
            <Icon i={hidden ? "lock" : "public"} />
            {hidden ? "Private" : "Public"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <section className={styles.topBar}>
        <h1>
          <Icon i="article" /> Write a new blog post
        </h1>

        <menu className={styles.actions}>
          <section>
            <b>
              Views <li />
            </b>
            <span>
              <button onClick={() => setViews([true, false])} className={views[0] && !views[1] ? styles.selected : ""}>
                <Icon i="edit" />
              </button>
              <button onClick={() => setViews([false, true])} className={views[1] && !views[0] ? styles.selected : ""}>
                <Icon i="visibility" />
              </button>
              <button onClick={() => setViews([true, true])} className={views[0] && views[1] ? styles.selected : ""}>
                <Icon i="vertical_split" />
              </button>
            </span>
          </section>

          <section>
            <b>
              Actions <li />
            </b>
            <span>
              <button
                onClick={() => {
                  modalsContext.show(
                    {
                      icon: <Icon i="code" />,
                      title: "Snippets",
                      content: <SnippetContent />,
                    },
                    {
                      accent: "#ffffff",
                      background: "#222",
                    }
                  );
                }}
              >
                <Icon i="code" />
              </button>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    const a = document.createElement("a");
                    const blob = new Blob([content], { type: "text/markdown" });
                    const object = URL.createObjectURL(blob);

                    a.href = object;
                    a.download = title || "Untitled Article";
                    a.click();

                    a.remove();
                    URL.revokeObjectURL(object);
                  }
                }}
              >
                <Icon i="save" />
              </button>
              <button
                onClick={() => {
                  modalsContext.show(
                    {
                      icon: <Icon i="send" />,
                      title: "Publish",
                      content: <PublishContent />,
                    },
                    {
                      accent: "#ffffff",
                      background: "#222",
                    }
                  );
                }}
              >
                <Icon i="send" />
              </button>
            </span>
          </section>
        </menu>
      </section>

      <header>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title ~ Lorem ipsum dolor"
          className={styles.title}
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description ~ The quick brown fox jumped over the lazy dog"
          className={styles.description}
        />
      </header>

      <main
        className={`${styles.writeView} ${(views[0] && !views[1]) || (views[1] && !views[0]) ? styles.single : ""}`}
      >
        {views[0] && (
          <>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          </>
        )}

        {views[1] && (
          <>
            <section className={styles.preview}>
              <Markdown>{content}</Markdown>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
