"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useRef, useEffect } from "react";
import { Camera, FolderOpen, X, GripHorizontal } from "lucide-react";
import clsx from "clsx";

export type BoardPin = {
  id: string;
  title: string;
  note: string;
  connectedToVictoria?: boolean;
};

interface EvidenceBoardProps {
  open: boolean;
  playerName: string;
  pins: BoardPin[];
  caseId: string;
  config?: {
      layout: Record<string, { x: number; y: number; rotate: number }>;
      connectors: Array<[string, string]>;
  };
  onClose: () => void;
  onOpenCameraFeed: () => void;
  onOpenCrimeScene: () => void;
}

export default function EvidenceBoard({
  open,
  playerName,
  pins,
  caseId,
  config,
  onClose,
  onOpenCameraFeed,
  onOpenCrimeScene,
}: EvidenceBoardProps) {
  const [positions, setPositions] = useState<Record<string, { x: number; y: number; rotate: number }>>({});

  useEffect(() => {
      if (config?.layout) {
          setPositions(prev => ({ ...prev, ...config.layout }));
      }
  }, [config, caseId]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const visibleIds = useMemo(() => new Set(pins.map((pin) => pin.id)), [pins]);
  const filledCount = pins.length;

  const lines = useMemo(
    () =>
      (config?.connectors || []).filter(
        ([from, to]: [string, string]) => visibleIds.has(from) && visibleIds.has(to),
      ),
    [visibleIds, config],
  );

  const handleDrag = (id: string, info: any) => {
    setPositions(prev => {
      const current = prev[id] || { x: 100, y: 100, rotate: 0 };
      return {
        ...prev,
        [id]: {
          ...current,
          x: current.x + info.delta.x,
          y: current.y + info.delta.y,
        }
      };
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[170] overflow-hidden bg-[#050505] p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative flex h-full w-full flex-col overflow-hidden border border-[#2a2a2a] bg-[#0c0c0c] shadow-[0_0_100px_rgba(0,0,0,1)]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,40,60,0.1)_0%,transparent_100%)]" />
            <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            <div className="relative z-20 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md px-6 py-4">
              <div className="flex items-center gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-noir-amber animate-pulse" />
                    <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-noir-amber font-bold">
                        Dossier_Wall_v4.2
                    </p>
                  </div>
                  <h2 className="font-serif text-3xl text-white tracking-tight">
                    The Investigation
                  </h2>
                </div>
                <div className="h-10 w-[1px] bg-white/10" />
                <div className="space-y-1">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">Detective Badge</p>
                    <p className="font-mono text-[10px] text-noir-amber font-bold">{playerName || "UNKNOWN_UNIT"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenCrimeScene}
                  className="group flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/60 transition-all hover:border-noir-amber hover:text-noir-amber"
                >
                  <FolderOpen size={14} className="group-hover:scale-110 transition-transform" />
                  Files
                </button>
                <button
                  onClick={onOpenCameraFeed}
                  className="group flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/60 transition-all hover:border-noir-green hover:text-noir-green"
                >
                  <Camera size={14} className="group-hover:animate-pulse" />
                  CCTV
                </button>
                <button
                  onClick={onClose}
                  className="ml-4 p-2 text-white/20 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="relative z-10 flex-1 overflow-hidden" ref={containerRef}>
                {/* SVG Connections Layer */}
                <svg className="absolute inset-0 h-full w-full pointer-events-none z-0">
                  <defs>
                    <filter id="string-glow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  {lines.map(([from, to]: [string, string]) => {
                    const fromPos = positions[from] || { x: 0, y: 0 };
                    const toPos = positions[to] || { x: 0, y: 0 };
                    
                    // offset to target centers of cards
                    const x1 = fromPos.x + 105; 
                    const y1 = fromPos.y + 60;
                    const x2 = toPos.x + 105;
                    const y2 = toPos.y + 60;

                    return (
                      <motion.line
                        key={`${from}-${to}`}
                        x1={x1} y1={y1}
                        x2={x2} y2={y2}
                        stroke="#8b0000"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        filter="url(#string-glow)"
                      />
                    );
                  })}
                </svg>

                {pins.map((pin, index) => {
                  const pos = positions[pin.id] || { 
                      x: 150 + (index % 4) * 220, 
                      y: 100 + Math.floor(index / 4) * 180, 
                      rotate: index % 2 === 0 ? -1 : 1 
                  };
                  const isVictoria = pin.id === "victoria";
                  
                  return (
                    <motion.div
                      key={pin.id}
                      drag
                      dragMomentum={false}
                      onDrag={(e, info) => handleDrag(pin.id, info)}
                      className={clsx(
                        "absolute w-[210px] cursor-grab active:cursor-grabbing rounded-sm border bg-[#fdfaf5] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-shadow hover:shadow-[0_25px_50px_rgba(0,0,0,0.6)] z-10",
                        isVictoria ? "border-noir-red bg-[#fff5f5]" : "border-black/5"
                      )}
                      style={{ x: pos.x, y: pos.y, rotate: pos.rotate }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileDrag={{ scale: 1.05, zIndex: 100 }}
                    >
                      {/* Pushpin Header */}
                      <div className="flex items-center justify-between mb-3">
                          <div className={clsx(
                              "w-3 h-3 rounded-full border-2 border-black/10 shadow-sm",
                              isVictoria ? "bg-noir-red" : "bg-[#cf3030]"
                          )} />
                          <GripHorizontal size={12} className="text-black/10" />
                      </div>

                      <div className="space-y-2">
                        <h4 className={clsx(
                            "font-serif text-lg leading-tight uppercase tracking-tight",
                            isVictoria ? "text-noir-red" : "text-black"
                        )}>
                            {pin.title}
                        </h4>
                        <div className="h-[1px] bg-black/5 w-full" />
                        <p className="font-mono text-[10px] leading-relaxed text-black/60 italic">
                          {pin.note}
                        </p>
                      </div>

                      {/* Card Metadata Accessory */}
                      <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-2">
                         <span className="font-mono text-[7px] uppercase text-black/30">ID: {pin.id.toUpperCase()}</span>
                         <span className="font-mono text-[7px] text-black/20">CONFIDENTIAL</span>
                      </div>
                    </motion.div>
                  );
                })}

                {!filledCount && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black/60 border border-white/10 backdrop-blur-md px-8 py-6 text-center"
                    >
                      <p className="font-serif text-3xl text-white mb-2">The Wall is Empty</p>
                      <p className="font-mono text-xs text-noir-amber uppercase tracking-widest">Awaiting Case Metadata Injection</p>
                    </motion.div>
                  </div>
                )}
            </div>

            {/* Global HUD Meter */}
            <div className="relative z-20 border-t border-white/5 bg-[#080808]/90 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="space-y-1">
                        <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 block">Active_Nodes</span>
                        <span className="font-mono text-xs text-white font-bold">{filledCount} / 7</span>
                    </div>
                    <div className="h-6 w-[1px] bg-white/10" />
                    <div className="space-y-1">
                        <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 block">Logic_Flow</span>
                        <div className="flex gap-1">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className={clsx("w-1 h-3 transition-colors", i < (filledCount * 2) ? "bg-noir-amber" : "bg-white/5")} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/20 animate-pulse">
                    Tactical Mapping Mode Active
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}