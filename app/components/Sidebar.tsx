"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users, Menu, ChevronRight,
  LogOut, ShoppingCart, Settings, CheckCircle, UserPlus
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import LogoutModal from "./LogoutModal";

export default function Sidebar() {
  const [pathname, setPathname] = useState("/dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/users", label: "Users", icon: Users },
    { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
    { href: "/dashboard/quality", label: "Q/A", icon: CheckCircle },
    { href: "/dashboard/roles", label: "User Roles", icon: UserPlus },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-lg hover:bg-primary-700 transition-colors
          ${isOpen ? "" : "bg-primary-800 text-white"}
        `}
      >
        {isOpen ? '' : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-72 bg-primary-800 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col h-screen
        `}
      >
        <div className="p-6 border-b border-primary-700">
          <Image
            src="/images/logo-1.png"
            alt="Logo"
            width={200}
            height={100}
          />
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setPathname(link.href);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between gap-3 px-4 py-4 rounded-xl
                  transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-accent-600 text-white shadow-lg"
                      : "text-primary-200 hover:bg-primary-700 hover:text-white"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    size={20} 
                    className={isActive ? "text-white" : "text-primary-300 group-hover:text-white"}
                  />
                  <span className="font-medium">{link.label}</span>
                </div>
                <ChevronRight 
                  size={16} 
                  className={`
                    transition-transform duration-200
                    ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                  `}
                />
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary-700">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-700 mb-3">
            <div className="w-10 h-10 bg-accent-600 rounded-full flex items-center justify-center text-white font-semibold">
              AD
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Admin User</p>
              <p className="text-xs text-primary-300">admin@example.com</p>
            </div>
          </div>
          
          <button onClick={() => setShowModal(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-primary-200 hover:bg-error-800 hover:text-white transition-all duration-200">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {showModal && (
        <LogoutModal 
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}