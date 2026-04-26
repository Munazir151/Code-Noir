"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Activity, Globe, X, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

interface TrafficMonitorProps {
  show: boolean;
  onClose: () => void;
}

export default function TrafficMonitor({ show, onClose }: TrafficMonitorProps) {
  const [dots, setDots] = useState<number[]>([]);

  useEffect(() => {
    if (show) {
      setDots(Array.from({ length: 5 }, () => Math.random() * 100));
      const interval = setInterval(() => {
         setDots(prev => [...prev.slice(1), Math.random() * 100]);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="w-full max-w-2xl bg-[#08080c] border border-noir-amber/20 rounded-sm shadow-[0_0_80px_rgba(212,160,23,0.1)] overflow-hidden"
          >
            <div className="bg-noir-amber/10 border-b border-noir-amber/20 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-noir-amber">
                <Globe size={18} />
                <span className="font-mono text-xs font-bold uppercase tracking-widest">
                  GLOBAL_EGRESS_MONITOR
                </span>
              </div>
              <button 
                onClick={onClose}
                className="text-noir-muted hover:text-noir-text transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="rounded border border-noir-border bg-black/40 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-noir-amber/60 font-mono text-[10px] uppercase tracking-widest">
                    <MapPin size={12} /> Origin Detected
                  </div>
                  <div className="space-y-1">
                    <p className="text-white font-mono text-sm">IP: 92.142.11.4</p>
                    <p className="text-noir-text-dim font-mono text-[10px]">Location: Moscow, RU (Suspicious Region)</p>
                  </div>
                </div>

                <div className="rounded border border-noir-border bg-black/40 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-noir-amber/60 font-mono text-[10px] uppercase tracking-widest">
                    <Activity size={12} /> Data Volume
                  </div>
                  <div className="h-20 flex items-end gap-1 px-1">
                    {dots.map((h, i) => (
                      <motion.div 
                        key={i}
                        className="flex-1 bg-noir-amber/40 border-t border-noir-amber"
                        animate={{ height: `${h}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    ))}
                  </div>
                  <p className="text-noir-amber font-mono text-[11px] text-center uppercase tracking-tighter">
                    8.2 GB / TOTAL_TRANSFER
                  </p>
                </div>
              </div>

              <div className="space-y-4 font-mono text-[10px] leading-relaxed">
                <div className="rounded border border-noir-border bg-[#0a0a10] p-4 h-full">
                  <p className="text-noir-muted uppercase mb-3 tracking-widest border-b border-noir-border pb-2">Analysis_Log</p>
                  <ul className="space-y-2 text-white/60">
                    <li>[14:22:01] Auth: API_KEY_EXFILTRATION</li>
                    <li>[14:22:04] Path: /api/v1/customer_data</li>
                    <li>[14:23:12] Bucket: s3-us-east-1-vault</li>
                    <li className="text-noir-amber">[14:23:45] Alert: UNUSUAL_EGRESS_DETECTED</li>
                    <li>[14:24:00] Status: SUSPENDED</li>
                  </ul>
                  <div className="mt-6 p-2 bg-noir-amber/5 border border-noir-amber/10 text-noir-amber italic">
                    "Someone used the key before the developer even finished the commit."
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-noir-amber text-noir-bg font-mono text-[10px] uppercase tracking-[0.4em] py-4 transition-all hover:bg-noir-amber/80 font-bold"
            >
              CLOSE_INTELLIGENCE_VIEW
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
