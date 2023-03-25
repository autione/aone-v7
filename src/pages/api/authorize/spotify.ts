// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from "node-fetch";
import type { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../config";
import { doc, getFirestore, setDoc } from "firebase/firestore";

type Data = {
  success: boolean;
  error?: string;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "GET" && req.method !== "POST")
    return res.status(405).json({
      success: false,
      error: "METHOD_NOT_ALLOWED",
      message: "Use GET or POST.",
    });

  if (!req.query.code)
    return res.status(400).json({
      success: false,
      error: "NO_OAUTH_CODE_PROVIDED",
    });

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);

  try {
    const redirectUri =
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3000/api/authorize/spotify"
        : "https://auti.one/api/authorize/spotify";

    const bodyData: { [k: string]: string } = {
      grant_type: "authorization_code",
      code: String(req.query.code),
      redirect_uri: redirectUri,
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

    console.log(res);

    if (res.status !== 200) {
      console.log(await res.text());
      throw new Error("Spotify OAuth request failed.");
    }

    const oauthData = (await res.json()) as {
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token: string;
      scope: string;
    };

    const userRes = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        "content-type": "application/json",
        authorization: `${oauthData.token_type} ${oauthData.access_token}`,
      },
    });
    const userData = (await userRes.json()) as { [k: string]: any };

    const ref = doc(db, "oauth-services", "spotify");

    if (!userData) throw new Error("Failed to verify user data.");
    if (userData.id !== process.env.SPOTIFY_USER_ID) throw new Error("Provided user is not trusted.");

    console.log(oauthData);

    await setDoc(ref, {
      data: {
        accessToken: oauthData.access_token,
        tokenType: oauthData.token_type,
        expiresIn: oauthData.expires_in,
        expiresAt: Date.now() + oauthData.expires_in * 1000,
        refreshToken: oauthData.refresh_token,
        scope: oauthData.scope,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: String(err),
    });
  }

  return res.status(200).json({
    success: true,
  });
}
