"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { motion } from "framer-motion";
import { Zap, Loader2, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    try {
      await authApi.login(formData);
      toast.success("ACCESS_GRANTED: Welcome back, Admin.");
      router.push("/admin");
    } catch (error: any) {
      toast.error("ACCESS_DENIED: Invalid credentials.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass neon-border p-8 rounded-2xl w-full max-w-md relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-primary neon-glow" />
        
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 glass neon-border rounded-full mb-4">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold neon-text">ADMIN_CORE_ACCESS</h1>
          <p className="text-muted-foreground text-sm font-mono">Restricted to authorized personnel only.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-primary flex items-center gap-2">
              <Mail className="w-3 h-3" /> EMAIL_ADDRESS
            </label>
            <Input 
              type="email" 
              placeholder="admin@example.com"
              className="glass border-primary/20 focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-primary flex items-center gap-2">
              <Lock className="w-3 h-3" /> ACCESS_KEY
            </label>
            <Input 
              type="password" 
              placeholder="••••••••"
              className="glass border-primary/20 focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-md neon-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                AUTHENTICATING...
              </>
            ) : (
              "INITIALIZE_SESSION"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-muted-foreground font-mono">
            ENCRYPTION: AES-256-GCM <br />
            IP_LOGGING: ENABLED
          </p>
        </div>
      </motion.div>
    </div>
  );
}
