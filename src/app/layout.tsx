import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Science - Data Visualization",
  description: "Interactive UP Diliman Student Enrollment Analytics (2016-2026) inspired by Spotify Design",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body className="figma-grid-bg min-h-screen text-white antialiased selection:bg-[#1DB954] selection:text-black">
        {children}
      </body>
    </html>
  );
}
