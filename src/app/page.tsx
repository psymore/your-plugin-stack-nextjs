// // app/page.tsx

// import { redirect } from "next/navigation";

// export default function HomePage() {
//   // Automatically redirect to the login page
//   redirect("/login");

//   // The component doesn't need to return anything since it's redirected
//   return null;
// }

// app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to Your Plugin Stack
        </h1>
        <p className="mb-8">Manage your plugins with ease.</p>
        <div className="flex flex-col justify-center gap-4">
          <Link
            className="bg-blue-500 text-white px-4 py-2 rounded"
            id="login"
            href={"/login"}>
            Go to Login
          </Link>
          <Link
            className="bg-blue-500 text-white px-4 py-2 rounded"
            id="register"
            href={"/register"}>
            Go to Register
          </Link>
        </div>
      </div>
    </div>
  );
}
