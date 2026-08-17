import PageNavigation from "@/components/PageNavigation";
"use client";

import React from "react";
import CommunityCards from "@/components/community/CommunityCards";
import { communitiesData } from "@/data/communityData";
import * as motion from "framer-motion/client";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="pt-10 md:pt-12 pb-6 md:pb-8 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
              <span className="text-accent block uppercase">Friends & Life.</span>
              <span className="text-foreground text-xl md:text-2xl block mt-3 opacity-80">
                Cộng Đồng & Khoảnh Khắc
              </span>
            </h1>
            <p className="text-lg md:text-xl font-medium opacity-40 max-w-2xl mx-auto leading-relaxed">
              Mọi nỗ lực xây dựng sản phẩm đều vô nghĩa nếu thiếu đi những con người sử dụng và phát triển cùng nó. Đây là nơi lưu giữ những khoảnh khắc và cộng đồng mà tôi tự hào được là một phần trong đó.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Sections */}
      <div className="max-w-7xl mx-auto px-6">
        <CommunityCards communities={communitiesData} />
      </div>
      <PageNavigation prev={{ title: "Hồng's List", href: "/list" }} next={{ title: "Family", href: "/family" }} />
</div>
  );
}

