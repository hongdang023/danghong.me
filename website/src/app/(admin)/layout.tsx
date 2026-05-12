export const runtime = 'edge';

import { requireAdmin } from '@/utils/admin';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Guard: server-side admin check — redirects to "/" if not admin
  await requireAdmin();

  return (
    <div className="flex h-screen bg-[#0d0d0d] text-white overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
