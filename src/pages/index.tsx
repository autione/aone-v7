/* eslint-disable @next/next/no-img-element */
import { NextPageContext } from "next";
import { useEffect, useState } from "react";

import Icon from "../components/Icon";
import Window from "../components/Window";

import AboutContent from "../components/views/About";
import FellowsContent from "../components/views/Fellows";
import SocialsContent from "../components/views/Socials";
import InterestsContent from "../components/views/Interests";
import NotesContent from "../components/views/Notes";
import ProjectsContent from "../components/views/Projects";
import ChangelogContent from "../components/views/Changelog";
import IceCreamContent from "../components/views/IceCream";

import styles from "../styles/Home.module.scss";

import { Post } from "../types";
import { firebaseConfig, meta } from "../config";

import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";

import { useModalsContext } from "../components/contexts/Modals";

import Button from "../components/Button";

import A90 from "../components/extras/A90";

export default function Home(props: { posts: { success: boolean; data: Post[] } }) {
  const modalsContext = useModalsContext();

  const names = ["AutiOne", "Davi Rafael"];
  const [nameIndex, setNameIndex] = useState(0);
  const [name, setName] = useState(names[nameIndex]);

  const [typingHistory, setTypingHistory] = useState("");
  const [features, setFeatures] = useState<{ [key: string]: boolean }>({
    iceCream: false,
    senah: false,
    aninety: false,
    anoventa: false,
  });
  const featureCodes: { [key: string]: string } = {
    iceCream: ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright"].join(""),
    senah: "senah",
    aninety: "stop",
    anoventa: "pare",
  };

  const [chipSwap, setChipSwap] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setChipSwap(!chipSwap);
    }, 5000);
  }, [chipSwap]);

  useEffect(() => {
    addEventListener("keydown", (e) => {
      const s = e.key.toLowerCase();
      setTypingHistory((prev) => {
        console.log(prev);
        return prev.concat(s);
      });
    });
  }, []);

  useEffect(() => {
    if (typingHistory.length > 128) setTypingHistory("");

    // setTypingHistory(typingHistory);

    for (const featureKey in featureCodes) {
      if (typingHistory.includes(featureCodes[featureKey])) {
        setFeatures({ ...features, [featureKey]: true });
        setTypingHistory("");
      }
    }
  }, [typingHistory]);

  // const host = detect();

  const swapName = async () => {
    const chars = "!@#$%¨&*()Æ<©ÐŊµÞŁ®~?{}[]";
    const getChars = (len: number) => {
      let s = "";
      for (let i = 0; i < len; i += 1) s += chars[Math.floor(Math.random() * chars.length)];
      return s;
    };

    let newIndex = nameIndex + 1;
    if (newIndex >= names.length) newIndex = 0;

    const newName = names[newIndex];
    setNameIndex(newIndex);

    const slp = (ms: number) => new Promise((r) => setTimeout(r, ms));

    let str = `${newName}`;
    for (let i = 0; i < newName.length; i += 1) {
      str = `${getChars(i)}${str.substring(i + 1)}`;
      setName(str);

      await slp(50);
    }

    for (let i = 0; i < newName.length; i += 1) {
      str = `${newName.substring(0, i)}${getChars(newName.length - 1)}`;
      setName(str);

      await slp(50);
    }

    setName(newName);
  };

  ///

  const [discordChip, setDiscordChip] = useState({
    active: false,
    label: "Loading",
    avatar: "",
  });

  const fetchDiscord = () => {
    fetch("/api/external/discord")
      .then((r) => r.json())
      .then((json) => {
        if (!json.success)
          setDiscordChip({
            active: false,
            label: "Error",
            avatar: "",
          });

        setDiscordChip({
          active: json.data.status !== "offline",
          label:
            {
              online: "Online",
              idle: "Away",
              dnd: "Busy",
              offline: "Offline",
            }[json.data.status as string] || "Unknown",
          avatar: json.data.avatar,
        });
      })
      .catch((err) => {
        console.error("Failed to fetch Discord activity:", err);
        setDiscordChip({
          active: false,
          label: "Error",
          avatar: "",
        });
      });
  };

  ///

  // lmao yeah this bit of code is a bit peculiar
  const [matrixAvatar, setMatrixAvatar] = useState("");
  const [mastodonAvatar, setMastodonAvatar] = useState("");
  useEffect(() => {
    fetch("https://mastodon.social/api/v1/accounts/107168597662288446")
      .then((r) => r.json())
      .then((data) => setMastodonAvatar(data.avatar || ""))
      .catch(console.error);

    fetch("https://matrix.org/_matrix/client/v3/profile/@autione:envs.net/avatar_url")
      .then((r) => r.json())
      .then((data) => {
        const [server, hash] = data.avatar_url.replace("mxc://", "").split("/");
        setMatrixAvatar(`https://matrix-client.matrix.org/_matrix/media/v3/thumbnail/${server}/${hash}?width=128&height=128`);
      })
      .catch(console.error);
  }, []);

  ///

  const [spotifyChip, setSpotifyChip] = useState({
    active: false,
    icon: "pending",
    static: true,
    label: ["Loading", ""],
  });
  const fetchSpotify = () => {
    fetch("/api/external/spotify")
      .then((r) => r.json())
      .then((json) => {
        if (!json.success)
          return setSpotifyChip({
            active: false,
            label: ["Error", ""],
            static: true,
            icon: "error",
          });

        let label: [string, string];

        const { session } = json.data;

        if (!json.data.active)
          return setSpotifyChip({
            active: false,
            label: ["Inactive", ""],
            static: true,
            icon: "schedule",
          });

        switch (session.type) {
          case "track":
            label = [`${session.artists.join(", ")} - ${session.track}`, `in "${session.album}"`];
            break;

          case "podcast":
            label = ["Listening to a podcast", ""];
            break;

          case "local":
            label = [`${session.artists.join(", ")} - ${session.track}`, "from a local file"];
            break;

          case "private":
            label = ["Listening privately", ""];
            break;

          default:
            label = ["Unknown", ""];
            break;
        }

        setSpotifyChip({
          active: true,
          label,
          static: !label[1],
          icon: session.playing ? "play_circle" : "pause_circle",
        });
      })
      .catch((err) => {
        console.error("Failed to fetch Spotify activity:", err);
        setSpotifyChip({
          active: false,
          label: ["Error", ""],
          static: true,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    fetchDiscord();
    fetchSpotify();
  }, []);

  ///

  return (
    <>
      <div className={styles.container}>
        <header>
          <section>
            <img src="/logo-black.svg" alt="AutiOne Logo" className={styles.profilePicture} onClick={swapName} />
            <span className={styles.textContainer}>
              <span className={styles.title}>
                <span className={styles.name}>{name}</span>
                <div className={styles.tags}>
                  <span>Autist</span>
                  <span>Brazilian</span>
                  <span>Programmer</span>
                  <span>Designer</span>
                </div>
              </span>

              <div className={styles.activity}>
                <details className={styles.chip} title="Site Version">
                  <summary>
                    <Icon i="terminal" />
                    <span className={styles.labels}>
                      <span>{meta.version}</span>
                    </span>
                  </summary>
                </details>
                <details className={`${styles.chip} ${!discordChip.active ? styles.inactive : ""}`} title="Discord">
                  <summary>
                    <img src="/brands/discord.svg" alt="Discord Logo" />
                    <span className={styles.labels}>
                      <span>{discordChip.label}</span>
                    </span>
                  </summary>
                </details>
                <details className={`${styles.chip} ${!spotifyChip.active ? styles.inactive : ""}`} title="Spotify">
                  <summary>
                    <img src="/brands/spotify.svg" alt="Spotify Logo" />
                    <Icon i={spotifyChip.icon} />
                    <span className={`${styles.labels} ${chipSwap ? styles.swap : ""} ${!spotifyChip.static ? styles.allowSwap : ""}`}>
                      <span title={spotifyChip.label[0]}>{spotifyChip.label[0]}</span>
                      <span title={spotifyChip.label[1]}>{spotifyChip.label[1]}</span>
                    </span>
                  </summary>
                </details>
              </div>
            </span>
          </section>

          <section className={styles.shortcuts}>
            <a href="#window-about" className={styles.shortcut} style={{ "--accent": "#9281ff", "--background": "#24203d" } as any}>
              <Icon i="person" />
              <label>About</label>
            </a>

            <a href="#window-projects" className={styles.shortcut} style={{ "--accent": "#2eeba7", "--background": "#0e3426" } as any}>
              <Icon i="history_edu" />
              <label>Projects</label>
            </a>

            <a href="#window-socials" className={styles.shortcut} style={{ "--accent": "#fd467d", "--background": "#39101c" } as any}>
              <Icon i="forum" />
              <label>Socials</label>
            </a>

            <a href="#window-notes" className={styles.shortcut} style={{ "--accent": "#fff281", "--background": "#2e2b16" } as any}>
              <Icon i="article" />
              <label>Notes</label>
            </a>

            <a href="#window-interests" className={styles.shortcut} style={{ "--accent": "#ff8181", "--background": "#2e1616" } as any}>
              <Icon i="thumb_up" />
              <label>Interests</label>
            </a>

            <a href="#window-fellows" className={styles.shortcut} style={{ "--accent": "#ff81d4", "--background": "#351a2c" } as any}>
              <Icon i="heart_plus" />
              <label>Fellows</label>
            </a>

            <a
              href="#window-changelog"
              onContextMenu={(e) => {
                e.preventDefault();
                modalsContext.show(
                  {
                    title: "Features",
                    icon: <Icon i="build" />,
                    content: (
                      <>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            width: "100%",
                            gap: "1rem",
                          }}
                        >
                          {Object.keys(featureCodes).map((code) => (
                            <Button
                              colors={["#ad82ff", "#26193d"]}
                              fullWidth
                              onClick={() => {
                                setFeatures({ ...features, [code]: !features[code] });
                              }}
                              key={`${code}-feat`}
                            >
                              {code}
                            </Button>
                          ))}
                        </div>

                        <section className={styles.notice} style={{ backgroundColor: "#8f2f4f88" }}>
                          <h1>
                            <Icon i="warning" /> Content notice
                          </h1>
                          Some features/easter eggs might have loud noises and slightly scary content. It&apos;s nothing too graphical or violent, but I think
                          it&apos;s worth noting.
                        </section>
                      </>
                    ),
                  },
                  { accent: "#ad82ff", background: "#26193d" }
                );
              }}
              className={styles.shortcut}
              style={{ "--accent": "#ad82ff", "--background": "#26193d" } as any}
            >
              <Icon i="build" />
              <label>Changelog</label>
            </a>
          </section>
        </header>

        {features.senah && (
          <div className={styles.senah}>
            <img src="/images/senah.png" alt="Senah!!!" />
            <audio
              src="/audio/vine-boom.mp3"
              autoPlay
              onEnded={() => {
                setFeatures({
                  ...features,
                  senah: false,
                });
              }}
            />
          </div>
        )}
        {features.aninety && (
          <A90
            brazilMode={false}
            end={() => {
              setFeatures({
                ...features,
                aninety: false,
              });
            }}
          />
        )}
        {features.anoventa && (
          <A90
            brazilMode={true}
            end={() => {
              setFeatures({
                ...features,
                anoventa: false,
              });
            }}
          />
        )}

        <noscript>
          <section className={styles.notice}>
            <h1>
              <Icon i="warning" /> Your experience might be affected
            </h1>
            It looks like you don&apos;t have JavaScript enabled in your browser. While this won&apos;t make the site inacessible, some features might not work
            properly with it disabled. Feel free to continue here without enabling JavaScript too.
          </section>
        </noscript>

        <main>
          <section className={styles.column}>
            <Window
              colors={{
                accent: "#9281ff",
                background: "#24203d",
              }}
              icon={<Icon i="person" />}
              title="About"
              id="about"
            >
              <AboutContent />
            </Window>

            <Window
              colors={{
                accent: "#fff281",
                background: "#2e2b16",
              }}
              icon={<Icon i="text_snippet" />}
              title="Notes"
              id="notes"
            >
              <NotesContent posts={props.posts.data} />
              {!props.posts.success && <p>An error ocurred while fetching the posts. This is a server-side fault, so please report this to me.</p>}
            </Window>

            <Window
              colors={{
                accent: "#ff81d4",
                background: "#351a2c",
              }}
              icon={<Icon i="heart_plus" />}
              title="Fellows"
              id="fellows"
            >
              <FellowsContent />
            </Window>
          </section>

          <section className={styles.column}>
            <Window
              colors={{
                accent: "#2eeba7",
                background: "#0e3426",
              }}
              icon={<Icon i="history_edu" />}
              title="Projects"
              id="projects"
            >
              <ProjectsContent />
            </Window>

            {features.iceCream && (
              <Window
                colors={{
                  accent: "#fcdca4",
                  background: "#26211a",
                }}
                icon={<Icon i="icecream" />}
                title="Ice Cream"
                id="ice-cream"
              >
                <IceCreamContent />
              </Window>
            )}
          </section>

          <section className={styles.column}>
            <Window
              colors={{
                accent: "#fd467d",
                background: "#39101c",
              }}
              icon={<Icon i="forum" />}
              title="Socials"
              id="socials"
            >
              <SocialsContent
                avatars={{
                  github: "https://github.com/autione.png?size=128",
                  discord: discordChip.avatar,
                  mastodon: mastodonAvatar,
                  matrix: matrixAvatar,
                }}
              />
            </Window>

            <Window
              colors={{
                accent: "#ff8181",
                background: "#2e1616",
              }}
              icon={<Icon i="thumb_up" />}
              title="Interests"
              id="interests"
            >
              <InterestsContent />
            </Window>

            <Window
              colors={{
                accent: "#ad82ff",
                background: "#26193d",
              }}
              icon={<Icon i="build" />}
              title="Changelog"
              id="changelog"
            >
              <ChangelogContent version={meta.version} />
            </Window>
          </section>
        </main>

        <small className={styles.copyright}>
          &copy; AutiOne · {new Date().getFullYear()}
          <br />
          {meta.version}-{process.env.NODE_ENV} · Made in Brazil with Next.js
          <br />
          <details>
            <summary>Licenses and Attributions</summary>

            <span>
              Interface icons by Google&apos;s Material Symbols under{" "}
              <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noreferrer">
                Apache License 2.0
              </a>
            </span>
            <br />
            <span>
              Branding icons by{" "}
              <a href="https://simpleicons.org/" target="_blank" rel="noreferrer">
                SimpleIcons
              </a>{" "}
              with logos being property of their respective owners
            </span>

            <br />
            <br />

            <span>
              Website design inspired by{" "}
              <a href="https://lemmi.no/" target="_blank" rel="noreferrer">
                LEMMiNO
              </a>{" "}
              and{" "}
              <a href="https://osk.sh/" target="_blank" rel="noreferrer">
                osk
              </a>
            </span>
            <br />
            <small>OneShot reference unintentional</small>
          </details>
          <br />
          <big style={{ color: "#fff" }}>
            Basic visit data is collected via Vercel Web Analytics. <a href="https://vercel.com/docs/concepts/analytics/privacy-policy">Privacy policy</a>
          </big>
        </small>
      </div>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  context.res?.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=59");

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);

  initializeAuth(firebase);

  const postServiceAction: { success: boolean; data: Post[] } = {
    success: false,
    data: [],
  };

  try {
    const ref = query(collection(db, "notes"), orderBy("created_at", "desc"));
    const snap = await getDocs(ref);

    let data: Post[] = [];
    snap.forEach((e) => {
      const info = e.data() as Post;
      if (!info.hidden) data.push({ ...info, id: e.id });
    });

    postServiceAction.success = true;
    postServiceAction.data = data;
  } catch (err) {
    console.error("Failed to load posts:", err);
    postServiceAction.success = false;
  }

  return {
    props: {
      posts: postServiceAction,
    },
  };
}
