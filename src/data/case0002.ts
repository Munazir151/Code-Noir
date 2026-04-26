import type { FullCase } from "./cases";

export const CASE_0002: FullCase = {
  id: "0002",
  caseNumber: "CASE_0002",
  title: "Night Shift",
  difficulty: "easy",
  isLocked: false,
  tagline: "Production database accessed at 2:17 AM. 150,000 customer records downloaded. The password was in the deploy script.",
  victim: "DeepStack Systems — 150K records stolen",
  description: "Someone accessed the production database at 2 AM using credentials found hardcoded in a deployment script. A full customer table export was performed. Find the insider.",
  introTitle: "NIGHT SHIFT",
  introBody1: "The database was accessed at 2:17 AM. No VPN. No authorization.",
  introBody2: "The password was in the deployment script. Someone knew where to look.",

  suspects: [
    {
      id: "casey",
      name: "Casey Morris",
      role: "Systems Administrator, DeepStack",
      emoji: "🖥️",
      terminalOutput: {
        evidence: [
          "✓ Casey does work evening shifts (on-call rotation).",
          "✓ Casey logged in at 22:03 — legitimate backup verification.",
          "✗ Casey's home IP is 71.120.88.44 — does NOT match the 2:17 AM login.",
          "✗ Casey discovered the anomalous log entry at 08:45 — reported it.",
        ],
        verdict: "WRONG SUSPECT",
        message: "Casey Morris works evenings sometimes, but their home IP doesn't match the attacker's IP. Casey was actually the one who found and reported the breach. Wrong call.",
      },
      verdictScreen: {
        type: "wrong",
        message: "Casey Morris's home IP is 71.120.88.44 — it doesn't match the 2:17 AM login source of 98.44.21.156. Casey was on legitimate on-call duty at 10 PM, and was the one who discovered the breach the next morning. Casey is not your attacker.",
      },
    },
    {
      id: "sam",
      name: "Sam Rivera",
      role: "Backend Developer, DeepStack",
      emoji: "👩‍💻",
      terminalOutput: {
        evidence: [
          "✓ Sam added DB_PASS to deploy.sh on March 18th — 3 days before the breach.",
          "✓ 2:17 AM login from IP 98.44.21.156 — Sam's registered home IP.",
          "✓ No VPN used — Sam knew the direct DB connection string.",
          "✓ Sam's work hours: 10 AM–6 PM. No reason to be active at 2 AM.",
          "✓ 150,000 records exported in 14 minutes — an automated script, not manual.",
        ],
        verdict: "GUILTY",
        message: "Sam Rivera hardcoded the database password into deploy.sh on March 18th — then used that same password to connect directly to the production database from home at 2:17 AM. The IP match is definitive.",
      },
      verdictScreen: {
        type: "guilty",
        message: "Sam Rivera added the hardcoded DB_PASS to deploy.sh three days before the incident — and then used that exact password to connect to the production database from home at 2:17 AM. The login IP 98.44.21.156 matches Sam's registered home address. The full table export was automated — Sam prepared this in advance.",
      },
    },
  ],

  correctSuspectId: "sam",

  clues: [
    {
      id: "clue_db_password",
      title: "Hardcoded DB Password",
      description: "The production database password 'Deepst4ck_Pr0d_2024!' was found in a comment in deploy.sh. Last modified by Sam Rivera on March 18th.",
      fileId: "deploy",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_2am_login",
      title: "2:17 AM Login from External IP",
      description: "The deepstack_app account logged into the production database at 2:17 AM from external IP 98.44.21.156 — not a scheduled job, no VPN.",
      fileId: "auth_log",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_ip_match",
      title: "IP Matches Sam's Home",
      description: "Staff profiles confirm IP 98.44.21.156 is Sam Rivera's registered home IP address. Casey's home IP is completely different.",
      fileId: "staff",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_sam_edited",
      title: "Sam Last Edited deploy.sh",
      description: "Git records show Sam Rivera modified deploy.sh on March 18th — 3 days before the incident — adding the DB_PASS that was used in the attack.",
      fileId: "deploy",
      discovered: false,
      critical: false,
    },
    {
      id: "clue_full_export",
      title: "150K Records Exported",
      description: "The attacker ran a full COPY of the customers table — 150,000 rows, 2.3 GB. This was done in 14 minutes using a prepared script, not a manual query.",
      fileId: "auth_log",
      discovered: false,
      critical: false,
    },
    {
      id: "clue_casey_alibi",
      title: "Casey's Different IP",
      description: "Casey Morris's home IP (71.120.88.44) does not match the attacker's IP. Casey was legitimately logged in at 10 PM for backup verification — a different session.",
      fileId: "staff",
      discovered: false,
      critical: false,
    },
  ],

  fileTree: [
    {
      id: "root",
      name: "CASE_0002",
      type: "folder",
      children: [
        { id: "readme",   name: "README.md",          type: "file", icon: "📄" },
        { id: "deploy",   name: "deploy.sh",           type: "file", icon: "🚀" },
        { id: "auth_log", name: "auth_log.txt",        type: "file", icon: "🔐" },
        { id: "staff",    name: "staff_profiles.json", type: "file", icon: "👥" },
        { id: "incident", name: "incident_report.md",  type: "file", icon: "📋" },
        { id: "solve",    name: "SOLVE.sh",            type: "file", icon: "⚡" },
      ],
    },
  ],

  hints: [
    {
      isDone: (f) => f.has("readme"),
      text: "Open README.md for a case overview and the list of suspects.",
      action: { label: "Open README.md", fileId: "readme" },
    },
    {
      isDone: (f) => f.has("deploy"),
      text: "Open deploy.sh — the attack vector is a hardcoded password in a deployment script.",
      action: { label: "Open deploy.sh", fileId: "deploy" },
    },
    {
      isDone: (f) => f.has("auth_log"),
      text: "Open auth_log.txt — find who logged into the database at 2:17 AM and from which IP.",
      action: { label: "Open auth_log.txt", fileId: "auth_log" },
    },
    {
      isDone: (f) => f.has("staff"),
      text: "Open staff_profiles.json — match the login IP to a specific person's home address.",
      action: { label: "Open staff_profiles.json", fileId: "staff" },
    },
    {
      isDone: (_, c) => c.has("clue_ip_match"),
      text: "You have the IP match. That's your attacker. Open SOLVE.sh and file your accusation.",
      action: { label: "Open SOLVE.sh", fileId: "solve" },
    },
  ],

  files: [
    {
      id: "readme",
      name: "README.md",
      path: "CASE_0002/README.md",
      language: "markdown",
      icon: "📄",
      narration: "DeepStack Systems. A 2 AM database access that nobody authorized. 150,000 customer records, gone. The password was hiding in plain sight.",
      clues: [],
      suspiciousPatterns: [],
      content: `# CASE_0002 — Night Shift

**Difficulty:** EASY
**Status:** ACTIVE

---

## WHAT HAPPENED

On March 21st, 2024 at **2:17 AM**, someone accessed DeepStack Systems' production
database without authorization.

A full export of the \`customers\` table was performed — **150,000 records** downloaded
in 14 minutes. Data includes names, emails, hashed passwords, and billing addresses.

The attacker connected directly from a home IP address. No VPN. No legitimate reason
to be accessing production at 2 AM.

## THE ATTACK VECTOR

A database password was hardcoded in a comment inside a deployment script.
Someone found it — and used it.

---

## SUSPECTS

| Name | Role |
|------|------|
| **Casey Morris** | Systems Administrator (works on-call evenings) |
| **Sam Rivera**   | Backend Developer (last modified the deploy script) |

---

## HOW TO INVESTIGATE

1. **deploy.sh** — Find the hardcoded credential
2. **auth_log.txt** — Find who logged in at 2:17 AM and from where
3. **staff_profiles.json** — Match the login IP to a person
4. **incident_report.md** — See what IT security already knows
5. **SOLVE.sh** — File your accusation
`,
    },
    {
      id: "deploy",
      name: "deploy.sh",
      path: "CASE_0002/deploy.sh",
      language: "shell",
      icon: "🚀",
      narration: "A deployment script. Hundreds of lines of automation. And buried in the comments — a password that should never have been there.",
      clues: ["clue_db_password", "clue_sam_edited"],
      suspiciousPatterns: ["DB_PASS", "Deepst4ck_Pr0d_2024!", "temp hardcoded", "SAM"],
      content: `#!/bin/bash
# DeepStack Systems — Production Deployment Script
# Version: 3.2.1
# Last modified: 2024-03-18  (Sam Rivera)

ENVIRONMENT=\${1:-staging}
APP_DIR="/opt/deepstack"
LOG_FILE="/var/log/deploy.log"

echo "[\$(date)] Starting deployment to $ENVIRONMENT"

# ── Application config ──────────────────────────────────────────────────────
export APP_PORT=8080
export APP_ENV=$ENVIRONMENT

# ── Database connection ─────────────────────────────────────────────────────
# TODO: move to vault/secrets manager (ticket #DS-2847)
# temp hardcoded for emergency deploy on March 12th — SAM
export DB_HOST="db-prod-01.deepstack.internal"
export DB_PORT=5432
export DB_NAME="deepstack_production"
export DB_USER="deepstack_app"
export DB_PASS="Deepst4ck_Pr0d_2024!"   # ← hardcoded password

# ── Migrations ──────────────────────────────────────────────────────────────
echo "Running database migrations..."
npm run db:migrate -- --env $ENVIRONMENT

# ── Build ───────────────────────────────────────────────────────────────────
echo "Building application..."
npm run build

# ── Restart services ────────────────────────────────────────────────────────
echo "Restarting application services..."
systemctl restart deepstack-api
systemctl restart deepstack-worker

echo "[\$(date)] Deployment complete"

# EDUCATIONAL NOTE:
# Hardcoding credentials in scripts — even in comments — is a critical
# security vulnerability. Use environment variables, AWS Secrets Manager,
# HashiCorp Vault, or similar tools to manage secrets securely.
# Tools like 'detect-secrets' and 'trufflehog' scan git history for these.
`,
    },
    {
      id: "auth_log",
      name: "auth_log.txt",
      path: "CASE_0002/auth_log.txt",
      language: "plaintext",
      icon: "🔐",
      narration: "The authentication log. PostgreSQL records every login. The 2:17 AM entry stands out like a light in the dark — external IP, no VPN, a full table export.",
      clues: ["clue_2am_login", "clue_full_export"],
      suspiciousPatterns: ["2024-03-21 02:17", "98.44.21.156", "FLAGGED", "150,000", "COPY"],
      content: `================================================================================
DEEPSTACK SYSTEMS — AUTHENTICATION LOG
Database:  deepstack_production
Period:    2024-03-20  22:00  –  2024-03-21  05:00  UTC
Source:    PostgreSQL pg_log + VPN gateway
================================================================================

[2024-03-20 22:03:17]  LOGIN   user=deepstack_app   ip=10.0.1.45     method=cert       OK
  Note: Automated scheduled job (nightly backup — expected)

[2024-03-20 22:03:44]  LOGIN   user=casey.morris    ip=10.0.0.12     method=password   OK
  Note: IP 10.0.0.12 = Casey's office workstation
  Session: 12 min.  Queries: backup verification, table counts

[2024-03-21 02:17:09]  LOGIN   user=deepstack_app   ip=98.44.21.156  method=password   OK
  ⚠️  FLAGGED: External residential IP. 2:17 AM. Not a scheduled job.

[2024-03-21 02:17:11]  QUERY   SELECT * FROM customers LIMIT 150000 ORDER BY id
  Duration: 0.8s    Rows returned: 150,000

[2024-03-21 02:17:44]  QUERY   COPY (SELECT * FROM customers) TO '/tmp/export_2024.csv' CSV HEADER
  Duration: 13m 42s    Bytes written: 2.3 GB
  ⚠️  FULL TABLE EXPORT — all customer PII included

[2024-03-21 02:31:26]  LOGOUT  user=deepstack_app   ip=98.44.21.156
  Session duration: 14m 17s

================================================================================
VPN GATEWAY LOG (same window):
  No VPN connections from staff accounts between 02:00 – 03:00.
  Attacker connected directly from their home IP — no anonymization attempted.
================================================================================
`,
    },
    {
      id: "staff",
      name: "staff_profiles.json",
      path: "CASE_0002/staff_profiles.json",
      language: "json",
      icon: "👥",
      narration: "Staff profiles. Home IPs on file from the IT security database. One of these addresses matches the 2:17 AM login. All you have to do is look.",
      clues: ["clue_ip_match", "clue_casey_alibi"],
      suspiciousPatterns: ["98.44.21.156", "lastDeployScriptEdit", "2024-03-18"],
      content: `{
  "company": "DeepStack Systems",
  "generatedBy": "IT Security — Staff Profile Database",
  "employees": [
    {
      "id": "emp_001",
      "name": "Casey Morris",
      "role": "Systems Administrator",
      "workHours": "varies — on-call rotation, often works evenings",
      "workstationIP": "10.0.0.12",
      "homeIP": "71.120.88.44",
      "dbAccess": "admin",
      "deployScriptAccess": true,
      "lastLogin": "2024-03-20T22:03:44Z",
      "notes": "5 years at DeepStack. On-call March 20–21. Logged in at 10 PM for backup verification — routine."
    },
    {
      "id": "emp_002",
      "name": "Sam Rivera",
      "role": "Backend Developer",
      "workHours": "10:00 AM – 6:00 PM",
      "workstationIP": "10.0.1.88",
      "homeIP": "98.44.21.156",
      "dbAccess": "developer",
      "deployScriptAccess": true,
      "lastDeployScriptEdit": "2024-03-18",
      "notes": "Added DB_PASS to deploy.sh on March 18th for an emergency hotfix deployment."
    }
  ],
  "_detectiveNote": "Match homeIP values to the IP in auth_log.txt."
}
`,
    },
    {
      id: "incident",
      name: "incident_report.md",
      path: "CASE_0002/incident_report.md",
      language: "markdown",
      icon: "📋",
      narration: "The IT security report. They've done some of the work already. Read what they know — and what they're still missing.",
      clues: [],
      suspiciousPatterns: ["98.44.21.156", "Sam Rivera", "2024-03-18", "REDACTED"],
      content: `# INCIDENT REPORT — IR-2024-0089

**DeepStack Systems — IT Security**
**Date:** 2024-03-21    **Severity:** CRITICAL

## Summary

Unauthorized access to the production database at 02:17 AM on March 21st.
A full export of the \`customers\` table was performed (150,000 rows, 2.3 GB).

## Root Cause (Preliminary)

The \`deepstack_app\` database password was found in plaintext in \`deploy.sh\`.
This file was last modified by **Sam Rivera** on **2024-03-18**.

All engineers with GitHub access could have read this password.

## Attacker IP

The login originated from **98.44.21.156** — no VPN, direct connection.
This IP has appeared in previous legitimate login records.

\`[REDACTED — See forensics report for IP ownership details]\`

## Timeline

| Time | Event |
|------|-------|
| 2024-03-18 | Sam Rivera adds DB_PASS to deploy.sh (commit: d4f3c91) |
| 2024-03-21 02:17 | Unauthorized DB login from 98.44.21.156 |
| 2024-03-21 02:31 | Export complete, session ends |
| 2024-03-21 08:45 | Casey Morris discovers anomalous log entry |
| 2024-03-21 09:02 | This incident report opened |

## Actions

- [x] DB password rotated
- [x] deploy.sh credentials moved to vault
- [ ] Customer notification (GDPR 72h deadline approaching)
- [ ] Formal forensic analysis and prosecution referral
`,
    },
    {
      id: "solve",
      name: "SOLVE.sh",
      path: "CASE_0002/SOLVE.sh",
      language: "shell",
      icon: "⚡",
      narration: "The database password was in the script. The IP was in the logs. The match is in the staff profiles. Make your call.",
      clues: [],
      suspiciousPatterns: [],
      content: `#!/bin/bash
# NIGHTFALL DIVISION — ACCUSATION TERMINAL
# CASE_0002: Night Shift
#
# USAGE: accuse [casey|sam]
`,
    },
  ],
  forensicData: {
    dnaMatch: "MATCH FOUND: SAM_RIVERA_GENOTYPE (98.7%)",
    fingerprintMatch: "RIVERA_S_DB",
    terminalSecrets: ["db_admin", "deploy_hotfix"],
    phonePin: "0217",
    btcTarget: "0x984421156",
    voiceTargets: [
        { name: "Casey", stress: 22, status: "STABLE" },
        { name: "Sam", stress: 71, status: "UNSTABLE" },
    ],
    ipTarget: "98.44.21.156"
  },
  boardConfig: {
    layout: {
      db_password: { x: 50, y: 50, rotate: -2 },
      night_login: { x: 150, y: 250, rotate: 2 },
      sam_ip: { x: 450, y: 400, rotate: 0.5 },
      db_export: { x: 700, y: 120, rotate: -1.5 },
    },
    connectors: [
      ["db_password", "night_login"],
      ["night_login", "sam_ip"],
      ["db_export", "sam_ip"],
    ],
  }
};
