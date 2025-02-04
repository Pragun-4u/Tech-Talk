/* eslint-disable camelcase */
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import "../app/globals.css";
import "../styles/prism.css";
import { ThemeProvider } from "@/context/ThemeProvider";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});
export const metadata: Metadata = {
  title: "Tech Talk",
  description:
    "Tech Talk, by Pragun, is your ultimate platform for coding discussions and collaboration. Join a vibrant community of developers worldwide to ask and answer programming questions. Get expert help, collaborate on projects, and share knowledge. Dive into a world of coding excellence with Tech Talk!",

  icons: {
    icon: "/app/Bird-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Tech Talk | By Pragun</title>
      <meta name="title" content="Tech Talk | By Pragun" />
      <meta
        name="description"
        content=" Tech Talk, By Pragun, is your ultimate platform for coding discussions and collaboration. Join a vibrant community of developers worldwide to ask and answer programming questions. Get expert help, collaborate on projects, and share knowledge. Dive into a world of coding excellence with Tech Talk!
"
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://techtalk.pragun.cloud" />
      <meta property="og:title" content="Tech Talk | By Pragun" />
      <meta
        property="og:description"
        content=" Tech Talk, By Pragun, is your ultimate platform for coding discussions and collaboration. Join a vibrant community of developers worldwide to ask and answer programming questions. Get expert help, collaborate on projects, and share knowledge. Dive into a world of coding excellence with Tech Talk!
"
      />
      <meta property="og:image" content="./Tech-Talk-Preview.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://techtalk.pragun.cloud" />
      <meta property="twitter:title" content="Tech Talk | By Pragun" />
      <meta
        property="twitter:description"
        content=" Tech Talk, By Pragun, is your ultimate platform for coding discussions and collaboration. Join a vibrant community of developers worldwide to ask and answer programming questions. Get expert help, collaborate on projects, and share knowledge. Dive into a world of coding excellence with Tech Talk!
"
      />
      <meta property="twitter:image" content="./Tech-Talk-Preview.png" />

      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
