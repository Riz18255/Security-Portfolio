import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Riaz Ahmed Ansari | Cybersecurity & Security Engineering",
  description: "Security projects, forensic investigations, web assessments, detection engineering, DevSecOps, and cloud lab practice by Riaz Ahmed Ansari.",
  robots: { index: false, follow: false },
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
