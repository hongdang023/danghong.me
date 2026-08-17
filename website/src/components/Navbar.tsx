"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Globe, 
  Bot, 
  Newspaper, 
  BookOpen, 
  Wrench, 
  Users, 
  Heart, 
  GraduationCap, 
  Compass, 
  CheckCircle2, 
  Trophy,
  Sparkles,
  ArrowRight,
  ExternalLink
} from "lucide-react";

interface SubItem {
  title: string;
  desc?: string;
  href: string;
  icon?: React.ReactNode;
  isExternal?: boolean;
}

interface MegaCategory {
  id: string;
  label: string;
  href: string;
  sections: {
    title: string;
    items: SubItem[];
  }[];
  featured?: {
    title: string;
    desc: string;
    href: string;
    tag?: string;
    isExternal?: boolean;
  };
}

const MEGA_MENU_DATA: MegaCategory[] = [
  {
    id: "about",
    label: "About",
    href: "/about",
    sections: [
      {
        title: "Bản sắc & Triết lý",
        items: [
          { title: "My Journey", desc: "Tuyên ngôn bản sắc & Hành trình giáo dục", href: "/about#journey", icon: <Compass size={16} /> },
          { title: "Core Beliefs", desc: "5 Niềm tin cốt lõi trong xây dựng hệ thống", href: "/about#beliefs", icon: <Sparkles size={16} /> },
          { title: "Education", desc: "Quá trình học tập & thành tích chuyên môn", href: "/about#education", icon: <GraduationCap size={16} /> }
        ]
      },
      {
        title: "Sở thích",
        items: [
          { title: "Hobbies", desc: "Vẽ nghệ thuật, Viết lách & Trải nghiệm Phim", href: "/about#hobbies", icon: <Heart size={16} /> }
        ]
      }
    ],
    featured: {
      title: "Who is the Impostor?",
      desc: "Trò chơi tương tác 3 Truths 3 Lies trên trang About.",
      href: "/about#game",
      tag: "Interactive Game"
    }
  },
  {
    id: "masters",
    label: "Masters",
    href: "/masters",
    sections: [
      {
        title: "Tổ chức ảnh hưởng",
        items: [
          { title: "Organizations", desc: "IB, Harvard PZ, Building21, Coursera, Brilliant", href: "/masters#organizations", icon: <GraduationCap size={16} /> }
        ]
      },
      {
        title: "Người dẫn đường",
        items: [
          { title: "Life Mentors", desc: "Mẹ Phạm Thị Tuyết Lê, Anh Đắc, Anh Quang & Bạn bè", href: "/masters#life-mentors", icon: <Users size={16} /> }
        ]
      }
    ],
    featured: {
      title: "International Baccalaureate (IB)",
      desc: "Triết lý giáo dục khai phóng & Hồ sơ 10 phẩm chất người học.",
      href: "/masters/ib",
      tag: "Featured Master"
    }
  },
  {
    id: "products",
    label: "Products",
    href: "/products-hub",
    sections: [
      {
        title: "Sản phẩm & Giải pháp",
        items: [
          { title: "AI Websites", desc: "Các ứng dụng Web Applications & Live Demos", href: "/products-hub?cat=ai-websites", icon: <Globe size={16} /> },
          { title: "AI Assistants", desc: "Gemini Gems & Trợ lý AI cá nhân hóa", href: "/products-hub?cat=gems", icon: <Bot size={16} /> },
          { title: "Newsletter", desc: "Bài viết chuyên sâu trên Substack", href: "https://harureboot.substack.com/", icon: <Newspaper size={16} />, isExternal: true },
          { title: "Books", desc: "Tủ sách tuyển chọn & Interactive Reader", href: "/books", icon: <BookOpen size={16} /> },
          { title: "Tools", desc: "Modern Tech & Productivity Stack", href: "/tools", icon: <Wrench size={16} /> }
        ]
      }
    ],
    featured: {
      title: "LightMS & Pregrad Showcase",
      desc: "Trải nghiệm các sản phẩm AI Websites mới nhất của Hồng.",
      href: "/products-hub",
      tag: "Live Apps"
    }
  },
  {
    id: "list",
    label: "Hồng's List",
    href: "/list",
    sections: [
      {
        title: "Giám tuyển tri thức",
        items: [
          { title: "4D Criteria", desc: "Thang điểm 4D: Depth, Design, Doer, Deliverable", href: "/list#criteria", icon: <CheckCircle2 size={16} /> },
          { title: "Hồng's List", desc: "Danh sách khóa học đã qua bộ lọc khắt khe", href: "/list/collection", icon: <Trophy size={16} /> }
        ]
      }
    ],
    featured: {
      title: "Selection over Collection",
      desc: "Chỉ tuyển chọn những khóa học thực sự tạo ra đột phá.",
      href: "/list",
      tag: "Curation Logic"
    }
  },
  {
    id: "safezone",
    label: "Safe Zone",
    href: "/community",
    sections: [
      {
        title: "Cộng đồng & Người thương",
        items: [
          { title: "Community", desc: "Khoảnh khắc đời sống, Bè bạn & Mạng lưới", href: "/community", icon: <Users size={16} /> },
          { title: "Family", desc: "Những người tôi yêu thương & Ảnh 3 thế hệ", href: "/family", icon: <Heart size={16} /> }
        ]
      }
    ],
    featured: {
      title: "Lễ Tốt Nghiệp 3 Thế Hệ",
      desc: "Khoảnh khắc thiêng liêng và sum vầy của gia đình Hồng.",
      href: "/family",
      tag: "Special Memory"
    }
  }
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeCategory = MEGA_MENU_DATA.find((item) => item.id === activeTab);

  return (
    <header 
      className="sticky top-0 z-50 bg-background border-b-thin border-border-custom"
      onMouseLeave={() => setActiveTab(null)}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-xl font-black tracking-tighter hover:text-accent transition-colors"
          onClick={() => setActiveTab(null)}
        >
          HỒNG ĐẶNG
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {MEGA_MENU_DATA.map((cat) => {
            const isHovered = activeTab === cat.id;
            return (
              <div 
                key={cat.id} 
                className="relative py-6"
                onMouseEnter={() => setActiveTab(cat.id)}
              >
                <Link
                  href={cat.href}
                  className={`px-4 py-2 rounded-full text-[13px] font-bold tracking-tight uppercase transition-all duration-200 flex items-center gap-1 ${
                    isHovered 
                      ? "text-accent bg-accent/10" 
                      : "text-foreground/75 hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <span>{cat.label}</span>
                  <ChevronDown 
                    size={13} 
                    className={`transition-transform duration-200 ${isHovered ? "rotate-180 text-accent" : "opacity-40"}`} 
                  />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Right CTA */}
        <div className="flex items-center space-x-3">
          <a
            href="https://harureboot.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-2 text-[13px] font-bold tracking-tight uppercase border-thin border-border-custom px-5 py-2.5 rounded-full hover:scale-105 hover:bg-secondary/40 transition-all shadow-sm text-foreground/80 hover:text-foreground"
          >
            <span>Newsletter</span>
          </a>

          <a
            href="https://www.facebook.com/danghong.harunoyuki"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-2 text-[13px] font-bold tracking-tight uppercase bg-accent text-white px-5 py-2.5 rounded-full hover:scale-105 hover:bg-accent/90 transition-all shadow-sm"
          >
            <span>Chat với Hồng</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-foreground/80 hover:bg-secondary"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Apple-style 2-Column Mega Dropdown Panel */}
      {activeCategory && (
        <div 
          className="hidden md:block absolute top-full left-0 w-full bg-card border-b-thin border-border-custom shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-2"
          onMouseEnter={() => setActiveTab(activeCategory.id)}
          onMouseLeave={() => setActiveTab(null)}
        >
          <div className="max-w-5xl mx-auto px-8 py-6 grid grid-cols-12 gap-8 items-center">
            {/* Column 1: NavItems List (Only Titles & Icons, No Subtitles) */}
            <div className="col-span-7 border-r-thin border-border-custom/50 pr-8">
              <div className="space-y-1">
                {activeCategory.sections.flatMap((s) => s.items).map((item, itemIdx) => (
                  <div key={itemIdx}>
                    {item.isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-secondary/60 transition-colors"
                        onClick={() => setActiveTab(null)}
                      >
                        {item.icon && (
                          <div className="text-foreground/60 group-hover:text-accent transition-colors">
                            {item.icon}
                          </div>
                        )}
                        <span className="text-sm font-bold text-foreground group-hover:text-accent transition-colors flex items-center gap-1.5">
                          {item.title}
                          <ExternalLink size={12} className="opacity-40" />
                        </span>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="group flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-secondary/60 transition-colors"
                        onClick={() => setActiveTab(null)}
                      >
                        {item.icon && (
                          <div className="text-foreground/60 group-hover:text-accent transition-colors">
                            {item.icon}
                          </div>
                        )}
                        <span className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                          {item.title}
                        </span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Right Featured Column */}
            {activeCategory.featured && (
              <div className="col-span-5 flex flex-col justify-between pl-2">
                <div>
                  {activeCategory.featured.tag && (
                    <span className="inline-block text-[10px] font-black uppercase tracking-wider bg-accent/10 text-accent px-2.5 py-1 rounded-full mb-3">
                      {activeCategory.featured.tag}
                    </span>
                  )}
                  <h4 className="text-base font-extrabold text-foreground mb-2">
                    {activeCategory.featured.title}
                  </h4>
                  <p className="text-xs text-foreground/70 leading-relaxed mb-4">
                    {activeCategory.featured.desc}
                  </p>
                </div>

                <Link
                  href={activeCategory.featured.href}
                  className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:gap-3 transition-all"
                  onClick={() => setActiveTab(null)}
                >
                  <span>Khám phá ngay</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b-thin border-border-custom px-6 py-6 space-y-6 max-h-[85vh] overflow-y-auto">
          {MEGA_MENU_DATA.map((cat) => (
            <div key={cat.id} className="space-y-3 pb-4 border-b-thin border-border-custom/40 last:border-0">
              <Link
                href={cat.href}
                className="text-base font-black uppercase tracking-tight text-accent flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{cat.label}</span>
                <ArrowRight size={16} />
              </Link>
              <div className="pl-2 space-y-2">
                {cat.sections.flatMap((s) => s.items).map((sub, i) => (
                  <Link
                    key={i}
                    href={sub.href}
                    className="block text-sm font-semibold text-foreground/80 hover:text-accent py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          
          <div className="pt-2">
            <a
              href="https://www.facebook.com/danghong.harunoyuki"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 text-sm font-bold tracking-tight uppercase bg-accent text-white py-3 rounded-full shadow-sm"
            >
              <span>Chat với Hồng</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

