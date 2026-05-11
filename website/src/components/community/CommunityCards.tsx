"use client";

import React, { useState } from "react";
import GalleryModal from "./GalleryModal";
import { ImageIcon } from "lucide-react";

export interface Community {
  id: string;
  slug: string;
  name: string;
  stats: string;
  description: string;
  cover_image: string;
  images: string[];
}

interface CommunityCardsProps {
  communities: Community[];
}

export default function CommunityCards({ communities }: CommunityCardsProps) {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);

  return (
    <section className="mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {communities.map((community) => (
          <div 
            key={community.id} 
            className="group relative rounded-[24px] overflow-hidden aspect-[4/3] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 bg-border-custom/10 border-thin border-border-custom"
            onClick={() => setSelectedCommunity(community)}
          >
            <img 
              src={community.cover_image} 
              alt={community.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Dark gradient fade from bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Content overlay */}
            <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 text-white flex flex-col justify-end h-full">
              <div className="mt-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-bold text-2xl tracking-tight leading-tight mb-1">{community.name}</h3>
                <p className="text-sm text-gray-300 font-medium mb-3">{community.stats}</p>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
                  <p className="text-sm text-gray-400 overflow-hidden line-clamp-3">
                    {community.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery Indicator Badge */}
            {community.images && community.images.length > 0 && (
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ImageIcon size={14} />
                <span>{community.images.length}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <GalleryModal 
        community={selectedCommunity} 
        isOpen={!!selectedCommunity} 
        onClose={() => setSelectedCommunity(null)} 
      />
    </section>
  );
}
