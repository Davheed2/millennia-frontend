"use client";

import React, { useEffect, useState } from "react";
//import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
// ADD this at the top
import Auth from "@/components/Protect";
import {
  Activity,
  Briefcase,
  Heart,
  FileCheck,
  CreditCard,
  PlusCircle,
  MinusCircle,
  User,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "sonner";
import { useInitSession } from "@/store/useSession";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //const { user, logout } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isKycVerified = true;

  const { getSession } = useInitSession((state) => state.actions);

  useEffect(() => {
    void getSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: Activity,
    },
    {
      name: "Investments",
      href: "/dashboard/investments",
      icon: Briefcase,
    },
    {
      name: "Wishlist",
      href: "/dashboard/wishlist",
      icon: Heart,
    },
    {
      name: "KYC Verification",
      href: "/dashboard/kyc",
      icon: FileCheck,
      alert: !isKycVerified,
    },
    {
      name: "Add Funds",
      href: "/dashboard/add-funds",
      icon: PlusCircle,
    },
    {
      name: "Withdraw Funds",
      href: "/dashboard/withdraw",
      icon: MinusCircle,
    },
    {
      name: "Transactions",
      href: "/dashboard/transactions",
      icon: CreditCard,
    },
    {
      name: "Account",
      href: "/dashboard/account",
      icon: User,
    },
    {
      name: "Referrals",
      href: "/dashboard/referrals",
      icon: Users,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const NavItem = ({ item }: { item: (typeof navItems)[0] }) => {
    const isActive = pathname === item.href;

    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-invest text-white"
            : "hover:bg-gray-100 hover:text-invest"
        )}
      >
        <item.icon className="h-5 w-5" />
        {(sidebarOpen || mobileSidebarOpen) && <span>{item.name}</span>}
        {item.alert && (sidebarOpen || mobileSidebarOpen) && (
          <span className="ml-auto flex h-2 w-2 rounded-full bg-red-500"></span>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileSidebar}
          className="bg-white shadow-md"
        >
          {mobileSidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-gray-200 transition-all",
          sidebarOpen ? "w-64" : "w-16",
          mobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center p-4 h-16">
          {sidebarOpen || mobileSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-invest to-invest-accent">
                <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-br from-invest to-invest-accent"></div>
                </div>
              </div>
              <span className="text-lg font-bold">Millennia Trades</span>
            </div>
          ) : (
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-invest to-invest-accent mx-auto">
              <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-invest to-invest-accent"></div>
              </div>
            </div>
          )}

          {/* Desktop sidebar toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto hidden lg:flex"
          >
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                !sidebarOpen && "rotate-180"
              )}
            />
          </Button>
        </div>

        <Separator />

        {/* User section */}
        <div className={cn("p-4", !sidebarOpen && "hidden")}>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <span className="font-medium text-invest">{"U"}</span>
            </div>
            {(sidebarOpen || mobileSidebarOpen) && (
              <div className="overflow-hidden">
                <p className="truncate font-medium">{"User"}</p>
                <p className="truncate text-xs text-gray-500">
                  {"user@example.com"}
                </p>
              </div>
            )}
          </div>

          {/* KYC progress */}
          {(sidebarOpen || mobileSidebarOpen) && !isKycVerified && (
            <div className="mt-2 mb-1">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Complete KYC</span>
                <span className="text-invest">Required</span>
              </div>
              <Progress className="h-2" value={0} />
            </div>
          )}
        </div>

        <Separator className={cn(!sidebarOpen && "hidden")} />

        {/* Navigation */}
        <div className="flex-1 overflow-auto p-3 space-y-1">
          {navItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </div>

        {/* Logout button */}
        <div className="p-3 mt-auto">
          <button
            //onClick={logout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            {(sidebarOpen || mobileSidebarOpen) && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "min-h-screen transition-all",
          sidebarOpen ? "lg:ml-64" : "lg:ml-16",
          "ml-0" // Default for mobile
        )}
      >
        <div className="p-4 sm:p-10">
          <Auth>{children}</Auth>
          <Toaster richColors position="top-right" />
        </div>
      </main>
    </div>
  );
}
