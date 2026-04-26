"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import NoirBackground from "./NoirBackground";

interface IntroScreenProps {
  onEnter: () => void;
  caseNumber?: string;
  title?: string;
  tagline?: string;
  body1?: string;
  body2?: string;
  difficulty?: "tutorial" | "easy" | "medium" | "hard";
}

const DIFF_COLOR: Record<string, string> = {
  tutorial: "#3b82f6",
  easy: "#27ae60",
  medium: "#d4a017",
  hard: "#c0392b",
};

export default function IntroScreen({
  onEnter,
  caseNumber = "CASE_0047",
  title = "THE VOSS INCIDENT",
  tagline = "Raymond Voss. Dead at 34. Fifty bitcoin gone in fourteen minutes.",
  difficulty = "medium",
}: IntroScreenProps) {
  const diffColor = DIFF_COLOR[difficulty] ?? "#d4a017";

  useEffect(() => {
    // Auto-advance after 3 seconds
    const timer = setTimeout(() => {
      onEnter();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onEnter]);

  return (
    <div className="fixed inset-0 bg-[#02020a] flex flex-col items-center justify-center z-50 overflow-hidden">
      <NoirBackground />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 200px rgba(0,0,0,0.75)" }}
      />

      <motion.div
        className="text-center z-10 px-8 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Case number + difficulty */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <p className="text-[#4a4a6a] text-xs font-mono tracking-[0.4em] uppercase">
            {caseNumber}
          </p>
          <span
            className="font-mono text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest"
            style={{
              color: diffColor,
              border: `1px solid ${diffColor}50`,
              background: `${diffColor}15`,
            }}
          >
            {difficulty}
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="font-serif font-bold mb-6 leading-none"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            color: "#d4a017",
            textShadow: "0 0 40px rgba(212,160,23,0.3)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {title}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-[#8a8aa4] font-mono text-base leading-relaxed max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {tagline}
        </motion.p>

        {/* Loading indicator */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-noir-amber"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          <span className="text-[#4a4a6a] text-xs font-mono ml-2">
            Loading case file...
          </span>
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 text-[#1a1a2e] text-xs font-mono">
        NIGHTFALL DIVISION
      </div>
      <div className="absolute bottom-6 right-6 text-[#1a1a2e] text-xs font-mono">
        CLASSIFIED
      </div>
    </div>
  );
}
