"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic2, Activity, ShieldAlert, X } from "lucide-react";
import clsx from "clsx";

interface VoiceStressAnalyzerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  targets?: Array<{ name: string; stress: number; status: string }>;
}

const METRICS = [
  { name: "Victoria", stress: 78, status: "DECEPTION_LIKELY" },
  { name: "Ghost", stress: 61, status: "UNSTABLE" },
  { name: "Lin", stress: 12, status: "STABLE" },
];

export default function VoiceStressAnalyzer({ isOpen, onClose, onSuccess, targets = METRICS }: VoiceStressAnalyzerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [analyzing, setAnalyzing] = useState(true);
  const [revealIndex, setRevealIndex] = useState(-1);

  useEffect(() => {
    if (!isOpen) return;

    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = analyzing ? "#ffcc00" : "#ffffff20";
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + 
          Math.sin(x * 0.02 + t) * 20 + 
          Math.sin(x * 0.05 + t * 2) * 10;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      t += 0.15;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    
    const timer = setTimeout(() => {
        setAnalyzing(false);
        startReveal();
    }, 4000);

    return () => {
        cancelAnimationFrame(animationId);
        clearTimeout(timer);
    };
  }, [isOpen, analyzing]);

  const startReveal = () => {
    let index = 0;
    const interval = setInterval(() => {
        setRevealIndex(index);
        index++;
        if (index >= targets.length) {
            clearInterval(interval);
            setTimeout(onSuccess, 2000);
        }
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-xl bg-[#080808] border border-noir-border py-8 px-10 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-noir-amber/10 flex items-center justify-center border border-noir-amber/20">
                        <Mic2 size={20} className="text-noir-amber" />
                    </div>
                    <div>
                        <h3 className="text-white font-serif text-2xl tracking-tight">Vocal Stress Analysis</h3>
                        <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mt-1">Layered Voice Analysis Prototype_04</p>
                    </div>
                </div>
                <button onClick={onClose} className="text-white/20 hover:text-white">
                    <X size={20} />
                </button>
            </div>

            <div className="relative h-40 bg-black/40 border border-white/5 rounded p-4 mb-10">
                <canvas 
                    ref={canvasRef} 
                    width={400} 
                    height={150} 
                    className="w-full h-full"
                />
                <div className="absolute top-4 left-4 font-mono text-[8px] text-white/20 flex gap-4 uppercase tracking-[0.3em]">
                    <span>Freq: 44.1kHz</span>
                    <span>Bitrate: 320kbps</span>
                    <span className="text-noir-amber">Processing...</span>
                </div>
                {analyzing && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-[10px] font-mono text-noir-amber uppercase tracking-[0.5em]"
                        >
                            Scanning_Waveform
                        </motion.div>
                    </div>
                )}
            </div>

            <div className="space-y-4">
               {targets.map((m, i) => (
                 <motion.div 
                   key={m.name}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: revealIndex >= i ? 1 : 0.05, x: revealIndex >= i ? 0 : -20 }}
                   className={clsx(
                     "flex items-center justify-between p-4 border transition-all duration-500",
                     revealIndex >= i ? "bg-white/5 border-white/10" : "bg-transparent border-transparent"
                   )}
                 >
                    <div className="flex flex-col">
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{m.name}_TARGET</span>
                        <span className="text-white font-mono font-bold text-sm tracking-tight">{m.status}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Stress_Delta</span>
                        <span className={clsx(
                            "font-mono font-bold text-xl",
                            m.stress > 70 ? "text-noir-red" : m.stress > 50 ? "text-noir-amber" : "text-noir-green"
                        )}>
                            {m.stress}%
                        </span>
                    </div>
                 </motion.div>
               ))}
            </div>

            {revealIndex === 2 && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 flex items-center gap-3 text-noir-amber font-mono text-[10px] uppercase tracking-[0.3em] bg-noir-amber/10 p-3 justify-center border border-noir-amber/20"
                >
                    <ShieldAlert size={14} />
                    <span>Analysis Complete: Data synced to board</span>
                </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
