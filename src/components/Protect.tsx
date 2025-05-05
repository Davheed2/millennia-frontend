"use client";
console.log("Auth component mounted");

import { useSession } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { Loader } from "./common";

type AuthProps = {
  children: ReactNode;
  exclude?: string[];
};

const Auth = ({ children, exclude = [] }: AuthProps) => {
  const { user, loading } = useSession((state) => state);
  const router = useRouter();
  const pathname = usePathname();

  if (loading || !pathname)
    return <Loader message="Validating auth status..." />;

  const isDashboardRoute = pathname.includes("/dashboard");

  // Check if the current route should be excluded from auth
  if (exclude.includes(pathname)) return children;

  const redirect = (route: string, message: string) => {
    toast.error("Page access denied!", {
      description: message,
      id: "access-denied",
      duration: 1000,
    });

    setTimeout(() => {
      router.replace(route);
    }, 500);
  };

  // If user is NOT signed in and on a dashboard route, redirect to signin
  if (isDashboardRoute && !user) {
    redirect("/signin", "You are not signed in");
    return <Loader message="Redirecting to sign-in..." />;
  }

  // If user is signed in but on a non-dashboard route, allow access
  // if (authRoute && user) {
  //   redirect("/dashboard", "You are already signed in");
  //   return <Loader message="Redirecting..." />;
  // }

  return children;
};

export default Auth;
