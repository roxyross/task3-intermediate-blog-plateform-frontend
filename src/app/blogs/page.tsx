"use client"

import { useState, useEffect } from "react";
import { blogsApi, categoriesApi } from "@/lib/api";
import { BlogCard } from "@/components/blog-card";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [blogsRes, catsRes] = await Promise.all([
          blogsApi.getAll({ 
            search: search || undefined, 
            category_slug: selectedCategory || undefined,
            status: "published"
          }),
          categoriesApi.getAll()
        ]);
        setBlogs(blogsRes.data);
        setCategories(catsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("ERROR: Failed to establish connection with ARCHIVE_SERVER.");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, selectedCategory]);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold neon-text mb-2">ARCHIVE_LOGS</h1>
          <p className="text-muted-foreground">Explore all digital transmissions.</p>
        </div>

        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
          <Input 
            placeholder="SEARCH_DATABASE..." 
            className="pl-10 glass neon-border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Badge 
          variant={selectedCategory === null ? "default" : "outline"}
          className={`cursor-pointer px-4 py-1 ${selectedCategory === null ? "bg-primary text-primary-foreground" : "glass neon-border"}`}
          onClick={() => setSelectedCategory(null)}
        >
          ALL_CATEGORIES
        </Badge>
        {categories.map((cat) => (
          <Badge 
            key={cat.id}
            variant={selectedCategory === cat.slug ? "default" : "outline"}
            className={`cursor-pointer px-4 py-1 ${selectedCategory === cat.slug ? "bg-primary text-primary-foreground" : "glass neon-border"}`}
            onClick={() => setSelectedCategory(cat.slug)}
          >
            {cat.name.toUpperCase()}
          </Badge>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="font-mono text-primary">ACCESSING_SERVER...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <BlogCard blog={blog} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-xl text-muted-foreground">NO_RECORDS_FOUND</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
