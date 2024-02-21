import type { Metadata } from "next";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
      <body className="flex min-h-screen flex-col items-center justify-between p-24 bg-neutral-900 text-neutral-100">
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
