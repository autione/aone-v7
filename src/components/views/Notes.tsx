import Link from "next/link";

import Icon from "../Icon";
import Alert from "../Alert";

import { Post } from "../../types";

import styles from "../../styles/components/views/Notes.module.scss";

export default function NotesContent({ posts }: { posts: Post[] }) {
  const colors = {
    accent: "#fff281",
    background: "#2e2b16",
  };

  return (
    <>
      <p>Consider this being some sort of blog, where I post ocasional thoughts and random stuff!</p>
      <p>
        This window only shows the last 5 most recent posts. In case you want to see all of them in a list, check out
        the {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/notes" style={{ color: colors.accent }}>
          notes index
        </a>
        .
      </p>

      {posts &&
        posts.length > 0 &&
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
                  <li>
                    <i>
                      <Icon i="visibility" />
                    </i>
                    {post.views || 0} view{post.views === 1 ? "" : "s"}
                  </li>
                </ul>
              </main>
            </a>
          </Link>
        ))}
    </>
  );
}
