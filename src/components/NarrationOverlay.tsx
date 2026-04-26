"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X, Volume2, VolumeX } from "lucide-react";
import { speak, stopSpeaking, isSpeaking } from "@/lib/elevenlabs";

interface NarrationOverlayProps {
  text: string | null;
  audioEnabled: boolean;
  onClose: () => void;
}

export default function NarrationOverlay({
  text,
  audioEnabled,
  onClose,
}: NarrationOverlayProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayedText("");
      stopSpeaking();
      return;
    }

    setDisplayedText("");
    setIsTyping(true);

    // Start audio narration if enabled
    if (audioEnabled) {
      speak({
        text,
        onStart: () => setIsPlaying(true),
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      });
    }

    // Typewriter effect: 30ms per character with a small pause after each newline.
    let i = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let canceled = false;

    const tick = () => {
      if (canceled) return;

      if (i < text.length) {
        const ch = text[i];
        setDisplayedText((prev) => prev + ch);
        i += 1;
        const delay = ch === "\n" ? 220 : 30;
        timer = setTimeout(tick, delay);
        return;
      }

      setIsTyping(false);
    };

    tick();

    return () => {
      canceled = true;
      if (timer) clearTimeout(timer);
      stopSpeaking();
    };
  }, [text, audioEnabled]);

  const handleClose = () => {
    stopSpeaking();
    onClose();
  };

  return (
    <AnimatePresence>
      {text && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mx-6 mb-6 pointer-events-auto">
            <div
              className="relative border bg-[#0a0a0f] p-5 rounded-sm"
              style={{
                borderColor: "#d4a01766",
                boxShadow:
                  "0 0 40px rgba(212,160,23,0.06), 0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a017] to-transparent" />

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[#d4a017]/40 flex items-center justify-center text-sm bg-[#d4a017]/5">
                  🕵️
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-[#d4a017] text-[10px] font-mono tracking-wider uppercase opacity-80">
                      Detective — Internal Analysis
                    </p>
                    {isPlaying && (
                      <Volume2
                        size={10}
                        className="text-[#d4a017] animate-pulse"
                      />
                    )}
                  </div>
                  <p className="text-[#c8c8d4] font-mono text-sm leading-relaxed">
                    "{displayedText}
                    {isTyping && (
                      <span className="cursor-blink text-[#d4a017]">▋</span>
                    )}
                    "
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="flex-shrink-0 text-[#4a4a6a] hover:text-[#d4a017] transition-colors mt-1"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
