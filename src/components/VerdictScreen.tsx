"use client";

import { motion } from "framer-motion";
import { GLOSSARY } from "@/data/glossary";
import {
  CheckCircle2,
  XCircle,
  BookOpen,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import type { FullCase } from "@/data/cases";
import { ALL_CASES } from "@/data/cases";
import { speak, stopSpeaking } from "@/lib/elevenlabs";
import { useEffect, useRef } from "react";

interface ExplainableSuspect {
  id: string;
  name: string;
  confidence: number;
  evidenceFor: string[];
  evidenceAgainst: string[];
  missingEvidence: string[];
}

interface VerdictScreenProps {
  caseData: FullCase;
  accusedId: string;
  discoveredClues: Set<string>;
  explainableVerdict?: ExplainableSuspect[];
  onRestart: () => void;
  onCaseSelect: () => void;
  solvedCaseIds?: Set<string>;
  onSelectNextCase?: (caseId: string) => void;
  playerName?: string;
  audioEnabled?: boolean;
}

export default function VerdictScreen({
  caseData,
  accusedId,
  discoveredClues,
  explainableVerdict = [],
  onRestart,
  onCaseSelect,
  solvedCaseIds = new Set(),
  onSelectNextCase,
  playerName = "Detective",
  audioEnabled = true,
}: VerdictScreenProps) {
  const suspect = caseData.suspects.find((s) => s.id === accusedId);
  const isCorrect = accusedId === caseData.correctSuspectId;
  const verdict = suspect?.verdictScreen;
  const spokeRef = useRef(false);

  useEffect(() => {
    spokeRef.current = false;
    stopSpeaking();
  }, [caseData.id, accusedId]);

  useEffect(() => {
    if (!isCorrect || !audioEnabled || spokeRef.current) {
      return;
    }

    spokeRef.current = true;
    speak({
      text: `Good work, ${playerName}. Case closed.`,
      onError: () => undefined,
    });
  }, [isCorrect, audioEnabled, playerName]);

  // Find the next unsolved case in sequence
  const currentIndex = ALL_CASES.findIndex((c) => c.id === caseData.id);
  const nextUnsolvedCase = ALL_CASES.slice(currentIndex + 1).find(
    (c) => !c.isLocked && !solvedCaseIds.has(c.id),
  );

  const totalClues = caseData.clues.length;
  const discovered = caseData.clues.filter((c) => discoveredClues.has(c.id));
  const criticalFound = discovered.filter((c) => c.critical).length;
  const criticalTotal = caseData.clues.filter((c) => c.critical).length;
  const score = Math.round(
    (discovered.length / Math.max(totalClues, 1)) * 60 +
    (criticalFound / Math.max(criticalTotal, 1)) * 40,
  );

  const accentColor = isCorrect ? "#d4a017" : "#c0392b";

  return (
    <div className="fixed inset-0 bg-noir-bg z-50 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-noir-muted text-xs font-mono tracking-widest uppercase mb-4">
            Nightfall Division — {caseData.caseNumber}
          </p>
          <h1
            className="font-serif text-5xl font-bold mb-2"
            style={{
              color: accentColor,
              textShadow: `0 0 30px ${accentColor}50`,
            }}
          >
            {isCorrect ? "CASE CLOSED" : "WRONG CALL"}
          </h1>
          <div
            className="h-px mx-auto w-48 mt-4"
            style={{
              background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
            }}
          />
        </motion.div>

        {/* Verdict card */}
        <motion.div
          className="border rounded-sm p-6 mb-8"
          style={{
            borderColor: `${accentColor}80`,
            background: `${accentColor}20`,
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start gap-4">
            {isCorrect ? (
              <CheckCircle2
                size={28}
                className="text-noir-amber flex-shrink-0 mt-1"
              />
            ) : (
              <XCircle size={28} className="text-noir-red flex-shrink-0 mt-1" />
            )}
            <div>
              <h2 className="text-noir-text font-mono text-lg font-extrabold mb-1">
                Accused:{" "}
                <span style={{ color: accentColor }}>
                  {suspect?.name ?? accusedId}
                </span>
              </h2>
              <p
                className="text-xs font-mono font-bold tracking-wider uppercase mb-3"
                style={{ color: accentColor }}
              >
                {verdict?.type === "guilty"
                  ? "✓ CORRECT — GUILTY"
                  : verdict?.type === "cleared"
                    ? "✗ INCORRECT — ALIBI CONFIRMED"
                    : "✗ INCORRECT — INSUFFICIENT EVIDENCE"}
              </p>
              <p className="text-noir-text font-mono text-sm leading-relaxed">
                {verdict?.message ?? "No verdict data available."}
              </p>
              {isCorrect && (
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-noir-amber">
                  Good work, Detective {playerName}.
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Score row */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[
            {
              label: "Evidence Found",
              value: `${discovered.length}/${totalClues}`,
            },
            {
              label: "Critical Clues",
              value: `${criticalFound}/${criticalTotal}`,
            },
            { label: "Case Score", value: `${score}%` },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="border border-noir-border bg-noir-panel rounded-sm p-4 text-center"
            >
              <p className="text-noir-amber font-mono text-2xl font-bold mb-1">
                {value}
              </p>
              <p className="text-noir-muted font-mono text-xs uppercase tracking-wider">
                {label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* What you learned */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} className="text-noir-amber" />
            <h3 className="text-noir-amber font-mono text-sm font-bold tracking-wider uppercase">
              What You Learned
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {GLOSSARY.slice(0, 6).map((term) => (
              <div
                key={term.term}
                className="border border-noir-border bg-noir-panel rounded-sm p-3"
              >
                <p className="text-noir-text font-mono text-xs font-bold mb-1">
                  {term.term}
                </p>
                <p className="text-noir-text-dim font-mono text-xs leading-relaxed">
                  {term.definition}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} className="text-noir-amber" />
            <h3 className="text-noir-amber font-mono text-sm font-bold tracking-wider uppercase">
              Explainable Verdict Mode
            </h3>
          </div>
          <div className="space-y-3">
            {explainableVerdict.map((entry) => (
              <div
                key={entry.id}
                className="border border-noir-border bg-noir-panel rounded-sm p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-noir-text text-xs font-mono font-bold uppercase tracking-wider">
                    {entry.name}
                  </p>
                  <p className="text-noir-amber text-xs font-mono font-bold">
                    {entry.confidence}%
                  </p>
                </div>
                <p className="text-noir-text-dim font-mono text-xs mb-1">
                  Evidence For: {entry.evidenceFor.length > 0 ? entry.evidenceFor.join(", ") : "No direct supporting evidence."}
                </p>
                <p className="text-noir-text-dim font-mono text-xs mb-1">
                  Evidence Against: {entry.evidenceAgainst.length > 0 ? entry.evidenceAgainst.join(", ") : "No contradictory evidence."}
                </p>
                <p className="text-noir-text-dim font-mono text-xs">
                  Missing Evidence: {entry.missingEvidence.length > 0 ? entry.missingEvidence.join(", ") : "Critical evidence set complete."}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {!isCorrect && (
            <button
              onClick={onRestart}
              className="flex items-center gap-2 px-6 py-3 border border-noir-border text-noir-muted font-mono text-sm tracking-wider uppercase hover:border-noir-amber hover:text-noir-amber transition-all duration-300"
            >
              <RotateCcw size={14} />
              Try Again
            </button>
          )}

          {isCorrect && nextUnsolvedCase && onSelectNextCase && (
            <button
              onClick={() => onSelectNextCase(nextUnsolvedCase.id)}
              className="flex items-center gap-2 px-6 py-3 border border-noir-amber text-noir-amber font-mono text-sm tracking-wider uppercase hover:bg-noir-amber hover:text-noir-bg transition-all duration-300"
            >
              Continue to Next Case
              <ArrowRight size={14} />
            </button>
          )}

          <button
            onClick={onCaseSelect}
            className="flex items-center gap-2 px-6 py-3 border border-noir-border text-noir-muted font-mono text-sm tracking-wider uppercase hover:border-noir-amber hover:text-noir-text transition-all duration-300"
          >
            View Case Archive
          </button>
        </motion.div>
      </div>
    </div>
  );
}
