"use client";
// src/pages/confirm-email.tsx
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ConfirmEmailPage = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams ? searchParams.get("token") : null; // token from URL

  console.log(token);

  const confirmEmail = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/confirm-email?token=${token}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Email confirmed successfully!");
        // Navigate to the login page after successful confirmation
        router.push("/login");
      } else {
        setError(data.message || "Failed to confirm email.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  useEffect(() => {
    if (token) {
      confirmEmail();
    }
  }, [token]);

  return (
    <div>
      {message ? <p>{message}</p> : <p>Verifying your email...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ConfirmEmailPage;
