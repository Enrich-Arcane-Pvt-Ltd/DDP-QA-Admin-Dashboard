"use client";

import {
  ChevronRight,
  ClipboardCheck,
  FileBarChart,
  Layers,
  LayoutDashboard,
  Users,
  Menu,
  LogOut,
  ShoppingCart,
  Settings,
  CheckCircle,
  UserPlus,
  CircleUser,
  Package,
  Ruler,
  CloudDownload,
  Dot,
  ListChecks,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import LogoutModal from "./LogoutModal";
import { useAccessToken } from "../hooks/useAccessToken";
import APP_URL from "../constants/Config";
import { toast } from "@/app/components/ToastContainer";
import { useCallback, useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();
  const { token } = useAccessToken();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/users", label: "Users", icon: Users },
    {
      label: "Master",
      icon: Layers,
      subLinks: [
        { href: "/dashboard/master/product-type", label: "Product Types", icon: Package },
        { href: "/dashboard/master/product-size", label: "Product Sizes", icon: Ruler },
      ],
    },
    { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
    {
      label: "Q/A",
      icon: ClipboardCheck,
      subLinks: [
        { href: "/dashboard/quality/qa-rules", label: "QA Rules", icon: ListChecks },
        { href: "/dashboard/quality/qa-rule-sets", label: "QA Rule Sets", icon: Layers },
        { href: "/dashboard/quality/qa-reports", label: "QA Reports", icon: FileBarChart },
      ]
    },
    { href: "/dashboard/roles", label: "User Roles", icon: UserPlus },
    { href: "/dashboard/profile", label: "Profile", icon: CircleUser },
    { href: "/dashboard/sync", label: "Sync Orders", icon: CloudDownload },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleSubMenuToggle = (label: string) => {
    setOpenSubMenu((prev) => (prev === label ? null : label));
  };

  const handleUserProfile = useCallback(
    async (token: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(APP_URL + "profile", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const responseJson = await response.json();
        if (!response.ok) {
          console.log("Response Error in User Profile : ", responseJson.message);
          return;
        }
        setEmail(responseJson?.data?.email || "");
        setName(responseJson?.data?.name || "");
      } catch (error) {
        console.log("Error fetching user profile : ", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (token) handleUserProfile(token);
  }, [token, handleUserProfile]);

  const handleLogout = useCallback(async () => {
    if (!token) {
      console.log("Token Not Found");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(APP_URL + "logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseJson = await response.json();
      if (!response.ok) {
        toast.error("Logout Failed");
        return;
      }

      toast.success("User Logout Successfully");
      setTimeout(() => router.replace("/"), 2000);
    } catch (error) {
      toast.error("Logout Failed");
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  }, [token, router]);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-lg hover:bg-primary-700 transition-colors ${
          isOpen ? "" : "bg-primary-800 text-white"
        }`}
      >
        {!isOpen && <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-primary-800 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col h-screen`}
      >
        <div className="p-6 border-b border-primary-700">
          <Image src="/images/logo-1.png" alt="Logo" width={200} height={100} />
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;

            if (link.subLinks) {
              const isSubMenuOpen = openSubMenu === link.label;

              return (
                <div key={link.label}>
                  <button
                    onClick={() => handleSubMenuToggle(link.label)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-4 rounded-xl text-primary-200 hover:bg-primary-700 hover:text-white transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="font-medium">{link.label}</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`transition-transform duration-200 ${
                        isSubMenuOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {isSubMenuOpen && (
                    <div className="ml-8 mt-1 space-y-1 animate-fadeIn">
                      {link.subLinks.map((sub) => {
                        const isActive = pathname.startsWith(sub.href);
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                              isActive
                                ? "bg-accent-600 text-white"
                                : "text-primary-300 hover:bg-primary-700 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {sub.icon && (
                                <sub.icon size={16} className="text-primary-300" />
                              )}
                              <span>{sub.label}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive =
              link.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-4 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-accent-600 text-white shadow-lg"
                    : "text-primary-200 hover:bg-primary-700 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={20}
                    className={
                      isActive
                        ? "text-white"
                        : "text-primary-300 group-hover:text-white"
                    }
                  />
                  <span className="font-medium">{link.label}</span>
                </div>
                <Dot size={20} className="text-primary-400 group-hover:text-white" />
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary-700">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-700 mb-3">
            <div className="w-10 h-10 bg-accent-600 rounded-full flex items-center justify-center text-white font-semibold">
              {name ? name.split(" ").map((w) => w[0]).join("").toUpperCase() : ""}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{name}</p>
              <p className="text-xs text-primary-300">{email}</p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-primary-200 hover:bg-error-800 hover:text-white transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {showModal && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
          email={email}
          name={name}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
