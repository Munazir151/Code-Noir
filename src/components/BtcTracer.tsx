"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bitcoin, X, ExternalLink, ShieldCheck } from "lucide-react";
import clsx from "clsx";

interface BtcTracerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialAddress?: string;
  finalResult?: string;
}

const NODES = [
  { id: 1, x: 100, y: 150, label: "MAIN_WALLET", data: "0xBC1...99AF" },
  { id: 2, x: 250, y: 80, label: "MIXER_ALPHA", data: "RELAYING_HOP_01" },
  { id: 3, x: 250, y: 220, label: "MIXER_BETA", data: "RELAYING_HOP_02" },
  { id: 4, x: 400, y: 150, label: "EXCH_PROXY", data: "IP_LOG_MATCH" },
  { id: 5, x: 550, y: 150, label: "FINAL_ADDRESS", data: "v****a@n***f**l.com" },
];

const EDGES = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
];

export default function BtcTracer({ isOpen, onClose, onSuccess, initialAddress = "0xBC1...99AF", finalResult = "victoria@nightfall.com" }: BtcTracerProps) {
  const dynamicNodes = [...NODES];
  dynamicNodes[0] = { ...dynamicNodes[0], data: initialAddress };
  dynamicNodes[4] = { ...dynamicNodes[4], data: finalResult.replace(/./g, "*"), label: "TARGET_IDENTITY" };

  const [unlockedNodes, setUnlockedNodes] = useState<Set<number>>(new Set([1]));
  const [selectedNode, setSelectedNode] = useState<number | null>(1);
  const [revealText, setRevealText] = useState("");
  const [fullReveal, setFullReveal] = useState(false);

  useEffect(() => {
    if (unlockedNodes.has(5) && !fullReveal) {
        setFullReveal(true);
        typewriterReveal(finalResult);
        setTimeout(onSuccess, 4000);
    }
  }, [unlockedNodes, fullReveal, onSuccess]);

  const typewriterReveal = (target: string) => {
    let current = target.replace(/./g, "*");
    setRevealText(current);
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < target.length) {
            current = target.slice(0, i + 1) + target.slice(i + 1).replace(/./g, "*");
            setRevealText(current);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 150);
  };

  const handleNodeClick = (id: number) => {
    if (unlockedNodes.has(id)) {
        setSelectedNode(id);
        // Unlock neighbors
        const neighbors = EDGES.filter(e => e.from === id).map(e => e.to);
        if (neighbors.length > 0) {
            setUnlockedNodes(prev => {
                const next = new Set(prev);
                neighbors.forEach(n => next.add(n));
                return next;
            });
        }
    }
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
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="relative w-full max-w-3xl bg-[#050505] border border-noir-border h-[500px] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0a0a0a]">
                <div className="flex items-center gap-3">
                   <Bitcoin className="text-noir-amber animate-pulse" size={18} />
                   <h3 className="font-mono text-xs uppercase tracking-[0.4em] text-white">Cryptographic Transaction Trace</h3>
                </div>
                <button onClick={onClose} className="text-white/20 hover:text-white transition-colors">
                    <X size={18} />
                </button>
            </div>

            <div className="flex-1 flex">
                <div className="flex-1 relative bg-[#010103] overflow-hidden">
                    <svg className="w-full h-full">
                        <defs>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Edges */}
                        {EDGES.map((edge, i) => {
                            const from = dynamicNodes.find(n => n.id === edge.from)!;
                            const to = dynamicNodes.find(n => n.id === edge.to)!;
                            const isUnlocked = unlockedNodes.has(edge.from) && unlockedNodes.has(edge.to);
                            
                            return (
                                <motion.line
                                    key={i}
                                    x1={from.x} y1={from.y}
                                    x2={to.x} y2={to.y}
                                    stroke={isUnlocked ? "#ffcc00" : "#ffffff10"}
                                    strokeWidth={isUnlocked ? 2 : 1}
                                    strokeDasharray="4 4"
                                    initial={{ opacity: 0 }}
                                    animate={{ 
                                        opacity: 1,
                                        strokeDashoffset: [0, -20]
                                    }}
                                    transition={{ 
                                        strokeDashoffset: { repeat: Infinity, duration: 1, ease: "linear" } 
                                    }}
                                />
                            );
                        })}

                        {/* Nodes */}
                        {dynamicNodes.map(node => (
                            <g 
                                key={node.id} 
                                className={clsx("cursor-pointer transition-all duration-300", unlockedNodes.has(node.id) ? "opacity-100" : "opacity-20")}
                                onClick={() => handleNodeClick(node.id)}
                            >
                                <motion.circle
                                    r={selectedNode === node.id ? 12 : 8}
                                    cx={node.x}
                                    cy={node.y}
                                    fill={unlockedNodes.has(node.id) ? "#ffcc00" : "#333"}
                                    filter={selectedNode === node.id ? "url(#glow)" : "none"}
                                    whileHover={{ r: 14 }}
                                />
                                <text 
                                    x={node.x} 
                                    y={node.y + 25} 
                                    textAnchor="middle" 
                                    className="fill-white/40 font-mono text-[8px] uppercase tracking-widest"
                                >
                                    {node.label}
                                </text>
                            </g>
                        ))}
                    </svg>

                    {/* HUD Overlay */}
                    <div className="absolute top-4 left-4 font-mono text-[8px] text-white/20 space-y-1">
                        <div>TX_SCAN_ENABLED</div>
                        <div>HOP_COUNT: {unlockedNodes.size}</div>
                        <div>TARGET: SATOSHI_0xEF</div>
                    </div>
                </div>

                {/* Info Panel */}
                <div className="w-64 border-l border-white/5 bg-[#0a0a0a] p-6 flex flex-col">
                    <div className="flex-1 space-y-6">
                        <div>
                            <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block mb-1">Active_Node</span>
                            <div className="text-noir-amber font-mono text-xs font-bold">
                                {selectedNode ? dynamicNodes.find(n => n.id === selectedNode)?.label : "---"}
                            </div>
                        </div>

                        <div>
                            <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block mb-1">Metadata</span>
                            <div className="text-white/80 font-mono text-[10px] break-all leading-tight">
                                {selectedNode ? dynamicNodes.find(n => n.id === selectedNode)?.data : "WAITING_FOR_HOP..."}
                            </div>
                        </div>

                        {fullReveal && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 bg-noir-amber/10 border border-noir-amber/30 space-y-3"
                            >
                                <div className="flex items-center gap-2 text-noir-amber">
                                    <ShieldCheck size={14} />
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest">Trace Complete</span>
                                </div>
                                <div className="font-mono text-xs text-white tracking-wider leading-relaxed">
                                    {revealText}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-white/5">
                        <div className="flex justify-between items-center text-[9px] font-mono text-white/20 uppercase tracking-widest mb-2">
                             <span>Progress</span>
                             <span>{Math.round((unlockedNodes.size / 5) * 100)}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 overflow-hidden">
                             <motion.div 
                                className="h-full bg-noir-amber"
                                animate={{ width: `${(unlockedNodes.size / 5) * 100}%` }}
                             />
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
