import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sagar Janjoted | Software Engineer",

  description:
    "Backend-focused Full Stack Developer specializing in Java, Spring Boot, Node.js, Next.js, distributed systems, and scalable backend architecture.",

  keywords: [
    "Software Engineer",
    "Backend Developer",
    "Full Stack Developer",
    "Java",
    "Spring Boot",
    "Node.js",
    "Next.js",
    "React",
    "MongoDB",
    "PostgreSQL",
  ],

  authors: [{ name: "Sagar Janjoted" }],

  creator: "Sagar Janjoted",

  metadataBase: new URL("https://personal-portfolio-wheat-eta-20.vercel.app"),

  openGraph: {
    title: "Sagar Janjoted | Software Engineer",

    description:
      "Backend-focused Full Stack Developer building scalable systems and production-ready applications.",

    url: "https://personal-portfolio-wheat-eta-20.vercel.app",

    siteName: "Sagar Janjoted Portfolio",

    // images: [
    //   {
    //     url: "/og-image.png",
    //     width: 1200,
    //     height: 630,
    //   },
    // ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Sagar Janjoted | Software Engineer",

    description:
      "Backend-focused Full Stack Developer building scalable systems.",

    // images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
