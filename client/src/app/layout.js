// src/app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Tutor",
  description: "An AI tutor for kids in ravaged war zones",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body className={inter.className}>{children}</body>
      </html>
  );
}
