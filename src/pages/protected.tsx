import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async context => {
  const cookies = context.req.headers.cookie || "";

  // Check if the auth-token cookie exists
  if (!cookies.includes("auth-token")) {
    // Redirect to login if the auth-token is missing
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // If the auth-token is present, allow access to the page
  return {
    props: {}, // Return empty props if authenticated
  };
};

export default function Protected() {
  return (
    <div>
      <h1>Welcome to the protected page!</h1>
    </div>
  );
}
