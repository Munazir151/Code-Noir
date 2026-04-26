"use client";

import { X } from "lucide-react";
import clsx from "clsx";

interface CaseFile {
  id: string;
  name: string;
  icon: string;
  [key: string]: any;
}

interface TabBarProps {
  openTabs: string[];
  activeTabId: string | null;
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
  caseFiles: CaseFile[];
}

export default function TabBar({
  openTabs,
  activeTabId,
  onTabClick,
  onTabClose,
  caseFiles,
}: TabBarProps) {
  if (openTabs.length === 0) return null;

  return (
    <div className="flex items-end bg-[#050505] border-b border-noir-border h-10 overflow-x-auto flex-shrink-0 no-scrollbar z-20">
      {openTabs.map((tabId) => {
        const file = caseFiles.find((f) => f.id === tabId);
        if (!file && tabId !== "solve") return null;
        
        const name = tabId === "solve" ? "VERDICT" : file?.name;
        const isActive = tabId === activeTabId;

        return (
          <div
            key={tabId}
            className={clsx(
              "group relative flex items-center gap-3 px-4 h-full cursor-pointer transition-all border-r border-noir-border/30",
              "text-[11px] font-mono",
              isActive
                ? "bg-[#111111] text-white brightness-125"
                : "bg-transparent text-white/60 hover:bg-white/10 hover:text-white/90",
            )}
            onClick={() => onTabClick(tabId)}
          >
            {isActive && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-noir-amber" />
            )}
            
            <span className="whitespace-nowrap">{name}</span>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tabId);
              }}
              className={clsx(
                "ml-1 p-0.5 rounded transition-all",
                isActive
                  ? "text-white/60 hover:text-white"
                  : "opacity-0 group-hover:opacity-100 text-white/40 hover:text-white",
              )}
            >
              <X size={10} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
