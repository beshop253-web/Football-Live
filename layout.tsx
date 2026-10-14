import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "../components/BottomNav";
import FloatingAI from "../components/FloatingAI";
import AuthGate from "../components/AuthGate";
import OnlineGate from "../components/OnlineGate";
import InstallBanner from "../components/InstallBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Football Live — Tout le football. En direct.",
  description:
    "Suivez les matchs en direct, classements, actualités. Application d'information football moderne.",
  applicationName: "Football Live",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Football Live",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0e17",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <AuthGate>
          <OnlineGate>
            <main className="flex-1 pb-safe max-w-lg mx-auto w-full relative">{children}</main>
            <BottomNav />
            <FloatingAI />
            <InstallBanner />
          </OnlineGate>
        </AuthGate>
      </body>
    </html>
  );
}
