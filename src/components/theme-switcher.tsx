"use client"

import * as React from "react"
import { Moon, Sun, Monitor, Zap, Flame, Leaf } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground size-8 glass neon-border transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
        <Zap className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-primary" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass neon-border">
        <DropdownMenuItem onClick={() => setTheme("cyberpunk")} className="cursor-pointer">
          <Zap className="mr-2 h-4 w-4 text-cyan-400" />
          <span>Cyberpunk</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("volcanic")} className="cursor-pointer">
          <Flame className="mr-2 h-4 w-4 text-orange-500" />
          <span>Volcanic</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("emerald")} className="cursor-pointer">
          <Leaf className="mr-2 h-4 w-4 text-emerald-500" />
          <span>Emerald</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
