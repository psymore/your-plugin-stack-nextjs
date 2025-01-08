"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthForm from "../../components/AuthForm";
import { fetcher } from "../../utils/api";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await fetcher("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("Response Data:", data);

      // Get token and message from the response
      const token = data.token;
      const message = data.message;

      console.log("Token:", token);
      console.log("Message:", message); // You can log the message for confirmation

      if (token) {
        // Set the auth-token in a cookie for session management
        Cookies.set("auth-token", token, { expires: 1 });

        // Redirect to dashboard after successful login
        router.push("/dashboard");
      } else {
        alert("Login failed. No token received.");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || "Login failed");
      } else {
        alert("Login failed");
      }
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
            Don't have an account?{" "}
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
