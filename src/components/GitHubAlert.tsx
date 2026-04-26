"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, AlertTriangle, X, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface GitHubAlertProps {
  show: boolean;
  onClose: () => void;
}

export default function GitHubAlert({ show, onClose }: GitHubAlertProps) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 200);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-md bg-[#0d1117] border border-red-500/50 rounded-sm shadow-[0_0_50px_rgba(239,68,68,0.2)] overflow-hidden"
          >
            <div className="bg-red-500/10 border-b border-red-500/30 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-500">
                <AlertTriangle size={18} className={glitch ? "animate-pulse" : ""} />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-100">
                  CRITICAL_SECURITY_LEAK
                </span>
              </div>
              <button 
                onClick={onClose}
                className="text-white/20 hover:text-white transition-colors"
                aria-label="Close alert"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 text-white/90">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Github size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-lg leading-tight">GitHub Secrets Scanner</h3>
                  <p className="text-white/40 font-mono text-[10px] uppercase tracking-wider mt-1">
                    Automated Alert: Repository "techsprout-api"
                  </p>
                </div>
              </div>

              <div className="bg-black/40 border border-white/5 p-4 rounded-sm space-y-2">
                <p className="text-white/70 font-mono text-xs leading-relaxed">
                  <span className="text-red-400 font-bold">MATCH FOUND:</span> AWS Access Key
                  <br />
                  <span className="text-white/30">Location:</span> app_config.js:265
                  <br />
                  <span className="text-white/30">Timestamp:</span> 2024-03-08 15:22:51 UTC
                </p>
                <div className="h-0.5 bg-white/5 w-full" />
                <p className="text-xs text-white/40 leading-relaxed italic">
                  "Credentials were live for 90 minutes. 4.2GB data egress detected."
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={onClose}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-mono text-[10px] uppercase tracking-[0.2em] py-3 transition-all font-bold shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                >
                  ACKNOWLEDGE_INCIDENT
                </button>
                <a 
                  href="#" 
                  className="flex items-center justify-center gap-2 text-white/30 hover:text-white/60 font-mono text-[9px] uppercase tracking-widest pt-2 transition-colors"
                >
                  <ExternalLink size={10} />
                  View Leak Forensics
                </a>
              </div>
            </div>

            <div className="bg-black/60 px-4 py-2 border-t border-white/5">
              <div className="flex justify-between items-center font-mono text-[8px] text-white/20 uppercase tracking-[0.3em]">
                <span>Status: INVESTIGATING</span>
                <span>ID: GH-2024-X47</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
