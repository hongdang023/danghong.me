"use client";

import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface Community {
  id: string;
  slug: string;
  name: string;
  stats: string;
  description: string;
  cover_image: string;
  images: string[];
}

interface GalleryModalProps {
  community: Community | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryModal({ community, isOpen, onClose }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Reset index when community changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, community]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !community) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + community.images.length) % community.images.length);
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % community.images.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, community, onClose]);

  if (!isOpen || !community) return null;

  const images = community.images;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <button 
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 bg-white/10 hover:bg-white/20 p-2 rounded-full"
        onClick={onClose}
      >
        <X size={24} />
      </button>

      <div className="relative w-full max-w-6xl h-full max-h-[90vh] px-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {/* Left Arrow */}
        {images.length > 1 && (
          <button 
            className="absolute left-2 md:left-6 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 p-3 rounded-full transition-all z-10 border border-white/10"
            onClick={prevImage}
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Main Image Container */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black/50 border border-white/10 flex items-center justify-center w-full h-full max-h-[85vh]">
          <img 
            src={images[currentIndex]} 
            alt={`${community.name} - ${currentIndex + 1}`} 
            className="max-h-full max-w-full object-contain"
          />
          
          {/* Image Counter */}
          <div className="absolute top-4 left-4 bg-black/60 text-white/90 text-xs font-bold tracking-widest px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
            {currentIndex + 1} / {images.length}
          </div>
          
          {/* Bottom Info Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 md:p-8 text-white pt-24">
            <h3 className="text-2xl font-bold tracking-tight">{community.name}</h3>
            <p className="text-white/70 text-sm mt-2 max-w-2xl leading-relaxed">{community.description}</p>
          </div>
        </div>

        {/* Right Arrow */}
        {images.length > 1 && (
          <button 
            className="absolute right-2 md:right-6 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 p-3 rounded-full transition-all z-10 border border-white/10"
            onClick={nextImage}
          >
            <ChevronRight size={32} />
          </button>
        )}
      </div>
    </div>
  );
}
