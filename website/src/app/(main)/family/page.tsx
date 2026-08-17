"use client";
import PageNavigation from "@/components/PageNavigation";

import React from "react";
import * as motion from "framer-motion/client";
import { familyMembers, familyStories } from "@/data/familyData";
import Link from "next/link";
import MarioKartQuiz from "@/components/family/MarioKartQuiz";

export default function FamilyPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="pt-10 md:pt-12 pb-6 md:pb-8 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
              <span className="text-accent block uppercase">My Family.</span>
              <span className="text-foreground text-xl md:text-2xl block mt-3 opacity-80">
                Những Người Tôi Yêu Thương
              </span>
            </h1>
            <p className="text-lg md:text-xl font-medium opacity-40 max-w-2xl mx-auto leading-relaxed">
              Dù có đi bao xa, đạt được bao nhiêu thành tựu, gia đình vẫn luôn là nơi để trở về.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Graduation Family Photo Showcase */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card border-thin border-border-custom rounded-3xl overflow-hidden shadow-lg p-4 md:p-6"
        >
          <div className="relative aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 bg-secondary/50">
            <img 
              src="/images/family/graduation.jpg" 
              alt="Lễ trao bằng tốt nghiệp NEU - Ngày 05/08/2026"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-2 md:px-4 text-center md:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-thin border-border-custom pb-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
                Kỷ niệm đặc biệt • 05/08/2026
              </span>
              <span className="text-xs text-foreground/50 font-medium">
                Đại học Kinh tế Quốc dân (NEU - AEP)
              </span>
            </div>

            <p className="text-foreground/90 leading-relaxed text-sm md:text-base italic font-medium pt-2">
              "Tôi chưa từng biết mình may mắn đến thế nào cho đến ngày hôm nay. Nhìn xung quanh, tôi là một trong số ít người hiếm hoi có đủ cả 3 thế hệ cùng sum vầy bên nhau 🥺🥺🥺 Điều này vượt qua mọi ước mơ lớn nhất trong đời tôi omgggg!
            </p>

            <p className="text-foreground/80 leading-relaxed text-sm md:text-base font-medium">
              Cảm ơn ông bà, bố mẹ, anh trai và em gái nhỏ của tôi. Đặc biệt gửi lời cảm ơn đến Gemini (vì đã giúp bà ngoại đoàn tụ cùng tôi trong bức ảnh này từ thiên đường 😇)"
            </p>
          </div>
        </motion.div>
      </section>

      {/* Members Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {familyMembers.map((member) => (
            <Link 
              key={member.id} 
              href={`/family/${member.id}`}
              className="group flex flex-col bg-border-custom/5 border-thin border-border-custom rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img 
                  src={member.coverImage} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="font-bold text-2xl tracking-tight text-white mb-1">{member.name}</h3>
                  <p className="text-accent font-medium">{member.role}</p>
                </div>
              </div>
              
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-2">Nghề nghiệp / Mô tả</h4>
                  <p className="text-foreground/80 text-sm leading-relaxed">{member.job}</p>
                </div>
                <span className="text-accent text-[13px] font-bold uppercase tracking-tight mt-6 group-hover:underline flex items-center gap-1">
                  Xem chi tiết &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Stories Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-border-custom/5 border-thin border-border-custom rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-bold tracking-tight mb-8 text-accent">Góc Nhỏ Gia Đình</h3>
          
          <div className="mb-10">
            <h4 className="text-lg font-bold mb-4">Câu chuyện tình yêu của bố mẹ tôi</h4>
            <div className="space-y-4 text-foreground/80 leading-relaxed italic border-l-2 border-accent pl-4">
              {familyStories.loveStory.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">02 điều nhà tôi luôn làm cùng nhau</h4>
            <ul className="space-y-4 text-foreground/80">
              {familyStories.habits.map((habit, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-black text-accent text-xl">{i + 1}.</span>
                  <span className="leading-relaxed pt-1">{habit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <MarioKartQuiz />
      </section>
      <PageNavigation prev={{ title: "Community", href: "/community" }}  />
</div>
  );
}
