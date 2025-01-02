// src/app/create-stack/page.tsx

"use client"; // This is needed because we will use client-side form handling

import { useState } from "react";
import { useRouter } from "next/navigation";

interface StackForm {
  stackName: string;
  userId: string; // Assuming userId will be passed or selected, if needed
}

const CreateStackPage = () => {
  const [formData, setFormData] = useState<StackForm>({
    stackName: "",
    userId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter(); // To navigate after success (optional)

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/stack`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stackInfo: {
            stackName: formData.stackName,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create the stack.");
      }

      const data = await res.json();
      setSuccessMessage("Stack created successfully!");

      // Optional: Navigate to the list of stacks or another page
      // router.push("/stacks");
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a New Stack</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="stackName">Stack Name</label>
          <input
            type="text"
            id="stackName"
            name="stackName"
            value={formData.stackName}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Stack"}
        </button>
      </form>
    </div>
  );
};

export default CreateStackPage;
