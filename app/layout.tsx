import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Velora | Websites + Automation",
  description:
    "Velora builds premium websites and automation systems for local businesses that need more trust, more calls, and less manual work.",
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
