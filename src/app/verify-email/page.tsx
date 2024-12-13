// src/pages/confirm-email.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const VerifyEmailPage = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { token } = router.query; // token from URL

  const verifyEmail = async () => {
    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Email confirmed successfully!");
      } else {
        setError(data.message || "Failed to confirm email.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div>
      {message ? <p>{message}</p> : <p>Verifying your email...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default VerifyEmailPage;
