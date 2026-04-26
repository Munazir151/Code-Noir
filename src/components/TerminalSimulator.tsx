"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSecretCommand: (cmd: string) => void;
  secrets?: string[];
}

export default function TerminalSimulator({ isOpen, onClose, onSecretCommand, secrets = [] }: TerminalSimulatorProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(["CODE_NOIR OS [Version 2.4.0]", "Type 'help' for available commands.", ""]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory([input, ...cmdHistory]);
    setHistIndex(-1);
    
    const newHistory = [...history, `> ${input}`];

    switch (cmd) {
      case "help":
        newHistory.push("Available commands: ls, cat, grep, git log, whoami, ping, sudo, clear, help");
        break;
      case "ls":
        newHistory.push("case_files/  evidence/  system/  logs/");
        break;
      case "whoami":
        newHistory.push("detective_user_0x88");
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "sudo":
        newHistory.push("Error: User not in the sudoers file. This incident will be reported.");
        break;
      case "git log":
        newHistory.push("commit d8a3f21... [REDACTED]");
        newHistory.push("commit f72b1a0... Initial forensic dump");
        break;
      case "cat":
        newHistory.push("cat: missing operand");
        break;
      case "grep":
        newHistory.push("grep: usage: grep [pattern] [file]");
        break;
      default:
        if (cmd.startsWith("cat ")) {
            newHistory.push(`cat: ${cmd.split(" ")[1]}: Permission denied`);
        } else if (cmd.startsWith("ping ")) {
            newHistory.push(`PING ${cmd.split(" ")[1]} (127.0.0.1): 56 data bytes`);
            newHistory.push(`64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.04 ms`);
        } else if (secrets.includes(cmd)) {
            newHistory.push("!!! SECRET COMMAND DETECTED !!!");
            newHistory.push("Unlocking hidden evidence...");
            onSecretCommand(cmd);
        } else {
            newHistory.push(`sh: command not found: ${cmd}`);
        }
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIndex < cmdHistory.length - 1) {
        const next = histIndex + 1;
        setHistIndex(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex > 0) {
        const next = histIndex - 1;
        setHistIndex(next);
        setInput(cmdHistory[next]);
      } else {
        setHistIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          exit={{ y: 300 }}
          className="fixed bottom-0 left-0 right-0 h-64 bg-black border-t border-white/20 z-[100] font-mono p-4 flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,1)]"
        >
          <div className="flex items-center justify-between mb-2 text-[10px] text-white uppercase tracking-widest border-b border-white/20 pb-1">
            <div className="flex items-center gap-2">
              <TerminalIcon size={12} className="text-noir-amber" />
              <span>Diagnostic Terminal</span>
            </div>
            <button onClick={onClose} className="hover:text-white transition-colors">
              <X size={14} />
            </button>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto text-xs text-white space-y-1 mb-2 no-scrollbar"
          >
            {history.map((line, i) => (
              <div key={i} className={line.startsWith(">") ? "text-noir-amber" : ""}>{line}</div>
            ))}
          </div>

          <form onSubmit={handleCommand} className="flex items-center gap-2 text-xs">
            <span className="text-noir-amber font-bold">➜</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white caret-noir-amber"
              autoFocus
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
