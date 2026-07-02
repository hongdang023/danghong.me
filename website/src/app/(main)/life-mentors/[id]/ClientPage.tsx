"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BookOpen, Heart, Quote } from "lucide-react";
import { lifeMentors } from "@/data/lifeMentorsData";
import * as motion from "framer-motion/client";

export default function LifeMentorClientPage() {
  const params = useParams();
  const id = params.id as string;
  const mentor = lifeMentors.find((m) => m.id === id);

  if (!mentor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy Life Mentor</h1>
        <Link href="/life-mentors" className="text-accent hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Quay lại danh sách
        </Link>
      </div>
    );
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <div className="min-h-screen pb-20 pt-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link 
            href="/life-mentors" 
            className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-foreground/50 hover:text-accent transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            <span>Quay lại trang Life Mentors</span>
          </Link>
        </motion.div>

        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest bg-accent/5 text-accent px-4 py-1.5 rounded-full border border-accent/10 mb-6">
            {mentor.badge}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-foreground">
            {mentor.name}
          </h1>
          <p className="text-md md:text-lg font-bold text-accent mb-6">
            {mentor.subtitle}
          </p>
          <p className="text-[15px] md:text-[16px] text-foreground/60 max-w-2xl mx-auto leading-relaxed italic">
            "{mentor.summary}"
          </p>
        </motion.div>

        {/* 2-Column Content Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Column Left: Câu chuyện của tôi (7 cols) */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-7 bg-card border-thin border-border-custom p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-foreground pointer-events-none">
              <Quote size={120} />
            </div>

            <h2 className="text-2xl font-black tracking-tight mb-6 pb-4 border-b-thin border-border-custom text-foreground flex items-center gap-3">
              <Heart size={20} className="text-accent" />
              Câu chuyện của tôi
            </h2>
            
            <p className="text-foreground/95 leading-relaxed text-[15px] md:text-[16px] whitespace-pre-line font-medium">
              {mentor.story}
            </p>
          </motion.div>

          {/* Column Right: Bài học chiêm nghiệm (5 cols) */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="bg-card border-thin border-border-custom p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-black tracking-tight mb-6 pb-4 border-b-thin border-border-custom text-foreground flex items-center gap-3">
                <BookOpen size={20} className="text-accent" />
                Bài học chiêm nghiệm
              </h2>

              <ul className="space-y-4">
                {mentor.lessons.map((lesson, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[14px] md:text-[15px] text-foreground/80 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 text-[11px] font-bold mt-0.5">
                      ✓
                    </span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cooking Quotes for Mother */}
            {mentor.quotes && (
              <motion.div 
                variants={itemVariants}
                className="bg-secondary/40 border-thin border-accent/20 p-8 rounded-3xl relative overflow-hidden"
              >
                <h3 className="text-md font-bold text-accent mb-4 tracking-tight uppercase border-b border-accent/10 pb-2">
                  {mentor.quotesTitle}
                </h3>
                <div className="space-y-4">
                  {mentor.quotes.map((quote, idx) => (
                    <div key={idx} className="border-l-2 border-accent/40 pl-4 py-1 text-[13.5px] md:text-[14px] text-foreground/80 leading-relaxed font-semibold italic">
                      "{quote}"
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
