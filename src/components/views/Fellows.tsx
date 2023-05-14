/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { ReactNode } from "react";
import styles from "../../styles/components/views/Fellows.module.scss";
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
    note?: ReactNode;
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
      note: (
        <>
          <p>
            pjals has been gone for a while, a few days before vern.cc went down on March 2023. Even though he had an
            account on envs.net, pjals also did not appear there, being it through Matrix, Pleroma or any other offered
            communication service.
          </p>
          <p>
            Other users from vern.cc have also asked about pjals and none of them did really know what was going on with
            him.
          </p>
          <p>
            I also analyzed activity on some MineTest servers he&apos;d visit from time to time, his webpages and other
            conversation channels, but I haven&apos;t really found anything.
          </p>
          <p>
            My last signal from pjals was from around 50 to 60 days ago (as of May 14, 2023), and since he has
            manifested no activity anywhere else, I think he just might be gone.
          </p>
          <p>
            While he has went &quot;missing&quot; before during similar periods, it was simple inactivity in <i>some</i>{" "}
            places. When he vanished from Discord, I could still reach him on other places, such as GitHub, IRC and
            WSChat. After some time, we settled on Matrix, but now he has not shown up anywhere, and I have a feeling
            that this time it&apos;s different.
          </p>
          <p>
            In any case, my point with this note is just to let you know that I no longer have contact with him because
            of this disappearance, but I do hope he comes back eventually, even though we had some conflicts (specially
            related to libre stuff 😅), I valued him a lot and he was still a really nice friend for me.
          </p>
          <p>At least, I got to be his friend.</p>
        </>
      ),
      links: [
        {
          icon: "public",
          text: "Website",
          to: "https://pjals.envs.net/",
        },
        {
          icon: "sticky_note_2",
          text: "Fedi",
          to: "https://pleroma.envs.net/pjals",
        },
        // {
        //   icon: "chat",
        //   text: "Matrix",
        //   to: "https://matrix.to/#/@pjals:vern.cc",
        // }, // not working
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
        Check out my fellow programmer and artist friends. They&apos;re nice people and are quite into some subjects
        I&apos;m also experienced at.
        <br />
        <br />
        <small>Appearance order doesn&apos;t have any meaning here. You&apos;re all amazing!</small>
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

            {person.note && (
              <details className={styles.userNote}>
                <summary>A note on {person.name || person.pseudonym} by AutiOne</summary>
                <div className={styles.noteContent}>{person.note}</div>
              </details>
            )}

            <span className={styles.actions}>
              {person.links.map((link, linkIndex) => (
                <a href={link.to} rel="noreferrer" target="_blank" key={`person-${index}-fellows-link-${linkIndex}`}>
                  <Button colors={[colors.accent, colors.background]} icon={<Icon i={link.icon} />} variant="reduced">
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
          Content and opinions shown might not be, and most likely are not belonging or linked to me. Agreement or
          endorsement is not necessarily applied, although, they&apos;re still nice people.
        </small>
      </p>
    </>
  );
}
