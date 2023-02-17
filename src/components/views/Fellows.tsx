/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import styles from "../../styles/components/views/Fellows.module.scss";
import Alert from "../Alert";
import Button from "../Button";
import Icon from "../Icon";

export default function FellowsContent() {
  const colors = {
    accent: "#ff81d4",
    background: "#351a2c",
  };

  const people: {
    id: string;
    name?: string;
    pseudonym: string;
    description?: string;
    links: {
      icon: string;
      text: string;
      to: string;
    }[];
  }[] = [
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
          icon: "public",
          text: "Website",
          to: "https://pjals.vern.cc/",
        },
        {
          icon: "sticky_note_2",
          text: "Fedi",
          to: "https://pleroma.envs.net/pjals",
        },
        {
          icon: "chat",
          text: "Matrix",
          to: "https://matrix.to/#/@pjals:vern.cc",
        },
      ],
    },
    {
      id: "luzinu",
      pseudonym: "Luzinu",
      description: "Auau!",
      links: [
        // {
        //   icon: "public",
        //   text: "Website",
        //   to: "https://akaluzinu.web.app/",
        // }, // not working
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
      id: "abyss",
      name: "Peterson",
      pseudonym: "Abyss",
      description: "Eu sigo o Dr. Fran em todas as redes sociais.",
      links: [
        {
          icon: "sticky_note_2",
          text: "Twitter",
          to: "https://twitter.com/Z3ckZ",
        },
      ],
    },
    {
      id: "beastlyghost",
      name: "Gabriela",
      pseudonym: "BeastlyGhost",
      description: "fridaynightfunkign!?@?:!",
      links: [
        {
          icon: "code",
          text: "GitHub",
          to: "https://github.com/BeastlyGhost",
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
  ];

  return (
    <>
      <p>
        Check out my fellow programmer and artist friends. They&apos;re nice
        people and are quite into some subjects I&apos;m also experienced at.
        <br />
        <br />
        <small>
          Appearance order doesn&apos;t have any meaning here. You&apos;re all
          amazing!
        </small>
      </p>

      {people.map((person, index) => (
        <div className={styles.userCard} key={`person-${index}-fellows`}>
          <Image
            src={`/profiles/${person.id}.png`}
            alt={person.name || person.pseudonym}
            className={styles.avatar}
            width={96}
            height={96}
          />
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

            <span className={styles.actions}>
              {person.links.map((link, linkIndex) => (
                <a
                  href={link.to}
                  rel="noreferrer"
                  target="_blank"
                  key={`person-${index}-fellows-link-${linkIndex}`}
                >
                  <Button
                    colors={[colors.accent, colors.background]}
                    icon={<Icon i={link.icon} />}
                    variant="reduced"
                  >
                    {link.text}
                  </Button>
                </a>
              ))}
            </span>
          </main>
        </div>
      ))}

      <p>
        <small>
          Content and opinions shown might not be, and most likely are not
          belonging or linked to me. Agreement or endorsement is not necessarily
          applied, although, they&apos;re still nice people.
        </small>
      </p>
    </>
  );
}
