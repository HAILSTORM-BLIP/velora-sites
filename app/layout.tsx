import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Velora | Websites and Automation",
  description:
    "Velora builds premium websites and business automation systems for modern companies.",
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
