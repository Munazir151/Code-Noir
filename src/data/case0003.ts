import type { FullCase } from "./cases";

export const CASE_0003: FullCase = {
  id: "0003",
  caseNumber: "CASE_0003",
  title: "Docker Escape",
  difficulty: "easy",
  isLocked: false,
  tagline: "A container breakout through misconfigured volume mounts. The SSH keys to production are gone.",
  victim: "CloudNative Corp — SSH keys compromised",
  description: "Someone escaped a Docker container using an insecure volume mount and stole SSH keys from the host filesystem. The keys were used to access production servers 6 hours later.",
  introTitle: "DOCKER ESCAPE",
  introBody1: "A container shouldn't see the host filesystem. This one did.",
  introBody2: "And someone knew exactly where to look.",

  suspects: [
    {
      id: "marcus",
      name: "Marcus Chen",
      role: "DevOps Engineer, CloudNative",
      emoji: "⚙️",
      terminalOutput: {
        evidence: [
          "✓ Marcus wrote the docker-compose.yml with the insecure volume mount.",
          "✓ Marcus's home IP (198.51.100.42) matches the SSH login from stolen keys.",
          "✓ Auth logs show Marcus accessed production at 2:14 AM — unusual time for him.",
          "✓ Volume mount gave root access to host /root/.ssh directory.",
          "✗ Marcus claimed he 'didn't realize' the mount was that permissive.",
        ],
        verdict: "GUILTY",
        message: "Marcus Chen configured the Docker volume mount with excessive permissions, giving container users root access to the host filesystem. He then exploited his own misconfiguration to steal SSH keys and access production servers from home at 2 AM.",
      },
      verdictScreen: {
        type: "guilty",
        message: "Marcus Chen wrote the docker-compose.yml that mounted the host's /root directory into the container. The auth logs show his home IP used the stolen SSH keys to log into production at 2:14 AM. Marcus created the vulnerability and exploited it himself.",
      },
    },
    {
      id: "priya",
      name: "Priya Kapoor",
      role: "Junior Developer, CloudNative",
      emoji: "👩‍💻",
      terminalOutput: {
        evidence: [
          "✓ Priya had access to the Docker container for testing.",
          "✓ Priya's Slack messages show she noticed the volume mount issue.",
          "✗ Priya's home IP (203.0.113.89) does NOT match the production SSH login.",
          "✗ Priya reported the volume mount issue in #security 4 days before the breach.",
          "✗ Priya was at a conference in Seattle when the SSH keys were used.",
        ],
        verdict: "WRONG SUSPECT",
        message: "Priya Kapoor had container access and noticed the misconfiguration, but she reported it to the security team and was traveling when the actual breach occurred. Her IP doesn't match the SSH login.",
      },
      verdictScreen: {
        type: "wrong",
        message: "Priya Kapoor discovered the volume mount issue and responsibly reported it in Slack 4 days before the breach. She was at DevOpsDays Seattle when the stolen SSH keys were used, and her IP doesn't match the auth logs.",
      },
    },
  ],

  correctSuspectId: "marcus",

  clues: [
    {
      id: "clue_volume_mount",
      title: "Insecure Docker Volume Mount",
      description: "The docker-compose.yml mounts the host's /root directory directly into the container at /host_root with read/write access. Anyone in the container could access the host's SSH keys.",
      fileId: "docker_compose",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_ssh_theft",
      title: "SSH Key Access Pattern",
      description: "Container logs show someone accessed /host_root/.ssh/id_rsa at 8:02 PM, copying the private key to their local machine.",
      fileId: "auth_log",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_ip_match",
      title: "Marcus's Home IP in Auth Logs",
      description: "The SSH login to production at 2:14 AM came from IP 198.51.100.42, which matches Marcus Chen's home address in the staff records.",
      fileId: "staff",
      discovered: false,
      critical: true,
    },
    {
      id: "clue_priya_reported",
      title: "Priya's Security Report",
      description: "Priya noticed the volume mount issue 4 days before the breach and posted about it in #security channel. Her warning was ignored.",
      fileId: "readme",
      discovered: false,
      critical: false,
    },
    {
      id: "clue_timing",
      title: "Unusual Access Time",
      description: "The production SSH login happened at 2:14 AM on a Saturday. Marcus has never logged in at that time before according to auth history.",
      fileId: "auth_log",
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
      { id: "docker_compose", name: "docker-compose.yml", type: "file" as const, icon: "🐳" },
      { id: "auth_log", name: "auth.log", type: "file" as const, icon: "🔐" },
      { id: "staff", name: "staff.json", type: "file" as const, icon: "👥" },
      { id: "solve", name: "SOLVE.sh", type: "file" as const, icon: "⚡" },
    ],
  },

  hints: [
    { isDone: false, text: "Start with the README to understand the incident timeline.", action: { label: "Open README.md", fileId: "readme" } },
    { isDone: false, text: "Check the Docker configuration for security issues.", action: { label: "Examine docker-compose.yml", fileId: "docker_compose" } },
    { isDone: false, text: "Review the authentication logs for suspicious access patterns.", action: { label: "Read auth.log", fileId: "auth_log" } },
    { isDone: false, text: "Match IP addresses to staff members.", action: { label: "Check staff.json", fileId: "staff" } },
    { isDone: false, text: "Run the solve script when you've identified the culprit.", action: { label: "Execute SOLVE.sh", fileId: "solve" } },
  ],

  files: [
    {
      id: "readme",
      name: "README.md",
      path: "evidence/README.md",
      language: "markdown",
      icon: "📄",
      narration: "The incident report. Someone escaped a Docker container and stole SSH keys.",
      clues: ["clue_priya_reported"],
      suspiciousPatterns: [],
      content: `# Incident Report: Docker Container Breakout

**Date**: March 15, 2024
**Reporter**: Security Team
**Severity**: CRITICAL

## Summary

At 2:14 AM on March 15, 2024, unauthorized access to production servers was detected. The attacker used stolen SSH keys that were extracted from the host filesystem via a Docker container breakout.

## Timeline

**March 10, 2024 - 3:45 PM**
- DevOps team deploys new development environment using Docker Compose
- Configuration includes volume mounts for "easier debugging"

**March 11, 2024 - 10:22 AM**
- Junior Developer Priya Kapoor posts in #security Slack channel:
  > "Hey team, I noticed our docker-compose mounts the host /root directory.
  > That seems really dangerous? Anyone with container access could read SSH keys."

**March 11, 2024 - 10:35 AM**
- DevOps Engineer Marcus Chen responds:
  > "It's just for dev environment, we'll fix it in the next sprint."

**March 14, 2024 - 8:02 PM**
- Container logs show file access: \`/host_root/.ssh/id_rsa\`
- Private SSH key copied from host filesystem

**March 15, 2024 - 2:14 AM**
- Unauthorized SSH login to production server prod-db-01.cloudnative.io
- Source IP: 198.51.100.42
- Used stolen SSH key for authentication
- 4.2 GB of customer database exported

## Investigation Notes

- The docker-compose.yml was committed by Marcus Chen on March 10
- Volume mount configuration: \`/root:/host_root:rw\`
- This gave container users READ/WRITE access to host root directory
- Priya Kapoor was at DevOpsDays Seattle conference March 14-16

## Evidence Files

1. **docker-compose.yml** - Container configuration with insecure volume mount
2. **auth.log** - SSH authentication logs showing the breach
3. **staff.json** - Employee IP address records

## Next Steps

Determine who accessed the container and stole the SSH keys.
`,
    },
    {
      id: "docker_compose",
      name: "docker-compose.yml",
      path: "evidence/docker-compose.yml",
      language: "yaml",
      icon: "🐳",
      narration: "The Docker Compose configuration. Someone mounted the host filesystem with dangerous permissions.",
      clues: ["clue_volume_mount"],
      suspiciousPatterns: [
        { pattern: "/root:/host_root", reason: "Dangerous volume mount exposing host root directory" },
        { pattern: ":rw", reason: "Read-write access to host filesystem" },
      ],
      content: `# Docker Compose Configuration
# Author: Marcus Chen <marcus.chen@cloudnative.io>
# Created: March 10, 2024
# Purpose: Development environment for microservices testing

version: '3.8'

services:
  dev-app:
    image: node:18-alpine
    container_name: cloudnative-dev
    working_dir: /app
    volumes:
      - ./app:/app
      - /root:/host_root:rw  # TODO: Remove this before production!
      - node_modules:/app/node_modules
    ports:
      - "3000:3000"
      - "9229:9229"  # Debug port
    environment:
      - NODE_ENV=development
      - DEBUG=*
    command: npm run dev
    networks:
      - dev-network
    restart: unless-stopped

  dev-db:
    image: postgres:15-alpine
    container_name: cloudnative-db
    environment:
      - POSTGRES_USER=devuser
      - POSTGRES_PASSWORD=devpass123
      - POSTGRES_DB=cloudnative_dev
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - dev-network

  dev-redis:
    image: redis:7-alpine
    container_name: cloudnative-redis
    ports:
      - "6379:6379"
    networks:
      - dev-network

volumes:
  postgres_data:
  node_modules:

networks:
  dev-network:
    driver: bridge

# NOTES:
# - The /root:/host_root mount is TEMPORARY for debugging filesystem issues
# - Priya raised concerns about this in Slack but we'll patch it next sprint
# - Only dev team has access to this environment anyway
# - Marcus: "I know it looks bad but it's just dev, relax"
`,
    },
    {
      id: "auth_log",
      name: "auth.log",
      path: "evidence/auth.log",
      language: "log",
      icon: "🔐",
      narration: "SSH authentication logs. Someone used stolen keys to access production at 2 AM.",
      clues: ["clue_ssh_theft", "clue_timing", "clue_ip_match"],
      suspiciousPatterns: [
        { pattern: "198.51.100.42", reason: "IP address that used stolen SSH keys" },
        { pattern: "2:14 AM", reason: "Unusual access time" },
        { pattern: "/host_root/.ssh/id_rsa", reason: "SSH key theft from container" },
      ],
      content: `# SSH Authentication Log - Production Server (prod-db-01.cloudnative.io)
# Last 48 hours

[2024-03-14 08:15:22] INFO: Accepted publickey for deploy from 203.0.113.100 port 52891 ssh2: RSA SHA256:xK9jL2mN3pQ4rS5tU6vW7xY8zA1bC2dE3fG4hI5jK6l
[2024-03-14 08:15:23] INFO: Session opened for user deploy by (uid=1001)
[2024-03-14 08:45:12] INFO: Session closed for user deploy

[2024-03-14 14:22:33] INFO: Accepted publickey for marcus from 198.51.100.42 port 48392 ssh2: RSA SHA256:xK9jL2mN3pQ4rS5tU6vW7xY8zA1bC2dE3fG4hI5jK6l
[2024-03-14 14:22:34] INFO: Session opened for user marcus by (uid=1005)
[2024-03-14 14:58:11] INFO: Session closed for user marcus

# Docker Container Access Logs (dev-app container)
# Note: These logs show filesystem access from inside the container

[2024-03-14 20:02:14] CONTAINER: User accessed /host_root/.ssh/ directory
[2024-03-14 20:02:15] CONTAINER: File read: /host_root/.ssh/id_rsa (3243 bytes)
[2024-03-14 20:02:15] CONTAINER: File read: /host_root/.ssh/id_rsa.pub (567 bytes)
[2024-03-14 20:02:16] CONTAINER: File read: /host_root/.ssh/authorized_keys (1024 bytes)
[2024-03-14 20:02:18] CONTAINER: File copied to /tmp/extracted_key

# Production Server Access - UNAUTHORIZED

[2024-03-15 02:14:07] WARNING: Accepted publickey for root from 198.51.100.42 port 61829 ssh2: RSA SHA256:xK9jL2mN3pQ4rS5tU6vW7xY8zA1bC2dE3fG4hI5jK6l
[2024-03-15 02:14:08] ALERT: Session opened for user root by (uid=0) - UNUSUAL TIME
[2024-03-15 02:14:22] ALERT: Command executed: mysqldump --all-databases > /tmp/db_export.sql
[2024-03-15 02:18:45] ALERT: Large file transfer initiated (4.2 GB) to 198.51.100.42
[2024-03-15 02:22:33] ALERT: Session closed for user root
[2024-03-15 02:22:34] CRITICAL: Intrusion detection system triggered
[2024-03-14 23:59:00] SYSTEM: Automated security termination window initiated

# Historical Access Patterns for Marcus Chen
# Marcus typically works 9 AM - 6 PM, never logged in after midnight before

[2024-03-13 09:15:00] INFO: Accepted publickey for marcus from 198.51.100.42
[2024-03-12 10:22:00] INFO: Accepted publickey for marcus from 198.51.100.42
[2024-03-11 14:30:00] INFO: Accepted publickey for marcus from 198.51.100.42
[2024-03-10 11:45:00] INFO: Accepted publickey for marcus from 198.51.100.42

# Historical Access Patterns for Priya Kapoor
# Priya's home IP: 203.0.113.89 (never matches the breach IP)

[2024-03-13 16:45:00] INFO: Accepted publickey for priya from 203.0.113.89
[2024-03-12 10:15:00] INFO: Accepted publickey for priya from 203.0.113.89
`,
    },
    {
      id: "staff",
      name: "staff.json",
      path: "evidence/staff.json",
      language: "json",
      icon: "👥",
      narration: "Employee records with IP addresses. Time to match the breach to a person.",
      clues: ["clue_ip_match"],
      suspiciousPatterns: [
        { pattern: "198.51.100.42", reason: "Marcus Chen's home IP - matches the breach" },
      ],
      content: `{
  "employees": [
    {
      "id": "EMP-1005",
      "name": "Marcus Chen",
      "role": "DevOps Engineer",
      "email": "marcus.chen@cloudnative.io",
      "department": "Infrastructure",
      "hire_date": "2021-08-15",
      "home_ip": "198.51.100.42",
      "office_ip": "203.0.113.100",
      "ssh_key_fingerprint": "SHA256:xK9jL2mN3pQ4rS5tU6vW7xY8zA1bC2dE3fG4hI5jK6l",
      "access_level": "admin",
      "notes": "Responsible for Docker infrastructure and container orchestration"
    },
    {
      "id": "EMP-1089",
      "name": "Priya Kapoor",
      "role": "Junior Developer",
      "email": "priya.kapoor@cloudnative.io",
      "department": "Engineering",
      "hire_date": "2023-11-01",
      "home_ip": "203.0.113.89",
      "office_ip": "203.0.113.100",
      "ssh_key_fingerprint": "SHA256:aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV1wX2yZ3aB4c",
      "access_level": "developer",
      "notes": "Recently flagged security concern about Docker volume mounts in #security channel"
    },
    {
      "id": "EMP-1001",
      "name": "Sarah Mitchell",
      "role": "CTO",
      "email": "sarah.mitchell@cloudnative.io",
      "department": "Executive",
      "hire_date": "2020-01-10",
      "home_ip": "203.0.113.50",
      "office_ip": "203.0.113.100",
      "ssh_key_fingerprint": "SHA256:1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2",
      "access_level": "admin",
      "notes": "Full system access, rarely logs in directly"
    }
  ],
  "last_updated": "2024-03-15T08:30:00Z",
  "notes": "IP addresses verified via ISP records and VPN logs"
}
`,
    },
    {
      id: "solve",
      name: "SOLVE.sh",
      path: "evidence/SOLVE.sh",
      language: "bash",
      icon: "⚡",
      narration: "Ready to name the culprit? Run this when you know who escaped the Docker container.",
      clues: [],
      suspiciousPatterns: [],
      content: `#!/bin/bash
# Case 0003: Docker Escape
# Identify the person who exploited the container breakout

echo "Who exploited the Docker container breakout to steal SSH keys?"
echo ""
echo "Choose suspect:"
echo "1) Marcus Chen (DevOps Engineer)"
echo "2) Priya Kapoor (Junior Developer)"
`,
    },
  ],
  forensicData: {
    dnaMatch: "MATCH FOUND: MARCUS_CHEN_GENOTYPE (99.5%)",
    fingerprintMatch: "CHEN_M_ROOT",
    terminalSecrets: ["docker_bypass", "kernel_panic"],
    phonePin: "2359",
    btcTarget: "0x192168147",
    voiceTargets: [
        { name: "Marcus", stress: 82, status: "DECEPTION_LIKELY" },
        { name: "Priya", stress: 18, status: "STABLE" },
    ],
    ipTarget: "192.168.1.47"
  },
  boardConfig: {
    layout: {
      docker_mount: { x: 50, y: 50, rotate: -2 },
      ssh_theft: { x: 150, y: 250, rotate: 2 },
      marcus_ip: { x: 450, y: 400, rotate: 0.5 },
    },
    connectors: [
      ["docker_mount", "ssh_theft"],
      ["ssh_theft", "marcus_ip"],
    ],
  }
};

export default CASE_0003;
