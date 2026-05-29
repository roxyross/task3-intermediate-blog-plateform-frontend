"use client"

import { Settings as SettingsIcon, Shield, Bell, Database, Globe, Save } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold neon-text">SYSTEM_SETTINGS</h1>
        <p className="text-muted-foreground font-mono text-xs">Configure core system parameters.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="glass neon-border p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" /> GENERAL_CONFIG
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-primary">SITE_TITLE</label>
                <input 
                  defaultValue="MY BLOG PLATFORM"
                  className="w-full glass border-primary/20 bg-transparent p-3 rounded-md focus:outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-primary">SITE_DESCRIPTION</label>
                <textarea 
                  defaultValue="A modern, cyberpunk-inspired blog platform."
                  className="w-full glass border-primary/20 bg-transparent p-3 rounded-md focus:outline-none focus:border-primary transition-all h-32"
                />
              </div>
              <button 
                onClick={() => toast.success("SETTINGS_UPDATED: General configuration saved.")}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-md neon-glow transition-all"
              >
                <Save className="w-4 h-4" /> SAVE_CHANGES
              </button>
            </div>
          </Card>

          <Card className="glass neon-border p-8 border-red-500/20">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-red-500">
              <Shield className="w-5 h-5" /> SECURITY_CORE
            </h2>
            <p className="text-sm text-muted-foreground mb-6">Danger zone: These settings affect system access and encryption.</p>
            <div className="space-y-4">
              <button className="w-full py-3 glass neon-border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-all font-mono text-xs text-left px-4 flex justify-between items-center">
                ROTATE_API_KEYS <Shield className="w-4 h-4" />
              </button>
              <button className="w-full py-3 glass neon-border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-all font-mono text-xs text-left px-4 flex justify-between items-center">
                FLUSH_ALL_SESSIONS <Shield className="w-4 h-4" />
              </button>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="glass neon-border p-6">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" /> SYSTEM_STATUS
            </h3>
            <div className="space-y-3 font-mono text-[10px]">
              <div className="flex justify-between">
                <span className="text-muted-foreground">VERSION:</span>
                <span className="text-primary">v1.2.4-stable</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">RUNTIME:</span>
                <span className="text-primary">Next.js 15.x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">UPTIME:</span>
                <span className="text-primary">99.99%</span>
              </div>
              <div className="pt-2 border-t border-white/5">
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">DB_LOAD:</span>
                  <span className="text-green-400">OPTIMAL</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="bg-green-400 h-full w-[12%]" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass neon-border p-6">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" /> NOTIFICATIONS
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono">SECURITY_ALERTS</span>
                <div className="w-10 h-5 bg-primary/20 rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-primary rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono">NEW_COMMENTS</span>
                <div className="w-10 h-5 bg-white/10 rounded-full relative">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-muted rounded-full" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
