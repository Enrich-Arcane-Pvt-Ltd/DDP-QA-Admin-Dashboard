"use client";

import { usePathname, useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { ChevronRight } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const router = useRouter();

  const pageNameMap: Record<string, string> = {
    "dashboard": "Dashboard",
    "users": "Users",
    "orders": "Orders",
    "settings": "Settings",
    "quality": "Quality Assurance",
    "roles": "User Roles",
    "profile": "Profile",
    "create": "Create Roles",
  };

  const pathSegments = pathName.split("/").filter(seg => seg);

  const breadcrumbs = pathSegments.map((seg, index) => {
    const name = pageNameMap[seg] || seg.charAt(0).toUpperCase() + seg.slice(1);
    // Build the URL up to this segment
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    return { name, href };
  });

  return (
    <div className="flex h-screen bg-primary-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto pt-16">
        <div className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
              <span
                onClick={() => index !== breadcrumbs.length - 1 && router.push(crumb.href)}
                className={
                  index === breadcrumbs.length - 1
                    ? "text-primary-700 font-medium cursor-default capitalize"
                    : "text-accent-700 hover:text-gray-700 cursor-pointer"
                }
              >
                {crumb.name}
              </span>
            </div>
          ))}
        </div>
        {children}
      </main>
    </div>
  );
}
