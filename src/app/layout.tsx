import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
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
            
            <header className="sticky top-0 z-40 w-full glass border-b border-primary/20">
              <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold neon-text tracking-tighter">
                  MY <span className="text-primary">BLOG</span> PLATFORM
                </Link>
                
                <nav className="hidden md:flex items-center space-x-8">
                  <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                  <Link href="/blogs" className="hover:text-primary transition-colors">Blogs</Link>
                  <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
                </nav>

                <div className="flex items-center space-x-4">
                  <ThemeSwitcher />
                  <Link href="/admin">
                    <button className="px-4 py-2 glass neon-border rounded-md hover:bg-primary/10 transition-all">
                      Admin
                    </button>
                  </Link>
                </div>
              </div>
            </header>

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
