"use client";

import React, { useState } from "react";
import { OutcomeCard } from "@/components/OutcomeCard";
import { ProductDetail } from "@/components/ProductDetail";

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "build", label: "Builds" },
  { id: "demo", label: "Demos" },
  { id: "tool", label: "Tools" },
  { id: "resource", label: "Resources" },
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
    <main className="editorial-spacing pt-20 pb-8">
      {/* Header */}
      <section className="hero-container text-center mb-12">
        <h1 className="heading-hero">
          Think. Build. <span className="text-accent">Test. Learn.</span>
        </h1>
        <p className="text-body opacity-40 font-medium mx-auto">
          Bộ công cụ giúp bạn băm nhỏ kiến thức chuyên môn và tự động hóa toàn bộ quy trình vận hành, để bạn thảnh thơi tập trung vào những giá trị cốt lõi.
        </p>
      </section>

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

      <ProductDetail
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct ? { ...selectedProduct, slug: selectedProduct.id } : null}
      />
    </main>
  );
}
