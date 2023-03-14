/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react";
import styles from "../../styles/components/extras/A90.module.scss";

export default function A90({ end }: { end: () => void }) {
  const [pos, setPos] = useState([0, 0]);
  const [state, setState] = useState(-1);

  const [audioSource, setAudioSource] = useState(0);

  const [hasMoved, setHasMoved] = useState(false);

  const messages = [
    "Oh... Hello.",
    "I'm surprised you found this place.",
    "It's pretty tedious just to get here, last time I checked.",
    "Anyways, what'd you die to?",
    "Oh that one...",
    "I hope that one isn't too confusing...",
    "All I'll let you know is that it starts attacking after Room A-90.",
    "So, you could call it A-90.",
    "Anyways, I hope you don't mind trying again. It would be helpful.",
  ];
  const [messageIndex, setMessageIndex] = useState(0);
  const [hideMessage, setHideMessage] = useState(false);

  useEffect(() => {
    setPos([Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 100)]);
    setState(0);

    setTimeout(() => {
      setPos([50, 50]);
      setState(1);

      addEventListener("mousemove", () => {
        setHasMoved(true);
      });
    }, 485.449);

    setTimeout(() => {
      setState(3);
    }, 1177.51698);
  }, []);

  useEffect(() => {
    if (state === 1)
      setTimeout(() => {
        setState(2);
      }, 100);

    if (state === 3)
      setTimeout(() => {
        if (hasMoved) {
          setState(6);
          setAudioSource(1);
        } else {
          setState(4);
        }
      }, 70);

    if (state === 4)
      setTimeout(() => {
        setState(5);
      }, 80);

    if (state === 6)
      setTimeout(() => {
        setState(7);
      }, 1019.311);

    if (state === 7)
      setTimeout(() => {
        setState(8);
      }, 60);

    if (state === 8)
      setTimeout(() => {
        setState(9);
      }, 60);

    if (state === 10)
      setTimeout(() => {
        setState(11);
      }, 1500);

    // if (state === 11)
    //   setTimeout(() => {
    //     setState(12);
    //   }, 54894.74406);
  }, [state]);

  return state >= 0 ? (
    <>
      {audioSource === 0 && <audio src="a90.mp3" autoPlay onEnded={end} />}
      {audioSource === 1 && (
        <audio
          src="a90-hit.mp3"
          autoPlay
          onTimeUpdate={(e) => {
            const target = e.target as HTMLAudioElement;
            if (target.currentTime >= 1.976461 && state < 10) {
              setState(10);
              setAudioSource(2);
              // end();
            }
          }}
        />
      )}
      {audioSource === 2 && (
        <audio
          src="curious.mp3"
          autoPlay
          onTimeUpdate={(e) => {
            const target = e.target as HTMLAudioElement;
            if (target.currentTime >= 54.894744 && state === 11) {
              setState(12);
            }
          }}
          onPlay={(e) => {
            const target = e.target as HTMLAudioElement;
            const int = setInterval(() => {
              setHideMessage(true);
              setTimeout(() => setMessageIndex((prev) => Math.min(messages.length - 1, prev + 1)), 200);
              setTimeout(() => setHideMessage(false), 400);
            }, 56000 / messages.length);

            target.onended = () => {
              clearInterval(int);
            };
          }}
          onEnded={end}
        />
      )}{" "}
      {state >= 10 ? (
        <div className={`${styles.death} ${state === 10 ? styles.blackout : ""} ${state === 12 ? styles.fadeout : ""}`}>
          <span className={hideMessage ? styles.hide : ""}>{messages[messageIndex]}</span>
        </div>
      ) : (
        <div
          className={`${styles.aninety} ${state === 1 || state === 9 ? styles.blackout : ""} ${state === 3 || state === 6 ? styles.flash : ""} ${
            state === 8 ? styles.strike : ""
          }`}
        >
          {state >= 6 ? (
            <img
              src="images/a90/screaming.png"
              className={`${styles.screaming} ${state >= 7 ? styles.incoming : ""}`}
              style={{ left: `${pos[0]}%`, top: `${pos[1]}%`, opacity: state === 7 || state === 9 ? 0 : 1 }}
              alt="A-90 Screaming"
            />
          ) : (
            <img
              src="images/a90/face.png"
              className={state >= 2 ? styles.zoom : ""}
              style={{ left: `${pos[0]}%`, top: `${pos[1]}%`, opacity: state !== 3 && state !== 5 ? 1 : 0 }}
              alt="A-90 Face"
            />
          )}
          <img
            src="images/a90/block.png"
            className={styles.stopSign}
            style={{ left: `${pos[0]}%`, top: `${pos[1]}%`, opacity: state === 2 ? 1 : 0 }}
            alt="A-90 Block"
          />
        </div>
      )}
    </>
  ) : (
    <></>
  );
}
