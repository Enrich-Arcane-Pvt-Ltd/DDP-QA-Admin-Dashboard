"use client";

import { usePathname } from "next/navigation";

import Sidebar from "../components/Sidebar";
import { ChevronRight } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode}) {
  const pathName = usePathname();

  const pageNameMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/users": "Users",
    "/dashboard/orders": "Orders",
    "/dashboard/settings": "Settings",
    "/dashboard/quality": "Quality Assurance",
    "/dashboard/roles": "User Roles",
  };

  const currentPage = pageNameMap[pathName] || "Page";
  const breadcrumbs = ["Pages", currentPage];
  return (
    <div className="flex h-screen bg-primary-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto pt-16">
        <div className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
              <span 
                className={
                  index === breadcrumbs.length - 1 
                    ? "text-primary-700 font-medium" 
                    : "text-accent-700 hover:text-gray-700"
                }
              >
                {item}
              </span>
            </div>
          ))}
        </div>
        {children}
      </main>
    </div>
  );
}
