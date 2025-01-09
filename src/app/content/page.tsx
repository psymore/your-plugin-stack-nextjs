"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [content, setContent] = useState({ title: "", body: "" });

  useEffect(() => {
    // Get the value of the isAuthenticated cookie
    const authStatus = Cookies.get("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);

    console.log("Cookies.get(isAuthenticated:", Cookies.get("isAuthenticated"));

    // Set content based on authentication status
    if (authStatus) {
      setContent({
        title: "Full Content for Registered Users",
        body: "Welcome to the full content section! This content is only visible to registered users.",
      });
    } else {
      setContent({
        title: "Partial Content for Visitors",
        body: "This is the teaser content. Please log in to access the full content.",
      });
    }
  }, []);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.body}</p>
    </div>
  );
};

export default Dashboard;
