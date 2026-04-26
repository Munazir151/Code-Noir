"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, TestTube2, AlertCircle, X, Check } from "lucide-react";
import clsx from "clsx";

interface DnaLabProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  matchText?: string;
}

const STAGES = [
  { id: 1, label: "Extraction", duration: 3000 },
  { id: 2, label: "Amplification", duration: 4000 },
  { id: 3, label: "Sequencing", duration: 5000 },
];

const BASE_PAIRS = ["A", "T", "C", "G"];

export default function DnaLab({ isOpen, onClose, onSuccess, matchText = "MATCH FOUND: GENOTYPE_ALPHA_7" }: DnaLabProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [result, setResult] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (currentStage < STAGES.length) {
        const stage = STAGES[currentStage];
        let start = Date.now();
        
        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const p = Math.min((elapsed / stage.duration) * 100, 100);
            setProgress(p);

            // Add random DNA line
            const newLine = Array.from({ length: 40 }, () => BASE_PAIRS[Math.floor(Math.random() * 4)]).join("");
            setLines(prev => [...prev.slice(-15), newLine]);

            if (p >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setCurrentStage(prev => prev + 1);
                    setProgress(0);
                }, 500);
            }
        }, 60);

        return () => clearInterval(interval);
    } else if (!result) {
        typewriterMatch(matchText);
        setTimeout(onSuccess, 3000);
    }
  }, [isOpen, currentStage, result, onSuccess]);

  const typewriterMatch = (target: string) => {
    let i = 0;
    const interval = setInterval(() => {
        setResult(target.slice(0, i + 1));
        i++;
        if (i >= target.length) clearInterval(interval);
    }, 50);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="relative w-full max-w-2xl bg-[#050505] border border-noir-border h-[500px] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0a0a0a]">
                <div className="flex items-center gap-3">
                   <TestTube2 className="text-noir-amber animate-bounce" size={18} />
                   <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white">Forensic Genomics Laboratory</h3>
                </div>
                <button onClick={onClose} className="text-white/20 hover:text-white">
                    <X size={18} />
                </button>
            </div>

            <div className="flex-1 p-8 flex flex-col gap-8">
                {/* Stage Progress */}
                <div className="grid grid-cols-3 gap-4">
                    {STAGES.map((s, i) => (
                        <div key={s.id} className="space-y-3">
                            <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-widest">
                                <span className={clsx(i <= currentStage ? "text-noir-amber" : "text-white/20")}>{s.label}</span>
                                {i < currentStage ? <Check size={10} className="text-noir-amber" /> : null}
                            </div>
                            <div className="h-1.5 bg-white/5 overflow-hidden">
                                <motion.div 
                                    className="h-full bg-noir-amber"
                                    animate={{ 
                                        width: i < currentStage ? "100%" : i === currentStage ? `${progress}%` : "0%" 
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Readout */}
                <div className="flex-1 bg-black/50 border border-white/5 p-6 font-mono text-[9px] text-white/40 overflow-hidden relative">
                    <div className="absolute top-2 right-4 flex items-center gap-2 opacity-30">
                        <Activity size={10} className="animate-pulse" />
                        <span>SEQUENCING_RUN_0x8F</span>
                    </div>
                    
                    <div className="space-y-1 h-full overflow-hidden">
                        {lines.map((line, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="whitespace-nowrap tracking-[0.4em]"
                            >
                                {line}
                            </motion.div>
                        ))}
                    </div>

                    {result && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-10 text-center">
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="p-8 border-2 border-noir-amber bg-noir-amber/10 text-noir-amber space-y-4"
                            >
                                <AlertCircle className="mx-auto" size={32} />
                                <div className="text-sm font-bold tracking-[0.2em]">{result}</div>
                            </motion.div>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] border-t border-white/5 pt-4">
                    <div className="flex gap-6">
                        <span>Buffer: Optimized</span>
                        <span>Gel: 2% Agarose</span>
                    </div>
                    <div>Cycle: {currentStage < 3 ? "IN_PROGRESS" : "COMPLETE"}</div>
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
