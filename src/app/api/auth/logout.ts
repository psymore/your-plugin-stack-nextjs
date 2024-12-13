// src/app/api/auth/logout.ts
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    // Destroy session here
    res.redirect("/");
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
};
