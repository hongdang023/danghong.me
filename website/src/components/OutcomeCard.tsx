"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface OutcomeCardProps {
  title: string;
  description: string;
  image: string;
  tags?: string[];
  onClick: () => void;
}

export const OutcomeCard: React.FC<OutcomeCardProps> = ({
  title,
  description,
  image,
  tags,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="group relative flex flex-col bg-background border-thin border-border-custom rounded-xl overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Product Image - Real Image First */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Technical Tags */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-bold tracking-widest uppercase text-white/90 rounded-full shadow-lg"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-extrabold tracking-tight mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-sm opacity-70 mb-6 line-clamp-2 leading-relaxed">
          {description}
        </p>
        
        <div className="mt-auto flex justify-between items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="flex items-center space-x-2 text-[12px] font-bold tracking-tight uppercase border-b-thin border-transparent hover:border-accent transition-all hover:text-accent"
          >
            <span>Xem thêm</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
