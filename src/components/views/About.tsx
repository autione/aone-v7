import { useState } from "react";

export default function AboutContent() {
  const [renderExplosion, setRenderExplosion] = useState(false);

  const Explosion = ({ onFinish }: { onFinish: () => void }) => {
    const [showVideo, setShowVideo] = useState(true);

    return (
      <>
        <video
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            zIndex: 10,
            pointerEvents: "none",
            opacity: showVideo ? 1 : 0,
            transition: "opacity 0.2s",
          }}
          src="/explosion.webm"
          autoPlay
          onEnded={() => setShowVideo(false)}
        />
        <audio src="/boom.mp3" autoPlay onEnded={onFinish} />
      </>
    );
  };

  return (
    <>
      <p>
        Hello! I&apos;m Davi, or AutiOne as majorly known by people from the
        Internet.
      </p>
      <p>
        I&apos;m an autist who managed to get their hyperfocus into technology
        stuff and eventually started programming and designing because the kiddo
        is so curious that self-taught them into doing these.
      </p>
      <p>
        I&apos;m brazilian, and therefore a native Portuguese speaker. Although,
        I can speak, listen, read and write English decently enough.
      </p>
      <p>
        <small>
          Also, if you still haven&apos;t noticed, the &quot;Auti&quot; part in
          my name stands for my autism condition. This name was chosen while I
          was looking for a new domain and I found the .one TLD and just though
          that&apos;d be cool with Auti, then{" "}
          <b
            onClick={() => setRenderExplosion(true)}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            <i>boom</i>
          </b>
          , AutiOne.
        </small>
      </p>
      {renderExplosion && (
        <Explosion onFinish={() => setRenderExplosion(false)} />
      )}
    </>
  );
}
