"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { PhoneCall, PhoneOff, Signal } from "lucide-react";

interface IncomingCallOverlayProps {
  open: boolean;
  onAnswer: () => void;
  onDecline: () => void;
}

export default function IncomingCallOverlay({
  open,
  onAnswer,
  onDecline,
}: IncomingCallOverlayProps) {
  const ringIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playPulse = (frequency: number, duration: number, delay = 0) => {
      const now = audioContext.currentTime + delay;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(frequency, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start(now);
      oscillator.stop(now + duration + 0.02);
    };

    const ringPattern = () => {
      playPulse(780, 0.18, 0);
      playPulse(620, 0.18, 0.22);
    };

    if (audioContext.state === "suspended") {
      void audioContext.resume();
    }

    ringPattern();
    ringIntervalRef.current = window.setInterval(ringPattern, 1700);

    return () => {
      if (ringIntervalRef.current !== null) {
        window.clearInterval(ringIntervalRef.current);
        ringIntervalRef.current = null;
      }
      void audioContext.close();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[210] flex items-end justify-center px-4 pb-6 pointer-events-none"
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 120 }}
          transition={{ type: "spring", damping: 24, stiffness: 220 }}
        >
          <div className="w-full max-w-lg pointer-events-auto overflow-hidden border border-[#5a1f24] bg-[linear-gradient(180deg,#16070a,#0b0b10_40%,#080810)] shadow-[0_0_70px_rgba(112,18,28,0.35)]">
            <div className="h-px bg-gradient-to-r from-transparent via-noir-red to-transparent" />
            <div className="px-5 py-4 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-noir-red">
                    <Signal size={12} className="animate-pulse" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.35em]">
                      Unknown Number
                    </p>
                  </div>
                  <h3 className="text-noir-text font-serif text-3xl leading-tight">
                    Incoming Call
                  </h3>
                  <p className="text-noir-text-dim font-mono text-sm leading-relaxed max-w-md">
                    A voice line has opened on the other end. It does not sound friendly.
                  </p>
                </div>
                <div className="text-right font-mono text-[10px] text-noir-muted uppercase tracking-widest">
                  <div>No caller ID</div>
                  <div className="text-noir-red mt-1">REC ● LIVE</div>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="h-px bg-gradient-to-r from-transparent via-noir-red/60 to-noir-red/20" />
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-noir-red/40 bg-noir-red/10 shadow-[0_0_24px_rgba(255,77,77,0.22)]">
                  <PhoneCall size={28} className="text-noir-red" />
                </div>
                <div className="h-px bg-gradient-to-l from-transparent via-noir-red/60 to-noir-red/20" />
              </div>

              <div className="flex items-center justify-between gap-3 rounded border border-white/5 bg-black/30 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-noir-muted">
                <span>Line unstable</span>
                <span>Duration 00:10</span>
                <span>Audio routed</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onAnswer}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 border border-noir-green text-noir-green font-mono text-xs uppercase tracking-[0.3em] hover:bg-noir-green hover:text-noir-bg transition-colors"
                >
                  <PhoneCall size={13} />
                  Answer
                </button>
                <button
                  onClick={onDecline}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 border border-noir-border text-noir-muted font-mono text-xs uppercase tracking-[0.3em] hover:text-noir-text hover:border-noir-amber transition-colors"
                >
                  <PhoneOff size={13} />
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}