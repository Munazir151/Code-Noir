"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Folder, Eye, Terminal, X } from "lucide-react";
import clsx from "clsx";

interface OnboardingModalProps {
  onClose: () => void;
}

const STEPS = [
  {
    icon: "💀",
    title: "A Man Is Dead.",
    subtitle: "Raymond Voss. Developer. 34 years old.",
    body: "Fourteen minutes after his death, 50 BTC vanished from his cold wallet. The killer didn't break in — they had the seed phrase. It was sitting in a code comment, waiting to be found.",
    visual: (
      <div className="font-mono text-xs leading-6 bg-[#080810] border border-[#1a1a2e] rounded p-4 text-left">
        <span className="text-noir-muted">{"// Cold wallet — DO NOT SHARE"}</span>
        <br />
        <span className="text-noir-muted">{"// TODO: remove before commit!!!"}</span>
        <br />
        <span className="text-noir-text">{"walletAddress: "}</span>
        <span className="text-noir-green">{'"1A2B3C...6P"'}</span>
        <br />
        <span className="text-noir-muted">{"// SEED PHRASE:"}</span>
        <br />
        <div className="mt-1 border-l-2 border-noir-amber pl-3 bg-noir-amber/10">
          <span className="text-noir-amber font-bold">{"seedPhrase: "}</span>
          <span className="text-noir-green">{'"abandon ability able..."'}</span>
          <span className="ml-2 text-noir-amber text-[10px] animate-pulse">← 🔍 SUSPICIOUS</span>
        </div>
      </div>
    ),
    hint: "The crime scene is inside the code.",
  },
  {
    icon: "📂",
    title: "Open the Files.",
    subtitle: "The file tree is your investigation board.",
    body: "Every file in CASE_0047 holds a piece of the truth — victim profiles, suspect records, emails, blockchain data, security logs. Click any file to open it in the editor.",
    visual: (
      <div className="font-mono text-xs leading-7 bg-[#080810] border border-[#1a1a2e] rounded p-4 text-left">
        <div className="text-noir-amber">📁 CASE_0047</div>
        <div className="ml-4 text-noir-text">📄 README.md</div>
        <div className="ml-4 text-noir-text bg-noir-amber/10 border-l border-noir-amber pl-2">👤 victim_profile.js <span className="text-noir-amber">← start here</span></div>
        <div className="ml-4 text-noir-text">🎯 suspects.json</div>
        <div className="ml-4 text-noir-muted">📁 evidence/</div>
        <div className="ml-8 text-noir-text">📧 emails.txt</div>
        <div className="ml-8 text-noir-text">⛓️ transactions.py</div>
        <div className="ml-8 text-noir-text">📹 camera_log.rs</div>
        <div className="ml-8 text-noir-muted">🔒 audit.enc <span className="text-noir-muted text-[10px]">← unlock with a clue</span></div>
        <div className="ml-4 text-noir-amber">⚡ SOLVE.sh</div>
      </div>
    ),
    hint: "You don't need to be a programmer. Just read.",
  },
  {
    icon: "🔍",
    title: "Spot the Clues.",
    subtitle: "Suspicious code glows amber. Hover to learn more.",
    body: "When you open a file, the editor will highlight suspicious lines. Your detective notes appear at the bottom of the screen — explaining what matters and why. Evidence you collect appears in the Evidence Board.",
    visual: (
      <div className="space-y-2">
        <div className="font-mono text-xs bg-[#080810] border border-[#1a1a2e] rounded p-4">
          <div className="text-noir-muted mb-2">// camera_log.rs</div>
          <div className="text-noir-text">{"event_type: EventType::CameraOffline,"}</div>
          <div className="border-l-2 border-noir-amber pl-3 bg-noir-amber/10">
            <span className="text-noir-text">{"notes: "}</span>
            <span className="text-noir-green">{'"⚠️ UNSCHEDULED'}</span>
            <span className="ml-1 text-noir-amber text-[10px]">🔍</span>
          </div>
        </div>
        <div className="border border-noir-amber/30 bg-noir-amber/5 rounded p-3 flex items-start gap-3">
          <span className="text-lg">🕵️</span>
          <div>
            <p className="text-noir-amber text-[10px] font-mono uppercase tracking-wider mb-1">Evidence Logged</p>
            <p className="text-noir-text text-xs font-mono italic font-bold">"The cameras went dark — and no one ordered maintenance."</p>
          </div>
        </div>
      </div>
    ),
    hint: "Amber = suspicious. Follow the glow.",
  },
  {
    icon: "⚡",
    title: "Make the Call.",
    subtitle: "Open SOLVE.sh when you know who did it.",
    body: "Once you've gathered enough evidence, open SOLVE.sh in the file tree. You'll get a terminal interface — type 'accuse [name]' to file your official accusation. Choose carefully. You only get one shot.",
    visual: (
      <div className="font-mono text-xs bg-[#080810] border border-[#1a1a2e] rounded p-4 text-left">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1a1a2e]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#c0392b] opacity-70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27ae60] opacity-70" />
          <span className="text-noir-muted ml-2">SOLVE.sh</span>
        </div>
        <div className="text-noir-muted">$ suspects</div>
        <div className="text-noir-text ml-2">crane  — Victoria Crane, CFO</div>
        <div className="text-noir-text ml-2">ghost  — Marco Delgado, Hacker</div>
        <div className="text-noir-text ml-2">zhao   — Lin Zhao, Co-founder</div>
        <div className="mt-2 text-noir-muted">$ accuse <span className="text-noir-amber">crane</span></div>
        <div className="text-noir-green mt-1">Transmitting accusation...</div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[#6a6a8a]">$</span>
          <span className="w-2 h-3 bg-[#d4a017] animate-pulse inline-block" />
        </div>
      </div>
    ),
    hint: "Type 'help' in the terminal for all commands.",
  },
];

