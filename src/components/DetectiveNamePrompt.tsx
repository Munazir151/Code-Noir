"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface DetectiveNamePromptProps {
  open: boolean;
  initialName?: string;
  onSave: (name: string) => void;
  onSkip: () => void;
}

export default function DetectiveNamePrompt({
  open,
  initialName = "",
  onSave,
  onSkip,
}: DetectiveNamePromptProps) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (open) {
      setName(initialName);
    }
  }, [open, initialName]);

  const handleSubmit = () => {
    onSave(name.trim() || "Detective");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[220] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/90" />
          <motion.div
            className="relative w-full max-w-md border border-noir-border bg-[#09090e] shadow-[0_0_60px_rgba(0,0,0,0.85)]"
            initial={{ y: 20, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.98 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-noir-amber to-transparent" />
            <button
              onClick={onSkip}
              className="absolute right-4 top-4 text-noir-muted hover:text-noir-text transition-colors"
              aria-label="Skip name prompt"
            >
              <X size={14} />
            </button>

            <div className="px-6 pt-6 pb-5 space-y-5">
              <div>
                <p className="text-noir-muted font-mono text-[10px] uppercase tracking-[0.35em] mb-2">
                  Identity Check
                </p>
                <h2 className="font-serif text-3xl text-noir-amber leading-tight">
                  What&apos;s your name, Detective?
                </h2>
                <p className="mt-3 text-noir-text-dim font-mono text-sm leading-relaxed">
                  The board, the narration, and the final call will all use your name.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-noir-muted font-mono text-xs uppercase tracking-wider">
                  Badge name
                </label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                  autoFocus
                  placeholder="Detective"
                  className="w-full bg-black border border-noir-border text-noir-text px-4 py-3 font-mono text-sm outline-none focus:border-noir-amber transition-colors"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={onSkip}
                  className="text-noir-muted font-mono text-xs uppercase tracking-wider hover:text-noir-text transition-colors"
                >
                  Use default
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 border border-noir-amber text-noir-amber font-mono text-xs uppercase tracking-widest hover:bg-noir-amber hover:text-noir-bg transition-all"
                >
                  Enter the Case
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}