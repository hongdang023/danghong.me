import React from "react";
import { createClient } from "@/utils/supabase/server";
export const runtime = 'edge';
import { Bell, Zap, BookOpen, Bug } from "lucide-react";

export const metadata = {
  title: "Updates | Hồng Đặng",
  description: "Cập nhật mới nhất về hệ thống, khóa học và cộng đồng.",
};

export const revalidate = 60;

const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "feature":
      return <Zap className="text-red-500" size={18} />;
    case "course_update":
      return <BookOpen className="text-blue-500" size={18} />;
    case "bugfix":
      return <Bug className="text-green-500" size={18} />;
    default:
      return <Bell className="text-gray-500" size={18} />;
  }
};

export default async function UpdatesPage() {
  const supabase = await createClient();
  
  // Check auth - strictly member only
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 bg-border-custom/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bell size={32} className="opacity-20" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Thành viên mới được xem mục này</h1>
          <p className="text-body opacity-60">
            Vui lòng đăng nhập để cập nhật những thay đổi mới nhất từ hệ thống và cộng đồng.
          </p>
          <a href="/login" className="inline-block bg-foreground text-background px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all">
            Đăng nhập ngay
          </a>
        </div>
      </div>
    );
  }

  const { data: updates } = await supabase
    .from('updates')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-background py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tighter mb-4">What's New.</h1>
          <p className="text-body opacity-40 font-medium max-w-xl">
            Lịch sử những bước tiến nhỏ, những lần tối ưu và cả những nội dung mới vừa được "lên sóng".
          </p>
        </header>

        <div className="space-y-12 border-l-thin border-border-custom pl-8 ml-2">
          {updates?.map((update) => (
            <div key={update.id} className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-background border-thin border-border-custom flex items-center justify-center shadow-sm">
                <div className="w-2 h-2 rounded-full bg-foreground/20" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-[11px] font-bold tracking-widest uppercase opacity-40">
                  <TypeIcon type={update.type} />
                  <span>{new Date(update.created_at).toLocaleDateString('vi-VN')}</span>
                  <span className="px-2 py-0.5 rounded-full border-thin border-border-custom">
                    {update.type.replace('_', ' ')}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold tracking-tight">{update.title}</h2>
                
                <p className="text-body opacity-70 leading-relaxed max-w-2xl">
                  {update.content}
                </p>

                {update.link && (
                  <a 
                    href={update.link} 
                    className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-opacity pt-2 border-b-thin border-foreground/20 pb-1"
                  >
                    <span>Xem chi tiết</span>
                  </a>
                )}
              </div>
            </div>
          ))}

          {(!updates || updates.length === 0) && (
            <div className="py-12 opacity-40 italic">
              Chưa có cập nhật nào được ghi lại.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
