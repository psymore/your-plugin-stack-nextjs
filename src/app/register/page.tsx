"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "../../components/AuthForm";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (email: string, password: string) => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(res);

    if (res.ok) {
      router.push("/login");
    } else {
      console.error("Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-10 flex flex-col justify-center bg-gray-100">
        <h1 className="text-3xl mb-6 text-blue-500 drop-shadow-lg">
          Register to Your Plugin Stack
        </h1>
        <AuthForm onSubmit={handleRegister} loading={loading} />
      </div>
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/logo.png')" }}>
        <div className="p-10 text-white">
          <h2 className="text-4xl mb-4">Join the Plugin Revolution</h2>
          <p>Enhance your workflow by managing plugins effortlessly.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
