import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/(Homepage)/Navbar";
import WhatsappFloat from "@/components/Whatsapp";
import NavbarProvider from "@/components/Provider/NavbarProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ABC Institute ",
    template: "%s | ABC Institute Saharanpur Number #1 Coaching Institute",
  },
  description:
    "The most trusted and affordable educational platform for students in Saharanpur. Join online classes, get study materials, and excel in your exams.",
  keywords: [
    "Saharanpur education",
    "online classes sahranpur",
    "best coaching in Saharanpur",
    "Saharanpur students app",
  ],
  // openGraph : faceebok or whatsapp
  openGraph: {
    title: "Saharanpur's Trusted Educational Platform",
    description:
      "Affordable and quality education for every student in Saharanpur.",
    url: "https://your-domain.com", // Replace with your real domain
    siteName: "Saharanpur Education",
    images: [
      {
        url: "/og-image.jgp",
        width: 1200,
        height: 630,
        alt: "Learning in Saharanpur",
      },
    ],

    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ABC Institute",
    description: "Affordable and trusted education for Saharanpur students.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {/* <Navbar /> */}
        <NavbarProvider />
        {children}
        <WhatsappFloat />
      </body>
    </html>
  );
}
