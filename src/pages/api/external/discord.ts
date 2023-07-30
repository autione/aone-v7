import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  error?: string;
  message?: string;
  data?: {
    status: "online" | "idle" | "dnd" | "offline";
    avatar: string | null;
  };
};

interface DiscordWidgetResponse {
  id: string;
  name: string;
  instant_invite: string | null;
  channels: unknown[];
  members: DiscordWidgetMember[];
  presence_count: number;
}

interface DiscordWidgetMember {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  status: "online" | "idle" | "dnd";
  avatar_url: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "GET")
    return res.status(405).json({
      success: false,
      error: "METHOD_NOT_ALLOWED",
      message: "Use GET.",
    });

  try {
    const r = await fetch(String(process.env.DISCORD_WIDGET_ENDPOINT));
    const data: DiscordWidgetResponse = await r.json();

    return res.status(200).json({
      success: true,
      data:
        data.members.length > 0
          ? {
              status: data.members[0].status,
              avatar: data.members[0].avatar_url,
            }
          : {
              status: "offline",
              avatar: null,
            },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "INTERNAL",
    });
  }
}
