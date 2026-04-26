"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NoirBackground from "./NoirBackground";
import { Lock, ChevronRight, Star } from "lucide-react";
import clsx from "clsx";

export interface CaseMeta {
  id: string;
  caseNumber: string;
  title: string;
  difficulty: "tutorial" | "easy" | "medium" | "hard";
  isLocked: boolean;
  tagline: string;
  victim: string;
  description: string;
}

interface CaseSelectScreenProps {
  cases: CaseMeta[];
  onSelect: (id: string) => void;
}

const DIFF_STYLE: Record<string, { label: string; color: string; bg: string }> = {
  tutorial: { label: "TRAINING_MODE", color: "#3b82f6", bg: "rgba(59,130,246,0.2)" },
  easy: { label: "EASY", color: "#27ae60", bg: "rgba(39,174,96,0.12)" },
  medium: { label: "MEDIUM", color: "#d4a017", bg: "rgba(212,160,23,0.12)" },
  hard: { label: "HARD", color: "#c0392b", bg: "rgba(192,57,43,0.12)" },
};

type Filter = "all" | "tutorial" | "easy" | "medium" | "hard";

export default function CaseSelectScreen({ cases, onSelect }: CaseSelectScreenProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [hovered, setHovered] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const startTimerRef = useRef<number | null>(null);

  const visible = useMemo(
    () => cases.filter((c) => filter === "all" || c.difficulty === filter),
    [cases, filter],
  );

  useEffect(() => {
    return () => {
      if (startTimerRef.current !== null) {
        window.clearTimeout(startTimerRef.current);
      }
    };
  }, []);

  function handleStart() {
    if (started || isTransitioning) return;
    setIsTransitioning(true);
    // Simulation of data retrieval
    startTimerRef.current = window.setTimeout(() => {
      setStarted(true);
      setIsTransitioning(false);
    }, 1800); // Longer transition for "Investigative" feel
  }

  return (
    <div className="relative h-screen bg-[#000000] overflow-y-auto overflow-x-hidden z-[1]">
      <NoirBackground />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 200px rgba(0,0,0,0.7)" }}
      />

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-64 h-1 bg-noir-border relative overflow-hidden mb-4">
              <motion.div 
                className="absolute inset-0 bg-noir-amber"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </div>
            <p className="font-mono text-noir-amber text-[10px] tracking-[0.5em] uppercase animate-pulse">
              Retrieving Classified Case Files...
            </p>
            <p className="font-mono text-white/30 text-[8px] mt-2 uppercase">
              Auth Token: 0x8892_V_NOIR
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

        {/* Landing hero */}
        <motion.div
          className={clsx(
            "text-center transition-all duration-500",
            started ? "mb-8" : "min-h-[84vh] flex flex-col items-center justify-center"
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-noir-muted font-mono text-[10px] tracking-[0.6em] uppercase mb-4">
            Nightfall Division
          </p>
          <motion.h1
            className={clsx(
              "font-serif text-noir-amber mb-4 tracking-tight",
              started ? "text-6xl md:text-8xl" : "text-7xl md:text-9xl"
            )}
            style={{ 
              textShadow: "0 0 40px rgba(255,204,0,0.3), 2px 2px 0px rgba(255,0,0,0.2), -2px -2px 0px rgba(0,0,255,0.2)",
              lineHeight: 0.9
            }}
            animate={started ? {} : {
                x: [-1, 1, -1, 0],
                filter: ["hue-rotate(0deg)", "hue-rotate(10deg)", "hue-rotate(-10deg)", "hue-rotate(0deg)"]
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            CODE NOIR
          </motion.h1>
          <div className="h-0.5 w-64 mx-auto bg-gradient-to-r from-transparent via-noir-amber to-transparent mb-6 opacity-40" />
          <p className="text-noir-text font-mono text-xs uppercase tracking-[0.3em] mb-4">
            Investigation Terminal v2.4.0
          </p>
          <p className="text-noir-muted font-mono text-sm max-w-md mx-auto leading-relaxed">
            Choose your case. Read the evidence. Name the culprit.
          </p>

          <motion.div
            className="mt-7 flex justify-center relative z-[20]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <button
              onClick={handleStart}
              className="group relative px-10 py-4 overflow-hidden border border-noir-amber/40 text-noir-amber font-mono text-xs tracking-[0.4em] uppercase transition-all hover:bg-noir-amber hover:text-black hover:border-noir-amber hover:shadow-[0_0_30px_rgba(255,204,0,0.4)]"
            >
              <span className="relative z-10">{started ? "Case Archive" : "Initialize System"}</span>
              <ChevronRight size={12} className="relative z-10 inline ml-2 group-hover:translate-x-1 transition-transform" />
              {/* Button HUD details */}
              <div className="absolute top-0 left-0 w-1 h-1 bg-noir-amber" />
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-noir-amber" />
            </button>
          </motion.div>

          {!started && (
            <motion.p
              className="mt-4 text-noir-muted font-mono text-[11px] tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              Press Start Game to open the case archive
            </motion.p>
          )}
        </motion.div>
        {started && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <motion.div
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div>
                <p className="text-noir-amber font-mono text-[10px] uppercase tracking-[0.35em] mb-1">Select Case</p>
                <h2 className="font-serif text-3xl text-white">Case Files</h2>
              </div>
              <p className="text-white font-mono text-xs font-bold">{visible.length} cases available</p>
            </motion.div>

            {/* Filter tabs */}
            <motion.div
              className="flex justify-center md:justify-start gap-2 mb-8 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12 }}
            >
              {(["all", "tutorial", "easy", "medium", "hard"] as Filter[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={clsx(
                    "px-4 py-1.5 font-mono text-xs uppercase tracking-widest border transition-all duration-200",
                    filter === f
                      ? "border-noir-amber text-noir-amber bg-noir-amber/15"
                      : "border-noir-border text-noir-muted hover:border-noir-muted hover:text-noir-text"
                  )}
                >
                  {f === "all" ? "All Cases" : f}
                </button>
              ))}
            </motion.div>

            {/* Case cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {visible.map((c, i) => {
                  const diff = DIFF_STYLE[c.difficulty];
                  const isHov = hovered === c.id;
                  return (
                    <motion.div
                      key={c.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ delay: i * 0.07 }}
                      onMouseEnter={() => !c.isLocked && setHovered(c.id)}
                      onMouseLeave={() => setHovered(null)}
                      className={clsx(
                        "case-card relative border rounded-none overflow-hidden transition-all duration-300 flex flex-col",
                        c.isLocked
                          ? "border-noir-border/30 opacity-40 cursor-not-allowed"
                          : isHov
                            ? "border-noir-amber z-10"
                            : "border-noir-border"
                      )}
                      style={{
                        background: isHov && !c.isLocked ? "#232338" : "#0c0c18",
                        boxShadow: isHov && !c.isLocked ? "0 0 30px rgba(212,160,23,0.3)" : "none",
                        transform: isHov && !c.isLocked ? "translateY(-2px)" : "none",
                      }}
                      onClick={() => !c.isLocked && onSelect(c.id)}
                    >
                      {/* Top accent line */}
                      {!c.isLocked && (
                        <div
                          className="h-px"
                          style={{
                            background: `linear-gradient(to right, transparent, ${diff.color}60, transparent)`,
                          }}
                        />
                      )}

                      <div className="p-5 flex flex-col flex-1">
                        {/* Header row */}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-noir-muted font-mono text-[10px] tracking-widest mb-1">
                              {c.caseNumber}
                            </p>
                            <h3
                              className="font-serif text-3xl font-normal leading-tight"
                              style={{
                                color: c.isLocked ? "var(--noir-muted)" : isHov ? "#000000" : "#ffffff",
                              }}
                            >
                              {c.title}
                            </h3>
                          </div>

                          {/* Difficulty badge */}
                          <span
                            className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm flex-shrink-0 ml-2 mt-0.5 tracking-widest"
                            style={{
                              color: diff.color,
                              background: diff.bg,
                              border: `1px solid ${diff.color}40`,
                            }}
                          >
                            {diff.label}
                          </span>
                        </div>

                        {/* Tagline */}
                        <p className="text-noir-text font-mono text-xs italic mb-3 leading-relaxed">
                          {c.tagline}
                        </p>
                        <p className="text-noir-muted font-mono text-xs leading-relaxed mb-4 flex-1">
                          {c.description}
                        </p>

                        {/* Victim */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-noir-amber font-mono text-[10px] uppercase tracking-wider">
                            Victim
                          </span>
                          <span className="text-noir-text font-mono text-[10px]">{c.victim}</span>
                        </div>

                        {/* CTA or locked */}
                        {c.isLocked ? (
                          <div className="flex items-center gap-2 border border-white/20 rounded-sm px-3 py-2 justify-center bg-black">
                            <Lock size={11} className="text-noir-muted" />
                            <span className="font-mono text-[10px] text-white tracking-widest uppercase font-black">
                              Restricted
                            </span>
                          </div>
                        ) : (
                          <motion.div
                            className="flex items-center justify-between border rounded-sm px-3 py-2"
                            style={{
                              borderColor: isHov ? diff.color : "#1a1a2e",
                              color: isHov ? diff.color : "#4a4a6a",
                              background: isHov ? diff.bg : "transparent",
                            }}
                            animate={{ x: isHov ? 2 : 0 }}
                          >
                            <span className="font-mono text-[10px] uppercase tracking-widest">
                              Open Case File
                            </span>
                            <ChevronRight size={11} />
                          </motion.div>
                        )}
                      </div>

                      {/* Tutorial star indicator */}
                      {c.difficulty === "tutorial" && !c.isLocked && (
                        <div className="absolute top-0 right-0 p-2 overflow-hidden">
                           <div className="bg-[#3b82f6] text-white font-mono text-[8px] px-4 py-0.5 rotate-[45deg] translate-x-[15px] -translate-y-[5px] shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                             LEARN
                           </div>
                        </div>
                      )}
                      {c.difficulty === "tutorial" && !c.isLocked && (
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 animate-pulse">
                          <Star size={10} style={{ color: "#3b82f6" }} fill="#3b82f6" />
                          <span className="font-mono text-[9px] text-[#3b82f6] font-black tracking-widest">START HERE // 101</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.p
          className="text-center text-white/40 font-mono text-xs mt-10 tracking-[0.25em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          NIGHTFALL DIVISION // CLASSIFIED // DETECTIVE ACCESS ONLY
        </motion.p>
      </div>
    </div>
  );
}
