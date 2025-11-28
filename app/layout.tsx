import type { Metadata } from "next";
import "./globals.css";
import FaviconHandler from "@/components/FaviconHandler";

const getSiteUrl = () => {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://jenodk.com';
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Jeno De Keyzer | Full-stack Developer | Freelancer",
    template: "%s | Jeno De Keyzer"
  },
  description: "Jeno De Keyzer - Full-stack developer with 10 years of experience. Partner at Practle, open to freelance opportunities. Expert in modern web technologies.",
  keywords: ['Jeno De Keyzer', 'jeno', 'jenodk', 'full-stack developer', 'freelancer', 'Practle', 'web developer', 'software engineer'],
  authors: [{ name: 'Jeno De Keyzer' }],
  creator: 'Jeno De Keyzer',
  publisher: 'Jeno De Keyzer',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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

