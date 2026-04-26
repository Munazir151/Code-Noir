import type { FullCase } from "./cases";

export const CASE_0010: FullCase = {
  id: "0010",
  caseNumber: "CASE_0010",
  title: "Redis No Auth",
  difficulty: "medium",
  isLocked: false,
  tagline:
    "A Redis instance without a password. Session tokens for sale on the dark web.",
  victim: "SessionAuth Inc. — 15,000 session tokens stolen",
  description:
    "A Redis instance was deployed without authentication enabled. Someone connected, dumped all session tokens, and sold them on the dark web. The security researcher who 'discovered' it had access to it for 3 days before reporting.",
  introTitle: "REDIS NO AUTH",
  introBody1: "No password. No authentication. Just open to the world.",
  introBody2: "Someone found it. And took everything.",

  suspects: [
    {
      id: "mike_backend",
      name: "Mike Torres",
      role: "Backend Developer, SessionAuth",
      emoji: "💻",
      terminalOutput: {
        evidence: [
          "✓ Mike deployed the Redis instance on March 10th.",
          "✓ Mike's deployment script shows Redis was started without auth.",
          "✗ Mike followed the SRE team's deployment guide (which was missing auth step).",
          "✗ Mike's IP does NOT appear in Redis connection logs.",
          "✗ Mike reported feeling bad about the deployment after learning about the breach.",
          "✗ Mike had no access to dark web marketplaces.",
        ],
        verdict: "WRONG SUSPECT",
        message:
          "Mike Torres deployed Redis following the SRE team's incomplete guide. He made an operational mistake, not a malicious act. His IP doesn't appear in the connection logs and he had no involvement in selling the tokens.",
      },
      verdictScreen: {
        type: "wrong",
        message:
          "Mike Torres deployed Redis without authentication because the SRE deployment guide was missing that critical step. He had no malicious intent and his IP doesn't match any of the Redis connections or dark web activity.",
      },
    },
    {
      id: "sarah_sre",
      name: "Sarah Kim",
      role: "SRE, SessionAuth",
      emoji: "⚙️",
      terminalOutput: {
        evidence: [
          "✓ Sarah wrote the Redis deployment guide that Mike followed.",
          "✓ Sarah's guide was missing the 'requirepass' authentication step.",
          "✗ Sarah immediately updated the guide when the breach was discovered.",
          "✗ Sarah's IP does NOT appear in connection logs.",
          "✗ Sarah helped with incident response and forensics.",
          "✗ Sarah had no connection to dark web marketplaces.",
        ],
        verdict: "WRONG SUSPECT",
        message:
          "Sarah Kim wrote an incomplete deployment guide, which was an honest documentation error. She had no malicious intent, immediately fixed the guide, and helped investigate the breach. Her IP doesn't match any suspicious activity.",
      },
      verdictScreen: {
        type: "wrong",
        message:
          "Sarah Kim's deployment documentation was incomplete, leading to Redis being deployed without authentication. This was a documentation error, not malicious. She helped fix the issue and investigate, and her IP doesn't appear in any suspicious logs.",
      },
    },
    {
      id: "alex_researcher",
      name: "Alex Morgan",
      role: "Security Researcher (External)",
      emoji: "🔍",
      terminalOutput: {
        evidence: [
          "✓ Alex 'reported' the Redis vulnerability on March 13th.",
          "✓ Redis connection logs show Alex's IP (45.33.21.99) connected March 10-13.",
          "✓ Dark web listing for session tokens appeared March 11th (2 days BEFORE report).",
          "✓ Listing includes exact token count (15,247) matching Redis dump.",
          "✓ Payment wallet traced to Alex's known cryptocurrency addresses.",
          "✓ Alex's bug bounty report came 3 days after first connection.",
        ],
        verdict: "GUILTY",
        message:
          "Alex Morgan discovered the unauthenticated Redis instance on March 10th and spent 3 days dumping session tokens before 'responsibly disclosing' it. The dark web listing appeared 2 days before the report, and the payment wallet traces back to Alex's known crypto addresses.",
      },
      verdictScreen: {
        type: "guilty",
        message:
          "Alex Morgan found the open Redis instance and exploited it for 3 days, dumping 15,247 session tokens and listing them for sale on the dark web for $8,500. Only after making the sale did Alex submit a 'responsible disclosure' report to cover their tracks. The connection logs and cryptocurrency trail expose the truth.",
      },
    },
  ],

  correctSuspectId: "alex_researcher",

  clues: [
    {
      id: "clue_no_auth",
      title: "Redis Deployed Without Password",
      description:
        "The redis.conf file shows 'requirepass' is commented out, meaning anyone who can connect to the Redis port can execute any command without authentication.",
      fileId: "redis_conf",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_researcher_ip",
      title: "Alex Connected 3 Days Before Report",
      description:
        "Connection logs show IP 45.33.21.99 (Alex Morgan's known IP) connected to Redis on March 10th, but Alex didn't report the vulnerability until March 13th.",
      fileId: "connection_log",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_dark_web",
      title: "Tokens Listed Before Report",
      description:
        "A dark web marketplace listing for 'SessionAuth tokens - 15,247 active sessions' appeared on March 11th, two full days before Alex's responsible disclosure report.",
      fileId: "darkweb_listing",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_token_count",
      title: "Exact Token Count Match",
      description:
        "The dark web listing advertises exactly 15,247 tokens - matching the precise number of sessions in Redis at the time of the dump. This wasn't a guess.",
      fileId: "darkweb_listing",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_wallet",
      title: "Payment to Alex's Wallet",
      description:
        "The cryptocurrency wallet that received payment for the tokens has been previously linked to Alex Morgan in other bug bounty payments and forum posts.",
      fileId: "darkweb_listing",
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
      {
        id: "redis_conf",
        name: "redis.conf",
        type: "file" as const,
        icon: "⚙️",
      },
      {
        id: "connection_log",
        name: "connection_log.txt",
        type: "file" as const,
        icon: "🔌",
      },
      {
        id: "darkweb_listing",
        name: "darkweb_listing.txt",
        type: "file" as const,
        icon: "🕵️",
      },
      { id: "solve", name: "SOLVE.sh", type: "file" as const, icon: "⚡" },
    ],
  },

  hints: [
    {
      isDone: false,
      text: "Read the incident report to understand the Redis breach.",
      action: { label: "Open README.md", fileId: "readme" },
    },
    {
      isDone: false,
      text: "Check the Redis configuration for security issues.",
      action: { label: "Review redis.conf", fileId: "redis_conf" },
    },
    {
      isDone: false,
      text: "Examine connection logs to see who accessed Redis.",
      action: { label: "Read connection_log.txt", fileId: "connection_log" },
    },
    {
      isDone: false,
      text: "Review the dark web listing for stolen tokens.",
      action: { label: "Check darkweb_listing.txt", fileId: "darkweb_listing" },
    },
    {
      isDone: false,
      text: "Identify the culprit and run the solve script.",
      action: { label: "Execute SOLVE.sh", fileId: "solve" },
    },
  ],

  files: [
    {
      id: "readme",
      name: "README.md",
      path: "evidence/README.md",
      language: "markdown",
      icon: "📄",
      narration:
        "The incident report. Redis was wide open and someone took everything.",
      clues: [],
      suspiciousPatterns: [],
      content: `# Incident Report: Redis Session Token Theft

**Date**: March 13, 2024
**Reporter**: Alex Morgan (Security Researcher)
**Severity**: CRITICAL

## Summary

On March 13, 2024, security researcher Alex Morgan reported that SessionAuth's Redis instance (redis-prod-01.sessionauth.io) was publicly accessible without authentication. Investigation revealed that 15,247 active session tokens had been exfiltrated and were being sold on dark web marketplaces.

## Vulnerability Report (from Alex Morgan)

**Submitted**: March 13, 2024 at 11:47 AM

> Subject: Critical Security Vulnerability - Unauthenticated Redis Instance
>
> Hi SessionAuth Security Team,
>
> I discovered that your production Redis instance at redis-prod-01.sessionauth.io:6379
> is publicly accessible without any authentication requirement.
>
> Anyone can connect and execute Redis commands, including:
> - KEYS * (list all keys)
> - GET (retrieve session tokens)
> - FLUSHALL (delete all data)
>
> This is a critical security vulnerability that exposes all session tokens
> stored in Redis to unauthorized access.
>
> I'm reporting this through your bug bounty program and recommend immediate
> remediation by enabling Redis authentication (requirepass configuration).
>
> Best regards,
> Alex Morgan
> Security Researcher

## Initial Response

The security team immediately investigated and confirmed:

1. ✅ Redis instance was indeed publicly accessible
2. ✅ No authentication configured (requirepass not set)
3. ✅ Instance contained 15,247 active user session tokens
4. ✅ Redis was deployed March 10th without proper security configuration

## Dark Web Discovery

During investigation, the security team found:

- Dark web listing for "SessionAuth session tokens" posted March 11th
- Listing advertised exactly 15,247 tokens for sale
- Price: $8,500 in cryptocurrency
- Listing appeared 2 days BEFORE Alex's report

## Timeline

- **March 10, 10:30 AM**: Mike Torres deploys Redis (following SRE guide)
- **March 10, 2:45 PM**: First external connection to Redis detected
- **March 11, 9:15 AM**: Dark web listing appears
- **March 13, 11:47 AM**: Alex Morgan submits vulnerability report
- **March 13, 12:05 PM**: Security team discovers dark web listing

## Questions

1. Who accessed the Redis instance before it was secured?
2. How did dark web listing appear before the vulnerability report?
3. Is the researcher involved in the theft?

## Evidence Files

1. **redis.conf** - Redis configuration showing missing authentication
2. **connection_log.txt** - Network connections to Redis instance
3. **darkweb_listing.txt** - Dark web marketplace listing for stolen tokens
`,
    },
    {
      id: "redis_conf",
      name: "redis.conf",
      path: "evidence/redis.conf",
      language: "conf",
      icon: "⚙️",
      narration: "Redis configuration file. No password protection configured.",
      clues: ["clue_no_auth"],
      suspiciousPatterns: [
        {
          pattern: "# requirepass",
          reason: "Authentication is commented out - Redis has no password",
        },
        {
          pattern: "bind 0.0.0.0",
          reason: "Redis bound to all interfaces, publicly accessible",
        },
      ],
      content: `# Redis Configuration File
# Deployed: March 10, 2024 by Mike Torres
# Environment: Production
# Instance: redis-prod-01.sessionauth.io

# Network Configuration
bind 0.0.0.0
port 6379
tcp-backlog 511
timeout 0
tcp-keepalive 300

# SECURITY WARNING: Instance is publicly accessible!
# bind 0.0.0.0 means Redis accepts connections from ANY IP address
# This is dangerous without authentication enabled

# General Configuration
daemonize yes
supervised no
pidfile /var/run/redis_6379.pid
loglevel notice
logfile /var/log/redis/redis-server.log

# Snapshotting
save 900 1
save 300 10
save 60 10000
stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
dbfilename dump.rdb
dir /var/lib/redis

# Replication
replica-serve-stale-data yes
replica-read-only yes

# SECURITY - AUTHENTICATION
# ============================================
# WARNING: No password protection is configured!
#
# The 'requirepass' directive is COMMENTED OUT below.
# This means ANYONE who can reach port 6379 can:
# - Read all data
# - Write/modify data
# - Delete everything
# - Execute any Redis command
#
# requirepass your_secure_password_here
#
# ============================================

# From SRE deployment guide (redis-deploy-v1.2.md):
# "Step 7: Configure Redis security settings"
#
# NOTE: This section was MISSING from the deployment guide!
# Mike Torres followed the guide exactly but there was no
# instruction to uncomment and set 'requirepass'.
#
# The guide jumped from "Step 6: Configure persistence"
# to "Step 8: Start Redis service" - skipping authentication.

# Rename dangerous commands (also not configured)
# rename-command FLUSHDB ""
# rename-command FLUSHALL ""
# rename-command KEYS ""
# rename-command CONFIG ""

# Memory Management
maxmemory 2gb
maxmemory-policy allkeys-lru
maxmemory-samples 5

# Append Only File
appendonly no
appendfilename "appendonly.aof"
appendfsync everysec
no-appendfsync-on-rewrite no

# Slow Log
slowlog-log-slower-than 10000
slowlog-max-len 128

# Latency Monitor
latency-monitor-threshold 100

# Active Defragmentation
activedefrag no

# Client Output Buffer Limits
client-output-buffer-limit normal 0 0 0
client-output-buffer-limit replica 256mb 64mb 60
client-output-buffer-limit pubsub 32mb 8mb 60

# DEPLOYMENT NOTES
# ================
# Deployed by: Mike Torres (mike.torres@sessionauth.io)
# Date: March 10, 2024 10:30 AM
# Purpose: Production session storage
# Data: User session tokens (15,000+ active sessions)
#
# Deployment followed: SRE Redis Deployment Guide v1.2
# Guide author: Sarah Kim (sarah.kim@sessionauth.io)
#
# SECURITY ISSUE: Authentication was not configured!
# Root cause: Deployment guide missing requirepass step
#
# This instance was publicly accessible without password
# from March 10, 10:30 AM until March 13, 12:15 PM when
# it was secured after Alex Morgan's vulnerability report.
#
# Total exposure time: 73 hours 45 minutes
`,
    },
    {
      id: "connection_log",
      name: "connection_log.txt",
      path: "evidence/connection_log.txt",
      language: "log",
      icon: "🔌",
      narration:
        "Redis connection logs. Someone was connecting for 3 days before reporting it.",
      clues: ["clue_researcher_ip"],
      suspiciousPatterns: [
        {
          pattern: "45.33.21.99",
          reason: "Alex Morgan's IP - connected 3 days before reporting",
        },
        { pattern: "KEYS \\*", reason: "Attacker enumerated all keys" },
        { pattern: "DUMP", reason: "Session tokens were dumped/exported" },
      ],
      content: `# Redis Connection Log
# Instance: redis-prod-01.sessionauth.io:6379
# Date Range: March 10-13, 2024

═══════════════════════════════════════════════════════════
MARCH 10, 2024 - Initial Deployment
═══════════════════════════════════════════════════════════

[2024-03-10 10:30:15] INFO: Redis server started
  Version: 7.0.11
  Port: 6379
  PID: 12847
  Authentication: DISABLED ⚠️

[2024-03-10 10:31:22] CONN: Client connected
  IP: 203.0.113.50 (internal network)
  User: mike.torres@sessionauth.io
  Command: PING
  Response: PONG

[2024-03-10 10:32:05] CONN: Client connected
  IP: 203.0.113.50
  User: mike.torres@sessionauth.io
  Command: INFO server
  Response: OK (returned server info)

[2024-03-10 10:35:18] INFO: First session tokens stored
  Keys: session:user:* (127 active sessions)

═══════════════════════════════════════════════════════════
MARCH 10, 2024 - External Access Begins
═══════════════════════════════════════════════════════════

[2024-03-10 14:45:33] CONN: Client connected ⚠️
  IP: 45.33.21.99 (EXTERNAL - Not internal network!)
  Location: Ashburn, VA, United States
  ISP: Digital Ocean
  Command: PING
  Response: PONG
  Auth: NONE (no password required)

[2024-03-10 14:45:45] CONN: Same client
  IP: 45.33.21.99
  Command: INFO server
  Response: OK

[2024-03-10 14:46:02] CONN: Same client
  IP: 45.33.21.99
  Command: CONFIG GET requirepass
  Response: "" (empty - no password set!)

[2024-03-10 14:46:15] SUSPICIOUS: Reconnaissance activity
  IP: 45.33.21.99
  Command: KEYS *
  Response: 1,247 keys returned
  Note: Attacker enumerated all keys in database

[2024-03-10 14:47:30] SUSPICIOUS: Data exfiltration
  IP: 45.33.21.99
  Command: GET session:user:8472
  Response: Token returned
  Command: GET session:user:3391
  Response: Token returned
  [... 50 more GET commands ...]

[2024-03-10 14:52:18] CONN: Client disconnected
  IP: 45.33.21.99
  Duration: 6 minutes 45 seconds
  Commands executed: 67

═══════════════════════════════════════════════════════════
MARCH 11, 2024 - Mass Exfiltration
═══════════════════════════════════════════════════════════

[2024-03-11 09:15:22] CONN: Client connected
  IP: 45.33.21.99 (same external IP)
  Command: KEYS session:*
  Response: 15,247 keys returned

[2024-03-11 09:16:00] CRITICAL: Bulk data export
  IP: 45.33.21.99
  Script: Using DUMP command in loop
  Progress:
    09:16 - 09:20 | DUMP 1,000 keys
    09:20 - 09:35 | DUMP 5,000 keys
    09:35 - 10:15 | DUMP 10,000 keys
    10:15 - 10:47 | DUMP 15,247 keys (complete)

[2024-03-11 10:47:18] INFO: Bulk export complete
  IP: 45.33.21.99
  Total keys dumped: 15,247
  Total time: 1 hour 31 minutes
  Estimated data: ~890 MB of session tokens

[2024-03-11 10:47:30] CONN: Client disconnected
  IP: 45.33.21.99
  Duration: 1 hour 32 minutes

═══════════════════════════════════════════════════════════
MARCH 12, 2024 - Verification Access
═══════════════════════════════════════════════════════════

[2024-03-12 16:20:15] CONN: Client connected
  IP: 45.33.21.99 (same external IP)
  Command: DBSIZE
  Response: 15,892 keys (users still active)

[2024-03-12 16:20:30] CONN: Same client
  IP: 45.33.21.99
  Command: KEYS session:* | wc -l
  Response: 15,892 (session count verification)

[2024-03-12 16:21:00] CONN: Client disconnected
  IP: 45.33.21.99
  Duration: 45 seconds
  Note: Quick check, possibly to verify data before sale

═══════════════════════════════════════════════════════════
MARCH 13, 2024 - Researcher "Discovers" Vulnerability
═══════════════════════════════════════════════════════════

[2024-03-13 11:30:00] CONN: Client connected
  IP: 45.33.21.99 (same external IP from before!)
  Command: INFO
  Response: OK

[2024-03-13 11:30:15] CONN: Same client
  IP: 45.33.21.99
  Command: CONFIG GET requirepass
  Response: "" (still no password)

[2024-03-13 11:30:30] CONN: Client disconnected
  IP: 45.33.21.99
  Duration: 30 seconds

[2024-03-13 11:47:00] EMAIL: Vulnerability report received
  From: Alex Morgan (alex.morgan.sec@protonmail.com)
  Subject: Critical - Unauthenticated Redis Instance
  Time: 11:47 AM (17 minutes after last connection)

[2024-03-13 12:15:22] ADMIN: Emergency password set
  User: security.team@sessionauth.io
  Command: CONFIG SET requirepass [REDACTED]
  Response: OK
  Note: Authentication enabled, instance secured

═══════════════════════════════════════════════════════════
IP ADDRESS INVESTIGATION
═══════════════════════════════════════════════════════════

IP: 45.33.21.99
Owner: Digital Ocean VPS
Location: Ashburn, VA
Registration: Traced to alex_m_security (Alex Morgan's handle)

Cross-reference with known IPs for Alex Morgan:
- Bug bounty program submissions: 45.33.21.*
- Security conference presentations: 45.33.21.99 (exact match!)
- GitHub commits: Linked to same VPS
- Twitter posts: Geotagged from same IP range

Conclusion: IP 45.33.21.99 is definitively linked to Alex Morgan

═══════════════════════════════════════════════════════════
TIMELINE ANALYSIS
═══════════════════════════════════════════════════════════

March 10, 2:45 PM - Alex discovers open Redis
March 10, 2:46 PM - Alex confirms no auth required
March 10, 2:47 PM - Alex downloads sample tokens (reconnaissance)
March 11, 9:15 AM - Alex dumps all 15,247 tokens (1.5 hours)
March 11, ~11:00 AM - Dark web listing appears
March 12, 4:20 PM - Alex verifies tokens still valid
March 13, 11:30 AM - Alex makes final check
March 13, 11:47 AM - Alex "reports" vulnerability

Time between discovery and report: 3 days
Time between theft and report: 2 days

Alex had the data for 2+ days before reporting.
`,
    },
    {
      id: "darkweb_listing",
      name: "darkweb_listing.txt",
      path: "evidence/darkweb_listing.txt",
      language: "plaintext",
      icon: "🕵️",
      narration:
        "Dark web marketplace listing. Tokens were for sale before they were 'responsibly disclosed'.",
      clues: ["clue_dark_web", "clue_token_count", "clue_wallet"],
      suspiciousPatterns: [
        {
          pattern: "15,247 active tokens",
          reason: "Exact count matches Redis dump",
        },
        {
          pattern: "Posted: 2024-03-11",
          reason: "Listed 2 days before vulnerability report",
        },
        {
          pattern: "bc1q.*alex",
          reason: "Cryptocurrency wallet linked to Alex Morgan",
        },
      ],
      content: `═══════════════════════════════════════════════════════════
          DARK WEB MARKETPLACE LISTING
          [Captured by law enforcement cyber unit]
═══════════════════════════════════════════════════════════

Marketplace: DarkBay
Category: Databases & Access
Listing ID: DB-47829
Posted: 2024-03-11 11:22:03 UTC
Seller: tech_sec_alex (Verified Seller ⭐⭐⭐⭐)

───────────────────────────────────────────────────────────
PRODUCT TITLE
───────────────────────────────────────────────────────────

🔥 FRESH SessionAuth Session Tokens - 15,247 Active Users 🔥

───────────────────────────────────────────────────────────
DESCRIPTION
───────────────────────────────────────────────────────────

Selling a complete dump of SessionAuth.io session tokens.
All tokens are ACTIVE and VALID as of March 11, 2024.

What you get:
✓ 15,247 active session tokens
✓ Redis RDB dump format (ready to import)
✓ Token metadata (user IDs, expiration times)
✓ Full access to user accounts
✓ Tokens valid for 30+ days

SessionAuth powers authentication for 40+ SaaS applications.
Each token grants full access to user accounts including:
- Email and profile data
- Payment methods
- Usage history
- API keys
- Connected services

This is a FRESH dump from production Redis instance.
Extracted: March 11, 2024 at 10:47 AM UTC

No detection - their security team hasn't noticed yet.
Instance is still wide open, you could grab more if needed.

───────────────────────────────────────────────────────────
PRICE
───────────────────────────────────────────────────────────

$8,500 USD (Bitcoin or Monero accepted)

Price is FIRM. This is high-quality, fresh data.

───────────────────────────────────────────────────────────
PAYMENT & DELIVERY
───────────────────────────────────────────────────────────

Payment: BTC to bc1q8x2f9k7m3h5n6p4w8y2z1a5c7e9g2j4l6m8n0p2
         (or Monero to equivalent address)

Delivery: Automatic via encrypted file host after payment
Format: Redis RDB dump file (890 MB compressed)

Escrow: Available through DarkBay (+ 3% fee)

───────────────────────────────────────────────────────────
SELLER INFO
───────────────────────────────────────────────────────────

Username: tech_sec_alex
Rating: ⭐⭐⭐⭐ (4.7/5.0)
Sales: 47 completed
Member Since: 2022-08-15
Verified: Yes ✓

Previous listings:
- API keys (various platforms)
- Database dumps
- Cloud credentials
- Bug bounty POCs (legitimate side)

Seller note: "I work in security research. Sometimes I find
things that companies don't value appropriately via bug
bounty programs. Those items end up here. Quality guaranteed."

───────────────────────────────────────────────────────────
BUYER REVIEWS (After Purchase)
───────────────────────────────────────────────────────────

[2024-03-11 18:45] buyer_darknet_93 ⭐⭐⭐⭐⭐
"Tokens work perfectly. Exactly 15,247 as described. Already
accessed 20+ accounts. Quality data. Fast delivery. A+++"

[2024-03-12 03:22] access_trader ⭐⭐⭐⭐⭐
"Legit. Imported into my Redis instance, all tokens valid.
SessionAuth has no idea lol. Seller is professional."

[2024-03-12 14:50] token_collector ⭐⭐⭐⭐
"Good product but pricey. Tokens are valid though. Would
buy again if price drops."

───────────────────────────────────────────────────────────
FORENSIC ANALYSIS NOTES
───────────────────────────────────────────────────────────

Investigation by SessionAuth Security Team:

Listing posted: March 11, 2024 at 11:22 AM
Alex's report: March 13, 2024 at 11:47 AM
Gap: 2 days, 30 minutes

Cryptocurrency Wallet Analysis:

BTC Address: bc1q8x2f9k7m3h5n6p4w8y2z1a5c7e9g2j4l6m8n0p2

Blockchain transactions:
[2024-03-11 18:50] Received: 0.142 BTC ($8,500)
[2024-03-11 18:55] Received: 0.142 BTC ($8,500)
[2024-03-12 03:30] Received: 0.142 BTC ($8,500)

Total received: 0.426 BTC (~$25,500)

Wallet traced to:
- Email: alex.m.security.research@protonmail.com
- Bug bounty payout addresses (partial match)
- Forum posts by "alex_m_security"
- GitHub: alex-morgan-security (same wallet in profile)

This wallet has been PUBLICLY linked to Alex Morgan in:
1. Bug bounty payment requests (HackerOne profile)
2. Security conference presentations (slide deck)
3. Research paper donations section
4. Multiple forum posts asking for tips/donations

Alex Morgan didn't even bother using a new wallet!

───────────────────────────────────────────────────────────
TIMELINE CORRELATION
───────────────────────────────────────────────────────────

March 10, 2:45 PM - Alex discovers Redis (connection logs)
March 11, 10:47 AM - Alex completes token dump (connection logs)
March 11, 11:22 AM - Dark web listing appears (35 min later!)
March 11, 6:50 PM - First sale confirmed (buyer review)
March 13, 11:47 AM - Alex "responsibly discloses" vulnerability

Alex sold the data BEFORE reporting the vulnerability.

This was not responsible disclosure.
This was theft with a disclosure as cover story.

───────────────────────────────────────────────────────────
CONCLUSION
───────────────────────────────────────────────────────────

Alex Morgan:
✓ Discovered unauthenticated Redis instance March 10
✓ Dumped all 15,247 session tokens March 11
✓ Listed tokens for sale same day
✓ Made ~$25,500 from 3 sales in 2 days
✓ Reported vulnerability March 13 (after selling data)
✓ Used personal crypto wallet (easily traced)

The "responsible disclosure" was cover for data theft.

═══════════════════════════════════════════════════════════
`,
    },
    {
      id: "solve",
      name: "SOLVE.sh",
      path: "evidence/SOLVE.sh",
      language: "bash",
      icon: "⚡",
      narration:
        "Ready to identify who stole and sold the Redis session tokens? Run this script.",
      clues: [],
      suspiciousPatterns: [],
      content: `#!/bin/bash
# Case 0010: Redis No Auth
# Identify who dumped Redis tokens and sold them on the dark web

echo "Who stole the session tokens from Redis and sold them on the dark web?"
echo ""
echo "Choose suspect:"
echo "1) Mike Torres (Backend Developer)"
echo "2) Sarah Kim (SRE)"
echo "3) Alex Morgan (Security Researcher)"
`,
    },
  ],
  forensicData: {
    dnaMatch: "MATCH FOUND: MORGAN_A_GENOTYPE (99.2%)",
    fingerprintMatch: "MORGAN_A_REDIS",
    terminalSecrets: ["redis_dump", "token_cleanup"],
    phonePin: "1122",
    btcTarget: "0x453312",
    voiceTargets: [
        { name: "Alex", stress: 78, status: "DECEPTION_LIKELY" },
        { name: "IT Lead", stress: 15, status: "STABLE" },
    ],
    ipTarget: "45.33.1.2"
  },
  boardConfig: {
    layout: {
      no_auth: { x: 50, y: 50, rotate: -2 },
      researcher_ip: { x: 150, y: 250, rotate: 2 },
      dark_web: { x: 450, y: 400, rotate: 0.5 },
      wallet_0010: { x: 700, y: 120, rotate: -1.5 },
    },
    connectors: [
      ["no_auth", "researcher_ip"],
      ["researcher_ip", "dark_web"],
      ["dark_web", "wallet_0010"],
    ],
  }
};

export default CASE_0010;
