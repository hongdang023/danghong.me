import PageNavigation from "@/components/PageNavigation";
"use client";

import React from "react";
import * as motion from "framer-motion/client";
import Link from "next/link";
import { ArrowRight, ExternalLink, Heart, Briefcase, Lightbulb, Compass, Sparkles, User } from "lucide-react";
import { masterOrganizations } from "@/data/mastersData";
import { lifeMentors } from "@/data/lifeMentorsData";

const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "Heart": return <Heart className={className} size={24} />;
    case "Briefcase": return <Briefcase className={className} size={24} />;
    case "Lightbulb": return <Lightbulb className={className} size={24} />;
    case "Compass": return <Compass className={className} size={24} />;
    case "Sparkles": return <Sparkles className={className} size={24} />;
    case "User": return <User className={className} size={24} />;
    default: return <User className={className} size={24} />;
  }
};

export default function MastersClientPage() {
  const [activeTab, setActiveTab] = React.useState<string>("organizations");
  const lastUrlRef = React.useRef("");

  React.useEffect(() => {
    const handleHashCheck = () => {
      const currentUrl = window.location.href;
      if (currentUrl === lastUrlRef.current) return;
      lastUrlRef.current = currentUrl;

      const hashSegments = window.location.hash.split("#").filter(Boolean);
      const hash = hashSegments.length > 0 ? hashSegments[hashSegments.length - 1] : "";
      if (["life-mentors", "organizations"].includes(hash)) {
        setActiveTab(hash);
      } else {
        setActiveTab("organizations");
      }
    };

    handleHashCheck();
    window.addEventListener("hashchange", handleHashCheck);
    window.addEventListener("popstate", handleHashCheck);

    const interval = setInterval(handleHashCheck, 150);

    return () => {
      window.removeEventListener("hashchange", handleHashCheck);
      window.removeEventListener("popstate", handleHashCheck);
      clearInterval(interval);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Organizations View */}
      {activeTab === "organizations" && (
        <motion.div
          key="organizations"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Header */}
          <section className="pt-12 pb-8 px-6 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
                  <span className="text-accent block uppercase">MASTERS</span>
                  <span className="text-foreground text-xl md:text-2xl block mt-3 opacity-80">
                    Các tổ chức truyền cảm hứng giáo dục
                  </span>
                </h1>
                <p className="text-lg md:text-xl font-medium opacity-40 max-w-2xl mx-auto leading-relaxed">
                  Những hình mẫu tiên phong định hình triết lý giáo dục và phương pháp sư phạm hiện đại mà tôi ngưỡng mộ và học hỏi.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Grid of Masters */}
          <section className="px-6 py-8">
            <div className="max-w-5xl mx-auto">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {masterOrganizations.map((org) => (
                  <motion.div 
                    key={org.id} 
                    variants={itemVariants}
                    className="group relative bg-card border-thin border-border-custom hover:border-accent/30 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col h-full"
                  >
                    {/* Image Showcase */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden border-b-thin border-border-custom bg-secondary/50">
                      <img 
                        src={org.image} 
                        alt={org.name}
                        className="object-cover w-full h-full group-hover:scale-102 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <a 
                          href={org.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-xs font-bold flex items-center gap-1 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm z-20 hover:bg-black/80 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Ghé thăm website</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-xl font-extrabold mb-3 tracking-tight group-hover:text-accent transition-colors duration-300">
                        {org.name}
                      </h3>
                      
                      <p className="text-[14px] text-foreground/75 leading-relaxed mb-6 flex-grow line-clamp-3">
                        {org.philosophy}
                      </p>
                      
                      <div className="mt-auto pt-4 border-t-thin border-border-custom flex items-center justify-between">
                        <Link href={`/masters/${org.id}`} className="absolute inset-0 z-10" />
                        <span className="text-[13px] font-bold text-accent flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                          <span>Xem triết lý & bài học</span>
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </motion.div>
      )}

      {/* Life Mentors View */}
      {activeTab === "life-mentors" && (
        <motion.div
          key="life-mentors"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Header */}
          <section className="pt-12 pb-8 px-6 relative overflow-hidden text-center">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
                  <span className="text-accent block uppercase">LIFE MENTORS</span>
                  <span className="text-foreground text-xl md:text-2xl block mt-3 opacity-80">
                    Những Người Thầy Định Hình Phong Cách Sống
                  </span>
                </h1>
                <p className="text-lg md:text-xl font-medium opacity-40 max-w-2xl mx-auto leading-relaxed">
                  Họ không tự nhận là mentors của tôi, nhưng tôi coi họ là những người thầy lớn, những người đồng hành giúp tôi định hình phong cách sống, tư duy và con đường phát triển.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Grid of Life Mentors */}
          <section className="px-6 py-8">
            <div className="max-w-5xl mx-auto">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {lifeMentors.map((mentor) => (
                  <motion.div 
                    key={mentor.id} 
                    variants={itemVariants}
                    className="group relative bg-card border-thin border-border-custom hover:border-accent/30 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
                  >
                    <Link href={`/life-mentors/${mentor.id}`} className="absolute inset-0 z-10" />
                    
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-6 text-foreground group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      <IconComponent name={mentor.iconName} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    
                    <h3 className="text-xl font-extrabold mb-2 tracking-tight group-hover:text-accent transition-colors duration-300">
                      {mentor.name}
                    </h3>
                    
                    <span className="text-[12px] font-bold uppercase tracking-wider text-foreground/40 mb-4 bg-secondary px-3 py-1 rounded-full">
                      {mentor.badge}
                    </span>
                    
                    <p className="text-[14px] text-foreground/70 leading-relaxed mb-6 flex-grow">
                      {mentor.summary}
                    </p>
                    
                    <div className="text-[13px] font-bold text-accent flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                      <span>Xem chi tiết</span>
                      <ArrowRight size={14} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </motion.div>
      )}
      <PageNavigation prev={{ title: "About", href: "/about" }} next={{ title: "Products", href: "/products-hub" }} />
</div>
  );
}

