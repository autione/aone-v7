import type { NextApiRequest, NextApiResponse } from "next";

import { initializeApp } from "firebase/app";
import { DocumentReference, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { firebaseConfig } from "../../../config";
import { OAuthService } from "../../../types";

type Data = {
  success: boolean;
  error?: string;
  message?: string;
  data?: {
    active: boolean;
    session?: {
      type: "track" | "podcast" | "local" | "private";
      track?: string;
      album?: string;
      artists?: string[];
      cover?: string;
      source: string | null;
      playing: boolean;
    };
  };
};

const renewToken = async (service: OAuthService, ref: DocumentReference) => {
  const bodyData: { [k: string]: string } = {
    grant_type: "refresh_token",
    refresh_token: service.data.refreshToken,
  };

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_OAUTH_CLIENT_ID}:${process.env.SPOTIFY_OAUTH_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: Object.keys(bodyData)
      .map((property) => `${encodeURIComponent(property)}=${encodeURIComponent(bodyData[property])}`)
      .join("&"),
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
    refreshToken: service.data.refreshToken,
    scope: oauthData.scope,
  };

  await setDoc(ref, {
    data: newData,
  });

  return {
    service: "spotify",
    data: newData,
  } as OAuthService;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "GET")
    return res.status(405).json({
      success: false,
      error: "METHOD_NOT_ALLOWED",
      message: "Use GET.",
    });

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);
  const authProvider = getAuth(firebase);

  try {
    await signInWithEmailAndPassword(authProvider, String(process.env.FLAKE_USER), String(process.env.FLAKE_PASS));

    const ref = doc(db, "oauth-services", "spotify");
    const snap = await getDoc(ref);
    let service = snap.data() as OAuthService;

    if (Date.now() >= service.data.expiresAt) service = await renewToken(service, ref);

    const r = await fetch("https://api.spotify.com/v1/me/player", {
      headers: {
        "content-type": "application/json",
        authorization: `${service.data.tokenType} ${service.data.accessToken}`,
      },
    });

    switch (r.status) {
      case 200: {
        const data = (await r.json()) as any; // It's a bunch of data to type out

        if (data.device.is_private_session) {
          return res.status(200).json({
            success: true,
            data: {
              active: true,
              session: {
                type: "private",
                playing: true,
                source: null,
              },
            },
          });
        }

        if (data.item?.is_local)
          return res.status(200).json({
            success: true,
            data: {
              active: true,
              session: {
                type: "local",
                playing: data.is_playing,
                source: null,
                track: data.item.name,
                album: data.item.album.name,
                artists: data.item.artists.map((a: any) => a.name),
              },
            },
          });

        switch (data.currently_playing_type) {
          case "track":
            return res.status(200).json({
              success: true,
              data: {
                active: true,
                session: {
                  type: "track",
                  playing: data.is_playing,
                  source: data.item?.id || null,
                  track: data.item.name,
                  album: data.item.album.name,
                  cover: data.item.album.images[0].url,
                  artists: data.item.artists.map((a: any) => a.name),
                },
              },
            });

          case "episode":
            return res.status(200).json({
              success: true,
              data: {
                active: true,
                session: {
                  type: "podcast",
                  playing: data.is_playing,
                  source: null,
                },
              },
            });

          default:
            return res.status(200).json({
              success: true,
              data: {
                active: true,
                session: {
                  type: "private",
                  playing: true,
                  source: null,
                },
              },
            });
        }
      }

      case 204: {
        return res.status(200).json({
          success: true,
          data: {
            active: false,
          },
        });
      }

      default: {
        return res.status(500).json({
          success: false,
          error: "UNKNOWN_STATUS",
        });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "INTERNAL",
    });
  }
}
