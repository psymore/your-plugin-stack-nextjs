"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "../../components/AuthForm";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      console.error("Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-10 flex flex-col justify-center bg-gray-100">
        <h1 className="text-3xl mb-6">Welcome to Your Plugin Stack</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
          onClick={() => signIn("google")}>
          Sign in with Google
        </button>
        <AuthForm onSubmit={handleLogin} loading={loading} />
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

export default LoginPage;
