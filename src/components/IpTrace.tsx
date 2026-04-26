"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LocateFixed, MapPin, X, Network } from "lucide-react";
import clsx from "clsx";

interface IpTraceProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  targetIp?: string;
  targetLabel?: string;
}

const HOPS = [
  { id: 1, x: 100, y: 350, label: "EXIT_NODE", ip: "185.107.12.8" },
  { id: 2, x: 220, y: 280, label: "VPN_RELAY", ip: "104.22.45.161" },
  { id: 3, x: 380, y: 220, label: "PROXY_W1", ip: "45.132.8.21" },
  { id: 4, x: 500, y: 140, label: "LOCAL_HUB", ip: "192.168.1.1" },
  { id: 5, x: 620, y: 80, label: "VICTIM_WKS", ip: "172.16.2.88" },
];

export default function IpTrace({ isOpen, onClose, onSuccess, targetIp = "172.16.2.88", targetLabel = "VICTORIA_WKS" }: IpTraceProps) {
  const dynamicHops = [...HOPS];
  dynamicHops[4] = { ...dynamicHops[4], ip: targetIp, label: "TARGET_NODE" };

  const [activeHops, setActiveHops] = useState<number>(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!isOpen) {
        setActiveHops(0);
        setComplete(false);
        return;
    }

    const startTrace = async () => {
        for (let i = 1; i <= dynamicHops.length; i++) {
            await new Promise(r => setTimeout(r, 400));
            setActiveHops(i);
        }
        setComplete(true);
        setTimeout(onSuccess, 3000);
    };

    startTrace();
  }, [isOpen, onSuccess]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-4xl bg-[#050505] border border-noir-border h-[520px] flex flex-col overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0a0a0a]">
                <div className="flex items-center gap-3">
                   <LocateFixed className="text-noir-amber animate-spin-slow" size={18} />
                   <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white">Active Signal Triangulation</h3>
                </div>
                <button onClick={onClose} className="text-white/20 hover:text-white transition-colors">
                    <X size={18} />
                </button>
            </div>

            <div className="flex-1 relative bg-[radial-gradient(circle_at_center,rgba(40,40,60,0.2)_0%,transparent_100%)] overflow-hidden">
                {/* SVG Map Background (Grid) */}
                <svg className="absolute inset-0 w-full h-full opacity-10">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                <svg className="w-full h-full relative z-10">
                    {/* Hop Lines */}
                    {HOPS.slice(0, activeHops - 1).map((hop, i) => {
                        const next = HOPS[i + 1];
                        return (
                            <motion.line
                                key={i}
                                x1={hop.x} y1={hop.y}
                                x2={next.x} y2={next.y}
                                stroke="#ffcc00"
                                strokeWidth="2"
                                strokeDasharray="5 5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.4 }}
                            />
                        );
                    })}

                    {/* Nodes */}
                    {dynamicHops.map((hop, i) => (
                        <g key={hop.id} className={clsx("transition-opacity duration-500", i < activeHops ? "opacity-100" : "opacity-0")}>
                            <motion.circle
                                cx={hop.x}
                                cy={hop.y}
                                r={i === dynamicHops.length - 1 ? 12 : 6}
                                fill={i === dynamicHops.length - 1 ? "transparent" : "#ffcc00"}
                                stroke="#ffcc00"
                                strokeWidth="2"
                            />
                            {i === dynamicHops.length - 1 && (
                                <motion.circle
                                    cx={hop.x}
                                    cy={hop.y}
                                    r={12}
                                    fill="rgba(255,204,0,0.2)"
                                    animate={{ scale: [1, 2, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                />
                            )}
                            <text
                                x={hop.x}
                                y={hop.y + 25}
                                textAnchor="middle"
                                className="fill-white/40 font-mono text-[9px] uppercase tracking-widest"
                            >
                                {hop.label}
                            </text>
                            <text
                                x={hop.x}
                                y={hop.y + 36}
                                textAnchor="middle"
                                className="fill-noir-amber font-mono text-[8px] font-bold"
                            >
                                {hop.ip}
                            </text>
                        </g>
                    ))}
                </svg>

                {/* Status Overlay */}
                <div className="absolute bottom-8 left-8 p-4 bg-black/80 border border-white/10 backdrop-blur-md min-w-[240px]">
                    <div className="flex items-center gap-2 mb-3">
                        <Network size={12} className="text-noir-amber" />
                        <span className="text-[10px] font-mono text-white tracking-[0.2em] uppercase">Trace_Log</span>
                    </div>
                    <div className="space-y-1.5 font-mono text-[9px]">
                        {dynamicHops.slice(0, activeHops).map((h, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex justify-between gap-4"
                            >
                                <span className={i === activeHops - 1 ? "text-noir-amber" : "text-white/40"}>HOP_{i+1} ACK:</span>
                                <span className="text-white/60">{h.ip}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {complete && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-noir-amber/5 pointer-events-none"
                    >
                        <div className="p-8 border-4 border-noir-amber bg-black/90 flex flex-col items-center gap-6 shadow-[0_0_100px_rgba(255,204,0,0.2)]">
                            <MapPin size={48} className="text-noir-amber animate-bounce" />
                            <div className="text-center space-y-2">
                                <h4 className="text-2xl text-white font-serif tracking-tight">Terminal Located</h4>
                                <p className="text-noir-amber font-mono text-xs uppercase tracking-[0.4em]">{targetLabel}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
