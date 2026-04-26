"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import type * as Monaco from "monaco-editor";
import clsx from "clsx";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-[#000000]">
      <Loader2 size={16} className="animate-spin text-noir-amber" />
    </div>
  ),
});

interface MonacoWrapperProps {
  content: string;
  language: string;
  suspiciousPatterns?: Array<string | { pattern: string; reason: string }>;
  isTutorial?: boolean;
  onPin?: () => void;
}

export default function MonacoWrapper({
  content,
  language,
  suspiciousPatterns = [],
  isTutorial = false,
  onPin,
}: MonacoWrapperProps) {
  const [pinned, setPinned] = useState(false);
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof Monaco | null>(null);
  const decorationsRef = useRef<Monaco.editor.IEditorDecorationsCollection | null>(null);

  useEffect(() => {
    setPinned(false); // Reset on file change
    applyDecorations();
  }, [content]);

  function applyDecorations() {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;

    const model = editor.getModel();
    if (!model) return;

    if (decorationsRef.current) {
      decorationsRef.current.clear();
    }

    const newDecorations: Monaco.editor.IModelDeltaDecoration[] = [];

    suspiciousPatterns.forEach((entry) => {
      const pattern = typeof entry === "string" ? entry : entry.pattern;
      if (!pattern) return;
      try {
        const matches = model.findMatches(pattern, false, false, false, null, true);
        matches.forEach((match) => {
          const line = match.range.startLineNumber;
          
          if (isTutorial) {
            newDecorations.push({
              range: new monaco.Range(line, 1, line, 1),
              options: {
                isWholeLine: true,
                className: "tutorial-clue-line",
              },
            });
          }

          newDecorations.push({
            range: new monaco.Range(line, 1, line, 1),
            options: {
              isWholeLine: true,
              className: "hacker-suspicious-line",
            },
          });

          newDecorations.push({
            range: match.range,
            options: {
              inlineClassName: "hacker-inline-glow",
            },
          });
        });
      } catch {}
    });

    decorationsRef.current = editor.createDecorationsCollection(newDecorations);
  }

  return (
    <div className="h-full relative flex flex-col bg-black overflow-hidden group">
      {/* Editor Header / Tooling */}
      <div className="absolute top-4 right-8 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => {
                setPinned(true);
                onPin?.();
            }}
            disabled={pinned}
            className={clsx(
                "px-4 py-1.5 border font-mono text-[9px] uppercase tracking-widest transition-all",
                pinned 
                    ? "border-noir-green text-noir-green bg-noir-green/10" 
                    : "border-noir-amber/40 text-noir-amber hover:bg-noir-amber hover:text-black"
            )}
          >
            {pinned ? "✓ Pinned to Wall" : "Pin Evidence to Wall"}
          </button>
      </div>

      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={content}
          theme="noir-simple"
          options={{
            readOnly: true,
            fontSize: 15,
            lineHeight: 26,
            fontWeight: "600",
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            padding: { top: 20, bottom: 20 },
            lineNumbers: "on",
            renderLineHighlight: "all",
            scrollbar: {
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
          }}
          beforeMount={(monaco) => {
            monaco.editor.defineTheme("noir-simple", {
              base: "vs-dark",
              inherit: true,
              rules: [
                  { token: "comment", foreground: "aaaaaa", fontStyle: "italic" },
                  { token: "keyword", foreground: "ffcc00", fontStyle: "bold" },
                  { token: "string", foreground: "ffffff" },
                  { token: "number", foreground: "ff44ff" },
                  { token: "function", foreground: "00ffff", fontStyle: "bold" },
                  { token: "type", foreground: "00ccff" },
                  { token: "variable", foreground: "ffffff" },
                  { token: "operator", foreground: "ffcc00" },
              ],
              colors: {
                  "editor.background": "#000000",
                  "editor.foreground": "#ffffff",
                  "editorLineNumber.foreground": "#aaaaaa",
                  "editorLineNumber.activeForeground": "#ffcc00",
                  "editor.lineHighlightBackground": "#ffffff20",
                  "editorGutter.background": "#000000",
                  "editor.selectionBackground": "#ffcc0066",
              },
            });
          }}
          onMount={(editor, monaco) => {
            editorRef.current = editor;
            monacoRef.current = monaco;
            applyDecorations();
          }}
        />
      </div>
    </div>
  );
}
