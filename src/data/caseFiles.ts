export interface CaseFile {
  id: string;
  name: string;
  path: string;
  language: string;
  icon: string;
  content: string;
  narration: string; // spoken text when file is first opened
  clues: string[]; // list of clue IDs embedded in this file
  isLocked?: boolean;
  unlockedBy?: string; // clue ID that unlocks this file
  suspiciousPatterns?: string[]; // text snippets to highlight amber as suspicious
}

export const CASE_FILES: CaseFile[] = [
  {
    id: "readme",
    name: "README.md",
    path: "CASE_0047/README.md",
    language: "markdown",
    icon: "📄",
    clues: [],
    narration:
      "A cold case file drops onto my desk. Raymond Voss. Blockchain developer. Found dead in his home office, March 14th, 2024. Fifty bitcoin drained fourteen minutes after his last heartbeat. Someone knew exactly where to look.",
    content: `# CASE_0047 — The Voss Incident

**Status:** ACTIVE
**Lead Detective:** [ASSIGNED TO YOU]
**Date Opened:** 2024-03-14
**Classification:** Homicide / Crypto Asset Theft

---

## VICTIM

**Name:** Raymond Voss
**Age:** 34
**Occupation:** Senior Blockchain Developer, NightOwl Capital
**Found:** Home office, 11:47 PM
**Cause of Death:** [PENDING AUTOPSY — CLASSIFIED]

---

## INCIDENT SUMMARY

At approximately 11:47 PM on March 14th, Raymond Voss was found unresponsive
at his desk. His workstation was still logged in. His terminal was open.

At **11:33 PM** — fourteen minutes before discovery — a transaction was broadcast
from a cold wallet registered to Voss. **50 BTC** moved in a single sweep.

The seed phrase that controlled that wallet was found in a code comment.
It was sitting there. In plain sight. Waiting for someone who knew where to look.

---

## ACTIVE SUSPECTS

1. **Victoria Crane** — CFO, NightOwl Capital
2. **Marco "Ghost" Delgado** — Independent security researcher
3. **Lin Zhao** — Co-founder, NightOwl Capital

---

## CASE FILES

Navigate the file tree to examine the evidence.
Every file contains a piece of the truth.
Some files are locked — find the clues to open them.

> *"The killer didn't need to break in. They had the key.
>  They always do."*

---

\`\`\`
DETECTIVE NOTES: Start with victim_profile.js
\`\`\`
`,
    suspiciousPatterns: [],
  },
  {
    id: "victim_profile",
    name: "victim_profile.js",
    path: "CASE_0047/victim_profile.js",
    language: "javascript",
    icon: "👤",
    clues: ["clue_seed_phrase", "clue_wallet_address"],
    narration:
      "Raymond Voss. I pull up his profile. Meticulous man. The kind who comments every line of code. That habit... it's what got him killed.",
    content: `/**
 * NIGHTOWL CAPITAL — DEVELOPER PROFILE
 * Employee: Raymond Voss (ID: NW-0091)
 * Role: Senior Blockchain Developer
 * Security Clearance: LEVEL 3
 * Last Active: 2024-03-14T23:19:44Z
 *
 * === DETECTIVE NOTE ===
 * This file was recovered from Voss's personal workstation.
 * Git blame shows it was last modified 4 hours before his death.
 */

const employeeProfile = {
  id: "NW-0091",
  name: "Raymond Voss",
  email: "r.voss@nightowlcapital.io",
  role: "Senior Blockchain Developer",
  startDate: "2021-06-01",

  // Cold wallet for company treasury — DO NOT SHARE
  // TODO: move this to .env before pushing!!!
  walletAddress: "1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P",

  // SEED PHRASE — REMOVE BEFORE COMMIT
  // abandon ability able about above absent absorb abstract absurd abuse
  // access accident account accuse achieve acid acoustic acquire
  seedPhrase: "abandon ability able about above absent absorb abstract accuse achieve",

  // Emergency local override PIN (Locked to Maya's ID)
  // TODO: Rotate this. 4407 has been the same since 2021.
  localMasterPin: "4407",

  repositories: [
    "nightowl-treasury-v2",
    "tx-monitor-daemon",
    "wallet-utils",
    "internal-audit-2024"  // ← restricted access
  ],

  recentCommits: [
    {
      hash: "a3f8c91",
      message: "fix: corrected fee calculation in sweep function",
      timestamp: "2024-03-14T19:23:11Z",
      repo: "nightowl-treasury-v2"
    },
    {
      hash: "b7d2e44",
      message: "WIP: audit trail logging — NOT FINISHED",
      timestamp: "2024-03-14T21:07:55Z",
      repo: "internal-audit-2024"
    },
    {
      hash: "c9a1f02",
      message: "temp: hardcoded seed for local testing — REMOVE",
      timestamp: "2024-03-14T22:51:03Z",
      repo: "wallet-utils"   // ← last commit before death
    }
  ]
};

// Access log shows three unique IPs accessed this repo today.
// Voss's home IP: 192.168.1.1
// NightOwl office IP: 203.45.67.89
// Unknown IP: 185.220.101.47  ← flagged by security team

module.exports = employeeProfile;
`,
    suspiciousPatterns: [
      "TODO: move this to .env",
      "SEED PHRASE — REMOVE BEFORE COMMIT",
      "seedPhrase:",
      "185.220.101.47",
      "REMOVE BEFORE COMMIT",
      "c9a1f02",
      "4407",
    ],
  },
  {
    id: "suspects",
    name: "suspects.json",
    path: "CASE_0047/suspects.json",
    language: "json",
    icon: "🎯",
    clues: ["clue_crane_motive", "clue_delgado_alias"],
    narration:
      "Three suspects. Each one had something to gain. Each one had a reason to be in the shadows that night. Let's see who they really are.",
    content: `{
  "case": "CASE_0047",
  "suspects": [
    {
      "id": "suspect_crane",
      "name": "Victoria Crane",
      "alias": null,
      "role": "CFO, NightOwl Capital",
      "age": 41,
      "status": "CLEARED_PENDING_REVIEW",
      "motive": "HIGH",
      "opportunity": "MEDIUM",
      "means": "LOW",

      "background": "Harvard MBA. Joined NightOwl 2019. Oversaw two failed fund allocations in Q4 2023. Board was planning an audit of her decisions. Voss was the one running the numbers.",

      "financialNote": "Personal account shows a $340,000 transfer to an offshore entity 72 hours before Voss died. Source: internal audit fragment found in Voss's encrypted folder.",

      "alibi": {
        "claimed": "Working late at the office, left at 11:15 PM",
        "corroborated": false,
        "notes": "Badge log confirms exit at 22:47. Stairwell camera (floor 12) went offline at 22:31 — 'scheduled maintenance'. Gait analysis on lobby footage shows her re-entering at 23:02."
      },

      "knownAssociates": ["suspect_delgado"],
      "digitalFootprint": {
        "repoAccess": false,
        "ipMatch": false,
        "emailDomain": "vcrane-consulting.io"
      }
    },
    {
      "id": "suspect_delgado",
      "name": "Marco Delgado",
      "alias": "Ghost",
      "role": "Independent Security Researcher",
      "age": 29,
      "status": "PERSON_OF_INTEREST",
      "motive": "MEDIUM",
      "opportunity": "HIGH",
      "means": "HIGH",

      "background": "Self-taught hacker. Responsible for exposing a $4M DeFi exploit in 2022. NightOwl Capital was the victim. The exploit was legal — a bug bounty dispute left Delgado unpaid and publicly humiliated by NightOwl's PR team.",

      "financialNote": "No unusual transactions. But Delgado uses privacy coins exclusively — Monero, Zcash. Standard for his profile.",

      "alibi": {
        "claimed": "Home, streaming a CTF competition online — verifiable via Twitch VOD",
        "corroborated": true,
        "notes": "Stream confirms he was live from 8 PM to 1 AM. BUT — stream can be pre-recorded. Technical analysis pending. IP 185.220.101.47 routes through a Tor exit node commonly used in his region."
      },

      "knownAssociates": ["suspect_crane"],
      "digitalFootprint": {
        "repoAccess": false,
        "ipMatch": true,
        "emailDomain": null
      }
    },
    {
      "id": "suspect_zhao",
      "name": "Lin Zhao",
      "alias": null,
      "role": "Co-founder, NightOwl Capital",
      "age": 36,
      "status": "CLEARED",
      "motive": "LOW",
      "opportunity": "HIGH",
      "means": "HIGH",

      "background": "MIT grad. Co-founded NightOwl with Voss in 2019. Owns 40% equity. No financial motive identified — she stood to lose more from the theft than gain. Close friends with Voss.",

      "financialNote": "No suspicious transactions. Voss named her as emergency contact. She was the one who called 911.",

      "alibi": {
        "claimed": "Flight from Singapore, landed SFO at 11:05 PM",
        "corroborated": true,
        "notes": "Passport scan and airline records confirmed. She was airborne during the transaction window. Cleared by timeline."
      },

      "knownAssociates": [],
      "digitalFootprint": {
        "repoAccess": true,
        "ipMatch": false,
        "emailDomain": "nightowlcapital.io"
      }
    }
  ],

  "_meta": {
    "note": "Suspect statuses are preliminary. Final verdict requires SOLVE.sh execution.",
    "lastUpdated": "2024-03-15T08:30:00Z"
  }
}
`,
    suspiciousPatterns: [
      "vcrane-consulting.io",
      "185.220.101.47",
      "CLEARED_PENDING_REVIEW",
      "340,000",
      "no prior work order",
      "Twitch VOD",
    ],
  },
  {
    id: "emails",
    name: "emails.txt",
    path: "CASE_0047/evidence/emails.txt",
    language: "plaintext",
    icon: "📧",
    clues: ["clue_crane_email", "clue_meeting_time"],
    narration:
      "The emails. Always the emails. People forget that digital paper trails don't burn. These were pulled from Voss's encrypted archive the morning after.",
    content: `================================================================================
EVIDENCE FILE: emails.txt
RECOVERED FROM: r.voss@nightowlcapital.io (encrypted archive, passphrase cracked)
CHAIN OF CUSTODY: NightOwl IT Security → Digital Forensics Unit
================================================================================


--- EMAIL 1 of 6 ---
FROM:    v.crane@nightowlcapital.io
TO:      r.voss@nightowlcapital.io
DATE:    2024-03-14  09:14 AM
SUBJECT: Q4 Audit Numbers — URGENT

Ray,

I need you to hold off on submitting the Q4 audit report to the board.
There are some "inconsistencies" in the fund allocation figures that
we need to reconcile before the board session on the 18th.

This is not a request.

— V


--- EMAIL 2 of 6 ---
FROM:    r.voss@nightowlcapital.io
TO:      v.crane@nightowlcapital.io
DATE:    2024-03-14  10:02 AM
SUBJECT: Re: Q4 Audit Numbers — URGENT

Victoria,

I understand your concern but I can't delay the report.
The board mandated submission by EOD Friday. If I hold it,
that's on me personally.

I've flagged the Meridian Capital transfer anomaly to compliance already.
This is out of my hands.

— Ray


--- EMAIL 3 of 6 ---
FROM:    v.crane@nightowlcapital.io
TO:      r.voss@nightowlcapital.io
DATE:    2024-03-14  10:31 AM
SUBJECT: Re: Re: Q4 Audit Numbers — URGENT

You don't understand what you're doing, Ray.
Meet me tonight. The office. 10 PM. Come alone.

Don't make this more complicated than it needs to be.


--- EMAIL 4 of 6 ---
FROM:    security@github.com
TO:      r.voss@nightowlcapital.io
DATE:    2024-03-14  22:53 PM
SUBJECT: [GitHub] New sign-in to your account

Hi raymond-voss,

A new sign-in to your GitHub account was detected.

  Location: Frankfurt, Germany
  IP Address: 185.220.101.47
  Time: March 14, 2024 at 10:53 PM (UTC-8)
  Browser: Unknown

If this wasn't you, secure your account immediately.

— The GitHub Team


--- EMAIL 5 of 6 ---
FROM:    noreply@blockchain-monitor.io
TO:      r.voss@nightowlcapital.io
DATE:    2024-03-14  23:19 PM
SUBJECT: ⚠️ ALERT: Large outbound transaction detected

WALLET MONITOR ALERT
Address: 1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P
Amount:  50.0000 BTC
Time:    2024-03-14 23:19:44 UTC
Tx Hash: 7f3a9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a

This alert was triggered because the transaction exceeded your threshold.


--- EMAIL 6 of 6 ---
FROM:    lin.zhao@nightowlcapital.io
TO:      r.voss@nightowlcapital.io
DATE:    2024-03-14  07:22 AM
SUBJECT: Be careful

Ray,

I know you saw the same figures I did.
The Meridian transfer doesn't add up.
Someone moved money out before the audit window.

I'm in SG until tomorrow night. Whatever you're thinking of doing —
wait until I'm back. Please.

Lin

================================================================================
[END OF EMAIL ARCHIVE]
================================================================================
`,
    suspiciousPatterns: [
      "10 PM",
      "Don't make this more complicated",
      "185.220.101.47",
      "vcrane",
      "Come alone",
    ],
  },
  {
    id: "transactions",
    name: "transactions.py",
    path: "CASE_0047/evidence/transactions.py",
    language: "python",
    icon: "⛓️",
    clues: ["clue_btc_flow", "clue_mixer", "clue_frozen_account"],
    narration:
      "On-chain data doesn't lie. The blockchain is a public ledger — every transaction, every address, every movement of coin is there forever. And someone made a very expensive mistake.",
    content: `#!/usr/bin/env python3
"""
CASE_0047 — On-Chain Transaction Analysis
Analyst: Digital Forensics Unit
Date: 2024-03-15
Tool: blockchain-forensics v2.4.1

This script reconstructs the flow of 50 BTC from Raymond Voss's
cold wallet following the incident on 2024-03-14.

EDUCATIONAL NOTE:
  A blockchain is a public, immutable ledger. Every transaction is
  permanent and traceable. Mixers (tumblers) attempt to obscure the
  trail by pooling coins from multiple senders, but chain analysis
  firms can often de-anonymize flows using heuristics.
"""

from datetime import datetime
from typing import List, Dict

# ─── TRANSACTION CHAIN ───────────────────────────────────────────────────────

ORIGIN_WALLET = "1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P"  # Raymond Voss cold wallet
AMOUNT_BTC    = 50.0
INCIDENT_TIME = datetime(2024, 3, 14, 23, 19, 44)    # UTC

transaction_chain: List[Dict] = [
    {
        "step": 1,
        "type": "SWEEP",
        "from": ORIGIN_WALLET,
        "to":   "3PQR7STU8VWX9YZA1BCD2EFG3HIJ4KLM",
        "amount": 50.0,
        "time": "2024-03-14T23:19:44Z",
        "fee_btc": 0.0002,
        "note": "Full balance swept in single transaction. No change output — "
                "indicates use of wallet-sweep tool, not manual transfer.",
        "flagged": True,
        "flag_reason": "Wallet active for 847 days. First outbound transaction."
    },
    {
        "step": 2,
        "type": "MIXER_ENTRY",
        "from": "3PQR7STU8VWX9YZA1BCD2EFG3HIJ4KLM",
        "to":   "MIXER::ChainBlind_v3",          # Known tumbling service
        "amount": 49.9998,
        "time": "2024-03-14T23:21:17Z",
        "fee_btc": 0.0001,
        "note": "ChainBlind_v3 is a known coinjoin mixer. FBI watchlist entry "
                "since 2022. Coins enter a pool with 47 other transactions.",
        "flagged": True,
        "flag_reason": "Use of sanctioned mixing service (OFAC SDN list)."
    },
    {
        "step": 3,
        "type": "MIXER_EXIT",
        "from": "MIXER::ChainBlind_v3",
        "to":   "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",  # Output wallet
        "amount": 48.75,                          # Mixer took ~2.5% fee
        "time": "2024-03-14T23:47:03Z",
        "fee_btc": 0.0003,
        "note": "Output wallet registered on CryptoVault Exchange (CVX).\\n"
                "CVX has KYC requirements — account identity on file.\\n"
                "⚠️  CRITICAL: CVX account flagged for suspicious activity.\\n"
                "Account FROZEN by CVX compliance team at 23:52 UTC.\\n"
                "Coins currently UNSPENT in frozen account.",
        "flagged": True,
        "flag_reason": "Frozen exchange account. Owner identity submitted to authorities."
    }
]

# ─── FROZEN ACCOUNT DATA ─────────────────────────────────────────────────────

frozen_account = {
    "exchange": "CryptoVault Exchange (CVX)",
    "account_id": "CVX-9847201",
    # KYC identity on file — redacted pending legal review
    "kyc_name":   "[REDACTED — SEE WARRANT #2024-SF-0891]",
    "kyc_email":  "[REDACTED]",
    # Partial domain leaked in CVX compliance report before redaction:
    "email_domain_fragment": "vcrane",    # ← matches suspect email domain
    "account_created": "2024-01-17",      # 57 days before the incident
    "coins_held": 48.75,
    "status": "FROZEN",
    "frozen_at": "2024-03-14T23:52:00Z"
}

# ─── SUMMARY ─────────────────────────────────────────────────────────────────

def print_summary():
    print("=" * 72)
    print("  TRANSACTION FORENSICS — CASE 0047")
    print("=" * 72)
    for tx in transaction_chain:
        print(f"\\n  STEP {tx['step']}: {tx['type']}")
        print(f"  FROM:   {tx['from']}")
        print(f"  TO:     {tx['to']}")
        print(f"  AMOUNT: {tx['amount']} BTC")
        print(f"  TIME:   {tx['time']}")
        if tx['flagged']:
            print(f"  ⚠️  FLAGGED: {tx['flag_reason']}")
        print(f"  NOTE:   {tx['note']}")
    print("\\n" + "=" * 72)
    print("  FROZEN ACCOUNT SUMMARY")
    print("=" * 72)
    for k, v in frozen_account.items():
        print(f"  {k.upper():<25} {v}")
    print("=" * 72)

if __name__ == "__main__":
    print_summary()
`,
    suspiciousPatterns: [
      "vcrane",
      "FROZEN",
      "email_domain_fragment",
      "OFAC SDN list",
      "ChainBlind",
    ],
  },
  {
    id: "camera_log",
    name: "camera_log.rs",
    path: "CASE_0047/evidence/camera_log.rs",
    language: "rust",
    icon: "📹",
    clues: ["clue_camera_offline", "clue_gait_match"],
    narration:
      "The security logs. Written in Rust — the language of systems that aren't supposed to fail. But someone made sure one camera did.",
    content: `//! CASE_0047 — Security Camera Log Analysis
//!
//! Source: NightOwl Capital Building Management System
//! Analyst: Digital Forensics Unit
//! Format: Parsed from raw CCTV metadata (proprietary → converted)
//!
//! EDUCATIONAL NOTE:
//!   Rust is a systems programming language valued for memory safety
//!   and performance. It's used in security-critical applications because
//!   it prevents entire classes of bugs (buffer overflows, null pointer
//!   dereferences) at compile time.

use std::collections::HashMap;

#[derive(Debug, Clone)]
pub struct CameraEvent {
    pub camera_id: &'static str,
    pub location: &'static str,
    pub timestamp: &'static str,
    pub event_type: EventType,
    pub subject_id: Option<&'static str>,
    pub notes: Option<&'static str>,
}

#[derive(Debug, Clone, PartialEq)]
pub enum EventType {
    PersonDetected,
    CameraOffline,
    CameraOnline,
    BadgeSwipe,
    AnomalyDetected,
}

// Full event log for 2024-03-14 (relevant window: 22:00 – 23:30)
pub fn get_event_log() -> Vec<CameraEvent> {
    vec![
        CameraEvent {
            camera_id: "CAM-L01",
            location: "Main Lobby — Entry",
            timestamp: "22:31:07",
            event_type: EventType::PersonDetected,
            subject_id: Some("BADGE_NW-CFO-01"), // ← Victoria Crane
            notes: Some("Subject exiting. Coat, briefcase. Normal gait pattern."),
        },
        CameraEvent {
            camera_id: "CAM-S12",
            location: "Stairwell — Floor 12",
            timestamp: "22:31:44",
            event_type: EventType::CameraOffline,
            subject_id: None,
            // Maintenance was NOT scheduled according to building records.
            // Work order NW-MAINT-2024-0314 was filed at 22:29 — 2 min before outage.
            // Work order filed by: [ACCOUNT DELETED]
            notes: Some("⚠️  SCHEDULED MAINTENANCE — but no prior work order found in system. \
                         Work order NW-MAINT-2024-0314 created at 22:29 UTC from internal terminal."),
        },
        CameraEvent {
            camera_id: "CAM-S12",
            location: "Stairwell — Floor 12",
            timestamp: "23:01:22",
            event_type: EventType::CameraOnline,
            subject_id: None,
            notes: Some("Camera restored automatically after 29 min 38 sec blackout."),
        },
        CameraEvent {
            camera_id: "CAM-L01",
            location: "Main Lobby — Entry",
            timestamp: "23:02:14",
            event_type: EventType::PersonDetected,
            subject_id: Some("UNKNOWN"),
            notes: Some(
                "Subject entering lobby. Face partially obscured — collar raised. \
                 GAIT ANALYSIS: 94.3% match to BADGE_NW-CFO-01 (Victoria Crane). \
                 Same coat. Same briefcase. No badge swipe recorded."
            ),
        },
        CameraEvent {
            camera_id: "CAM-F09",
            location: "Floor 9 — Voss Office Corridor",
            timestamp: "22:38:00",
            event_type: EventType::CameraOffline,
            subject_id: None,
            notes: Some("⚠️  OFFLINE — same maintenance window as CAM-S12."),
        },
        CameraEvent {
            camera_id: "CAM-F09",
            location: "Floor 9 — Voss Office Corridor",
            timestamp: "23:01:22",
            event_type: EventType::CameraOnline,
            subject_id: None,
            notes: Some("Restored simultaneously with CAM-S12. Coordinated outage confirmed."),
        },
        CameraEvent {
            camera_id: "CAM-L01",
            location: "Main Lobby — Entry",
            timestamp: "23:19:33",
            event_type: EventType::PersonDetected,
            subject_id: Some("UNKNOWN"),
            notes: Some(
                "Same subject from 23:02 now exiting. \
                 Voss transaction broadcast: 23:19:44 — 11 seconds after exit. \
                 ⚠️  CRITICAL TIMING MATCH."
            ),
        },
    ]
}

// Timeline cross-reference
pub fn critical_timeline() -> HashMap<&'static str, &'static str> {
    let mut t = HashMap::new();
    t.insert("22:31", "Crane badged OUT of building (confirmed)");
    t.insert("22:31", "Stairwell camera goes offline (unscheduled)");
    t.insert("22:38", "Floor 9 corridor camera goes offline");
    t.insert("23:01", "Both cameras restored");
    t.insert("23:02", "Unknown subject enters lobby (94.3% gait match: Crane)");
    t.insert("23:19", "Unknown subject exits lobby");
    t.insert("23:19", "50 BTC transaction broadcast — 11 seconds later");
    t.insert("23:47", "Voss found unresponsive by building security");
    t
}
`,
    suspiciousPatterns: [
      "94.3%",
      "GAIT ANALYSIS",
      "no prior work order",
      "CameraOffline",
      "CRITICAL TIMING",
    ],
  },
  {
    id: "solve",
    name: "SOLVE.sh",
    path: "CASE_0047/SOLVE.sh",
    language: "shell",
    icon: "⚡",
    clues: [],
    narration:
      "The moment of truth. Every detective has to look the evidence in the eye and make a call. This is where the case ends — or begins again.",
    content: `#!/bin/bash
# ════════════════════════════════════════════════════════════════
#  CODE NOIR — CASE 0047 — ACCUSATION TERMINAL
#  Version: 1.0.0
#  Classification: RESTRICTED — DETECTIVE USE ONLY
# ════════════════════════════════════════════════════════════════
#
# USAGE: ./SOLVE.sh [SUSPECT_ID]
#
# SUSPECT IDs:
#   crane    — Victoria Crane, CFO
#   ghost    — Marco "Ghost" Delgado, Security Researcher
#   zhao     — Lin Zhao, Co-founder
#
# EXAMPLE:
#   ./SOLVE.sh crane
#
# ════════════════════════════════════════════════════════════════

echo ""
echo "  ▄████▄   ▒█████  ▓█████▄ ▓█████     ███▄    █  ▒█████   ██▓ ██▀███  "
echo "  ▒██▀ ▀█  ▒██▒  ██▒▒██▀ ██▌▓█   ▀     ██ ▀█   █ ▒██▒  ██▒▓██▒▓██ ▒ ██▒"
echo "  ▒▓█    ▄ ▒██░  ██▒░██   █▌▒███      ▓██  ▀█ ██▒▒██░  ██▒▒██▒▓██ ░▄█ ▒"
echo "  ▒▓▓▄ ▄██▒▒██   ██░░▓█▄   ▌▒▓█  ▄    ▓██▒  ▐▌██▒▒██   ██░░██░▒██▀▀█▄  "
echo "  ▒ ▓███▀ ░░ ████▓▒░░▒████▓ ░▒████▒   ▒██░   ▓██░░ ████▓▒░░██░░██▓ ▒██▒"
echo "  ░ ░▒ ▒  ░░ ▒░▒░▒░  ▒▒▓  ▒ ░░ ▒░ ░   ░ ▒░   ▒ ▒ ░ ▒░▒░▒░ ░▓  ░ ▒▓ ░▒▓░"
echo "    ░  ▒     ░ ▒ ▒░  ░ ▒  ▒  ░ ░  ░   ░ ░░   ░ ▒░  ░ ▒ ▒░  ▒ ░  ░▒ ░ ▒░"
echo ""
echo "  ════════════════════════════════════════════════════════"
echo "   CASE 0047 — ACCUSATION TERMINAL"
echo "  ════════════════════════════════════════════════════════"
echo ""

SUSPECT=$1

if [ -z "$SUSPECT" ]; then
    echo "  ERROR: No suspect specified."
    echo ""
    echo "  USAGE: ./SOLVE.sh [crane|ghost|zhao]"
    echo ""
    exit 1
fi

echo "  Transmitting accusation to NIGHTFALL DIVISION..."
echo "  ..."
sleep 1
echo "  Processing evidence chain..."
sleep 1

case $SUSPECT in
  crane)
    echo ""
    echo "  ╔══════════════════════════════════════════════╗"
    echo "  ║   ACCUSATION: VICTORIA CRANE                ║"
    echo "  ╚══════════════════════════════════════════════╝"
    echo ""
    echo "  EVIDENCE CHAIN:"
    echo "  ✓ Email: Demanded Voss delay audit. Set meeting for 10 PM."
    echo "  ✓ Financial: \$340K transfer to offshore entity 72h before death."
    echo "  ✓ Camera: Badged out at 22:31. Re-entered at 23:02 (gait: 94.3%)."
    echo "  ✓ Camera: Floor 9 and stairwell offline during re-entry window."
    echo "  ✓ Blockchain: Frozen CVX account domain fragment: 'vcrane'."
    echo "  ✓ Timeline: Exited lobby 11 seconds before BTC transaction."
    echo ""
    echo "  VERDICT: ████████████████████  GUILTY"
    echo ""
    echo "  Victoria Crane orchestrated the theft and silenced Raymond Voss"
    echo "  to prevent the Q4 audit from exposing her fund diversion."
    echo "  She used Delgado's Tor IP as misdirection — a false flag."
    echo "  The seed phrase was her key. Voss's carelessness was her door."
    echo ""
    echo "  ✓ CASE 0047 — SOLVED"
    ;;
  ghost)
    echo ""
    echo "  ╔══════════════════════════════════════════════╗"
    echo "  ║   ACCUSATION: MARCO 'GHOST' DELGADO         ║"
    echo "  ╚══════════════════════════════════════════════╝"
    echo ""
    echo "  ASSESSMENT: INSUFFICIENT EVIDENCE"
    echo ""
    echo "  ✗ Delgado had motive, but no repo access."
    echo "  ✗ IP 185.220.101.47 is a Tor exit node — not unique to Delgado."
    echo "  ✗ Twitch stream provides partial alibi."
    echo "  ✗ No physical evidence placing him at the scene."
    echo "  ✗ Email domain 'vcrane' does not match Delgado."
    echo ""
    echo "  VERDICT: NOT ENOUGH — WRONG SUSPECT"
    echo ""
    echo "  Delgado was a red herring. His Tor activity drew attention,"
    echo "  but the camera footage, email chain, and frozen account"
    echo "  all point elsewhere. Look again."
    echo ""
    echo "  ✗ CASE 0047 — UNSOLVED"
    ;;
  zhao)
    echo ""
    echo "  ╔══════════════════════════════════════════════╗"
    echo "  ║   ACCUSATION: LIN ZHAO                      ║"
    echo "  ╚══════════════════════════════════════════════╝"
    echo ""
    echo "  ASSESSMENT: INCORRECT"
    echo ""
    echo "  ✗ Zhao was airborne during the incident window."
    echo "  ✗ Passport and airline records confirmed — airtight alibi."
    echo "  ✗ No financial motive — stood to lose, not gain."
    echo "  ✗ She was the one who called 911."
    echo ""
    echo "  VERDICT: ALIBI CONFIRMED — WRONG SUSPECT"
    echo ""
    echo "  Lin Zhao is not your killer. She tried to warn Voss."
    echo "  Read her email again. She knew something was wrong."
    echo "  She just didn't know how wrong."
    echo ""
    echo "  ✗ CASE 0047 — UNSOLVED"
    ;;
  *)
    echo "  ERROR: Unknown suspect ID '$SUSPECT'"
    echo "  Valid IDs: crane, ghost, zhao"
    exit 1
    ;;
esac

echo ""
`,
    suspiciousPatterns: [],
  },
  {
    id: "audit_fragment",
    name: "internal_audit_fragment.enc",
    path: "CASE_0047/evidence/internal_audit_fragment.enc",
    language: "plaintext",
    icon: "🔒",
    clues: ["clue_meridian_transfer"],
    isLocked: true,
    unlockedBy: "clue_crane_email",
    narration:
      "An encrypted fragment. Voss was protecting this. It's the piece Crane needed buried — a record of the Meridian Capital transfer that never should have happened.",
    content: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  NIGHTOWL CAPITAL — INTERNAL AUDIT FRAGMENT
  Classification: CONFIDENTIAL — BOARD EYES ONLY
  Document: Q4-2023-AUDIT-DRAFT-v0.7 (INCOMPLETE)
  Author: Raymond Voss (NW-0091)
  Last Modified: 2024-03-14 21:07 UTC
  Encryption: AES-256 (passphrase recovered by forensics unit)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[AUDIT NOTE — R. VOSS]
This section documents an anomalous fund transfer discovered during
the Q4 reconciliation process. I am preserving this as evidence.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRANSACTION ANOMALY — MERIDIAN CAPITAL TRANSFER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Date:          2023-12-29  (2 days before fiscal year close)
  Amount:        $2,400,000 USD
  From:          NightOwl Capital Operating Fund (Account: NW-OPS-9021)
  To:            Meridian Capital Partners LLC (Account: ???)

  Authorized by: V. CRANE (Digital signature — CFO access)
  Board Approval: NONE ON RECORD
  Purpose Code:   "STRATEGIC PARTNERSHIP ADVANCE" — NO BACKING DOCUMENT

  Meridian Capital Partners LLC:
    Registered:  Delaware, 2023-11-14  (6 weeks before transfer)
    Directors:   [SHELL COMPANY — NO PUBLIC DIRECTORS]
    Address:     1209 Orange Street, Wilmington DE  (registered agent only)

  [VOSS NOTE]: Meridian Capital Partners does not appear to be a real firm.
  I searched every financial registry. No operating history. No clients.
  No website before 2023-12-01. The money went somewhere. Find it.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  [VOSS NOTE - ADDED 2024-03-14 21:07]:
  I showed this to Lin before she left for Singapore. She agreed —
  this is embezzlement. $2.4M routed through a shell company.

  I'm submitting this to the board Friday regardless of what Victoria says.

  If something happens to me, this file is the reason why.
  The wallet address and seed phrase in victim_profile.js —
  I set that wallet up to preserve evidence. The 50 BTC isn't mine.
  It belongs to NightOwl. I was going to flag it in the audit.

  Someone wanted that audit buried.
  Someone knew about the wallet.

  — R.V.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[END OF RECOVERED FRAGMENT]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`,
    suspiciousPatterns: [
      "embezzlement",
      "shell company",
      "If something happens to me",
      "REMOVE BEFORE COMMIT",
      "Meridian Capital",
    ],
  },
];

export const FILE_TREE = [
  {
    id: "root",
    name: "CASE_0047",
    type: "folder" as const,
    children: [
      { id: "readme", name: "README.md", type: "file" as const },
      {
        id: "victim_profile",
        name: "victim_profile.js",
        type: "file" as const,
      },
      { id: "suspects", name: "suspects.json", type: "file" as const },
      {
        id: "evidence",
        name: "evidence",
        type: "folder" as const,
        children: [
          { id: "emails", name: "emails.txt", type: "file" as const },
          {
            id: "transactions",
            name: "transactions.py",
            type: "file" as const,
          },
          { id: "camera_log", name: "camera_log.rs", type: "file" as const },
          {
            id: "audit_fragment",
            name: "internal_audit_fragment.enc",
            type: "file" as const,
            locked: true,
          },
        ],
      },
      { id: "solve", name: "SOLVE.sh", type: "file" as const },
    ],
  },
];
