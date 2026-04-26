"use client";

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldAlert, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import type { SuspectProfile } from "@/data/cases";

interface SolveTerminalProps {
  suspects: SuspectProfile[];
  onSolve: (suspectId: string) => void;
  criticalCluesFound: number;
  criticalCluesTotal: number;
}

type LineType = "input" | "output" | "error" | "success" | "system";

export default function SolveTerminal({
  suspects,
  onSolve,
  criticalCluesFound,
  criticalCluesTotal,
}: SolveTerminalProps) {
  const [history, setHistory] = useState<
    { type: LineType; text: string }[]
  >([
    { type: "system", text: ">>> NOIR_OS v4.7.2 SECURE_CORE INITIALIZED" },
    { type: "output", text: "Welcome to the Case Resolution Environment." },
    { type: "output", text: "Enter 'help' to view investigation protocols.\n" },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [accused, setAccused] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const addLine = (
    text: string,
    type: LineType = "output",
  ) => {
    setHistory((h) => [...h, { type, text }]);
  };

  const suspectMap = Object.fromEntries(suspects.map((s) => [s.id, s]));

  const processCommand = async (cmd: string) => {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const arg = parts[1];

    addLine(`usr@noir:~$ ${cmd}`, "input");

    switch (command) {
      case "help":
        addLine(`
Investigative Protocols:
  accuse <id>   — Execute primary arrest warrant
  suspects      — Enumerate persons of interest
  evidence      — Audit found forensic markers
  clear         — Wipe environment logs
  help          — Display this manifest
`);
        break;

      case "suspects":
        addLine("\n--- KNOWN SUBJECTS ---");
        suspects.forEach((s) =>
          addLine(`[${s.id}] ${s.emoji} ${s.name.padEnd(20)} | REF: ${s.role.toUpperCase()}`)
        );
        addLine("----------------------\n");
        break;

      case "evidence":
        addLine(`\nEVIDENCE AUDIT REPORT:`);
        addLine(`CRITICAL_MARKERS: ${criticalCluesFound}/${criticalCluesTotal}`);
        if (criticalCluesFound < criticalCluesTotal) {
           addLine(`STATUS: INSUFFICIENT DATA. Missing ${criticalCluesTotal - criticalCluesFound} markers.`, "error");
        } else {
           addLine(`STATUS: READY FOR CONVICTION.`, "success");
        }
        addLine("");
        break;

      case "clear":
        setHistory([]);
        break;

      case "accuse": {
        if (accused) {
          addLine("PERMISSION DENIED: Accusation cycle already in progress.", "error");
          break;
        }
        if (!arg) {
          addLine("SYNTAX ERROR: accuse <target_id>", "error");
          break;
        }
        const suspect = suspectMap[arg];
        if (!suspect) {
          addLine(`NON-EXISTENT TARGET: '${arg}' does not match any subject.`, "error");
          break;
        }

        setAccused(true);
        setIsProcessing(true);
        
        addLine(`\n>>> INITIATING ARREST WARRANT FOR: ${suspect.name.toUpperCase()}`, "system");
        addLine(">>> SECURING NETWORK RELAYS...", "output");
        
        await new Promise(r => setTimeout(r, 800));
        addLine(">>> BYPASSING BIOMETRIC ENCRYPTION...", "output");
        
        await new Promise(r => setTimeout(r, 1000));
        addLine(">>> PACKAGING EVIDENCE CHAIN...", "output");
        
        await new Promise(r => setTimeout(r, 1200));
        
        const out = suspect.terminalOutput;
        const isGuilty = out.verdict === "GUILTY";
        
        addLine("\n[ RESULT RECEIVED ]", "system");
        addLine(`TARGET: ${suspect.name.toUpperCase()}`);
        addLine(`VERDICT: ${out.verdict}`, isGuilty ? "success" : "error");
        addLine("--------------------------------------------------");
        out.evidence.forEach(e => addLine(`+ ${e}`, "output"));
        addLine("--------------------------------------------------");
        addLine(`\n${out.message}\n`, isGuilty ? "success" : "error");
        
        if (isGuilty) {
           addLine("⚡ CASE RESOLVED. SUBJECT APPREHENDED.", "success");
        } else {
           addLine("⚠ INVESTIGATION FAILED. SUBJECT EXONERATED.", "error");
        }

        setTimeout(() => onSolve(arg), 2500);
        break;
      }

      case "":
        break;

      default:
        addLine(`UNRECOGNIZED PROTOCOL: '${command}'`, "error");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        setCmdHistory((h) => [input, ...h]);
        setHistoryIndex(-1);
      }
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(i);
      setInput(cmdHistory[i] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = Math.max(historyIndex - 1, -1);
      setHistoryIndex(i);
      setInput(i === -1 ? "" : cmdHistory[i]);
    }
  };

  return (
    <div
      className="h-full flex flex-col bg-[#020205] border border-noir-border/30 font-mono text-[11px] relative overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Background Matrix-style Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-noir-amber" 
           style={{ backgroundImage: 'radial-gradient(circle at center, var(--noir-amber) 0%, transparent 70%)' }} 
      />

      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#050508] border-b border-noir-border/50 z-10">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-noir-amber" />
          <span className="text-white/40 uppercase tracking-[0.2em]">VERDICT_CORE // 0xV3</span>
        </div>
        <div className="flex items-center gap-4">
           {isProcessing && <Loader2 size={12} className="text-noir-amber animate-spin" />}
           <div className="flex gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-noir-red/40" />
             <div className="w-1.5 h-1.5 rounded-full bg-noir-amber/40" />
             <div className="w-1.5 h-1.5 rounded-full bg-noir-green/40" />
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-1 relative z-10 scrollbar-hide">
        <AnimatePresence initial={false}>
          {history.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={clsx(
                "leading-relaxed whitespace-pre-wrap",
                line.type === "input" && "text-noir-amber",
                line.type === "output" && "text-white/70",
                line.type === "error" && "text-noir-red font-bold",
                line.type === "success" && "text-noir-green font-bold",
                line.type === "system" && "text-noir-amber/50 italic"
              )}
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} className="h-4" />
      </div>

      {!accused && (
        <div className={clsx(
          "flex flex-col px-6 py-3 bg-[#050508] border-t border-noir-border/30 z-10 transition-all duration-300",
          "focus-within:bg-[#0a0a10] focus-within:border-noir-amber/30"
        )}>
           <div className="flex items-center justify-between mb-1 opacity-40">
              <span className="font-mono text-[8px] text-white tracking-[0.3em] uppercase">Input_Session: ACTIVE</span>
              <span className="font-mono text-[8px] text-noir-amber animate-pulse">Waiting for directive...</span>
           </div>
           <div className="flex items-center gap-3">
              <span className="text-noir-amber font-bold text-lg select-none">λ</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-noir-amber outline-none caret-transparent font-mono text-[11px] placeholder:text-noir-amber/20"
                placeholder="type 'help' to begin..."
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
              <motion.div 
                className="w-1.5 h-4 bg-noir-amber"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
           </div>
        </div>
      )}
      
      {/* HUD Info Overlay */}
      <div className="absolute bottom-16 right-6 pointer-events-none opacity-[0.05] flex flex-col items-end">
          <ShieldAlert size={80} />
          <span className="text-[10px] tracking-widest">SECURE_CHANNEL</span>
      </div>
    </div>
  );
}