export default function OnboardingModal({ onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black" />

      <motion.div
        className="relative w-full max-w-lg z-10"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
      >
        {/* Card */}
        <div className="border border-noir-border bg-[#0a0a0f] rounded-sm overflow-hidden"
          style={{ boxShadow: "0 0 60px rgba(0,0,0,0.9), 0 0 30px rgba(212,160,23,0.15)" }}>

          {/* Top amber line */}
          <div className="h-px bg-gradient-to-r from-transparent via-noir-amber to-transparent" />

          {/* Skip button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-noir-muted hover:text-noir-text transition-colors"
          >
            <X size={14} />
          </button>

          {/* Step progress */}
          <div className="flex gap-1 px-6 pt-5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={clsx(
                  "h-0.5 flex-1 rounded-full transition-all duration-500",
                  i <= step ? "bg-noir-amber" : "bg-noir-border"
                )}
              />
            ))}
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{current.icon}</span>
                  <div>
                    <h2 className="text-noir-amber font-serif text-xl font-bold leading-tight">
                      {current.title}
                    </h2>
                    <p className="text-noir-text-dim font-mono text-xs mt-0.5">
                      {current.subtitle}
                    </p>
                  </div>
                </div>

                {/* Body text */}
                <p className="text-noir-text font-mono text-sm leading-relaxed mb-5">
                  {current.body}
                </p>

                {/* Visual */}
                <div className="mb-5">{current.visual}</div>

                {/* Hint */}
                <div className="flex items-center gap-2 text-noir-muted font-mono text-xs">
                  <span className="text-noir-amber opacity-60">▸</span>
                  <span>{current.hint}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-noir-border">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className={clsx(
                "flex items-center gap-1.5 font-mono text-xs transition-colors",
                step === 0
                  ? "text-transparent cursor-default"
                  : "text-noir-muted hover:text-noir-text"
              )}
            >
              <ChevronLeft size={13} />
              Back
            </button>

            <span className="text-noir-muted font-mono text-xs">
              {step + 1} / {STEPS.length}
            </span>

            <button
              onClick={isLast ? onClose : () => setStep((s) => s + 1)}
              className={clsx(
                "flex items-center gap-1.5 font-mono text-xs px-4 py-2 transition-all duration-200",
                isLast
                  ? "bg-noir-amber text-noir-bg font-bold"
                  : "border border-noir-amber text-noir-amber hover:bg-noir-amber hover:text-noir-bg"
              )}
            >
              {isLast ? "Start Investigation" : "Next"}
              {!isLast && <ChevronRight size={13} />}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
