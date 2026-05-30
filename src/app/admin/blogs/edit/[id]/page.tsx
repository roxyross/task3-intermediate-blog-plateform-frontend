"use client"

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { blogsApi, categoriesApi } from "@/lib/api";
import { BlogEditor } from "@/components/blog-editor";
import { motion } from "framer-motion";
import { ArrowLeft, Save, LoaderCircle, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    cover_image: "",
    category_id: "",
    status: "draft"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, catsRes] = await Promise.all([
          blogsApi.getAll({ limit: 1000 }), // We need to find the specific blog by ID
          categoriesApi.getAll()
        ]);
        
        // FastAPI returns the specific blog when querying by ID if we had that endpoint
        // But for now, we'll find it in the list or assume an endpoint exists
        // Actually, I'll update the backend to support GET /blogs/id/ soon
        // For now, let's use the list filter if available, or just fetch all
        const blog = blogRes.data.find((b: any) => b.id === id);
        
        if (blog) {
          setFormData({
            title: blog.title,
            slug: blog.slug,
            content: blog.content,
            excerpt: blog.excerpt || "",
            cover_image: blog.cover_image || "",
            category_id: blog.category_id,
            status: blog.status
          });
        }
        setCategories(catsRes.data);
      } catch (error) {
        toast.error("Failed to load blog data.");
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await blogsApi.update(id as string, formData);
      toast.success("TRANSMISSION_UPDATED: Changes saved successfully.");
      router.push("/admin/blogs");
    } catch (error) {
      toast.error("UPDATE_FAILED: Error saving changes.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <LoaderCircle className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="font-mono text-primary">ACCESSING_DATA_NODE...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> CANCEL_EDIT
        </button>
        
        <div className="flex gap-4">
          <button 
            type="button"
            onClick={() => setFormData({ ...formData, status: "draft" })}
            className={`px-4 py-2 rounded font-mono text-xs transition-all ${formData.status === "draft" ? "glass neon-border text-primary" : "text-muted-foreground"}`}
          >
            DRAFT_MODE
          </button>
          <button 
            type="button"
            onClick={() => setFormData({ ...formData, status: "published" })}
            className={`px-4 py-2 rounded font-mono text-xs transition-all ${formData.status === "published" ? "glass neon-border text-green-400" : "text-muted-foreground"}`}
          >
            PUBLISH_MODE
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-primary">BLOG_TITLE</label>
              <Input 
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Blog title..."
                className="text-2xl font-bold glass border-primary/20 h-14"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-primary">CONTENT_STREAM</label>
              <BlogEditor 
                content={formData.content} 
                onChange={(html) => setFormData({ ...formData, content: html })} 
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass neon-border p-6 rounded-xl space-y-6">
              <h3 className="font-bold border-b border-white/10 pb-2 text-primary font-mono text-sm">METADATA_UPDATE</h3>
              
              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground">URL_SLUG</label>
                <Input 
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="font-mono text-xs glass border-primary/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground">CATEGORY_NODE</label>
                <select 
                  className="w-full bg-white/5 border border-primary/20 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id} className="bg-slate-900">{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground">EXCERPT_PREVIEW</label>
                <Textarea 
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Summary..."
                  className="text-xs glass border-primary/20 min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground">COVER_IMAGE_URL</label>
                <Input 
                  value={formData.cover_image}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  placeholder="https://..."
                  className="text-xs glass border-primary/20"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-md neon-glow flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {loading ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                CONFIRM_CHANGES
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
