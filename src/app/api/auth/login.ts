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
      const result = await fetcher("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (result.token) {
        // Send the token back to the frontend for storage in cookies/localStorage
        res.status(200).json({ token: result.token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
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
