"use client";

import { usePathname } from "next/navigation";

import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode}) {
  const pathName = usePathname();

  const pageNameMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/users": "Users",
    "/dashboard/orders": "Orders",
    "/dashboard/settings": "Settings",
    "/dashboard/quality": "Quality Assurance",
  };

  const currentPage = pageNameMap[pathName] || "Page";
  return (
    <div className="flex min-h-screen bg-primary-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto pt-16">
        <div className="py-1">
          <p className="text-primary-700 font-semibold">Pages / {currentPage}</p>
          <h1 className="text-primary-700 font-bold text-xl py-1">{currentPage}</h1>
        </div>
        {children}
      </main>
    </div>
  );
}
