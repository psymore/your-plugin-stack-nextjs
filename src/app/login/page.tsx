// src/pages/login.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher } from "../../utils/api";
import AuthForm from "../../components/AuthForm";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      // Use the fetcher function to call the Next.js API route
      const res = await fetcher("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res) {
        router.push("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (error: any) {
      alert(error.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-10 flex flex-col justify-center bg-gray-100">
        <h1 className="text-3xl mb-6 text-blue-500 drop-shadow-lg">
          Login to Your Plugin Stack
        </h1>
        {/* <button
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
          onClick={() => signIn("google")}>
          Sign in with Google
        </button> */}
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
