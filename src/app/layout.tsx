import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import ClientProvider from "./ClientProvider"; // Import the client-side component

// Font configuration
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Your Plugin Stack",
  description: "Manage your plugins efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          {/* Optional Header */}
          <header className="bg-gray-700 text-white py-4">
            <div className="container mx-auto">
              <h1 className="text-xl font-bold">Your Plugin Stack</h1>
            </div>
          </header>

          {/* Main content */}
          <ClientProvider>
            <main className="flex-grow container mx-auto px-4">{children}</main>
          </ClientProvider>

          {/* Optional Footer */}
          <footer className="bg-gray-800 text-white py-4 mt-auto">
            <div className="container mx-auto text-center">
              <p>
                &copy; {new Date().getFullYear()} Your Plugin Stack. All rights
                reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
