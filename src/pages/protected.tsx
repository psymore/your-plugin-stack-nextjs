import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Protected() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated ? <div>Welcome to the protected page!</div> : null;
}