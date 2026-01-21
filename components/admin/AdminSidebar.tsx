"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Users", href: "/admin/users", icon: "group" },
  { label: "Courses", href: "/admin/courses", icon: "menu_book" },
  { label: "Mock Tests", href: "/admin/mock-tests", icon: "quiz" },
  { label: "Content", href: "/admin/content", icon: "folder_shared" },
  { label: "Analytics", href: "/admin/analytics", icon: "insights" },
  { label: "Settings", href: "/admin/settings", icon: "settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-navy-custom flex flex-col border-r border-white/10 pt-16">
      <div className="p-6 flex items-center gap-3">
        <div className="size-10 bg-primary rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-white">balance</span>
        </div>
        <div>
          <h1 className="text-ivory-custom font-bold">Admin Panel</h1>
          
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                active
                  ? "bg-[rgba(197,163,109,0.2)] text-[#c5a36d] border-l-4 border-l-[#c5a36d]"
                  : "text-ivory-custom/70 hover:bg-white/5 hover:text-ivory-custom"
              }`}
            >
              <span className="material-symbols-outlined">
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
