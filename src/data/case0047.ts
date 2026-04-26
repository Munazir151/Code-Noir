import type { FullCase } from "./cases";
import { CASE_FILES, FILE_TREE as RAW_TREE } from "./caseFiles";
import { ALL_CLUES } from "./clues";
import type { TreeNode } from "./cases";

// Convert existing FILE_TREE to the new TreeNode format (adding icon/lockedBy)
const fileTree: TreeNode[] = [
  {
    id: "root",
    name: "CASE_0047",
    type: "folder",
    children: [
      { id: "readme",         name: "README.md",                      type: "file", icon: "📄" },
      { id: "victim_profile", name: "victim_profile.js",              type: "file", icon: "👤" },
      { id: "suspects",       name: "suspects.json",                   type: "file", icon: "🎯" },
      {
        id: "evidence", name: "evidence", type: "folder",
        children: [
          { id: "emails",         name: "emails.txt",                     type: "file", icon: "📧" },
          { id: "transactions",   name: "transactions.py",                 type: "file", icon: "⛓️" },
          { id: "camera_log",     name: "camera_log.rs",                  type: "file", icon: "📹" },
          { id: "audit_fragment", name: "internal_audit_fragment.enc",    type: "file", icon: "🔒", lockedBy: "clue_crane_email" },
        ],
      },
      { id: "solve", name: "SOLVE.sh", type: "file", icon: "⚡" },
    ],
  },
];

