"use client";

import { useMemo, useState } from "react";
import type { FullCase } from "@/data/cases";
import { AlertTriangle, Play, Share2, Sparkles } from "lucide-react";
import { speakSequence, stopSpeaking } from "@/lib/elevenlabs";
import {
  generateInvestigationReport,
  type EvidencePinInput,
  type SimulatorCriteriaState,
  type SimulatorFinding,
} from "@/lib/investigationEngine";

interface NarrativeEnginePanelProps {
  caseData: FullCase;
  discoveredClues: Set<string>;
  evidencePins: EvidencePinInput[];
  simulatorCriteria: SimulatorCriteriaState;
  simulatorFindings: SimulatorFinding[];
  onShareBrief: (payload: {
    clueIds: string[];
    ranking: Array<{ id: string; confidence: number }>;
    summary: string;
    safeMode: boolean;
  }) => void;
}

export default function NarrativeEnginePanel({
  caseData,
  discoveredClues,
  evidencePins,
  simulatorCriteria,
  simulatorFindings,
  onShareBrief,
}: NarrativeEnginePanelProps) {
  const [playing, setPlaying] = useState(false);
  const [safeMode, setSafeMode] = useState(true);

  const report = useMemo(
    () =>
      generateInvestigationReport(
        caseData,
        discoveredClues,
        evidencePins,
        simulatorCriteria,
        simulatorFindings,
      ),
    [caseData, discoveredClues, evidencePins, simulatorCriteria, simulatorFindings],
  );

  const handlePlay = async () => {
    if (playing) {
      stopSpeaking();
      setPlaying(false);
      return;
    }

    setPlaying(true);
    const narratorProfile = report.confidenceTone === "calm" ? "narrator" : "urgent_narrator";

    try {
      await speakSequence(
        report.dramaScript.map((line) => ({
          profile: line.speaker === "narrator" ? narratorProfile : line.speaker,
          text: line.text,
        })),
      );
    } finally {
      setPlaying(false);
    }
  };

  return (
    <div className="border border-noir-border bg-[#101726] rounded-sm p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-mono text-noir-amber uppercase tracking-[0.2em]">Dynamic Narrative Engine</p>
          <p className="text-[10px] font-mono text-white/70 mt-1">Timeline synthesis from clues, pins, and forensics.</p>
        </div>
        <Sparkles size={14} className="text-noir-amber" />
      </div>

      <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
        {report.timeline.map((event) => (
          <div key={event.id} className="border border-white/10 bg-black/35 p-2 rounded-sm">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] text-noir-amber font-mono uppercase tracking-wider">{event.label}</p>
              <span className="text-[9px] px-1.5 py-0.5 border border-white/20 text-white/70 font-mono uppercase tracking-wider">
                {event.source}
              </span>
            </div>
            <p className="text-[11px] text-white/85 font-mono leading-relaxed mt-1">{event.detail}</p>
          </div>
        ))}
      </div>

      <label className="flex items-center gap-2 text-[10px] font-mono text-white/80 uppercase tracking-[0.16em]">
        <input
          type="checkbox"
          checked={safeMode}
          onChange={(e) => setSafeMode(e.target.checked)}
          className="accent-[#f6d21f]"
        />
        Public-safe brief mode (redacts sensitive-looking strings)
      </label>

      <div className="flex gap-2">
        <button
          onClick={handlePlay}
          className="flex-1 flex items-center justify-center gap-2 border border-noir-amber text-noir-amber hover:bg-noir-amber hover:text-black transition-colors px-2 py-2 text-[10px] font-mono uppercase tracking-wider"
        >
          <Play size={12} />
          {playing ? "Stop Reconstruction" : "Play Reconstruction"}
        </button>
        <button
          onClick={() =>
            onShareBrief({
              clueIds: report.topClues.map((clue) => clue.id),
              ranking: report.suspectRanking.map((suspect) => ({
                id: suspect.id,
                confidence: suspect.confidence,
              })),
              summary: report.finalNarrative,
              safeMode,
            })
          }
          className="flex items-center justify-center gap-2 border border-white/20 text-white/85 hover:border-noir-amber hover:text-noir-amber transition-colors px-2 py-2 text-[10px] font-mono uppercase tracking-wider"
        >
          <Share2 size={12} />
          Export Brief
        </button>
      </div>

      <div className="border border-white/10 bg-black/35 p-2 rounded-sm">
        <p className="text-[10px] text-white/75 font-mono uppercase tracking-[0.16em] mb-1">Narrative Summary</p>
        <p className="text-[11px] text-white/90 font-mono leading-relaxed">{report.finalNarrative}</p>
      </div>

      {report.contradictions.length > 0 && (
        <div className="border border-red-500/30 bg-red-950/20 p-2 rounded-sm space-y-1">
          <div className="flex items-center gap-2 text-red-300">
            <AlertTriangle size={12} />
            <p className="text-[10px] font-mono uppercase tracking-[0.16em]">Contradictions</p>
          </div>
          {report.contradictions.map((item) => (
            <p key={item} className="text-[11px] text-red-100/85 font-mono leading-relaxed">- {item}</p>
          ))}
        </div>
      )}

      <div className="border border-noir-border bg-black/35 p-2 rounded-sm">
        <p className="text-[10px] text-noir-amber font-mono uppercase tracking-[0.16em] mb-2">Explainable Verdict Mode</p>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {report.suspectRanking.map((suspect) => (
            <div key={suspect.id} className="border border-white/10 p-2 rounded-sm bg-[#0b111d]">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-white font-mono uppercase tracking-wider">{suspect.name}</p>
                <p className="text-[11px] text-noir-amber font-mono">{suspect.confidence}%</p>
              </div>
              <p className="text-[10px] text-white/70 font-mono mt-1">For: {suspect.evidenceFor.length > 0 ? suspect.evidenceFor.join(", ") : "No direct matches yet"}</p>
              <p className="text-[10px] text-white/70 font-mono mt-1">Against: {suspect.evidenceAgainst.length > 0 ? suspect.evidenceAgainst.join(", ") : "No contradictory evidence logged"}</p>
              <p className="text-[10px] text-white/70 font-mono mt-1">Missing: {suspect.missingEvidence.length > 0 ? suspect.missingEvidence.join(", ") : "Critical set complete"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
