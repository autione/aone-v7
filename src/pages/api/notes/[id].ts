// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";

import type { NextApiRequest, NextApiResponse } from "next";
import { firebaseConfig } from "../../../config";

type Data = {
  success: boolean;
  error?: string;
  message?: string;
  id?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "DELETE" && req.method !== "PUT")
    return res.status(405).json({
      success: false,
      error: "METHOD_NOT_ALLOWED",
      message: "Use DELETE or PUT.",
    });

  if (!req.headers.authorization)
    return res.status(401).json({
      success: false,
      error: "NO_AUTHORIZATION_PROVIDED",
    });

  const auth = String(req.headers.authorization).replace("Bearer ", "");

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);

  initializeAuth(firebase);
  const authProvider = getAuth();
  try {
    await signInWithEmailAndPassword(
      authProvider,
      String(process.env.NOTES_USER_LOGIN),
      auth
    );

    const id = String(req.query.id);
    const ref = doc(db, "notes", id);

    switch (req.method) {
      case "PUT": {
        if (!req.body.title || !req.body.description || !req.body.content)
          return res.status(401).json({
            success: false,
            error: "MALFORMED_BODY",
          });

        const { title, description, content } = req.body as {
          title: string;
          description: string;
          content: string;
        };

        try {
          await updateDoc(ref, {
            title,
            description,
            content,
          });
        } catch (err) {
          console.error("Failed to edit post:", err);
          return res.status(500).json({
            success: false,
            error: "INTERNAL",
            message: String(err),
          });
        }

        return res.status(200).json({
          success: true,
        });
      }

      case "DELETE": {
        try {
          await deleteDoc(ref);
        } catch (err) {
          console.error("Failed to delete post:", err);
          return res.status(500).json({
            success: false,
            error: "DATABASE_ERROR",
            message: String(err),
          });
        }

        return res.status(200).json({
          success: true,
        });
      }
    }
  } catch (err) {
    console.error("Failed to authenticate user to post:", err);
    return res.status(403).json({
      success: false,
      error: "AUTH_ERROR",
    });
  }
}
