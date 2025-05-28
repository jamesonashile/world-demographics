"use client"

import "./globals.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/reactQueryClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
