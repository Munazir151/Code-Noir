"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroScreen from "./IntroScreen";
import FileTree from "./FileTree";
import TabBar from "./TabBar";
import MonacoWrapper from "./MonacoWrapper";
import NarrationOverlay from "./NarrationOverlay";
import CluesPanel from "./CluesPanel";
import TerminalSimulator from "./TerminalSimulator";
import FingerprintScanner from "./FingerprintScanner";
import BtcTracer from "./BtcTracer";
import VoiceStressAnalyzer from "./VoiceStressAnalyzer";
import DnaLab from "./DnaLab";
import PhoneForensics from "./PhoneForensics";
import IpTrace from "./IpTrace";
import CaseStrengthMeter from "./CaseStrengthMeter";
import NarrativeEnginePanel from "./NarrativeEnginePanel";
import {
  Terminal as TerminalIcon,
  Fingerprint,
  Bitcoin,
  Mic2,
  TestTube2,
  Smartphone,
  LocateFixed,
  Database,
  Search
} from "lucide-react";
import SolveTerminal from "./SolveTerminal";
import VerdictScreen from "./VerdictScreen";
import CaseSelectScreen from "./CaseSelectScreen";
import StatusBar from "./StatusBar";
import OnboardingModal from "./OnboardingModal";
import ClueToast from "./ClueToast";
import HintBar from "./HintBar";
import DetectiveHeader from "./DetectiveHeader";
import CaseDossier from "./CaseDossier";
import NoirBackground from "./NoirBackground";
import DetectiveNamePrompt from "./DetectiveNamePrompt";
import EvidenceBoard, { type BoardPin } from "./EvidenceBoard";
import CrimeSceneFolder from "./CrimeSceneFolder";
import SecurityCameraFeed from "./SecurityCameraFeed";
import IncomingCallOverlay from "./IncomingCallOverlay";
import GitHubAlert from "./GitHubAlert";
import DatabaseLock from "./DatabaseLock";
import TrafficMonitor from "./TrafficMonitor";
import { ALL_CASES, type FullCase } from "@/data/cases";
import {
  BookOpen,
  Layers,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import clsx from "clsx";
import { speak } from "@/lib/elevenlabs";
import {
  generateInvestigationReport,
  type SimulatorFinding,
} from "@/lib/investigationEngine";

type Phase = "select" | "intro" | "investigation" | "verdict";
type SidePanel = "files" | "clues" | "forensics";

const BOARD_PIN_LIBRARY: Record<string, Omit<BoardPin, "id">> = {
  // --- CASE 0047 PINS ---
  voss_photo: {
    title: "VOSS PHOTO",
    note: "The desk photo that exposes the whole scene before the file ever opens.",
    connectedToVictoria: false,
  },
  last_commit: {
    title: "LAST COMMIT",
    note: "A late-night commit shows the final touch before Voss disappeared.",
    connectedToVictoria: false,
  },
  seed_phrase: {
    title: "SEED PHRASE",
    note: "The comment that should have died with the deploy. It did not.",
    connectedToVictoria: false,
  },
  btc_wallet: {
    title: "BTC WALLET",
    note: "Fifty bitcoin moved in a single sweep. The wallet never lied.",
    connectedToVictoria: false,
  },
  victoria: {
    title: "VICTORIA",
    note: "Every string comes back here. The board knows it before the accusation does.",
    connectedToVictoria: true,
  },
  email_threat: {
    title: "EMAIL THREAT",
    note: "Meet me tonight. Come alone. That line changes the whole room.",
    connectedToVictoria: false,
  },
  camera_feed: {
    title: "SECURITY FEED",
    note: "The cameras went dark at the exact wrong time.",
    connectedToVictoria: false,
  },
  // --- CASE 0001 PINS ---
  leaked_key: {
    title: "AWS KEY",
    note: "Sitting in plain text. Alex committed it, but who picked it up?",
    connectedToVictoria: false,
  },
  notification: {
    title: "READ RECEIPT",
    note: "Jordan saw the commit notification within seconds of it going live.",
    connectedToVictoria: false,
  },
  alibi: {
    title: "PR_MEETING",
    note: "Alex was in Sprint Planning. The code didn't commit itself, but someone else triggers the API.",
    connectedToVictoria: false,
  },
  slack_slip: {
    title: "SLACK SLIP",
    note: "Jordan offered to 'fix' it before anyone asked. A guilty conscience moves fast.",
    connectedToVictoria: false,
  },
  ip_match_0001: {
    title: "IP_TRACE",
    note: "The CloudTrail match leads straight to Jordan's home address.",
    connectedToVictoria: false,
  },
  // --- CASE 0002 PINS ---
  db_password: {
    title: "DATABASE PASS",
    note: "Found in deploy.sh. The key to the kingdom left in a comment.",
    connectedToVictoria: false,
  },
  night_login: {
    title: "2AM_LOGIN",
    note: "No VPN, no authorization. Just a straight hit on the database.",
    connectedToVictoria: false,
  },
  sam_ip: {
    title: "HOME_IP",
    note: "The residential trail stops at Sam Rivera's front door.",
    connectedToVictoria: false,
  },
  db_export: {
    title: "MASS EXPORT",
    note: "150,000 records. A professional heist, executed in minutes.",
    connectedToVictoria: false,
  },
  // --- CASE 0003 PINS ---
  docker_mount: {
    title: "VOLUME_MOUNT",
    note: "The host filesystem was mounted with root access. A classic breakout.",
    connectedToVictoria: false,
  },
  ssh_theft: {
    title: "SSH_STOLEN",
    note: "Container logs show the host's private key being read in the middle of the night.",
    connectedToVictoria: false,
  },
  marcus_ip: {
    title: "MARCUS_TRACE",
    note: "The production login at 2:14 AM came from Marcus's residential address.",
    connectedToVictoria: false,
  },
  // --- CASE 0004 PINS ---
  api_leak: {
    title: "API_LEAK",
    note: "Logged in plain text. Master platform access exposed to anyone reading logs.",
    connectedToVictoria: false,
  },
  sale_receipt: {
    title: "SALE_RECEIPT",
    note: "$12,000 paid to Kevin's personal account for 'API access credentials'.",
    connectedToVictoria: false,
  },
  download_log: {
    title: "LOG_DOWNLOAD",
    note: "Kevin downloaded the full log file one day before the sale was finalized.",
    connectedToVictoria: false,
  },
  // --- CASE 0005 PINS ---
  admin_access: {
    title: "ADMIN_ACCESS",
    note: "The intern used root credentials to purge the logs. A trail of zeros.",
    connectedToVictoria: false,
  },
  deletion_timing: {
    title: "DELETION_TIMING",
    note: "4.2TB of data vanished in the 15-minute window when Jordan was 'rebooting' the server.",
    connectedToVictoria: false,
  },
  ip_match_0005: {
    title: "IP_MATCH",
    note: "The deletion command originated from the intern's workstation IP.",
    connectedToVictoria: false,
  },
  competitor_job: {
    title: "OFFER_LETTER",
    note: "A signed offer from the competitor. The price for the deletion was a senior role.",
    connectedToVictoria: false,
  },
  // --- CASE 0006 PINS ---
  grace_period: {
    title: "GRACE_PERIOD",
    note: "The 30-day window was a graveyard for secrets. Ben used every second.",
    connectedToVictoria: false,
  },
  contractor_offboard: {
    title: "OFFBOARD_LOCK",
    note: "Ben's access was supposed to be revoked, but the config file kept the door open.",
    connectedToVictoria: false,
  },
  vpn_ip: {
    title: "VPN_TRACE",
    note: "The login at 3 AM bypassed company filters via a non-standard VPN entry point.",
    connectedToVictoria: false,
  },
  token_leak: {
    title: "TOKEN_LEAK",
    note: "A static JWT secret that should have been rotated months ago.",
    connectedToVictoria: false,
  },
  // --- CASE 0007 PINS ---
  force_push: {
    title: "FORCE_PUSH",
    note: "History rewritten. The evidence of the wire transfer was deleted from the main branch.",
    connectedToVictoria: false,
  },
  fraud_evidence: {
    title: "REFLOG_STAIN",
    note: "Git reflog never forgets. The deleted commit contained the internal banking routing numbers.",
    connectedToVictoria: false,
  },
  slack_panic: {
    title: "SLACK_PANIC",
    note: "Maya's messages show a rapid escalation of panic when the reflog was mentioned.",
    connectedToVictoria: false,
  },
  shell_company: {
    title: "SHELL_CORP",
    note: "The destination for the $2M was a company Maya registered in her brother's name.",
    connectedToVictoria: false,
  },
  // --- CASE 0008 PINS ---
  author_match: {
    title: "AUTHOR_MATCH",
    note: "The malicious package author's handle matches Leo's old GitHub username.",
    connectedToVictoria: false,
  },
  publish_timing: {
    title: "PUBLISH_TIME",
    note: "Package published at 9:45 AM. Leo reported the 'fix' at 9:50 AM.",
    connectedToVictoria: false,
  },
  backdoor_payload: {
    title: "BACKDOOR",
    note: "Obfuscated JS in the dependency. It wasn't fixing a bug; it was creating a tunnel.",
    connectedToVictoria: false,
  },
  forgot_reservation: {
    title: "DOMAIN_FLAW",
    note: "Leo forgot to reserve the internal package name, then 'found' the typosquat himself.",
    connectedToVictoria: false,
  },
  // --- CASE 0009 PINS ---
  bucket_public: {
    title: "S3_EXPOSURE",
    note: "A single click made 10 years of patient records accessible to anyone with the URL.",
    connectedToVictoria: false,
  },
  lisa_download: {
    title: "ADMIN_PULL",
    note: "Audit logs show Lisa pulled 50,000 files before 'discovering' they were public.",
    connectedToVictoria: false,
  },
  delayed_report: {
    title: "DELAY_TIMER",
    note: "The public exposure was known for 48 hours before Lisa finally reported it.",
    connectedToVictoria: false,
  },
  personal_aws: {
    title: "PERSONAL_CLOUD",
    note: "The exfiltrated data was found mirrored on a private AWS account linked to Lisa's email.",
    connectedToVictoria: false,
  },
  // --- CASE 0010 PINS ---
  no_auth: {
    title: "REDIS_OPEN",
    note: "No password, no firewall. An open playground for anyone who found the IP.",
    connectedToVictoria: false,
  },
  researcher_ip: {
    title: "RESEARCHER_IP",
    note: "Alex's 'security research' involved active exfiltration before the report was filed.",
    connectedToVictoria: false,
  },
  dark_web: {
    title: "DARK_LISTING",
    note: "Session tokens for sale on Hydra. The listing date matches Alex's initial discovery.",
    connectedToVictoria: false,
  },
  wallet_0010: {
    title: "CRYPTO_RECEIPT",
    note: "0.8 BTC received on the same day the Redis tokens were sold on the dark web.",
    connectedToVictoria: false,
  },
  // --- CASE 0011 PINS ---
  james_ip_exfil: {
    title: "JAMES_IP",
    note: "The exfiltration server logs leading back to James's home workstation.",
    connectedToVictoria: false,
  },
  git_rewrite: {
    title: "HISTORY_AMEND",
    note: "James tried to amend his audit log to remove the time he spent 'reviewing' the code.",
    connectedToVictoria: false,
  },
  blame_game: {
    title: "SCAPEGOAT",
    note: "James pointed the finger at Emma before the security team even finished the scan.",
    connectedToVictoria: false,
  },
  malicious_npm: {
    title: "MALICIOUS_NPM",
    note: "The postinstall script was a work of art. Too bad James didn't look at it.",
    connectedToVictoria: false,
  },
  // --- CASE 0012 PINS ---
  backups_purged: {
    title: "BACKUPS_GONE",
    note: "All 90 days of backups deleted 48 hours before the encryption started.",
    connectedToVictoria: false,
  },
  vacation_alibi: {
    title: "ALIBI_LEAVE",
    note: "Lisa was on a flight to Hawaii when the servers locked. Perfect timing.",
    connectedToVictoria: false,
  },
  ransom_split: {
    title: "50_PERCENT",
    note: "Exactly 2.5 BTC—half the ransom—transferred to Lisa's cold wallet.",
    connectedToVictoria: false,
  },
  mongo_exposed: {
    title: "DB_OPEN",
    note: "The config was left open purposefully. Lisa knew exactly who would find it.",
    connectedToVictoria: false,
  },
};

export default function GameClient() {
  const [phase, setPhase] = useState<Phase>("select");
  const [selectedCase, setSelectedCase] = useState<FullCase | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [playerName, setPlayerName] = useState("Detective");
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [openedFileIds, setOpenedFileIds] = useState<Set<string>>(new Set());
  const [discoveredClues, setDiscoveredClues] = useState<Set<string>>(
    new Set(),
  );
  const [newlyFoundClues, setNewlyFoundClues] = useState<string[]>([]);
  const [narrationText, setNarrationText] = useState<string | null>(null);
  const [sidePanel, setSidePanel] = useState<SidePanel>("files");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [accusedId, setAccusedId] = useState<string | null>(null);
  const [showSolveTerminal, setShowSolveTerminal] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [solvedCaseIds, setSolvedCaseIds] = useState<Set<string>>(new Set());
  const [showDossier, setShowDossier] = useState(false);
  const [showEvidenceBoard, setShowEvidenceBoard] = useState(false);
  const [showCrimeSceneFolder, setShowCrimeSceneFolder] = useState(false);
  const [crimeScenePhotoId, setCrimeScenePhotoId] = useState<string | null>(null);
  const [showCameraFeed, setShowCameraFeed] = useState(false);
  const [incomingCallVisible, setIncomingCallVisible] = useState(false);
  const [showGithubAlert, setShowGithubAlert] = useState(false);
  const [dbLockVisible, setDbLockVisible] = useState(false);
  const [showTrafficMonitor, setShowTrafficMonitor] = useState(false);
  const [evidencePins, setEvidencePins] = useState<BoardPin[]>([]);
  const [projectorFlash, setProjectorFlash] = useState(false);
  const [contentSwapKey, setContentSwapKey] = useState(0);

  // --- SIMULATOR STATES ---
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [fingerprintOpen, setFingerprintOpen] = useState(false);
  const [btcOpen, setBtcOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [dnaOpen, setDnaOpen] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [ipOpen, setIpOpen] = useState(false);

  const [simulatorCriteria, setSimulatorCriteria] = useState({
    terminal: false,
    dna: false,
    fingerprints: false,
    phone: false,
    btc: false,
    voice: false,
    ip: false,
  });
  const [simulatorFindings, setSimulatorFindings] = useState<SimulatorFinding[]>([]);

  const getCaseStrength = () => {
    const values = [
      simulatorCriteria.terminal,
      simulatorCriteria.dna,
      simulatorCriteria.fingerprints,
      simulatorCriteria.phone,
      simulatorCriteria.btc,
      simulatorCriteria.voice,
      simulatorCriteria.ip
    ];
    const completed = values.filter(v => v).length;
    return Math.round((completed / 7) * 100);
  };
  const onboardingDone = useRef(false);
  const flashTimeoutRef = useRef<number | null>(null);
  const callTimerRef = useRef<number | null>(null);
  const callWhisperRef = useRef(false);
  const crimeSceneShownRef = useRef(false);

  const caseFiles = selectedCase?.files ?? [];
  const caseClues = selectedCase?.clues ?? [];
  const criticalClues = caseClues.filter((c: any) => c.critical);
  const caseTree = Array.isArray(selectedCase?.fileTree)
    ? selectedCase.fileTree
    : selectedCase?.fileTree
      ? [selectedCase.fileTree]
      : [];

  const handleCaseSelect = useCallback((id: string) => {
    const found = ALL_CASES.find((c) => c.id === id);
    if (!found || found.isLocked) return;
    setSelectedCase(found);
    setPhase("intro");
    setShowDossier(false);
    // Reset investigation state
    setActiveFileId(null);
    setOpenTabs([]);
    setOpenedFileIds(new Set());
    setDiscoveredClues(new Set());
    setNewlyFoundClues([]);
    setNarrationText(null);
    setAccusedId(null);
    setShowSolveTerminal(false);
    setSidePanel("files");
    setShowOnboarding(false);
    setShowEvidenceBoard(false);
    setShowCrimeSceneFolder(false);
    setCrimeScenePhotoId(null);
    setShowCameraFeed(false);
    setIncomingCallVisible(false);
    setEvidencePins([]);
    setSimulatorFindings([]);
    callWhisperRef.current = false;
    if (callTimerRef.current !== null) {
      window.clearTimeout(callTimerRef.current);
      callTimerRef.current = null;
    }
    onboardingDone.current = false;
    crimeSceneShownRef.current = false;
  }, []);

  useEffect(() => {
    const savedName = window.localStorage.getItem("codenoir.detectiveName");
    if (savedName && savedName.trim()) {
      setPlayerName(savedName.trim());
    } else {
      setShowNamePrompt(true);
    }
  }, []);

  const saveDetectiveName = useCallback((name: string) => {
    const nextName = name.trim() || "Detective";
    setPlayerName(nextName);
    window.localStorage.setItem("codenoir.detectiveName", nextName);
    setShowNamePrompt(false);
  }, []);

  const handleSkipNamePrompt = useCallback(() => {
    saveDetectiveName("Detective");
  }, [saveDetectiveName]);

  const registerBoardPin = useCallback(
    (pinId: string) => {
      const pin = BOARD_PIN_LIBRARY[pinId];
      if (!pin) return;

      setEvidencePins((prev) => {
        if (prev.some((entry) => entry.id === pinId)) {
          return prev;
        }

        return [...prev, { id: pinId, ...pin }];
      });
    },
    [],
  );

  const queueAnonymousCall = useCallback(() => {
    if (callTimerRef.current !== null) {
      window.clearTimeout(callTimerRef.current);
    }

    callTimerRef.current = window.setTimeout(() => {
      callTimerRef.current = null;
      callWhisperRef.current = true;
      setIncomingCallVisible(true);
    }, 10000);
  }, []);

  const handleOpenCameraFeed = useCallback(() => {
    setShowCameraFeed(true);
    setShowEvidenceBoard(true);
    setShowCrimeSceneFolder(false);
  }, []);

  const handleOpenCrimeScene = useCallback(() => {
    setShowCrimeSceneFolder(true);
    setShowEvidenceBoard(false);
    setShowCameraFeed(false);
  }, []);

  const handleOpenEvidenceBoard = useCallback(() => {
    setShowEvidenceBoard(true);
    setShowCrimeSceneFolder(false);
    setShowCameraFeed(false);
  }, []);

  const startInvestigation = useCallback(() => {
    setPhase("investigation");
    setShowOnboarding(true);
  }, []);

  const handleFileOpen = useCallback(
    (fileId: string) => {
      if (!selectedCase) return;
      const file = caseFiles.find((f: any) => f.id === fileId);
      if (!file) return;

      if (fileId === "solve") {
        setActiveFileId(fileId);
        if (!openTabs.includes(fileId)) setOpenTabs((t) => [...t, fileId]);
        setShowSolveTerminal(true);
        if (!openedFileIds.has(fileId)) {
          setOpenedFileIds((s) => new Set([...s, fileId]));
          setNarrationText(file.narration);
        }
        return;
      }

      setShowSolveTerminal(false);
      setActiveFileId(fileId);
      if (!openTabs.includes(fileId)) setOpenTabs((t) => [...t, fileId]);

      triggerFilePins(selectedCase.id, fileId);

      if (!openedFileIds.has(fileId)) {
        setOpenedFileIds((s) => new Set([...s, fileId]));
        setNarrationText(file.narration);
        const newClues = (file.clues ?? []).filter(
          (c: string) => !discoveredClues.has(c),
        );
        if (newClues.length > 0) {
          setDiscoveredClues((prev) => {
            const next = new Set(prev);
            newClues.forEach((c: string) => next.add(c));
            return next;
          });
          setNewlyFoundClues(newClues);
          setTimeout(() => setSidePanel("clues"), 2500);
        }
      }
    },
    [
      selectedCase,
      caseFiles,
      openTabs,
      openedFileIds,
      discoveredClues,
      registerBoardPin,
      queueAnonymousCall,
    ],
  );

  const triggerFilePins = useCallback((caseId: string, fileId: string) => {
      // Mapping of Case IDs to their file-to-pin relationships + Side Effects
      if (caseId === "0001") {
          if (fileId === "config") {
              registerBoardPin("leaked_key");
              setShowGithubAlert(true);
              queueAnonymousCall();
          }
          if (fileId === "git_history") { registerBoardPin("notification"); registerBoardPin("alibi"); }
          if (fileId === "slack") registerBoardPin("slack_slip");
          if (fileId === "cloudtrail") registerBoardPin("ip_match_0001");
      } else if (caseId === "0002") {
          if (fileId === "deploy") {
              registerBoardPin("db_password");
              queueAnonymousCall();
          }
          if (fileId === "auth_log") { 
              registerBoardPin("night_login"); 
              registerBoardPin("db_export");
              setDbLockVisible(true);
          }
          if (fileId === "staff") registerBoardPin("sam_ip");
      } else if (caseId === "0003") {
          if (fileId === "docker_compose") {
              registerBoardPin("docker_mount");
              queueAnonymousCall();
          }
          if (fileId === "auth_log") {
              registerBoardPin("ssh_theft");
              setShowCameraFeed(true);
          }
          if (fileId === "staff") registerBoardPin("marcus_ip");
      } else if (caseId === "0004") {
          if (fileId === "app_log") {
              registerBoardPin("api_leak");
              setShowTrafficMonitor(true);
              queueAnonymousCall();
          }
          if (fileId === "sales_receipt") registerBoardPin("sale_receipt");
          if (fileId === "readme") registerBoardPin("download_log");
      } else if (caseId === "0005") {
          if (fileId === "logs") { 
              registerBoardPin("deletion_timing"); 
              registerBoardPin("admin_access"); 
              queueAnonymousCall();
          }
          if (fileId === "staff") registerBoardPin("ip_match_0005");
          if (fileId === "readme") registerBoardPin("competitor_job");
      } else if (caseId === "0006") {
          if (fileId === "config") { 
              registerBoardPin("grace_period"); 
              registerBoardPin("contractor_offboard"); 
              queueAnonymousCall();
          }
          if (fileId === "auth_log") registerBoardPin("vpn_ip");
          if (fileId === "jwt") registerBoardPin("token_leak");
      } else if (caseId === "0007") {
          if (fileId === "git_history") { 
              registerBoardPin("force_push"); 
              registerBoardPin("fraud_evidence"); 
              queueAnonymousCall();
          }
          if (fileId === "slack") registerBoardPin("slack_panic");
          if (fileId === "readme") registerBoardPin("shell_company");
      } else if (caseId === "0008") {
          if (fileId === "npm_audit") { 
              registerBoardPin("author_match"); 
              registerBoardPin("publish_timing"); 
              queueAnonymousCall();
          }
          if (fileId === "package_json") registerBoardPin("backdoor_payload");
          if (fileId === "readme") registerBoardPin("forgot_reservation");
      } else if (caseId === "0009") {
          if (fileId === "cloudtrail") { 
              registerBoardPin("bucket_public"); 
              registerBoardPin("lisa_download"); 
              queueAnonymousCall();
          }
          if (fileId === "monitoring") registerBoardPin("delayed_report");
          if (fileId === "staff") registerBoardPin("personal_aws");
      } else if (caseId === "0010") {
          if (fileId === "darkweb") { 
              registerBoardPin("dark_web"); 
              registerBoardPin("no_auth"); 
              queueAnonymousCall();
          }
          if (fileId === "redis_conf") registerBoardPin("researcher_ip");
          if (fileId === "wallet") registerBoardPin("wallet_0010");
      } else if (caseId === "0047") {
          if (fileId === "readme") registerBoardPin("voss_photo");
          if (fileId === "victim_profile") { registerBoardPin("seed_phrase"); registerBoardPin("last_commit"); }
          if (fileId === "emails") {
              registerBoardPin("email_threat");
              if (!callWhisperRef.current) queueAnonymousCall();
          }
          if (fileId === "transactions") registerBoardPin("btc_wallet");
          if (fileId === "camera_log") registerBoardPin("camera_feed");
          if (fileId === "suspects") registerBoardPin("victoria");
      } else if (caseId === "0011") {
          if (fileId === "pr_review") {
              registerBoardPin("james_ip_exfil");
              registerBoardPin("git_rewrite");
              queueAnonymousCall();
          }
          if (fileId === "readme") registerBoardPin("blame_game");
          if (fileId === "postinstall") registerBoardPin("malicious_npm");
      } else if (caseId === "0012") {
          if (fileId === "backup_deletion") {
              registerBoardPin("backups_purged");
              registerBoardPin("vacation_alibi");
              queueAnonymousCall();
          }
          if (fileId === "crypto_wallet") registerBoardPin("ransom_split");
          if (fileId === "mongodb_conf") registerBoardPin("mongo_exposed");
      }
  }, [
      registerBoardPin, 
      setShowGithubAlert, 
      setDbLockVisible, 
      setShowCameraFeed, 
      setShowTrafficMonitor, 
      queueAnonymousCall
  ]);

  const handleTabClose = useCallback(
    (tabId: string) => {
      setOpenTabs((t) => t.filter((id) => id !== tabId));
      if (activeFileId === tabId) {
        const remaining = openTabs.filter((id) => id !== tabId);
        setActiveFileId(remaining[remaining.length - 1] ?? null);
        if (remaining[remaining.length - 1] !== "solve")
          setShowSolveTerminal(false);
      }
    },
    [activeFileId, openTabs],
  );

  const handleSolve = useCallback((id: string) => {
    setAccusedId(id);
    setPhase("verdict");
  }, []);

  const handleRestart = useCallback(() => {
    setActiveFileId(null);
    setOpenTabs([]);
    setOpenedFileIds(new Set());
    setDiscoveredClues(new Set());
    setNewlyFoundClues([]);
    setNarrationText(null);
    setAccusedId(null);
    setShowSolveTerminal(false);
    setSidePanel("files");
    setShowOnboarding(false);
    setShowEvidenceBoard(false);
    setShowCrimeSceneFolder(false);
    setCrimeScenePhotoId(null);
    setShowCameraFeed(false);
    setIncomingCallVisible(false);
    setSimulatorFindings([]);
    onboardingDone.current = false;
    callWhisperRef.current = false;
    if (callTimerRef.current !== null) {
      window.clearTimeout(callTimerRef.current);
      callTimerRef.current = null;
    }
    setPhase("intro");
  }, []);

  const registerSimulatorFinding = useCallback((finding: SimulatorFinding) => {
    setSimulatorFindings((prev) => {
      if (prev.some((entry) => entry.id === finding.id)) {
        return prev;
      }
      return [...prev, finding];
    });
  }, []);

  const sanitizeForPublicBrief = useCallback((text: string) => {
    return text
      .replace(/\b(?:AKIA|ASIA)[A-Z0-9]{12,}\b/g, "[REDACTED_ACCESS_KEY]")
      .replace(/\bsk_(?:live|test)_[A-Za-z0-9]{12,}\b/g, "[REDACTED_API_KEY]")
      .replace(/\b(?:[13][a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[a-z0-9]{20,})\b/g, "[REDACTED_WALLET]")
      .replace(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g, "[REDACTED_IP]");
  }, []);

  const handleShareBrief = useCallback((payload: {
    clueIds: string[];
    ranking: Array<{ id: string; confidence: number }>;
    summary: string;
    safeMode: boolean;
  }) => {
    if (!selectedCase) return;

    const clueIds = payload.safeMode
      ? payload.clueIds.filter((id) => !/key|wallet|ip|token|secret/i.test(id))
      : payload.clueIds;
    const summary = payload.safeMode
      ? sanitizeForPublicBrief(payload.summary)
      : payload.summary;

    const params = new URLSearchParams({
      clues: clueIds.join(","),
      ranking: payload.ranking.map((item) => `${item.id}:${item.confidence}`).join(","),
      summary,
      safe: payload.safeMode ? "1" : "0",
    });

    window.open(`/brief/${selectedCase.id}?${params.toString()}`, "_blank");
  }, [sanitizeForPublicBrief, selectedCase]);

  const handleViewCaseArchive = useCallback(() => {
    if (!selectedCase) return;
    // Mark current case as solved if verdict was correct
    if (accusedId === selectedCase.correctSuspectId) {
      setSolvedCaseIds((prev) => new Set([...prev, selectedCase.id]));
    }
    setShowDossier(true);
  }, [accusedId, selectedCase]);

  const handleToggleAudio = useCallback(() => {
    setAudioEnabled((prev) => !prev);
  }, []);

  // Auto-open first file after onboarding dismissed
  useEffect(() => {
    if (
      phase === "investigation" &&
      !showOnboarding &&
      !onboardingDone.current
    ) {
      onboardingDone.current = true;
      const firstFile = caseTree?.[0]?.children?.[0];
      if (firstFile?.id) setTimeout(() => handleFileOpen(firstFile.id), 400);
    }
  }, [showOnboarding, phase, caseTree, handleFileOpen]);

  useEffect(() => {
    if (selectedCase?.id !== "0047") {
      return;
    }

    if (discoveredClues.has("clue_seed_phrase")) {
      registerBoardPin("seed_phrase");
    }

    if (
      discoveredClues.has("clue_wallet_address") ||
      discoveredClues.has("clue_btc_flow") ||
      discoveredClues.has("clue_mixer") ||
      discoveredClues.has("clue_frozen_account")
    ) {
      registerBoardPin("btc_wallet");
    }

    if (
      discoveredClues.has("clue_crane_motive") ||
      discoveredClues.has("clue_crane_email")
    ) {
      registerBoardPin("victoria");
      registerBoardPin("email_threat");
    }

    if (
      discoveredClues.has("clue_meeting_time") ||
      discoveredClues.has("clue_crane_email")
    ) {
      registerBoardPin("email_threat");
    }

    if (
      discoveredClues.has("clue_camera_offline") ||
      discoveredClues.has("clue_gait_match")
    ) {
      registerBoardPin("camera_feed");
    }

    if (discoveredClues.has("clue_meridian_transfer")) {
      registerBoardPin("last_commit");
      registerBoardPin("victoria");
    }
  }, [discoveredClues, registerBoardPin, selectedCase]);

  useEffect(() => {
    if (
      phase === "investigation" &&
      !showOnboarding &&
      !crimeSceneShownRef.current
    ) {
      crimeSceneShownRef.current = true;
      setShowCrimeSceneFolder(true);
    }
  }, [phase, selectedCase, showOnboarding]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`") {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      if (callTimerRef.current !== null) {
        window.clearTimeout(callTimerRef.current);
      }
    };
  }, []);

  const activeFile = caseFiles.find((f: any) => f.id === activeFileId);

  const explainableVerdict = selectedCase
    ? generateInvestigationReport(
      selectedCase,
      discoveredClues,
      evidencePins,
      simulatorCriteria,
      simulatorFindings,
    ).suspectRanking
    : [];

  useEffect(() => {
    if (!activeFileId) return;

    setProjectorFlash(true);
    setContentSwapKey((k) => k + 1);

    if (flashTimeoutRef.current !== null) {
      window.clearTimeout(flashTimeoutRef.current);
    }

    flashTimeoutRef.current = window.setTimeout(() => {
      setProjectorFlash(false);
    }, 80);
  }, [activeFileId, showSolveTerminal]);

  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current !== null) {
        window.clearTimeout(flashTimeoutRef.current);
      }
    };
  }, []);

  // ── Render phases ────────────────────────────────────────────────────────

  if (phase === "select") {
    return (
      <CaseSelectScreen
        cases={ALL_CASES.map((c) => ({
          id: c.id,
          caseNumber: c.caseNumber,
          title: c.title,
          difficulty: c.difficulty,
          isLocked: c.isLocked,
          tagline: c.tagline,
          victim: c.victim,
          description: c.description,
        }))}
        onSelect={handleCaseSelect}
      />
    );
  }

  if (phase === "intro" && selectedCase) {
    return (
      <IntroScreen
        onEnter={startInvestigation}
        caseNumber={selectedCase.caseNumber}
        title={selectedCase.introTitle}
        tagline={selectedCase.tagline}
        body1={selectedCase.introBody1}
        body2={selectedCase.introBody2}
        difficulty={selectedCase.difficulty}
      />
    );
  }

  if (phase === "verdict" && accusedId && selectedCase) {
    return (
      <>
        <VerdictScreen
          caseData={selectedCase}
          accusedId={accusedId}
          discoveredClues={discoveredClues}
          explainableVerdict={explainableVerdict}
          onRestart={handleRestart}
          onCaseSelect={handleViewCaseArchive}
          solvedCaseIds={solvedCaseIds}
          onSelectNextCase={handleCaseSelect}
          playerName={playerName}
          audioEnabled={audioEnabled}
        />
        {showDossier && (
          <CaseDossier
            cases={ALL_CASES}
            solvedCaseIds={solvedCaseIds}
            onSelectCase={handleCaseSelect}
            onClose={() => setShowDossier(false)}
          />
        )}
      </>
    );
  }

  if (!selectedCase) return null;

  return (
    <div className="flex flex-col h-screen bg-[#010103] overflow-hidden text-white">
      <div className="vignette-overlay" />
      <DetectiveNamePrompt
        open={showNamePrompt}
        initialName={playerName === "Detective" ? "" : playerName}
        onSave={saveDetectiveName}
        onSkip={handleSkipNamePrompt}
      />
      <CrimeSceneFolder
        open={showCrimeSceneFolder}
        activePhotoId={crimeScenePhotoId}
        onSelectPhoto={setCrimeScenePhotoId}
        onClose={() => {
          setShowCrimeSceneFolder(false);
          setCrimeScenePhotoId(null);
        }}
        caseId={selectedCase.id}
      />
      <SecurityCameraFeed
        open={showCameraFeed}
        onClose={() => setShowCameraFeed(false)}
        caseId={selectedCase.id}
      />
      <IncomingCallOverlay
        open={incomingCallVisible}
        onAnswer={() => {
          setIncomingCallVisible(false);
          callWhisperRef.current = true;
          if (audioEnabled) {
            let callText = "We see what you're looking at. The logs don't tell the whole story. Back off while you still can.";

            if (selectedCase.id === "0047") {
              callText = "Stop digging, Detective. This is your only warning. Close the wall, forget the wallet, and walk away before you make yourself part of the evidence.";
            } else if (selectedCase.id === "0001") {
              callText = "You're late to the party, Detective. The keys are already being used in a dozen different regions. By the time you close this case, there won't be an application left to protect.";
            } else if (selectedCase.id === "0002") {
              callText = "Sam didn't do it alone. You're looking at the logs, but you're not seeing the shadow in the room. Some things are better left unexported.";
            } else if (selectedCase.id === "0003") {
              callText = "Containers are supposed to be secure, aren't they? But you've found the hole. Now the question is, can you get back in before the host system flatlines?";
            } else if (selectedCase.id === "0004") {
              callText = "Moscow is a long way from here, isn't it? The data is moving faster than your investigation. Tell the board they've lost more than just API keys.";
            } else if (selectedCase.id === "0005") {
              callText = "Amateur hour is over. Jordan's moving more than just files. If you keep following that paper trail, you might find yourself at the end of a very long drop.";
            } else if (selectedCase.id === "0006") {
              callText = "A 30-day grace period. Plenty of time to disappear, wouldn't you say? The secrets are rotating, but some stains are permanent.";
            } else if (selectedCase.id === "0007") {
              callText = "Force-pushing history doesn't make it disappear. But asking the wrong questions might make YOU disappear from the record.";
            } else if (selectedCase.id === "0008") {
              callText = "A package with a familiar name. A payload that's already reached its destination. You're trying to solve a crime that's already finished.";
            } else if (selectedCase.id === "0009") {
              callText = "Open buckets are just invitations for those who know how to ask. But be careful what you find when you stare too long into the cloud.";
            } else if (selectedCase.id === "0010") {
              callText = "Unauthenticated, unencrypted, and now... unsold? The dark web has a long memory for those who don't follow the rules of the trade.";
            } else if (selectedCase.id === "0011") {
              callText = "A signature given in haste. A backdoor left wide open. The senior dev isn't the only one trying to bury their mistakes.";
            } else if (selectedCase.id === "0012") {
              callText = "When the walls come down, everyone looks for a door. But some doors lead straight into a trap. Check the wallet, follow the coin, find the betrayal.";
            }

            speak({
              profile: "call",
              text: callText,
              onError: () => undefined,
            });
          }
          window.setTimeout(() => setIncomingCallVisible(false), 1500);
        }}
        onDecline={() => {
          setIncomingCallVisible(false);
        }}
      />
      <AnimatePresence>
        {showOnboarding && (
          <OnboardingModal onClose={() => setShowOnboarding(false)} />
        )}
      </AnimatePresence>

      <ClueToast
        clueIds={newlyFoundClues}
        onDismiss={() => setNewlyFoundClues([])}
      />

      {/* Detective Header */}
      <DetectiveHeader
        caseNumber={selectedCase.caseNumber}
        caseTitle={selectedCase.title}
        playerName={playerName}
        cluesFound={discoveredClues.size}
        totalClues={caseClues.length}
        audioEnabled={audioEnabled}
        onToggleAudio={handleToggleAudio}
        onOpenEvidenceBoard={handleOpenEvidenceBoard}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.div
              className="flex flex-col border-r border-white/20 bg-black overflow-hidden flex-shrink-0 shadow-[12px_0_40px_rgba(0,0,0,1)]"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 276, opacity: 1 }}
              exit={{ width: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex border-b border-white/20 flex-shrink-0 bg-black">
                {(["files", "forensics", "clues"] as SidePanel[]).map((panel) => (
                  <button
                    key={panel}
                    onClick={() => setSidePanel(panel)}
                    className={clsx(
                      "flex-1 flex items-center justify-center gap-1.5 py-3 text-[10px] font-mono transition-colors uppercase tracking-wider",
                      sidePanel === panel
                        ? "text-noir-amber border-b border-noir-amber bg-white/10"
                        : "text-white hover:bg-white/10",
                    )}
                  >
                    {panel === "files" ? (
                      <Search size={11} />
                    ) : panel === "forensics" ? (
                      <Database size={11} />
                    ) : (
                      <Fingerprint size={11} />
                    )}
                    <span className="hidden sm:inline">{panel}</span>
                    {panel === "clues" && discoveredClues.size > 0 && (
                      <span className="ml-1 bg-noir-amber text-noir-bg text-[8px] font-bold px-1 rounded-full">
                        {discoveredClues.size}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-hidden bg-black">
                {sidePanel === "files" ? (
                  <FileTree
                    tree={caseTree}
                    activeFileId={activeFileId}
                    openedFileIds={openedFileIds}
                    discoveredClues={discoveredClues}
                    onFileClick={handleFileOpen}
                  />
                ) : sidePanel === "forensics" ? (
                  <div className="p-4 space-y-6 overflow-y-auto h-full no-scrollbar">
                    <CaseStrengthMeter
                      progress={getCaseStrength()}
                      criteria={{
                        dna: simulatorCriteria.dna,
                        terminal: simulatorCriteria.terminal,
                        fingerprints: simulatorCriteria.fingerprints,
                        phone: simulatorCriteria.phone,
                        btc: simulatorCriteria.btc,
                        voice: simulatorCriteria.voice,
                        ip: simulatorCriteria.ip
                      }}
                    />

                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-white font-bold uppercase tracking-[0.2em] mb-3 px-1">Active Tools</p>
                      {[
                        { id: 'term', label: 'Diag Terminal', icon: TerminalIcon, action: () => setTerminalOpen(true), complete: simulatorCriteria.terminal },
                        { id: 'finger', label: 'Ridge Matcher', icon: Fingerprint, action: () => setFingerprintOpen(true), complete: simulatorCriteria.fingerprints },
                        { id: 'btc', label: 'BTC Tracer', icon: Bitcoin, action: () => setBtcOpen(true), complete: simulatorCriteria.btc },
                        { id: 'voice', label: 'Stress Analysis', icon: Mic2, action: () => setVoiceOpen(true), complete: simulatorCriteria.voice },
                        { id: 'dna', label: 'DNA Sequencer', icon: TestTube2, action: () => setDnaOpen(true), complete: simulatorCriteria.dna },
                        { id: 'phone', label: 'Mobile Forensic', icon: Smartphone, action: () => setPhoneOpen(true), complete: simulatorCriteria.phone },
                        { id: 'ip', label: 'Signal Trace', icon: LocateFixed, action: () => setIpOpen(true), complete: simulatorCriteria.ip },
                      ].map(tool => (
                        <button
                          key={tool.id}
                          onClick={tool.action}
                          className={clsx(
                            "w-full flex items-center justify-between p-3 border transition-all text-left group",
                            tool.complete ? "border-noir-amber/40 bg-white/5 text-white" : "border-white/10 text-white hover:bg-white/10"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <tool.icon size={14} className={clsx("transition-transform group-hover:scale-110", tool.complete ? "text-noir-amber" : "text-white/60")} />
                            <span className="font-mono text-[9px] uppercase tracking-widest leading-none">{tool.label}</span>
                          </div>
                          {tool.complete && <div className="w-1 h-1 rounded-full bg-noir-amber shadow-[0_0_5px_#ffcc00]" />}
                        </button>
                      ))}
                    </div>

                    <NarrativeEnginePanel
                      caseData={selectedCase}
                      discoveredClues={discoveredClues}
                      evidencePins={evidencePins}
                      simulatorCriteria={simulatorCriteria}
                      simulatorFindings={simulatorFindings}
                      onShareBrief={handleShareBrief}
                    />
                  </div>
                ) : (
                  <CluesPanel
                    discoveredClues={discoveredClues}
                    clues={caseClues}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setSidebarOpen((o) => !o)}
          className="flex-shrink-0 w-4 flex items-center justify-center bg-noir-panel border-r border-noir-border text-noir-muted hover:text-noir-amber hover:bg-noir-border transition-colors"
        >
          {sidebarOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
        </button>

        {/* Editor */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <TabBar
            openTabs={openTabs}
            activeTabId={activeFileId}
            onTabClick={(id) => {
              setActiveFileId(id);
              setShowSolveTerminal(id === "solve");
            }}
            onTabClose={handleTabClose}
            caseFiles={caseFiles}
          />
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence>
              {projectorFlash && (
                <motion.div
                  className="absolute inset-0 bg-black pointer-events-none z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.08 }}
                />
              )}
            </AnimatePresence>

            <motion.div
              key={`${activeFileId ?? "empty"}-${showSolveTerminal ? "solve" : "file"}-${contentSwapKey}`}
              className="h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {!activeFileId && (
                <div className="flex flex-col items-center justify-center h-full text-center px-8">
                  <p className="text-4xl mb-4">🕵️</p>
                  <p className="text-noir-amber font-serif text-2xl mb-3">
                    Where do you begin?
                  </p>
                  <p className="text-noir-text font-mono text-sm mb-2">
                    Use the file explorer to open a case file.
                  </p>
                  <p className="text-noir-text-dim font-mono text-xs opacity-70">
                    Amber-highlighted lines are suspicious.
                  </p>
                </div>
              )}
              {activeFileId && showSolveTerminal && (
                <SolveTerminal
                  suspects={selectedCase.suspects}
                  onSolve={handleSolve}
                  criticalCluesFound={
                    criticalClues.filter((c: any) => discoveredClues.has(c.id))
                      .length
                  }
                  criticalCluesTotal={criticalClues.length}
                />
              )}
              {activeFile && !showSolveTerminal && (
                <MonacoWrapper
                  content={activeFile.content}
                  language={activeFile.language}
                  suspiciousPatterns={activeFile.suspiciousPatterns}
                  isTutorial={selectedCase.difficulty === "tutorial"}
                  onPin={() => {
                      if (selectedCase && activeFileId) {
                          triggerFilePins(selectedCase.id, activeFileId);
                      }
                  }}
                />
              )}
            </motion.div>
            <NarrationOverlay
              text={narrationText}
              onClose={() => setNarrationText(null)}
              audioEnabled={audioEnabled}
            />
          </div>
        </div>

        <button
          onClick={() => setRightPanelOpen((o) => !o)}
          className="flex-shrink-0 w-4 flex items-center justify-center bg-noir-panel border-l border-noir-border text-noir-muted hover:text-noir-amber hover:bg-noir-border transition-colors"
        >
          {rightPanelOpen ? (
            <ChevronRight size={12} />
          ) : (
            <ChevronLeft size={12} />
          )}
        </button>

        {/* Right panel */}
        <AnimatePresence initial={false}>
          {rightPanelOpen && (
            <motion.div
              className="flex flex-col border-l border-noir-border bg-noir-panel overflow-hidden flex-shrink-0"
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              exit={{ width: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-3 py-2 border-b border-noir-border flex-shrink-0">
                <p className="text-noir-muted text-xs font-mono tracking-widest uppercase">
                  Suspects
                </p>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-4">
                <div className="space-y-2">
                  {selectedCase.suspects.map((s) => (
                    <div
                      key={s.id}
                      className="suspect-card border border-noir-border rounded-sm p-2 transition-all duration-150 ease-out"
                    >
                      <span className="text-noir-text text-xs font-mono block">
                        {s.emoji} {s.name}
                      </span>
                      <span className="text-noir-text-dim text-xs font-mono opacity-60">
                        {s.role}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-noir-border" />
                <div>
                  <p className="text-noir-amber text-xs font-mono uppercase tracking-wider mb-2">
                    Files
                  </p>
                  {caseFiles
                    .filter((f: any) => f.id !== "solve")
                    .map((f: any) => (
                      <button
                        key={f.id}
                        onClick={() => handleFileOpen(f.id)}
                        className={clsx(
                          "w-full text-left flex items-center gap-1.5 py-1 text-xs font-mono transition-colors",
                          openedFileIds.has(f.id)
                            ? "text-noir-text hover:text-noir-amber"
                            : "text-noir-text-dim hover:text-noir-amber",
                        )}
                      >
                        <span>{f.icon}</span>
                        <span className="truncate">{f.name}</span>
                        {openedFileIds.has(f.id) && (
                          <span className="ml-auto w-1 h-1 rounded-full bg-noir-amber flex-shrink-0" />
                        )}
                      </button>
                    ))}
                </div>
                <div className="h-px bg-noir-border" />
                <button
                  onClick={() => handleFileOpen("solve")}
                  className="w-full py-2.5 border border-noir-amber text-noir-amber text-xs font-mono tracking-wider uppercase hover:bg-noir-amber hover:text-noir-bg transition-all duration-300"
                >
                  ⚡ SOLVE.sh
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <HintBar
        hints={selectedCase.hints}
        openedFileIds={openedFileIds}
        discoveredClues={discoveredClues}
        onFileOpen={handleFileOpen}
      />

      <StatusBar
        activeFileId={activeFileId}
        discoveredClues={discoveredClues.size}
        totalClues={caseClues.length}
      />
      <GitHubAlert
        show={showGithubAlert}
        onClose={() => setShowGithubAlert(false)}
      />
      <DatabaseLock
        show={dbLockVisible}
        onClose={() => setDbLockVisible(false)}
      />
      <TrafficMonitor
        show={showTrafficMonitor}
        onClose={() => setShowTrafficMonitor(false)}
      />

      {/* --- SIMULATOR MODALS --- */}
      <TerminalSimulator
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        secrets={selectedCase?.forensicData.terminalSecrets}
        onSecretCommand={(cmd) => {
          setSimulatorCriteria(prev => ({ ...prev, terminal: true }));
          setDiscoveredClues(prev => new Set(prev).add(`secret_${cmd}`));
          registerSimulatorFinding({
            id: `terminal-${cmd}`,
            title: "Terminal Secret Recovered",
            detail: `Command '${cmd}' exposed a hidden forensic trace in shell history.`,
          });
        }}
      />
      <FingerprintScanner
        isOpen={fingerprintOpen}
        onClose={() => setFingerprintOpen(false)}
        identityMatch={selectedCase?.forensicData.fingerprintMatch}
        onSuccess={() => {
          setSimulatorCriteria(prev => ({ ...prev, fingerprints: true }));
          registerSimulatorFinding({
            id: "fingerprint-match",
            title: "Fingerprint Correlation",
            detail: `Scanner matched ridge pattern to ${selectedCase?.forensicData.fingerprintMatch ?? "known identity"}.`,
          });
          setFingerprintOpen(false);
        }}
      />
      <BtcTracer
        isOpen={btcOpen}
        onClose={() => setBtcOpen(false)}
        initialAddress={selectedCase?.forensicData.btcTarget}
        finalResult={selectedCase?.correctSuspectId === "jordan" ? "jordan@techsprout.io" : "incognito@tor.network"}
        onSuccess={() => {
          setSimulatorCriteria(prev => ({ ...prev, btc: true }));
          registerSimulatorFinding({
            id: "btc-trace",
            title: "Crypto Flow Trace",
            detail: `Funds route converged on ${selectedCase?.forensicData.btcTarget ?? "target wallet"}.`,
          });
          setBtcOpen(false);
        }}
      />
      <VoiceStressAnalyzer
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        targets={selectedCase?.forensicData.voiceTargets}
        onSuccess={() => {
          setSimulatorCriteria(prev => ({ ...prev, voice: true }));
          registerSimulatorFinding({
            id: "voice-stress",
            title: "Voice Stress Pattern",
            detail: "Interview waveform indicates elevated stress in high-risk answer segments.",
          });
          setVoiceOpen(false);
        }}
      />
      <DnaLab
        isOpen={dnaOpen}
        onClose={() => setDnaOpen(false)}
        matchText={selectedCase?.forensicData.dnaMatch}
        onSuccess={() => {
          setSimulatorCriteria(prev => ({ ...prev, dna: true }));
          registerSimulatorFinding({
            id: "dna-lab",
            title: "DNA Lab Match",
            detail: selectedCase?.forensicData.dnaMatch ?? "DNA evidence linked to suspect profile.",
          });
          setDnaOpen(false);
        }}
      />
      <PhoneForensics
        isOpen={phoneOpen}
        onClose={() => setPhoneOpen(false)}
        correctPin={
          {
            "0001": "1522",
            "0002": "0217",
            "0003": "2359",
            "0004": "1200",
            "0005": "1147",
            "0006": "1642",
            "0007": "2332",
            "0008": "2218",
            "0009": "1018",
            "0010": "1122",
            "0011": "1005",
            "0012": "0345",
            "0047": "4407",
          }[selectedCase?.id ?? ""] ?? "0000"
        }
        pinHint={
          {
            "0001": "Check the git_history.log for the 15:22:47 commit timestamp",
            "0002": "Check the auth.log for the 02:17:15 login timestamp",
            "0003": "Check the auth.log for the 23:59:00 system termination window",
            "0004": "Check the sales_receipt.pdf for the first 4 digits of the $12,000 transfer",
            "0005": "Check the server.log for the 11:47:33 file deletion event",
            "0006": "Check the contractor_offboarding.md for the 16:42 download timestamp",
            "0007": "Check the first Slack message timestamp (23:32) in the investigation logs",
            "0008": "Check the npm_audit.log for the Version 1.0.3 publish time (22:18)",
            "0009": "Check the incident_timeline.md for the 10:18:02 monitoring alert",
            "0010": "Check the darkweb_listing.txt for the 11:22:03 listing timestamp",
            "0011": "Check the pr_review.md for James Park's 10:05:07 approval time",
            "0012": "Check the ransom_note.txt for the 03:45:00 encryption start time",
            "0047": "Check the victim_profile.js for the localMasterPin value",
          }[selectedCase?.id ?? ""] ?? "The PIN is hidden in the case evidence trail"
        }
        onSuccess={() => {
          setSimulatorCriteria(prev => ({ ...prev, phone: true }));
          registerSimulatorFinding({
            id: "phone-forensics",
            title: "Phone Forensics Unlock",
            detail: "Recovered messages and call records align with covert coordination timeline.",
          });
          setPhoneOpen(false);
        }}
      />
      <IpTrace
        isOpen={ipOpen}
        onClose={() => setIpOpen(false)}
        targetIp={selectedCase?.forensicData.ipTarget}
        targetLabel="Remote Access Point"
        onSuccess={() => {
          setSimulatorCriteria(prev => ({ ...prev, ip: true }));
          registerSimulatorFinding({
            id: "ip-trace",
            title: "IP Trace Completed",
            detail: `Signal chain terminated at ${selectedCase?.forensicData.ipTarget ?? "unknown endpoint"}.`,
          });
          setIpOpen(false);
        }}
      />
      <EvidenceBoard
        open={showEvidenceBoard}
        onClose={() => setShowEvidenceBoard(false)}
        playerName={playerName}
        pins={evidencePins}
        caseId={selectedCase.id}
        config={selectedCase.boardConfig}
        onOpenCameraFeed={handleOpenCameraFeed}
        onOpenCrimeScene={handleOpenCrimeScene}
      />
    </div>
  );
}
