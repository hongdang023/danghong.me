'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  BookOpen,
  GraduationCap,
  FileEdit,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

const NAV_ITEMS = [
  {
    href: '/admin',
    label: 'Dashboard',
    sublabel: 'User Insights',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: '/admin/products',
    label: 'Products',
    sublabel: 'CMS',
    icon: Package,
  },
  {
    href: '/admin/books',
    label: 'Books',
    sublabel: 'Analytics',
    icon: BookOpen,
  },
  {
    href: '/admin/curation-lab',
    label: 'Curation Lab',
    sublabel: "Hồng's List",
    icon: GraduationCap,
  },
  {
    href: '/admin/content',
    label: 'Content',
    sublabel: 'Community & Updates',
    icon: FileEdit,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 h-screen sticky top-0 flex flex-col bg-[#111] border-r border-white/5">
      {/* Brand */}
      <div className="px-6 py-8 border-b border-white/5">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">
          Admin Panel
        </p>
        <h1 className="text-sm font-black tracking-tight text-white">
          Hồng Đặng
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center space-x-3 px-3 py-3 rounded-xl transition-all group
                ${isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                }
              `}
            >
              <Icon
                size={16}
                className={`flex-shrink-0 ${isActive ? 'text-[#8E3A3A]' : ''}`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold leading-tight">{item.label}</p>
                <p className="text-[10px] opacity-50 leading-tight">{item.sublabel}</p>
              </div>
              {isActive && (
                <ChevronRight size={12} className="opacity-40 flex-shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-6 border-t border-white/5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center space-x-2 text-[11px] text-white/30 hover:text-white/60 transition-colors"
        >
          <ExternalLink size={12} />
          <span>Xem trang public</span>
        </Link>
      </div>
    </aside>
  );
}
