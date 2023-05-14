import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { NextPageContext } from "next";
import Link from "next/link";

import Icon from "../../components/Icon";
import Markdown from "../../components/Markdown";

import styles from "../../styles/Notes.module.scss";

import { Post } from "../../types";
import { firebaseConfig } from "../../config";
import Head from "next/head";

interface Props {
  post?: Post;
  status?: string[];
  readTime?: number;
}

export default function Read(props: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.tip}>
        <section>
          <Icon i="article" /> Notes
        </section>

        <section>
          <Link href="/">
            <a>
              <Icon i="close" />
            </a>
          </Link>
        </section>
      </span>

      {props.post && (
        <>
          <Head>
            <title>{props.post.title} • AutiOne Notes</title>
            <meta name="description" content={props.post.description || "Read this post on AutiOne's notes!"} />

            {/* OpenGraph */}
            <meta name="og:site_name" content="AutiOne Notes" />
            <meta name="og:title" content={props.post.title} />
            <meta name="og:url" content={`https://auti.one/notes/${props.post.id}`} />
            <meta
              name="og:description"
              content={`${props.post.description || "Read this post on AutiOne's notes!"} • ${
                (props.readTime || 0) >= 1 ? Math.ceil(props.readTime || 0) : "<1"
              } minute read`}
            />

            <meta name="og:type" content="article" />

            <meta name="og:article:published_time" content={new Date(props.post.created_at).toISOString()} />
          </Head>
          <header>
            <span className={styles.title}>{props.post.title}</span>
            {props.post.description && <span className={styles.description}>{props.post.description}</span>}
            <ul>
              <li>
                <i>
                  <Icon i="calendar_month" />
                </i>
                {new Date(props.post.created_at || Date.now()).toLocaleDateString(["en-UK"], {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </li>
              <li>
                <i>
                  <Icon i="schedule" />
                </i>
                {new Date(props.post.created_at || Date.now()).toLocaleTimeString(["en-UK"], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </li>
              {props.readTime && (
                <li>
                  <i>
                    <Icon i="hourglass_empty" />
                  </i>
                  {props.readTime >= 1 ? Math.ceil(props.readTime) : "<1"} minute read
                </li>
              )}
              <li>
                <i>
                  <Icon i="visibility" />
                </i>
                {props.post.views} view{props.post.views === 1 ? "" : "s"}
              </li>
              <li>
                <i>
                  <Icon i={props.post.hidden ? "lock" : "public"} />
                </i>
                {props.post.hidden ? "Private" : "Public"}
              </li>
            </ul>
          </header>

          <main className={styles.content}>
            <Markdown>{props.post.content}</Markdown>
          </main>
        </>
      )}
      {props.status && (
        <main className={styles.content}>
          <div className="callout danger">
            <i className="icon">error</i>
            <main>
              <b>{props.status[0]}</b>
              <span>{props.status[1]}</span>
            </main>
          </div>
        </main>
      )}
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  context.res?.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=59");

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
  //     "Yeah, bummer. You can try refreshing the page or going to another post, as this one might be unavailable or unexistent. If you're sure this post is valid, try again later.",
  //   ];
  // } else post = data[0] || null;

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);
  const authProvider = getAuth();

  const id = String(context.query.id);

  const ref = doc(db, "notes", id);
  const snap = await getDoc(ref);

  let readTime: number = 0;

  if (!snap.exists()) {
    console.error("Post not found");
    status = [
      "Post not found",
      "Yeah, bummer. You can try refreshing the page or going to another post, as this one might be unavailable or unexistent. If you're sure this post is valid, try again later.",
    ];
  } else {
    const data = snap.data();
    const parsed = {
      id,
      title: data.title,
      description: data.description,
      content: data.content,
      created_at: data.created_at,
      hidden: data.hidden || false,
      views: data.views || 0,
    };
    post = parsed || null;

    await signInWithEmailAndPassword(authProvider, String(process.env.FLAKE_USER), String(process.env.FLAKE_PASS));
    updateDoc(ref, {
      views: (data.views || 0) + 1,
    });

    const words = post.content.trim().split(/\s+/).length;
    const time = words / 200; // words / wpm
    readTime = time;
  }

  return {
    props: {
      post,
      status,
      readTime,
    },
  };
}
