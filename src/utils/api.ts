export const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const fetcher = async (url: string, options = {}) => {
  const res = await fetch(`${BACKEND_API_URL}${url}`, options);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }
  return res.json();
};