export const CASE_0047: FullCase = {
  id: "0047",
  caseNumber: "CASE_0047",
  title: "The Voss Incident",
  difficulty: "medium",
  isLocked: false,
  tagline: "Raymond Voss. Dead at 34. Fifty bitcoin drained fourteen minutes after his last heartbeat.",
  victim: "Raymond Voss — 50 BTC stolen",
  description: "A blockchain developer is found dead. 50 BTC vanishes from his cold wallet 14 minutes later. The seed phrase was in a code comment. Three suspects. One killer.",
  introTitle: "THE VOSS INCIDENT",
  introBody1: "Raymond Voss. Dead at 34. Fifty bitcoin gone in fourteen minutes.",
  introBody2: "The killer didn't break in. The seed phrase was in the code.",

  suspects: [
    {
      id: "crane",
      name: "Victoria Crane",
      role: "CFO, NightOwl Capital",
      emoji: "💼",
      terminalOutput: {
        evidence: [
          "✓ Demanded Voss delay the audit. Set a private meeting for 10 PM.",
          "✓ $340K offshore transfer 72h before Voss died.",
          "✓ Badge exit at 22:31. Re-entered at 23:02 (gait match: 94.3%).",
          "✓ Stairwell + Floor 9 cameras offline during re-entry window.",
          "✓ Frozen CVX account domain fragment: 'vcrane'.",
          "✓ Exited lobby 11 seconds before 50 BTC transaction.",
        ],
        verdict: "GUILTY",
        message: "Victoria Crane orchestrated the theft and silenced Raymond Voss to prevent her $2.4M embezzlement from being exposed. The seed phrase was her key. Voss's carelessness was her door.",
      },
      verdictScreen: {
        type: "guilty",
        message: "Victoria Crane orchestrated the theft and silenced Raymond Voss to prevent her $2.4M embezzlement from being exposed. She used Delgado's Tor IP as a false flag, disabled the security cameras, and fled with 50 BTC through a mixer — all while being caught on camera via gait analysis. The frozen CVX account bearing her domain fragment sealed her fate.",
      },
    },
    {
      id: "ghost",
      name: "Marco 'Ghost' Delgado",
      role: "Security Researcher",
      emoji: "👻",
      terminalOutput: {
        evidence: [
          "✗ Tor exit node IP — not unique to Delgado.",
          "✗ No repository access — couldn't have seen the seed phrase.",
          "✗ Twitch stream provides partial alibi.",
          "✗ Email domain 'vcrane' does not match Delgado.",
        ],
        verdict: "WRONG SUSPECT",
        message: "Delgado was a red herring. His Tor activity drew attention, but the camera footage, email chain, and frozen account all point elsewhere. Look again.",
      },
      verdictScreen: {
        type: "wrong",
        message: "Delgado was a red herring. His Tor exit node appeared in the logs, but IP 185.220.101.47 is not unique to him. No repo access, no physical evidence, and a Twitch stream alibi. The email domain 'vcrane' doesn't match him. Look again.",
      },
    },
    {
      id: "zhao",
      name: "Lin Zhao",
      role: "Co-founder, NightOwl Capital",
      emoji: "✈️",
      terminalOutput: {
        evidence: [
          "✗ Airborne during the entire incident window.",
          "✗ Passport and airline records confirmed.",
          "✗ No financial motive — stood to lose more than anyone.",
          "✗ She was the one who warned Voss. She called 911.",
        ],
        verdict: "ALIBI CONFIRMED",
        message: "Lin Zhao is not your killer. She tried to warn Voss. She was 35,000 feet in the air when it happened.",
      },
      verdictScreen: {
        type: "cleared",
        message: "Lin Zhao was airborne during the entire incident window. Passport scans and airline records confirm it. She had no financial motive — she stood to lose more than anyone. She tried to warn Voss. She called 911. She is not your killer.",
      },
    },
  ],

  correctSuspectId: "crane",

  files: CASE_FILES as any,
  clues: ALL_CLUES as any,
  fileTree,

  hints: [
    {
      isDone: (f) => f.has("readme"),
      text: "Start with README.md to get a case overview.",
      action: { label: "Open README.md", fileId: "readme" },
    },
    {
      isDone: (f) => f.has("victim_profile"),
      text: "Open victim_profile.js — examine the victim's developer profile carefully.",
      action: { label: "Open victim_profile.js", fileId: "victim_profile" },
    },
    {
      isDone: (_, c) => c.has("clue_seed_phrase"),
      text: "Look at the comments in victim_profile.js. Something that should have been deleted... wasn't.",
    },
    {
      isDone: (f) => f.has("suspects"),
      text: "You found the attack vector. Open suspects.json — three people had access or motive.",
      action: { label: "Open suspects.json", fileId: "suspects" },
    },
    {
      isDone: (f) => f.has("emails"),
      text: "Open emails.txt in the evidence folder — digital trails don't lie.",
      action: { label: "Open emails.txt", fileId: "emails" },
    },
    {
      isDone: (_, c) => c.has("clue_crane_email"),
      text: "Read every email carefully. One reveals a private meeting — the night of the murder.",
    },
    {
      isDone: (f) => f.has("transactions"),
      text: "Follow the money. Open transactions.py and trace where the 50 BTC went.",
      action: { label: "Open transactions.py", fileId: "transactions" },
    },
    {
      isDone: (f) => f.has("camera_log"),
      text: "The cameras saw something. Open camera_log.rs — or did they?",
      action: { label: "Open camera_log.rs", fileId: "camera_log" },
    },
    {
      isDone: (f) => f.has("audit_fragment"),
      text: "A locked file just unlocked — internal_audit_fragment.enc. It's what Voss was protecting.",
      action: { label: "Open audit_fragment.enc", fileId: "audit_fragment" },
    },
    {
      isDone: (_, c) => c.size >= 7,
      text: "Keep reviewing the evidence. Check the Evidence Board — you're still missing critical clues.",
    },
    {
      isDone: () => false,
      text: "You have enough evidence. Open SOLVE.sh and file your accusation.",
      action: { label: "Open SOLVE.sh", fileId: "solve" },
    },
  ],
  forensicData: {
    dnaMatch: "MATCH FOUND: VICTORIA_VOSS_GENOTYPE (99.9%)",
    fingerprintMatch: "CRANE_V_S7",
    terminalSecrets: ["xray_vision", "bypass_admin", "victoria_decrypt"],
    phonePin: "4407",
    btcTarget: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    voiceTargets: [
        { name: "Victoria", stress: 78, status: "DECEPTION_LIKELY" },
        { name: "Ghost", stress: 61, status: "UNSTABLE" },
        { name: "Lin", stress: 12, status: "STABLE" },
    ],
    ipTarget: "185.107.12.8"
  },
  boardConfig: {
    layout: {
      voss_photo: { x: 50, y: 50, rotate: -2 },
      last_commit: { x: 150, y: 250, rotate: 2 },
      seed_phrase: { x: 400, y: 80, rotate: 1 },
      btc_wallet: { x: 700, y: 120, rotate: -1.5 },
      victoria: { x: 540, y: 380, rotate: 0 },
      email_threat: { x: 750, y: 550, rotate: 1.5 },
      camera_feed: { x: 100, y: 550, rotate: -1 },
    },
    connectors: [
      ["voss_photo", "seed_phrase"],
      ["voss_photo", "last_commit"],
      ["last_commit", "victoria"],
      ["seed_phrase", "victoria"],
      ["btc_wallet", "victoria"],
      ["email_threat", "victoria"],
      ["camera_feed", "victoria"],
    ],
  }
};
