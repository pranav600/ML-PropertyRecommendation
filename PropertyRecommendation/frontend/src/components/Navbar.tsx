"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Home, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import profilePic from "../../public/profile.png";

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-border transition-colors duration-300">
      <div className="w-full px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer [&_*]:cursor-pointer">
          <div className="p-2 bg-[var(--color-primary)] rounded-lg text-white group-hover:bg-[var(--color-accent)] transition-colors">
            <Home size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight">
            Prop
            <span className="text-[var(--color-primary)]">Find</span>
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors cursor-pointer [&_*]:cursor-pointer">
            Home
          </Link>
          {/* <Link href="#search" className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors">Search</Link> */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer [&_*]:cursor-pointer w-9 h-9 flex items-center justify-center relative overflow-hidden"
            aria-label="Toggle Dark Mode">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? "dark" : "light"}
                initial={{ y: -20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 20, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="absolute">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>

          <button
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-[var(--color-primary)]/20 hover:border-[var(--color-primary)] transition-all cursor-pointer relative flex items-center justify-center bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
            aria-label="User Profile">
            <img
              src={profilePic.src}
              alt="Profile"
              className="w-full h-full object-cover absolute inset-0 z-20 bg-white pointer-events-none"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
