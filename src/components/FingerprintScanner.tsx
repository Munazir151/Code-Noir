"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Fingerprint, X, RotateCcw, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

interface Fingerprint {
  id: number;
  correctRotation: number;
}

interface FingerprintScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  identityMatch?: string;
}

const PRINTS = [
  { id: 1, correctRotation: 45 },
  { id: 2, correctRotation: 180 },
  { id: 3, correctRotation: 315 },
  { id: 4, correctRotation: 90 },
];

export default function FingerprintScanner({ isOpen, onClose, onSuccess, identityMatch }: FingerprintScannerProps) {
  const [rotations, setRotations] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const [matches, setMatches] = useState<Set<number>>(new Set());
  const [complete, setComplete] = useState(false);

  const handleDrag = (id: number, info: any) => {
    // Basic rotation delta on drag
    const delta = (info.delta.x + info.delta.y) * 2;
    setRotations(prev => {
        const next = (prev[id] + delta) % 360;
        const normalizedNext = next < 0 ? 360 + next : next;
        
        // Check match
        const diff = Math.abs(normalizedNext - PRINTS.find(p => p.id === id)!.correctRotation);
        if (diff < 5 || diff > 355) {
            setMatches(m => new Set(m).add(id));
            return { ...prev, [id]: PRINTS.find(p => p.id === id)!.correctRotation };
        } else {
            setMatches(m => {
                const n = new Set(m);
                n.delete(id);
                return n;
            });
            return { ...prev, [id]: normalizedNext };
        }
    });
  };

  useEffect(() => {
    if (matches.size === 4 && !complete) {
        setComplete(true);
        setTimeout(onSuccess, 1500);
    }
  }, [matches, complete, onSuccess]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-noir-border p-8 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-noir-amber via-white/20 to-noir-amber opacity-30" />
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-noir-amber font-serif text-2xl tracking-tight">Biometric Ridge Analysis</h3>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-1">
                  Drag prints to orient matching patterns
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="text-white/20 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              {PRINTS.map(p => (
                <div key={p.id} className="flex flex-col items-center gap-4">
                  <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    onDrag={(e, info) => handleDrag(p.id, info)}
                    className={clsx(
                        "w-24 h-32 rounded-[40%] cursor-grab active:cursor-grabbing relative overflow-hidden transition-shadow",
                        matches.has(p.id) ? "shadow-[0_0_20px_rgba(34,197,94,0.4)] border-2 border-noir-green" : "border border-white/10"
                    )}
                    style={{
                      rotate: rotations[p.id],
                      background: `
                        radial-gradient(circle at 50% 50%, transparent 20%, rgba(255,255,255,0.05) 21%, transparent 22%),
                        radial-gradient(circle at 45% 48%, transparent 25%, rgba(255,255,255,0.05) 26%, transparent 27%),
                        radial-gradient(circle at 55% 52%, transparent 30%, rgba(255,255,255,0.05) 31%, transparent 32%),
                        radial-gradient(circle at 50% 50%, rgba(255,204,0,0.1) 0%, transparent 70%)
                      `,
                      backgroundSize: '10px 10px, 12px 12px, 15px 15px, 100% 100%'
                    }}
                  >
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                            <div 
                                key={i} 
                                className="absolute border border-white/20 rounded-full" 
                                style={{
                                    top: `${-10 + i * 10}%`,
                                    left: `${-10 + i * 10}%`,
                                    width: `${120 - i * 10}%`,
                                    height: `${120 - i * 10}%`,
                                }}
                            />
                        ))}
                    </div>
                  </motion.div>
                  <div className="font-mono text-[9px] uppercase tracking-widest flex items-center gap-2">
                    {matches.has(p.id) ? (
                        <span className="text-noir-green flex items-center gap-1">
                            <CheckCircle2 size={10} /> MATCH_FOUND
                        </span>
                    ) : (
                        <span className="text-white/20">FRAGMENT_0x0{p.id}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-6">
               <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Global Sync</span>
                  <span className="text-xs text-white font-mono">{matches.size} / 4 NODES</span>
               </div>
               <div className="flex items-center gap-4">
                  <RotateCcw 
                    size={16} 
                    className="text-white/30 cursor-pointer hover:text-white transition-colors" 
                    onClick={() => setRotations({ 1: 0, 2: 0, 3: 0, 4: 0 })}
                  />
                  <div className={clsx(
                    "px-6 py-2 border font-mono text-xs uppercase tracking-widest transition-all",
                    complete ? "bg-noir-green/20 border-noir-green text-noir-green pulse" : "bg-white/5 border-white/10 text-white/40"
                  )}>
                    {complete ? (identityMatch || "MATCH_FOUND") : "ANALYSIS_PENDING"}
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
