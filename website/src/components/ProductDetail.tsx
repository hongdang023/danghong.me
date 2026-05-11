"use client";

import React, { useState } from "react";
import { X, MessageSquare, ExternalLink, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FavouriteButton } from "@/components/FavouriteButton";

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

interface ProductDetailProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    slug?: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    gallery?: string[];
    link: string;
    outcome: string;
    jtbd?: {
      functional: string;
      emotional: string;
      social: string;
    };
    dreamState?: string;
    humanStory?: string;
    testCode?: string;
  } | null;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    { id: "1", author: "Vistor", text: "Thiết kế thực sự rất tinh gọn và dễ dùng!", timestamp: "2h ago" },
  ]);

  if (!product) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      author: "Bạn",
      text: commentText,
      timestamp: "Vừa xong",
    };
    
    setComments([newComment, ...comments]);
    setCommentText("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-background border-thin border-border-custom rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header / Close */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={onClose}
                className="p-2 bg-background/50 backdrop-blur-md rounded-full hover:bg-secondary transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-6 sm:p-12 space-y-12">
              {/* Main Image */}
              <div className="aspect-video w-full rounded-xl overflow-hidden border-thin border-border-custom bg-secondary">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              </div>

              {/* Story Section */}
              <div className="max-w-2xl mx-auto space-y-12">
                <div className="space-y-2 text-center sm:text-left">
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{product.title}</h2>
                  <p className="text-sm opacity-40 font-medium uppercase tracking-widest">{product.description}</p>
                </div>

                {/* JTBD Empathy Hook */}
                {product.jtbd && (
                  <div className="space-y-6">
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase opacity-40">Bạn có đang...</h3>
                    <ul className="space-y-5">
                      <li className="flex items-start space-x-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-base sm:text-lg opacity-80 leading-relaxed">{product.jtbd.functional}</span>
                      </li>
                      <li className="flex items-start space-x-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-base sm:text-lg opacity-80 leading-relaxed">{product.jtbd.emotional}</span>
                      </li>
                      <li className="flex items-start space-x-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-base sm:text-lg opacity-80 leading-relaxed">{product.jtbd.social}</span>
                      </li>
                    </ul>
                  </div>
                )}

                {/* Dream State B */}
                {product.dreamState && (
                  <div className="relative py-8 border-y-thin border-border-custom/50">
                    <p className="text-lg sm:text-xl leading-relaxed font-medium italic opacity-90 text-center sm:text-left">
                      "{product.dreamState}"
                    </p>
                  </div>
                )}

                {/* Long Description (Legacy or additional context) */}
                {!product.dreamState && (
                  <p className="text-base sm:text-lg leading-relaxed opacity-80">
                    {product.longDescription}
                  </p>
                )}

                {/* Human Centric Story */}
                {product.humanStory && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase opacity-40">Góc nhìn của Hồng</h3>
                    <p className="text-sm sm:text-base italic opacity-60 leading-relaxed">
                      {product.humanStory}
                    </p>
                  </div>
                )}
                
                <div className="pt-4 flex justify-center sm:justify-start">
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 px-10 py-5 bg-accent text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-accent/20"
                  >
                    <span>Trải nghiệm ngay</span>
                    <ExternalLink size={18} />
                  </a>
                </div>

                {/* Test Code Badge */}
                {product.testCode && (
                  <div className="flex flex-col items-center sm:items-start space-y-3 p-6 bg-orange-50/10 border-thin border-orange-200/20 rounded-xl">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">Mã truy cập bản demo</span>
                    <div className="flex items-center space-x-3">
                      <code className="text-xl font-mono font-bold text-accent bg-background px-4 py-2 rounded-lg border-thin border-border-custom">
                        {product.testCode}
                      </code>
                    </div>
                  </div>
                )}
              </div>

              {/* Engagement Zone */}
              <div className="max-w-2xl mx-auto pt-12 border-t-thin border-border-custom">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-6">
                    {product.slug && (
                      <FavouriteButton productSlug={product.slug} />
                    )}
                    <div className="flex items-center space-x-2 opacity-60">
                      <MessageSquare size={24} />
                      <span className="font-bold">{comments.length}</span>
                    </div>
                  </div>
                </div>

                {/* Comment Input */}
                <form onSubmit={handleAddComment} className="relative mb-10">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Viết cảm nhận của bạn..."
                    className="w-full bg-secondary border-thin border-border-custom px-6 py-4 rounded-xl focus:outline-none focus:border-accent transition-colors pr-14"
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-accent hover:scale-110 transition-transform"
                  >
                    <Send size={20} />
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm">{comment.author}</span>
                        <span className="text-[10px] opacity-40 uppercase tracking-widest">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm opacity-70 leading-relaxed bg-secondary/50 p-4 rounded-lg border-thin border-border-custom">
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
