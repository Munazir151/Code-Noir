"use client";

export default function HUDOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* Corner Brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-noir-amber/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-noir-amber/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-noir-amber/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-noir-amber/30" />

      {/* Screen Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] opacity-50" />

      {/* Scanline pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 4px, 4px 100%'
        }}
      />

      {/* Scanning Bar */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="w-full h-[1px] bg-noir-amber/20 shadow-[0_0_15px_rgba(255,204,0,0.5)] absolute top-0 animate-scan-y" />
      </div>

      {/* Top HUD text */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-10 opacity-30">
        <div className="font-mono text-[8px] tracking-[0.4em] uppercase text-noir-amber">Rec: 00:00:14:02</div>
        <div className="font-mono text-[8px] tracking-[0.4em] uppercase text-noir-amber animate-pulse">Scanning: ACTIVE</div>
        <div className="font-mono text-[8px] tracking-[0.4em] uppercase text-noir-amber">Crt: P-04</div>
      </div>

      {/* Bottom Left Investigation Logs */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-1 opacity-40">
        <div className="font-mono text-[9px] text-noir-amber uppercase tracking-wider animate-pulse">{">>>"} INITIALIZING FORENSIC SUITE...</div>
        <div className="font-mono text-[8px] text-white/50 uppercase tracking-tighter">{">>>"} FETCHING CLUES FROM DB_77... [OK]</div>
        <div className="font-mono text-[8px] text-white/50 uppercase tracking-tighter">{">>>"} ANALYZING SUSPECT ENTROPY... [DONE]</div>
        <div className="font-mono text-[8px] text-white/40 uppercase tracking-tighter">{">>>"} WAITING FOR DETECTIVE INPUT...</div>
      </div>
    </div>
  );
}
