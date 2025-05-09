"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// ADD this at the top
import Auth from "@/components/Protect";
import { useRouter } from "next/navigation";
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
  AlignLeft,
  X,
  //MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "sonner";
import { useInitSession, useSession } from "@/store/useSession";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useSession((state) => state);
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(user && user[0].photo);
  const { getSession } = useInitSession((state) => state.actions);

  useEffect(() => {
    void getSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user && user[0]) {
      setProfileImage(user[0].photo || "");
    }
  }, [user]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 5 * 60 * 1000,
        staleTime: 1 * 60 * 1000,
      },
    },
  });

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
      name: "Retirement Plans",
      href: "/dashboard/retirement-plans",
      icon: CreditCard,
    },
    {
      name: "New Investment",
      href: "/dashboard/new-investment",
      icon: PlusCircle,
    },
    {
      name: "Watchlist",
      href: "/dashboard/watchlist",
      icon: Heart,
    },
    {
      name: "KYC Verification",
      href: "/dashboard/kyc",
      icon: FileCheck,
      alert: user && !user[0].isKycVerified,
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
    // {
    //   name: "Support Chat",
    //   href: "/dashboard/support-chat",
    //   icon: MessageCircle,
    // },
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

  const logout = () => {
    router.push("/dashboard/logout");
  };

  const NavItem = ({ item }: { item: (typeof navItems)[0] }) => {
    const isActive = pathname === item.href;

    const handleClick = () => {
      toggleMobileSidebar();
    };

    return (
      <Link
        href={item.href}
        onClick={handleClick}
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
      <div className="lg:hidden top-0 left-0 z-50 w-full bg-white">
        <div className="fixed top-8 left-3">
          {!mobileSidebarOpen && (
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMobileSidebar}
              className=""
            >
              <AlignLeft />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
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

          {/* Desktop sidebar toggle  */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto hidden lg:flex"
          >
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform text-black",
                !sidebarOpen && "rotate-180"
              )}
            />
          </Button>

          {mobileSidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileSidebar}
              className="ml-auto lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <Separator />

        {/* User section */}
        <div className={cn("p-4", !sidebarOpen && "hidden")}>
          <div className="flex items-center gap-3 mb-2">
            <Avatar>
              <AvatarImage
                src={profileImage || ""}
                className="object-cover w-full h-full"
              />
              <AvatarFallback>
                {user && user[0]
                  ? `${user[0].firstName?.[0] || ""}${
                      user[0].lastName?.[0] || ""
                    }`.toUpperCase()
                  : ""}
              </AvatarFallback>
            </Avatar>
            {(sidebarOpen || mobileSidebarOpen) && (
              <div className="overflow-hidden">
                <p className="truncate font-medium text-sm">
                  {user && user[0].firstName} {user && user[0].lastName}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {user && user[0].email}
                </p>
              </div>
            )}
          </div>

          {/* KYC progress */}
          {(sidebarOpen || mobileSidebarOpen) &&
            user &&
            !user[0].isKycVerified && (
              <div className="mt-4 mb-1">
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
        <div
          className={cn(
            "flex-1 overflow-auto space-y-1",
            sidebarOpen ? "p-3" : "p-0"
          )}
        >
          {navItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </div>

        {/* Logout button */}
        <div className="p-3 mt-auto">
          <button
            onClick={logout}
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
          <QueryClientProvider client={queryClient}>
            <Auth>{children}</Auth>
            <Toaster richColors position="top-right" />
          </QueryClientProvider>
        </div>
      </main>
    </div>
  );
}
