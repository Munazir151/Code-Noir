"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Lock, CheckCircle } from "lucide-react";
import type { FullCase } from "@/data/cases";

interface CaseDossierProps {
  cases: FullCase[];
  solvedCaseIds: Set<string>;
  onSelectCase: (id: string) => void;
  onClose: () => void;
}

const DIFF_COLOR: Record<string, string> = {
  tutorial: "#3b82f6",
  easy: "#27ae60",
  medium: "#d4a017",
  hard: "#c0392b",
};

export default function CaseDossier({
  cases,
  solvedCaseIds,
  onSelectCase,
  onClose,
}: CaseDossierProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden bg-[#0a0a0f] border border-[#1a1a2e] rounded-sm"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-[#d4a017] to-transparent" />

        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a2e]">
          <div>
            <h2 className="text-noir-amber font-mono text-sm uppercase tracking-widest font-bold">
              Case Archive
            </h2>
            <p className="text-noir-muted font-mono text-xs mt-1">
              Select a case file to begin investigation
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-noir-muted hover:text-noir-text transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(85vh-100px)] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cases.map((c) => {
              const isSolved = solvedCaseIds.has(c.id);
              const color = DIFF_COLOR[c.difficulty] ?? "#6a6a8a";

              return (
                <motion.button
                  key={c.id}
                  onClick={() => !c.isLocked && onSelectCase(c.id)}
                  disabled={c.isLocked}
                  className="group relative text-left border rounded-sm p-4 transition-all duration-200 disabled:cursor-not-allowed"
                  style={{
                    borderColor: c.isLocked
                      ? "#0f0f1a"
                      : isSolved
                        ? color
                        : "#1a1a2e",
                    background: c.isLocked
                      ? "#05050a"
                      : isSolved
                        ? color + "20"
                        : "#0c0c15",
                  }}
                  whileHover={
                    !c.isLocked ? { borderColor: color, background: "#232338", y: -2 } : {}
                  }
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p
                        className="font-mono text-[10px] uppercase tracking-wider mb-1"
                        style={{ color: c.isLocked ? "#4a4a6a" : "#ccccff" }}
                      >
                        {c.caseNumber}
                      </p>
                      <h3
                        className="font-mono text-sm font-bold leading-tight"
                        style={{
                          color: c.isLocked ? "#2a2a3e" : isSolved ? color : "#ffffff",
                        }}
                      >
                        {c.title}
                      </h3>
                    </div>
                    {isSolved && (
                      <CheckCircle
                        size={16}
                        style={{ color }}
                        className="flex-shrink-0"
                      />
                    )}
                    {c.isLocked && (
                      <Lock size={14} className="text-[#1a1a2e] flex-shrink-0" />
                    )}
                  </div>

                  <p
                    className="font-mono text-xs leading-relaxed mb-3"
                    style={{ color: c.isLocked ? "#4a4a6a" : "#e0e0ff" }}
                  >
                    {c.tagline}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm"
                      style={{
                        color: c.isLocked ? "#1a1a2e" : color,
                        background: c.isLocked ? "#0a0a0f" : color + "15",
                        border: `1px solid ${c.isLocked ? "#0f0f1a" : color + "30"}`,
                      }}
                    >
                      {c.difficulty}
                    </span>

                    {!c.isLocked && (
                      <div className="flex items-center gap-1 text-noir-muted group-hover:text-noir-text transition-colors">
                        <span className="font-mono text-[10px] uppercase tracking-wider">
                          {isSolved ? "Reinvestigate" : "Open"}
                        </span>
                        <ChevronRight size={11} />
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
