"use client";

import React, { useState } from "react";
import * as motion from "framer-motion/client";
import { AnimatePresence } from "framer-motion";

const STATEMENTS = [
  { id: 1, text: "Wibu", isTruth: true, color: "bg-red-500" },
  { id: 2, text: "Có một đứa em gái kém 20 tuổi (đẻ nó ra còn được luôn…)", isTruth: true, color: "bg-blue-500" },
  { id: 3, text: "Cấp 03 học lớp Chuyên Hàn THPT Chuyên Ngoại ngữ, nhưng ra trường 1 chữ tiếng Hàn bẻ đôi cũng không biết :’D", isTruth: true, color: "bg-green-500" },
  { id: 4, text: "Hay đi muộn cúp học khi lên đại học", isTruth: true, color: "bg-yellow-500" },
  { id: 5, text: "Chơi thể thao siêu dở (trừ bơi…)", isTruth: true, color: "bg-purple-500" },
  { id: 6, text: "Lười làm việc nhà", isTruth: true, color: "bg-cyan-500" }
];

export default function AmongUsGame() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [showEjection, setShowEjection] = useState(false);
  const [ejectedItem, setEjectedItem] = useState<typeof STATEMENTS[0] | null>(null);

  const handleVote = (item: typeof STATEMENTS[0]) => {
    if (revealed.includes(item.id)) return;
    
    setSelectedId(item.id);
    
    // Simulate voting delay
    setTimeout(() => {
      setEjectedItem(item);
      setShowEjection(true);
      
      // After ejection animation
      setTimeout(() => {
        setShowEjection(false);
        setRevealed(prev => [...prev, item.id]);
        setSelectedId(null);
      }, 3500);
    }, 1000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-12 bg-gray-900 rounded-[2rem] p-6 md:p-10 border-4 border-gray-700 relative overflow-hidden font-mono shadow-2xl">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-widest mb-2 drop-shadow-md">
          Who is the Impostor?
        </h3>
        <p className="text-gray-400 text-sm md:text-base">
          Trò chơi "3 Truths 3 Lies" nhưng... khoan đã, có thực sự là có lời nói dối nào không? Hãy thử vote xem sao!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STATEMENTS.map((item) => {
          const isRevealed = revealed.includes(item.id);
          const isSelected = selectedId === item.id;
          
          return (
            <motion.button
              key={item.id}
              whileHover={!isRevealed && !showEjection ? { scale: 1.02 } : {}}
              whileTap={!isRevealed && !showEjection ? { scale: 0.98 } : {}}
              onClick={() => handleVote(item)}
              disabled={isRevealed || showEjection}
              className={`
                relative p-4 rounded-xl border-4 text-left transition-all duration-300
                ${isRevealed 
                  ? item.isTruth 
                    ? "bg-green-900/30 border-green-500/50 grayscale-0" 
                    : "bg-red-900/30 border-red-500/50 grayscale-0"
                  : "bg-gray-800 border-gray-600 hover:border-gray-400 hover:bg-gray-750"
                }
                ${isSelected ? "ring-4 ring-white ring-opacity-50 border-white" : ""}
                ${isRevealed ? "cursor-default" : "cursor-pointer"}
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center ${isRevealed ? (item.isTruth ? 'bg-green-500' : 'bg-red-500') : item.color} shadow-inner border-2 border-white/20`}>
                  {/* Simple Among Us Character SVG */}
                  <svg viewBox="0 0 100 100" className="w-8 h-8 fill-white/80">
                    <path d="M 50 10 C 30 10 20 25 20 50 L 20 90 C 20 95 25 100 30 100 C 35 100 40 95 40 90 L 40 80 L 60 80 L 60 90 C 60 95 65 100 70 100 C 75 100 80 95 80 90 L 80 50 C 80 25 70 10 50 10 Z" />
                    <path d="M 45 25 C 35 25 25 35 25 45 C 25 55 35 65 50 65 C 65 65 75 55 75 45 C 75 35 65 25 45 25 Z" className="fill-blue-200" />
                    <rect x="5" y="40" width="15" height="30" rx="5" className="fill-white/80" />
                  </svg>
                </div>
                
                <div className="flex-grow">
                  <p className={`font-semibold leading-snug ${isRevealed ? (item.isTruth ? 'text-green-300' : 'text-red-300') : 'text-white'} text-sm md:text-[15px]`}>
                    {item.text}
                  </p>
                  {isRevealed && (
                    <span className={`text-xs uppercase font-black mt-2 inline-block px-2 py-1 rounded ${item.isTruth ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {item.isTruth ? "Crewmate (Truth)" : "Impostor (Lie)"}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Ejection Animation Overlay */}
      <AnimatePresence>
        {showEjection && ejectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black flex items-center justify-center overflow-hidden rounded-[2rem]"
          >
            {/* Star background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
            
            <motion.div
              initial={{ x: "-100vw", rotate: -180 }}
              animate={{ x: "100vw", rotate: 180 }}
              transition={{ duration: 3.5, ease: "linear" }}
              className={`w-24 h-24 absolute z-10`}
            >
              <div className={`w-full h-full rounded-2xl ${ejectedItem.color} flex items-center justify-center border-4 border-gray-900 shadow-xl`}>
                 <svg viewBox="0 0 100 100" className="w-16 h-16 fill-white">
                    <path d="M 50 10 C 30 10 20 25 20 50 L 20 90 C 20 95 25 100 30 100 C 35 100 40 95 40 90 L 40 80 L 60 80 L 60 90 C 60 95 65 100 70 100 C 75 100 80 95 80 90 L 80 50 C 80 25 70 10 50 10 Z" />
                    <path d="M 45 25 C 35 25 25 35 25 45 C 25 55 35 65 50 65 C 65 65 75 55 75 45 C 75 35 65 25 45 25 Z" className="fill-blue-200" />
                    <rect x="5" y="40" width="15" height="30" rx="5" className="fill-white" />
                  </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="z-20 text-center max-w-lg mx-auto"
            >
              <h2 className="text-xl md:text-2xl text-white font-mono tracking-widest leading-relaxed px-4">
                {ejectedItem.isTruth ? (
                   <>
                    <span className="text-green-400 font-bold text-2xl md:text-3xl">Crewmate</span><br/>
                    <span className="text-sm md:text-base text-gray-300 block mt-2">({ejectedItem.text}) was a TRUTH</span>
                   </>
                ) : (
                  <>
                    <span className="text-red-500 font-bold text-2xl md:text-3xl">Impostor</span><br/>
                    <span className="text-sm md:text-base text-gray-300 block mt-2">({ejectedItem.text}) was a LIE</span>
                   </>
                )}
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
