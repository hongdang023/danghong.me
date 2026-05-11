"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface FavouriteButtonProps {
  productSlug: string;
  className?: string;
  showCount?: boolean;
}

export function FavouriteButton({ productSlug, className = "", showCount = true }: FavouriteButtonProps) {
  const [isFavourited, setIsFavourited] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);

      if (user) {
        const { data } = await supabase
          .from('product_favourites')
          .select('id')
          .eq('user_id', user.id)
          .eq('product_slug', productSlug)
          .single();
        setIsFavourited(!!data);
      }
      setIsLoading(false);
    };
    init();
  }, [productSlug]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setIsLoading(true);
    if (isFavourited) {
      await supabase
        .from('product_favourites')
        .delete()
        .eq('user_id', user.id)
        .eq('product_slug', productSlug);
      setIsFavourited(false);
      setCount(c => Math.max(0, c - 1));
    } else {
      await supabase
        .from('product_favourites')
        .insert({ user_id: user.id, product_slug: productSlug });
      setIsFavourited(true);
      setCount(c => c + 1);
    }
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      title={isFavourited ? "Bỏ lưu" : (isLoggedIn ? "Lưu vào My Favourites" : "Đăng nhập để lưu")}
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
