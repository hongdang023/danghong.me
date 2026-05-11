import React from "react";
import { MessageSquare, Vote, Star, BookCheck, Clock } from "lucide-react";

interface Trace {
  id: string;
  action_type: string;
  entity_title: string;
  created_at: string;
  metadata?: any;
}

const ActionIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "comment":
      return <MessageSquare size={14} className="text-blue-500" />;
    case "vote":
      return <Vote size={14} className="text-red-500" />;
    case "favorite":
      return <Star size={14} className="text-amber-500" />;
    case "quiz_complete":
      return <BookCheck size={14} className="text-green-500" />;
    default:
      return <Clock size={14} className="text-gray-500" />;
  }
};

const ActionLabel = ({ type, title, metadata }: { type: string; title: string; metadata?: any }) => {
  switch (type) {
    case "comment":
      return (
        <span className="text-body opacity-80">
          Đã để lại bình luận tại <span className="font-bold text-foreground">"{title}"</span>: 
          <span className="italic ml-1">"{metadata?.content?.substring(0, 50)}..."</span>
        </span>
      );
    case "vote":
      return (
        <span className="text-body opacity-80">
          Đã bình chọn cho <span className="font-bold text-foreground">"{title}"</span>
        </span>
      );
    case "favorite":
      return (
        <span className="text-body opacity-80">
          Đã lưu <span className="font-bold text-foreground">"{title}"</span> vào bộ sưu tập
        </span>
      );
    case "quiz_complete":
      return (
        <span className="text-body opacity-80">
          Đã hoàn thành bài kiểm tra tại <span className="font-bold text-foreground">"{title}"</span>
        </span>
      );
    default:
      return (
        <span className="text-body opacity-80">
          Tương tác với <span className="font-bold text-foreground">"{title}"</span>
        </span>
      );
  }
};

export default function TracesTimeline({ traces }: { traces: Trace[] }) {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter">Dấu tích.</h2>
      </div>

      <div className="relative space-y-10 before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-[1px] before:bg-border-custom/30">
        {traces.map((trace) => (
          <div key={trace.id} className="relative pl-10 group">
            <div className="absolute left-0 top-1.5 w-[22px] h-[22px] bg-background border-thin border-border-custom rounded-full flex items-center justify-center shadow-sm -ml-0 group-hover:border-accent/40 transition-colors z-10">
              <div className="w-2 h-2 rounded-full bg-accent/20 group-hover:bg-accent transition-colors duration-500" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.1em] opacity-30">
                <ActionIcon type={trace.action_type} />
                <span>{new Date(trace.created_at).toLocaleString('vi-VN')}</span>
              </div>
              
              <div className="text-[14px] leading-relaxed font-medium">
                <ActionLabel 
                  type={trace.action_type} 
                  title={trace.entity_title} 
                  metadata={trace.metadata} 
                />
              </div>
            </div>
          </div>
        ))}

        {traces.length === 0 && (
          <div className="py-8 pl-8 opacity-40 italic text-sm">
            Hệ thống chưa ghi nhận dấu tích nào từ bạn.
          </div>
        )}
      </div>
    </section>
  );
}
