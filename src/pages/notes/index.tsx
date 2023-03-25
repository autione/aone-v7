import styles from "../../styles/Notes.module.scss";

import Link from "next/link";

import { Post } from "../../types";
import Icon from "../../components/Icon";

import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { firebaseConfig } from "../../config";

export default function NotesContent({ posts }: { posts: Post[] }) {
  return (
    <div className={styles.container}>
      <section className={styles.topBar}>
        <h1>
          <Icon i="folder_open" /> Post index
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "var(--accent)",
          }}
        >
          {posts.length} post(s) found.{" "}
          <Link href="/">
            <u style={{ cursor: "pointer" }}>Go back to home</u>
          </Link>
        </p>
      </section>

      <main className={styles.postGrid}>
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
                      {new Date(post.created_at || 0).toLocaleDateString(["en-UK"], {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </li>
                    <li>
                      <i>
                        <Icon i="schedule" />
                      </i>
                      {new Date(post.created_at || 0).toLocaleTimeString(["en-UK"], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </li>
                    {post.hidden && (
                      <li>
                        <i>
                          <Icon i="visibility_off" />
                        </i>
                      </li>
                    )}
                  </ul>
                </main>
              </a>
            </Link>
          ))}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);

  try {
    const ref = query(collection(db, "notes"), orderBy("created_at", "desc"));
    const snap = await getDocs(ref);

    let data: Post[] = [];
    snap.forEach((e) => {
      const info = e.data() as Post;
      if (!info.hidden) data.push({ ...info, id: e.id });
    });

    return {
      props: { posts: data },
    };
  } catch (err) {
    console.error("Failed to load posts:", err);
    return {
      props: { posts: [] },
    };
  }
}
