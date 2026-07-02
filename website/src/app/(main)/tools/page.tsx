"use client";

import React from "react";
import * as motion from "framer-motion/client";
import { 
  Sparkles, 
  BrainCircuit, 
  BookOpen, 
  Code2, 
  Cloud, 
  Database, 
  Presentation, 
  Search, 
  Palette, 
  StickyNote, 
  MessageSquare,
  Wrench,
  Cpu
} from "lucide-react";
import { toolsCategoriesData, toolsPhilosophy } from "@/data/toolsData";

const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "Sparkles":
      return <Sparkles className={className} size={24} />;
    case "BrainCircuit":
      return <BrainCircuit className={className} size={24} />;
    case "BookOpen":
      return <BookOpen className={className} size={24} />;
    case "Code2":
      return <Code2 className={className} size={24} />;
    case "Cloud":
      return <Cloud className={className} size={24} />;
    case "Database":
      return <Database className={className} size={24} />;
    case "Presentation":
      return <Presentation className={className} size={24} />;
    case "Search":
      return <Search className={className} size={24} />;
    case "Palette":
      return <Palette className={className} size={24} />;
    case "StickyNote":
      return <StickyNote className={className} size={24} />;
    case "MessageSquare":
      return <MessageSquare className={className} size={24} />;
    default:
      return <Wrench className={className} size={24} />;
  }
};

export default function ToolsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Header */}
      <section className="pt-10 md:pt-12 pb-6 md:pb-8 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
              <span className="text-accent block uppercase">MY STACK / TOOLS</span>
              <span className="text-foreground text-xl md:text-2xl block mt-3 opacity-80">
                Công cụ tối ưu hiệu suất & Kiến tạo sản phẩm
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-6 mb-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-card border-thin border-accent/20 p-8 md:p-10 rounded-3xl shadow-sm relative overflow-hidden group hover:border-accent/40 transition-colors duration-300"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-accent pointer-events-none group-hover:scale-110 transition-transform duration-500">
              <Cpu size={120} />
            </div>
            <div className="relative z-10 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-accent/70 bg-accent/10 px-3 py-1 rounded-full">
                Triết lý công cụ
              </span>
              <blockquote className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground/95 italic leading-tight">
                “{toolsPhilosophy.quote}”
              </blockquote>
              <p className="text-[15px] text-foreground/70 leading-relaxed max-w-2xl font-medium">
                {toolsPhilosophy.context}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-6">
        <div className="max-w-5xl mx-auto space-y-20">
          {toolsCategoriesData.map((category, catIdx) => (
            <div key={catIdx} className="space-y-8">
              <div className="border-b border-border-custom pb-4">
                <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-foreground flex items-center gap-3">
                  <span className="w-2.5 h-6 rounded-full bg-accent" />
                  {category.title}
                </h2>
                <p className="text-sm text-foreground/50 mt-1">{category.subtitle}</p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={
                  catIdx === 0 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
                }
              >
                {category.tools.map((tool, toolIdx) => (
                  <motion.div
                    key={toolIdx}
                    variants={itemVariants}
                    className={`group relative rounded-3xl border-thin border-border-custom bg-card hover:bg-accent/[0.02] hover:border-accent/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col items-center text-center justify-between ${
                      catIdx === 0 ? "p-6 md:p-8" : "p-5"
                    }`}
                  >
                    <div className="flex flex-col items-center w-full">
                      <div className={`rounded-full bg-secondary flex items-center justify-center text-accent mb-5 group-hover:bg-accent group-hover:text-white transition-all duration-300 mx-auto ${
                        catIdx === 0 ? "w-14 h-14" : "w-11 h-11"
                      }`}>
                        <IconComponent 
                          name={tool.iconName} 
                          className="transition-transform duration-300 group-hover:scale-110" 
                        />
                      </div>
                      
                      <h3 className={`font-extrabold tracking-tight group-hover:text-accent transition-colors duration-300 text-center ${
                        catIdx === 0 ? "text-xl mb-1" : "text-[16px] mb-0.5"
                      }`}>
                        {tool.name}
                      </h3>

                      {tool.tagline && (
                        <span className="text-[11px] font-medium tracking-wider text-foreground/45 uppercase text-center block mb-4">
                          {tool.tagline}
                        </span>
                      )}

                      <p className={`text-foreground/60 leading-relaxed text-center ${
                        catIdx === 0 ? "text-[13px] px-2" : "text-[11.5px] opacity-90 px-1"
                      }`}>
                        {tool.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
