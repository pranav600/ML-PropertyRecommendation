"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-border transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-[var(--color-primary)] rounded-lg text-white group-hover:bg-[var(--color-accent)] transition-colors">
            <Home size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight">
            Property
            <span className="text-[var(--color-primary)]">
              Recommendation
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors">
            Home
          </Link>
          {/* <Link href="#search" className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors">Search</Link> */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer w-9 h-9 flex items-center justify-center relative overflow-hidden"
            aria-label="Toggle Dark Mode">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? "dark" : "light"}
                initial={{ y: -20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 20, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </nav>
  );
}
