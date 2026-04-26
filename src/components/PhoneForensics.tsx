"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageSquare, Camera, Calendar, X, Delete } from "lucide-react";
import clsx from "clsx";

interface PhoneForensicsProps {
  isOpen: boolean;
  onClose: () => void;
  correctPin?: string;
    pinHint?: string;
  onSuccess: () => void;
}

export default function PhoneForensics({ isOpen, onClose, correctPin = "4407", pinHint, onSuccess }: PhoneForensicsProps) {
  const [pin, setPin] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState("Messages");
  const [error, setError] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        setPin("");
        setError(false);
        setIsUnlocked(false);
        setActiveTab("Messages");
    }, [isOpen, correctPin]);

    const handleDelete = () => {
        if (pin.length === 0) return;
        setPin((prev) => prev.slice(0, -1));
        if (error) setError(false);
    };

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      if (nextPin.length === 4) {
        if (nextPin === correctPin) {
          setTimeout(() => setIsUnlocked(true), 500);
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
            setPin("");
          }, 600);
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div 
            initial={{ scale: 0.9, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 100 }}
            className="relative w-[360px] h-[640px] bg-[#111] border-[12px] border-[#222] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Cracked Screen Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none z-50 opacity-40"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 10% 20%, 40% 10%, 60% 30%, 30% 60%, 10% 50%, 0% 40%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "inset 0 0 50px rgba(255,255,255,0.05)"
              }}
            />
            {/* Additional Cracks */}
            <div className="absolute inset-0 pointer-events-none z-50 opacity-20">
                <div className="absolute top-1/4 left-0 w-full h-px bg-white/40 -rotate-12" />
                <div className="absolute top-1/2 left-1/4 w-px h-1/2 bg-white/40 rotate-45" />
            </div>

            {/* Content area */}
            <div className="flex-1 bg-black relative flex flex-col">
                {!isUnlocked ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8">
                        <div className="text-white/20 mb-8">
                            <Phone size={48} className="animate-pulse" />
                        </div>
                        <h4 className="text-white font-mono text-xs uppercase tracking-[0.4em] mb-12">System Locked</h4>
                        
                        <div className="flex gap-4 mb-16">
                            {[0,1,2,3].map(i => (
                                <div 
                                    key={i} 
                                    className={clsx(
                                        "w-3 h-3 rounded-full border border-white/20 transition-all",
                                        pin.length > i ? "bg-white" : "bg-transparent",
                                        error && "bg-noir-red border-noir-red"
                                    )} 
                                />
                            ))}
                        </div>

                                                <div className="grid grid-cols-3 gap-6">
                                                        {["1","2","3","4","5","6","7","8","9","","0","del"].map(num => (
                                <button
                                    key={num}
                                                                        onClick={() => {
                                                                            if (num === "") return;
                                                                            if (num === "del") {
                                                                                handleDelete();
                                                                                return;
                                                                            }
                                                                            handleKeyPress(num);
                                                                        }}
                                    className="w-14 h-14 rounded-full bg-white/5 text-white font-mono text-xl flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all outline-none"
                                >
                                                                        {num === "del" ? <Delete size={18} /> : num}
                                </button>
                            ))}
                        </div>
                                                {error && (
                                                    <p className="mt-4 text-[10px] font-mono text-noir-red uppercase tracking-wider">Incorrect PIN. Retry.</p>
                                                )}
                                                {pinHint && !isUnlocked && (
                                                    <p className="mt-2 text-[9px] font-mono text-noir-amber/80 uppercase tracking-wider text-center">
                                                        Hint: {pinHint}
                                                    </p>
                                                )}
                        <p className="mt-8 text-[9px] font-mono text-white/20 uppercase tracking-widest italic">Encrypted User_Data_Partition</p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="bg-[#111] p-4 pt-8 flex items-center justify-between border-b border-white/5">
                            <span className="text-white/40 font-mono text-[10px]">10:04 PM</span>
                            <div className="flex items-center">
                                <div className="flex gap-1.5 grayscale opacity-50">
                                    <div className="w-1.5 h-1.5 bg-noir-green rounded-full" />
                                    <div className="w-1.5 h-1.5 bg-noir-green rounded-full" />
                                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                                </div>
                                <button 
                                    onClick={onSuccess}
                                    className="bg-noir-amber text-black font-mono text-[8px] font-bold px-2 py-0.5 uppercase tracking-widest hover:bg-white transition-colors ml-4"
                                >
                                    Collect Forensic Data
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                           {activeTab === "Calls" && (
                               <div className="space-y-4">
                                   {[
                                       { name: "Victoria Voss", type: "Outgoing", time: "Yest, 11:22 PM" },
                                       { name: "Unknown", type: "Incoming", time: "Yest, 10:14 PM" },
                                       { name: "Ghost", type: "Missed", time: "Yest, 09:45 PM" },
                                   ].map((c, i) => (
                                       <div key={i} className="flex items-center justify-between p-3 border-b border-white/5">
                                           <div>
                                               <div className="text-white text-sm font-medium">{c.name}</div>
                                               <div className={clsx("text-[10px] font-mono", c.type === "Missed" ? "text-noir-red" : "text-white/40")}>{c.type}</div>
                                           </div>
                                           <div className="text-white/20 text-[10px]">{c.time}</div>
                                       </div>
                                   ))}
                               </div>
                           )}

                           {activeTab === "Messages" && (
                               <div className="space-y-6">
                                   <div className="space-y-2">
                                       <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest text-center">Ghost</div>
                                       <div className="bg-white/5 p-3 rounded-lg text-xs text-white/80 max-w-[80%]">Did you get the keys? We can't wait much longer.</div>
                                       <div className="bg-noir-amber/20 p-3 rounded-lg text-xs text-white/80 ml-auto max-w-[80%]">Almost there. Voss is distracted.</div>
                                       <div className="bg-white/5 p-3 rounded-lg text-xs text-white/80 max-w-[80%]">Remember your promise. If the wallet doesn't move, you don't neither.</div>
                                   </div>
                               </div>
                           )}

                           {activeTab === "Photos" && (
                               <div className="grid grid-cols-2 gap-2">
                                   {/* Daughter Illustration (CSS Drawn) */}
                                   <div className="aspect-square bg-[#222] relative overflow-hidden flex items-center justify-center">
                                       <div className="w-12 h-12 bg-[#444] rounded-full absolute top-1/4" />
                                       <div className="w-16 h-20 bg-[#333] rounded-[40%] absolute top-1/2" />
                                       <div className="absolute inset-0 bg-yellow-500/5" />
                                       <span className="absolute bottom-2 left-2 text-[8px] text-white/40 font-mono italic">Maya.jpg</span>
                                   </div>
                                   {/* Note Illustration */}
                                   <div className="aspect-square bg-[#f5f5f5] p-4 flex flex-col gap-2">
                                       <div className="w-full h-px bg-blue-300" />
                                       <div className="w-full h-px bg-blue-300" />
                                       <div className="w-3/4 h-px bg-blue-300" />
                                       <div className="text-black/60 font-mono text-[7px] rotate-2 mt-2">Dady, I love you. Happy B-day!</div>
                                   </div>
                               </div>
                           )}

                           {activeTab === "Calendar" && (
                               <div className="space-y-4">
                                   <div className="p-3 border-l-2 border-noir-amber bg-white/5">
                                       <div className="text-[10px] text-noir-amber font-mono uppercase font-bold">11:00 PM - Midnight</div>
                                       <div className="text-white text-xs mt-1">Final Sync @ The Server Room</div>
                                   </div>
                                   <div className="p-3 opacity-40">
                                       <div className="text-[10px] text-white/40 font-mono uppercase">09:00 AM - 10:00 AM</div>
                                       <div className="text-white/60 text-xs mt-1">School Drop-off</div>
                                   </div>
                               </div>
                           )}
                        </div>

                        {/* Footer Nav */}
                        <div className="bg-[#111] p-2 pb-6 grid grid-cols-4 border-t border-white/10">
                            {[
                                { id: "Calls", icon: Phone },
                                { id: "Messages", icon: MessageSquare },
                                { id: "Photos", icon: Camera },
                                { id: "Calendar", icon: Calendar },
                            ].map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setActiveTab(t.id)}
                                    className={clsx(
                                        "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                                        activeTab === t.id ? "text-noir-amber" : "text-white/20 hover:text-white/40"
                                    )}
                                >
                                    <t.icon size={20} />
                                    <span className="text-[8px] font-mono uppercase tracking-widest">{t.id}</span>
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Back Home Bar */}
            <div className="h-1 bg-white/20 w-1/3 mx-auto my-3 rounded-full absolute bottom-0 left-1/3 z-50 pointer-events-none" />
          </motion.div>
          
          <button 
            onClick={onClose} 
            className="absolute top-8 right-8 text-white/40 hover:text-white bg-white/10 p-2 rounded-full backdrop-blur-md"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </AnimatePresence>
  );
}
