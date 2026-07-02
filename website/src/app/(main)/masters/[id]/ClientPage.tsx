"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BookOpen, ExternalLink, Lightbulb, GraduationCap } from "lucide-react";
import { masterOrganizations } from "@/data/mastersData";
import * as motion from "framer-motion/client";

export default function MasterDetailPageClient() {
  const params = useParams();
  const id = params.id as string;
  const org = masterOrganizations.find((o) => o.id === id);

  if (!org) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy thông tin tổ chức</h1>
        <Link href="/masters" className="text-accent hover:underline flex items-center gap-2">
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
            href="/masters" 
            className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-foreground/50 hover:text-accent transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            <span>Quay lại trang Masters</span>
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
            Inspirational Model
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-foreground">
            {org.name}
          </h1>
          
          <div className="flex justify-center mb-8">
            <a 
              href={org.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white px-6 py-2.5 rounded-full hover:scale-105 hover:bg-accent/90 transition-all text-sm font-bold shadow-sm"
            >
              <span>Ghé thăm {org.name}</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="relative aspect-[16/9] w-full max-w-3xl mx-auto rounded-3xl overflow-hidden border-thin border-border-custom shadow-sm">
            <img 
              src={org.image} 
              alt={org.name} 
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        {/* 2-Column Content Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
        >
          {/* Column Left: Triết lý giáo dục */}
          <motion.div 
            variants={itemVariants} 
            className="bg-card border-thin border-border-custom p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h2 className="text-2xl font-black tracking-tight mb-6 pb-4 border-b-thin border-border-custom text-foreground flex items-center gap-3">
              <GraduationCap size={22} className="text-accent" />
              Triết lý giáo dục
            </h2>
            
            <p className="text-foreground/90 leading-relaxed text-[15px] md:text-[16px] italic font-medium">
              "{org.philosophy}"
            </p>
          </motion.div>

          {/* Column Right: Điều tôi học được và áp dụng */}
          <motion.div 
            variants={itemVariants} 
            className="bg-card border-thin border-border-custom p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h2 className="text-2xl font-black tracking-tight mb-6 pb-4 border-b-thin border-border-custom text-foreground flex items-center gap-3">
              <Lightbulb size={22} className="text-accent" />
              Điều tôi học được và áp dụng
            </h2>

            <p className="text-foreground/80 leading-relaxed text-[15px] md:text-[16px]">
              {org.lessons}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
