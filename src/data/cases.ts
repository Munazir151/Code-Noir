// ─── Shared types ──────────────────────────────────────────────────────────────

export interface CaseFileData {
  id: string;
  name: string;
  path: string;
  language: string;
  icon: string;
  content: string;
  narration: string;
  clues: string[];
  isLocked?: boolean;
  unlockedBy?: string;
  suspiciousPatterns?: Array<string | { pattern: string; reason: string }>;
}

export interface ClueData {
  id: string;
  title: string;
  description: string;
  fileId: string;
  discovered: boolean;
  critical: boolean;
}

export interface TreeNode {
  id: string;
  name: string;
  type: "file" | "folder" | "directory";
  icon?: string;
  lockedBy?: string;
  children?: TreeNode[];
}

export interface SuspectProfile {
  id: string;
  name: string;
  role: string;
  emoji: string;
  terminalOutput: {
    evidence: string[];
    verdict: "GUILTY" | "WRONG SUSPECT" | "ALIBI CONFIRMED";
    message: string;
  };
  verdictScreen: {
    type: "guilty" | "wrong" | "cleared";
    message: string;
  };
}

export interface CaseHint {
  isDone:
    | boolean
    | ((openedFiles: Set<string>, clues: Set<string>) => boolean);
  text: string;
  action?: { label: string; fileId: string };
}

export interface FullCase {
  id: string;
  caseNumber: string;
  title: string;
  difficulty: "tutorial" | "easy" | "medium" | "hard";
  isLocked: boolean;
  tagline: string;
  victim: string;
  description: string;
  // Intro screen text
  introTitle: string;
  introBody1: string;
  introBody2: string;
  // Game data
  suspects: SuspectProfile[];
  correctSuspectId: string;
  files: CaseFileData[];
  clues: ClueData[];
  fileTree: TreeNode[] | TreeNode;
  hints: CaseHint[];
  forensicData: {
    dnaMatch: string;
    fingerprintMatch: string;
    terminalSecrets: string[];
    phonePin: string;
    btcTarget: string;
    voiceTargets: Array<{ name: string; stress: number; status: string }>;
    ipTarget: string;
  };
  boardConfig?: {
    layout: Record<string, { x: number; y: number; rotate: number }>;
    connectors: Array<[string, string]>;
  };
}

// ─── Registry ──────────────────────────────────────────────────────────────────

import { CASE_0001 } from "./case0001";
import { CASE_0002 } from "./case0002";
import { CASE_0003 } from "./case0003";
import { CASE_0004 } from "./case0004";
import { CASE_0005 } from "./case0005";
import { CASE_0006 } from "./case0006";
import { CASE_0007 } from "./case0007";
import { CASE_0008 } from "./case0008";
import { CASE_0009 } from "./case0009";
import { CASE_0010 } from "./case0010";
import { CASE_0011 } from "./case0011";
import { CASE_0012 } from "./case0012";
import { CASE_0047 } from "./case0047";

export const ALL_CASES: FullCase[] = [
  CASE_0001,
  CASE_0002,
  CASE_0003,
  CASE_0004,
  CASE_0005,
  CASE_0006,
  CASE_0007,
  CASE_0008,
  CASE_0009,
  CASE_0010,
  CASE_0011,
  CASE_0012,
  CASE_0047,
  // Locked cases — coming soon
  {
    id: "0051",
    caseNumber: "CASE_0051",
    title: "Phantom Commit",
    difficulty: "hard",
    isLocked: true,
    tagline:
      "A commit from a user that doesn't exist. A backdoor in production. Three million records exposed.",
    victim: "Nexus Systems LLC",
    description:
      "Someone planted code in the codebase using a ghost account. The commit author has never logged in. The backdoor has been live for 47 days. Find the insider.",
    introTitle: "PHANTOM COMMIT",
    introBody1: "The commit author doesn't exist.",
    introBody2: "But the code is real. And it's been running for 47 days.",
    suspects: [],
    correctSuspectId: "",
    files: [],
    clues: [],
    fileTree: [],
    hints: [],
    forensicData: {
      dnaMatch: "MATCH FOUND: UNKNOWN_AUTHOR",
      fingerprintMatch: "GHOST_USER",
      terminalSecrets: ["phantom_login"],
      phonePin: "0000",
      btcTarget: "0x0000000000000000",
      voiceTargets: [],
      ipTarget: "127.0.0.1"
    }
  },
  {
    id: "0058",
    caseNumber: "CASE_0058",
    title: "Zero Day",
    difficulty: "hard",
    isLocked: true,
    tagline:
      "A zero-day exploit sold on the dark web. The source came from inside. Find the leak before they do it again.",
    victim: "CipherVault Inc.",
    description:
      "A critical vulnerability was sold to threat actors before it could be patched. The source code leaked from inside the security team. Someone sold out.",
    introTitle: "ZERO DAY",
    introBody1: "The exploit was sold before it was found.",
    introBody2: "The seller is still inside the company.",
    suspects: [],
    correctSuspectId: "",
    files: [],
    clues: [],
    fileTree: [],
    hints: [],
    forensicData: {
      dnaMatch: "MATCH FOUND: LEAK_SOURCE",
      fingerprintMatch: "ZERO_DAY",
      terminalSecrets: ["exploit_vault"],
      phonePin: "9999",
      btcTarget: "0x0000000000000000",
      voiceTargets: [],
      ipTarget: "127.0.0.1"
    }
  },
];
