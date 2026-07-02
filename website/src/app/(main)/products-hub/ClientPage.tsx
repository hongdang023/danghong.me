"use client";

import React, { useState } from "react";
import { OutcomeCard } from "@/components/OutcomeCard";
import { ProductDetail } from "@/components/ProductDetail";
import * as motion from "framer-motion/client";

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "life", label: "Life" },
  { id: "education", label: "Education" },
  { id: "gems", label: "Gems" },
];

export default function ProductsHubClient({ initialItems }: { initialItems: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const openProduct = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const filteredItems = activeFilter === "all" 
    ? initialItems 
    : initialItems.filter(item => item.category === activeFilter);

  return (
    <main className="pb-8">
      {/* Header */}
      <section className="pt-10 md:pt-12 pb-6 md:pb-8 px-6 relative overflow-hidden text-center mb-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
              <span className="text-accent block uppercase">Think. Build. Test. Learn.</span>
              <span className="text-foreground text-xl md:text-2xl block mt-3 opacity-80">
                Hệ Sinh Thái Sản Phẩm Thực Chiến
              </span>
            </h1>
            <p className="text-lg md:text-xl font-medium opacity-40 max-w-2xl mx-auto leading-relaxed">
              Bộ công cụ giúp bạn băm nhỏ kiến thức chuyên môn và tự động hóa toàn bộ quy trình vận hành, để bạn thảnh thơi tập trung vào những giá trị cốt lõi.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* Filter Bar */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 mr-2">Phân loại:</span>
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold border-thin transition-all ${
                  activeFilter === filter.id 
                  ? "bg-accent text-white border-accent shadow-lg shadow-accent/20" 
                  : "bg-secondary border-border-custom opacity-60 hover:opacity-100"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <OutcomeCard
                key={item.id || item.slug}
                title={item.title}
                description={item.description}
                image={item.image}
                tags={item.tags}
                onClick={() => openProduct(item)}
              />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-20 opacity-40">
              Không tìm thấy sản phẩm nào trong danh mục này.
            </div>
          )}
        </section>
      </div>

      <ProductDetail
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct ? { ...selectedProduct, slug: selectedProduct.id } : null}
      />
    </main>
  );
}
