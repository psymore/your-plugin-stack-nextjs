// src/app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import { fetcher } from "../../utils/api";
import AuthForm from "../../components/AuthForm";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams(); // Use this to access query parameters
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there's a valid token (or session) to determine if the user is already logged in
    const token = localStorage.getItem("authToken"); // Or check cookies/session storage if you're using that
    if (token) {
      setIsLoggedIn(true);
      router.push("/dashboard"); // Redirect to dashboard if already logged in
    }
  }, [router]);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Use the fetcher function to call the Next.js API route
      const res = await fetcher("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res && res.token) {
        localStorage.setItem("authToken", res.token); // Store the token (or handle with cookies)
        const from = searchParams.get("from"); // Get 'from' from the query string
        router.push(from || "/dashboard"); // Redirect to 'from' or default to '/dashboard'
      } else {
        alert("Login failed");
      }
    } catch (error: any) {
      alert(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-10 flex flex-col justify-center bg-gray-100">
        <h1 className="text-3xl mb-6 text-blue-500 drop-shadow-lg">
          Login to Your Plugin Stack
        </h1>
        <AuthForm onSubmit={handleLogin} loading={loading} />
        <div className="flex justify-center items-center mt-4">
          <p className="text-md text-gray-500">
            Already have an account?{" "}
            <a href="/register" className="text-blue-700 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/logo.png')" }}>
        <div className="p-10 text-white">
          <h2 className="text-4xl mb-4">Your Plugin Stack</h2>
          <p>Manage plugins seamlessly with our platform.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
