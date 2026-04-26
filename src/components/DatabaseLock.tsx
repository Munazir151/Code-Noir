"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Database, ShieldAlert, X, Lock } from "lucide-react";
import { useEffect, useState } from "react";

interface DatabaseLockProps {
  show: boolean;
  onClose: () => void;
}

export default function DatabaseLock({ show, onClose }: DatabaseLockProps) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (show) {
      const interval = setInterval(() => setPulse(p => !p), 1000);
      return () => clearInterval(interval);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-full max-w-lg bg-[#050508] border border-blue-500/30 rounded-sm shadow-[0_0_100px_rgba(59,130,246,0.1)] overflow-hidden"
          >
            <div className="bg-blue-600/10 border-b border-blue-500/20 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-blue-400">
                <Database size={20} className={pulse ? "animate-pulse" : ""} />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.3em]">
                  SYSTEM_QUARANTINE_ACTIVE
                </span>
              </div>
              <button onClick={onClose} className="text-white/20 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-8 text-center space-y-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
                <div className="relative w-20 h-20 mx-auto rounded-full border border-blue-500/40 flex items-center justify-center bg-black">
                  <Lock size={32} className="text-blue-400" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-white">Database in Lockdown</h3>
                <p className="text-white/40 font-mono text-xs max-w-sm mx-auto leading-relaxed">
                  Multiple unauthorized export requests detected. All read/write operations for "deepstack_prod" have been suspended by the Security Policy.
                </p>
              </div>

              <div className="bg-blue-900/10 border border-blue-500/10 p-4 rounded-sm">
                <div className="flex justify-between text-[10px] font-mono text-blue-300/60 uppercase tracking-widest mb-1">
                  <span>Inbound Traffic</span>
                  <span>0 B/s</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500"
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-transparent border border-blue-500/40 hover:bg-blue-500/10 text-blue-400 font-mono text-[10px] uppercase tracking-[0.3em] py-4 transition-all"
              >
                DISMISS_DIAGNOSTIC
              </button>
            </div>

            <div className="bg-black/60 px-6 py-3 border-t border-white/5 flex justify-between items-center font-mono text-[9px] text-white/20 uppercase tracking-widest">
              <span>Auth: SAM_ADMIN_BYPASS_ATTEMPT</span>
              <span>Node: DB-01-SEC</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
