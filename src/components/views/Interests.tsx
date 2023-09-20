import { useModalsContext } from "../contexts/Modals";

import Alert from "../Alert";
import Icon from "../Icon";

import styles from "../../styles/components/views/Interests.module.scss";

export default function InterestsContent() {
  const colors = {
    accent: "#ff8181",
    background: "#2e1616",
  };

  const modalsContext = useModalsContext();

  const GamesModal = () => {
    return (
      <>
        <p>
          My <i>&quot;spectrum of interest in games&quot;</i> is not very extended. I don&apos;t usually like most games I&apos;m presented to, but when I do
          like one, it&apos;s really likely you&apos;ll see me fixated to it.
        </p>

        <p>
          I feel like I&apos;m a creativity-explorer and more open kind of person, so sandbox and open world games are usually more of my preference. Most of
          the times, I&apos;m mostly playing for the fun, casually, not really in a competitive way, so my gameplay experience tends to be more relaxed.
          You&apos;re probably going to see me playing these titles more often.
        </p>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <img src="/images/games/minecraft.png" alt="Minecraft" />
            <label>Minecraft</label>

            <span className={styles.description}>
              <span className={styles.caption}>You might see me playing on these servers:</span>

              <section className={styles.row}>
                <span className={styles.subInfoCard}>
                  <img src="/images/games/hypixel.png" alt="Hypixel" />
                  <label>Hypixel</label>
                </span>

                <span className={styles.subInfoCard}>
                  <img src="/images/games/switchcraft.png" alt="SwitchCraft" />
                  <label>SwitchCraft</label>
                </span>
              </section>
            </span>
          </span>

          <span className={styles.infoCard}>
            <img src="/images/games/roblox.png" alt="Roblox" />
            <label>Roblox</label>

            <span className={styles.description}>
              <span className={styles.caption}>You might see me playing these games:</span>

              <section className={styles.row}>
                <span className={styles.subInfoCard}>
                  <img src="/images/games/doors.png" alt="DOORS" />
                  <label>DOORS</label>
                </span>

                <span className={styles.subInfoCard}>
                  <img src="/images/games/evade.png" alt="Evade" />
                  <label>Evade</label>
                </span>

                <span className={styles.subInfoCard}>
                  <img src="/images/games/sandbox.png" alt="Sandbox" />
                  <label>Sandbox</label>
                </span>
              </section>
            </span>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <img src="/images/games/tetrio.png" alt="TETR.IO" />
            <label>TETR.IO</label>

            <span className={styles.description}>
              <span className={styles.caption}>I&apos;m not very skilled though, but I find it fun!</span>
            </span>
          </span>

          <span className={styles.infoCard}>
            <img src="/images/games/osu_lazer.png" alt="osu!" />
            <label>osu!</label>

            <span className={styles.description}>
              <span className={styles.caption}>
                More specifically, osu!lazer given it has native support for Linux. Came back to playing after some years without seeing it. Also not well
                skilled here.
              </span>
            </span>
          </span>
        </section>

        <p>Followed by the ones I tend to play less frequently, when I&apos;m just seeking for a different casual gameplay</p>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <img src="/images/games/stardew_valley.png" alt="Stardew Valley" />
            <label>Stardew Valley</label>
          </span>

          <span className={styles.infoCard}>
            <img src="/images/games/universe_sandbox.png" alt="Universe Sandbox" />
            <label>Universe Sandbox</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <img src="/images/games/horizon_chase_turbo.png" alt="Horizon Chase Turbo" />
            <label>Horizon Chase</label>

            <span className={styles.description}>
              <span className={styles.caption}>
                I finished the whole World Tour on Gold, completed all the Resistence challenges, but I still have a mostly silver scoring on the Tournaments.
              </span>
            </span>
          </span>

          <span className={styles.infoCard}>
            <img src="/images/games/terraria.png" alt="Terraria" />
            <label>Terraria</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <img src="/images/games/gta.png" alt="GTA: Grand Theft Auto" />
            <label>GTA</label>

            <span className={styles.description}>
              <span className={styles.caption}>I&apos;m mostly on San Andreas&apos; multiplayer mods (MTA, SA:MP) and GTA V&apos;s Online.</span>
            </span>
          </span>

          <span className={styles.infoCard}>
            <img src="/images/games/garrys_mod.png" alt="Garry's Mod" />
            <label>Garry&apos;s Mod</label>
          </span>
        </section>

        <p>Sometimes, I also play Valve games. Valve is nice.</p>

        <p>And finally, some honorable mentions. Games I don&apos;t play that much, or even haven&apos;t played more than once, but are still amazing</p>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <img src="/images/games/oneshot.png" alt="OneShot" />
            <label>OneShot</label>
          </span>

          <span className={styles.infoCard}>
            <img src="/images/games/deltarune.png" alt="Deltarune" />
            <label>Deltarune</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <img src="/images/games/adofi.png" alt="ADOFI: A Dance of Fire and Ice" />
            <label>A Dance of Fire and Ice</label>
          </span>
        </section>
      </>
    );
  };

  const MusicModal = () => {
    return (
      <>
        <p>
          My taste on music is peculiar and eclectic. I go from soft and tranquil to absolutely agitated. From the 80&apos;s to nowadays. From popular songs to
          the ones you probably wouldn&apos;t even expect hearing about in your entire life.
        </p>

        <p>
          Given all of this, I can&apos;t really answer the question of &quot;what kind of music do you like&quot; because it&apos;s such a wide scope that I
          just can&apos;t tell, but I tried to separate below a list of artists I think more of when the subject is about music.
        </p>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>C418</label>
          </span>

          <span className={styles.infoCard}>
            <label>Lemon Demon</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>Gorillaz</label>
          </span>

          <span className={styles.infoCard}>
            <label>Lena Raine</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>Guns N&apos; Roses</label>
          </span>

          <span className={styles.infoCard}>
            <label>Queen</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>Pink Floyd</label>
          </span>

          <span className={styles.infoCard}>
            <label>Tally Hall</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>Bo Burnham</label>
          </span>

          <span className={styles.infoCard}>
            <label>Imagine Dragons</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>Maroon 5</label>
          </span>

          <span className={styles.infoCard}>
            <label>Bill Wurtz</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>Michael Jackson</label>
          </span>

          <span className={styles.infoCard}>
            <label>Tears For Fears</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>Justice</label>
          </span>

          <span className={styles.infoCard}>
            <label>Daft Punk</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>AJR</label>
          </span>

          <span className={styles.infoCard}>
            <label>The Living Tombstone</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>bo en</label>
          </span>

          <span className={styles.infoCard}>
            <label>LSPLASH</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>Gareth Coker</label>
          </span>

          <span className={styles.infoCard}>
            <label>Laura Shigihara</label>
          </span>
        </section>

        <p>
          Of course these aren&apos;t the only one artists I listen to, but I&apos;m very &quot;trustworthy&quot; regarding these. If I get engaged with an
          artist and their style, you&apos;re most likely to see me constantly listening to them eventually.
        </p>
      </>
    );
  };

  const VideoModal = () => {
    return (
      <>
        <p>
          Who doesn&apos;t like to watch a movie, series or a YouTube video? It&apos;s a nice way to have some fun, throw time away and even sometimes learn
          something new.
        </p>

        <p>
          In the same way as I feel like regarding music, I can&apos;t really figure out a <i>&quot;favorite movie genre&quot;</i> or other labeling mumbo-jumbo
          like this, I just get captivated by the content I&apos;m consuming and that&apos;s it.
        </p>

        <p>
          But still, as it happens with music for me, I can try and list some of the media and content creators that became an interest to me. Starting off with
          individual content creators.
        </p>

        <p>
          Documentary-like and story-telling style of videos are the ones I like the most if you ask more regarding overall informational media. Some of the
          creators I like a lot that make up this kind of content are below, and I recommend you to check them all out
        </p>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <img src="/images/video/lemmino.png" alt="LEMMiNO Logo" />
            <label>LEMMiNO</label>
          </span>

          <span className={styles.infoCard}>
            <img src="/images/video/tom_scott.png" alt="Picture of Tom Scott" />
            <label>Tom Scott</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <img src="/images/video/kurzgesagt.png" alt="Kurzgesagt - in a nutshell Logo" />
            <label>Kurzgesagt</label>
          </span>

          <span className={styles.infoCard}>
            <img src="/images/video/stuff_made_here.png" alt="Stuff Made Here Logo" />
            <label>Stuff Made Here</label>
          </span>
        </section>

        <p>and as well, creators that approach other kind of scientific, logical and curious topics like</p>

        <span className={styles.infoCard}>
          <img src="/images/video/manual_do_mundo.png" alt="Manual do Mundo Logo" />
          <label>
            Manual do Mundo <small>🇧🇷</small>
          </label>
        </span>

        <span className={styles.infoCard}>
          <img src="/images/video/pura_fisica.png" alt="Pura Física's Profile Picture" />
          <label>
            Pura Física <small>🇧🇷</small>
          </label>
        </span>

        <span className={styles.infoCard}>
          <img src="/images/video/estude_matematica.png" alt="Estude Matemática Logo" />
          <label>
            Estude Matemática <small>🇧🇷</small>
          </label>
        </span>

        <p>Of course, there are way more channels I watch, but these are pretty much the ones.</p>

        <hr />

        <p>
          Apart from the YouTube world, movies and series that are more into sci-fi, enigmatic, documental, action, exploration or just overall <i>cool</i>{" "}
          content are also of my interest, like
        </p>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>Stranger Things</label>
          </span>

          <span className={styles.infoCard}>
            <label>Rick and Morty</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>Brooklyn Nine-Nine</label>
          </span>

          <span className={styles.infoCard}>
            <label>Enola Holmes</label>
          </span>
        </section>

        <span className={styles.infoCard}>
          <label>Extraordinary Attorney Woo</label>
        </span>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>Black Mirror</label>
          </span>

          <span className={styles.infoCard}>
            <label>
              Onisciente <small>🇧🇷</small>
            </label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>Inside Job</label>
          </span>

          <span className={styles.infoCard}>
            <label>Close Enough</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>The Good Place</label>
          </span>

          <span className={styles.infoCard}>
            <label>Daybreak</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>
              Mundo Mistério <small>🇧🇷</small>
            </label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>The Big Bang Theory</label>
          </span>

          <span className={styles.infoCard}>
            <label>Young Sheldon</label>
          </span>
        </section>

        <p>and some more young content like</p>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>The Owl House</label>
          </span>

          <span className={styles.infoCard}>
            <label>Amphibia</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>Gravity Falls</label>
          </span>

          <span className={styles.infoCard}>
            <label>Heartstopper</label>
          </span>
        </section>

        <section className={styles.row}>
          <span className={styles.infoCard}>
            <label>Atypical</label>
          </span>
        </section>

        <p>Among other types of content, are just comedy and overall time-wasting stuff.</p>
      </>
    );
  };

  return (
    <>
      <p>As pretty much any other person you might know, I also have my interests. While most people won&apos;t care, I find it nice to have that here.</p>

      <noscript>
        <Alert color={colors.accent} icon={<Icon i="warning" />}>
          This window needs JavaScript to work.
        </Alert>
      </noscript>

      <div className={styles.row}>
        <button
          onClick={() => {
            modalsContext.show(
              {
                title: "Interests » Games",
                icon: <Icon i="sports_esports" />,
                content: <GamesModal />,
              },
              colors
            );
          }}
          className={styles.sectionButton}
        >
          <span className={styles.icon}>
            <Icon i="sports_esports" />
          </span>
          Games
        </button>

        <button
          onClick={() => {
            modalsContext.show(
              {
                title: "Interests » Music",
                icon: <Icon i="headphones" />,
                content: <MusicModal />,
              },
              colors
            );
          }}
          className={styles.sectionButton}
        >
          <span className={styles.icon}>
            <Icon i="headphones" />
          </span>
          Music
        </button>

        <button
          onClick={() => {
            modalsContext.show(
              {
                title: "Interests » Video",
                icon: <Icon i="movie" />,
                content: <VideoModal />,
              },
              colors
            );
          }}
          className={styles.sectionButton}
        >
          <span className={styles.icon}>
            <Icon i="movie" />
          </span>
          Video
        </button>
      </div>
    </>
  );
}
