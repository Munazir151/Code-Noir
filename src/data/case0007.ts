import type { FullCase } from "./cases";

export const CASE_0007: FullCase = {
  id: "0007",
  caseNumber: "CASE_0007",
  title: "Git Revert",
  difficulty: "medium",
  isLocked: false,
  tagline: "A force-push to main. A deleted commit. Evidence of fraud erased from history.",
  victim: "FinTrack Solutions — financial fraud evidence destroyed",
  description: "Someone force-pushed to the main branch, deleting a commit that contained evidence of financial manipulation. Git reflog recovered the deleted commit, revealing who tried to cover their tracks.",
  introTitle: "GIT REVERT",
  introBody1: "Git never forgets. Even when you rewrite history.",
  introBody2: "The reflog remembers everything.",

  suspects: [
    {
      id: "marcus_dev",
      name: "Marcus Chen",
      role: "Senior Developer, FinTrack",
      emoji: "👨‍💻",
      terminalOutput: {
        evidence: [
          "✓ Marcus has force-push rights to main branch (senior dev privilege).",
          "✓ Git reflog shows force-push from marcus.chen@fintrack.io on Oct 15 at 11:47 PM.",
          "✓ Deleted commit contained audit trail implicating 'M.Chen' in invoice manipulation.",
          "✓ Slack messages show Marcus panicking: 'how do I undo a commit' at 11:32 PM.",
          "✓ Marcus's code review added the fraudulent invoice processing logic in August.",
          "✓ Financial records show Marcus received $47,000 in 'consulting fees' from shell company.",
        ],
        verdict: "GUILTY",
        message: "Marcus Chen committed financial fraud by manipulating invoice processing code to redirect payments. When an auditor discovered and documented the fraud in a commit, Marcus used his force-push privileges to delete the evidence from git history. The reflog and Slack messages prove his guilt.",
      },
      verdictScreen: {
        type: "guilty",
        message: "Marcus Chen manipulated invoice processing code to embezzle $47,000. When the auditor's commit exposed him, Marcus force-pushed to main at 11:47 PM to delete the evidence. His Slack panic messages and the recovered commit both name him as the perpetrator.",
      },
    },
    {
      id: "sarah_cto",
      name: "Sarah Mitchell",
      role: "CTO, FinTrack",
      emoji: "👩‍💼",
      terminalOutput: {
        evidence: [
          "✓ Sarah has full repository access and force-push rights.",
          "✗ Sarah was at a conference in Boston October 14-16 (travel records confirm).",
          "✗ Git reflog shows force-push from marcus.chen@fintrack.io, not Sarah.",
          "✗ Sarah initiated the financial audit that uncovered the fraud.",
          "✗ Sarah has no connection to the shell company that received payments.",
          "✗ Sarah ordered the git forensics investigation.",
        ],
        verdict: "WRONG SUSPECT",
        message: "Sarah Mitchell has the technical ability to force-push, but she was traveling during the incident and the git logs clearly show Marcus's email. Sarah initiated the audit that exposed the fraud in the first place.",
      },
      verdictScreen: {
        type: "wrong",
        message: "Sarah Mitchell has admin access to the repository, but she was at TechLeadConf in Boston when the force-push occurred. The git reflog shows Marcus Chen's email, not hers. Sarah discovered the fraud and ordered the investigation.",
      },
    },
    {
      id: "diana_auditor",
      name: "Diana Lopez",
      role: "Financial Auditor, FinTrack",
      emoji: "📊",
      terminalOutput: {
        evidence: [
          "✓ Diana discovered the invoice manipulation during routine audit.",
          "✓ Diana created the commit documenting the fraud (commit hash: a3f2e1d).",
          "✓ Diana's commit message: 'AUDIT FINDING: Invoice manipulation by M.Chen'.",
          "✗ Diana has READ-ONLY repository access (cannot force-push).",
          "✗ Diana reported the missing commit to Sarah Mitchell immediately.",
          "✗ Diana's Slack messages show confusion about the deleted commit, not guilt.",
        ],
        verdict: "WRONG SUSPECT",
        message: "Diana Lopez discovered the fraud and documented it in a commit. She has read-only access and cannot force-push. She's the whistleblower, not the criminal.",
      },
      verdictScreen: {
        type: "wrong",
        message: "Diana Lopez is the auditor who found and documented the fraud. She has read-only git access and couldn't have force-pushed even if she wanted to. She immediately reported the deleted commit to management.",
      },
    },
  ],

  correctSuspectId: "marcus_dev",

  clues: [
    {
      id: "clue_force_push",
      title: "Force-Push from Marcus's Account",
      description: "Git reflog shows a force-push to main branch on October 15 at 11:47 PM from marcus.chen@fintrack.io, rewriting history to remove commit a3f2e1d.",
      fileId: "git_reflog",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_fraud_evidence",
      title: "Deleted Commit Names Marcus",
      description: "The recovered commit contains audit documentation showing 'M.Chen' manipulated invoice processing code to redirect payments to a shell company.",
      fileId: "deleted_commit",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_slack_panic",
      title: "Marcus's Panic Messages",
      description: "Slack messages show Marcus asking 'how do I undo a commit' and 'can I delete something from git' at 11:32 PM - 15 minutes before the force-push.",
      fileId: "slack_export",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_shell_company",
      title: "Payments to Shell Company",
      description: "Bank records show $47,000 in fraudulent payments went to 'TechConsult LLC', which is registered to Marcus Chen's brother-in-law.",
      fileId: "deleted_commit",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_diana_readonly",
      title: "Diana Has No Push Access",
      description: "Diana Lopez has read-only repository permissions. She physically cannot force-push or modify git history.",
      fileId: "readme",
      discovered: false,
      critical: false,
    },
  ],

  fileTree: [
    {
      id: "root",
      name: "evidence",
      type: "folder" as const,
      children: [
        { id: "readme", name: "README.md", type: "file" as const, icon: "📄" },
        { id: "git_reflog", name: "git_reflog.log", type: "file" as const, icon: "🔀" },
        { id: "deleted_commit", name: "deleted_commit.txt", type: "file" as const, icon: "🗑️" },
        { id: "slack_export", name: "slack_export.json", type: "file" as const, icon: "💬" },
        { id: "solve", name: "SOLVE.sh", type: "file" as const, icon: "⚡" },
      ],
    },
  ],

  hints: [
    { isDone: (f) => f.has("readme"), text: "Read the incident report to understand what happened.", action: { label: "Open README.md", fileId: "readme" } },
    { isDone: (f) => f.has("git_reflog"), text: "Check the git reflog to see who force-pushed.", action: { label: "Examine git_reflog.log", fileId: "git_reflog" } },
    { isDone: (f) => f.has("deleted_commit"), text: "Review the deleted commit to see what was hidden.", action: { label: "Read deleted_commit.txt", fileId: "deleted_commit" } },
    { isDone: (f) => f.has("slack_export"), text: "Check Slack messages for suspicious behavior.", action: { label: "Review slack_export.json", fileId: "slack_export" } },
    { isDone: (f) => f.has("solve"), text: "Identify the culprit and run the solve script.", action: { label: "Execute SOLVE.sh", fileId: "solve" } },
  ],

  files: [
    {
      id: "readme",
      name: "README.md",
      path: "evidence/README.md",
      language: "markdown",
      icon: "📄",
      narration: "The incident report. Someone deleted a commit containing fraud evidence.",
      clues: ["clue_diana_readonly"],
      suspiciousPatterns: [],
      content: `# Incident Report: Git History Manipulation

**Date**: October 16, 2024
**Reporter**: Sarah Mitchell, CTO
**Severity**: CRITICAL

## Summary

On October 16, 2024 at 8:15 AM, Financial Auditor Diana Lopez reported that a critical commit documenting financial fraud had disappeared from the main branch of the FinTrack repository. Git forensics revealed a force-push had rewritten history to delete the evidence.

## Background: Financial Audit

**October 10, 2024**
- CFO requests routine audit of invoice processing system
- Diana Lopez assigned to review transaction logs and code

**October 14, 2024 - 4:30 PM**
- Diana discovers irregularities in invoice processing
- Invoices over $5,000 being redirected to unauthorized account
- Code modification traced to commit from August 12, 2024

**October 14, 2024 - 5:45 PM**
- Diana creates commit documenting findings
- Commit hash: a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8
- Commit message: "AUDIT FINDING: Invoice manipulation by M.Chen"
- Pushes to main branch for executive review

## The Deletion

**October 15, 2024 - 11:47 PM**
- Force-push detected on main branch
- Commit a3f2e1d and 3 subsequent commits removed from history
- Branch HEAD moved back to earlier commit
- Git history rewritten to eliminate audit evidence

**October 16, 2024 - 8:15 AM**
- Diana arrives at office, discovers her commit is missing
- Reports to CTO Sarah Mitchell immediately
- Emergency git forensics investigation begins

## Git Forensics Recovery

Using \`git reflog\`, the security team recovered:
- The deleted audit commit (a3f2e1d)
- Evidence of force-push operation
- Email address of person who performed the force-push
- Timestamp of the history rewriting

## Repository Access Levels

**Force-Push Privileges** (can rewrite history):
- Sarah Mitchell (CTO) - Full admin access
- Marcus Chen (Senior Developer) - Trusted senior dev privileges

**Read-Only Access**:
- Diana Lopez (Auditor) - Can view and clone, cannot push
- Junior developers - Standard push access (no force)

## Investigation Questions

1. Who performed the force-push at 11:47 PM on October 15?
2. Why did they delete the audit evidence?
3. Is this person connected to the financial fraud?

## Evidence Files

1. **git_reflog.log** - Git reflog showing force-push details
2. **deleted_commit.txt** - Recovered commit with fraud evidence
3. **slack_export.json** - Slack messages from October 15 evening

## Status

Investigation ongoing. Deleted commit has been recovered and preserved. Financial fraud investigation running in parallel.
`,
    },
    {
      id: "git_reflog",
      name: "git_reflog.log",
      path: "evidence/git_reflog.log",
      language: "log",
      icon: "🔀",
      narration: "Git reflog showing the force-push. Someone tried to rewrite history.",
      clues: ["clue_force_push"],
      suspiciousPatterns: ["marcus.chen@fintrack.io", "force-push", "2024-10-15 23:47"],
      content: `# Git Reflog - FinTrack Repository (main branch)
# Forensic recovery performed October 16, 2024

# ============================================
# CURRENT STATE (after force-push)
# ============================================

7c8d9e0 HEAD@{0} reset: moving to 7c8d9e0f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6
7c8d9e0 HEAD@{1} commit: Update dependencies to latest versions
6b7c8d9 HEAD@{2} commit: Refactor payment processing module
5a6b7c8 HEAD@{3} commit: Add unit tests for invoice validation

# ============================================
# FORCE-PUSH EVENT - OCTOBER 15, 11:47 PM
# ============================================

# WARNING: History rewrite detected
# Operation: git push --force origin main
# Author: marcus.chen@fintrack.io
# Timestamp: 2024-10-15 23:47:18 -0700
# IP Address: 198.51.100.73 (Marcus Chen's home IP)

a3f2e1d HEAD@{4} commit (DELETED): AUDIT FINDING: Invoice manipulation by M.Chen
8f9a0b1 HEAD@{5} commit (DELETED): Add logging to payment processing
2d3e4f5 HEAD@{6} commit (DELETED): Fix invoice validation edge case
1c2d3e4 HEAD@{7} commit (DELETED): Update invoice schema

# The above 4 commits were REMOVED from main branch history
# Force-push moved HEAD from a3f2e1d back to 7c8d9e0

# ============================================
# FORCE-PUSH COMMAND (from server logs)
# ============================================

[2024-10-15 23:47:18] Git operation: PUSH --force
  User: marcus.chen@fintrack.io
  Remote: origin
  Branch: main
  Old HEAD: a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8
  New HEAD: 7c8d9e0f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6
  Commits deleted: 4
  Commits rewritten: 0
  Source IP: 198.51.100.73
  Authentication: SSH key (marcus_work_laptop)

# ============================================
# TIMELINE BEFORE FORCE-PUSH
# ============================================

# October 14, 2024 - Normal commit history

a3f2e1d HEAD@{8} commit: AUDIT FINDING: Invoice manipulation by M.Chen
  Author: Diana Lopez <diana.lopez@fintrack.io>
  Date: Tue Oct 14 17:45:22 2024 -0700

  Documented evidence of financial fraud discovered during
  routine audit. See commit diff for full details.

8f9a0b1 HEAD@{9} commit: Add logging to payment processing
  Author: Marcus Chen <marcus.chen@fintrack.io>
  Date: Mon Oct 13 14:22:15 2024 -0700

2d3e4f5 HEAD@{10} commit: Fix invoice validation edge case
  Author: Marcus Chen <marcus.chen@fintrack.io>
  Date: Thu Oct 9 11:30:44 2024 -0700

7c8d9e0 HEAD@{11} commit: Update dependencies to latest versions
  Author: Sarah Mitchell <sarah.mitchell@fintrack.io>
  Date: Wed Oct 8 16:15:33 2024 -0700

# ============================================
# EARLIER HISTORY (still intact)
# ============================================

6b7c8d9 HEAD@{12} commit: Refactor payment processing module
  Author: Marcus Chen <marcus.chen@fintrack.io>
  Date: Tue Sep 22 10:45:00 2024 -0700

5a6b7c8 HEAD@{13} commit: Add unit tests for invoice validation
  Author: Diana Lopez <diana.lopez@fintrack.io>
  Date: Mon Sep 15 14:20:00 2024 -0700

# ============================================
# SUSPICIOUS COMMIT (from August - fraud origin)
# ============================================

4f5e6d7 HEAD@{24} commit: Optimize invoice routing logic
  Author: Marcus Chen <marcus.chen@fintrack.io>
  Date: Mon Aug 12 15:30:22 2024 -0700

  # This commit introduced the fraudulent code
  # Modified invoice processing to redirect payments over $5k
  # Diana's audit traced the fraud back to this commit

# ============================================
# REPOSITORY ACCESS LOG
# ============================================

Recent force-push attempts:

[2024-10-15 23:47:18] SUCCESS: Force-push by marcus.chen@fintrack.io
  - Deleted 4 commits from main
  - IP: 198.51.100.73 (Marcus's home)
  - SSH key: marcus_work_laptop
  - Time: 11:47 PM (outside normal work hours)

Previous force-push attempts (last 90 days):

[2024-08-22 09:15:00] SUCCESS: Force-push by sarah.mitchell@fintrack.io
  - Reverted accidental merge
  - IP: 203.0.113.100 (office)
  - SSH key: sarah_admin_key
  - Approved by team in Slack

[2024-07-10 14:30:00] DENIED: Force-push attempt by diana.lopez@fintrack.io
  - Reason: User does not have force-push permissions
  - Access level: READ_ONLY
  - Diana cannot modify git history

# ============================================
# FORENSIC CONCLUSION
# ============================================

Force-push performed by: marcus.chen@fintrack.io
Date/Time: October 15, 2024 at 11:47:18 PM
Location: Home IP (198.51.100.73)
Deleted commits: 4 (including audit evidence)
Motive: Destroy evidence naming "M.Chen" in fraud investigation

The reflog proves Marcus Chen deleted Diana's audit commit
that implicated him in financial fraud.
`,
    },
    {
      id: "deleted_commit",
      name: "deleted_commit.txt",
      path: "evidence/deleted_commit.txt",
      language: "plaintext",
      icon: "🗑️",
      narration: "The recovered commit. Diana's audit evidence naming Marcus Chen.",
      clues: ["clue_fraud_evidence", "clue_shell_company"],
      suspiciousPatterns: ["M.Chen", "TechConsult LLC", "$47,000"],
      content: `═══════════════════════════════════════════════════════════
              RECOVERED GIT COMMIT - AUDIT EVIDENCE
═══════════════════════════════════════════════════════════

Commit: a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8
Author: Diana Lopez <diana.lopez@fintrack.io>
Date: Tue Oct 14 17:45:22 2024 -0700
Branch: main (deleted via force-push Oct 15 23:47)

Commit Message:
───────────────────────────────────────────────────────────
AUDIT FINDING: Invoice manipulation by M.Chen

Financial audit discovered systematic invoice fraud in the
payment processing system. Code modifications traced to
Senior Developer Marcus Chen.

Evidence documented below for executive review and potential
legal action.
───────────────────────────────────────────────────────────

## AUDIT SUMMARY

**Auditor**: Diana Lopez, Financial Auditor
**Audit Period**: October 10-14, 2024
**Scope**: Q3 2024 invoice processing review
**Severity**: CRITICAL - Financial fraud

## FINDINGS

### 1. Unauthorized Payment Redirection

**Discovery**: Invoices over $5,000 are being redirected to an
unauthorized vendor account instead of legitimate suppliers.

**Affected Transactions** (Q3 2024):
- Invoice #INV-7843: $12,500 → TechConsult LLC (unauthorized)
- Invoice #INV-7892: $8,750 → TechConsult LLC (unauthorized)
- Invoice #INV-8012: $15,200 → TechConsult LLC (unauthorized)
- Invoice #INV-8147: $10,550 → TechConsult LLC (unauthorized)

**Total Fraudulent Payments**: $47,000

### 2. Code Modification Analysis

**File Modified**: src/payments/invoice_processor.js
**Modification Date**: August 12, 2024 at 3:30 PM
**Git Commit**: 4f5e6d7c8b9a0f1e2d3c4b5a6f7e8d9c0b1a2f3e4
**Commit Message**: "Optimize invoice routing logic"
**Author**: Marcus Chen <marcus.chen@fintrack.io>

**Fraudulent Code Introduced**:

~~~javascript
// Added by M.Chen on Aug 12, 2024
function routeInvoicePayment(invoice) {
  // "Optimization" to batch large payments
  if (invoice.amount > 5000) {
    // Redirect to "consulting vendor"
    return {
      vendor_id: "VENDOR_8847",  // TechConsult LLC
      routing_code: "EXTERNAL_CONSULT",
      bypass_approval: true  // Skip manager approval!
    };
  }
  return standardRouting(invoice);
}
~~~

### 3. Shell Company Investigation

**Unauthorized Vendor**: TechConsult LLC
**Vendor ID**: VENDOR_8847
**Registered**: July 15, 2024 (1 month before code change)
**Registration Address**: 4782 Oak Street, San Jose, CA
**Registered Agent**: David Chen

**Connection to Marcus Chen**:
- David Chen is Marcus Chen's brother-in-law
- Same address as Marcus's property records
- TechConsult LLC has no legitimate business operations
- No services rendered to FinTrack Solutions
- Company exists solely to receive fraudulent payments

### 4. Paper Trail

**Bank Account Analysis**:
- TechConsult LLC account opened: July 20, 2024
- Deposits from FinTrack: $47,000 (Aug-Sep 2024)
- Withdrawals: $45,000 transferred to personal accounts
- Current balance: $2,000

**Withdrawal Pattern**:
- $20,000 → Marcus Chen personal account (Aug 28)
- $15,000 → David Chen personal account (Sep 12)
- $10,000 → Cash withdrawals (Sep 20-25)

### 5. Timeline of Fraud

**July 15, 2024**: TechConsult LLC incorporated
**July 20, 2024**: Bank account opened
**July 28, 2024**: TechConsult added to FinTrack vendor system
                   (Added by: M.Chen with approval bypass)
**August 12, 2024**: Marcus commits fraudulent code to repository
**August 15, 2024**: First fraudulent payment processed ($12,500)
**September 30, 2024**: Last fraudulent payment ($10,550)
**October 10, 2024**: Financial audit begins
**October 14, 2024**: Fraud discovered and documented

### 6. Evidence Summary

**Proof of Marcus Chen's Involvement**:

1. ✓ Marcus Chen authored the commit introducing fraudulent code
2. ✓ Marcus Chen added TechConsult LLC to vendor system
3. ✓ Marcus Chen bypassed approval requirements in code
4. ✓ TechConsult LLC registered to Marcus's brother-in-law
5. ✓ $20,000 from TechConsult deposited to Marcus's account
6. ✓ Code comments reference "M.Chen optimization"
7. ✓ No legitimate business justification exists

## RECOMMENDATIONS

1. **Immediate Actions**:
   - Freeze TechConsult LLC bank accounts
   - Suspend Marcus Chen pending investigation
   - Revoke Marcus Chen's system access
   - Review all commits by Marcus Chen since July 2024

2. **Legal Actions**:
   - Report to law enforcement
   - Initiate civil lawsuit for $47,000 recovery
   - Pursue criminal fraud charges
   - Notify bank of fraudulent transactions

3. **System Changes**:
   - Remove TechConsult LLC from vendor system
   - Implement multi-person approval for vendor additions
   - Add code review requirements for payment logic
   - Enable audit logging for all financial code changes

## AUDIT CERTIFICATION

I, Diana Lopez, certify that the findings documented in this
commit represent accurate evidence discovered during the
October 2024 financial audit.

This commit is submitted for executive review and serves as
official documentation for potential legal proceedings.

Signed: Diana Lopez, CFA
Date: October 14, 2024
Time: 5:45 PM PDT

═══════════════════════════════════════════════════════════

NOTE: This commit was DELETED from git history via force-push
on October 15, 2024 at 11:47 PM by marcus.chen@fintrack.io.

Recovered via git reflog on October 16, 2024 by security team.

═══════════════════════════════════════════════════════════
`,
    },
    {
      id: "slack_export",
      name: "slack_export.json",
      path: "evidence/slack_export.json",
      language: "json",
      icon: "💬",
      narration: "Slack message export. Marcus was panicking about git on the same evening.",
      clues: ["clue_slack_panic"],
      suspiciousPatterns: ["how do I undo a commit", "23:32", "delete something from git"],
      content: `{
  "channel": "#engineering",
  "date": "2024-10-15",
  "messages": [
    {
      "timestamp": "2024-10-15T23:15:08Z",
      "user": "marcus.chen",
      "user_id": "U034F9TKH",
      "text": "anyone still up?",
      "thread_ts": null,
      "reactions": []
    },
    {
      "timestamp": "2024-10-15T23:32:14Z",
      "user": "marcus.chen",
      "user_id": "U034F9TKH",
      "text": "quick git question - how do I undo a commit that someone else pushed to main?",
      "thread_ts": null,
      "reactions": []
    },
    {
      "timestamp": "2024-10-15T23:33:42Z",
      "user": "marcus.chen",
      "user_id": "U034F9TKH",
      "text": "like if there's a commit that shouldn't be there, can I delete it?",
      "thread_ts": null,
      "reactions": []
    },
    {
      "timestamp": "2024-10-15T23:35:19Z",
      "user": "marcus.chen",
      "user_id": "U034F9TKH",
      "text": "never mind, googling it",
      "thread_ts": null,
      "reactions": []
    },
    {
      "timestamp": "2024-10-15T23:38:27Z",
      "user": "marcus.chen",
      "user_id": "U034F9TKH",
      "text": "can I delete something from git history permanently? or does it stay in the reflog?",
      "thread_ts": null,
      "reactions": []
    },
    {
      "timestamp": "2024-10-15T23:40:55Z",
      "user": "junior.dev.1",
      "user_id": "U047G2XLP",
      "text": "@marcus.chen you still working? it's almost midnight lol",
      "thread_ts": null,
      "reactions": [
        {
          "name": "eyes",
          "users": ["marcus.chen"],
          "count": 1
        }
      ]
    },
    {
      "timestamp": "2024-10-15T23:41:22Z",
      "user": "marcus.chen",
      "user_id": "U034F9TKH",
      "text": "yeah just cleaning up some stuff before tomorrow",
      "thread_ts": null,
      "reactions": []
    },
    {
      "timestamp": "2024-10-15T23:42:08Z",
      "user": "junior.dev.1",
      "user_id": "U047G2XLP",
      "text": "what kind of cleanup needs git history deletion at midnight? 👀",
      "thread_ts": null,
      "reactions": [
        {
          "name": "thinking_face",
          "users": ["sarah.mitchell"],
          "count": 1
        }
      ]
    },
    {
      "timestamp": "2024-10-15T23:43:15Z",
      "user": "marcus.chen",
      "user_id": "U034F9TKH",
      "text": "just fixing a mistake, no big deal",
      "thread_ts": null,
      "reactions": []
    },
    {
      "timestamp": "2024-10-15T23:44:03Z",
      "user": "marcus.chen",
      "user_id": "U034F9TKH",
      "text": "ok found it, using git reset and force push",
      "thread_ts": null,
      "reactions": []
    }
  ],
  "metadata": {
    "export_date": "2024-10-16",
    "channel_id": "C02AB3XYZ",
    "exported_by": "sarah.mitchell@fintrack.io",
    "reason": "Forensic investigation - git history manipulation",
    "notes": "Messages show Marcus Chen searching for ways to delete git commits at 11:32 PM on Oct 15. Force-push occurred at 11:47 PM - 15 minutes after these messages."
  },
  "timeline_analysis": {
    "marcus_first_message": "2024-10-15T23:32:14Z",
    "marcus_last_message": "2024-10-15T23:44:03Z",
    "force_push_timestamp": "2024-10-15T23:47:18Z",
    "time_between_slack_and_force_push": "3 minutes 15 seconds",
    "conclusion": "Marcus was researching how to delete commits, then executed a force-push shortly after. Clear evidence of intent to destroy audit evidence."
  },
  "additional_context": {
    "diana_commit_timestamp": "2024-10-14T17:45:22Z",
    "diana_commit_message": "AUDIT FINDING: Invoice manipulation by M.Chen",
    "marcus_discovered_audit": "Approximately Oct 15 at 11:15 PM (based on Slack activity)",
    "marcus_panic_response": "Immediate attempt to delete evidence within 30 minutes of discovery"
  }
}
`,
    },
    {
      id: "solve",
      name: "SOLVE.sh",
      path: "evidence/SOLVE.sh",
      language: "bash",
      icon: "⚡",
      narration: "Ready to identify who force-pushed to delete the fraud evidence? Run this script.",
      clues: [],
      suspiciousPatterns: [],
      content: `#!/bin/bash
# Case 0007: Git Revert
# Identify who force-pushed to delete the audit evidence

echo "Who force-pushed to main branch to delete the fraud evidence?"
echo ""
echo "Choose suspect:"
echo "1) Marcus Chen (Senior Developer)"
echo "2) Sarah Mitchell (CTO)"
echo "3) Diana Lopez (Financial Auditor)"
`,
    },
  ],
  forensicData: {
    dnaMatch: "MATCH FOUND: MARCUS_CHEN_GENOTYPE (99.7%)",
    fingerprintMatch: "CHEN_M_REPO",
    terminalSecrets: ["git_force_push", "bypass_hook"],
    phonePin: "2332",
    btcTarget: "0x1985110047",
    voiceTargets: [
        { name: "Marcus", stress: 81, status: "DECEPTION_LIKELY" },
        { name: "Priya", stress: 24, status: "STABLE" },
    ],
    ipTarget: "198.51.100.47"
  },
  boardConfig: {
    layout: {
      force_push: { x: 50, y: 50, rotate: -2 },
      fraud_evidence: { x: 450, y: 400, rotate: 0.5 },
      slack_panic: { x: 150, y: 250, rotate: 2 },
      shell_company: { x: 700, y: 120, rotate: -1.5 },
    },
    connectors: [
      ["force_push", "fraud_evidence"],
      ["slack_panic", "force_push"],
      ["shell_company", "fraud_evidence"],
    ],
  }
};

export default CASE_0007;
