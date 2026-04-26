"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ChevronRight } from "lucide-react";
import type { CaseHint } from "@/data/cases";

interface HintBarProps {
  hints: CaseHint[];
  openedFileIds: Set<string>;
  discoveredClues: Set<string>;
  onFileOpen: (id: string) => void;
}

export default function HintBar({
  hints,
  openedFileIds,
  discoveredClues,
  onFileOpen,
}: HintBarProps) {
  // Find first hint that isn't done yet
  const current = hints.find((h) => {
    if (typeof h.isDone === "function") {
      return !h.isDone(openedFileIds, discoveredClues);
    }
    return !h.isDone;
  });
  if (!current) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current.text}
        className="flex items-center gap-3 px-4 py-2 bg-[#0c0c15] border-t border-noir-border flex-shrink-0"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.3 }}
      >
        <Lightbulb
          size={12}
          className="text-noir-amber flex-shrink-0"
        />
        <p className="text-white/80 font-mono text-xs flex-1 leading-relaxed">
          <span className="text-noir-amber font-bold mr-1">HINT</span>
          {current.text}
        </p>
        {current.action && (
          <button
            onClick={() => onFileOpen(current.action!.fileId)}
            className="flex items-center gap-1 text-noir-amber font-mono text-xs border border-noir-amber/30 px-2 py-0.5 hover:bg-noir-amber/10 transition-colors flex-shrink-0 whitespace-nowrap"
          >
            {current.action.label}
            <ChevronRight size={10} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
