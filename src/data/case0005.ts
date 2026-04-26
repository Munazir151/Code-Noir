import type { FullCase } from "./cases";

export const CASE_0005: FullCase = {
  id: "0005",
  caseNumber: "CASE_0005",
  title: "The Intern",
  difficulty: "tutorial",
  isLocked: false,
  tagline: "Temporary access that was never revoked. Six months later, a critical report disappeared.",
  victim: "MarketEdge Analytics — competitor research deleted",
  description: "An intern was granted temporary database admin access for a migration project. The access was never revoked. 6 months later, one day before their last day, they deleted a sensitive competitor analysis report.",
  introTitle: "THE INTERN",
  introBody1: "Access granted is not always access revoked.",
  introBody2: "Six months is a long time to remember who has the keys.",

  suspects: [
    {
      id: "jordan_intern",
      name: "Jordan Lee",
      role: "Data Analytics Intern, MarketEdge",
      emoji: "🎓",
      terminalOutput: {
        evidence: [
          "✓ Jordan was granted ADMIN access on January 15 for data migration project.",
          "✓ Access was supposed to be temporary (2 weeks) but was never revoked.",
          "✓ Deletion occurred July 28 at 11:47 PM from IP 192.0.2.156 (Jordan's home).",
          "✓ Exit interview scheduled for July 30 — report deleted 1 day before leaving.",
          "✓ Deleted report: 'competitor_market_analysis_q2_2024.pdf' — highly sensitive.",
          "✓ Jordan's exit interview mentions 'joining AnalytiCore' — MarketEdge's main competitor.",
        ],
        verdict: "GUILTY",
        message: "Jordan Lee was granted admin database access in January that was never revoked. On July 28, one day before their exit interview and two days before joining competitor AnalytiCore, Jordan logged in from home and deleted MarketEdge's Q2 2024 competitor analysis report.",
      },
      verdictScreen: {
        type: "guilty",
        message: "Jordan Lee exploited admin access that should have been revoked 6 months ago. The night before their exit interview — and right before joining competitor AnalytiCore — Jordan deleted MarketEdge's sensitive competitor analysis from their home IP address.",
      },
    },
    {
      id: "rachel_dba",
      name: "Rachel Foster",
      role: "Database Administrator, MarketEdge",
      emoji: "🗄️",
      terminalOutput: {
        evidence: [
          "✓ Rachel granted Jordan admin access on January 15 for the migration project.",
          "✓ Rachel's onboarding notes: 'REMEMBER: Revoke access after migration completes'.",
          "✗ Rachel was on maternity leave Feb 1 - May 15 when access should've been revoked.",
          "✗ Rachel's IP (203.0.113.45) does NOT match the deletion event IP.",
          "✗ Rachel reported the missing report and initiated the investigation.",
          "✗ Rachel has no connection to AnalytiCore or any competitors.",
        ],
        verdict: "WRONG SUSPECT",
        message: "Rachel Foster granted the temporary access but forgot to revoke it due to maternity leave. She had no knowledge Jordan still had admin privileges 6 months later, and she was the one who discovered and reported the deleted report.",
      },
      verdictScreen: {
        type: "wrong",
        message: "Rachel Foster made an administrative error by not revoking Jordan's access before her maternity leave, but she had no malicious intent. She discovered the deletion herself and immediately reported it. Her IP doesn't match the deletion event.",
      },
    },
  ],

  correctSuspectId: "jordan_intern",

  clues: [
    {
      id: "clue_admin_access",
      title: "Unrevoked Admin Access",
      description: "Jordan Lee was granted ADMIN privileges on January 15, 2024 for a 2-week data migration project. The access was never revoked and remained active for 6 months.",
      fileId: "access_log",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_deletion_timing",
      title: "Deletion Before Exit",
      description: "The competitor analysis report was deleted on July 28 at 11:47 PM — exactly 1 day before Jordan's scheduled exit interview on July 30.",
      fileId: "deleted_report",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_ip_match",
      title: "Jordan's Home IP",
      description: "The database deletion came from IP address 192.0.2.156, which matches Jordan Lee's home address according to HR records.",
      fileId: "access_log",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_competitor_job",
      title: "Joining Main Competitor",
      description: "Jordan's exit interview reveals they are joining AnalytiCore — MarketEdge's primary competitor — starting August 1, just 2 days after deleting the report.",
      fileId: "exit_interview",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_rachel_maternity",
      title: "Rachel's Maternity Leave",
      description: "Rachel Foster, who granted the access, went on maternity leave February 1st and forgot to revoke Jordan's privileges before leaving.",
      fileId: "access_log",
      discovered: false,
      critical: false,
    },
  ],

  fileTree: {
    id: "root",
    name: "evidence",
    type: "directory" as const,
    children: [
      { id: "readme", name: "README.md", type: "file" as const, icon: "📄" },
      { id: "access_log", name: "access_log.sql", type: "file" as const, icon: "🔐" },
      { id: "deleted_report", name: "deleted_report_metadata.json", type: "file" as const, icon: "🗑️" },
      { id: "exit_interview", name: "exit_interview.txt", type: "file" as const, icon: "👋" },
      { id: "solve", name: "SOLVE.sh", type: "file" as const, icon: "⚡" },
    ],
  },

  hints: [
    { isDone: false, text: "Read the incident report to understand what was deleted.", action: { label: "Open README.md", fileId: "readme" } },
    { isDone: false, text: "Check who had database admin access and when.", action: { label: "Review access_log.sql", fileId: "access_log" } },
    { isDone: false, text: "Examine the deletion metadata for timing and IP address.", action: { label: "Check deleted_report_metadata.json", fileId: "deleted_report" } },
    { isDone: false, text: "Review Jordan's exit interview for suspicious details.", action: { label: "Read exit_interview.txt", fileId: "exit_interview" } },
    { isDone: false, text: "Identify the culprit and run the solve script.", action: { label: "Execute SOLVE.sh", fileId: "solve" } },
  ],

  files: [
    {
      id: "readme",
      name: "README.md",
      path: "evidence/README.md",
      language: "markdown",
      icon: "📄",
      narration: "The incident report. A critical competitor analysis report was deleted right before someone left the company.",
      clues: [],
      suspiciousPatterns: [],
      content: `# Incident Report: Unauthorized Data Deletion

**Date**: July 29, 2024
**Reporter**: Rachel Foster, Database Administrator
**Severity**: HIGH

## Summary

On July 29, 2024 at 8:15 AM, Database Administrator Rachel Foster discovered that a critical competitor analysis report had been deleted from the company's analytics database. The deletion occurred at 11:47 PM the previous night.

## Deleted Asset

**File**: competitor_market_analysis_q2_2024.pdf
**Size**: 47.3 MB
**Classification**: CONFIDENTIAL - INTERNAL ONLY
**Description**: Comprehensive Q2 2024 competitive landscape analysis including:
- Market positioning data for all major competitors
- Pricing strategy analysis
- Product roadmap comparisons
- Customer acquisition cost breakdowns
- Proprietary market predictions for Q3-Q4 2024

This report represented 4 months of research by the Strategy team and contained highly sensitive competitive intelligence.

## Timeline

**January 15, 2024 - 9:30 AM**
- Data Analytics Intern Jordan Lee joins MarketEdge for 6-month internship
- Assigned to assist with Q1 database migration project

**January 15, 2024 - 2:00 PM**
- DBA Rachel Foster grants Jordan temporary ADMIN database access
- Purpose: Perform data migration tasks
- Duration: Intended for 2 weeks only
- Rachel's note: "REMEMBER: Revoke after migration completes Jan 31"

**January 28, 2024**
- Database migration project completes successfully
- Jordan returns to regular analytics intern work

**February 1, 2024**
- Rachel Foster begins maternity leave (returns May 15)
- Jordan's admin access NEVER REVOKED

**July 28, 2024 - 11:47 PM**
- Database deletion event detected
- User: jordan_lee
- Privilege level: ADMIN
- Action: DELETE FROM documents WHERE filename = 'competitor_market_analysis_q2_2024.pdf'
- Source IP: 192.0.2.156

**July 29, 2024 - 8:15 AM**
- Rachel Foster discovers missing report
- Initiates security investigation

**July 30, 2024 - 10:00 AM**
- Jordan Lee's scheduled exit interview (last day: July 31)

## Investigation Focus

1. Who performed the deletion?
2. Why did they still have admin access 6 months after the migration project?
3. What was the motive for deleting this specific report?

## Evidence Files

1. **access_log.sql** - Database access audit trail
2. **deleted_report_metadata.json** - Deletion event details
3. **exit_interview.txt** - Jordan's exit interview notes

## Status

Investigation ongoing. Backups available but deletion timing is highly suspicious given proximity to Jordan's departure date.
`,
    },
    {
      id: "access_log",
      name: "access_log.sql",
      path: "evidence/access_log.sql",
      language: "sql",
      icon: "🔐",
      narration: "Database access audit logs. Someone had admin privileges they shouldn't have kept.",
      clues: ["clue_admin_access", "clue_ip_match", "clue_rachel_maternity"],
      suspiciousPatterns: [
        { pattern: "jordan_lee", reason: "Intern with admin access 6 months after temporary grant" },
        { pattern: "192.0.2.156", reason: "IP address used for unauthorized deletion" },
        { pattern: "ADMIN", reason: "Elevated privilege level" },
      ],
      content: `-- MarketEdge Analytics Database Access Log
-- Database: marketedge_prod
-- Date Range: January 2024 - July 2024

-- ============================================
-- ACCESS GRANT EVENTS
-- ============================================

-- Jordan Lee Initial Access Grant
INSERT INTO access_grants (
  user_id, username, privilege_level, granted_by,
  grant_date, expiration_date, purpose, ip_address
) VALUES (
  'U-1847',
  'jordan_lee',
  'ADMIN',
  'rachel_foster',
  '2024-01-15 14:00:22',
  '2024-01-31 23:59:59',  -- INTENDED expiration (never enforced)
  'Temporary access for Q1 database migration project',
  '203.0.113.100'  -- Office IP
);

-- Note from Rachel Foster:
-- "Granting Jordan admin for 2 weeks. Migration deadline Jan 31.
--  REMEMBER TO REVOKE ACCESS AFTER PROJECT COMPLETES!"

-- ============================================
-- RACHEL FOSTER'S LEAVE STATUS
-- ============================================

-- Rachel Foster begins maternity leave
INSERT INTO employee_status (
  user_id, username, status, start_date, end_date, notes
) VALUES (
  'U-0234',
  'rachel_foster',
  'MATERNITY_LEAVE',
  '2024-02-01 00:00:00',
  '2024-05-15 23:59:59',
  'Forgot to revoke Jordan access before leave - handoff incomplete'
);

-- ============================================
-- DATABASE ACCESS HISTORY - JORDAN LEE
-- ============================================

-- Normal intern work (January - July)
SELECT timestamp, username, privilege_level, action, ip_address
FROM access_log
WHERE username = 'jordan_lee'
ORDER BY timestamp;

-- January 2024 - Migration Project (Legitimate Admin Use)
'2024-01-16 09:15:00', 'jordan_lee', 'ADMIN', 'SELECT * FROM customer_data', '203.0.113.100'
'2024-01-18 10:30:00', 'jordan_lee', 'ADMIN', 'MIGRATE TABLE legacy_orders', '203.0.113.100'
'2024-01-22 14:45:00', 'jordan_lee', 'ADMIN', 'UPDATE schema_version', '203.0.113.100'
'2024-01-28 16:20:00', 'jordan_lee', 'ADMIN', 'MIGRATION COMPLETE', '203.0.113.100'

-- February - July 2024 - Regular Analytics Work (Should Be READ-ONLY)
'2024-02-05 11:00:00', 'jordan_lee', 'ADMIN', 'SELECT * FROM sales_data', '203.0.113.100'
'2024-03-12 13:30:00', 'jordan_lee', 'ADMIN', 'SELECT * FROM user_analytics', '203.0.113.100'
'2024-04-20 10:15:00', 'jordan_lee', 'ADMIN', 'SELECT * FROM revenue_reports', '203.0.113.100'
'2024-05-18 15:45:00', 'jordan_lee', 'ADMIN', 'SELECT * FROM market_data', '203.0.113.100'
'2024-06-24 14:00:00', 'jordan_lee', 'ADMIN', 'SELECT * FROM documents', '203.0.113.100'
'2024-07-15 11:30:00', 'jordan_lee', 'ADMIN', 'SELECT * FROM competitor_reports', '203.0.113.100'

-- ============================================
-- DELETION EVENT - JULY 28, 2024
-- ============================================

-- SUSPICIOUS: Late night deletion from home IP, 1 day before exit interview
'2024-07-28 23:47:18', 'jordan_lee', 'ADMIN', 'DELETE FROM documents WHERE filename = "competitor_market_analysis_q2_2024.pdf"', '192.0.2.156'

-- IP Address Verification:
-- 192.0.2.156 = Jordan Lee's home address (742 Maple Street, Apt 4B)
-- 203.0.113.100 = MarketEdge office IP
-- 203.0.113.45 = Rachel Foster's home IP (no suspicious activity)

-- ============================================
-- ACCESS SHOULD HAVE BEEN REVOKED
-- ============================================

-- Current Status Check (July 29, 2024):
SELECT username, privilege_level, grant_date, expiration_date,
       DATEDIFF(CURRENT_DATE, expiration_date) AS days_overdue
FROM access_grants
WHERE username = 'jordan_lee' AND revoked = FALSE;

-- RESULT:
-- jordan_lee | ADMIN | 2024-01-15 | 2024-01-31 | 179 days overdue

-- Admin access active for 179 days past intended expiration!
-- System allows expired access if not manually revoked
-- Rachel was on leave when expiration occurred
-- No automated revocation process in place

-- ============================================
-- SUMMARY
-- ============================================

-- Jordan Lee:
--   - Granted ADMIN access: January 15, 2024
--   - Access should have expired: January 31, 2024
--   - Access actually revoked: NEVER
--   - Total days with admin privilege: 195 days
--   - Deletion IP: 192.0.2.156 (home address)
--   - Exit date: July 31, 2024

-- Rachel Foster:
--   - Granted the access
--   - Intended to revoke after 2 weeks
--   - Went on maternity leave Feb 1 (forgot to revoke)
--   - No suspicious database activity
--   - Reported the deletion herself
`,
    },
    {
      id: "deleted_report",
      name: "deleted_report_metadata.json",
      path: "evidence/deleted_report_metadata.json",
      language: "json",
      icon: "🗑️",
      narration: "Metadata about the deleted file. Timing and location tell the story.",
      clues: ["clue_deletion_timing"],
      suspiciousPatterns: [
        { pattern: "2024-07-28T23:47:18Z", reason: "Deletion at 11:47 PM, one day before exit interview" },
        { pattern: "192.0.2.156", reason: "Deletion from home IP address" },
        { pattern: "AnalytiCore", reason: "Competitor mentioned in file metadata" },
      ],
      content: `{
  "deletion_event": {
    "event_id": "DEL-2024-07-28-9471",
    "timestamp": "2024-07-28T23:47:18Z",
    "timezone": "America/Los_Angeles",
    "human_readable_time": "July 28, 2024 at 11:47:18 PM PDT"
  },
  "deleted_file": {
    "filename": "competitor_market_analysis_q2_2024.pdf",
    "original_path": "/documents/strategy/competitive_intelligence/",
    "file_size_bytes": 49643520,
    "file_size_mb": 47.3,
    "mime_type": "application/pdf",
    "created_date": "2024-03-15T10:30:00Z",
    "last_modified": "2024-06-30T16:45:00Z",
    "classification": "CONFIDENTIAL - INTERNAL ONLY",
    "owner": "strategy_team",
    "access_level": "DIRECTOR_AND_ABOVE"
  },
  "deletion_details": {
    "deleted_by_user": "jordan_lee",
    "user_id": "U-1847",
    "privilege_level": "ADMIN",
    "deletion_method": "SQL DELETE command",
    "source_ip": "192.0.2.156",
    "source_location": "Residential IP (Not office network)",
    "user_agent": "MySQL Workbench 8.0.33",
    "session_duration_minutes": 3
  },
  "ip_address_details": {
    "ip": "192.0.2.156",
    "registered_to": "Jordan Lee",
    "address": "742 Maple Street, Apt 4B, San Francisco, CA 94102",
    "isp": "Comcast Cable",
    "connection_type": "Residential Broadband",
    "verified_via": "HR employee records"
  },
  "timing_analysis": {
    "deletion_date": "2024-07-28",
    "jordan_exit_interview_date": "2024-07-30",
    "jordan_last_day": "2024-07-31",
    "days_before_exit": 3,
    "days_before_interview": 1,
    "time_of_day": "Late night (23:47)",
    "suspicious_indicators": [
      "Deletion occurred outside business hours",
      "Accessed from home IP, not office",
      "One day before scheduled exit interview",
      "Three days before joining competitor"
    ]
  },
  "file_contents_summary": {
    "report_title": "Q2 2024 Competitive Landscape Analysis",
    "pages": 127,
    "primary_competitors_analyzed": [
      "AnalytiCore",
      "DataDriven Inc",
      "InsightFirst",
      "MetricsNow"
    ],
    "main_competitor_focus": "AnalytiCore",
    "sensitive_sections": [
      "AnalytiCore pricing strategy vulnerabilities",
      "Customer churn analysis (AnalytiCore losing to MarketEdge)",
      "AnalytiCore product roadmap predictions",
      "Recommended counter-strategies against AnalytiCore"
    ],
    "value_assessment": "Extremely valuable to competitors, especially AnalytiCore"
  },
  "backup_status": {
    "backup_available": true,
    "last_backup": "2024-07-28T02:00:00Z",
    "backup_location": "s3://marketedge-backups/daily/2024-07-28/",
    "restoration_possible": true,
    "note": "File can be restored but deletion timing remains suspicious"
  },
  "investigation_notes": {
    "red_flags": [
      "Jordan had ADMIN access for 6 months past intended expiration",
      "Deletion from home IP at unusual hour (11:47 PM)",
      "Deleted most sensitive competitor report about AnalytiCore",
      "Jordan is joining AnalytiCore (MarketEdge's main competitor) on August 1",
      "Deletion occurred 1 day before exit interview",
      "Only logged in for 3 minutes - just long enough to delete the file"
    ],
    "timeline_correlation": {
      "jordan_accepted_analyticore_offer": "2024-07-15",
      "jordan_gave_two_weeks_notice": "2024-07-17",
      "jordan_deleted_competitor_report": "2024-07-28",
      "jordan_exit_interview": "2024-07-30",
      "jordan_starts_at_analyticore": "2024-08-01"
    }
  }
}
`,
    },
    {
      id: "exit_interview",
      name: "exit_interview.txt",
      path: "evidence/exit_interview.txt",
      language: "plaintext",
      icon: "👋",
      narration: "Jordan's exit interview notes. The new job is at the main competitor.",
      clues: ["clue_competitor_job"],
      suspiciousPatterns: [
        { pattern: "AnalytiCore", reason: "Jordan is joining MarketEdge's primary competitor" },
        { pattern: "August 1", reason: "Start date is 2 days after the deletion" },
      ],
      content: `═══════════════════════════════════════════════════════════
         MARKETEDGE ANALYTICS - EXIT INTERVIEW
═══════════════════════════════════════════════════════════

Employee: Jordan Lee
Position: Data Analytics Intern
Department: Analytics & Strategy
Hire Date: January 15, 2024
Last Day: July 31, 2024
Interviewer: Sarah Chen, HR Manager
Date: July 30, 2024 at 10:00 AM

───────────────────────────────────────────────────────────
REASON FOR LEAVING
───────────────────────────────────────────────────────────

Jordan: "I received a full-time offer from AnalytiCore as a
Junior Data Analyst. It's a great opportunity to transition
from intern to full-time employee. The offer came through
mid-July and I couldn't pass it up."

Start Date at New Company: August 1, 2024
Position: Junior Data Analyst
Company: AnalytiCore Inc.

HR Note: AnalytiCore is MarketEdge's primary competitor in
the business analytics space. Jordan will be working in
their competitive intelligence division.

───────────────────────────────────────────────────────────
EXPERIENCE AT MARKETEDGE
───────────────────────────────────────────────────────────

Jordan: "My time here was incredibly valuable. I learned so
much, especially during the database migration project in
January. Rachel Foster was a great mentor and gave me a lot
of responsibility early on."

Sarah: "I see you had admin database access for that project.
Did you use those elevated permissions appropriately?"

Jordan: "Oh, yes! I only used admin access for the migration
tasks. Once that project wrapped up in late January, I went
back to regular analytics work. I didn't even realize I
still had those permissions until recently, but I never
needed them anyway."

HR Note: This statement is technically true - Jordan didn't
"need" admin access after January. But logs show the access
was never revoked and Jordan retained ADMIN privileges for
the entire 6-month internship.

───────────────────────────────────────────────────────────
ACCESS TO SENSITIVE INFORMATION
───────────────────────────────────────────────────────────

Sarah: "As an intern, you had access to some competitive
analysis reports. How will you handle that information at
your new role?"

Jordan: "I take confidentiality very seriously. I signed an
NDA and I won't be sharing any MarketEdge trade secrets or
proprietary information. Everything I learned here stays here."

Sarah: "Good to hear. Did you have access to our Q2 2024
competitor analysis report?"

Jordan: [pause] "I may have seen some competitive reports
during my work, but I didn't really study them in depth.
My focus was on data infrastructure and basic analytics."

HR Note: Jordan seemed slightly uncomfortable with this line
of questioning. Access logs show Jordan queried the documents
table multiple times in July, including searches for
"competitor" and "AnalytiCore" keywords.

───────────────────────────────────────────────────────────
FINAL QUESTIONS
───────────────────────────────────────────────────────────

Sarah: "Is there anything else you'd like to share before
your last day tomorrow?"

Jordan: "Just that I'm grateful for the opportunity. The
hands-on experience with database administration and access
to real production systems was invaluable. Not many companies
trust their interns with that level of access."

Sarah: "Indeed. We'll be reviewing our intern access policies
going forward."

───────────────────────────────────────────────────────────
POST-INTERVIEW NOTES (CONFIDENTIAL)
───────────────────────────────────────────────────────────

Interviewer: Sarah Chen
Date: July 30, 2024

CONCERNS:

1. Jordan is joining AnalytiCore - our main competitor
2. Jordan had elevated database access for 6 months
3. Jordan seemed evasive about competitive reports
4. Rachel Foster reported a deleted competitor analysis
   file this morning (July 29) - 1 day before this interview
5. The deleted report was primarily about AnalytiCore
6. Jordan starts at AnalytiCore in 2 days

RECOMMENDATIONS:

- Immediately revoke all Jordan's system access
- Conduct forensic review of Jordan's database activity
- Review all files Jordan accessed in final 2 weeks
- Consider legal action if evidence of data theft emerges
- Implement automated access expiration policies
- Require exit certification that no data was taken

STATUS: Escalated to Legal and Security teams

───────────────────────────────────────────────────────────

SECURITY ALERT (Added July 30, 2024 - 11:30 AM):

Database forensics confirm Jordan Lee deleted
"competitor_market_analysis_q2_2024.pdf" on July 28 at
11:47 PM from home IP address. Investigation ongoing.

═══════════════════════════════════════════════════════════
`,
    },
    {
      id: "solve",
      name: "SOLVE.sh",
      path: "evidence/SOLVE.sh",
      language: "bash",
      icon: "⚡",
      narration: "Ready to solve the case? Who deleted the competitor analysis report?",
      clues: [],
      suspiciousPatterns: [],
      content: `#!/bin/bash
# Case 0005: The Intern
# Identify who deleted the competitor analysis report

echo "Who deleted the competitor analysis report?"
echo ""
echo "Choose suspect:"
echo "1) Jordan Lee (Data Analytics Intern)"
echo "2) Rachel Foster (Database Administrator)"
`,
    },
  ],
  forensicData: {
    dnaMatch: "MATCH FOUND: JORDAN_LEE_GENOTYPE (98.9%)",
    fingerprintMatch: "LEE_J_EXFIL",
    terminalSecrets: ["pdf_restore", "audit_log_wipe"],
    phonePin: "1147",
    btcTarget: "0x1985110012",
    voiceTargets: [
        { name: "Jordan", stress: 89, status: "DECEPTION_LIKELY" },
        { name: "Rachel", stress: 14, status: "STABLE" },
    ],
    ipTarget: "198.51.100.12"
  },
  boardConfig: {
    layout: {
      admin_access: { x: 50, y: 50, rotate: -2 },
      deletion_timing: { x: 150, y: 250, rotate: 2 },
      ip_match_0005: { x: 450, y: 400, rotate: 0.5 },
      competitor_job: { x: 700, y: 120, rotate: -1.5 },
    },
    connectors: [
      ["admin_access", "deletion_timing"],
      ["deletion_timing", "ip_match_0005"],
      ["ip_match_0005", "competitor_job"],
    ],
  }
};

export default CASE_0005;
