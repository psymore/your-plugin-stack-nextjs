import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock authentication function to simulate current user (can be replaced with real auth)
const getCurrentUserId = async () => {
  const userCookies = await cookies();

  return userCookies.get("userId");
};

// Fetch stacks for a specific user
const fetchStacks = async (userId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/stack?userId=${userId}`
  );
  if (!res.ok) throw new Error("Failed to fetch stacks");
  return res.json();
};

// Create a new stack mutation
const createStack = async (stackData: {
  stackName: string;
  userId: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/stack`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stackData),
  });

  if (!res.ok) throw new Error("Failed to create stack");
  return res.json();
};

interface Stack {
  id: string;
  name: string;
}

export const StackList = async ({
  stacks,
  userId,
}: {
  stacks: Array<Stack>;
  userId: string;
}) => {
  const [stackName, setStackName] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const loggedInUserId = getCurrentUserId(); // This is the current logged-in user's ID
  const userIdCookie = await loggedInUserId;
  const isOwner = userIdCookie?.value === userId; // Check if user is visiting their own page

  // Fetch stacks for the user
  const {
    data: fetchedStacks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stacks", userId],
    queryFn: () => fetchStacks(userId),
  });

  // Mutation for creating a stack
  const mutation = useMutation({
    mutationFn: (newStack: { stackName: string; userId: string }) =>
      createStack(newStack),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stacks", userId] }); // Refetch stacks after creating one
    },
  });

  // Handle creating a stack
  const handleCreateStack = async () => {
    if (!stackName) return;
    const userId = await loggedInUserId; // Await the promise to get the user ID
    mutation.mutate({
      stackName,
      userId: userId?.value || "", // Ensure userId is a string
    });
    setStackName(""); // Clear the input after creation
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading stacks</p>;

  return (
    <div>
      <h1>{isOwner ? "Your Stacks" : `Stacks of User ${userId}`}</h1>

      {/* Show the Create Stack form only if the logged-in user is the owner of the page */}
      {isOwner && (
        <div>
          <h2>Create a New Stack</h2>
          <input
            type="text"
            value={stackName}
            onChange={e => setStackName(e.target.value)}
            placeholder="Stack Name"
          />
          <button
            onClick={() => handleCreateStack()}
            disabled={mutation.status === "pending"}>
            {mutation.status === "pending" ? "Creating..." : "Create Stack"}
          </button>
          {mutation.error && (
            <p style={{ color: "red" }}>{(mutation.error as Error).message}</p>
          )}
        </div>
      )}

      {/* List stacks */}
      <ul>
        {fetchedStacks.map((stack: any) => (
          <li key={stack.id}>{stack.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StackList;
