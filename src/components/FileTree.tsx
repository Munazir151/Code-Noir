"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  Lock,
} from "lucide-react";
import clsx from "clsx";

interface TreeNode {
  id: string;
  name: string;
  type: "file" | "folder" | "directory";
  icon?: string;
  lockedBy?: string;
  children?: TreeNode[];
}

interface FileTreeProps {
  tree: TreeNode[];
  activeFileId: string | null;
  openedFileIds: Set<string>;
  discoveredClues: Set<string>;
  onFileClick: (fileId: string) => void;
}

function TreeItem({
  node,
  depth,
  activeFileId,
  openedFileIds,
  discoveredClues,
  onFileClick,
}: {
  node: TreeNode;
  depth: number;
  activeFileId: string | null;
  openedFileIds: Set<string>;
  discoveredClues: Set<string>;
  onFileClick: (fileId: string) => void;
}) {
  const [expanded, setExpanded] = useState(depth === 0);
  const isFolder = node.type === "folder" || node.type === "directory";
  const isLocked = !!(node.lockedBy && !discoveredClues.has(node.lockedBy));
  const isActive = activeFileId === node.id;
  const isOpened = openedFileIds.has(node.id);

  if (isFolder) {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={clsx(
            "flex items-center gap-2 w-full text-left py-1.5 px-3 transition-colors text-[12px] font-mono",
            "hover:bg-white/10 text-white",
          )}
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
        >
          {expanded ? (
              <ChevronDown size={12} />
          ) : (
              <ChevronRight size={12} />
          )}
          {expanded ? (
              <FolderOpen size={13} className="text-noir-amber" />
          ) : (
              <Folder size={13} className="text-noir-amber" />
          )}
          <span>{node.name}</span>
        </button>
        <AnimatePresence>
          {expanded && node.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {node.children.map((child) => (
                <TreeItem
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  activeFileId={activeFileId}
                  openedFileIds={openedFileIds}
                  discoveredClues={discoveredClues}
                  onFileClick={onFileClick}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const icon = isLocked ? "🔒" : (node.icon ?? "📄");

  return (
    <button
      onClick={() => !isLocked && onFileClick(node.id)}
      disabled={isLocked}
      className={clsx(
        "flex items-center gap-2 w-full text-left py-1.5 px-3 text-[12px] font-mono transition-all",
        isActive && "bg-white/20 text-noir-amber border-l-2 border-noir-amber",
        !isActive && !isLocked && "hover:bg-white/10 text-white",
        isLocked && "opacity-20 cursor-not-allowed",
      )}
      style={{ paddingLeft: `${depth * 12 + 18}px` }}
    >
      <span className="text-xs">{icon}</span>
      <span className="flex-1 truncate">{node.name}</span>
      {isOpened && !isLocked && (
        <div className="w-1.5 h-1.5 rounded-full bg-noir-amber" />
      )}
    </button>
  );
}

export default function FileTree({
  tree,
  activeFileId,
  openedFileIds,
  discoveredClues,
  onFileClick,
}: FileTreeProps) {
  return (
    <div className="h-full overflow-y-auto bg-black border-r border-white/20">
      <div className="px-4 h-10 flex items-center border-b border-white/20 bg-black">
        <p className="text-white text-[10px] font-mono tracking-widest uppercase">Explorer</p>
      </div>
      <div className="py-2">
          {tree.map((node) => (
            <TreeItem
              key={node.id}
              node={node}
              depth={0}
              activeFileId={activeFileId}
              openedFileIds={openedFileIds}
              discoveredClues={discoveredClues}
              onFileClick={onFileClick}
            />
          ))}
      </div>
    </div>
  );
}
