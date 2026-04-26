export interface Clue {
  id: string;
  title: string;
  description: string;
  fileId: string;
  discovered: boolean;
  critical: boolean;
}

export const ALL_CLUES: Clue[] = [
  {
    id: "clue_seed_phrase",
    title: "Seed Phrase in Code",
    description:
      'Voss left his wallet seed phrase in a code comment in victim_profile.js. The comment even says "REMOVE BEFORE COMMIT" — but he never did.',
    fileId: "victim_profile",
    discovered: false,
    critical: true,
  },
  {
    id: "clue_wallet_address",
    title: "Cold Wallet Address",
    description:
      "The wallet address 1A2B3C...6P was exposed in victim_profile.js alongside the seed phrase.",
    fileId: "victim_profile",
    discovered: false,
    critical: false,
  },
  {
    id: "clue_crane_motive",
    title: "Crane's Motive",
    description:
      "Victoria Crane had everything to lose from Voss's Q4 audit. Her status is 'CLEARED_PENDING_REVIEW' — and her financialNote reveals a $340K offshore transfer.",
    fileId: "suspects",
    discovered: false,
    critical: true,
  },
  {
    id: "clue_delgado_alias",
    title: "Delgado's IP Match",
    description:
      "Marco 'Ghost' Delgado's IP 185.220.101.47 appears in both the GitHub login alert and the suspects file. But it's a Tor exit node — not unique to him.",
    fileId: "suspects",
    discovered: false,
    critical: false,
  },
  {
    id: "clue_crane_email",
    title: "The 10 PM Meeting",
    description:
      "Crane emailed Voss demanding a private meeting at the office at 10 PM — the same night he died. 'Don't make this more complicated than it needs to be.'",
    fileId: "emails",
    discovered: false,
    critical: true,
  },
  {
    id: "clue_meeting_time",
    title: "GitHub Login Alert",
    description:
      "Voss received a GitHub security alert at 10:53 PM from IP 185.220.101.47 (Frankfurt, Germany). His repo was accessed from an unknown device.",
    fileId: "emails",
    discovered: false,
    critical: false,
  },
  {
    id: "clue_btc_flow",
    title: "BTC Sweep Pattern",
    description:
      "The 50 BTC was swept in a single transaction — a full-balance sweep. This indicates use of an automated wallet-sweep tool, not a manual transfer.",
    fileId: "transactions",
    discovered: false,
    critical: false,
  },
  {
    id: "clue_mixer",
    title: "ChainBlind Mixer",
    description:
      "The funds passed through ChainBlind_v3, an OFAC-sanctioned coinjoin mixer. Attempting to hide the trail — but chain analysis firms can often de-anonymize such flows.",
    fileId: "transactions",
    discovered: false,
    critical: false,
  },
  {
    id: "clue_frozen_account",
    title: "Frozen CVX Account",
    description:
      "The output wallet is registered on CryptoVault Exchange and was FROZEN. The email domain fragment 'vcrane' matches Victoria Crane's known email domain.",
    fileId: "transactions",
    discovered: false,
    critical: true,
  },
  {
    id: "clue_camera_offline",
    title: "Cameras Went Dark",
    description:
      "The stairwell (floor 12) and floor 9 corridor cameras both went offline at 22:31 — same window. A maintenance work order was created just 2 minutes before the outage.",
    fileId: "camera_log",
    discovered: false,
    critical: true,
  },
  {
    id: "clue_gait_match",
    title: "94.3% Gait Match",
    description:
      "Lobby footage at 23:02 shows an unknown person entering without a badge swipe. Gait analysis gives a 94.3% match to Victoria Crane. She exits 11 seconds before the BTC transaction.",
    fileId: "camera_log",
    discovered: false,
    critical: true,
  },
  {
    id: "clue_meridian_transfer",
    title: "Meridian Shell Company",
    description:
      "Voss's encrypted audit fragment reveals a $2.4M transfer to Meridian Capital Partners — a shell company created 6 weeks before receiving the money. Authorized by Crane alone.",
    fileId: "audit_fragment",
    discovered: false,
    critical: true,
  },
];
