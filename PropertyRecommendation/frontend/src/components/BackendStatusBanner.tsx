"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertTriangle, X, ServerIcon } from "lucide-react";

type Status = "checking" | "warming" | "ready" | "error" | "dismissed";

const POLL_INTERVAL_MS = 5000;
const MAX_ATTEMPTS = 24; // ~2 min total
const READY_DISMISS_MS = 4000;

export function BackendStatusBanner() {
  const [status, setStatus] = useState<Status>("checking");
  const [attempt, setAttempt] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      if (cancelled) return;

      attemptRef.current += 1;
      setAttempt(attemptRef.current);

      // After first failed attempt treat it as "warming up"
      if (attemptRef.current > 1) setStatus("warming");

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/options`, {
          signal: AbortSignal.timeout(8000),
        });
        if (res.ok && !cancelled) {
          setStatus("ready");
          // Auto-dismiss after a short celebration
          timerRef.current = setTimeout(() => {
            if (!cancelled) setDismissed(true);
          }, READY_DISMISS_MS);
          return; // stop polling
        }
      } catch {
        // still starting up
      }

      if (attemptRef.current >= MAX_ATTEMPTS && !cancelled) {
        setStatus("error");
        return;
      }

      if (!cancelled) {
        timerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
      }
    };

    poll();

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleDismiss = () => setDismissed(true);

  const isVisible = !dismissed && status !== "checking";

  const config = {
    warming: {
      icon: <Loader2 size={18} className="animate-spin shrink-0" />,
      bg: "from-amber-500/15 to-orange-500/10 border-amber-500/40",
      iconColor: "text-amber-400",
      title: "Backend is warming up…",
      subtitle: `Our servers are waking up from sleep mode. Hang tight! (attempt ${attempt}/${MAX_ATTEMPTS})`,
      pill: "bg-amber-500/20 text-amber-300",
      pillLabel: "Starting",
      showProgress: true,
    },
    ready: {
      icon: <CheckCircle2 size={18} className="shrink-0" />,
      bg: "from-emerald-500/15 to-green-500/10 border-emerald-500/40",
      iconColor: "text-emerald-400",
      title: "Backend is ready!",
      subtitle: "All systems are online. Search away!",
      pill: "bg-emerald-500/20 text-emerald-300",
      pillLabel: "Online",
      showProgress: false,
    },
    error: {
      icon: <AlertTriangle size={18} className="shrink-0" />,
      bg: "from-red-500/15 to-rose-500/10 border-red-500/40",
      iconColor: "text-red-400",
      title: "Backend unavailable",
      subtitle: "Could not reach the server. Please try refreshing the page.",
      pill: "bg-red-500/20 text-red-300",
      pillLabel: "Offline",
      showProgress: false,
    },
  } as const;

  const cfg = status === "checking" ? null : config[status as keyof typeof config];

  const progressPct = Math.min((attempt / MAX_ATTEMPTS) * 100, 95);

  return (
    <AnimatePresence>
      {isVisible && cfg && (
        <motion.div
          key="banner"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`
            fixed top-16 left-1/2 -translate-x-1/2 z-50
            w-[calc(100%-2rem)] max-w-xl
            rounded-2xl border backdrop-blur-xl
            bg-gradient-to-r ${cfg.bg}
            shadow-2xl shadow-black/30
            overflow-hidden
          `}
          role="status"
          aria-live="polite"
        >
          {/* Progress bar */}
          {cfg.showProgress && (
            <div className="absolute top-0 left-0 h-0.5 w-full bg-white/10">
              <motion.div
                className="h-full bg-amber-400/80 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          )}

          <div className="flex items-center gap-3 px-4 py-3">
            {/* Server icon circle */}
            <div className="shrink-0 p-2 rounded-xl bg-white/5 border border-white/10">
              <ServerIcon size={16} className="text-foreground/60" />
            </div>

            {/* Status icon + text */}
            <span className={cfg.iconColor}>{cfg.icon}</span>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight">
                {cfg.title}
              </p>
              <p className="text-xs text-foreground/60 leading-snug mt-0.5 truncate">
                {cfg.subtitle}
              </p>
            </div>

            {/* Pill */}
            <span
              className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${cfg.pill}`}
            >
              {cfg.pillLabel}
            </span>

            {/* Dismiss */}
            {status !== "warming" && (
              <button
                onClick={handleDismiss}
                aria-label="Dismiss notification"
                className="shrink-0 p-1.5 rounded-lg hover:bg-white/10 text-foreground/50 hover:text-foreground transition-colors cursor-pointer [&_*]:cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
