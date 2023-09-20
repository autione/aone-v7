/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { ReactNode } from "react";
import styles from "../../styles/components/views/Fellows.module.scss";
import Button from "../Button";
import Icon from "../Icon";

interface Fellow {
  id: string;
  name?: string;
  pseudonym: string;
  description?: string;
  note?: ReactNode;
  links: {
    icon: string;
    text: string;
    to: string;
  }[];
}

interface Collection {
  label: string;
  people: Fellow[];
}

export default function FellowsContent() {
  const colors = {
    accent: "#ff81d4",
    background: "#351a2c",
  };

  const collections: Collection[] = [
    {
      label: "Worldwide",
      people: [
        {
          id: "znepb",
          name: "Marcus",
          pseudonym: "znepb",
          description: "rolecoster!!!1!!1! 😀🎢👍😀👍😀🎢",
          links: [
            {
              icon: "public",
              text: "Website",
              to: "https://znepb.me/",
            },
          ],
        },
        {
          id: "pjals",
          name: "Daniel",
          pseudonym: "pjals",
          description: "Average non-free fan vs. average libre/GNU enjoyer🄯",
          links: [
            {
              icon: "chat",
              text: "Matrix",
              to: "https://matrix.to/#/@pjals:vern.cc",
            },
          ],
        },
        {
          id: "knijn",
          name: "Emma",
          pseudonym: "EmmaKnijn",
          description: "uhhhhhhhhhhhh",
          links: [
            {
              icon: "public",
              text: "Website",
              to: "https://knijn.one/",
            },
          ],
        },
        {
          id: "blackdragon",
          pseudonym: "BlackDragon",
          description: "...seals?",
          links: [
            {
              icon: "public",
              text: "Website",
              to: "https://blackdrgn.nl/",
            },
          ],
        },
      ],
    },

    ///

    {
      label: "Brazil",
      people: [
        {
          id: "leoroyx",
          name: "LeoroyX",
          pseudonym: "Leoroy63",
          description: "Huge Czerny fan + Tapsonic TOP is cool",
          links: [
            {
              icon: "sticky_note_2",
              text: "Twitter",
              to: "https://twitter.com/Leoroy63",
            },
            {
              icon: "photo",
              text: "Pixiv",
              to: "https://www.pixiv.net/en/users/71125829",
            },
          ],
        },
        {
          id: "gabs",
          name: "Gabs",
          pseudonym: "theocacao",
          description: "Biggest Lee Arknights fan ever",
          links: [
            {
              icon: "sticky_note_2",
              text: "Twitter",
              to: "https://twitter.com/Gabsawa",
            },
          ],
        },
        {
          id: "luzinu",
          pseudonym: "Luzinu",
          description: "Auau!",
          links: [
            {
              icon: "public",
              text: "Carrd",
              to: "https://luzinu.carrd.co/",
            },
            {
              icon: "sticky_note_2",
              text: "Twitter",
              to: "https://twitter.com/AKALuzinu",
            },
          ],
        },
        {
          id: "minty",
          pseudonym: "Minty",
          description: "haha programmingn't",
          links: [
            {
              icon: "public",
              text: "Website",
              to: "https://minty08.carrd.co/",
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <p>
        Check out my fellow programmer and artist friends. They&apos;re nice people and are quite into some subjects I&apos;m also experienced at.
        <br />
        <br />
        <small>Appearance order doesn&apos;t have any meaning here. You&apos;re all amazing!</small>
      </p>

      {collections.map((collection, i) => (
        <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }} key={`fellows-col-${i}`}>
          <h2 style={{ padding: 0, margin: 0 }}>{collection.label}</h2>
          {collection.people.map((person, j) => (
            <div
              onClick={() => {
                if (person.id === "gabs" && typeof window !== "undefined") new Audio("/audio/gabs-meow.mp3").play();
              }}
              className={styles.userCard}
              key={`fellows-prs-${j}`}
              style={person.id === "gabs" ? { userSelect: "none", cursor: "pointer" } : {}}
            >
              <Image src={`/profiles/${person.id}.png`} alt={person.name || person.pseudonym} className={styles.avatar} width={96} height={96} />
              <main className={styles.content}>
                <span className={styles.textContent}>
                  <span className={styles.title}>
                    {person.name ? (
                      <>
                        {person.name} <small>{person.pseudonym}</small>
                      </>
                    ) : (
                      person.pseudonym
                    )}
                  </span>
                  {person.description}
                </span>

                {person.note && (
                  <details className={styles.userNote}>
                    <summary>A note on {person.name || person.pseudonym} by AutiOne</summary>
                    <div className={styles.noteContent}>{person.note}</div>
                  </details>
                )}

                <span className={styles.actions}>
                  {person.links.map((link, k) => (
                    <a href={link.to} rel="noreferrer" target="_blank" key={`fellows-prs-${j}-${k}`}>
                      <Button colors={[colors.accent, colors.background]} icon={<Icon i={link.icon} />} variant="reduced">
                        {link.text}
                      </Button>
                    </a>
                  ))}
                </span>
              </main>
            </div>
          ))}

          {i < collections.length - 1 && <br />}
        </section>
      ))}

      <p>
        <small>
          Content and opinions shown might not be, and most likely are not belonging or linked to me. Agreement or endorsement is not necessarily applied,
          although, they&apos;re still nice people.
        </small>
      </p>
    </>
  );
}
