"use client"

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { blogsApi } from "@/lib/api";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Eye, Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await blogsApi.getBySlug(slug as string);
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="font-mono text-primary">RETRIEVING_DATA_STREAM...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-32">
        <h1 className="text-4xl font-bold neon-text mb-4">404_DATA_NOT_FOUND</h1>
        <button 
          onClick={() => router.back()}
          className="text-primary hover:underline flex items-center justify-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" /> RETURN_TO_BASE
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto pb-20">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="mb-8 text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 font-mono text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> BACK_TO_LOGS
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Badge className="mb-4 bg-primary/20 text-primary border-primary/20">
          {blog.category.name.toUpperCase()}
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-12 border-y border-white/5 py-6 font-mono">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <span className="text-foreground">{blog.author.name.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{format(new Date(blog.published_at), "MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-primary" />
            <span>{blog.views.toLocaleString()} VIEWS</span>
          </div>
        </div>

        {blog.cover_image && (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 neon-border">
            <img 
              src={blog.cover_image} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div 
          className="prose prose-invert prose-primary max-w-none prose-headings:neon-text prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="mt-20 pt-12 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-muted-foreground">SHARE_LINK:</span>
            <button className="p-2 glass neon-border rounded-full hover:bg-primary/10 transition-all">
              <Share2 className="w-4 h-4 text-primary" />
            </button>
          </div>
          
          <div className="text-xs font-mono text-muted-foreground">
            CHECKSUM: {blog.id.replace(/-/g, "").slice(0, 16)}
          </div>
        </div>
      </motion.div>
    </article>
  );
}
