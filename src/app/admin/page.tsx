"use client"

import { useState, useEffect } from "react";
import { blogsApi, categoriesApi, authApi } from "@/lib/api";
import { motion } from "framer-motion";
import { 
  FileText, 
  Layers, 
  BarChart3, 
  Plus, 
  Settings, 
  LogOut, 
  ChevronRight,
  Eye,
  MessageSquare,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalViews: 0,
    totalCategories: 0,
    publishedBlogs: 0
  });

  const handleLogout = async () => {
    try {
      await authApi.logout();
      toast.success("SESSION_TERMINATED: Securely logged out.");
      router.push("/admin/login");
    } catch (error) {
      toast.error("ERROR: Failed to terminate session.");
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogsRes, catsRes] = await Promise.all([
          blogsApi.getAll({ limit: 1000 }),
          categoriesApi.getAll()
        ]);
        
        const blogs = blogsRes.data;
        setStats({
          totalBlogs: blogs.length,
          totalViews: blogs.reduce((acc, b) => acc + b.views, 0),
          totalCategories: catsRes.data.length,
          publishedBlogs: blogs.filter(b => b.status === "published").length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "TOTAL_ENTRIES", value: stats.totalBlogs, icon: FileText, color: "text-blue-400" },
    { label: "NET_TRAFFIC", value: stats.totalViews.toLocaleString(), icon: Eye, color: "text-primary" },
    { label: "ACTIVE_CATEGORIES", value: stats.totalCategories, icon: Layers, color: "text-purple-400" },
    { label: "PUBLISHED_NODES", value: stats.publishedBlogs, icon: Zap, color: "text-yellow-400" }
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold neon-text mb-2">DASHBOARD_CORE</h1>
          <p className="text-muted-foreground font-mono text-sm">Welcome back, ROOT_ADMIN. System status: OPTIMAL.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/blogs/new">
            <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-bold rounded-md neon-glow transition-all">
              <Plus className="w-4 h-4" /> CREATE_NEW_BLOG
            </button>
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2 glass neon-border rounded-md hover:bg-red-500/10 text-red-500 transition-all"
          >
            <LogOut className="w-4 h-4" /> LOGOUT
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass neon-border p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon className="w-12 h-12" />
              </div>
              <p className="text-xs font-mono text-muted-foreground mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className={`text-3xl font-bold ${stat.color} neon-text`}>{stat.value}</h3>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <section className="glass neon-border rounded-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> SYSTEM_QUICK_LINKS
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { label: "MANAGE_BLOGS", href: "/admin/blogs", icon: FileText },
              { label: "MANAGE_CATEGORIES", href: "/admin/categories", icon: Layers },
              { label: "SYSTEM_SETTINGS", href: "/admin/settings", icon: Settings },
              { label: "PUBLIC_SITE", href: "/", icon: ChevronRight }
            ].map((link) => (
              <Link key={link.label} href={link.href}>
                <div className="flex items-center justify-between p-4 glass border border-white/5 rounded-lg hover:border-primary/50 transition-all group">
                  <div className="flex items-center gap-3">
                    <link.icon className="w-4 h-4 text-primary" />
                    <span className="font-mono text-sm">{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="glass neon-border rounded-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" /> RECENT_ACTIVITY
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-center text-muted-foreground font-mono text-sm py-12">
              &gt; No recent security alerts. <br />
              &gt; Content sync complete. <br />
              &gt; Monitoring node-01...
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
