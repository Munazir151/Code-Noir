"use client";

import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { ALL_CASES } from "@/data/cases";
import { Play, Share2, StopCircle } from "lucide-react";
import { speakSequence, stopSpeaking } from "@/lib/elevenlabs";

interface RankingItem {
  id: string;
  confidence: number;
}

function redactSensitive(text: string): string {
  return text
    .replace(/\b(?:AKIA|ASIA)[A-Z0-9]{12,}\b/g, "[REDACTED_ACCESS_KEY]")
    .replace(/\bsk_(?:live|test)_[A-Za-z0-9]{12,}\b/g, "[REDACTED_API_KEY]")
    .replace(/\b(?:[13][a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[a-z0-9]{20,})\b/g, "[REDACTED_WALLET]")
    .replace(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g, "[REDACTED_IP]");
}

function parseRanking(raw: string | null): RankingItem[] {
  if (!raw) return [];

  return raw
    .split(",")
    .map((entry) => {
      const [id, confidence] = entry.split(":");
      const parsed = Number.parseInt(confidence ?? "0", 10);
      if (!id || Number.isNaN(parsed)) return null;
      return { id, confidence: parsed };
    })
    .filter((entry): entry is RankingItem => entry !== null)
    .sort((a, b) => b.confidence - a.confidence);
}

export default function CaseBriefPage() {
  const params = useParams<{ caseId: string }>();
  const searchParams = useSearchParams();
  const [playing, setPlaying] = useState(false);

  const caseData = useMemo(
    () => ALL_CASES.find((item) => item.id === params.caseId),
    [params.caseId],
  );

  const topClueIds = searchParams.get("clues")?.split(",").filter(Boolean) ?? [];
  const ranking = parseRanking(searchParams.get("ranking"));
  const safeMode = searchParams.get("safe") !== "0";
  const summaryRaw = searchParams.get("summary") ?? "No summary payload provided.";
  const summary = safeMode ? redactSensitive(summaryRaw) : summaryRaw;

  const topClues = useMemo(() => {
    if (!caseData) return [];
    const fromQuery = caseData.clues
      .filter((clue) => topClueIds.includes(clue.id))
      .map((clue) => ({
        ...clue,
        description: safeMode ? redactSensitive(clue.description) : clue.description,
      }));
    if (fromQuery.length > 0) return fromQuery.slice(0, 5);
    return [...caseData.clues]
      .sort((a, b) => Number(b.critical) - Number(a.critical))
      .slice(0, 5)
      .map((clue) => ({
        ...clue,
        description: safeMode ? redactSensitive(clue.description) : clue.description,
      }));
  }, [caseData, topClueIds, safeMode]);

  const rankedSuspects = useMemo(() => {
    if (!caseData) return [];
    if (ranking.length === 0) {
      return caseData.suspects.map((suspect, index) => ({
        id: suspect.id,
        name: suspect.name,
        confidence: Math.max(15, 75 - index * 18),
      }));
    }

    return ranking.map((item) => {
      const suspect = caseData.suspects.find((candidate) => candidate.id === item.id);
      return {
        id: item.id,
        name: suspect?.name ?? item.id,
        confidence: item.confidence,
      };
    });
  }, [caseData, ranking]);

  const handleAudioBrief = async () => {
    if (playing) {
      stopSpeaking();
      setPlaying(false);
      return;
    }

    setPlaying(true);
    const lead = rankedSuspects[0];
    const clueLine = topClues.length > 0
      ? `Primary evidence includes ${topClues.slice(0, 3).map((clue) => clue.title).join(", ")}.`
      : "No clue payload was attached to this brief.";

    const lines = [
      {
        profile: "narrator" as const,
        text: `Case brief loaded for ${caseData?.caseNumber ?? "unknown case"}.`,
      },
      {
        profile: "detective" as const,
        text: summary,
      },
      {
        profile: "witness" as const,
        text: clueLine,
      },
      {
        profile: "suspect" as const,
        text: lead
          ? `${lead.name} is currently ranked at ${lead.confidence} percent confidence.`
          : "No ranked suspect is available.",
      },
      {
        profile: "narrator" as const,
        text: "End of forty-five second investigation brief.",
      },
    ];

    try {
      await speakSequence(lines, 140);
    } finally {
      setPlaying(false);
    }
  };

  if (!caseData) {
    return (
      <main className="min-h-screen bg-[#070b13] text-white flex items-center justify-center px-6">
        <div className="border border-white/20 bg-black/40 p-6 max-w-xl w-full">
          <h1 className="text-xl font-mono text-noir-amber uppercase tracking-wider">Case Brief Unavailable</h1>
          <p className="text-sm font-mono text-white/80 mt-3">No case matched the link payload. Return to the investigation workspace and export again.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b13] text-white px-6 py-8">
      <div className="max-w-4xl mx-auto border border-noir-border bg-[#0e1524] p-6 space-y-6">
        <header className="border-b border-white/10 pb-4">
          <p className="text-xs font-mono text-noir-amber uppercase tracking-[0.24em]">Shareable Case Brief</p>
          <h1 className="text-3xl font-serif text-noir-amber mt-2">{caseData.caseNumber}: {caseData.title}</h1>
          <p className="text-sm font-mono text-white/75 mt-2">{caseData.tagline}</p>
          <p className="text-[10px] font-mono text-white/55 mt-2 uppercase tracking-[0.16em]">
            Mode: {safeMode ? "Public-safe redaction enabled" : "Raw investigative context"}
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-sm font-mono text-noir-amber uppercase tracking-[0.18em]">Narrative Summary</h2>
          <p className="text-sm font-mono text-white/90 leading-relaxed border border-white/10 bg-black/35 p-3">{summary}</p>
          <div className="flex gap-2">
            <button
              onClick={handleAudioBrief}
              className="inline-flex items-center gap-2 border border-noir-amber text-noir-amber hover:bg-noir-amber hover:text-black transition-colors px-3 py-2 text-xs font-mono uppercase tracking-wider"
            >
              {playing ? <StopCircle size={14} /> : <Play size={14} />}
              {playing ? "Stop Audio Brief" : "Play 45s Audio Brief"}
            </button>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.href);
              }}
              className="inline-flex items-center gap-2 border border-white/20 text-white/85 hover:border-noir-amber hover:text-noir-amber transition-colors px-3 py-2 text-xs font-mono uppercase tracking-wider"
            >
              <Share2 size={14} />
              Copy Share Link
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-mono text-noir-amber uppercase tracking-[0.18em] mb-2">Top Clues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topClues.map((clue) => (
              <div key={clue.id} className="border border-white/10 bg-black/35 p-3">
                <p className="text-sm font-mono text-white">{clue.title}</p>
                <p className="text-xs font-mono text-white/70 mt-1">{clue.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-mono text-noir-amber uppercase tracking-[0.18em] mb-2">Suspect Ranking</h2>
          <div className="space-y-2">
            {rankedSuspects.map((suspect) => (
              <div key={suspect.id} className="border border-white/10 bg-black/35 p-3 flex items-center justify-between">
                <p className="text-sm font-mono text-white uppercase tracking-wider">{suspect.name}</p>
                <p className="text-sm font-mono text-noir-amber">{suspect.confidence}%</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
