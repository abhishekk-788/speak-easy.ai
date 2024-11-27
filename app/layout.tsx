import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/home/header";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SpeakEasy.AI",
  description: "SpeakEasy.AI is a transcription service for your videos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={fontSans.className}>
          <Header />
          <main>{children}</main>
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
