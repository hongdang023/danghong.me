"use client";

import React from "react";
import { Lock, CheckCircle2, ChevronRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SubSection {
  id: string;
  title: string;
  description: string;
}

interface ChapterCardProps {
  chapterNumber: number;
  title: string;
  subtitle: string;
  sections: SubSection[];
  isLocked: boolean;
  isCompleted: boolean;
  onOpen: () => void;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapterNumber,
  title,
  subtitle,
  sections,
  isLocked,
  isCompleted,
  onOpen,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative bg-background border-thin rounded-3xl overflow-hidden transition-all duration-500 ${
        isLocked 
          ? "opacity-50 grayscale border-border-custom cursor-not-allowed" 
          : "border-border-custom hover:border-accent/30 shadow-sm cursor-pointer"
      }`}
      onClick={() => !isLocked && setIsExpanded(!isExpanded)}
    >
      {/* Header Info */}
      <div className="p-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-secondary text-[10px] font-bold uppercase tracking-widest rounded-md">
              Chapter {chapterNumber}
            </span>
            {isCompleted && (
              <span className="flex items-center space-x-1 text-green-600 text-[10px] font-bold uppercase tracking-widest">
                <CheckCircle2 size={12} />
                <span>Hoàn thành</span>
              </span>
            )}
          </div>
          
          {/* Progress Status Icon */}
          {!isLocked && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="p-2 rounded-full bg-secondary/50"
            >
              <ChevronRight size={16} className="transform rotate-90" />
            </motion.div>
          )}
        </div>

        <h3 className="text-3xl font-black tracking-tight mb-3">{title}</h3>
        <p className="text-sm opacity-50 font-medium mb-0">{subtitle}</p>

        {/* Structured List / Outline - Animated Toggle */}
        <AnimatePresence>
          {isExpanded && !isLocked && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 32 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3">
                {sections.map((section, idx) => (
                  <div 
                    key={section.id} 
                    className="flex items-start space-x-4 p-5 rounded-2xl bg-secondary/40 border border-border-custom/50"
                  >
                    <span className="text-[10px] font-mono font-bold opacity-30 mt-1">
                      {chapterNumber}.{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold tracking-tight mb-1">{section.title}</h4>
                      <p className="text-[12px] opacity-50 leading-relaxed">{section.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions inside toggle */}
              <div className="flex items-center pt-8 mt-4 border-t-thin border-border-custom">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                  }}
                  className="flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest text-foreground hover:text-accent transition-all group"
                >
                  <div className="p-2 rounded-full bg-foreground text-background group-hover:bg-accent transition-colors">
                    <Play size={12} fill="currentColor" />
                  </div>
                  <span>Học ngay</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lock Indicator Overlay */}
      {isLocked && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="p-4 bg-background/80 backdrop-blur-md rounded-full border border-border-custom shadow-xl">
            <Lock size={20} className="text-foreground/40" />
          </div>
        </div>
      )}
    </motion.div>
  );
};
