import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://rizahmedportfolio.vercel.app";
const siteTitle = "Riaz Ahmed Ansari | Cybersecurity & Security Engineering";
const siteDescription =
  "Security projects, forensic investigations, web assessments, detection engineering, DevSecOps, and cloud lab practice by Riaz Ahmed Ansari.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: "Riaz Ahmed Ansari Portfolio",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
