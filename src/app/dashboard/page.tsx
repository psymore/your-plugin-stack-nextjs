"use client";

import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import { fetcher } from "../../utils/api";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetcher("/auth/logout");

      if (response) {
        console.log(response);
        router.push("/login");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <h1>Welcome to the dashboard!</h1>
      <button
        className="font-bold bg-blue-500 text-white py-2 px-4 rounded hover:bg-gradient-to-r from-blue-500 to-red-500 hover:font-bold"
        onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
