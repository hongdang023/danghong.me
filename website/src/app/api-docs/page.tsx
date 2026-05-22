import React from 'react';
import { Terminal, User, BookOpen, Rocket, ExternalLink, Code } from 'lucide-react';

export const metadata = {
  title: "API Documentation | danghong.me",
  description: "Tài liệu API công khai của Hồng Đặng dành cho đối tác và cộng tác viên.",
};

export default function ApiDocsPage() {
  const endpoints = [
    {
      id: "profile",
      name: "Personal Profile",
      description: "Lấy thông tin cá nhân, triết lý thiết kế và lĩnh vực chuyên môn.",
      method: "GET",
      url: "/api/profile.json",
      icon: <User className="text-accent" size={24} />,
      example: {
        name: "Hong Dang",
        title: "The Learning Architect",
        expertise: ["AI/Vibe Coding", "Learning Science", "..."]
      }
    },
    {
      id: "courses",
      name: "Courses List",
      description: "Danh sách các khóa học đã tham gia, nơi đào tạo và các đánh giá liên quan.",
      method: "GET",
      url: "/api/courses.json",
      icon: <BookOpen className="text-accent" size={24} />,
      example: [
        {
          name: "Product 101",
          provider: "The1ight",
          keywords: ["Vibe Coding", "..."]
        }
      ]
    },
    {
      id: "showcase",
      name: "Showcase / Portfolio",
      description: "Danh sách các dự án, hệ thống và tài nguyên (vũ khí thực chứng) đã xây dựng.",
      method: "GET",
      url: "/api/showcase.json",
      icon: <Rocket className="text-accent" size={24} />,
      example: [
        {
          category: "SYSTEMS",
          items: [{ name: "LightMS", info: "..." }]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="border-b-thin border-border-custom bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-accent/10 p-2 rounded-lg">
              <Terminal size={24} className="text-accent" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight uppercase">Public API <span className="opacity-40">Docs</span></h1>
          </div>
          <a href="/" className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
            Quay lại trang chủ
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {/* Intro */}
        <section className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Nguồn dữ liệu <span className="text-accent">Thực chứng.</span>
          </h2>
          <p className="text-lg md:text-xl font-medium opacity-60 leading-relaxed max-w-2xl">
            Đây là hệ thống API công khai cung cấp dữ liệu cấu trúc về lộ trình phát triển, danh mục sản phẩm và triết lý của Hồng Đặng.
          </p>
          <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-xl border-thin border-border-custom">
            <Code size={20} className="text-accent opacity-60" />
            <p className="text-sm font-bold opacity-60">
              API Base URL: <code className="bg-white px-2 py-1 rounded text-accent">/api</code>
            </p>
          </div>
        </section>

        {/* Endpoints */}
        <section className="space-y-12">
          {endpoints.map((endpoint) => (
            <div key={endpoint.id} className="group relative bg-white rounded-2xl border-thin border-border-custom p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    {endpoint.icon}
                    <h3 className="text-2xl font-extrabold tracking-tight">{endpoint.name}</h3>
                  </div>
                  <p className="font-medium opacity-60">{endpoint.description}</p>
                  
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase rounded-full border border-green-100">
                      {endpoint.method}
                    </span>
                    <code className="text-sm font-mono opacity-80">{endpoint.url}</code>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <a 
                    href={endpoint.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-accent text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20"
                  >
                    <span>Lấy Dữ Liệu</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Example Preview */}
              <div className="mt-8 pt-8 border-t-thin border-border-custom">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Phản hồi mẫu (JSON)</span>
                </div>
                <pre className="bg-[#1D1D1F] text-white/90 p-6 rounded-xl overflow-x-auto text-[13px] leading-relaxed font-mono shadow-inner border-thin border-white/5">
                  <code>{JSON.stringify(endpoint.example, null, 2)}...</code>
                </pre>
              </div>
            </div>
          ))}
        </section>

        {/* Footer info */}
        <section className="pt-20 border-t-thin border-border-custom text-center space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-40">
            Design for Builders by Hong Dang
          </p>
          <div className="flex justify-center items-center space-x-8">
            <div className="h-0.5 w-12 bg-accent opacity-20"></div>
            <p className="text-sm font-medium opacity-60">All data is public and updated in real-time.</p>
            <div className="h-0.5 w-12 bg-accent opacity-20"></div>
          </div>
        </section>
      </main>
    </div>
  );
}
