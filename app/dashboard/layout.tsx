"use client";

import { usePathname, useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { ChevronRight } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const router = useRouter();

  const pageNameMap: Record<string, string> = {
    dashboard: "Dashboard",
    users: "Users",
    orders: "Orders",
    settings: "Settings",
    quality: "Quality Assurance",
    roles: "User Roles",
    profile: "Profile",
    create: "Create Roles",
    sync: 'Sync Orders',
  };

  const pathSegments = pathName.split("/").filter((seg) => seg);
  const breadcrumbs: { name: string; href: string }[] = [];

  for (let i = 0; i < pathSegments.length; i++) {
    const seg = pathSegments[i];
    const href = "/" + pathSegments.slice(0, i + 1).join("/");
    let name = "";

    const isNumeric = !isNaN(Number(seg));

    if (isNumeric) {
      if (pathSegments[i - 1] === "orders") name = "Order Details";
      else if (pathSegments[i - 2] === "orders") name = "Product Details";
      else if (pathSegments[i - 3] === "orders") name = "Design Item Details";
      else name = "Details";
    } else {
      name = pageNameMap[seg] || seg.charAt(0).toUpperCase() + seg.slice(1);
    }

    breadcrumbs.push({ name, href });
  }

  return (
    <div className="flex h-screen bg-primary-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto pt-16">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm mb-4">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
              <span
                onClick={() => index !== breadcrumbs.length - 1 && router.push(crumb.href)}
                className={
                  index === breadcrumbs.length - 1
                    ? "text-primary-700 font-medium cursor-default capitalize"
                    : "text-accent-700 hover:text-gray-700 cursor-pointer capitalize"
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
