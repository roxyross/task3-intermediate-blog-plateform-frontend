"use client"

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export function BlogCard({ blog }: { blog: any }) {
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        className="glass neon-border rounded-xl overflow-hidden h-full flex flex-col group transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,242,255,0.3)]"
      >
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={blog.cover_image} 
            alt={blog.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary/80 backdrop-blur-md text-primary-foreground border-none">
              {blog.category.name}
            </Badge>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-primary" />
              {format(new Date(blog.published_at), "MMM d, yyyy")}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-primary" />
              {blog.views.toLocaleString()}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {blog.title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
            {blog.excerpt}
          </p>

          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              READ_ENTRY -&gt;
            </span>
            <span className="text-muted-foreground">
              ID: {blog.id.slice(0, 8)}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
