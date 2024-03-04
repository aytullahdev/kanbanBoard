import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/utils/Provider";
import AuthContextProvider from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "A simple Kanban Board",
};
// Create a client

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-between px-5 bg-neutral-900 text-neutral-100">
        <AuthContextProvider>
          <Navbar />
          <Providers> {children}</Providers>
        </AuthContextProvider>
      </body>
    </html>
  );
}
