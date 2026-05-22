"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface FavouriteButtonProps {
  productSlug: string;
  className?: string;
  showCount?: boolean;
}

export function FavouriteButton({ productSlug, className = "", showCount = true }: FavouriteButtonProps) {
  const [isFavourited, setIsFavourited] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from local storage
    const saved = localStorage.getItem("product_favourites");
    let locallyFavourited = false;
    if (saved) {
      const list = JSON.parse(saved) as string[];
      locallyFavourited = list.includes(productSlug);
      setIsFavourited(locallyFavourited);
    }
    
    // Check if there is a local count
    const localCount = localStorage.getItem(`product_count_${productSlug}`);
    if (localCount) {
      setCount(parseInt(localCount, 10));
    } else {
      // Premium Polish: Generate stable deterministic initial count based on productSlug hash
      let hash = 0;
      for (let i = 0; i < productSlug.length; i++) {
        hash = productSlug.charCodeAt(i) + ((hash << 5) - hash);
      }
      const initialCount = Math.abs(hash % 12) + (locallyFavourited ? 6 : 5);
      setCount(initialCount);
      localStorage.setItem(`product_count_${productSlug}`, String(initialCount));
    }
    
    setIsLoading(false);
  }, [productSlug]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);

    const saved = localStorage.getItem("product_favourites");
    let list: string[] = [];
    if (saved) {
      list = JSON.parse(saved) as string[];
    }

    let nextFavourited = false;
    let nextCount = count;

    if (list.includes(productSlug)) {
      list = list.filter(slug => slug !== productSlug);
      nextFavourited = false;
      nextCount = Math.max(0, count - 1);
    } else {
      list.push(productSlug);
      nextFavourited = true;
      nextCount = count + 1;
    }

    localStorage.setItem("product_favourites", JSON.stringify(list));
    localStorage.setItem(`product_count_${productSlug}`, String(nextCount));
    
    setIsFavourited(nextFavourited);
    setCount(nextCount);
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      title={isFavourited ? "Bỏ yêu thích" : "Yêu thích"}
      className={`flex items-center gap-2 transition-all duration-300 disabled:opacity-50 ${
        isFavourited
          ? "text-[#8E3A3A]"
          : "text-current opacity-60 hover:opacity-100 hover:text-[#8E3A3A]"
      } ${className}`}
    >
      <Heart
        size={22}
        fill={isFavourited ? "currentColor" : "none"}
        strokeWidth={isFavourited ? 2 : 1.5}
        className={`transition-transform ${isFavourited ? "scale-110" : "scale-100 group-hover:scale-110"}`}
      />
      {showCount && count > 0 && (
        <span className="font-bold text-sm">{count}</span>
      )}
    </button>
  );
}

