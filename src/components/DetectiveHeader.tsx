"use client";

import { Clock, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";

interface DetectiveHeaderProps {
  caseNumber: string;
  caseTitle: string;
  playerName: string;
  cluesFound: number;
  totalClues: number;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onOpenEvidenceBoard: () => void;
}

export default function DetectiveHeader({
  caseNumber,
  caseTitle,
  playerName,
  cluesFound,
  totalClues,
  audioEnabled,
  onToggleAudio,
  onOpenEvidenceBoard,
}: DetectiveHeaderProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const dateStr = time.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between px-6 py-2 bg-black border-b border-white/20 relative z-50 shadow-xl">
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-4">
          <div className="relative">
             <div className="w-3 h-3 rounded-full bg-noir-green animate-pulse" />
             <div className="absolute inset-0 bg-noir-green/20 blur-md rounded-full" />
          </div>
          <div>
            <p className="text-noir-amber font-serif text-lg tracking-widest leading-none">
              NIGHTFALL DIVISION
            </p>
            <p className="text-white font-mono text-[9px] uppercase tracking-[0.2em] mt-1">
              Session: ACTIVE_TERMINAL_047
            </p>
          </div>
        </div>

        <div className="h-8 w-px bg-noir-border/50" />

        <div className="flex flex-col">
          <p className="text-white font-mono text-[9px] uppercase tracking-wider mb-0.5">
            Active Investigation
          </p>
          <h2 className="text-white font-serif text-xl tracking-wide leading-none">
            {caseNumber}: {caseTitle}
          </h2>
          <p className="mt-1 text-white font-mono text-[9px] uppercase tracking-[0.3em]">
            Detective {playerName}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-noir-muted font-mono text-[9px] uppercase tracking-wider mb-0.5">
              Evidence Log
            </p>
            <p className="text-noir-amber font-serif text-xl leading-none">
              {cluesFound} / {totalClues} <span className="text-[10px] font-mono uppercase tracking-tighter opacity-50 ml-1">Items</span>
            </p>
          </div>
        </div>

        <div className="h-8 w-px bg-noir-border/50" />

        <button
          onClick={onToggleAudio}
          className="flex items-center gap-2 text-white hover:text-noir-amber transition-colors group"
        >
          {audioEnabled ? <Volume2 size={16} className="group-hover:scale-110 transition-transform" /> : <VolumeX size={16} />}
          <span className="font-mono text-[10px] uppercase tracking-widest">
            Audio: {audioEnabled ? "ENABLED" : "MUTED"}
          </span>
        </button>

        <button
          onClick={onOpenEvidenceBoard}
          className="flex items-center gap-2 text-noir-amber hover:text-noir-text transition-colors group"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">
            The Wall
          </span>
        </button>

        <div className="h-8 w-px bg-noir-border/30" />

        <div className="flex items-center gap-3">
          <div className="text-right">
             <div className="font-mono text-[10px] text-white tabular-nums tracking-widest">
               {timeStr}
             </div>
             <div className="font-mono text-[9px] text-noir-muted/60 uppercase">
               {dateStr}
             </div>
          </div>
          <Clock size={16} className="text-noir-muted" />
        </div>
      </div>
    </div>
  );
}
