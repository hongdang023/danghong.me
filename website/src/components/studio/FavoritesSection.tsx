import React from "react";
import { Heart, ExternalLink } from "lucide-react";

interface FavoriteItem {
  id: string;
  title: string;
  type: string;
  image_url?: string;
  link: string;
}

export default function FavoritesSection({ favorites }: { favorites: FavoriteItem[] }) {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter">Bộ sưu tập.</h2>
        <span className="text-[11px] font-black uppercase tracking-widest opacity-30 bg-border-custom/20 px-3 py-1 rounded-full">
          {favorites.length} items
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {favorites.map((item) => (
          <a 
            key={item.id} 
            href={item.link}
            className="group block space-y-4"
          >
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden border-thin border-border-custom bg-secondary/30 shadow-sm group-hover:shadow-md transition-all duration-500">
              {item.image_url ? (
                <img 
                  src={item.image_url} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Heart size={24} className="opacity-10 group-hover:scale-125 transition-transform duration-500" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute top-4 left-4">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-full border-thin border-border-custom/50 shadow-sm">
                  {item.type}
                </span>
              </div>
            </div>
            
            <div className="space-y-1 px-1">
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-bold leading-tight group-hover:text-accent transition-colors truncate">
                  {item.title}
                </h3>
                <ExternalLink size={12} className="opacity-0 group-hover:opacity-40 transition-all -translate-x-2 group-hover:translate-x-0" />
              </div>
            </div>
          </a>
        ))}

        {favorites.length === 0 && (
          <div className="col-span-full py-12 border-dashed border-thin border-border-custom rounded-2xl flex flex-col items-center justify-center text-center px-6">
            <p className="text-sm opacity-40 italic">Bạn chưa lưu mục nào vào bộ sưu tập.</p>
          </div>
        )}
      </div>
    </section>
  );
}
