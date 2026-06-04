import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jishan Builds | Simple Cinematic Websites",
  description:
    "A dark, cinematic website concept for simple premium landing pages with restrained motion, clear copy, and one strong call to action.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
