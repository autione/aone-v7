import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { firebaseConfig } from "../../../config";
import slug from "slug";

type Data = {
  success: boolean;
  error?: string;
  message?: string;
  id?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      error: "METHOD_NOT_ALLOWED",
      message: "Use POST.",
    });

  if (!req.headers.authorization)
    return res.status(401).json({
      success: false,
      error: "NO_AUTHORIZATION_PROVIDED",
    });

  if (!req.body.title || !req.body.description || !req.body.content)
    return res.status(401).json({
      success: false,
      error: "MALFORMED_BODY",
    });

  const auth = String(req.headers.authorization).replace("Bearer ", "");
  const { title, description, content, hidden } = req.body as {
    title: string;
    description: string;
    content: string;
    hidden: boolean;
  };

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);

  initializeAuth(firebase);
  const authProvider = getAuth();
  try {
    await signInWithEmailAndPassword(authProvider, String(process.env.NOTES_USER_LOGIN), auth);

    const rnd = () =>
      Math.floor(Math.random() * 9999 + 1)
        .toString(16)
        .padStart(4, "0");

    const id = `${slug(title)}-${rnd()}`;
    try {
      await setDoc(doc(db, "notes", id), {
        title,
        description,
        content,
        created_at: Date.now(),
        hidden,
      });
    } catch (err) {
      console.error("Failed to create post:", err);
      return res.status(500).json({
        success: false,
        error: "DATABASE_REQUEST",
        message: String(err),
      });
    }

    return res.status(200).json({
      success: true,
      id,
    });
  } catch (err) {
    console.error("Failed to authenticate user to post:", err);
    return res.status(403).json({
      success: false,
      error: "AUTH_ERROR",
    });
  }
}
