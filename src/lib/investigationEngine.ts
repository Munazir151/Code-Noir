import type { FullCase } from "@/data/cases";

export interface SimulatorCriteriaState {
  terminal: boolean;
  dna: boolean;
  fingerprints: boolean;
  phone: boolean;
  btc: boolean;
  voice: boolean;
  ip: boolean;
}

export interface EvidencePinInput {
  id: string;
  title: string;
  note: string;
}

export interface SimulatorFinding {
  id: string;
  title: string;
  detail: string;
}

export interface SuspectExplainability {
  id: string;
  name: string;
  confidence: number;
  evidenceFor: string[];
  evidenceAgainst: string[];
  missingEvidence: string[];
}

export interface TimelineCard {
  id: string;
  label: string;
  detail: string;
  type: "clue" | "sim" | "analysis";
  source: "File Clue" | "Board Pin" | "Simulator" | "Inference Engine";
}

export interface DramaLine {
  speaker: "detective" | "suspect" | "witness" | "narrator";
  text: string;
}

export interface InvestigationReport {
  confidenceTone: "calm" | "urgent";
  topClues: Array<{ id: string; title: string; description: string }>;
  contradictions: string[];
  suspectRanking: SuspectExplainability[];
  timeline: TimelineCard[];
  finalNarrative: string;
  dramaScript: DramaLine[];
}

interface CaseWeightProfile {
  convictionThreshold: number;
  contradictionThreshold: number;
  highValueClueWords: string[];
  suspectSignals: Record<string, string[]>;
  simulatorPriority: Array<keyof SimulatorCriteriaState>;
}

