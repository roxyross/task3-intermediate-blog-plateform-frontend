"use client"

import { useState, useEffect } from "react";
import { categoriesApi } from "@/lib/api";
import { motion } from "framer-motion";
import { Loader2, Layers } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoriesApi.getAll();
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("ERROR: Failed to establish connection with ARCHIVE_SERVER.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold neon-text mb-2">SYSTEM_CATEGORIES</h1>
        <p className="text-muted-foreground">Browse transmissions by classification node.</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="font-mono text-primary">SCANNING_NODES...</p>
        </div>
      ) : categories.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blogs?category_slug=${cat.slug}`}>
                <Card className="glass neon-border p-8 hover:bg-white/[0.05] transition-all group relative overflow-hidden">
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 opacity-10 group-hover:opacity-20 transition-opacity rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <Layers className="w-8 h-8 mb-4" style={{ color: cat.color }} />
                  <h2 className="text-2xl font-bold mb-2">{cat.name}</h2>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {cat.description || "Digital data classification node."}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-muted-foreground">NODE_ID: {cat.slug.toUpperCase()}</span>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color, boxShadow: `0 0 10px ${cat.color}` }} />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass neon-border rounded-xl">
          <p className="text-xl text-muted-foreground font-mono">NO_CATEGORIES_FOUND_IN_SYSTEM</p>
        </div>
      )}
    </div>
  );
}
