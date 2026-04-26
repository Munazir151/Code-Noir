import type { FullCase } from "./cases";

export const CASE_0009: FullCase = {
  id: "0009",
  caseNumber: "CASE_0009",
  title: "S3 Public",
  difficulty: "easy",
  isLocked: false,
  tagline:
    "An S3 bucket went public. 2.4 TB downloaded in 6 hours. Someone saw it first.",
  victim: "CloudData Corp — 2.4 TB customer data exposed",
  description:
    "An S3 bucket containing customer data was accidentally made public. Someone downloaded 2.4 terabytes before reporting it 6 hours later. The question is: who downloaded it, and why did they wait so long to report?",
  introTitle: "S3 PUBLIC",
  introBody1:
    "A bucket policy changed. The internet could suddenly see everything.",
  introBody2: "But one person saw it first.",

  suspects: [
    {
      id: "david_admin",
      name: "David Park",
      role: "Cloud Administrator, CloudData",
      emoji: "☁️",
      terminalOutput: {
        evidence: [
          "✓ David changed the S3 bucket policy on Nov 3 at 10:15 AM.",
          "✓ Change made bucket 'customer-data-prod' publicly readable.",
          "✗ David was following a deployment runbook (wrong bucket specified).",
          "✗ David's IP does NOT appear in the download logs.",
          "✗ David reported the misconfiguration in incident ticket.",
          "✗ David immediately fixed the policy when alerted.",
        ],
        verdict: "WRONG SUSPECT",
        message:
          "David Park made an honest mistake by following an incorrect runbook that specified the wrong bucket. He had no malicious intent and his IP doesn't appear in the data download logs.",
      },
      verdictScreen: {
        type: "wrong",
        message:
          "David Park accidentally made the bucket public by following a faulty deployment runbook. He had no idea customer data was exposed and immediately fixed it when notified. His IP doesn't match the download activity.",
      },
    },
    {
      id: "lisa_scientist",
      name: "Lisa Chen",
      role: "Data Scientist, CloudData",
      emoji: "📊",
      terminalOutput: {
        evidence: [
          "✓ Lisa had read access to monitor S3 buckets for her ML work.",
          "✓ CloudTrail shows Lisa's IP (198.51.100.156) downloading 2.4 TB on Nov 3.",
          "✓ Download started at 10:47 AM (32 minutes after bucket went public).",
          "✓ Lisa 'reported' the public bucket at 4:52 PM (6 hours after downloading).",
          "✓ Lisa's monitoring dashboard would have alerted her immediately.",
          "✓ Downloaded data found on Lisa's personal AWS account (forensics).",
        ],
        verdict: "GUILTY",
        message:
          "Lisa Chen's monitoring system alerted her to the public bucket within minutes. Instead of reporting it immediately, she spent 6 hours downloading 2.4 TB of customer data to her personal AWS account. She only reported it after finishing the download to avoid suspicion.",
      },
      verdictScreen: {
        type: "guilty",
        message:
          "Lisa Chen saw the public bucket alert at 10:47 AM and immediately began downloading customer data to her personal AWS account. After completing the 2.4 TB download, she waited until 4:52 PM to report the issue - creating a 6-hour window she exploited for data theft.",
      },
    },
    {
      id: "bot_external",
      name: "Automated Scanner Bot",
      role: "External Threat",
      emoji: "🤖",
      terminalOutput: {
        evidence: [
          "✓ External bots constantly scan AWS for public S3 buckets.",
          "✓ CloudTrail shows some external IP access attempts.",
          "✗ External IPs only accessed bucket AFTER Lisa's download completed.",
          "✗ External downloads were small (< 100 MB total, just reconnaissance).",
          "✗ The 2.4 TB download came from Lisa's IP (198.51.100.156).",
          "✗ Lisa is an internal employee with legitimate access credentials.",
        ],
        verdict: "WRONG SUSPECT",
        message:
          "While external scanners did find the public bucket, they only performed reconnaissance. The massive 2.4 TB download was made by Lisa Chen from her office IP address using legitimate AWS credentials.",
      },
      verdictScreen: {
        type: "wrong",
        message:
          "External bots did scan the bucket but only accessed small amounts of data for reconnaissance. The 2.4 TB download came from inside the company - Lisa Chen's authenticated AWS session from her office IP.",
      },
    },
  ],

  correctSuspectId: "lisa_scientist",

  clues: [
    {
      id: "clue_bucket_public",
      title: "Bucket Made Publicly Readable",
      description:
        "The S3 bucket policy was changed to allow public read access on November 3 at 10:15 AM due to a runbook error specifying the wrong bucket name.",
      fileId: "s3_policy",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_lisa_download",
      title: "Lisa's IP Downloaded 2.4 TB",
      description:
        "CloudTrail logs show IP 198.51.100.156 (Lisa Chen's office IP) downloaded 2.4 terabytes starting at 10:47 AM - just 32 minutes after the bucket became public.",
      fileId: "cloudtrail",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_delayed_report",
      title: "6-Hour Delay Before Reporting",
      description:
        "Lisa 'discovered' and reported the public bucket at 4:52 PM - exactly 6 hours and 5 minutes after she started downloading the data. Suspicious timing.",
      fileId: "incident_timeline",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_monitoring_alert",
      title: "Lisa's Dashboard Alerted Immediately",
      description:
        "Lisa's ML monitoring dashboard sends automatic alerts for S3 policy changes. She would have been notified within minutes of the bucket becoming public.",
      fileId: "incident_timeline",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_personal_aws",
      title: "Data Found on Personal AWS Account",
      description:
        "Forensic analysis found the downloaded customer data on Lisa's personal AWS account, transferred during the 6-hour window.",
      fileId: "cloudtrail",
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
        id: "s3_policy",
        name: "s3_bucket_policy.json",
        type: "file" as const,
        icon: "🪣",
      },
      {
        id: "cloudtrail",
        name: "cloudtrail.log",
        type: "file" as const,
        icon: "📊",
      },
      {
        id: "incident_timeline",
        name: "incident_timeline.md",
        type: "file" as const,
        icon: "📅",
      },
      { id: "solve", name: "SOLVE.sh", type: "file" as const, icon: "⚡" },
    ],
  },

  hints: [
    {
      isDone: false,
      text: "Start with the incident timeline to understand what happened.",
      action: { label: "Open README.md", fileId: "readme" },
    },
    {
      isDone: false,
      text: "Check the S3 bucket policy to see how it became public.",
      action: { label: "Review s3_bucket_policy.json", fileId: "s3_policy" },
    },
    {
      isDone: false,
      text: "Examine CloudTrail logs for download activity.",
      action: { label: "Read cloudtrail.log", fileId: "cloudtrail" },
    },
    {
      isDone: false,
      text: "Review the incident timeline for suspicious delays.",
      action: {
        label: "Check incident_timeline.md",
        fileId: "incident_timeline",
      },
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
        "The incident report. An S3 bucket went public and someone downloaded everything.",
      clues: [],
      suspiciousPatterns: [],
      content: `# Incident Report: S3 Bucket Public Exposure

**Date**: November 3, 2024
**Reporter**: Lisa Chen, Data Scientist
**Severity**: CRITICAL

## Summary

On November 3, 2024, an S3 bucket containing 2.4 terabytes of customer data was accidentally made publicly readable for approximately 6 hours. During this window, the entire bucket contents were downloaded by an unknown party.

## Incident Discovery

**4:52 PM - Lisa Chen's Report:**
> "I was reviewing S3 bucket configurations and noticed that the
> 'customer-data-prod' bucket has public read permissions enabled.
> This bucket contains sensitive customer data and should be private.
> Can someone from cloud ops please investigate?"

## Initial Response

**5:05 PM - David Park (Cloud Admin) Response:**
> "Oh no! I changed that bucket policy this morning during a deployment.
> I was following the runbook for making the 'public-assets' bucket
> accessible, but I must have typed the wrong bucket name.
> Reverting immediately!"

**5:06 PM - Bucket Policy Reverted**
- Public read access removed
- Bucket returned to private state
- Damage already done

## Investigation Scope

The security team began investigating:
1. How long was the bucket public?
2. Did anyone access the data?
3. How much data was downloaded?

CloudTrail analysis revealed shocking findings.

## Evidence Files

1. **s3_bucket_policy.json** - The bucket policy that made data public
2. **cloudtrail.log** - AWS CloudTrail logs showing all access
3. **incident_timeline.md** - Detailed timeline of events

## Status

Investigation ongoing. 2.4 TB of customer data was downloaded during the exposure window.
`,
    },
    {
      id: "s3_policy",
      name: "s3_bucket_policy.json",
      path: "evidence/s3_bucket_policy.json",
      language: "json",
      icon: "🪣",
      narration: "The S3 bucket policy. Someone made it world-readable.",
      clues: ["clue_bucket_public"],
      suspiciousPatterns: [
        {
          pattern: "Allow.*s3:GetObject.*\\*",
          reason: "Policy grants public read access to everyone",
        },
      ],
      content: `{
  "bucket_name": "customer-data-prod",
  "policy_history": [
    {
      "version_id": "v1_original",
      "effective_date": "2023-01-15",
      "modified_by": "sarah.mitchell@clouddata.io",
      "policy": {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "DenyPublicAccess",
            "Effect": "Deny",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": [
              "arn:aws:s3:::customer-data-prod",
              "arn:aws:s3:::customer-data-prod/*"
            ],
            "Condition": {
              "StringNotEquals": {
                "aws:PrincipalOrgID": "o-clouddata123"
              }
            }
          }
        ]
      },
      "note": "Original secure policy - only org members can access"
    },
    {
      "version_id": "v2_public_mistake",
      "effective_date": "2024-11-03T10:15:22Z",
      "modified_by": "david.park@clouddata.io",
      "change_reason": "Deployment: Make public-assets bucket accessible for CDN",
      "policy": {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "PublicReadAccess",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
              "s3:GetObject",
              "s3:ListBucket"
            ],
            "Resource": [
              "arn:aws:s3:::customer-data-prod",
              "arn:aws:s3:::customer-data-prod/*"
            ]
          }
        ]
      },
      "note": "ERROR: David Park applied public policy to WRONG bucket. Should have been 'public-assets' bucket, not 'customer-data-prod'"
    },
    {
      "version_id": "v3_reverted",
      "effective_date": "2024-11-03T17:06:15Z",
      "modified_by": "david.park@clouddata.io",
      "change_reason": "EMERGENCY: Revert accidental public access",
      "policy": {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "DenyPublicAccess",
            "Effect": "Deny",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": [
              "arn:aws:s3:::customer-data-prod",
              "arn:aws:s3:::customer-data-prod/*"
            ],
            "Condition": {
              "StringNotEquals": {
                "aws:PrincipalOrgID": "o-clouddata123"
              }
            }
          }
        ]
      },
      "note": "Policy reverted after Lisa Chen reported the issue"
    }
  ],
  "exposure_window": {
    "start": "2024-11-03T10:15:22Z",
    "end": "2024-11-03T17:06:15Z",
    "duration_hours": 6.85,
    "duration_minutes": 411
  },
  "bucket_contents": {
    "total_objects": 847293,
    "total_size_bytes": 2573849600000,
    "total_size_tb": 2.34,
    "data_classification": "HIGHLY SENSITIVE - Customer PII",
    "contents": [
      "customer_profiles (847 MB)",
      "transaction_history (1.2 TB)",
      "payment_methods (156 GB)",
      "support_tickets (89 GB)",
      "kyc_documents (412 GB)",
      "encrypted_backups (127 GB - encryption keys NOT in bucket)"
    ]
  },
  "deployment_runbook_error": {
    "intended_bucket": "public-assets",
    "actual_bucket": "customer-data-prod",
    "runbook_step": "Step 7: Apply public-read policy to 'public-assets' bucket",
    "what_david_did": "Copied policy to 'customer-data-prod' by mistake",
    "root_cause": "Buckets have similar names, easy to confuse"
  }
}
`,
    },
    {
      id: "cloudtrail",
      name: "cloudtrail.log",
      path: "evidence/cloudtrail.log",
      language: "log",
      icon: "📊",
      narration:
        "AWS CloudTrail logs. Someone downloaded 2.4 TB right after the bucket went public.",
      clues: ["clue_lisa_download", "clue_personal_aws"],
      suspiciousPatterns: [
        {
          pattern: "198.51.100.156",
          reason: "Lisa Chen's office IP - downloaded 2.4 TB",
        },
        {
          pattern: "2573849600000 bytes",
          reason: "Entire bucket contents downloaded",
        },
        {
          pattern: "lisa.chen.personal",
          reason: "Lisa's personal AWS account received the data",
        },
      ],
      content: `# AWS CloudTrail Event Log
# Bucket: customer-data-prod
# Date: November 3, 2024
# Event Filter: S3 access events

═══════════════════════════════════════════════════════════
BUCKET POLICY CHANGE
═══════════════════════════════════════════════════════════

[2024-11-03 10:15:22 UTC] EVENT: PutBucketPolicy
  User: david.park@clouddata.io
  AWS Account: 123456789012 (CloudData Corp)
  Source IP: 203.0.113.50 (office network)
  Action: Changed bucket policy
  Old Policy: DenyPublicAccess
  New Policy: AllowPublicReadAccess ← SECURITY RISK
  Success: true
  User Agent: AWS CLI/2.13.0

═══════════════════════════════════════════════════════════
INTERNAL MONITORING ACCESS (Lisa Chen)
═══════════════════════════════════════════════════════════

[2024-11-03 10:17:45 UTC] EVENT: GetBucketPolicy
  User: lisa.chen@clouddata.io
  AWS Account: 123456789012 (CloudData Corp)
  Source IP: 198.51.100.156 (Lisa's office workstation)
  Action: Check bucket policy (automated monitoring)
  Success: true
  Note: Lisa's ML monitoring dashboard auto-checks S3 policies

[2024-11-03 10:18:02 UTC] EVENT: ListBucket
  User: lisa.chen@clouddata.io
  AWS Account: 123456789012 (CloudData Corp)
  Source IP: 198.51.100.156
  Action: List bucket contents
  Objects returned: 847,293
  Success: true

═══════════════════════════════════════════════════════════
MASSIVE DATA DOWNLOAD - LISA CHEN
═══════════════════════════════════════════════════════════

[2024-11-03 10:47:15 UTC] EVENT: GetObject (BULK DOWNLOAD START)
  User: lisa.chen@clouddata.io
  AWS Account: 123456789012 (CloudData Corp)
  Source IP: 198.51.100.156
  Action: Download objects
  Transfer Method: S3 Sync to personal AWS account
  Destination: s3://lisa-chen-personal-backup/stolen-data/
  Destination Account: 987654321098 (lisa.chen.personal@gmail.com)

Download Progress:
  10:47:15 - 11:15:30 | customer_profiles/ | 847 MB
  11:15:31 - 13:22:45 | transaction_history/ | 1.2 TB
  13:22:46 - 14:05:12 | payment_methods/ | 156 GB
  14:05:13 - 14:38:44 | support_tickets/ | 89 GB
  14:38:45 - 16:12:33 | kyc_documents/ | 412 GB
  16:12:34 - 16:45:08 | encrypted_backups/ | 127 GB

[2024-11-03 16:45:08 UTC] DOWNLOAD COMPLETE
  Total Objects: 847,293
  Total Bytes: 2,573,849,600,000 (2.34 TB)
  Duration: 5 hours 57 minutes 53 seconds
  Success Rate: 100%
  Failed Objects: 0

═══════════════════════════════════════════════════════════
EXTERNAL SCANNER ACCESS (After Lisa's download)
═══════════════════════════════════════════════════════════

[2024-11-03 16:52:14 UTC] EVENT: ListBucket
  User: Anonymous (public access)
  Source IP: 45.142.212.47 (VPN - Netherlands)
  Action: List bucket contents
  User Agent: python-requests/2.28.1 (automated scanner)
  Success: true
  Note: External bot discovered public bucket

[2024-11-03 16:52:18 UTC] EVENT: GetObject
  User: Anonymous (public access)
  Source IP: 45.142.212.47
  Action: Download sample files
  Objects: 3 files (reconnaissance only)
  Total Size: 47 MB
  Success: true

[2024-11-03 16:58:33 UTC] EVENT: GetObject
  User: Anonymous (public access)
  Source IP: 185.220.101.23 (TOR exit node)
  Action: Download sample files
  Objects: 5 files
  Total Size: 89 MB
  Success: true

[2024-11-03 17:01:44 UTC] EVENT: GetObject
  User: Anonymous (public access)
  Source IP: 104.244.72.115 (US - scanning bot)
  Action: Download test file
  Objects: 1 file
  Total Size: 1.2 MB
  Success: true

═══════════════════════════════════════════════════════════
BUCKET POLICY REVERTED
═══════════════════════════════════════════════════════════

[2024-11-03 17:06:15 UTC] EVENT: PutBucketPolicy
  User: david.park@clouddata.io
  AWS Account: 123456789012 (CloudData Corp)
  Source IP: 203.0.113.50 (office network)
  Action: Revert bucket policy
  Old Policy: AllowPublicReadAccess
  New Policy: DenyPublicAccess ← Security restored
  Success: true
  Trigger: Lisa Chen's report at 4:52 PM

═══════════════════════════════════════════════════════════
DOWNLOAD SUMMARY
═══════════════════════════════════════════════════════════

Internal User Downloads:
  Lisa Chen (198.51.100.156):
    - 2.34 TB (entire bucket)
    - Transferred to personal AWS account
    - Download time: 10:47 AM - 4:45 PM (5h 58m)

External/Anonymous Downloads:
  Various IPs:
    - 137 MB total (reconnaissance only)
    - Random sampling, not systematic
    - After Lisa's download completed

═══════════════════════════════════════════════════════════
IP ADDRESS VERIFICATION
═══════════════════════════════════════════════════════════

198.51.100.156:
  Owner: Lisa Chen
  Location: CloudData Corp Office, Desk 4-B-12
  Device: lisa-mbp-work.local
  Last Seen: 2024-11-03 17:30:00 UTC
  HR Records: Confirmed as Lisa's assigned IP

Lisa's Personal AWS Account:
  Email: lisa.chen.personal@gmail.com
  Account ID: 987654321098
  Created: 2021-04-12
  Recent Activity: Received 2.34 TB from customer-data-prod bucket

═══════════════════════════════════════════════════════════
FORENSIC ANALYSIS
═══════════════════════════════════════════════════════════

Timeline:
  10:15 AM - Bucket becomes public (David's mistake)
  10:18 AM - Lisa's monitoring alerts her
  10:47 AM - Lisa starts downloading everything
  4:45 PM - Lisa completes 2.4 TB download
  4:52 PM - Lisa "reports" the public bucket (7 min after download done)
  5:06 PM - David reverts bucket policy

Suspicious Indicators:
  ✓ Lisa was alerted immediately (monitoring dashboard)
  ✓ Lisa waited 30 minutes before downloading (time to plan)
  ✓ Lisa downloaded EVERYTHING to personal AWS account
  ✓ Lisa only reported it AFTER completing the download
  ✓ 6-hour delay between alert and report is suspicious
  ✓ External bots only found it after Lisa finished

Conclusion: Lisa Chen exploited the public bucket to steal
customer data, then reported it to cover her tracks.
`,
    },
    {
      id: "incident_timeline",
      name: "incident_timeline.md",
      path: "evidence/incident_timeline.md",
      language: "markdown",
      icon: "📅",
      narration:
        "Detailed incident timeline. The 6-hour delay is very suspicious.",
      clues: ["clue_delayed_report", "clue_monitoring_alert"],
      suspiciousPatterns: [
        {
          pattern: "10:18.*automated alert",
          reason: "Lisa's system alerted her immediately",
        },
        {
          pattern: "4:52 PM.*reported",
          reason: "6-hour delay before reporting",
        },
      ],
      content: `# Incident Timeline - S3 Bucket Public Exposure

## Detailed Event Sequence

### 10:15 AM - Initial Mistake

**David Park's Action:**
- Following deployment runbook for "Make public-assets bucket accessible"
- Step 7: "Apply public-read policy to bucket"
- **ERROR**: Applied policy to "customer-data-prod" instead of "public-assets"
- Bucket containing 2.4 TB of customer data is now world-readable

**AWS Console Log:**
\`\`\`
10:15:22 - PutBucketPolicy - customer-data-prod - david.park - SUCCESS
Policy changed from DenyPublicAccess to AllowPublicReadAccess
\`\`\`

---

### 10:18 AM - Lisa's Monitoring System Alerts

**Automated Alert (Lisa Chen's ML Dashboard):**

Lisa's custom monitoring dashboard automatically checks S3 bucket policies every 60 seconds. At 10:18:02, it detected the policy change:

\`\`\`
ALERT: S3 Bucket Policy Change Detected
Time: 2024-11-03 10:18:02 UTC
Bucket: customer-data-prod
Old Policy: DenyPublicAccess
New Policy: AllowPublicReadAccess ← HIGH RISK
Classification: CRITICAL - Public access to sensitive data
Notification sent to: lisa.chen@clouddata.io
\`\`\`

**Lisa's Slack Status:**
- 10:18 AM: Slack shows "🟢 Active" (at her desk)
- 10:19 AM: Email client shows alert was opened
- 10:20 AM: AWS Console accessed from Lisa's IP

**Lisa's Actions (Suspicious):**
- Immediately checked the bucket contents
- Listed all 847,293 objects
- Did NOT report the security issue
- Did NOT contact David Park or security team
- Did NOT create incident ticket

---

### 10:47 AM - Lisa Begins Download

**29 Minutes After Alert**

CloudTrail logs show Lisa initiated a massive S3 sync operation:

\`\`\`
aws s3 sync s3://customer-data-prod s3://lisa-chen-personal-backup/stolen-data/ --profile personal
\`\`\`

**Why the 29-minute delay?**

Forensic analysis of Lisa's laptop:
- 10:20 AM: Created personal AWS credentials (access key)
- 10:25 AM: Configured S3 sync script
- 10:30 AM: Created destination bucket on personal AWS account
- 10:35 AM: Tested sync with small file
- 10:40 AM: Reviewed sync command
- 10:47 AM: Initiated full download

This wasn't impulsive - Lisa carefully planned the data theft.

---

### 10:47 AM - 4:45 PM - Data Exfiltration

**5 Hours 58 Minutes of Continuous Download**

Download progress tracked by CloudTrail:

| Time Range | Folder | Size | Status |
|------------|--------|------|--------|
| 10:47-11:15 | customer_profiles/ | 847 MB | Complete |
| 11:15-13:22 | transaction_history/ | 1.2 TB | Complete |
| 13:22-14:05 | payment_methods/ | 156 GB | Complete |
| 14:05-14:38 | support_tickets/ | 89 GB | Complete |
| 14:38-16:12 | kyc_documents/ | 412 GB | Complete |
| 16:12-16:45 | encrypted_backups/ | 127 GB | Complete |

**Total: 2.34 TB (100% of bucket contents)**

**Lisa's Behavior During This Time:**

Slack activity analysis:
- 11:30 AM: "brb coffee ☕"
- 12:15 PM: "lunch break"
- 2:30 PM: "deep in ML model training, please don't disturb"

Lisa was using these status messages to avoid interruption while the download ran in the background.

---

### 4:45 PM - Download Completes

**CloudTrail Log:**
\`\`\`
16:45:08 UTC - S3 Sync Complete
Objects transferred: 847,293
Bytes transferred: 2,573,849,600,000
Success rate: 100%
Failed objects: 0
Destination: s3://lisa-chen-personal-backup/stolen-data/
\`\`\`

---

### 4:52 PM - Lisa "Reports" the Issue

**7 Minutes After Download Completion**

Lisa's Slack message to #security:

> "Hey team, I was reviewing S3 bucket configurations and noticed
> that the 'customer-data-prod' bucket has public read permissions
> enabled. This bucket contains sensitive customer data and should
> be private. Can someone from cloud ops please investigate?"

**Analysis of Lisa's Report:**

Red flags:
1. ✗ No urgency ("can someone please investigate" not "URGENT")
2. ✗ Phrased as routine review, not emergency discovery
3. ✗ No mention she discovered it 6 hours ago
4. ✗ Reported only AFTER finishing her download
5. ✗ Didn't tag @david.park or @security-team for immediate response

This wasn't a responsible disclosure. This was covering her tracks.

---

### 5:06 PM - Bucket Policy Reverted

**David Park's Response:**

David immediately fixed the bucket policy (14 minutes after Lisa's report).

By this time:
- Lisa had downloaded 2.4 TB to personal account
- External bots had sampled ~137 MB
- Damage was done

---

### 5:30 PM - Security Investigation Begins

**Initial Questions:**

Security team asked:
1. How long was bucket public? → 6 hours 51 minutes
2. Was any data accessed? → Yes, 2.34 TB downloaded
3. Who downloaded it? → CloudTrail analysis reveals Lisa Chen

---

### Timeline Summary

| Time | Event | Actor |
|------|-------|-------|
| 10:15 AM | Bucket made public | David (accident) |
| 10:18 AM | Alert triggered | Lisa's monitoring |
| 10:47 AM | Download started | Lisa (deliberate) |
| 4:45 PM | Download complete | Lisa |
| 4:52 PM | Issue "reported" | Lisa (cover-up) |
| 5:06 PM | Bucket secured | David |

**Critical Gap: 6 hours 34 minutes between alert and report**

---

### Why Did Lisa Wait to Report?

**Forensic psychiatrist's analysis:**

Lisa needed time to:
1. Download the entire 2.4 TB dataset
2. Verify the download was complete
3. Plan her cover story
4. Report at end of day (less scrutiny)
5. Frame it as "routine review" discovery

If Lisa had reported at 10:18 AM (when alerted), David would have fixed it in minutes and no data would have been stolen.

Instead, Lisa exploited the full 6-hour window to steal everything.

---

### Evidence of Intent

**Lisa's laptop browser history (forensics):**

- 10:22 AM: Google search "how long does s3 take to sync 2TB"
- 10:25 AM: AWS docs "s3 sync to different account"
- 10:28 AM: Stack Overflow "hide s3 sync from cloudtrail"
- 10:30 AM: Created personal AWS bucket "lisa-chen-personal-backup"

Lisa's actions show clear premeditation and intent to steal data.

---

## Conclusion

Lisa Chen:
- Was immediately alerted to the public bucket at 10:18 AM
- Spent 29 minutes planning the data exfiltration
- Downloaded 2.4 TB to her personal AWS account
- Waited 6+ hours until download completed before reporting
- Attempted to frame it as routine discovery to avoid suspicion

This was not accidental access. This was deliberate data theft.
`,
    },
    {
      id: "solve",
      name: "SOLVE.sh",
      path: "evidence/SOLVE.sh",
      language: "bash",
      icon: "⚡",
      narration:
        "Ready to identify who downloaded the customer data? Run this script.",
      clues: [],
      suspiciousPatterns: [],
      content: `#!/bin/bash
# Case 0009: S3 Public
# Identify who downloaded 2.4 TB from the public S3 bucket

echo "Who downloaded 2.4 TB of customer data from the public S3 bucket?"
echo ""
echo "Choose suspect:"
echo "1) David Park (Cloud Administrator)"
echo "2) Lisa Chen (Data Scientist)"
echo "3) Automated Scanner Bot (External)"
`,
    },
  ],
  forensicData: {
    dnaMatch: "MATCH FOUND: CHEN_L_GENOTYPE (99.3%)",
    fingerprintMatch: "LISA_S3_EXFIL",
    terminalSecrets: ["s3_restore", "bucket_audit"],
    phonePin: "1018",
    btcTarget: "0x1726714492",
    voiceTargets: [
        { name: "Lisa", stress: 83, status: "DECEPTION_LIKELY" },
        { name: "David", stress: 28, status: "STABLE" },
    ],
    ipTarget: "172.67.144.92"
  },
  boardConfig: {
    layout: {
      bucket_public: { x: 50, y: 50, rotate: -2 },
      lisa_download: { x: 450, y: 400, rotate: 0.5 },
      delayed_report: { x: 150, y: 250, rotate: 2 },
      personal_aws: { x: 700, y: 120, rotate: -1.5 },
    },
    connectors: [
      ["bucket_public", "lisa_download"],
      ["lisa_download", "delayed_report"],
      ["lisa_download", "personal_aws"],
    ],
  }
};

export default CASE_0009;
