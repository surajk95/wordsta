import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";
import Controls from "./components/controls";
import { Progress } from "./components/progress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wordsta",
  description: "Practice English words",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <Controls />
        {children}
        <Progress />
      </body>
    </html>
  );
}
