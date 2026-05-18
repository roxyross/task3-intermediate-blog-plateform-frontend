"use client"

import { useState, useEffect } from "react";
import { categoriesApi } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Loader2,
  CheckCircle,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#00f2ff"
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await categoriesApi.getAll();
      setCategories(res.data);
    } catch (error) {
      toast.error("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await categoriesApi.update(editingCategory.id, formData);
        toast.success("Category updated.");
      } else {
        await categoriesApi.create(formData);
        toast.success("Category created.");
      }
      setIsOpen(false);
      setEditingCategory(null);
      setFormData({ name: "", slug: "", description: "", color: "#00f2ff" });
      fetchCategories();
    } catch (error) {
      toast.error("Operation failed. Check if slug is unique.");
    }
  };

  const handleEdit = (cat: any) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      color: cat.color
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category? Blogs using it may be affected.")) return;
    try {
      await categoriesApi.delete(id);
      toast.success("Category deleted.");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon-text">CATEGORY_MANAGEMENT</h1>
          <p className="text-muted-foreground font-mono text-xs">Manage system classification nodes.</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button 
              onClick={() => {
                setEditingCategory(null);
                setFormData({ name: "", slug: "", description: "", color: "#00f2ff" });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold rounded-md neon-glow transition-all"
            >
              <Plus className="w-4 h-4" /> ADD_NODE
            </button>
          </DialogTrigger>
          <DialogContent className="glass neon-border text-foreground">
            <DialogHeader>
              <DialogTitle className="neon-text">
                {editingCategory ? "EDIT_CATEGORY_NODE" : "REGISTER_NEW_NODE"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-primary">NODE_NAME</label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Cyberpunk"
                  className="glass border-primary/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-primary">NODE_SLUG</label>
                <Input 
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. cyberpunk"
                  className="glass border-primary/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-primary">DESCRIPTION</label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="System details..."
                  className="glass border-primary/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-primary">ACCENT_COLOR</label>
                <div className="flex gap-4 items-center">
                  <Input 
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-12 h-10 p-1 glass border-primary/20"
                  />
                  <span className="font-mono text-xs text-muted-foreground">{formData.color.toUpperCase()}</span>
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-md neon-glow transition-all mt-6">
                {editingCategory ? "UPDATE_NODE" : "CONFIRM_REGISTRATION"}
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            </div>
          ) : categories.map((cat) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass neon-border p-6 rounded-xl flex flex-col group relative overflow-hidden"
              style={{ borderLeftColor: cat.color, borderLeftWidth: '4px' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold tracking-tight">{cat.name}</h3>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(cat)} className="p-2 hover:text-primary transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(cat.id)} className="p-2 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-6 flex-grow">{cat.description || "No description available."}</p>
              <div className="flex items-center justify-between text-xs font-mono mt-auto">
                <span className="text-muted-foreground">SLUG: {cat.slug}</span>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color, boxShadow: `0 0 10px ${cat.color}` }} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
