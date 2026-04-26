"use client";

interface StatusBarProps {
  activeFileId: string | null;
  discoveredClues: number;
  totalClues: number;
}

export default function StatusBar({ activeFileId, discoveredClues, totalClues }: StatusBarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-1 bg-black border-t border-white/20 h-6 flex-shrink-0 select-none">
      <div className="flex items-center gap-4">
         <span className="font-mono text-[9px] text-white uppercase tracking-widest">
           System Ready
         </span>
         <span className="text-white/40 text-[9px]">|</span>
         <span className="font-mono text-[9px] text-white uppercase">
           {activeFileId ? `Inspecting: ${activeFileId}` : "Waiting..."}
         </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="font-mono text-[9px] text-noir-amber uppercase tracking-widest">
             Evidence: {discoveredClues} / {totalClues}
          </div>
          <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
             <div 
               className="h-full bg-noir-amber transition-all duration-700 shadow-[0_0_5px_rgba(255,204,0,0.5)]" 
               style={{ width: `${(discoveredClues / totalClues) * 100}%` }}
             />
          </div>
        </div>
        <div className="font-mono text-[9px] text-white uppercase">
           NDiv_WKS_v2
        </div>
      </div>
    </div>
  );
}
