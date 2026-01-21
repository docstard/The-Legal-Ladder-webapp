"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
   const pathname = usePathname().split('/')[2] || 'DASHBOARD';
   console.log('pathname', pathname);
  return (
    <header className="h-20 px-8 flex items-center justify-between top-0 z-10">
      <h2 className="text-3xl font-bold tracking-tigh">{pathname.toUpperCase()}  ADMIN</h2>

      {/* <div className="flex items-center gap-4">
        <input
          placeholder="Search student records..."
          className="px-4 py-2 border rounded-lg text-sm"
        />
      </div> */}
    </header>
  );
}
