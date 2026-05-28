"use client"

import { Hero } from "@/components/hero";
import { BlogCard } from "@/components/blog-card";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";

// Sample data for initial preview
const sampleBlogs = [
  {
    id: "1",
    title: "Welcome to the Future",
    slug: "welcome-to-the-future",
    excerpt: "An introduction to our new blog platform with cyberpunk aesthetics.",
    cover_image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80",
    category: { name: "Cyberpunk", color: "#00f2ff" },
    published_at: new Date().toISOString(),
    views: 1240
  },
  {
    id: "2",
    title: "Building with FastAPI",
    slug: "building-with-fastapi",
    excerpt: "Learn why we chose FastAPI for our backend development.",
    cover_image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    category: { name: "Development", color: "#00ff00" },
    published_at: new Date().toISOString(),
    views: 850
  },
  {
    id: "3",
    title: "Design Trends 2026",
    slug: "design-trends-2026",
    excerpt: "Exploring the visual future of web interfaces and neon glows.",
    cover_image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
    category: { name: "Design", color: "#ff00ff" },
    published_at: new Date().toISOString(),
    views: 2100
  }
];

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      <Hero />

      <section>
        <div className="flex items-center justify-between mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold neon-text"
          >
            LATEST <span className="text-primary">TRANSMISSIONS</span>
          </motion.h2>
          <Link href="/blogs">
            <button className="text-primary hover:underline font-mono text-sm">VIEW_ALL_LOGS</button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="glass neon-border rounded-2xl p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <h2 className="text-4xl font-bold mb-6 neon-text">STAY SYNCHRONIZED</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join our network to receive the latest updates, tutorials, and insights from the digital frontier.
        </p>
        <div className="flex max-w-md mx-auto gap-4">
          <input 
            type="email" 
            placeholder="ENTER_EMAIL_ADDRESS" 
            className="flex-grow bg-white/5 border-primary/20 focus:border-primary outline-none px-4 rounded-md transition-all"
          />
          <button 
            onClick={() => toast.success("SYSTEM_SYNCHRONIZED: You have joined the network.")}
            className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-md neon-glow transition-all"
          >
            JOIN
          </button>
        </div>
      </section>
    </div>
  );
}
