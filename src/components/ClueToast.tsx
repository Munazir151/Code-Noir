"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_CLUES } from "@/data/clues";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface ClueToastProps {
  clueIds: string[]; // newly discovered clue IDs
  onDismiss: () => void;
}

export default function ClueToast({ clueIds, onDismiss }: ClueToastProps) {
  const clues = clueIds
    .map((id) => ALL_CLUES.find((c) => c.id === id))
    .filter(Boolean) as typeof ALL_CLUES;

  const hasCritical = clues.some((c) => c.critical);

  useEffect(() => {
    if (clues.length === 0) return;
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [clueIds, onDismiss, clues.length]);

  return (
    <AnimatePresence>
      {clues.length > 0 && (
        <motion.div
          className="fixed top-16 right-4 z-[90] w-80"
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 60, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <div
            className="border rounded-sm overflow-hidden"
            style={{
              borderColor: hasCritical
                ? "#d4a017"
                : "#27ae60",
              background: "#0a0a0f",
              boxShadow: hasCritical
                ? "0 0 30px rgba(212,160,23,0.15)"
                : "0 0 20px rgba(39,174,96,0.1)",
              backdropFilter: "none",
            }}
          >
            {/* Top bar */}
            <div
              className="h-px"
              style={{
                background: hasCritical
                  ? "linear-gradient(to right, transparent, #d4a017, transparent)"
                  : "linear-gradient(to right, transparent, #27ae60, transparent)",
              }}
            />

            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
              {hasCritical ? (
                <AlertTriangle size={12} className="text-noir-amber" />
              ) : (
                <CheckCircle2 size={12} className="text-noir-green" />
              )}
              <span
                className="font-mono text-[10px] uppercase tracking-widest font-bold"
                style={{ color: hasCritical ? "#d4a017" : "#27ae60" }}
              >
                {hasCritical ? "Critical Evidence Logged" : "Evidence Logged"}
              </span>
              {/* Progress bar */}
              <motion.div
                className="ml-auto h-0.5 rounded-full"
                style={{
                  transformOrigin: "right",
                  background: hasCritical ? "#d4a017" : "#27ae60",
                  width: "40px",
                }}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </div>

            {/* Clues */}
            <div className="p-4 space-y-3">
              {clues.map((clue) => (
                <div key={clue.id} className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">
                    {clue.critical ? "🔑" : "📌"}
                  </span>
                  <div>
                    <p
                      className="font-mono text-xs font-bold mb-1"
                      style={{ color: clue.critical ? "#d4a017" : "#c8c8d4" }}
                    >
                      {clue.title}
                    </p>
                    <p className="font-mono text-xs text-noir-text-dim leading-relaxed">
                      {clue.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between">
              <p className="text-noir-muted font-mono text-[10px]">
                Check the Evidence Board →
              </p>
              <button
                onClick={onDismiss}
                className="text-noir-muted hover:text-noir-text font-mono text-[10px] transition-colors"
              >
                dismiss
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
