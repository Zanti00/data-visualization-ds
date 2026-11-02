import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SpotiBai — Student Enrollment Visualization",
  description: "Interactive UP Diliman Student Enrollment Analytics (2016-2026) inspired by Spotify Design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="figma-grid-bg min-h-screen text-white antialiased selection:bg-[#1DB954] selection:text-black">
        {children}
      </body>
    </html>
  );
}
