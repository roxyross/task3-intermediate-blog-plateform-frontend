"use client"

import { useState, useEffect } from "react";
import { blogsApi } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  MoreVertical,
  LoaderCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await blogsApi.getAll({ search: search || undefined });
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchBlogs, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog? This action cannot be undone.")) return;
    
    try {
      await blogsApi.delete(id);
      toast.success("Blog deleted successfully.");
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to delete blog.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold neon-text">BLOG_MANAGEMENT</h1>
          <p className="text-muted-foreground font-mono text-xs">Total records: {blogs.length}</p>
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
            <input 
              placeholder="FILTER_RECORDS..." 
              className="pl-10 glass neon-border bg-transparent py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary transition-all w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link href="/admin/blogs/new">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold rounded-md neon-glow transition-all">
              <Plus className="w-4 h-4" /> NEW_ENTRY
            </button>
          </Link>
        </div>
      </div>

      <div className="glass neon-border rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 font-mono text-xs text-primary border-b border-white/10">
            <tr>
              <th className="p-4">BLOG_TITLE</th>
              <th className="p-4">CATEGORY</th>
              <th className="p-4">STATUS</th>
              <th className="p-4">VIEWS</th>
              <th className="p-4">DATE_CREATED</th>
              <th className="p-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-20 text-center">
                    <LoaderCircle className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
                    <p className="font-mono text-sm">QUERYING_DATABASE...</p>
                  </td>
                </tr>
              ) : blogs.length > 0 ? (
                blogs.map((blog) => (
                  <motion.tr 
                    key={blog.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {blog.cover_image && (
                          <img src={blog.cover_image} className="w-10 h-10 rounded object-cover border border-white/10" />
                        )}
                        <span className="font-bold line-clamp-1">{blog.title}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
                        {blog.category.name.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {blog.status === "published" ? (
                        <span className="flex items-center gap-2 text-green-400 text-xs font-mono">
                          <CheckCircle className="w-3 h-3" /> PUBLISHED
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-yellow-400 text-xs font-mono">
                          <Clock className="w-3 h-3" /> DRAFT
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-mono text-sm">{blog.views.toLocaleString()}</td>
                    <td className="p-4 text-muted-foreground text-xs font-mono">
                      {format(new Date(blog.created_at), "yyyy-MM-dd")}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/blogs/${blog.slug}`}>
                          <button className="p-2 glass neon-border rounded hover:bg-primary/10 transition-all text-primary">
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>
                        <Link href={`/admin/blogs/edit/${blog.id}`}>
                          <button className="p-2 glass neon-border rounded hover:bg-blue-500/10 transition-all text-blue-400">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 glass neon-border rounded hover:bg-red-500/10 transition-all text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-20 text-center text-muted-foreground font-mono">
                    NO_ENTRIES_FOUND_IN_SYSTEM
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
