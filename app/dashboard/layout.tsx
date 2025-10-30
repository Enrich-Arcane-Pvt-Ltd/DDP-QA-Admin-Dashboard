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
  };

  const pathSegments = pathName.split("/").filter(seg => seg);
  const breadcrumbs: { name: string; href: string }[] = [];

  for (let i = 0; i < pathSegments.length; i++) {
    const seg = pathSegments[i];
    const href = "/" + pathSegments.slice(0, i + 1).join("/");
    let name = "";

    const isIdSegment = i > 0 && 
      pageNameMap[pathSegments[i - 1]] && 
      pathSegments[i - 1] !== "dashboard" &&
      !pageNameMap[seg] && 
      !isNaN(Number(seg));

    if (isIdSegment) {
      const parentKey = pathSegments[i - 1];
      if (parentKey === "orders") name = "Order Details";
      else if (parentKey === "users") name = "User Details";
      else if (parentKey === "products") name = "Product Details";
      else name = `${pageNameMap[parentKey]} ID`;
    } else {
      name = pageNameMap[seg] || seg.charAt(0).toUpperCase() + seg.slice(1);
    }

    breadcrumbs.push({ name, href });
  }

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
                    ? "text-primary-700 font-medium cursor-default"
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