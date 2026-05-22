import React from "react";
import CommunityCards from "@/components/community/CommunityCards";
import { communitiesData } from "@/data/communityData";

export const metadata = {
  title: "Community | Hồng Đặng",
  description: "Nhật ký những khoảnh khắc và những cộng đồng đang cùng xây dựng.",
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
      {/* Hero Section */}
      <section className="hero-container text-center mb-16 pt-10">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
          <span className="text-accent block uppercase">Friends & Life.</span>
          <span className="text-foreground text-xl md:text-2xl block mt-3 opacity-80">
            Cộng Đồng & Khoảnh Khắc
          </span>
        </h1>
        <p className="text-body opacity-40 font-medium mx-auto max-w-2xl">
          Mọi nỗ lực xây dựng sản phẩm đều vô nghĩa nếu thiếu đi những con người sử dụng và phát triển cùng nó. Đây là nơi lưu giữ những khoảnh khắc và cộng đồng mà tôi tự hào được là một phần trong đó.
        </p>
      </section>

      {/* Gallery Sections */}
        <CommunityCards communities={communitiesData} />

      </div>
    </div>
  );
}

