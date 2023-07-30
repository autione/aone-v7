import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, signInWithEmailAndPassword } from "firebase/auth";
import { deleteDoc, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

import type { NextApiRequest, NextApiResponse } from "next";
import { firebaseConfig } from "../../../config";

type Data = {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
  id?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (!["GET", "DELETE", "PUT"].includes(String(req.method)))
    return res.status(405).json({
      success: false,
      error: "METHOD_NOT_ALLOWED",
      message: "Use GET, DELETE or PUT.",
    });

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);

  if (req.method === "GET") {
    const id = String(req.query.id);
    const ref = doc(db, "notes", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return res.status(404).json({
        success: false,
        error: "NOT_FOUND",
      });
    }

    const data = snap.data();
    return res.status(200).json({
      id,
      success: true,
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
        created_at: data.created_at,
        hidden: data.hidden || false,
        views: data.views || 0,
      },
    });
  }

  if (!req.headers.authorization)
    return res.status(401).json({
      success: false,
      error: "NO_AUTHORIZATION_PROVIDED",
    });

  const auth = String(req.headers.authorization).replace("Bearer ", "");

  initializeAuth(firebase);
  const authProvider = getAuth();
  try {
    await signInWithEmailAndPassword(authProvider, String(process.env.NOTES_USER_LOGIN), auth);

    const id = String(req.query.id);
    const ref = doc(db, "notes", id);

    switch (req.method) {
      case "PUT": {
        if (!req.body.title || !req.body.description || !req.body.content)
          return res.status(401).json({
            success: false,
            error: "MALFORMED_BODY",
          });

        const { title, description, content, hidden } = req.body as {
          title: string;
          description: string;
          content: string;
          hidden?: boolean;
        };

        try {
          await updateDoc(ref, {
            title,
            description,
            content,
            hidden,
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
