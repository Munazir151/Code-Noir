"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle2, Lock } from "lucide-react";
import clsx from "clsx";
import type { ClueData } from "@/data/cases";

interface CluesPanelProps {
  discoveredClues: Set<string>;
  clues: ClueData[];
}

export default function CluesPanel({
  discoveredClues,
  clues,
}: CluesPanelProps) {
  const discovered = clues.filter((c) => discoveredClues.has(c.id));
  const criticalFound = discovered.filter((c) => c.critical).length;
  const criticalTotal = clues.filter((c) => c.critical).length;

  return (
    <div className="h-full flex flex-col bg-[#12182a]">
      {/* Header */}
      <div className="px-3 py-3 border-b border-noir-border/80 bg-[#151a2a]">
        <p className="text-noir-amber text-sm font-mono tracking-widest uppercase mb-1">
          Evidence Board
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-noir-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-noir-amber rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${(discovered.length / Math.max(clues.length, 1)) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-noir-text text-sm font-mono">
            {discovered.length}/{clues.length}
          </span>
        </div>
        {criticalFound > 0 && (
          <p className="text-noir-amber text-sm font-mono mt-1">
            {criticalFound}/{criticalTotal} critical clues
          </p>
        )}
      </div>

      {/* Clues list */}
      <div className="flex-1 overflow-y-auto py-2 pr-1">
        {clues.length === 0 && (
          <p className="text-noir-muted text-xs font-mono px-3 py-2">
            Open case files to discover evidence.
          </p>
        )}
        <AnimatePresence>
          {clues.map((clue) => {
            const isDiscovered = discoveredClues.has(clue.id);
            return (
              <motion.div
                key={clue.id}
                layout
                initial={isDiscovered ? { opacity: 0, x: -10 } : false}
                animate={{ opacity: 1, x: 0 }}
                className={clsx(
                  "px-3 py-2 mx-2 mb-1 rounded-sm border text-sm font-mono",
                  isDiscovered
                    ? clue.critical
                        ? "border-noir-amber/55 bg-noir-amber/15"
                        : "border-noir-border bg-[#1a2134]"
                      : "border-noir-border/60 bg-[#161d2f]",
                )}
              >
                <div className="flex items-start gap-2">
                  {isDiscovered ? (
                    clue.critical ? (
                      <AlertTriangle
                        size={11}
                        className="text-noir-amber flex-shrink-0 mt-0.5"
                      />
                    ) : (
                      <CheckCircle2
                        size={11}
                        className="text-noir-green flex-shrink-0 mt-0.5"
                      />
                    )
                  ) : (
                    <Lock
                      size={11}
                      className="text-noir-muted flex-shrink-0 mt-0.5"
                    />
                  )}
                  <div>
                    <p
                      className={clsx(
                        "font-semibold mb-0.5 flex items-center gap-2 leading-snug",
                        isDiscovered
                          ? clue.critical
                            ? "text-noir-amber"
                            : "text-noir-text"
                          : "text-noir-text",
                      )}
                    >
                      {isDiscovered && !clue.critical && (
                        <span className="w-1.5 h-1.5 rounded-full bg-noir-amber inline-block flex-shrink-0" />
                      )}
                      {isDiscovered ? clue.title : "??? Undiscovered"}
                    </p>
                    {isDiscovered && (
                      <p className="text-noir-text leading-relaxed opacity-100">
                        {clue.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
