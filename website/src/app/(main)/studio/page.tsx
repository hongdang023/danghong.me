import { 
  StudioDashboard, 
  FavouritesView, 
  ListView, 
  ProgressView, 
  HistoryView 
} from "@/components/studio";
import { Sparkles } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "My Studio | Hồng Đặng",
  description: "Nơi lưu trữ dấu tích và tiến trình học tập của bạn.",
};

export default async function StudioPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  // Next.js 15: searchParams is a Promise, must be awaited
  const params = await searchParams;
  const activeView = params.view;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 bg-border-custom/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles size={32} className="opacity-20" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Studio chỉ dành cho thành viên</h1>
          <p className="text-body opacity-60">
            Nơi tổng hợp mọi "dấu tích" học tập và những nội dung bạn đã lưu lại.
          </p>
          <a href="/login" className="inline-block bg-foreground text-background px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all">
            Đăng nhập ngay
          </a>
        </div>
      </div>
    );
  }

  // ─── Fetch real data from Supabase ───────────────────────────────────────────

  // My Favourites: products the user has liked in Products Hub
  const { data: favouriteRows } = await supabase
    .from('product_favourites')
    .select('product_slug, created_at, products(slug, title, description, image_url, category, tags, demo_link)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const favouritedProducts = (favouriteRows || [])
    .filter((row: any) => row.products)
    .map((row: any) => ({
      slug: row.products.slug,
      title: row.products.title,
      description: row.products.description,
      image: row.products.image_url,
      category: row.products.category,
      tags: row.products.tags || [],
      link: row.products.demo_link,
      saved_at: row.created_at,
    }));

  // ─── Mock data for sections not yet fully wired ───────────────────────────────
  const mockProgress = [
    {
      id: "1",
      title: "Learning Design Series - Vol 1",
      current_step: "03: Job-to-be-done",
      total_steps: 10,
      progress_percent: 30,
      last_accessed: new Date().toISOString(),
    }
  ];

  const mockListItems = [
    {
      id: "l1",
      title: "Product 101",
      type: "Course",
      image_url: "/screenshots/coursemaker.png",
      link: "/list/product-101"
    }
  ];

  const mockNotes = [
    {
      id: "n1",
      entity_title: "Books: Learning Design",
      content: "Điểm mấu chốt của JTBD là tập trung vào 'sự tiến bộ' mà khách hàng muốn đạt được.",
      created_at: new Date().toISOString(),
    }
  ];

  const mockTraces = [
    {
      id: "t1",
      action_type: "comment",
      entity_title: "Product 101 Review",
      created_at: new Date().toISOString(),
      metadata: { content: "Nội dung rất thực tế." }
    }
  ];

  const stats = {
    favouritesCount: favouritedProducts.length,
    listCount: mockListItems.length,
    progressCount: mockProgress.length + mockNotes.length,
    historyCount: mockTraces.length,
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "favourites":
        return <FavouritesView data={favouritedProducts} />;
      case "list":
        return <ListView data={mockListItems} />;
      case "progress":
        return <ProgressView data={{ progress: mockProgress, notes: mockNotes }} />;
      case "history":
        return <HistoryView data={mockTraces} />;
      default:
        return <StudioDashboard stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-background py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Header Section - only on dashboard */}
        {!activeView && (
          <header className="text-center space-y-3 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-[10px] font-black tracking-[0.2em] uppercase opacity-40">
              <Sparkles size={12} strokeWidth={3} />
              <span>Learning Workspace</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-none">
              <span className="text-[#8E3A3A] block">MY STUDIO</span>
              <span className="text-[#1D1D1F] text-xl md:text-2xl block mt-3 opacity-80">
                Workspace Của Tôi
              </span>
            </h1>
            <p className="text-[#1D1D1F]/40 text-sm md:text-base font-medium max-w-2xl mx-auto">
              Tất cả những gì bạn đã kiến tạo, ghi chép và lưu lại trên hành trình này.
            </p>
          </header>
        )}

        <div className="max-w-7xl mx-auto">
          {renderActiveView()}
        </div>

      </div>
    </div>
  );
}
