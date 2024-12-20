export const fetcher = async (url: string, options = {}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`, {
    ...options,
    credentials: "include", // Include cookies in the request
  });

  if (!res.ok) {
    const errorData = await res.json(); // Get error message from the response
    const errorMessage =
      errorData?.error || "An error occurred while fetching the data.";
    throw new Error(errorMessage); // Throw the specific error message from backend
  }

  return res.json();
};
