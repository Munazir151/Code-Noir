import type { FullCase } from "./cases";

export const CASE_0004: FullCase = {
  id: "0004",
  caseNumber: "CASE_0004",
  title: "API Key Rotation",
  difficulty: "easy",
  isLocked: false,
  tagline: "An API key was logged in plain text. Three days later, competitors had full access to the platform.",
  victim: "PayFast API — unauthorized access sold for $12,000",
  description: "Someone extracted an API key from application logs and sold access to competitors. The key was logged accidentally, but the theft was deliberate.",
  introTitle: "API KEY ROTATION",
  introBody1: "Logs tell stories. Sometimes they tell secrets.",
  introBody2: "Someone was reading very carefully.",

  suspects: [
    {
      id: "diana",
      name: "Diana Rodriguez",
      role: "Backend Developer, PayFast",
      emoji: "👩‍💻",
      terminalOutput: {
        evidence: [
          "✓ Diana wrote the logging code that exposed the API key.",
          "✓ Git history shows Diana added debug logging on June 3rd.",
          "✗ Diana reported the logging issue to security on June 5th.",
          "✗ Diana's personal email does NOT appear in the sales receipt.",
          "✗ Diana was on PTO June 6-10 when the key was sold.",
        ],
        verdict: "WRONG SUSPECT",
        message: "Diana Rodriguez made the coding mistake that logged the API key, but she discovered the issue herself and reported it to security. She was on vacation when the key was sold to competitors.",
      },
      verdictScreen: {
        type: "wrong",
        message: "Diana Rodriguez accidentally logged the API key in debug mode, but she caught her own mistake and reported it to the security team. She was on vacation in Costa Rica when the actual sale happened. The logs show she never accessed them after reporting the issue.",
      },
    },
    {
      id: "kevin",
      name: "Kevin Wu",
      role: "QA Tester, PayFast",
      emoji: "🧪",
      terminalOutput: {
        evidence: [
          "✓ Kevin had full access to application logs for testing purposes.",
          "✓ Log access records show Kevin downloaded app.log on June 7th at 2:34 PM.",
          "✓ Sales receipt shows payment to kevin.wu.test@gmail.com on June 8th.",
          "✓ Receipt amount: $12,000 for 'API access credentials'.",
          "✓ Kevin's Slack: 'just testing the logs' — the day after downloading them.",
        ],
        verdict: "GUILTY",
        message: "Kevin Wu had legitimate access to the logs for QA purposes. He discovered the leaked API key on June 7th, extracted it, and sold it to competitors for $12,000 the next day. His personal email appears on the cryptocurrency payment receipt.",
      },
      verdictScreen: {
        type: "guilty",
        message: "Kevin Wu accessed the application logs on June 7th, found the API key that Diana had accidentally logged, and sold it to a competitor for $12,000. The sales receipt was sent to his personal Gmail account. Kevin exploited his legitimate log access for financial gain.",
      },
    },
  ],

  correctSuspectId: "kevin",

  clues: [
    {
      id: "clue_api_key_logged",
      title: "API Key in Application Logs",
      description: "A master API key with full platform access was logged in plain text in app.log on June 3rd due to overly verbose debug logging.",
      fileId: "app_log",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_sales_receipt",
      title: "Cryptocurrency Sales Receipt",
      description: "A receipt for $12,000 sent to kevin.wu.test@gmail.com for 'API access credentials'. Payment received June 8th from an offshore exchange.",
      fileId: "sales_receipt",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_log_access",
      title: "Kevin's Log Download",
      description: "Server access logs show Kevin Wu downloaded the full app.log file on June 7th at 2:34 PM, just one day before the sale.",
      fileId: "readme",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_diana_innocent",
      title: "Diana Reported the Issue",
      description: "Diana discovered her logging mistake on June 5th and immediately reported it to the security team. She requested the logs be rotated and the key revoked.",
      fileId: "git_history",
      discovered: false,
      critical: false,
    },
    {
      id: "clue_email_match",
      title: "Email Address Matches Kevin",
      description: "The email on the sales receipt (kevin.wu.test@gmail.com) matches Kevin's personal email in HR records.",
      fileId: "sales_receipt",
      discovered: false,
      critical: true,
    },
  ],

  fileTree: {
    id: "root",
    name: "evidence",
    type: "directory" as const,
    children: [
      { id: "readme", name: "README.md", type: "file" as const, icon: "📄" },
      { id: "app_log", name: "app.log", type: "file" as const, icon: "📋" },
      { id: "sales_receipt", name: "sales_receipt.txt", type: "file" as const, icon: "💰" },
      { id: "git_history", name: "git_history.log", type: "file" as const, icon: "🔀" },
      { id: "solve", name: "SOLVE.sh", type: "file" as const, icon: "⚡" },
    ],
  },

  hints: [
    { isDone: false, text: "Start with the incident report to understand what happened.", action: { label: "Open README.md", fileId: "readme" } },
    { isDone: false, text: "Find the leaked API key in the application logs.", action: { label: "Check app.log", fileId: "app_log" } },
    { isDone: false, text: "Review the sales receipt to see who profited.", action: { label: "Read sales_receipt.txt", fileId: "sales_receipt" } },
    { isDone: false, text: "Check git history to see who wrote the logging code.", action: { label: "Examine git_history.log", fileId: "git_history" } },
    { isDone: false, text: "Identify the culprit and run the solve script.", action: { label: "Execute SOLVE.sh", fileId: "solve" } },
  ],

  files: [
    {
      id: "readme",
      name: "README.md",
      path: "evidence/README.md",
      language: "markdown",
      icon: "📄",
      narration: "The incident report. An API key was leaked in logs and someone sold it.",
      clues: ["clue_log_access"],
      suspiciousPatterns: [],
      content: `# Incident Report: Unauthorized API Access Sale

**Date**: June 10, 2024
**Reporter**: Security Team, PayFast
**Severity**: CRITICAL

## Summary

On June 10, 2024, PayFast's fraud detection system flagged unusual API activity patterns. Investigation revealed that a master API key had been compromised and sold to competitors, granting them full platform access for 3 days.

## Timeline

**June 3, 2024 - 11:42 AM**
- Backend Developer Diana Rodriguez deploys new logging system
- Debug mode accidentally enabled in production
- Master API key logged in plain text during authentication flows

**June 5, 2024 - 9:15 AM**
- Diana discovers the logging issue while debugging another problem
- Submits ticket SEC-1847: "API keys exposed in application logs"
- Requests immediate log rotation and key revocation
- Security team acknowledges but doesn't act immediately

**June 6, 2024**
- Diana begins PTO (vacation to Costa Rica, June 6-10)

**June 7, 2024 - 2:34 PM**
- Server access logs show file download: app.log (14.2 MB)
- Downloaded by QA Tester Kevin Wu from IP 198.18.0.73 (office)
- Kevin's Slack message at 3:15 PM: "just testing the logs, need them for repro"

**June 8, 2024 - 11:22 AM**
- Cryptocurrency payment received: $12,000
- Recipient email: kevin.wu.test@gmail.com
- Payment memo: "API access credentials - PayFast production"

**June 8, 2024 - 2:00 PM onwards**
- Unusual API activity detected from IP addresses in Eastern Europe
- Competitor "QuickPay" suddenly launches features identical to PayFast's unreleased roadmap
- API calls use the compromised master key

**June 10, 2024 - 8:00 AM**
- Security team revokes all API keys
- Forensic investigation begins

## Investigation Notes

- Diana's security ticket was filed BEFORE the key was sold
- Diana was out of the country when the sale occurred
- Kevin Wu had legitimate access to logs for QA testing
- Kevin's personal email matches the payment recipient
- Log access is tracked: only Kevin downloaded the logs between June 5-10

## Evidence Files

1. **app.log** - Application logs containing the leaked API key
2. **sales_receipt.txt** - Cryptocurrency payment receipt for the API key sale
3. **git_history.log** - Git commits showing who added the logging code

## Questions

Who extracted the API key from the logs and sold it to competitors?
`,
    },
    {
      id: "app_log",
      name: "app.log",
      path: "evidence/app.log",
      language: "log",
      icon: "📋",
      narration: "Application logs with debug mode enabled. The API key is sitting right here in plain text.",
      clues: ["clue_api_key_logged"],
      suspiciousPatterns: [
        { pattern: "pk_live_8K3mN9pQ2rT5uV7wX0yZ1aB4cD6eF8gH", reason: "Master API key leaked in logs" },
        { pattern: "DEBUG", reason: "Debug logging exposed sensitive data" },
      ],
      content: `# PayFast Application Log
# Date: June 3, 2024
# Environment: PRODUCTION (debug mode accidentally enabled)

[2024-06-03 11:42:18] INFO: Application started on port 8080
[2024-06-03 11:42:18] INFO: Database connection established
[2024-06-03 11:42:19] INFO: Redis cache connected
[2024-06-03 11:42:19] WARN: Debug logging enabled in production - performance impact expected

[2024-06-03 11:45:22] INFO: API request received - /v1/payments/create
[2024-06-03 11:45:22] DEBUG: Request headers: {"Authorization":"Bearer pk_live_8K3mN9pQ2rT5uV7wX0yZ1aB4cD6eF8gH","Content-Type":"application/json"}
[2024-06-03 11:45:22] DEBUG: Authenticating with master API key: pk_live_8K3mN9pQ2rT5uV7wX0yZ1aB4cD6eF8gH
[2024-06-03 11:45:22] DEBUG: Key validation successful - scope: FULL_ACCESS
[2024-06-03 11:45:23] INFO: Payment created successfully - ID: pay_7hG6jK9mL2

[2024-06-03 11:50:33] INFO: API request received - /v1/customers/list
[2024-06-03 11:50:33] DEBUG: Authentication header: Bearer pk_live_8K3mN9pQ2rT5uV7wX0yZ1aB4cD6eF8gH
[2024-06-03 11:50:33] DEBUG: Master key authenticated - user: system_admin
[2024-06-03 11:50:34] INFO: Returned 1,247 customers

[2024-06-03 12:15:44] INFO: API request received - /v1/analytics/revenue
[2024-06-03 12:15:44] DEBUG: Using API key for auth: pk_live_8K3mN9pQ2rT5uV7wX0yZ1aB4cD6eF8gH
[2024-06-03 12:15:44] DEBUG: Key has permissions: [READ, WRITE, DELETE, ADMIN]
[2024-06-03 12:15:45] INFO: Revenue data retrieved

[2024-06-03 14:22:10] INFO: API request received - /v1/webhooks/configure
[2024-06-03 14:22:10] DEBUG: Master API key detected: pk_live_8K3mN9pQ2rT5uV7wX0yZ1aB4cD6eF8gH
[2024-06-03 14:22:10] DEBUG: Full platform access granted
[2024-06-03 14:22:11] INFO: Webhook configured

[2024-06-03 16:45:00] INFO: Daily backup completed
[2024-06-03 16:45:01] DEBUG: Backup authenticated using: pk_live_8K3mN9pQ2rT5uV7wX0yZ1aB4cD6eF8gH

# Note: This master API key (pk_live_8K3mN9pQ2rT5uV7wX0yZ1aB4cD6eF8gH) has:
# - Full read/write access to all resources
# - Admin privileges
# - No rate limiting
# - No IP restrictions
# - Never expires unless manually revoked

[2024-06-03 18:30:22] INFO: Application shutdown initiated
[2024-06-03 18:30:23] INFO: Graceful shutdown complete

# Log file rotated: 14.2 MB
# Retention: 90 days
# Access: Development team, QA team, Security team
`,
    },
    {
      id: "sales_receipt",
      name: "sales_receipt.txt",
      path: "evidence/sales_receipt.txt",
      language: "plaintext",
      icon: "💰",
      narration: "A cryptocurrency payment receipt. Someone got paid $12,000 for API credentials.",
      clues: ["clue_sales_receipt", "clue_email_match"],
      suspiciousPatterns: [
        { pattern: "kevin.wu.test@gmail.com", reason: "Kevin Wu's personal email receiving payment" },
        { pattern: "$12,000", reason: "Payment amount for stolen API access" },
      ],
      content: `═══════════════════════════════════════════════════════════
              CRYPTOCURRENCY PAYMENT RECEIPT
═══════════════════════════════════════════════════════════

Transaction ID: 0x7f8e9d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a
Date: June 8, 2024 11:22:38 UTC
Network: Ethereum (ERC-20)
Status: ✓ CONFIRMED

───────────────────────────────────────────────────────────
PAYMENT DETAILS
───────────────────────────────────────────────────────────

From Address:
0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb2
(QuickPay Holdings Ltd. - Estonia)

To Address:
0x8fB2E89d3c6b5a4F3e2D1c0B9a8F7e6D5c4B3a2F1e0D
(kevin.wu.test@gmail.com - Verified)

Amount: 12,000.00 USDC
USD Value: $12,000.00
Gas Fee: $8.42

───────────────────────────────────────────────────────────
PAYMENT MEMO
───────────────────────────────────────────────────────────

"API access credentials - PayFast production
Master key with full platform access
Valid until revocation
Includes documentation and usage examples"

───────────────────────────────────────────────────────────
RECIPIENT INFORMATION
───────────────────────────────────────────────────────────

Email: kevin.wu.test@gmail.com
KYC Status: Verified
Wallet Registration: May 2024
Previous Transactions: 3

───────────────────────────────────────────────────────────
SENDER INFORMATION
───────────────────────────────────────────────────────────

Entity: QuickPay Holdings Ltd.
Country: Estonia
Business Type: Payment Processing
Note: Identified as direct competitor to PayFast

───────────────────────────────────────────────────────────

Block Number: 19,847,265
Confirmations: 142
Timestamp: 2024-06-08T11:22:38Z

This receipt confirms successful payment for services rendered.

═══════════════════════════════════════════════════════════

NOTICE: This transaction was flagged by PayFast's fraud
detection system due to the memo contents and recipient
email matching an employee personal account.
`,
    },
    {
      id: "git_history",
      name: "git_history.log",
      path: "evidence/git_history.log",
      language: "log",
      icon: "🔀",
      narration: "Git commit history. Diana added the logging, but she also reported it.",
      clues: ["clue_diana_innocent"],
      suspiciousPatterns: [
        { pattern: "console.log(apiKey)", reason: "Debug logging that exposed the API key" },
      ],
      content: `# Git History - PayFast Backend Repository
# Commits related to logging system changes

───────────────────────────────────────────────────────────
commit 4f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e
Author: Diana Rodriguez <diana.rodriguez@payfast.io>
Date:   Mon Jun 3 11:30:15 2024 -0700

    feat: Add enhanced debug logging for API authentication

    - Added verbose logging for API key authentication flow
    - Helps debug intermittent auth failures reported by customers
    - TODO: Disable debug mode before production deploy

    files changed: 2
    +  src/middleware/auth.js | 15 +++++++++++++++
    +  src/utils/logger.js    |  8 ++++++--

diff --git a/src/middleware/auth.js b/src/middleware/auth.js
index 2a3b4c5..8f9e0d1 100644
--- a/src/middleware/auth.js
+++ b/src/middleware/auth.js
@@ -12,6 +12,9 @@ export async function authenticateRequest(req, res, next) {
   const apiKey = req.headers.authorization?.replace('Bearer ', '');

   if (!apiKey) {
+    if (process.env.DEBUG_MODE === 'true') {
+      logger.debug('No API key provided in request');
+    }
     return res.status(401).json({ error: 'No API key provided' });
   }

+  // Debug logging to help trace auth issues
+  if (process.env.DEBUG_MODE === 'true') {
+    logger.debug(\`Authenticating with master API key: \${apiKey}\`);
+    logger.debug(\`Request headers:\`, req.headers);
+  }
+
   const keyData = await validateApiKey(apiKey);

───────────────────────────────────────────────────────────
commit 9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b
Author: Diana Rodriguez <diana.rodriguez@payfast.io>
Date:   Wed Jun 5 09:10:42 2024 -0700

    docs: Add security ticket for exposed API keys in logs

    Filed ticket SEC-1847 with security team.
    Debug logging accidentally enabled in production is
    exposing API keys in application logs.

    Requesting:
    - Immediate log rotation
    - API key revocation and reissue
    - Disable debug mode in production

    This is critical - master API key is in plaintext in
    app.log from June 3rd onwards.

───────────────────────────────────────────────────────────
commit 7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b
Author: Diana Rodriguez <diana.rodriguez@payfast.io>
Date:   Wed Jun 5 09:15:33 2024 -0700

    fix: Disable debug mode in production environment

    Responding to SEC-1847.
    Debug mode should never have been enabled in prod.
    This commit ensures DEBUG_MODE is forced to false in
    production deployments.

    Note: Existing logs still contain exposed keys.
    Security team needs to rotate keys and purge logs.

───────────────────────────────────────────────────────────

# Diana's Actions Summary:
# - June 3: Added debug logging (accidental security issue)
# - June 5: Discovered the issue herself
# - June 5: Filed security ticket SEC-1847
# - June 5: Pushed fix to disable debug mode
# - June 6-10: On vacation in Costa Rica (verified PTO records)

# Log Access Records (from server audit trail):
# - June 7, 2:34 PM: Kevin Wu downloaded app.log (14.2 MB)
# - No other downloads of app.log between June 5-10
`,
    },
    {
      id: "solve",
      name: "SOLVE.sh",
      path: "evidence/SOLVE.sh",
      language: "bash",
      icon: "⚡",
      narration: "Ready to identify who sold the API key? Run this script.",
      clues: [],
      suspiciousPatterns: [],
      content: `#!/bin/bash
# Case 0004: API Key Rotation
# Identify who extracted and sold the API key

echo "Who sold the API key to competitors for $12,000?"
echo ""
echo "Choose suspect:"
echo "1) Diana Rodriguez (Backend Developer)"
echo "2) Kevin Wu (QA Tester)"
`,
    },
  ],
  forensicData: {
    dnaMatch: "MATCH FOUND: RODRIGUEZ_D_GENOTYPE (99.1%)",
    fingerprintMatch: "DIANA_API_L4",
    terminalSecrets: ["api_bypass", "shadow_keys"],
    phonePin: "1200",
    btcTarget: "0x142250190",
    voiceTargets: [
        { name: "Diana", stress: 76, status: "DECEPTION_LIKELY" },
        { name: "Kevin", stress: 31, status: "STABLE" },
    ],
    ipTarget: "142.250.190.46"
  },
  boardConfig: {
    layout: {
      api_leak: { x: 50, y: 50, rotate: -2 },
      sale_receipt: { x: 450, y: 400, rotate: 0.5 },
      download_log: { x: 150, y: 250, rotate: 2 },
    },
    connectors: [
      ["api_leak", "download_log"],
      ["download_log", "sale_receipt"],
    ],
  }
};

export default CASE_0004;
