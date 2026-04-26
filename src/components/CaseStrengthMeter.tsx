"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, AlertTriangle } from "lucide-react";
import clsx from "clsx";

interface CaseStrengthMeterProps {
  progress: number; // 0 to 100
  criteria: {
    terminal: boolean;
    dna: boolean;
    fingerprints: boolean;
    phone: boolean;
    btc: boolean;
    voice: boolean;
    ip: boolean;
  };
}

export default function CaseStrengthMeter({ progress, criteria }: CaseStrengthMeterProps) {
  const getColor = (p: number) => {
    if (p < 40) return "#c0392b"; // Red
    if (p < 80) return "#ffcc00"; // Amber
    return "#27ae60"; // Green
  };

  const color = getColor(progress);
  const isComplete = progress === 100;

  return (
    <div className="bg-black border border-white/30 p-5 space-y-6 select-none relative overflow-hidden">
      {/* Background Accent */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${color}, transparent)` }}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target size={16} className="text-noir-amber" />
          <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white">Case Strength</h4>
        </div>
        <span className="font-mono text-[10px] text-white font-bold">{progress}%</span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="h-2 bg-white/10 overflow-hidden">
          <motion.div 
            className="h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%`, backgroundColor: color }}
            transition={{ type: "spring", damping: 20 }}
          />
        </div>
        <div className="flex justify-between text-[8px] font-mono uppercase tracking-[0.2em] text-white font-bold">
           <span>Tentative</span>
           <span>Conclusive</span>
        </div>
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(criteria).map(([key, val]) => (
          <div 
            key={key}
            className={clsx(
                "flex items-center gap-2 p-2 border transition-all duration-300",
                val ? "border-noir-amber bg-noir-amber/10" : "border-white/30 bg-transparent"
            )}
          >
            <div className={clsx(
                "w-1.5 h-1.5 rounded-full",
                val ? "bg-noir-amber animate-pulse shadow-[0_0_5px_#ffcc00]" : "bg-white/40"
            )} />
            <span className={clsx(
                "font-mono text-[8px] uppercase tracking-widest truncate",
                val ? "text-noir-amber font-bold" : "text-white"
            )}>
                {key.replace("_", " ")}
            </span>
          </div>
        ))}
      </div>

      {isComplete ? (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 border-2 border-noir-green bg-noir-green/10 flex flex-col items-center gap-3 animate-pulse"
        >
            <ShieldCheck size={28} className="text-noir-green" />
            <div className="text-center">
                <div className="text-noir-green font-mono text-[11px] font-bold uppercase tracking-[0.4em]">Verdict Ready</div>
                <div className="text-white/40 font-mono text-[8px] uppercase tracking-widest mt-1">Sufficient Evidence Gathered</div>
            </div>
        </motion.div>
      ) : (
        <div className="p-4 border border-white/40 bg-white/5 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,204,0,0.05)_10px,rgba(255,204,0,0.05)_20px)]">
           <div className="flex items-center gap-3 text-white">
               <AlertTriangle size={14} className="text-noir-amber" />
               <span className="font-mono text-[11px] font-bold uppercase tracking-widest">Incomplete Data Set</span>
           </div>
        </div>
      )}

      {/* Forensic Metadata */}
      <div className="pt-4 border-t border-white/20 flex justify-between text-[7px] font-mono text-white/70 uppercase tracking-widest">
         <span>Build: Stable</span>
         <span>Hash: 0x8892_V_N</span>
      </div>
    </div>
  );
}
