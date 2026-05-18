"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { blogsApi, categoriesApi } from "@/lib/api";
import { BlogEditor } from "@/components/blog-editor";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Globe, Eye, Image as ImageIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "<p>Start writing your transmission...</p>",
    excerpt: "",
    cover_image: "",
    category_id: "",
    status: "draft"
  });

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await categoriesApi.getAll();
        setCategories(res.data);
        if (res.data.length > 0) {
          setFormData(prev => ({ ...prev, category_id: res.data[0].id }));
        }
      } catch (error) {
        toast.error("Failed to load categories.");
      }
    };
    fetchCats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category_id) {
      toast.error("Please select a category.");
      return;
    }
    
    setLoading(true);
    try {
      await blogsApi.create(formData);
      toast.success("TRANSMISSION_SAVED: Blog created successfully.");
      router.push("/admin/blogs");
    } catch (error) {
      toast.error("TRANSMISSION_FAILED: Error saving blog.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const autoGenerateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    setFormData(prev => ({ ...prev, title, slug }));
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> CANCEL_OPERATION
        </button>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setFormData({ ...formData, status: "draft" })}
            className={`px-4 py-2 rounded font-mono text-xs transition-all ${formData.status === "draft" ? "glass neon-border text-primary" : "text-muted-foreground"}`}
          >
            DRAFT_MODE
          </button>
          <button 
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
                onChange={(e) => autoGenerateSlug(e.target.value)}
                placeholder="Enter a futuristic title..."
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
              <h3 className="font-bold border-b border-white/10 pb-2 text-primary font-mono text-sm">METADATA_CONFIG</h3>
              
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
                  placeholder="Short summary for the index..."
                  className="text-xs glass border-primary/20 min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground">COVER_IMAGE_URL</label>
                <div className="flex gap-2">
                  <Input 
                    value={formData.cover_image}
                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                    placeholder="https://..."
                    className="text-xs glass border-primary/20"
                  />
                  <div className="p-2 glass neon-border rounded">
                    <ImageIcon className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-md neon-glow flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {formData.status === "published" ? "BROADCAST_NOW" : "SAVE_LOCAL_BUFFER"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
