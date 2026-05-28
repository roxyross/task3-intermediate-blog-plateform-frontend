import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import ParticlesBackground from "@/components/particles-background";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MY BLOG PLATFORM",
  description: "A modern, cyberpunk-inspired blog platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="cyberpunk"
          enableSystem={false}
          themes={["cyberpunk", "volcanic", "emerald"]}
        >
          <div className="relative min-h-screen flex flex-col">
            <ParticlesBackground />
            
            <Header />

            <main className="flex-grow container mx-auto px-4 py-8 relative">
              {children}
            </main>

            <footer className="py-8 border-t border-primary/20 glass">
              <div className="container mx-auto px-4 text-center text-muted-foreground">
                <p>&copy; 2026 MY BLOG PLATFORM. Built for the future.</p>
              </div>
            </footer>
          </div>
          <Toaster position="bottom-right" theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  );
}
