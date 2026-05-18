"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function Hero() {
  const [text, setText] = useState("")
  const fullText = "> Initialize system...\n> Loading neural network...\n> Accessing encrypted logs...\n> Welcome to the Future of Blogging.\n> Ready to explore?"
  
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setText(fullText.slice(0, index))
      index++
      if (index > fullText.length) {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden py-20 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight">
            DECODE THE <br />
            <span className="text-primary neon-text">DIGITAL FRONTIER</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-lg">
            Experience blogging in a new dimension. Immersive design, lightning-fast performance, and a touch of neon.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-md neon-glow hover:scale-105 transition-all">
              START EXPLORING
            </button>
            <button className="px-8 py-3 glass neon-border rounded-md hover:bg-white/5 transition-all">
              LEARN MORE
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Glowing Sphere */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px] animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/40 rounded-full blur-[40px]" />
          
          <div className="glass neon-border rounded-lg p-6 font-mono text-sm relative z-10 min-h-[250px] shadow-2xl">
            <div className="flex gap-2 mb-4 border-b border-primary/20 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground ml-2">terminal — session_01</span>
            </div>
            <pre className="text-primary whitespace-pre-wrap">
              {text}
              <span className="terminal-cursor" />
            </pre>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
