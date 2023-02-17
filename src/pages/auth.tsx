export default function Auth() {
  const redirectUri =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3000/api/authorize"
      : "https://auti.one/api/authorize";

  return (
    <div>
      <b>Authorization flows:</b>
      <br />
      <a
        href={`https://canary.discord.com/api/oauth2/authorize?client_id=${
          process.env.DISCORD_OAUTH_CLIENT_ID
        }&permissions=1099511628800&redirect_uri=${encodeURIComponent(
          `${redirectUri}/discord`
        )}&response_type=code&scope=identify%20bot`}
      >
        <button>
          Authorize Discord <small>(unused)</small>
        </button>
      </a>
      <br />
      <a
        href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${
          process.env.SPOTIFY_OAUTH_CLIENT_ID
        }&scope=${encodeURIComponent(
          "user-read-private user-read-currently-playing user-read-playback-state"
        )}&redirect_uri=${encodeURIComponent(`${redirectUri}/spotify`)}`}
      >
        <button>Authorize Spotify</button>
      </a>
    </div>
  );
}
