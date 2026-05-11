import React from "react";
import { StickyNote, MoreHorizontal } from "lucide-react";

interface Note {
  id: string;
  entity_title: string;
  content: string;
  created_at: string;
}

export default function NotesSection({ notes }: { notes: Note[] }) {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter">Ghi chép.</h2>
        <span className="text-[11px] font-black uppercase tracking-widest opacity-30 bg-border-custom/20 px-3 py-1 rounded-full">
          {notes.length} notes
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {notes.map((note) => (
          <div 
            key={note.id} 
            className="p-8 bg-background border-thin border-border-custom rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                <div className="w-6 h-6 bg-accent/10 rounded-lg flex items-center justify-center">
                  <StickyNote size={12} />
                </div>
                <span>{note.entity_title}</span>
              </div>
              <button className="opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity p-2">
                <MoreHorizontal size={18} />
              </button>
            </div>
            
            <p className="text-[15px] font-medium leading-relaxed mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
              {note.content}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-border-custom/30 text-[10px] font-black opacity-30 uppercase tracking-[0.1em]">
              <span>Đã ghi vào {new Date(note.created_at).toLocaleDateString('vi-VN')}</span>
              <span className="group-hover:text-accent transition-colors">Personal Memo</span>
            </div>
          </div>
        ))}

        {notes.length === 0 && (
          <div className="py-12 border-dashed border-thin border-border-custom rounded-2xl flex flex-col items-center justify-center text-center px-6">
            <p className="text-sm opacity-40 italic">Bạn chưa để lại ghi chú nào.</p>
          </div>
        )}
      </div>
    </section>
  );
}
