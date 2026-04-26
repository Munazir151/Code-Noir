import type { FullCase } from "./cases";

export const CASE_0012: FullCase = {
  id: "0012",
  caseNumber: "CASE_0012",
  title: "MongoDB Exposed",
  difficulty: "hard",
  isLocked: false,
  tagline: "A MongoDB instance exposed to the internet. A ransom note. Backups deleted 2 days before the attack.",
  victim: "DataVault Inc. — database encrypted for 5 BTC ransom",
  description: "A MongoDB instance was left exposed to the internet with default credentials. A ransomware group encrypted the database and demanded 5 BTC. The Database Admin had backup access but deleted all backups 2 days before the attack, then received 2.5 BTC to their crypto wallet.",
  introTitle: "MONGODB EXPOSED",
  introBody1: "No firewall. No authentication. Just waiting for someone to find it.",
  introBody2: "And when they did, the backups were already gone.",

  suspects: [
    {
      id: "carlos_devops",
      name: "Carlos Rivera",
      role: "DevOps Engineer, DataVault",
      emoji: "⚙️",
      terminalOutput: {
        evidence: [
          "✓ Carlos deployed MongoDB instance on Dec 1st.",
          "✓ MongoDB config shows bind_ip: 0.0.0.0 (exposed to internet).",
          "✓ Carlos followed deployment guide that was missing security steps.",
          "✗ Carlos was on vacation in Mexico Dec 10-17 (attack occurred Dec 12).",
          "✗ Carlos's crypto wallet shows no suspicious transactions.",
          "✗ Carlos helped with recovery efforts immediately upon return.",
        ],
        verdict: "WRONG SUSPECT",
        message: "Carlos Rivera made a deployment error by exposing MongoDB to the internet, but he was on vacation when the attack occurred and had no involvement in the ransom scheme. His deployment followed an incomplete guide from the DBA.",
      },
      verdictScreen: {
        type: "wrong",
        message: "Carlos Rivera deployed MongoDB with insecure settings, but this was due to following an incomplete deployment guide. He was in Cancun when the ransomware attack happened and his financial records show no connection to the ransom payment.",
      },
    },
    {
      id: "ransomware_group",
      name: "DarkCrypt Ransomware Group",
      role: "External Attackers",
      emoji: "💀",
      terminalOutput: {
        evidence: [
          "✓ DarkCrypt group encrypted the MongoDB database on Dec 12.",
          "✓ Ransom note demanded 5 BTC payment.",
          "✓ Group has history of similar attacks.",
          "✗ External group wouldn't have access to delete internal backups.",
          "✗ External group wouldn't know backup schedule.",
          "✗ Suspicious timing: backups deleted 2 days BEFORE attack suggests insider.",
        ],
        verdict: "WRONG SUSPECT",
        message: "DarkCrypt executed the ransomware attack, but they had inside help. An external group couldn't have deleted the internal backups 2 days in advance. The investigation focuses on the insider collaborator.",
      },
      verdictScreen: {
        type: "wrong",
        message: "DarkCrypt ransomware group performed the encryption attack, but the evidence points to an insider who deleted backups beforehand and received part of the ransom. The group is being pursued by law enforcement separately.",
      },
    },
    {
      id: "lisa_dba",
      name: "Lisa Chen",
      role: "Database Administrator, DataVault",
      emoji: "🗄️",
      terminalOutput: {
        evidence: [
          "✓ Lisa had exclusive access to backup systems.",
          "✓ Lisa deleted all backups on Dec 10 at 11:47 PM.",
          "✓ Deletion logs show 'maintenance cleanup' as reason (false).",
          "✓ Attack occurred Dec 12 - exactly 2 days after backup deletion.",
          "✓ Lisa was 'coincidentally' on vacation Dec 11-15 during the attack.",
          "✓ Lisa's crypto wallet received 2.5 BTC on Dec 13 (half the ransom).",
          "✓ Blockchain analysis links payment to same wallet that paid DarkCrypt.",
        ],
        verdict: "GUILTY",
        message: "Lisa Chen deleted all database backups 2 days before the ransomware attack, then conveniently went on vacation. She received exactly 2.5 BTC (half the 5 BTC ransom) the day after the company paid. Lisa coordinated with DarkCrypt to ensure maximum damage and split the ransom.",
      },
      verdictScreen: {
        type: "guilty",
        message: "Lisa Chen deleted all backups on December 10th, took vacation on December 11th, and received 2.5 BTC on December 13th - exactly half the ransom paid by DataVault. She was the insider who coordinated with DarkCrypt ransomware group, ensuring no recovery was possible without paying.",
      },
    },
  ],

  correctSuspectId: "lisa_dba",

  clues: [
    {
      id: "clue_exposed_mongodb",
      title: "MongoDB Exposed to Internet",
      description: "The mongodb.conf shows bind_ip: 0.0.0.0 with no authentication, making the database accessible from anywhere on the internet without credentials.",
      fileId: "mongodb_conf",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_backups_deleted",
      title: "All Backups Deleted Before Attack",
      description: "Backup deletion logs show Lisa Chen deleted all database backups on December 10th at 11:47 PM - exactly 2 days before the ransomware attack on December 12th.",
      fileId: "backup_deletion",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_lisa_vacation",
      title: "Suspiciously Timed Vacation",
      description: "Lisa Chen scheduled vacation December 11-15, starting the day after deleting backups and overlapping perfectly with the ransomware attack on December 12th.",
      fileId: "ransom_note",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_crypto_payment",
      title: "Lisa Received Half the Ransom",
      description: "Blockchain analysis shows Lisa's crypto wallet (verified via previous legitimate transactions) received 2.5 BTC on December 13th - exactly half of the 5 BTC ransom DataVault paid.",
      fileId: "crypto_wallet",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_payment_split",
      title: "Payment Trail Links to DarkCrypt",
      description: "The 2.5 BTC payment to Lisa came from the same intermediate wallet that received the ransom payment, proving coordination with the attackers.",
      fileId: "crypto_wallet",
      discovered: false,
      critical: true,
    },
  ],

  fileTree: [
    {
      id: "root",
      name: "evidence",
      type: "folder" as const,
      children: [
        { id: "readme", name: "README.md", type: "file" as const, icon: "📄" },
        { id: "mongodb_conf", name: "mongodb.conf", type: "file" as const, icon: "🗄️" },
        { id: "ransom_note", name: "ransom_note.txt", type: "file" as const, icon: "💀" },
        { id: "backup_deletion", name: "backup_deletion_log.txt", type: "file" as const, icon: "🗑️" },
        { id: "crypto_wallet", name: "crypto_wallet.log", type: "file" as const, icon: "₿" },
        { id: "solve", name: "SOLVE.sh", type: "file" as const, icon: "⚡" },
      ],
    },
  ],

  hints: [
    { isDone: (f) => f.has("readme"), text: "Read the incident report.", action: { label: "Open README.md", fileId: "readme" } },
    { isDone: (f) => f.has("mongodb_conf"), text: "Check the MongoDB configuration.", action: { label: "Review mongodb.conf", fileId: "mongodb_conf" } },
    { isDone: (f) => f.has("ransom_note"), text: "Read the ransom note.", action: { label: "Check ransom_note.txt", fileId: "ransom_note" } },
    { isDone: (f) => f.has("backup_deletion"), text: "Review backup deletion logs.", action: { label: "Read backup_deletion_log.txt", fileId: "backup_deletion" } },
    { isDone: (f) => f.has("crypto_wallet"), text: "Analyze cryptocurrency transactions.", action: { label: "Check crypto_wallet.log", fileId: "crypto_wallet" } },
    { isDone: (f) => f.has("solve"), text: "Solve the case.", action: { label: "Execute SOLVE.sh", fileId: "solve" } },
  ],

  files: [
    {
      id: "readme",
      name: "README.md",
      path: "evidence/README.md",
      language: "markdown",
      icon: "📄",
      narration: "The incident report. A ransomware attack with no backups to restore from.",
      clues: [],
      suspiciousPatterns: [],
      content: `# Incident Report: MongoDB Ransomware Attack

**Date**: December 12, 2024
**Reporter**: Security Team, DataVault Inc.
**Severity**: CRITICAL

## Summary

On December 12, 2024 at 3:47 AM, DataVault's production MongoDB database was encrypted by ransomware. A ransom note demanded 5 BTC (~$215,000) for the decryption key. All backup systems were found to be empty - backups had been deleted 2 days prior.

## Attack Timeline

**December 1, 2024**
- DevOps engineer Carlos Rivera deploys new MongoDB instance
- Instance exposed to internet with no authentication (configuration error)

**December 10, 2024 - 11:47 PM**
- All database backups deleted from backup server
- Deletion performed by: lisa.chen@datavault.io
- Reason logged: "Routine maintenance cleanup"

**December 11, 2024**
- Lisa Chen begins scheduled vacation (Dec 11-15)
- Destination: Hawaii

**December 12, 2024 - 3:47 AM**
- MongoDB database encrypted by ransomware
- Ransom note left in database: "PAY 5 BTC OR LOSE EVERYTHING"
- Recovery team discovers all backups missing

**December 12, 2024 - 9:00 AM**
- Emergency response team assembled
- CEO attempts to contact Lisa Chen (on vacation, slow to respond)
- Recovery attempts fail - no backups available

**December 12, 2024 - 5:00 PM**
- CEO authorizes ransom payment (no other option)
- 5 BTC paid to attacker's wallet

**December 13, 2024 - 1:30 AM**
- Decryption key received
- Database restored from encrypted state

## Suspicious Circumstances

1. **Perfect Timing**: Backups deleted exactly 2 days before attack
2. **Vacation Timing**: Lisa on vacation during the attack
3. **No Backup Verification**: Lisa never tested backup restoration
4. **False Deletion Reason**: "Maintenance cleanup" was not scheduled
5. **Crypto Trail**: Blockchain analysis shows suspicious payment to Lisa's wallet

## Investigation Questions

1. Who deleted the backups and why?
2. Was this an inside job coordinated with external attackers?
3. Why did Lisa go on vacation immediately after deleting backups?

## Evidence Files

1. **mongodb.conf** - MongoDB configuration showing exposure
2. **ransom_note.txt** - The attackers' demands
3. **backup_deletion_log.txt** - Logs of backup deletion
4. **crypto_wallet.log** - Cryptocurrency transaction analysis
`,
    },
    {
      id: "mongodb_conf",
      name: "mongodb.conf",
      path: "evidence/mongodb.conf",
      language: "conf",
      icon: "🗄️",
      narration: "MongoDB configuration. Bound to all interfaces with no authentication.",
      clues: ["clue_exposed_mongodb"],
      suspiciousPatterns: ["bind_ip.*0\\.0\\.0\\.0", "security:.*authorization: disabled"],
      content: `# MongoDB Configuration File
# Deployed: December 1, 2024
# Deployed by: Carlos Rivera (DevOps)
# Instance: mongodb-prod-01.datavault.io

# Network Configuration
net:
  port: 27017
  bind_ip: 0.0.0.0  # WARNING: Exposed to internet!

# Storage
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true

# Security
security:
  authorization: disabled  # WARNING: No authentication!

# Replication
replication:
  replSetName: "datavault-prod"

# Logging
systemLog:
  destination: file
  path: /var/log/mongodb/mongod.log
  logAppend: true

# DEPLOYMENT NOTES
# Configured by Carlos Rivera following Lisa Chen's deployment guide
# Guide was missing critical security steps:
#   - Should have bind_ip: 127.0.0.1 (localhost only)
#   - Should have authorization: enabled
#   - Should have firewall rules restricting access
#
# Lisa Chen (DBA) provided the deployment guide to Carlos
# Guide stated: "For initial setup, use open configuration for testing"
# Guide claimed: "Security will be added in Phase 2"
# Phase 2 was never executed

# SECURITY VULNERABILITIES
# 1. bind_ip: 0.0.0.0 = Accessible from ANYWHERE on internet
# 2. authorization: disabled = No username/password required
# 3. No firewall rules = Port 27017 open to world
#
# Result: Anyone who discovers this MongoDB instance can:
#   - Read all data
#   - Modify all data
#   - Delete all data
#   - Encrypt all data (ransomware)

# Instance was discovered by DarkCrypt ransomware group using
# automated internet scanning tools (Shodan, Censys, etc.)
`,
    },
    {
      id: "ransom_note",
      name: "ransom_note.txt",
      path: "evidence/ransom_note.txt",
      language: "plaintext",
      icon: "💀",
      narration: "The ransom note. Pay 5 BTC or lose everything.",
      clues: ["clue_lisa_vacation"],
      suspiciousPatterns: ["5 BTC", "We encrypted"],
      content: `═══════════════════════════════════════════════════════════
                    DARKCRYPT RANSOMWARE
                  YOUR DATABASE IS ENCRYPTED
═══════════════════════════════════════════════════════════

We encrypted your MongoDB database at:
  mongodb-prod-01.datavault.io:27017

Database name: datavault_production
Collections encrypted: 47
Total documents: 8,429,847
Data size: 2.4 TB

═══════════════════════════════════════════════════════════
YOUR BACKUPS ARE GONE
═══════════════════════════════════════════════════════════

Don't bother looking for backups. We checked.
Your backup server is empty. :)

Last backup deletion: December 10, 2024 at 11:47 PM
All 90 days of backups: DELETED

You cannot restore without our decryption key.

═══════════════════════════════════════════════════════════
PAYMENT INSTRUCTIONS
═══════════════════════════════════════════════════════════

Send exactly 5 BTC to this address:
bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh

Payment deadline: 72 hours from encryption
Current time: December 12, 2024 03:47 AM UTC
Deadline: December 15, 2024 03:47 AM UTC

After payment, email: darkcrypt-recovery@protonmail.com
Include transaction ID and your database identifier: DV-8429847

═══════════════════════════════════════════════════════════
PRICE INCREASES
═══════════════════════════════════════════════════════════

First 24 hours: 5 BTC
24-48 hours: 7.5 BTC
48-72 hours: 10 BTC
After 72 hours: Database deleted permanently

Pay fast, pay less.

═══════════════════════════════════════════════════════════
DO NOT TRY TO RECOVER WITHOUT PAYING
═══════════════════════════════════════════════════════════

- Do not attempt decryption yourself (will corrupt data)
- Do not hire "recovery experts" (they will fail and charge you)
- Do not contact law enforcement (we will delete the key)
- Do not restore from backups (you don't have any lol)

Your ONLY option is to pay. We are professional and will
provide the decryption key after payment.

Previous clients can confirm: We always deliver after payment.

═══════════════════════════════════════════════════════════
HOW WE FOUND YOU
═══════════════════════════════════════════════════════════

Your MongoDB was exposed to the internet with no password.
We found it using automated scanners.

bind_ip: 0.0.0.0 ← LOL
authorization: disabled ← LOL LOL

Hire better DevOps next time.

═══════════════════════════════════════════════════════════

DarkCrypt Ransomware Group
"We Encrypt, You Pay, We Decrypt"

═══════════════════════════════════════════════════════════

SECURITY TEAM NOTES (Added during investigation):

Ransom note appeared: December 12, 2024 at 03:45 AM
Payment authorized by CEO: December 12, 2024 at 5:00 PM
Payment sent: December 12, 2024 at 5:23 PM (5 BTC)
Decryption key received: December 13, 2024 at 1:30 AM
Database restored: December 13, 2024 at 6:45 AM

Note in ransom message: "Your backup server is empty"
This suggests attackers had intelligence about backup deletion.
External attackers wouldn't know about internal backup schedules.

Lisa Chen vacation timeline:
- Deleted backups: Dec 10 (night)
- Started vacation: Dec 11 (morning)
- Attack occurred: Dec 12 (early morning)
- Ransom paid: Dec 12 (evening)
- Lisa's wallet received payment: Dec 13 (early morning)

Timing is too perfect to be coincidence.
`,
    },
    {
      id: "backup_deletion",
      name: "backup_deletion_log.txt",
      path: "evidence/backup_deletion_log.txt",
      language: "log",
      icon: "🗑️",
      narration: "Backup deletion logs. Lisa deleted everything 2 days before the attack.",
      clues: ["clue_backups_deleted"],
      suspiciousPatterns: ["lisa\\.chen", "December 10.*23:47", "90 backup files deleted"],
      content: `# DataVault Backup System - Deletion Log
# Backup Server: backup-01.datavault.io

═══════════════════════════════════════════════════════════
BACKUP DELETION EVENT - DECEMBER 10, 2024
═══════════════════════════════════════════════════════════

[2024-12-10 23:47:18] USER LOGIN
  User: lisa.chen@datavault.io
  IP: 198.51.100.44 (VPN connection from home)
  Method: SSH with valid credentials
  Authentication: SUCCESS

[2024-12-10 23:47:45] COMMAND EXECUTED
  User: lisa.chen
  Command: ls -lh /backups/mongodb/
  Output: 90 backup files (30 daily + 30 weekly + 30 monthly)
  Total size: 4.7 TB

[2024-12-10 23:48:12] COMMAND EXECUTED
  User: lisa.chen
  Command: rm -rf /backups/mongodb/*
  Confirmation prompt: "Delete 90 files (4.7 TB)? [y/N]"
  Response: y

[2024-12-10 23:48:15] WARNING
  System: Are you sure? This will delete ALL MongoDB backups.
  User response: yes

[2024-12-10 23:48:18] DELETION IN PROGRESS
  Deleting: datavault_mongodb_backup_2024-09-11.tar.gz (52 GB)
  Deleting: datavault_mongodb_backup_2024-09-12.tar.gz (53 GB)
  Deleting: datavault_mongodb_backup_2024-09-13.tar.gz (51 GB)
  [...87 more files...]
  Deleting: datavault_mongodb_backup_2024-12-09.tar.gz (54 GB)

[2024-12-10 23:52:33] DELETION COMPLETE
  Files deleted: 90
  Space freed: 4.7 TB
  Time taken: 4 minutes 15 seconds

[2024-12-10 23:52:45] AUDIT LOG ENTRY
  User: lisa.chen
  Action: DELETE_ALL_BACKUPS
  Target: /backups/mongodb/*
  Reason entered: "Routine maintenance cleanup"
  Supervisor approval: NONE (DBA has autonomous authority)

[2024-12-10 23:53:02] EMAIL NOTIFICATION SENT
  To: backup-alerts@datavault.io
  Subject: [BACKUP SYSTEM] All MongoDB backups deleted
  Body:
    User lisa.chen deleted 90 MongoDB backup files (4.7 TB)
    Reason: Routine maintenance cleanup
    Timestamp: 2024-12-10 23:52:33 UTC

[2024-12-10 23:53:15] USER LOGOUT
  User: lisa.chen
  Session duration: 5 minutes 57 seconds

═══════════════════════════════════════════════════════════
BACKUP SCHEDULE (Prior to Deletion)
═══════════════════════════════════════════════════════════

Daily backups: 30 days retention
Weekly backups: 30 weeks retention (7.5 months)
Monthly backups: 30 months retention (2.5 years)

Last successful backup: December 9, 2024 at 11:00 PM
Next scheduled backup: December 11, 2024 at 11:00 PM

Backup deletion occurred BETWEEN scheduled backups.
This left a 48-hour window with NO backups available.

═══════════════════════════════════════════════════════════
ANALYSIS OF "ROUTINE MAINTENANCE CLEANUP"
═══════════════════════════════════════════════════════════

Investigation of Lisa Chen's claim:

1. No scheduled maintenance on Dec 10
   - Maintenance calendar: Empty for December 10
   - No tickets filed for backup cleanup
   - No approval from management

2. No policy requires backup deletion
   - DataVault backup retention policy: Keep 90 days minimum
   - Current backups: Within retention policy
   - No reason to delete active backups

3. No communication about maintenance
   - No email to team about planned deletion
   - No Slack message about maintenance window
   - No documentation of maintenance activity

4. Unusual timing
   - Performed at 11:47 PM (late night)
   - Performed from home IP via VPN
   - Performed before starting vacation next day

5. No backup verification first
   - Best practice: Verify backups before deletion
   - Lisa did not test any backup restoration
   - Lisa did not verify alternate backup sources

CONCLUSION: "Routine maintenance cleanup" was a false justification.
This was deliberate deletion of all backups before ransomware attack.

═══════════════════════════════════════════════════════════
EMAIL THAT WAS IGNORED
═══════════════════════════════════════════════════════════

The automated alert email was sent to backup-alerts@datavault.io
This email alias goes to:
  - lisa.chen@datavault.io (primary DBA)
  - carlos.rivera@datavault.io (DevOps)
  - security-team@datavault.io (Security team)

Lisa received her own deletion alert email.
Carlos was on vacation (Dec 10-17, no email access).
Security team mailbox had 2,847 unread alerts (alert fatigue).

No one noticed the backup deletion until the ransomware attack.

═══════════════════════════════════════════════════════════
TIMELINE CORRELATION
═══════════════════════════════════════════════════════════

Dec 10, 11:47 PM - Lisa deletes all backups
Dec 11, 9:00 AM - Lisa starts vacation to Hawaii
Dec 12, 3:47 AM - Ransomware attack (38 hours after deletion)
Dec 12, 9:00 AM - Team discovers no backups available
Dec 12, 5:00 PM - CEO pays 5 BTC ransom
Dec 13, 1:30 AM - Lisa's crypto wallet receives 2.5 BTC

The timing proves coordination between Lisa and DarkCrypt.
`,
    },
    {
      id: "crypto_wallet",
      name: "crypto_wallet.log",
      path: "evidence/crypto_wallet.log",
      language: "log",
      icon: "₿",
      narration: "Cryptocurrency transaction logs. Lisa received exactly half the ransom.",
      clues: ["clue_crypto_payment", "clue_payment_split"],
      suspiciousPatterns: ["2\\.5 BTC.*lisa-chen-wallet", "Split payment.*50%"],
      content: `# Cryptocurrency Transaction Analysis
# Blockchain Forensics Report
# Analyst: Law Enforcement Cyber Crimes Unit

═══════════════════════════════════════════════════════════
RANSOM PAYMENT FLOW
═══════════════════════════════════════════════════════════

[Transaction 1] DataVault Pays Ransom
Date: December 12, 2024 at 5:23 PM UTC
From: bc1q3kj2hf9gd8sh4jk2hf9gd8sh4jk2hf9gd8sh4jk2 (DataVault corporate wallet)
To: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh (DarkCrypt ransom address)
Amount: 5.0 BTC
USD Value: $215,000
Transaction ID: 7f8e9d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a
Confirmations: 6
Status: CONFIRMED

[Transaction 2] DarkCrypt Moves Funds to Mixer
Date: December 12, 2024 at 6:15 PM UTC
From: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh (DarkCrypt)
To: bc1q8djh3k9fh2jd8djh3k9fh2jd8djh3k9fh2jd8djh (Mixing service)
Amount: 5.0 BTC
Purpose: Obfuscate transaction trail

[Transaction 3] Funds Split After Mixing
Date: December 12, 2024 at 11:47 PM UTC
From: bc1q8djh3k9fh2jd8djh3k9fh2jd8djh3k9fh2jd8djh (Mixer)
To Multiple Addresses:
  → bc1qfj3k8dh2jf9gh4kf3j8dh2jf9gh4kf3j8dh2jf9g (2.5 BTC) - DarkCrypt main wallet
  → bc1q4k7j2hf9gd3sh8j4k7j2hf9gd3sh8j4k7j2hf9gd (2.5 BTC) - Unknown wallet

Split: Exactly 50/50 (2.5 BTC each)

═══════════════════════════════════════════════════════════
TRACING THE UNKNOWN WALLET
═══════════════════════════════════════════════════════════

Unknown Wallet: bc1q4k7j2hf9gd3sh8j4k7j2hf9gd3sh8j4k7j2hf9gd

[Transaction 4] Payment to Lisa Chen
Date: December 13, 2024 at 1:22 AM UTC
From: bc1q4k7j2hf9gd3sh8j4k7j2hf9gd3sh8j4k7j2hf9gd (Unknown)
To: bc1qm8n7j6k5h4g3f2d1s9a8z7x6c5v4b3n2m1l0k9j8 (Lisa's wallet)
Amount: 2.5 BTC
USD Value: $107,500

═══════════════════════════════════════════════════════════
LISA CHEN'S WALLET VERIFICATION
═══════════════════════════════════════════════════════════

Wallet Address: bc1qm8n7j6k5h4g3f2d1s9a8z7x6c5v4b3n2m1l0k9j8

Previous transactions linked to Lisa Chen:

[2024-08-15] Coinbase withdrawal to this address
  - Coinbase account: lisa.chen.personal@gmail.com
  - KYC verified: Lisa Chen, DOB 1989-03-22
  - Amount: 0.5 BTC

[2024-09-22] HackerOne bug bounty payment
  - Payment from HackerOne platform
  - Recipient: lisa_chen_sec (Lisa's HackerOne handle)
  - Amount: 0.3 BTC
  - Bug report #847293 (MongoDB security finding, ironically)

[2024-10-30] Personal Bitcoin purchase
  - Purchased from Kraken exchange
  - Account: lisa.chen@datavault.io
  - Amount: 1.0 BTC

[2024-12-13] SUSPICIOUS PAYMENT
  - From unknown wallet (ransomware split)
  - Amount: 2.5 BTC
  - Received 8 hours after DataVault paid ransom

WALLET CONFIRMED AS BELONGING TO LISA CHEN

═══════════════════════════════════════════════════════════
PAYMENT TIMELINE
═══════════════════════════════════════════════════════════
EVIDENCE SUMMARY
═══════════════════════════════════════════════════════════

Lisa Chen's Coordination with DarkCrypt:

1. ✓ Lisa deleted all backups Dec 10 (cleared recovery path)
2. ✓ Lisa started vacation Dec 11 (alibi during attack)
3. ✓ Attack happened Dec 12 (ransomware encrypted database)
4. ✓ Company forced to pay Dec 12 (no backup alternative)
5. ✓ Lisa received 2.5 BTC Dec 13 (exactly 50% of ransom)
6. ✓ Payment came from same mixing wallet (proof of coordination)

This was an inside job. Lisa was the insider who:
- Ensured no backups existed (deleted them)
- Coordinated attack timing (vacation alibi)
- Received half the ransom payment (2.5 BTC = $107,500)

═══════════════════════════════════════════════════════════

LAW ENFORCEMENT CONCLUSION:

Lisa Chen coordinated with DarkCrypt ransomware group to:
1. Delete all database backups
2. Ensure MongoDB remained exposed (told Carlos incomplete guide)
3. Provide attack timing to DarkCrypt
4. Take vacation during attack for alibi
5. Collect 50% of ransom payment

Charges recommended:
- Computer fraud and abuse
- Wire fraud
- Conspiracy to commit extortion
- Theft of trade secrets

Evidence strength: OVERWHELMING
`,
    },
    {
      id: "solve",
      name: "SOLVE.sh",
      path: "evidence/SOLVE.sh",
      language: "bash",
      icon: "⚡",
      narration: "Who coordinated with the ransomware group? Run this to solve the case.",
      clues: [],
      suspiciousPatterns: [],
      content: `#!/bin/bash
# Case 0012: MongoDB Exposed
# Identify the insider who coordinated with the ransomware group

echo "Who deleted the backups and coordinated with DarkCrypt ransomware group?"
echo ""
echo "Choose suspect:"
echo "1) Carlos Rivera (DevOps Engineer)"
echo "2) DarkCrypt Ransomware Group (External)"
echo "3) Lisa Chen (Database Administrator)"
`,
    },
  ],
  boardConfig: {
    layout: {
      backups_purged: { x: 50, y: 50, rotate: -2 },
      vacation_alibi: { x: 150, y: 250, rotate: 2 },
      ransom_split: { x: 450, y: 400, rotate: 0.5 },
      mongo_exposed: { x: 700, y: 120, rotate: -1.5 },
    },
    connectors: [
      ["backups_purged", "ransom_split"],
      ["vacation_alibi", "ransom_split"],
      ["mongo_exposed", "ransom_split"],
    ],
  },
  forensicData: {
    dnaMatch: "MATCH FOUND: CHEN_L_GENOTYPE (99.8%)",
    fingerprintMatch: "LISA_DB_PURGE",
    terminalSecrets: ["ransom_decrypt", "shadow_backup"],
    phonePin: "0345",
    btcTarget: "bc1qm8n7j6k5h4g3f2d1s9a8z7x6c5v4b3n2m1l0k9j8",
    voiceTargets: [
        { name: "Carlos", stress: 12, status: "STABLE" },
        { name: "Lisa", stress: 89, status: "DECEPTION_LIKELY" },
    ],
    ipTarget: "198.51.100.23"
  }
};

export default CASE_0012;
