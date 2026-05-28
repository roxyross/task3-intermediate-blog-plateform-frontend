"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LogOut, LayoutDashboard } from "lucide-react";
import { authApi } from "@/lib/api";
import { toast } from "sonner";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    try {
      await authApi.logout();
      toast.success("SESSION_TERMINATED: Securely logged out.");
      router.push("/admin/login");
    } catch (error) {
      toast.error("ERROR: Failed to terminate session.");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-primary/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold neon-text tracking-tighter">
          MY <span className="text-primary">BLOG</span> PLATFORM
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className={`hover:text-primary transition-colors ${pathname === "/" ? "text-primary" : ""}`}>Home</Link>
          <Link href="/blogs" className={`hover:text-primary transition-colors ${pathname.startsWith("/blogs") ? "text-primary" : ""}`}>Blogs</Link>
          <Link href="/categories" className={`hover:text-primary transition-colors ${pathname.startsWith("/categories") ? "text-primary" : ""}`}>Categories</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeSwitcher />
          
          {isAdmin && !isLoginPage ? (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 glass neon-border rounded-md hover:bg-red-500/10 text-red-500 transition-all"
            >
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <Link href="/admin">
              <button className="flex items-center gap-2 px-4 py-2 glass neon-border rounded-md hover:bg-primary/10 transition-all">
                <LayoutDashboard className="w-4 h-4" /> <span className="hidden sm:inline">Admin</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
