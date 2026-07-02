export interface Tool {
  name: string;
  description: string;
  iconName: string;
  link?: string;
  tagline?: string;
}

export interface ToolsCategory {
  title: string;
  subtitle: string;
  tools: Tool[];
}

export const toolsPhilosophy = {
  quote: "01 tools cho chín còn hơn 09 tools",
  context: "Tập trung làm chủ sâu sắc các công cụ cốt lõi để tối ưu hóa hiệu suất và chất lượng công việc, thay vì phân tán năng lực vào quá nhiều nền tảng khác nhau."
};

export const toolsCategoriesData: ToolsCategory[] = [
  {
    title: "Hay dùng nhất",
    subtitle: "Các công cụ cốt lõi định hình quy trình làm việc hàng ngày của tôi",
    tools: [
      {
        name: "Google Antigravity",
        description: "Trợ lý lập trình AI thế hệ mới (Advanced Agentic Coding)",
        iconName: "Sparkles",
        tagline: "AI"
      },
      {
        name: "Gemini Pro",
        description: "AI assistant cho tư duy sâu và phân tích",
        iconName: "BrainCircuit",
        tagline: "AI"
      },
      {
        name: "NotebookLM",
        description: "Trợ lý nghiên cứu và tổng hợp kiến thức từ tài liệu",
        iconName: "BookOpen",
        tagline: "Research"
      },
      {
        name: "GitHub",
        description: "Nền tảng lưu trữ và quản lý mã nguồn",
        iconName: "Code2",
        tagline: "Development"
      },
      {
        name: "Cloudflare",
        description: "Hạ tầng CDN, bảo mật và deploy website",
        iconName: "Cloud",
        tagline: "Infrastructure"
      },
      {
        name: "Supabase",
        description: "Nền tảng Backend-as-a-Service mã nguồn mở",
        iconName: "Database",
        tagline: "Database"
      },
      {
        name: "Gamma AI",
        description: "AI assistant thiết kế slide và bài thuyết trình",
        iconName: "Presentation",
        tagline: "Design"
      }
    ]
  },
  {
    title: "Ít sử dụng",
    subtitle: "Những công cụ hỗ trợ bổ sung khi cần giải quyết các bài toán cụ thể",
    tools: [
      {
        name: "Consensus AI",
        description: "AI search engine dành cho nghiên cứu khoa học",
        iconName: "Search",
        tagline: "Research"
      },
      {
        name: "Canva",
        description: "Công cụ thiết kế đồ họa nhanh và trực quan",
        iconName: "Palette",
        tagline: "Design"
      },
      {
        name: "Notion",
        description: "Không gian quản lý tài liệu và ghi chép cá nhân",
        iconName: "StickyNote",
        tagline: "Productivity"
      },
      {
        name: "ChatGPT",
        description: "AI assistant đa năng cho mọi công việc",
        iconName: "MessageSquare",
        tagline: "AI"
      }
    ]
  }
];
