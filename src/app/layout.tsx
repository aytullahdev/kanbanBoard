import type { Metadata } from "next";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Providers from "@/utils/Provider";

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
        <Navbar />
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
