// src/app/api/auth/verify-email.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { fetcher } from "../../../utils/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { token } = req.body;

    try {
      // Send request to backend to verify email using the fetcher function
      const result = await fetcher("/auth/confirm-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      res.status(200).json(result);
    } catch (error: any) {
      // Handle different types of errors
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
