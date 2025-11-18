import type { Metadata } from "next";
import "./globals.css";
import FaviconHandler from "@/components/FaviconHandler";

export const metadata: Metadata = {
  title: "Jeno De Keyzer - Full-stack Developer",
  description: "Full-stack developer with 10 years of experience. Partner at Practle, open to freelance opportunities.",
  icons: {
    icon: '/images/logo_light.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <FaviconHandler />
        {children}
      </body>
    </html>
  );
}

