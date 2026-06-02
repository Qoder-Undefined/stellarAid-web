'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { NotificationsDropdown } from '@/components/NotificationsDropdown';
import { cn } from '@/lib/utils';

const ROUTE_LABELS: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/projects': 'My Projects',
  '/dashboard/donations': 'Donations',
  '/dashboard/settings': 'Settings',
};

function useBreadcrumbs() {
  const pathname = usePathname();
  const crumbs: { label: string; href: string }[] = [];

  if (pathname === '/dashboard') {
    crumbs.push({ label: 'Overview', href: '/dashboard' });
  } else if (pathname.startsWith('/dashboard/')) {
    crumbs.push({ label: 'Overview', href: '/dashboard' });
    const label = ROUTE_LABELS[pathname] ?? toTitleCase(pathname.split('/').pop() ?? '');
    crumbs.push({ label, href: pathname });
  } else if (pathname.startsWith('/dashboard/settings')) {
    crumbs.push({ label: 'Settings', href: '/dashboard/settings' });
  }

  return crumbs;
}

function toTitleCase(str: string) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const { user } = useAuthStore();
  const crumbs = useBreadcrumbs();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center gap-4 px-4 lg:px-6 shrink-0">
      {/* Hamburger — mobile only */}
      <button
        type="button"
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 min-w-0 flex-1">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <span key={crumb.href} className="flex items-center gap-1.5 min-w-0">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              )}
              {isLast ? (
                <span className="text-sm font-semibold text-gray-900 truncate">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors truncate"
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>

      {/* Right section */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            className="h-9 pl-9 pr-4 text-sm bg-gray-100 border border-transparent rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#3461f9] focus:bg-white transition-all w-48 focus:w-64"
          />
        </div>

        {/* Notifications */}
        <NotificationsDropdown />

        {/* User avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1a3a6b] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-semibold">
              {user?.name?.[0]?.toUpperCase() ?? 'U'}
            </span>
          </div>
          <span className="hidden md:block text-sm font-medium text-gray-900 max-w-[120px] truncate">
            {user?.name ?? 'User'}
          </span>
        </div>
      </div>
    </header>
  );
}
