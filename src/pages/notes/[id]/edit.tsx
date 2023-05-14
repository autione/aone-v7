import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { useModalsContext } from "../../../components/contexts/Modals";

import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import Markdown from "../../../components/Markdown";

import { Post } from "../../../types";
import { firebaseConfig } from "../../../config";

import styles from "../../../styles/Notes.module.scss";

interface Props {
  post?: Post;
  status?: string[];
}

export default function Edit(props: Props) {
  const [title, setTitle] = useState(props.post?.title || "");
  const [description, setDescription] = useState(props.post?.description || "");
  const [content, setContent] = useState(props.post?.content || "");

  const [views, setViews] = useState<boolean[]>([true, true]);

  const modalsContext = useModalsContext();
  const router = useRouter();

  const EditContent = ({ mode }: { mode: "edit" | "delete" }) => {
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [hidden, setHidden] = useState(props.post?.hidden || false);

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

        {mode === "edit" ? (
          <div className={styles.buttonActions}>
            <Button
              disabled={disabled}
              onClick={() => {
                setDisabled(true);

                fetch(`/api/notes/${props.post?.id || router.query.id}`, {
                  method: "PUT",
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
                        icon: <Icon i="edit" />,
                        title: "Edit » Failed",
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

                    router.push(`/notes/${router.query.id}`);
                    modalsContext.visible.set(false);
                  })
                  .catch((err) => {
                    console.error("Failed to request edit", err);
                    modalsContext.data.set({
                      icon: <Icon i="edit" />,
                      title: "Edit » Failed",
                      content: (
                        <>
                          <p>A fetch error occurred while editing. Check console for more details.</p>
                        </>
                      ),
                    });
                  });
              }}
              fullWidth
            >
              Edit note
            </Button>

            <Button disabled={disabled} onClick={() => setHidden(!hidden)} fullWidth>
              <Icon i={hidden ? "lock" : "public"} />
              {hidden ? "Private" : "Public"}
            </Button>
          </div>
        ) : (
          <Button
            fullWidth
            colors={["#ff4f4f", "#ff4f4f22"]}
            onClick={() => {
              fetch(`/api/notes/${props.post?.id}`, {
                method: "DELETE",
                headers: {
                  authorization: password,
                },
              })
                .then((r) => r.json())
                .then((data) => {
                  if (!data.success) {
                    console.error(data);
                    return modalsContext.data.set({
                      icon: <Icon i="delete" />,
                      title: "Delete » Failed",
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

                  router.push("/");
                  modalsContext.visible.set(false);
                })
                .catch((err) => {
                  console.error("Failed to request delete", err);
                  modalsContext.data.set({
                    icon: <Icon i="delete" />,
                    title: "Delete » Failed",
                    content: (
                      <>
                        <p>A fetch error occurred while deleting. Check console for more details.</p>
                      </>
                    ),
                  });
                });
            }}
          >
            Delete note
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <section className={styles.topBar}>
        <h1>
          <Icon i="article" /> Manage blog post
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
                      icon: <Icon i="delete" />,
                      title: "Delete",
                      content: <EditContent mode="delete" />,
                    },
                    {
                      accent: "#ff4f4f",
                      background: "#311",
                    }
                  );
                }}
              >
                <Icon i="delete" />
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
                      icon: <Icon i="edit" />,
                      title: "Edit",
                      content: <EditContent mode="edit" />,
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

export async function getServerSideProps(context: NextPageContext) {
  context.res?.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=59");

  let post: Post | null = null;
  let status: string[] | null = null;

  // const supabase = createClient(
  //   process.env.SUPABASE_PROJECT_URL as string,
  //   process.env.SUPABASE_SERVICE_KEY as string
  // );

  // const { data, error } = await supabase
  //   .from<Post>("posts")
  //   .select("*")
  //   .eq("id", String(context.query.id))
  //   .limit(1);

  // if (error || !data[0]) {
  //   console.error("Failed to load post", error);
  //   status = [
  //     "Post not found",
  //     "Check if the ID is valid and if the post actually exists.",
  //   ];
  // } else post = data[0] || null;

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);

  const id = String(context.query.id);

  const ref = doc(db, "notes", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    console.error("Post not found");
    status = ["Post not found", "Check if the ID is valid and if the post actually exists."];
  } else {
    const data = snap.data() as Post;
    post = data || null;
  }

  return {
    props: {
      post,
      status,
    },
  };
}
