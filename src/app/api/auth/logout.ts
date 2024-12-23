import { NextApiRequest, NextApiResponse } from "next";
import { fetcher } from "../../../utils/api"; // Assuming fetcher is used for backend requests

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    console.log("req.headers.authorization", req.headers.authorization);
    try {
      // Pass the Authorization header along with the token
      const result = await fetcher("/auth/logout", {
        method: "GET",
        headers: {
          Authorization: req.headers.authorization || "", // Forward the Authorization header
        },
        credentials: "include", // Include cookies
      });

      res.status(200).json(result); // Respond with the result from the backend
    } catch (error: any) {
      res.status(500).json({ message: "Logout failed" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
