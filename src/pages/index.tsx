/* eslint-disable @next/next/no-img-element */
import fetch from "node-fetch";

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

import { OAuthService, Post } from "../types";
import { firebaseConfig, meta } from "../config";

import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, setDoc } from "firebase/firestore";

import { useModalsContext } from "../components/contexts/Modals";

import Button from "../components/Button";

import A90 from "../components/extras/A90";

interface Props {
  status: {
    discord: {
      active: boolean;
      text: string;
      avatarURL: string;
    };
    spotify: {
      static: boolean;
      active: boolean;
      text: string[];
      icon: string;
      id?: string;
      timestring: string;
    };
  };
  posts: {
    success: boolean;
    data: Post[];
  };
}

export default function Home(props: Props) {
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
    iceCream: [
      "arrowup",
      "arrowup",
      "arrowdown",
      "arrowdown",
      "arrowleft",
      "arrowright",
      "arrowleft",
      "arrowright",
    ].join(""),
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

  const modalsContext = useModalsContext();

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
                <details
                  className={`${styles.chip} ${!props.status.discord.active ? styles.inactive : ""}`}
                  title="Discord"
                >
                  <summary>
                    <img src="/discord.svg" alt="Discord Logo" />
                    <span className={styles.labels}>
                      <span>{props.status.discord.text}</span>
                    </span>
                  </summary>
                </details>
                <details
                  className={`${styles.chip} ${!props.status.spotify.active ? styles.inactive : ""}`}
                  title="Spotify"
                >
                  <summary>
                    <img src="/spotify.svg" alt="Spotify Logo" />
                    <Icon i={props.status.spotify.icon} />
                    <span
                      className={`${styles.labels} ${chipSwap ? styles.swap : ""} ${
                        !props.status.spotify.static ? styles.allowSwap : ""
                      }`}
                    >
                      <span title={props.status.spotify.text[0]}>{props.status.spotify.text[0]}</span>
                      <span title={props.status.spotify.text[1]}>{props.status.spotify.text[1]}</span>
                    </span>
                  </summary>
                </details>
              </div>
            </span>
          </section>

          <section className={styles.shortcuts}>
            <a
              href="#window-about"
              className={styles.shortcut}
              style={{ "--accent": "#9281ff", "--background": "#24203d" } as any}
            >
              <Icon i="person" />
              <label>About</label>
            </a>

            <a
              href="#window-projects"
              className={styles.shortcut}
              style={{ "--accent": "#2eeba7", "--background": "#0e3426" } as any}
            >
              <Icon i="history_edu" />
              <label>Projects</label>
            </a>

            <a
              href="#window-socials"
              className={styles.shortcut}
              style={{ "--accent": "#fd467d", "--background": "#39101c" } as any}
            >
              <Icon i="forum" />
              <label>Socials</label>
            </a>

            <a
              href="#window-notes"
              className={styles.shortcut}
              style={{ "--accent": "#fff281", "--background": "#2e2b16" } as any}
            >
              <Icon i="article" />
              <label>Notes</label>
            </a>

            <a
              href="#window-interests"
              className={styles.shortcut}
              style={{ "--accent": "#ff8181", "--background": "#2e1616" } as any}
            >
              <Icon i="thumb_up" />
              <label>Interests</label>
            </a>

            <a
              href="#window-fellows"
              className={styles.shortcut}
              style={{ "--accent": "#ff81d4", "--background": "#351a2c" } as any}
            >
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

                        <section className={styles.notice} style={{ backgroundColor: "#ff4f6f66" }}>
                          <h1>
                            <Icon i="warning" /> Content notice
                          </h1>
                          Some features/easter eggs might have loud noises and slightly scary content. It&apos;s nothing
                          too graphical or violent, but I think it&apos;s worth noting.
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

        {/* {(host?.name === "ios" ||
          host?.name === "ios-webview" ||
          host?.name === "edge-ios" ||
          host?.name === "safari") && (
          <section className={styles.notice}>
            <h1>
              <Icon i="warning" /> Your experience might be affected
            </h1>
            It has been detected that you are using Safari or your browser is
            overall using WebKit. This is known to be causing layout problems in
            my website, such as the collapsible parts showing up the menu
            arrows. While the problem is not solved, I recommend you to use
            another browser navigating here.
          </section>
        )} */}

        {features.senah && (
          <div className={styles.senah}>
            <img src="images/senah.png" alt="Senah!!!" />
            <audio
              src="vine-boom.mp3"
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
            It looks like you don&apos;t have JavaScript enabled in your browser. While this won&apos;t make the site
            inacessible, some features might not work properly with it disabled. Feel free to continue here without
            enabling JavaScript too.
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
              {!props.posts.success && (
                <p>
                  An error ocurred while fetching the posts. This is a server-side fault, so please report this to me.
                </p>
              )}
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
                  discord: props.status.discord.avatarURL,
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
          &copy; AutiOne · 2022
          <br />
          {meta.version}-{process.env.NODE_ENV} · Made in Brazil with Next.js
          <br />
          <details>
            <summary>Licenses and Attributions</summary>

            <br />

            {/* <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            rel="noreferrer"
            target="_blank"
          >
            <img src="/cc-by-sa.svg" alt="CC-BY-SA" width="25%" />
          </a>
          <br />
          <span>Some rights reserved</span>
          <br />
          <small>
            Other resources by me are under{" "}
            <a
              href="https://www.gnu.org/licenses/gpl-3.0.en.html"
              target="_blank"
              rel="noreferrer"
            >
              GPLv3
            </a>
            -or-later unless stated otherwise
          </small>

          <br />
          <br /> */}

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
  const authProvider = getAuth();

  let spotifyService: OAuthService | undefined = undefined;
  const spotifyServiceAction = {
    abort: false,
    status: ["", ""],
    icon: "info",
    sourceId: "",
    local: false,
  };

  const discordServiceAction = {
    active: true,
    text: "",
    avatarURL: "",
  };

  const postServiceAction: { success: boolean; data: Post[] } = {
    success: false,
    data: [],
  };

  // Spot-spottie-spotify
  try {
    await signInWithEmailAndPassword(authProvider, String(process.env.FLAKE_USER), String(process.env.FLAKE_PASS));

    const ref = doc(db, "oauth-services", "spotify");
    const snap = await getDoc(ref);
    const spotify = snap.data() as OAuthService;

    // mumbo jumbo to refresh token
    if (spotify) {
      if (Date.now() >= spotify.data.expiresAt) {
        try {
          const bodyData: { [k: string]: string } = {
            grant_type: "refresh_token",
            refresh_token: spotify.data.refreshToken,
          };

          const formBody = [];
          for (const property in bodyData)
            formBody.push(`${encodeURIComponent(property)}=${encodeURIComponent(bodyData[property])}`);

          const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
              "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
              authorization: `Basic ${Buffer.from(
                `${process.env.SPOTIFY_OAUTH_CLIENT_ID}:${process.env.SPOTIFY_OAUTH_CLIENT_SECRET}`
              ).toString("base64")}`,
            },
            body: formBody.join("&"),
          });

          if (res.status !== 200) {
            console.log(await res.text());
            throw new Error("Spotify OAuth request failed.");
          }

          const oauthData = (await res.json()) as {
            access_token: string;
            token_type: string;
            expires_in: number;
            scope: string;
          };

          const newData = {
            accessToken: oauthData.access_token,
            tokenType: oauthData.token_type,
            expiresIn: oauthData.expires_in,
            expiresAt: Date.now() + oauthData.expires_in * 1000,
            refreshToken: spotify.data.refreshToken,
            scope: oauthData.scope,
          };

          await setDoc(ref, {
            data: newData,
          });
          spotify.data = newData;
        } catch (err) {
          console.error("Failed to request Spotify token refresh", err);
          spotifyServiceAction.abort = true;
          spotifyServiceAction.status = ["Failed", ""];
        }
      }

      spotifyService = spotify;
    }
  } catch (err) {
    console.error("Spotify service database request failed:", err);
    spotifyServiceAction.abort = true;
    spotifyServiceAction.icon = "error";
    spotifyServiceAction.status = ["Auth error", ""];
  }

  if (spotifyService && !spotifyServiceAction.abort)
    try {
      const res = await fetch("https://api.spotify.com/v1/me/player", {
        headers: {
          "content-type": "application/json",
          authorization: `${spotifyService.data.tokenType} ${spotifyService.data.accessToken}`,
        },
      });

      if (res.status === 200) {
        const data = (await res.json()) as any;

        if (data.device.is_private_session) {
          spotifyServiceAction.status = ["On private session", ""];
          spotifyServiceAction.icon = "lock";
        } else {
          spotifyServiceAction.status =
            data.currently_playing_type === "track"
              ? [
                  `${data.item.artists.map((artist: any) => artist.name).join(", ")} - ${data.item.name}`,
                  `in "${data.item.album.name}"`,
                ]
              : ["Listening to a podcast", ""];
          spotifyServiceAction.icon = data.is_playing ? "play_arrow" : "pause";
          spotifyServiceAction.sourceId = data.item?.id || false;

          if (data.item?.is_local) {
            spotifyServiceAction.status[1] = "From a local file";
            spotifyServiceAction.local = true;
          }
        }
      } else if (res.status === 204) {
        spotifyServiceAction.status = ["No sessions active", ""];
        spotifyServiceAction.icon = "power_off";
      } else {
        console.error("Spotify data fetch returned error code", await res.text());
        spotifyServiceAction.status = ["Request error code", ""];
      }
    } catch (err) {
      console.error("Spotify data fetch failed", err);
      spotifyServiceAction.status = ["Fetch error", ""];
    }

  // Discord
  try {
    const res = await fetch(String(process.env.DISCORD_WIDGET_ENDPOINT));
    const data: any = await res.json();

    if (data.members.length > 0) {
      discordServiceAction.text =
        {
          online: "Online",
          idle: "Away",
          dnd: "Busy",
        }[data.members[0].status as string] || data.members[0].status;
      discordServiceAction.avatarURL = data.members[0].avatar_url as string;
    } else {
      discordServiceAction.text = "Offline";
      discordServiceAction.active = false;
    }
  } catch (err) {
    console.error("Discord data fetch failed", err);
    discordServiceAction.active = false;
    discordServiceAction.text = "Fetch error";
  }

  // Notes
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
      status: {
        discord: discordServiceAction,
        spotify: {
          static: spotifyServiceAction.local
            ? false
            : !spotifyServiceAction.sourceId || !spotifyServiceAction.status[1],
          active: !spotifyServiceAction.abort && spotifyServiceAction.local ? true : !!spotifyServiceAction.sourceId,
          text: spotifyServiceAction.status,
          icon: spotifyServiceAction.icon,
          id: spotifyServiceAction.sourceId,
          timestring: new Date().toLocaleString(["en-US"], {
            dateStyle: "long",
            timeStyle: "long",
          }),
        },
      },
      posts: { ...postServiceAction },
    },
  };
}
