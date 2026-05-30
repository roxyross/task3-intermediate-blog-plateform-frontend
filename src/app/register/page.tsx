"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { LoaderCircle, Lock, Mail, User, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("PASSWORD_MISMATCH: Access keys do not match.");
      return;
    }

    setLoading(true);

    try {
      await authApi.register({
        name,
        email,
        password,
        role: "user",
      });
      toast.success("REGISTRATION_COMPLETE: Welcome to the network.");
      router.push("/blogs");
    } catch (error: any) {
      const detail = error?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "REGISTRATION_FAILED: Please try again.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass neon-border p-8 rounded-2xl w-full max-w-md relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-primary neon-glow" />

        <div className="flex flex-col items-center mb-8 text-center">
          <div className="p-4 glass neon-border rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold neon-text">CREATE_PUBLIC_PROFILE</h1>
          <p className="text-muted-foreground text-sm font-mono">
            Join the reader network and stay synchronized.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-mono text-primary flex items-center gap-2">
              <User className="w-3 h-3" /> DISPLAY_NAME
            </label>
            <Input
              type="text"
              placeholder="Jane Reader"
              className="glass border-primary/20 focus:border-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-primary flex items-center gap-2">
              <Mail className="w-3 h-3" /> EMAIL_ADDRESS
            </label>
            <Input
              type="email"
              placeholder="reader@example.com"
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
              placeholder="Enter password"
              className="glass border-primary/20 focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-primary flex items-center gap-2">
              <Lock className="w-3 h-3" /> CONFIRM_ACCESS_KEY
            </label>
            <Input
              type="password"
              placeholder="Confirm password"
              className="glass border-primary/20 focus:border-primary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
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
                <LoaderCircle className="w-4 h-4 animate-spin" />
                CREATING_PROFILE...
              </>
            ) : (
              "CREATE_PROFILE"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have admin access?{" "}
          <Link href="/admin/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
