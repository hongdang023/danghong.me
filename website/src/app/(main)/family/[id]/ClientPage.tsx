"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BookOpen, Heart, Quote, ImageIcon, Gamepad2, Music, Sparkles } from "lucide-react";
import { familyMembers } from "@/data/familyData";
import * as motion from "framer-motion/client";
import GalleryModal from "@/components/community/GalleryModal";

export default function FamilyMemberClientPage() {
  const params = useParams();
  const id = params.id as string;
  const member = familyMembers.find((m) => m.id === id);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy thành viên gia đình</h1>
        <Link href="/family" className="text-accent hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Quay lại trang gia đình
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
            href="/family" 
            className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-foreground/50 hover:text-accent transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            <span>Quay lại trang gia đình</span>
          </Link>
        </motion.div>

        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border-2 border-accent/20">
            <img 
              src={member.coverImage} 
              alt={member.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest bg-accent/5 text-accent px-4 py-1.5 rounded-full border border-accent/10 mb-4">
            {member.role}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-foreground">
            {member.name}
          </h1>
          <p className="text-md md:text-lg font-medium text-foreground/60 mb-6 max-w-xl">
            {member.job}
          </p>

          {member.images && member.images.length > 0 && (
            <button 
              onClick={() => setIsGalleryOpen(true)}
              className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300 text-sm font-bold tracking-wide"
            >
              <ImageIcon size={16} />
              <span>Xem album ảnh ({member.images.length})</span>
            </button>
          )}
        </motion.div>

        {/* 2-Column Content Grid */}
        {(() => {
          const hasLeftContent = (member.admirations && member.admirations.length > 0) || (member.storySections && member.storySections.length > 0);
          
          return (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Column Left (7 cols) */}
              <motion.div 
                variants={itemVariants} 
                className="lg:col-span-7 flex flex-col gap-8"
              >
                {/* Admirations Section */}
                {member.admirations && member.admirations.length > 0 && (
                  <div className="bg-card border-thin border-border-custom p-8 md:p-10 rounded-3xl shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-foreground pointer-events-none">
                      <Heart size={120} />
                    </div>

                    <h2 className="text-2xl font-black tracking-tight mb-6 pb-4 border-b-thin border-border-custom text-foreground flex items-center gap-3">
                      <Heart size={20} className="text-accent" />
                      Điều tôi ngưỡng mộ ở {member.role}
                    </h2>
                    
                    <ul className="space-y-4 text-foreground/90 leading-relaxed text-[15px] md:text-[16px] font-medium">
                      {member.admirations.map((item, idx) => (
                        <li key={idx} className="list-disc pl-2 ml-4">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Story Sections (Substack contents for Mother) */}
                {member.storySections && member.storySections.map((section, idx) => (
                  <div key={idx} className="bg-card border-thin border-border-custom p-8 md:p-10 rounded-3xl shadow-sm relative overflow-hidden">
                    <h3 className="text-xl font-bold tracking-tight mb-4 text-accent">
                      {section.title}
                    </h3>
                    <p className="text-foreground/80 leading-relaxed text-[15px] md:text-[16px] whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                ))}

                {/* Balance Layout: Lessons placed here if no other left content (Châu's case) */}
                {!hasLeftContent && member.lessons && member.lessons.length > 0 && (
                  <div className="bg-card border-thin border-border-custom p-8 md:p-10 rounded-3xl shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-foreground pointer-events-none">
                      <BookOpen size={120} />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight mb-6 pb-4 border-b-thin border-border-custom text-foreground flex items-center gap-3">
                      <BookOpen size={20} className="text-accent" />
                      Bài học tôi nhận được từ em
                    </h2>

                    <ul className="space-y-4">
                      {member.lessons.map((lesson, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-[15px] md:text-[16px] text-foreground/80 leading-relaxed">
                          <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 text-[11px] font-bold mt-0.5">
                            ✓
                          </span>
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>

              {/* Column Right (5 cols) */}
              <motion.div 
                variants={itemVariants} 
                className="lg:col-span-5 flex flex-col gap-6"
              >
                {/* Lessons Section (Render here ONLY if left column has content) */}
                {hasLeftContent && member.lessons && member.lessons.length > 0 && (
                  <div className="bg-card border-thin border-border-custom p-8 rounded-3xl shadow-sm">
                    <h2 className="text-2xl font-black tracking-tight mb-6 pb-4 border-b-thin border-border-custom text-foreground flex items-center gap-3">
                      <BookOpen size={20} className="text-accent" />
                      Bài học tôi nhận được
                    </h2>

                    <ul className="space-y-4">
                      {member.lessons.map((lesson, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-[14px] md:text-[15px] text-foreground/80 leading-relaxed">
                          <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 text-[11px] font-bold mt-0.5">
                            ✓
                          </span>
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Kitchen Quotes (Mẹ) */}
                {member.quotes && (
                  <div className="bg-secondary/40 border-thin border-accent/20 p-8 rounded-3xl relative overflow-hidden">
                    <h3 className="text-md font-bold text-accent mb-4 tracking-tight uppercase border-b border-accent/10 pb-2 flex items-center gap-2">
                      <Sparkles size={16} />
                      {member.quotesTitle}
                    </h3>
                    <div className="space-y-4">
                      {member.quotes.map((quote, idx) => (
                        <div key={idx} className="border-l-2 border-accent/40 pl-4 py-1 text-[13.5px] md:text-[14px] text-foreground/80 leading-relaxed font-semibold italic">
                          "{quote}"
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hobbies (Em gái) */}
                {member.hobbies && member.hobbies.length > 0 && (
                  <div className="bg-card border-thin border-border-custom p-8 rounded-3xl shadow-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
                      <Sparkles size={18} className="text-accent" />
                      Sở thích của em
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {member.hobbies.map((hobby, idx) => (
                        <span key={idx} className="bg-accent/5 border border-accent/10 text-accent text-xs font-bold px-3 py-1.5 rounded-full">
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Games & Artists (Em trai) */}
                {member.favoriteGames && (
                  <div className="bg-card border-thin border-border-custom p-8 rounded-3xl shadow-sm flex flex-col gap-4">
                    <div>
                      <h3 className="text-md font-bold text-foreground mb-3 flex items-center gap-2">
                        <Gamepad2 size={18} className="text-accent" />
                        Game yêu thích
                      </h3>
                      <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-1">
                        {member.favoriteGames.map((game, idx) => (
                          <li key={idx}>{game}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {member.favoriteArtists && (
                      <div className="border-t border-border-custom pt-4">
                        <h3 className="text-md font-bold text-foreground mb-3 flex items-center gap-2">
                          <Music size={18} className="text-accent" />
                          Nghệ sĩ yêu thích
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {member.favoriteArtists.map((artist, idx) => (
                            <span key={idx} className="bg-foreground/5 text-foreground text-xs font-semibold px-3 py-1 rounded-md">
                              {artist}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })()}
      </div>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <GalleryModal 
          community={{
            id: member.name,
            name: member.name,
            stats: member.role,
            description: "",
            cover_image: member.images[0],
            images: member.images
          }} 
          isOpen={isGalleryOpen} 
          onClose={() => setIsGalleryOpen(false)} 
        />
      )}
    </div>
  );
}
