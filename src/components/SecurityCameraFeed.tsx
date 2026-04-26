"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Film, X } from "lucide-react";
import clsx from "clsx";

const CASE_FEEDS: Record<string, any[]> = {
  "0047": [
    {
      timestamp: "2026-03-14 23:50:12",
      motion: "Motion detected - a figure crosses the stairwell.",
      label: "23:50",
      glitch: false,
    },
    {
      timestamp: "2026-03-15 02:41:08",
      motion: "Motion detected - the same figure returns.",
      label: "02:41",
      glitch: false,
    },
    {
      timestamp: "2026-03-15 02:41:10",
      motion: "Camera buffer corrupt - face region unreadable.",
      label: "GLITCH",
      glitch: true,
    },
  ],
  "0003": [
    {
      timestamp: "2024-03-14 20:02:14",
      motion: "Unauthorized container access detected.",
      label: "20:02",
      glitch: false,
    },
    {
      timestamp: "2024-03-15 02:14:07",
      motion: "SSH tunnel established to prod-db-01.",
      label: "02:14",
      glitch: false,
    },
    {
      timestamp: "2024-03-15 02:18:45",
      motion: "Large egress: 4.2GB data transfer in progress.",
      label: "EGRESS",
      glitch: true,
    },
  ]
};

interface SecurityCameraFeedProps {
  open: boolean;
  onClose: () => void;
  caseId?: string;
}

export default function SecurityCameraFeed({ open, onClose, caseId = "0047" }: SecurityCameraFeedProps) {
  const [frameIndex, setFrameIndex] = useState(0);

  const frames = CASE_FEEDS[caseId] || CASE_FEEDS["0047"];

  useEffect(() => {
    if (open) {
      setFrameIndex(0);
    }
  }, [open]);

  const frame = frames[frameIndex];

  const figureStyles = useMemo(() => {
    if (frameIndex === 0) {
      return { left: "18%", top: "54%" };
    }

    if (frameIndex === 1) {
      return { left: "62%", top: "48%" };
    }

    return { left: "45%", top: "42%" };
  }, [frameIndex]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[190] bg-black/90 backdrop-blur-sm p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="mx-auto flex h-full w-full max-w-5xl flex-col overflow-hidden border border-noir-border bg-[#040508] shadow-[0_0_80px_rgba(0,0,0,0.85)]"
            initial={{ scale: 0.98, y: 18 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.98, y: 18 }}
          >
            <div className="flex items-center justify-between border-b border-noir-border px-4 py-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-noir-green">
                  CAM_04 - STAIRWELL B
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-noir-muted">
                  REC <span className="text-noir-red">●</span> live playback
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-noir-muted transition-colors hover:text-noir-text"
                aria-label="Close camera feed"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid flex-1 gap-0 lg:grid-cols-[1.6fr_0.8fr]">
              <div className="relative overflow-hidden bg-[#07120a]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(109,255,123,0.18),transparent_60%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_50%,transparent_50%)] bg-[length:100%_4px] opacity-25" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02),transparent,rgba(255,255,255,0.02))]" />

                <div className="absolute left-4 top-4 z-10 rounded border border-noir-green/20 bg-black/55 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-noir-green">
                  {frame.timestamp}
                </div>
                <div className="absolute right-4 top-4 z-10 rounded border border-noir-green/20 bg-black/55 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-noir-green">
                  MOTION DETECTED
                </div>

                <div className="absolute inset-x-0 bottom-0 z-10 border-t border-noir-green/15 bg-black/60 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-noir-green">
                  {frame.motion}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-[70%] w-[82%] overflow-hidden border border-noir-green/15 bg-[#0b1a0f]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(120,255,130,0.12),transparent_55%)]" />
                    <div
                      className={clsx(
                        "absolute h-20 w-10 rounded-full bg-noir-green/55 blur-[0.5px]",
                        frame.glitch ? "opacity-10" : "opacity-85",
                      )}
                      style={figureStyles}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)] animate-[scan-y_6s_linear_infinite] opacity-10" />
                    {frame.glitch && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-center">
                        <div className="max-w-[16rem] border border-noir-green/20 bg-black/70 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.35em] text-noir-green shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                          FACE BUFFER GLITCH
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-noir-border bg-[#06070b] lg:border-l lg:border-t-0">
                <div className="border-b border-noir-border px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-noir-muted">
                    Scrub Timeline
                  </p>
                </div>
                <div className="space-y-4 px-4 py-4">
                  <div className="grid grid-cols-3 gap-2">
                    {frames.map((entry: any, index: number) => (
                      <button
                        key={entry.label}
                        onClick={() => setFrameIndex(index)}
                        className={clsx(
                          "border px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.25em] transition-colors",
                          index === frameIndex
                            ? "border-noir-green bg-noir-green/10 text-noir-green"
                            : "border-noir-border bg-black/30 text-noir-muted hover:border-noir-green/30 hover:text-noir-text",
                        )}
                      >
                        {entry.label}
                      </button>
                    ))}
                  </div>

                  <div className="rounded border border-noir-border bg-black/35 p-3">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-noir-muted">
                      Camera Notes
                    </p>
                    <p className="font-mono text-sm leading-relaxed text-noir-text-dim">
                      {frameIndex === 0 &&
                        "A figure moves through the stairwell at 23:50. The image is grainy, but the posture matches the suspect profile."}
                      {frameIndex === 1 &&
                        "The same figure returns hours later. The frame is stable, then the feed starts to choke just before the face is visible."}
                      {frameIndex === 2 &&
                        "The feed glitches exactly where the face would be. Whoever did this knew the blind spot."}
                    </p>
                  </div>

                  <div className="rounded border border-noir-border bg-black/35 p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-noir-green">
                      Live Status
                    </p>
                    <p className="mt-2 font-mono text-sm text-noir-text">
                      Timestamp: {frame.timestamp}
                    </p>
                    <p className="font-mono text-sm text-noir-text-dim">
                      Feed lock: unstable, likely tampered.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-noir-muted">
                    <Film size={12} className="text-noir-green" />
                    Playback source: CMX-04 archival buffer
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-noir-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.35em] text-noir-muted">
              scrub through the timestamps. the feed does not want to be seen.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}