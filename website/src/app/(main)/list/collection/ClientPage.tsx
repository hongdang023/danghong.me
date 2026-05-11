"use client";

import React, { useState } from "react";
import { CATEGORY_MAPPING, getFilterCategories } from "@/data/courseData";
import { CourseCard } from "@/components/CourseCard";
import { ArrowLeft, Search, Filter, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function CollectionClientPage({ initialCourses }: { initialCourses: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const allCategories = ["Tất cả", ...getFilterCategories()];

  const filteredCourses = initialCourses.filter(course => {
    const matchesCategory = selectedCategory === "Tất cả" || 
      (course.tags && course.tags.some((tag: string) => CATEGORY_MAPPING[selectedCategory]?.includes(tag)));
      
    const matchesSearch = searchQuery === "" || 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="editorial-spacing pt-20 pb-24">
      {/* Back Button */}
      <Link 
        href="/list" 
        className="inline-flex items-center space-x-2 text-sm font-bold tracking-widest uppercase opacity-40 hover:opacity-100 hover:text-accent transition-colors mb-12"
      >
        <ArrowLeft size={16} />
        <span>Trở lại Hồng's List</span>
      </Link>

      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Hồng's <span className="text-accent">Collection.</span>
        </h1>
        <p className="text-lg font-medium opacity-60 max-w-2xl">
          Tuyển tập các khóa học được chọn lọc kỹ càng nhất. Tìm kiếm hoặc dùng bộ lọc bên dưới để khám phá.
        </p>
      </section>

      {/* Search & Filter Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
          <div className="relative w-full md:w-2/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground opacity-40" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm khóa học, người dạy..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-secondary/30 border-thin border-border-custom rounded-xl text-[13px] font-medium focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="relative w-full md:w-1/3">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground opacity-40" size={18} />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none pl-12 pr-10 py-3.5 bg-secondary/30 border-thin border-border-custom rounded-xl text-[13px] font-bold tracking-tight uppercase focus:outline-none focus:border-accent transition-colors cursor-pointer"
            >
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground opacity-40 pointer-events-none" size={16} />
          </div>
        </div>
      </section>

      {/* List Section */}
      <section>
        <div className="mb-6 flex justify-between items-end">
          <h2 className="text-sm font-bold tracking-widest uppercase opacity-40">
            Hiển thị {filteredCourses.length} khóa học
          </h2>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-24 bg-secondary/20 rounded-2xl border-thin border-border-custom border-dashed">
            <p className="text-lg font-medium opacity-60">
              Không tìm thấy khóa học nào phù hợp với từ khóa này.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id || course.slug} course={course} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
