import type { FullCase } from "./cases";

export const CASE_0001: FullCase = {
  id: "0001",
  caseNumber: "CASE_0001",
  title: "The Leaked Key",
  difficulty: "tutorial",
  isLocked: false,
  tagline: "A junior developer forgot to remove their AWS credentials. $4,247 appeared on the bill overnight.",
  victim: "TechSprout Inc. — $4,247 AWS bill",
  description: "Someone exploited an AWS access key left in a public GitHub commit. The key was live for 90 minutes before being revoked. Find who used it before the developer noticed.",
  introTitle: "THE LEAKED KEY",
  introBody1: "An AWS key was sitting in the code. In plain sight.",
  introBody2: "Not everyone who saw it used it. But someone did.",

  suspects: [
    {
      id: "alex",
      name: "Alex Park",
      role: "Junior Developer, TechSprout",
      emoji: "👨‍💻",
      terminalOutput: {
        evidence: [
          "✓ Alex committed the key — but accidentally.",
          "✓ Alex was in Sprint Planning (3 PM – 5 PM) when API calls happened.",
          "✗ Alex's home IP does not match the CloudTrail source IP.",
          "✗ Alex raised the alarm in Slack — not the behavior of the attacker.",
        ],
        verdict: "WRONG SUSPECT",
        message: "Alex made the mistake — but not the crime. They committed the key by accident and were in a meeting when it was exploited. The attacker was someone who saw the commit notification.",
      },
      verdictScreen: {
        type: "wrong",
        message: "Alex Park accidentally exposed the credentials, but was in a 2-hour sprint planning meeting when the API calls were made. Their home IP doesn't match the CloudTrail source. Alex is not your attacker.",
      },
    },
    {
      id: "jordan",
      name: "Jordan Walsh",
      role: "Senior Developer, TechSprout",
      emoji: "🧑‍💻",
      terminalOutput: {
        evidence: [
          "✓ Received GitHub commit notification at 15:24 — 2 min after Alex's push.",
          "✓ Slack at 15:24: 'there are AWS keys in app_config.js'",
          "✓ Slack at 17:05: 'Already on it' — before Alex asked for help.",
          "✓ CloudTrail source IP 74.125.68.102 = Jordan's home IP (confirmed).",
          "✓ Alex was in a meeting — Jordan had no alibi for 16:00–17:00.",
        ],
        verdict: "GUILTY",
        message: "Jordan Walsh saw the GitHub notification 2 minutes after the commit, recognized the leaked key, and spent 90 minutes exploiting it — running EC2 mining instances and downloading 847 files from S3 — before pretending to help 'rotate' the key.",
      },
      verdictScreen: {
        type: "guilty",
        message: "Jordan Walsh received the GitHub notification at 15:24, immediately recognized the leaked AWS key, and spent the next 90 minutes exploiting it while Alex was in a meeting. The CloudTrail logs place Jordan's home IP at every API call. Jordan's Slack message — 'Already on it' — was sent before Alex even asked for help.",
      },
    },
  ],

  correctSuspectId: "jordan",

  clues: [
    {
      id: "clue_aws_key",
      title: "Leaked AWS Credentials",
      description: "AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY found in plain text in app_config.js, committed to a public GitHub repo.",
      fileId: "config",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_github_notification",
      title: "GitHub Notification to Jordan",
      description: "GitHub auto-sent Jordan a commit notification at 15:22:51 — just 4 seconds after Alex's push. Jordan knew about the key within minutes.",
      fileId: "git_history",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_alex_alibi",
      title: "Alex's Meeting Alibi",
      description: "Alex was in Sprint Planning from 3 PM to 5 PM. The AWS API calls started at 16:01 — while Alex was definitely in a conference room.",
      fileId: "git_history",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_slack_admission",
      title: "Jordan's Slack Slip",
      description: "Jordan said 'Already on it, rotating and revoking now' — BEFORE Alex asked for help. Jordan knew exactly what to do because Jordan was the one who used the key.",
      fileId: "slack",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_cloudtrail_ip",
      title: "CloudTrail IP = Jordan's Home",
      description: "Every API call — identity check, S3 download, EC2 launch — came from IP 74.125.68.102. The IT records confirm this is Jordan Walsh's home IP address.",
      fileId: "cloudtrail",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_mining_instances",
      title: "$4,247 Mining Bill",
      description: "The attacker launched 4x t3.xlarge EC2 instances configured for crypto mining. This generated the unexpected AWS bill. They ran for 90 minutes before the key was revoked.",
      fileId: "cloudtrail",
      discovered: false,
      critical: false,
    },
  ],

  fileTree: [
    {
      id: "root",
      name: "CASE_0001",
      type: "folder",
      children: [
        { id: "readme",      name: "README.md",          type: "file", icon: "📄" },
        { id: "config",      name: "app_config.js",      type: "file", icon: "⚙️" },
        { id: "git_history", name: "git_history.log",    type: "file", icon: "📋" },
        { id: "slack",       name: "slack_export.json",  type: "file", icon: "💬" },
        { id: "cloudtrail",  name: "aws_cloudtrail.log", type: "file", icon: "☁️" },
        { id: "solve",       name: "SOLVE.sh",           type: "file", icon: "⚡" },
      ],
    },
  ],

  hints: [
    {
      isDone: (f) => f.has("readme"),
      text: "Start with README.md — it explains the case and tells you what to look for.",
      action: { label: "Open README.md", fileId: "readme" },
    },
    {
      isDone: (f) => f.has("config"),
      text: "Open app_config.js — developers sometimes leave secrets in config files by mistake.",
      action: { label: "Open app_config.js", fileId: "config" },
    },
    {
      isDone: (_, c) => c.has("clue_aws_key"),
      text: "You found the leaked key. Now open git_history.log — who saw the commit notification?",
      action: { label: "Open git_history.log", fileId: "git_history" },
    },
    {
      isDone: (f) => f.has("slack"),
      text: "Check the Slack export — people talk. Look for who mentioned seeing the credentials.",
      action: { label: "Open slack_export.json", fileId: "slack" },
    },
    {
      isDone: (f) => f.has("cloudtrail"),
      text: "Open aws_cloudtrail.log — the API calls have source IPs. Match them to a suspect.",
      action: { label: "Open aws_cloudtrail.log", fileId: "cloudtrail" },
    },
    {
      isDone: (_, c) => c.has("clue_cloudtrail_ip"),
      text: "You have the IP. You have the Slack message. You know who did it. Open SOLVE.sh.",
      action: { label: "Open SOLVE.sh", fileId: "solve" },
    },
  ],

  files: [
    {
      id: "readme",
      name: "README.md",
      path: "CASE_0001/README.md",
      language: "markdown",
      icon: "📄",
      narration: "TechSprout Inc. An AWS bill for $4,247 that shouldn't exist. A key that was supposed to be deleted. Someone saw that commit notification — and acted fast.",
      clues: [],
      suspiciousPatterns: [],
      content: `# CASE_0001 — The Leaked Key

**Difficulty:** TUTORIAL — This case will guide you step by step.
**Status:** ACTIVE

---

## WHAT HAPPENED

On March 8th, 2024, TechSprout Inc. received an unexpected AWS bill for **$4,247**.
The charges appeared overnight — someone ran EC2 mining instances and downloaded
847 files from the production S3 bucket.

The source: an AWS access key accidentally committed to the company's GitHub repo.

The key was live for **90 minutes** before being revoked.

---

## YOUR MISSION

Find out **WHO** exploited the leaked key before it was revoked.

The key was in the code. But not everyone who *saw* it *used* it.

---

## HOW TO INVESTIGATE

Follow these steps in order:

1. Open **app_config.js** → Find the leaked credential (look for amber highlights)
2. Open **git_history.log** → See who received a commit notification
3. Open **slack_export.json** → Someone revealed too much in Slack
4. Open **aws_cloudtrail.log** → Match the API source IP to a suspect
5. Open **SOLVE.sh** → File your accusation

---

## SUSPECTS

| Name | Role |
|------|------|
| **Alex Park** | Junior Developer (committed the key) |
| **Jordan Walsh** | Senior Developer (was aware of the commit) |

---

> **TUTORIAL TIP:** Watch for amber-highlighted lines in each file —
> those are the suspicious parts. When you open a file, new evidence
> appears in the **Evidence Board** (left panel, "CLUES" tab).
> The **HINT BAR** at the bottom always tells you what to do next.
`,
    },
    {
      id: "config",
      name: "app_config.js",
      path: "CASE_0001/app_config.js",
      language: "javascript",
      icon: "⚙️",
      narration: "A config file. Pushed to a public repository. The key is right there — no encryption, no masking. Just a comment saying 'TODO: move this'. They never did.",
      clues: ["clue_aws_key"],
      suspiciousPatterns: ["AKIAIOSFODNN7EXAMPLE", "secretAccessKey", "TODO: MOVE TO ENVIRONMENT", "wJalrXUtnFEMI"],
      content: `/**
 * TechSprout Inc. — Application Configuration
 * Environment: PRODUCTION
 * Last Modified: 2024-03-08T15:22:47Z
 * Author: Alex Park
 *
 * ⚠️  DETECTIVE NOTE: This file was pushed to a PUBLIC GitHub repository.
 *    Every line was visible to anyone with the repo link.
 */

const config = {
  app: {
    name: "TechSprout API",
    version: "2.4.1",
    port: 3000,
    environment: "production",
  },

  database: {
    host: "db.techsprout.internal",
    port: 5432,
    name: "techsprout_prod",
    // Password stored in AWS Secrets Manager ✓ (done correctly)
  },

  // ─── AWS Configuration ──────────────────────────────────────────────────
  // TODO: MOVE TO ENVIRONMENT VARIABLES BEFORE PUSHING!!!
  // Added temporarily for local testing — forgot to remove before commit
  aws: {
    region: "us-east-1",
    accessKeyId:     "AKIAIOSFODNN7EXAMPLE",          // ← LEAKED CREDENTIAL
    secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",  // ← LEAKED
    s3Bucket: "techsprout-assets-prod",
  },

  features: {
    enableAnalytics: true,
    debugMode: false,
  },
};

// EDUCATIONAL NOTE:
// AWS Access Keys give programmatic access to your entire AWS account.
// They should ALWAYS be stored in environment variables or a secrets manager,
// never hardcoded in source files — especially not in public repositories.
// Tools like 'git-secrets' and 'trufflehog' scan for these automatically.

module.exports = config;
`,
    },
    {
      id: "git_history",
      name: "git_history.log",
      path: "CASE_0001/git_history.log",
      language: "plaintext",
      icon: "📋",
      narration: "The git log. Every commit is a timestamp. Every push is a notification. Someone received that notification — within four seconds.",
      clues: ["clue_github_notification", "clue_alex_alibi"],
      suspiciousPatterns: ["jordan.walsh@techsprout.io", "15:22:51", "Sprint Planning"],
      content: `================================================================================
REPOSITORY: techsprout-api (PUBLIC)
BRANCH:     main
EXPORTED:   2024-03-09
================================================================================

COMMIT LOG
────────────────────────────────────────────────────────────────────────────────

commit a7f3c91d  (HEAD → main)
Author:  Alex Park <alex.park@techsprout.io>
Date:    2024-03-08  15:22:47  UTC

    feat: add AWS S3 integration for file uploads

    Added S3 client config to app_config.js for the new file upload feature.
    TODO: will move credentials to env vars — ticket DS-2901

    Files changed: app_config.js, services/storage.js

────────────────────────────────────────────────────────────────────────────────

commit 8b2e4f1a
Author:  Jordan Walsh <jordan.walsh@techsprout.io>
Date:    2024-03-08  14:45:02  UTC

    fix: resolve rate limiting on auth endpoints

────────────────────────────────────────────────────────────────────────────────

commit 3c9d7a22
Author:  Alex Park <alex.park@techsprout.io>
Date:    2024-03-07  11:30:15  UTC

    feat: initial S3 bucket setup

================================================================================
GITHUB NOTIFICATION LOG
(Auto-sent immediately to all repository watchers)
================================================================================

[2024-03-08  15:22:51]  → jordan.walsh@techsprout.io
  Subject: "[techsprout-api] New commit by Alex Park"
  Preview: "feat: add AWS S3 integration..."
  Opened:  YES (read receipt: 15:23:04)

[2024-03-08  15:22:51]  → sarah.chen@techsprout.io
  Subject: "[techsprout-api] New commit by Alex Park"
  Out-of-office reply received: "I'm on vacation until March 12th."

================================================================================
CALENDAR DATA (Alex Park — recovered from Google Workspace)
================================================================================

  2024-03-08  15:00 – 17:00  │  Sprint Planning — Conference Room B
                              │  Attendees: Alex Park, 4 others confirmed
                              │  Location: Office (badge swipe confirmed 14:57)

  ⚠️  Alex was physically in the office in a meeting when the API calls started.
================================================================================
`,
    },
    {
      id: "slack",
      name: "slack_export.json",
      path: "CASE_0001/slack_export.json",
      language: "json",
      icon: "💬",
      narration: "The Slack export. Developers talk. Sometimes too much. Read between the lines — one message here reveals more than the sender intended.",
      clues: ["clue_slack_admission"],
      suspiciousPatterns: ["Already on it", "AWS keys in app_config", "15:24"],
      content: `{
  "channel": "#dev-team",
  "workspace": "TechSprout",
  "exported": "2024-03-09",
  "messages": [
    {
      "timestamp": "2024-03-08T15:24:33Z",
      "user": "jordan.walsh",
      "displayName": "Jordan Walsh",
      "text": "Just got the GitHub commit notification — Alex pushed to main. Looks like there are AWS keys in app_config.js lol",
      "note": "⚠️  Jordan mentioned the credentials unprompted, 2 minutes after the commit."
    },
    {
      "timestamp": "2024-03-08T15:26:01Z",
      "user": "sarah.chen",
      "displayName": "Sarah Chen",
      "text": "😬 that's not good. I'm on vacation but someone should tell Alex",
      "note": "Sarah sent this from her phone while traveling — she was abroad."
    },
    {
      "timestamp": "2024-03-08T17:03:44Z",
      "user": "alex.park",
      "displayName": "Alex Park",
      "text": "Oh no I just finished the planning meeting and saw this — rotating the key NOW. So sorry everyone.",
      "reactions": [{ "emoji": "facepalm", "count": 3 }]
    },
    {
      "timestamp": "2024-03-08T17:05:22Z",
      "user": "jordan.walsh",
      "displayName": "Jordan Walsh",
      "text": "Already on it, rotating and revoking now 👍",
      "note": "⚠️  CRITICAL: Alex didn't ask Jordan for help. Jordan volunteered — and already knew exactly what steps to take. Why?"
    },
    {
      "timestamp": "2024-03-08T17:09:01Z",
      "user": "alex.park",
      "displayName": "Alex Park",
      "text": "Key rotated. Lesson learned — env vars only from now on. So embarrassed.",
      "reactions": [{ "emoji": "thumbsup", "count": 2 }]
    },
    {
      "timestamp": "2024-03-09T09:15:00Z",
      "user": "sarah.chen",
      "displayName": "Sarah Chen",
      "text": "Guys... check the AWS bill. There's $4,247 in unexpected charges from yesterday. EC2 instances we never provisioned.",
      "reactions": [{ "emoji": "rotating_light", "count": 5 }]
    }
  ]
}
`,
    },
    {
      id: "cloudtrail",
      name: "aws_cloudtrail.log",
      path: "CASE_0001/aws_cloudtrail.log",
      language: "plaintext",
      icon: "☁️",
      narration: "CloudTrail. AWS's audit log. Every API call, every source IP, every action — recorded. The attacker left fingerprints on the server logs.",
      clues: ["clue_cloudtrail_ip", "clue_mining_instances"],
      suspiciousPatterns: ["74.125.68.102", "RunInstances", "crypto mining", "jordan.walsh"],
      content: `================================================================================
AWS CLOUDTRAIL — API CALL LOG
Account: techsprout-prod
Key:     AKIAIOSFODNN7EXAMPLE  (REVOKED 2024-03-08 17:09)
Period:  2024-03-08  16:00 – 17:09 UTC
================================================================================

EVENT 1 ─────────────────────────────────────────────────────────────────────
  Time:       2024-03-08  16:01:23 UTC
  Action:     GetCallerIdentity
  Service:    AWS STS
  Source IP:  74.125.68.102
  User-Agent: aws-cli/2.15.0 Python/3.11
  Note:       First call — probing what the key has access to.

EVENT 2 ─────────────────────────────────────────────────────────────────────
  Time:       2024-03-08  16:03:44 UTC
  Action:     ListBuckets
  Service:    AWS S3
  Source IP:  74.125.68.102
  Note:       Listed all S3 buckets in the account.

EVENT 3 ─────────────────────────────────────────────────────────────────────
  Time:       2024-03-08  16:08:12 UTC
  Action:     GetObject  (×847 requests over 18 minutes)
  Service:    AWS S3
  Source IP:  74.125.68.102
  Bucket:     techsprout-assets-prod
  Note:       Downloaded 847 files — user uploads + internal documents.

EVENT 4 ─────────────────────────────────────────────────────────────────────
  Time:       2024-03-08  16:31:07 UTC
  Action:     RunInstances
  Service:    AWS EC2
  Source IP:  74.125.68.102
  Details:    4× t3.xlarge  |  AMI: crypto mining configuration
  Cost:       ~$4,247 over 90 minutes before key revocation
  Note:       ⚠️  CRITICAL: Spinning up mining instances is the primary goal.

================================================================================
IP GEOLOCATION
  74.125.68.102  →  San Francisco, CA, USA  |  ISP: Comcast Business

KNOWN IP RECORDS (IT Security Database):
  alex.park home IP:       192.168.1.x  (home router — standard residential)
  jordan.walsh home IP:    74.125.68.102   ← ⚠️  EXACT MATCH TO CLOUDTRAIL
  sarah.chen:              Abroad (vacation) — confirmed by out-of-office
================================================================================
`,
    },
    {
      id: "solve",
      name: "SOLVE.sh",
      path: "CASE_0001/SOLVE.sh",
      language: "shell",
      icon: "⚡",
      narration: "The moment of truth. You have the IP. You have the Slack message. You have the timeline. There's only one person it can be.",
      clues: [],
      suspiciousPatterns: [],
      content: `#!/bin/bash
# NIGHTFALL DIVISION — ACCUSATION TERMINAL
# CASE_0001: The Leaked Key
#
# USAGE: accuse [alex|jordan]
`,
    },
  ],
  forensicData: {
    dnaMatch: "MATCH FOUND: JORDAN_WALSH_DNA (99.2%)",
    fingerprintMatch: "JORDAN_W_F12",
    terminalSecrets: ["aws_secrets", "cloudtrail_bypass"],
    phonePin: "1522",
    btcTarget: "0x7412568102",
    voiceTargets: [
        { name: "Alex", stress: 15, status: "STABLE" },
        { name: "Jordan", stress: 84, status: "DECEPTION_LIKELY" },
    ],
    ipTarget: "74.125.68.102"
  },
  boardConfig: {
    layout: {
      leaked_key: { x: 50, y: 50, rotate: -2 },
      notification: { x: 150, y: 250, rotate: 2 },
      alibi: { x: 400, y: 80, rotate: 1 },
      slack_slip: { x: 700, y: 120, rotate: -1.5 },
      ip_match_0001: { x: 450, y: 400, rotate: 0.5 },
    },
    connectors: [
      ["leaked_key", "notification"],
      ["notification", "ip_match_0001"],
      ["alibi", "ip_match_0001"],
      ["slack_slip", "ip_match_0001"],
    ],
  }
};
