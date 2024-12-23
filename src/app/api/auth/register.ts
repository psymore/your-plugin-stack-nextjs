// src/app/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { fetcher } from "../../../utils/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Send request to backend to handle login
      const result = await fetcher("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      res.status(200).json(result);
    } catch (error: any) {
      const statusCode = error?.status || 500;
      res
        .status(statusCode)
        .json({ message: error.message || "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