interface DramaTemplate {
  narratorCalm: string;
  narratorUrgent: string;
  detective: string;
  witness: string;
  suspect: string;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalize(text: string): string {
  return text.toLowerCase();
}

function suspectKeywords(name: string): string[] {
  const raw = name
    .toLowerCase()
    .split(/\s+/)
    .map((part) => part.replace(/[^a-z0-9]/g, ""))
    .filter((part) => part.length >= 3);
  return Array.from(new Set(raw));
}

function roleRiskWeight(role: string): number {
  const value = normalize(role);
  if (/(cfo|finance|security|devops|sre|platform)/.test(value)) return 7;
  if (/(engineer|developer|architect|analyst)/.test(value)) return 4;
  if (/(intern|assistant|coordinator)/.test(value)) return 2;
  return 3;
}

function verdictSignalWeight(verdict: "GUILTY" | "WRONG SUSPECT" | "ALIBI CONFIRMED"): number {
  if (verdict === "GUILTY") return 14;
  if (verdict === "ALIBI CONFIRMED") return -12;
  return -6;
}

const CASE_WEIGHT_PROFILES: Record<string, CaseWeightProfile> = {
  "0001": {
    convictionThreshold: 66,
    contradictionThreshold: 9,
    highValueClueWords: ["aws", "cloudtrail", "slack", "notification", "home ip"],
    suspectSignals: {
      jordan: ["cloudtrail", "home", "slack", "notification"],
      alex: ["commit", "meeting", "key"],
    },
    simulatorPriority: ["terminal", "ip", "phone"],
  },
  "0002": {
    convictionThreshold: 67,
    contradictionThreshold: 8,
    highValueClueWords: ["database", "2am", "export", "deploy", "password"],
    suspectSignals: {
      sam: ["2am", "home ip", "export"],
    },
    simulatorPriority: ["terminal", "phone", "ip"],
  },
  "0003": {
    convictionThreshold: 68,
    contradictionThreshold: 8,
    highValueClueWords: ["docker", "mount", "ssh", "host", "auth log"],
    suspectSignals: {
      marcus: ["ssh", "residential", "container", "host"],
    },
    simulatorPriority: ["terminal", "fingerprints", "ip"],
  },
  "0004": {
    convictionThreshold: 65,
    contradictionThreshold: 9,
    highValueClueWords: ["api", "sale", "receipt", "download", "logs"],
    suspectSignals: {
      kevin: ["download", "sale", "api access"],
      diana: ["reported", "issue"],
    },
    simulatorPriority: ["btc", "phone", "terminal"],
  },
  "0005": {
    convictionThreshold: 70,
    contradictionThreshold: 8,
    highValueClueWords: ["deletion", "intern", "offer", "admin", "ip match"],
    suspectSignals: {
      jordan: ["deletion", "intern", "offer letter"],
    },
    simulatorPriority: ["terminal", "ip", "phone"],
  },
  "0006": {
    convictionThreshold: 68,
    contradictionThreshold: 8,
    highValueClueWords: ["grace", "offboard", "vpn", "token", "jwt"],
    suspectSignals: {
      ben: ["grace", "vpn", "token", "offboard"],
    },
    simulatorPriority: ["terminal", "ip", "dna"],
  },
  "0007": {
    convictionThreshold: 71,
    contradictionThreshold: 7,
    highValueClueWords: ["force push", "reflog", "shell", "wire", "bank"],
    suspectSignals: {
      maya: ["force push", "reflog", "shell corp", "panic"],
    },
    simulatorPriority: ["terminal", "phone", "voice"],
  },
  "0008": {
    convictionThreshold: 68,
    contradictionThreshold: 8,
    highValueClueWords: ["npm", "publish", "backdoor", "package", "author"],
    suspectSignals: {
      leo: ["author", "publish", "backdoor", "domain"],
    },
    simulatorPriority: ["terminal", "phone", "ip"],
  },
  "0009": {
    convictionThreshold: 69,
    contradictionThreshold: 8,
    highValueClueWords: ["s3", "bucket", "download", "delay", "personal aws"],
    suspectSignals: {
      lisa: ["bucket", "download", "delay", "personal aws"],
    },
    simulatorPriority: ["ip", "terminal", "phone"],
  },
  "0010": {
    convictionThreshold: 67,
    contradictionThreshold: 9,
    highValueClueWords: ["redis", "dark web", "token", "wallet", "unauthenticated"],
    suspectSignals: {
      alex: ["redis", "dark", "token", "wallet"],
    },
    simulatorPriority: ["ip", "btc", "terminal"],
  },
  "0011": {
    convictionThreshold: 70,
    contradictionThreshold: 8,
    highValueClueWords: ["postinstall", "exfil", "rewrite", "blame", "npm"],
    suspectSignals: {
      james: ["exfil", "rewrite", "postinstall", "blame"],
      emma: ["review", "pr"],
    },
    simulatorPriority: ["terminal", "phone", "voice"],
  },
  "0012": {
    convictionThreshold: 72,
    contradictionThreshold: 7,
    highValueClueWords: ["backup", "ransom", "wallet", "mongo", "vacation"],
    suspectSignals: {
      lisa: ["backup", "wallet", "mongo", "vacation"],
    },
    simulatorPriority: ["btc", "ip", "phone"],
  },
  "0047": {
    convictionThreshold: 73,
    contradictionThreshold: 7,
    highValueClueWords: ["seed phrase", "wallet", "meridian", "camera", "victoria"],
    suspectSignals: {
      victoria: ["victoria", "wallet", "seed", "meridian", "camera"],
      marco: ["ghost", "research", "camera"],
      lin: ["cofounder", "email", "transfer"],
    },
    simulatorPriority: ["btc", "voice", "ip", "phone"],
  },
};

const DEFAULT_PROFILE: CaseWeightProfile = {
  convictionThreshold: 68,
  contradictionThreshold: 8,
  highValueClueWords: ["ip", "log", "key", "wallet", "auth"],
  suspectSignals: {},
  simulatorPriority: ["terminal", "ip", "phone"],
};

const CASE_DRAMA_TEMPLATES: Record<string, DramaTemplate> = {
  "0001": {
    narratorCalm: "Cloud logs align with local access traces. The breach path is narrowing.",
    narratorUrgent: "Cloud access patterns fragment under pressure. Containment window is shrinking.",
    detective: "CloudTrail timestamps are in sequence. Notification and home-origin traces are converging.",
    witness: "The key leak looked accidental, but the follow-up behavior felt rehearsed.",
    suspect: "A leaked key proves carelessness, not intent. You're stretching the timeline.",
  },
  "0002": {
    narratorCalm: "Database movement correlates with after-hours authentication.",
    narratorUrgent: "Export telemetry and login windows are colliding without a clean alibi.",
    detective: "The 2AM session and bulk export pattern are linked.",
    witness: "No one should have touched that system during night shift handoff.",
    suspect: "Late-night access isn't a crime by itself, Detective.",
  },
  "0003": {
    narratorCalm: "Container escape indicators are consistent with host key theft.",
    narratorUrgent: "Isolation boundaries collapsed. Privileged access traces are escalating.",
    detective: "The mount path and ssh extraction line up with host compromise.",
    witness: "The container was never meant to touch host secrets.",
    suspect: "You're blaming architecture mistakes on me.",
  },
  "0004": {
    narratorCalm: "API leakage and monetization trails point to deliberate misuse.",
    narratorUrgent: "Credential exposure and sale receipts are diverging from normal incident response.",
    detective: "Leak timing and sale records overlap too tightly to ignore.",
    witness: "Whoever took those keys knew exactly where the logs were.",
    suspect: "Logs can be copied by anyone with access. You're guessing motive.",
  },
  "0005": {
    narratorCalm: "Deletion windows and privilege escalation evidence are now aligned.",
    narratorUrgent: "Mass removal events outpace normal audit recovery channels.",
    detective: "The deletion burst maps to one operator window.",
    witness: "That kind of wipe doesn't happen by accident.",
    suspect: "An admin command isn't proof of sabotage.",
  },
  "0006": {
    narratorCalm: "Offboarding gaps and token persistence explain residual access.",
    narratorUrgent: "Grace-period controls failed under active misuse conditions.",
    detective: "VPN and token evidence indicate intentional reuse of stale access.",
    witness: "He should've lost access weeks before this happened.",
    suspect: "Your process failed, Detective. Don't call that guilt.",
  },
  "0007": {
    narratorCalm: "Rewritten git history still leaks intent through reflog residue.",
    narratorUrgent: "Financial fraud traces persist despite forced branch rewriting.",
    detective: "The reflog recovered what the force-push tried to bury.",
    witness: "Those commits disappeared too quickly to be routine cleanup.",
    suspect: "History rewrites are workflow tools, not confessions.",
  },
  "0008": {
    narratorCalm: "Package metadata and payload behavior indicate intentional poisoning.",
    narratorUrgent: "Supply chain compromise continues propagating through dependency trust.",
    detective: "Publish timing and author identity links are too specific to dismiss.",
    witness: "The package looked familiar on purpose.",
    suspect: "A naming collision isn't proof I planted malware.",
  },
  "0009": {
    narratorCalm: "Bucket exposure and delayed escalation establish negligence with motive.",
    narratorUrgent: "Cloud exposure remained open beyond defensible response thresholds.",
    detective: "Download volume and reporting delay form a direct chain.",
    witness: "The alert fired early, but nobody moved fast.",
    suspect: "Public buckets happen. You're framing operational error.",
  },
  "0010": {
    narratorCalm: "Session token leakage and dark market activity are synchronized.",
    narratorUrgent: "Open redis access accelerated token resale routes.",
    detective: "The wallet trail tracks back to the same discovery window.",
    witness: "By the time it was reported, the tokens were already listed.",
    suspect: "Research doesn't equal theft. Prove intent.",
  },
  "0011": {
    narratorCalm: "Dependency backdoor artifacts and blame diversion attempts are linked.",
    narratorUrgent: "Exfiltration risk remains active while attribution stays contested.",
    detective: "Rewrite attempts and postinstall behavior form one narrative.",
    witness: "The story changed every time logs were questioned.",
    suspect: "You're using circumstantial code patterns as verdict.",
  },
  "0012": {
    narratorCalm: "Backup destruction and ransom splitting indicate planned internal leverage.",
    narratorUrgent: "Recovery channels were pre-disabled before encryption pivot.",
    detective: "Backups vanished before the ransom wallet ever moved.",
    witness: "The outage looked staged from the first hour.",
    suspect: "Coin transfers don't prove who launched the lockout.",
  },
  "0047": {
    narratorCalm: "Wallet flow, camera disruption, and executive motive have converged.",
    narratorUrgent: "The Voss timeline remains volatile; high-value signals are colliding.",
    detective: "Seed phrase leakage and transfer movement define the core trajectory.",
    witness: "Everything changed after that meeting request hit the inbox.",
    suspect: "You built a story from noise, Detective.",
  },
};

const DEFAULT_DRAMA_TEMPLATE: DramaTemplate = {
  narratorCalm: "Nightfall Division reconstruction online. Evidence graph stabilized.",
  narratorUrgent: "Alert. Reconstruction unstable. Contradictions expanding across the evidence graph.",
  detective: "Timeline assembled. Forensic systems returned actionable outputs.",
  witness: "I do not have enough evidence yet to make a direct statement.",
  suspect: "You are making assumptions, Detective.",
};

export function generateInvestigationReport(
  caseData: FullCase,
  discoveredClues: Set<string>,
  evidencePins: EvidencePinInput[],
  simulatorCriteria: SimulatorCriteriaState,
  simulatorFindings: SimulatorFinding[]
): InvestigationReport {
  const profile = CASE_WEIGHT_PROFILES[caseData.id] ?? DEFAULT_PROFILE;
  const discovered = caseData.clues.filter((clue) => discoveredClues.has(clue.id));
  const missingCritical = caseData.clues.filter((clue) => clue.critical && !discoveredClues.has(clue.id));
  const completedSimulators = Object.values(simulatorCriteria).filter(Boolean).length;

  const topClues = [...discovered]
    .sort((a, b) => Number(b.critical) - Number(a.critical))
    .slice(0, 5)
    .map((clue) => ({ id: clue.id, title: clue.title, description: clue.description }));

  const pinEvidence = evidencePins.map((pin) => ({
    id: pin.id,
    title: pin.title,
    description: pin.note,
  }));

  const textEvidence = [...topClues, ...pinEvidence, ...simulatorFindings.map((finding) => ({
    id: finding.id,
    title: finding.title,
    description: finding.detail,
  }))];

  const ranking = caseData.suspects.map((suspect) => {
    const keywords = suspectKeywords(suspect.name);
    const evidenceFor: string[] = [];
    const evidenceAgainst: string[] = [];

    let score = 16 + roleRiskWeight(suspect.role);
    score += verdictSignalWeight(suspect.terminalOutput.verdict);

    const suspectSignals = profile.suspectSignals[suspect.id] ?? [];

    for (const evidence of textEvidence) {
      const haystack = normalize(`${evidence.title} ${evidence.description}`);
      const mentionsSelf = keywords.some((keyword) => haystack.includes(keyword));
      const hitsCaseSignal = suspectSignals.some((signal) => haystack.includes(normalize(signal)));
      const hitsHighValue = profile.highValueClueWords.some((word) => haystack.includes(normalize(word)));

      const mentionsOthers = caseData.suspects
        .filter((candidate) => candidate.id !== suspect.id)
        .some((candidate) =>
          suspectKeywords(candidate.name).some((keyword) => haystack.includes(keyword))
        );

      if (mentionsSelf) {
        evidenceFor.push(evidence.title);
        score += 11;
        if (hitsHighValue) score += 4;
      } else if (mentionsOthers) {
        evidenceAgainst.push(evidence.title);
        score -= 6;
      }

      if (hitsCaseSignal) {
        evidenceFor.push(`Signal match: ${evidence.title}`);
        score += 9;
      }
    }

    for (const termEvidence of suspect.terminalOutput.evidence) {
      const evidenceText = normalize(termEvidence);
      const hasSupport = textEvidence.some((item) => {
        const haystack = normalize(`${item.title} ${item.description}`);
        return evidenceText.split(/\s+/).some((token) => token.length >= 4 && haystack.includes(token));
      });

      if (hasSupport) {
        evidenceFor.push(`Terminal: ${termEvidence}`);
        score += 8;
      } else {
        evidenceAgainst.push(`Terminal mismatch: ${termEvidence}`);
        score -= 4;
      }
    }

    const simulatorMentions = simulatorFindings.filter((finding) => {
      const haystack = normalize(`${finding.title} ${finding.detail}`);
      return keywords.some((keyword) => haystack.includes(keyword));
    }).length;

    if (simulatorMentions > 0) {
      score += simulatorMentions * 6;
    } else if (completedSimulators >= 5) {
      score -= 5;
    }

    const priorityCompleted = profile.simulatorPriority.filter((key) => simulatorCriteria[key]).length;
    score += priorityCompleted * 3;
    if (priorityCompleted === 0 && completedSimulators >= 3) {
      score -= 4;
    }

    const missingEvidence = missingCritical.slice(0, 3).map((clue) => clue.title);

    score += completedSimulators * 2;
    score -= missingCritical.length * 5;

    const confidence = clamp(score, 5, 98);

    return {
      id: suspect.id,
      name: suspect.name,
      confidence,
      evidenceFor: Array.from(new Set(evidenceFor)).slice(0, 5),
      evidenceAgainst: Array.from(new Set(evidenceAgainst)).slice(0, 5),
      missingEvidence,
    } satisfies SuspectExplainability;
  });

  ranking.sort((a, b) => b.confidence - a.confidence);

  if (ranking.length > 1) {
    const leadDelta = ranking[0].confidence - ranking[1].confidence;
    if (leadDelta >= 10) {
      ranking[0].confidence = clamp(ranking[0].confidence + 3, 5, 98);
    } else if (leadDelta <= 4) {
      ranking[0].confidence = clamp(ranking[0].confidence - 4, 5, 98);
    }
  }

  const contradictions: string[] = [];
  if (ranking.length > 1 && Math.abs(ranking[0].confidence - ranking[1].confidence) < profile.contradictionThreshold) {
    contradictions.push("Top two suspects remain too close in confidence.");
  }
  if (missingCritical.length > 0) {
    contradictions.push(`${missingCritical.length} critical clues are still missing from the board.`);
  }
  if (completedSimulators < 4) {
    contradictions.push("Too few forensic simulators are complete for a clean conviction path.");
  }
  if ((ranking[0]?.confidence ?? 0) < profile.convictionThreshold) {
    contradictions.push("Confidence remains below conviction threshold. Additional corroboration recommended.");
  }

  const timeline: TimelineCard[] = [
    ...topClues.slice(0, 3).map((clue) => ({
      id: `clue-${clue.id}`,
      label: clue.title,
      detail: clue.description,
      type: "clue" as const,
      source: "File Clue" as const,
    })),
    ...pinEvidence.slice(0, 2).map((pin) => ({
      id: `pin-${pin.id}`,
      label: pin.title,
      detail: pin.description,
      type: "clue" as const,
      source: "Board Pin" as const,
    })),
    ...simulatorFindings.slice(0, 3).map((finding) => ({
      id: `sim-${finding.id}`,
      label: finding.title,
      detail: finding.detail,
      type: "sim" as const,
      source: "Simulator" as const,
    })),
    {
      id: "analysis-final",
      label: "Verdict Projection",
      detail: `${ranking[0]?.name ?? "Unknown"} leads at ${ranking[0]?.confidence ?? 0}% confidence.`,
      type: "analysis",
      source: "Inference Engine",
    },
  ];

  const confidenceTone = ranking[0]?.confidence >= 72 ? "calm" : "urgent";

  const finalNarrative = [
    `Case ${caseData.caseNumber} reconstruction complete.`,
    `Primary suspect trajectory points to ${ranking[0]?.name ?? "Unknown"} with ${ranking[0]?.confidence ?? 0}% confidence.`,
    contradictions.length > 0
      ? `Contradictions detected: ${contradictions.join(" ")}`
      : "No direct contradictions detected in current evidence flow.",
    `Evidence timeline includes ${topClues.length} priority clues and ${completedSimulators} completed forensic systems.`,
  ].join(" ");

  const witnessLine = topClues[0]
    ? `I saw the pattern shift when ${topClues[0].title.toLowerCase()} came into view.`
    : "I do not have enough evidence yet to make a direct statement.";

  const suspectLine = ranking[0]
    ? `You are making assumptions, Detective. ${ranking[0].confidence}% is not certainty.`
    : "You have nothing on me.";

  const template = CASE_DRAMA_TEMPLATES[caseData.id] ?? DEFAULT_DRAMA_TEMPLATE;

  const dramaScript: DramaLine[] = [
    {
      speaker: "narrator",
      text:
        confidenceTone === "calm"
          ? template.narratorCalm
          : template.narratorUrgent,
    },
    {
      speaker: "detective",
      text: `${template.detective} ${completedSimulators} forensic systems returned actionable outputs.`,
    },
    {
      speaker: "witness",
      text: witnessLine === "I do not have enough evidence yet to make a direct statement." ? template.witness : witnessLine,
    },
    {
      speaker: "suspect",
      text: suspectLine === "You have nothing on me." ? template.suspect : suspectLine,
    },
    {
      speaker: "narrator",
      text: `Projection: ${ranking[0]?.name ?? "Unknown"} remains the lead suspect at ${ranking[0]?.confidence ?? 0}% confidence.`,
    },
  ];

  return {
    confidenceTone,
    topClues,
    contradictions,
    suspectRanking: ranking,
    timeline,
    finalNarrative,
    dramaScript,
  };
}
