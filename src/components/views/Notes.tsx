import { useEffect, useState } from "react";

import Button from "../Button";

import styles from "../../styles/components/views/Notes.module.scss";

import Link from "next/link";

import { Post } from "../../types";
import Icon from "../Icon";
import { useModalsContext } from "../contexts/Modals";

import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { firebaseConfig } from "../../config";
import Alert from "../Alert";

export default function NotesContent() {
  const colors = {
    accent: "#fff281",
    background: "#2e2b16",
  };

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);

  const modalsContext = useModalsContext();

  const [status, setStatus] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    setStatus("Loading...");

    try {
      const ref = query(
        collection(db, "notes"),
        orderBy("created_at", "desc"),
        limit(5)
      );
      const snap = await getDocs(ref);

      let data: Post[] = [];
      snap.forEach((e) => data.push({ ...(e.data() as Post), id: e.id }));

      setPosts(data);
      if (data.length <= 0) setStatus("There aren't any notes. So empty...");
      else setStatus("");
    } catch (err) {
      console.error("Failed to load posts:", err);
      setStatus("Failed to load posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const AllPostsContent = () => {
    const [status, setStatus] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
      (async () => {
        setStatus("Loading...");

        try {
          const ref = query(
            collection(db, "notes"),
            orderBy("created_at", "desc")
          );
          const snap = await getDocs(ref);

          let data: Post[] = [];
          snap.forEach((e) => data.push({ ...(e.data() as Post), id: e.id }));

          setPosts(data);
          if (data.length <= 0)
            setStatus("There aren't any notes. So empty...");
          else
            setStatus(
              `Found ${data.length} post${data.length === 1 ? "" : "s"}`
            );
        } catch (err) {
          console.error("Failed to load posts:", err);
          setStatus("Failed to load posts.");
        }
      })();
    }, []);

    return (
      <>
        {status && (
          <p
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "var(--accent)",
            }}
          >
            {status}
          </p>
        )}

        {posts.map((post) => (
          <Link href={`/notes/${post.id}`} key={post.id}>
            <a className={styles.postCard}>
              <i>
                <Icon i="newspaper" />
              </i>
              <main>
                <span className={styles.textContent}>
                  <b className={styles.title}>{post.title}</b>
                  <span>{post.description}</span>
                </span>
                <ul>
                  <li>
                    <i>
                      <Icon i="calendar_month" />
                    </i>
                    {new Date(post.created_at || 0).toLocaleDateString(
                      ["en-UK"],
                      { day: "numeric", month: "short", year: "numeric" }
                    )}
                  </li>
                  <li>
                    <i>
                      <Icon i="schedule" />
                    </i>
                    {new Date(post.created_at || 0).toLocaleTimeString(
                      ["en-UK"],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZoneName: "shortOffset",
                      }
                    )}
                  </li>
                </ul>
              </main>
            </a>
          </Link>
        ))}
      </>
    );
  };

  return (
    <>
      <div className={styles.actions}>
        <Button
          onClick={() =>
            modalsContext.show(
              {
                title: "Notes » All",
                content: <AllPostsContent />,
                icon: <Icon i="folder" />,
              },
              colors
            )
          }
          colors={[colors.accent, colors.background]}
          fullWidth
          disabled={posts.length <= 4}
        >
          View all
        </Button>

        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/notes" style={{ width: "100%" }}>
          <Button colors={[colors.accent, colors.background]} fullWidth>
            Open index
          </Button>
        </a>
      </div>

      {posts.length > 0 &&
        posts.map((post) => (
          <Link href={`/notes/${post.id}`} key={post.id}>
            <a className={styles.postCard}>
              <i>
                <Icon i="newspaper" />
              </i>
              <main>
                <span className={styles.textContent}>
                  <b className={styles.title}>{post.title}</b>
                  <span>{post.description}</span>
                </span>
                <ul>
                  <li>
                    <i>
                      <Icon i="calendar_month" />
                    </i>
                    {new Date(post.created_at || 0).toLocaleDateString(
                      ["en-UK"],
                      { day: "numeric", month: "short", year: "numeric" }
                    )}
                  </li>
                  <li>
                    <i>
                      <Icon i="schedule" />
                    </i>
                    {new Date(post.created_at || 0).toLocaleTimeString(
                      ["en-UK"],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZoneName: "shortOffset",
                      }
                    )}
                  </li>
                </ul>
              </main>
            </a>
          </Link>
        ))}

      {status && (
        <p
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "var(--accent)",
          }}
        >
          {status}
        </p>
      )}

      <noscript>
        <Alert color={colors.accent} icon={<Icon i="warning" />}>
          This window needs JavaScript to work.
        </Alert>
        <span style={{ color: "var(--accent)", textAlign: "center" }}>
          Alternatively, you can open the index without needing to enable
          JavaScript.
        </span>
      </noscript>
    </>
  );
}
