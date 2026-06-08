import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Armaan Tamboli | Mechanical Design Engineer",
  description:
    "A premium mechanical engineering portfolio showcasing CAD, simulation, product design, manufacturing drawings, and precision-engineered assemblies.",
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
