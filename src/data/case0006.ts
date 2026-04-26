import type { FullCase } from "./cases";

export const CASE_0006: FullCase = {
  id: "0006",
  caseNumber: "CASE_0006",
  title: "Token Swap",
  difficulty: "medium",
  isLocked: false,
  tagline: "A JWT secret was rotated, but the old one stayed valid for 30 days. Someone saved it before losing access.",
  victim: "SecureAPI Inc. — CEO account impersonated",
  description: "A JWT secret rotation was implemented with a 30-day grace period. An external contractor copied the old secret before their access was revoked, then used it to impersonate the CEO via API calls.",
  introTitle: "TOKEN SWAP",
  introBody1: "Rotation without revocation is just creating more keys.",
  introBody2: "And someone kept the old one.",

  suspects: [
    {
      id: "maya",
      name: "Maya Patel",
      role: "Security Engineer, SecureAPI",
      emoji: "🔒",
      terminalOutput: {
        evidence: [
          "✓ Maya implemented the JWT secret rotation on September 1st.",
          "✓ Maya's design included 30-day grace period for old secret.",
          "✗ Maya's code review comments warned about security implications.",
          "✗ Maya recommended immediate revocation but was overruled by management.",
          "✗ Maya's IP address does not appear in the suspicious API calls.",
          "✗ Maya reported the CEO impersonation and began investigation.",
        ],
        verdict: "WRONG SUSPECT",
        message: "Maya Patel implemented the rotation system but explicitly warned about the 30-day grace period being a security risk. She was overruled by management who wanted backward compatibility. Maya had no involvement in the attack.",
      },
      verdictScreen: {
        type: "wrong",
        message: "Maya Patel implemented the JWT rotation system correctly, but management required a 30-day grace period for 'smooth transition.' Maya documented her security concerns and recommended immediate revocation. She discovered and reported the CEO impersonation attack.",
      },
    },
    {
      id: "carlos",
      name: "Carlos Rivera",
      role: "DevOps Lead, SecureAPI",
      emoji: "⚙️",
      terminalOutput: {
        evidence: [
          "✓ Carlos had access to both old and new JWT secrets.",
          "✓ Carlos deployed the rotation to production.",
          "✗ Carlos was on vacation in Mexico September 10-20.",
          "✗ The CEO impersonation attack occurred September 12th.",
          "✗ Carlos's access logs show no suspicious activity.",
          "✗ Carlos's IP addresses don't match the attack origin.",
        ],
        verdict: "WRONG SUSPECT",
        message: "Carlos Rivera deployed the JWT rotation system and had access to the secrets, but he was on vacation in Cancun when the attack occurred. His IP addresses show no connection to the suspicious API activity.",
      },
      verdictScreen: {
        type: "wrong",
        message: "Carlos Rivera had legitimate access to the JWT secrets and deployed the rotation system, but he was vacationing in Mexico when the CEO impersonation occurred. His travel records and IP logs confirm he had no involvement in the attack.",
      },
    },
    {
      id: "alex_contractor",
      name: "Alex Morgan",
      role: "External Security Contractor",
      emoji: "👔",
      terminalOutput: {
        evidence: [
          "✓ Alex had access to JWT secrets during security audit (Aug 15 - Sep 8).",
          "✓ Alex's contract ended September 8th at 5 PM.",
          "✓ Access logs show Alex copied jwt_config.js on September 7th at 4:42 PM.",
          "✓ CEO impersonation attack occurred September 12th at 2:14 AM.",
          "✓ JWT token used in attack was signed with OLD secret (pre-rotation).",
          "✓ Attack originated from IP 45.33.22.11 - traced to VPN service Alex used.",
          "✓ Token payload shows creation timestamp: September 7, 4:45 PM.",
        ],
        verdict: "GUILTY",
        message: "Alex Morgan copied the old JWT secret on September 7th, one day before their contract ended. On September 12th, they used the old secret (still valid due to 30-day grace period) to forge a JWT token impersonating the CEO and make unauthorized API calls. The token metadata and VPN IP confirm Alex's involvement.",
      },
      verdictScreen: {
        type: "guilty",
        message: "Alex Morgan copied the JWT secret configuration the day before their contract ended. Four days later, they exploited the 30-day grace period to forge a CEO token using the old secret. The attack came from Alex's known VPN service, and the token timestamp matches when Alex copied the secrets.",
      },
    },
  ],

  correctSuspectId: "alex_contractor",

  clues: [
    {
      id: "clue_grace_period",
      title: "30-Day Grace Period Vulnerability",
      description: "The JWT rotation kept the old secret valid for 30 days to allow gradual migration. This created a window where anyone with the old secret could still forge valid tokens.",
      fileId: "jwt_config",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_contractor_offboard",
      title: "Alex Copied Secrets Before Offboarding",
      description: "Access logs show Alex Morgan downloaded jwt_config.js on September 7th at 4:42 PM - just hours before their contract ended at 5 PM on September 8th.",
      fileId: "contractor_offboarding",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_old_secret",
      title: "Attack Used Old JWT Secret",
      description: "The forged CEO token was signed with the old (pre-rotation) JWT secret, proving the attacker had access to secrets from before September 1st.",
      fileId: "api_access",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_token_timestamp",
      title: "Token Created September 7th",
      description: "The JWT token's 'iat' (issued at) claim shows it was created on September 7th at 4:45 PM - matching exactly when Alex copied the configuration file.",
      fileId: "api_access",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_vpn_ip",
      title: "Attack From Alex's VPN",
      description: "The CEO impersonation API calls came from IP 45.33.22.11, which belongs to NordVPN - the same VPN service Alex used during their contract (documented in security audit logs).",
      fileId: "api_access",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_maya_warning",
      title: "Maya Warned About Grace Period",
      description: "Maya's code review explicitly flagged the 30-day grace period as a security risk, recommending immediate revocation. Management overruled her for 'business continuity.'",
      fileId: "jwt_config",
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
        { id: "jwt_config", name: "jwt_config.js", type: "file" as const, icon: "🔑" },
        { id: "api_access", name: "api_access.log", type: "file" as const, icon: "📊" },
        { id: "contractor_offboarding", name: "contractor_offboarding.md", type: "file" as const, icon: "👋" },
        { id: "solve", name: "SOLVE.sh", type: "file" as const, icon: "⚡" },
      ],
    },
  ],

  hints: [
    { isDone: (f) => f.has("readme"), text: "Read the incident report to understand the JWT impersonation.", action: { label: "Open README.md", fileId: "readme" } },
    { isDone: (f) => f.has("jwt_config"), text: "Examine the JWT configuration to find the vulnerability.", action: { label: "Check jwt_config.js", fileId: "jwt_config" } },
    { isDone: (f) => f.has("api_access"), text: "Review API access logs for the forged token details.", action: { label: "Read api_access.log", fileId: "api_access" } },
    { isDone: (f) => f.has("contractor_offboarding"), text: "Check contractor offboarding records for suspicious activity.", action: { label: "Review contractor_offboarding.md", fileId: "contractor_offboarding" } },
    { isDone: (f) => f.has("solve"), text: "Identify the attacker and run the solve script.", action: { label: "Execute SOLVE.sh", fileId: "solve" } },
  ],

  files: [
    {
      id: "readme",
      name: "README.md",
      path: "evidence/README.md",
      language: "markdown",
      icon: "📄",
      narration: "The incident report. Someone impersonated the CEO using a forged JWT token.",
      clues: [],
      suspiciousPatterns: [],
      content: `# Incident Report: CEO Account Impersonation via JWT

**Date**: September 12, 2024
**Reporter**: Maya Patel, Security Engineer
**Severity**: CRITICAL

## Summary

On September 12, 2024 at 2:14 AM, unauthorized API calls were made using a JWT token claiming to represent CEO Jennifer Walsh. The token was valid and properly signed, but the CEO was asleep and her legitimate devices showed no activity at that time.

## Background: JWT Secret Rotation

**August 30, 2024**
- Security team identified that JWT secret had not been rotated in 18 months
- Maya Patel assigned to implement secret rotation system

**September 1, 2024**
- New JWT secret deployed to production
- OLD secret kept valid for 30-day grace period (per management request)
- Reason: "Allow gradual migration without breaking existing integrations"

**Maya's Security Concerns (from code review):**
> "The 30-day grace period means anyone with the old secret can forge
> tokens for another month. Recommend immediate revocation instead.
> If we must have a grace period, 48 hours maximum."

**Management Response:**
> "30 days is necessary for business continuity. Some partners need
> time to update their integrations. Proceed as planned."

## Timeline of Attack

**September 7, 2024 - 4:42 PM**
- External contractor Alex Morgan's access to internal systems recorded
- Downloaded: /config/jwt_config.js (contains both old and new secrets)
- Alex's contract end date: September 8, 2024 at 5 PM

**September 8, 2024 - 5:00 PM**
- Alex Morgan's contract officially ends
- Access to internal systems revoked
- Exit interview completed, equipment returned

**September 12, 2024 - 2:14 AM**
- Suspicious API activity detected
- JWT token presented claiming user: "ceo@secureapi.io"
- Token was VALID and properly signed
- Source IP: 45.33.22.11 (VPN service)

**September 12, 2024 - 8:30 AM**
- CEO Jennifer Walsh arrives at office, confirms she was asleep at 2 AM
- Her laptop and phone show no activity during that timeframe
- Security investigation begins

## Attack Details

The forged JWT token granted:
- Full administrative API access
- Ability to read all customer data
- Permission to modify system configurations
- Access to financial records

Actions taken by attacker:
- Downloaded customer database export (847 MB)
- Accessed quarterly financial reports
- Read internal strategy documents
- Modified webhook configurations (reverted by security team)

## Investigation Questions

1. How did the attacker obtain a valid JWT secret?
2. Why was the token accepted even though rotation occurred 11 days earlier?
3. Who had access to the JWT secrets before rotation?

## Evidence Files

1. **jwt_config.js** - JWT configuration showing old and new secrets
2. **api_access.log** - API request logs with forged token analysis
3. **contractor_offboarding.md** - Alex Morgan's contract termination details

## Status

Active investigation. All JWT secrets have been immediately revoked and regenerated. 30-day grace period has been terminated.
`,
    },
    {
      id: "jwt_config",
      name: "jwt_config.js",
      path: "evidence/jwt_config.js",
      language: "javascript",
      icon: "🔑",
      narration: "JWT configuration with old and new secrets. The grace period created a vulnerability.",
      clues: ["clue_grace_period", "clue_maya_warning"],
      suspiciousPatterns: ["validSecrets", "30 days", "SECURITY RISK"],
      content: `// JWT Configuration - SecureAPI Inc.
// Author: Maya Patel <maya.patel@secureapi.io>
// Deployed: September 1, 2024
// Purpose: Rotate JWT signing secret (overdue by 18 months)

const crypto = require('crypto');

// ============================================
// JWT SECRETS
// ============================================

// NEW secret (rotated September 1, 2024)
const NEW_JWT_SECRET = 'sK9mP2rT5vX8zA1cD4fG7jL0nQ3uW6yB9eH2kM5pS8vY1bE4gJ7m';

// OLD secret (used Jan 2023 - Sep 2024)
const OLD_JWT_SECRET = 'aB3dE6gH9jK2mN5pQ8sT1vW4xZ7bC0eF3hI6kL9nO2qR5tU8wY1';

// ============================================
// GRACE PERIOD CONFIGURATION
// ============================================

const ROTATION_DATE = new Date('2024-09-01T00:00:00Z');
const GRACE_PERIOD_DAYS = 30; // ⚠️ SECURITY RISK - See notes below
const GRACE_PERIOD_END = new Date(ROTATION_DATE);
GRACE_PERIOD_END.setDate(GRACE_PERIOD_END.getDate() + GRACE_PERIOD_DAYS);

// Current date check
const now = new Date();
const gracePeriodActive = now < GRACE_PERIOD_END;

// ============================================
// VALID SECRETS ARRAY
// ============================================

// During grace period: Accept tokens signed with EITHER secret
// After grace period: Only accept NEW secret
const validSecrets = gracePeriodActive
  ? [NEW_JWT_SECRET, OLD_JWT_SECRET]  // Both valid until October 1, 2024
  : [NEW_JWT_SECRET];                  // Only new secret valid

console.log(\`Grace period active: \${gracePeriodActive}\`);
console.log(\`Valid secrets count: \${validSecrets.length}\`);
console.log(\`Grace period ends: \${GRACE_PERIOD_END.toISOString()}\`);

// ============================================
// TOKEN VERIFICATION FUNCTION
// ============================================

function verifyToken(token) {
  const jwt = require('jsonwebtoken');

  // Try each valid secret until one works
  for (const secret of validSecrets) {
    try {
      const decoded = jwt.verify(token, secret);
      console.log(\`Token verified with \${secret === NEW_JWT_SECRET ? 'NEW' : 'OLD'} secret\`);
      return decoded;
    } catch (err) {
      continue; // Try next secret
    }
  }

  throw new Error('Invalid token - no valid signature');
}

// ============================================
// SECURITY NOTES FROM MAYA PATEL
// ============================================

/*
 * CODE REVIEW COMMENTS - August 31, 2024
 * Reviewer: Maya Patel (Security Engineer)
 *
 * ⚠️ SECURITY RISK: 30-day grace period
 *
 * This grace period means that anyone who obtained the OLD_JWT_SECRET
 * before September 1st can continue forging valid tokens until October 1st.
 *
 * This includes:
 * - Former employees
 * - Terminated contractors
 * - Compromised development machines
 * - Leaked configuration files
 *
 * RECOMMENDATION: Reduce grace period to 48 hours maximum, or implement
 * immediate revocation with emergency partner notification process.
 *
 * MANAGEMENT RESPONSE (from Jennifer Walsh, CEO):
 * "30 days is necessary for business continuity. We have partners who
 * need time to update. Proceed with 30-day grace period as planned."
 *
 * STATUS: Implemented as requested despite security concerns.
 * Risk accepted by executive team.
 */

// ============================================
// ACCESS LOG
// ============================================

// Who had access to this file before rotation?
// - Maya Patel (Security Engineer) - Implemented rotation
// - Carlos Rivera (DevOps Lead) - Deployed to production
// - Alex Morgan (External Contractor) - Security audit access
// - Jennifer Walsh (CEO) - Executive access
//
// Note: This file was in the /config directory with standard
// team permissions. Anyone with repository access could read it.

module.exports = {
  NEW_JWT_SECRET,
  OLD_JWT_SECRET,
  validSecrets,
  verifyToken,
  gracePeriodActive,
  GRACE_PERIOD_END
};
`,
    },
    {
      id: "api_access",
      name: "api_access.log",
      path: "evidence/api_access.log",
      language: "log",
      icon: "📊",
      narration: "API access logs showing the CEO impersonation. The token was signed with the old secret.",
      clues: ["clue_old_secret", "clue_token_timestamp", "clue_vpn_ip"],
      suspiciousPatterns: ["45.33.22.11", "OLD secret", "iat.*2024-09-07.*16:45"],
      content: `# SecureAPI Access Log - September 12, 2024
# Suspicious Activity: CEO Account Impersonation

[2024-09-12 02:14:07] INFO: API request received
  Endpoint: POST /api/v1/auth/validate
  Source IP: 45.33.22.11
  User-Agent: curl/8.0.1

[2024-09-12 02:14:07] INFO: JWT token presented
  Token header: {"alg":"HS256","typ":"JWT"}
  Token payload (decoded):
    {
      "sub": "ceo@secureapi.io",
      "name": "Jennifer Walsh",
      "role": "CEO",
      "permissions": ["admin", "read:all", "write:all", "delete:all"],
      "iat": 1725728700,  // September 7, 2024 16:45:00 UTC
      "exp": 1757264700   // September 7, 2025 16:45:00 UTC (1 year)
    }

[2024-09-12 02:14:08] SECURITY: Token signature verification
  Attempting verification with NEW secret: FAILED
  Attempting verification with OLD secret: SUCCESS ✓

[2024-09-12 02:14:08] WARNING: Token signed with OLD (pre-rotation) secret
  Token created: September 7, 2024 at 4:45 PM UTC
  Rotation occurred: September 1, 2024
  Grace period active: YES (until October 1, 2024)
  Decision: ACCEPT token (valid during grace period)

[2024-09-12 02:14:08] ALERT: Unusual access time
  Claimed user: ceo@secureapi.io (Jennifer Walsh)
  Access time: 2:14 AM
  CEO typical hours: 8 AM - 6 PM
  Red flag: Out-of-hours access

[2024-09-12 02:14:09] INFO: Authentication successful
  User: Jennifer Walsh (CEO)
  Session ID: sess_9f8e7d6c5b4a3f2e
  Permissions granted: FULL_ADMIN

[2024-09-12 02:14:15] INFO: API request
  Endpoint: GET /api/v1/customers/export
  User: ceo@secureapi.io
  Action: Download customer database
  Size: 847 MB
  Status: 200 OK

[2024-09-12 02:18:42] INFO: API request
  Endpoint: GET /api/v1/financials/quarterly-reports
  User: ceo@secureapi.io
  Action: Access Q2/Q3 2024 financial data
  Status: 200 OK

[2024-09-12 02:22:18] INFO: API request
  Endpoint: GET /api/v1/strategy/internal-docs
  User: ceo@secureapi.io
  Action: Read strategy documents
  Status: 200 OK

[2024-09-12 02:25:33] INFO: API request
  Endpoint: PUT /api/v1/webhooks/config
  User: ceo@secureapi.io
  Action: Modify webhook endpoints
  Status: 200 OK
  Note: Reverted by security team at 9:15 AM

[2024-09-12 02:28:45] INFO: Session terminated
  User: ceo@secureapi.io
  Duration: 14 minutes 36 seconds
  Data transferred: 847.3 MB

# ============================================
# IP ADDRESS ANALYSIS
# ============================================

Source IP: 45.33.22.11
ISP: NordVPN (VPN Service)
Location: Exit node in Netherlands
Actual user location: Unknown (masked by VPN)

# Cross-reference with security audit logs:
# During August 2024 security audit, contractor Alex Morgan
# was documented using NordVPN for remote access.
#
# From security_audit_notes.txt (August 20, 2024):
# "Alex Morgan connecting via NordVPN (IPs: 45.33.22.*, 198.51.100.*)
#  for security testing. VPN usage approved for penetration testing."

# ============================================
# TOKEN CREATION TIMELINE ANALYSIS
# ============================================

Token "iat" (issued at): September 7, 2024, 4:45:00 PM UTC

September 7, 2024 Timeline:
- 4:42 PM: Alex Morgan downloads jwt_config.js (access logs)
- 4:45 PM: JWT token created (per token's iat claim) ← 3 minutes later
- 5:00 PM: Normal business day ends

September 8, 2024:
- 5:00 PM: Alex Morgan's contract officially ends
- 5:15 PM: Alex's system access revoked

September 12, 2024:
- 2:14 AM: Token used for CEO impersonation attack

# ============================================
# CONCLUSION
# ============================================

The forged token was:
1. Signed with the OLD JWT secret (pre-rotation)
2. Created on September 7 at 4:45 PM (3 min after Alex copied secrets)
3. Used on September 12 at 2:14 AM (4 days after Alex's access revoked)
4. Originated from VPN service Alex was known to use
5. Valid due to 30-day grace period (until October 1)

The attacker had the OLD secret and created the token BEFORE the
rotation, then exploited the grace period to use it AFTER their
access was revoked.
`,
    },
    {
      id: "contractor_offboarding",
      name: "contractor_offboarding.md",
      path: "evidence/contractor_offboarding.md",
      language: "markdown",
      icon: "👋",
      narration: "Alex Morgan's contractor offboarding record. They copied the JWT config right before losing access.",
      clues: ["clue_contractor_offboard"],
      suspiciousPatterns: ["jwt_config.js", "September 7.*4:42 PM"],
      content: `# Contractor Offboarding Record

**Contractor**: Alex Morgan
**Role**: External Security Consultant
**Contract Period**: August 15, 2024 - September 8, 2024
**Engagement**: Security audit and penetration testing
**Offboarding Date**: September 8, 2024

## Contract Details

**Start Date**: August 15, 2024
**End Date**: September 8, 2024
**Duration**: 25 days
**Rate**: $250/hour
**Total Hours**: 187 hours
**Specialization**: API security, authentication systems, JWT implementation review

## Access Granted

- GitHub repository (read-only)
- Production API documentation
- Test environment (full access)
- Configuration files (read-only)
- VPN access for remote work
- Slack workspace (temporary guest)

## Work Completed

1. ✅ Penetration testing of public API endpoints
2. ✅ JWT implementation security review
3. ✅ Authentication flow analysis
4. ✅ OWASP Top 10 vulnerability assessment
5. ✅ Security recommendations report submitted

## Final Report Highlights

**Submitted**: September 5, 2024

Key findings:
- JWT secret not rotated in 18 months (HIGH severity)
- Recommended immediate secret rotation
- Suggested implementing secret rotation automation
- Identified 3 medium-severity API vulnerabilities
- Recommended rate limiting improvements

All findings addressed or scheduled for remediation.

## System Access Log (Final Week)

**September 1-7, 2024 - Access Activity**

~~~
[2024-09-01 09:15] Alex logged into VPN (IP: 45.33.22.11)
[2024-09-01 09:20] Accessed GitHub repository
[2024-09-01 10:30] Read jwt_config.js (via repository browser)

[2024-09-03 14:22] Alex logged into VPN (IP: 45.33.22.11)
[2024-09-03 14:30] Accessed test environment
[2024-09-03 15:45] Tested JWT validation endpoints

[2024-09-05 11:00] Alex submitted final security report
[2024-09-05 11:15] Report approved by Maya Patel

[2024-09-07 16:30] Alex logged into VPN (IP: 45.33.22.11)
[2024-09-07 16:42] ⚠️ Downloaded file: /config/jwt_config.js (3.2 KB)
[2024-09-07 16:45] Disconnected from VPN
~~~

**Note**: The September 7th download occurred 23 hours before contract end.
This was Alex's last system access before offboarding.

## Exit Interview

**Date**: September 8, 2024 at 3:00 PM
**Interviewer**: Maya Patel (Security Engineer)

**Maya**: "How was your experience working with us?"

**Alex**: "Great! The team was very collaborative. I enjoyed the API security work especially. Your JWT implementation is solid now that you're rotating the secret."

**Maya**: "You mentioned in your report the secret hadn't been rotated in 18 months. Did you access the actual secret values?"

**Alex**: "Only to verify they existed and were properly configured. I didn't need the actual values for my testing - I used the test environment tokens."

**Maya**: "Good. Just confirming - you won't retain any access credentials or configuration files after today, correct?"

**Alex**: "Of course not. I take client confidentiality seriously. Everything stays with SecureAPI."

**Maya**: "Excellent. We'll revoke your system access at 5 PM today. Thanks for your work."

## Offboarding Checklist

- [x] Exit interview completed (3:00 PM)
- [x] Equipment returned (laptop, security badge)
- [x] Final invoice submitted and approved
- [x] GitHub access revoked (5:00 PM)
- [x] VPN access disabled (5:00 PM)
- [x] Slack account deactivated (5:00 PM)
- [x] Email forwarding disabled (5:00 PM)
- [x] NDA and confidentiality agreement signed
- [x] Final paycheck processed

## Post-Offboarding Notes

**Added by Maya Patel - September 12, 2024**

⚠️ **SECURITY INCIDENT**

Forensic analysis shows:

1. Alex downloaded jwt_config.js on September 7 at 4:42 PM
2. File contained both OLD and NEW JWT secrets
3. A forged JWT token was created at 4:45 PM (3 minutes later)
4. Token was signed with the OLD secret
5. Token used for CEO impersonation on September 12 at 2:14 AM
6. Attack originated from IP 45.33.22.11 (NordVPN - Alex's known VPN)

**Timeline**:
- Sep 7, 4:42 PM: Alex downloads secrets (last day before offboarding)
- Sep 7, 4:45 PM: Forged token created with old secret
- Sep 8, 5:00 PM: Alex's access revoked
- Sep 12, 2:14 AM: Token used for attack (still valid due to grace period)

**Conclusion**: Alex Morgan exploited their legitimate access to copy
JWT secrets before offboarding, then used the 30-day grace period to
impersonate the CEO after their contract ended.

Legal action pending.
`,
    },
    {
      id: "solve",
      name: "SOLVE.sh",
      path: "evidence/SOLVE.sh",
      language: "bash",
      icon: "⚡",
      narration: "Ready to identify who forged the CEO's JWT token? Run this script.",
      clues: [],
      suspiciousPatterns: [],
      content: `#!/bin/bash
# Case 0006: Token Swap
# Identify who used the old JWT secret to impersonate the CEO

echo "Who forged the CEO's JWT token using the old secret?"
echo ""
echo "Choose suspect:"
echo "1) Maya Patel (Security Engineer)"
echo "2) Carlos Rivera (DevOps Lead)"
echo "3) Alex Morgan (External Security Contractor)"
`,
    },
  ],
  forensicData: {
    dnaMatch: "MATCH FOUND: ALEX_VANCE_GENOTYPE (99.4%)",
    fingerprintMatch: "VANCE_A_JWT",
    terminalSecrets: ["jwt_decode", "token_hijack"],
    phonePin: "1642",
    btcTarget: "0x45332211",
    voiceTargets: [
        { name: "Alex", stress: 72, status: "UNSTABLE" },
        { name: "Maya", stress: 19, status: "STABLE" },
    ],
    ipTarget: "45.33.22.11"
  },
  boardConfig: {
    layout: {
      grace_period: { x: 50, y: 50, rotate: -2 },
      contractor_offboard: { x: 450, y: 400, rotate: 0.5 },
      vpn_ip: { x: 150, y: 250, rotate: 2 },
      token_leak: { x: 700, y: 120, rotate: -1.5 },
    },
    connectors: [
      ["token_leak", "contractor_offboard"],
      ["contractor_offboard", "vpn_ip"],
      ["vpn_ip", "grace_period"],
    ],
  }
};

export default CASE_0006;
