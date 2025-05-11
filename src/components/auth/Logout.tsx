"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ApiResponse } from "@/interfaces";
import { useInitSession } from "@/store/useSession";
import { callApi } from "@/lib/helpers";

export default function LogoutPage() {
  const router = useRouter();
  const actions = useInitSession((state) => state.actions);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const { error } = await callApi<ApiResponse>("/auth/sign-out");

        if (error) {
          toast.error("Logout Failed", {
            description: error.message || "Something went wrong.",
          });
        } else {
          actions.clearSession();
          toast.success("Logged Out", {
            description: "You have been successfully logged out.",
          });
          router.replace("/signin");
        }
      } catch (err) {
        toast.error("Logout Failed", {
          description:
            err instanceof Error
              ? err.message
              : "An unexpected error occurred during logout.",
        });
      }
    };

    handleLogout();
  }, [router, actions]);

  return (
    <div className="text-center">
      <p className="text-gray-600 mb-4">Processing your logout request...</p>
      <Button
        disabled
        className="w-full bg-[#509999] hover:cursor-pointer text-white font-semibold py-2 rounded cursor-not-allowed"
      >
        Logging Out...
      </Button>
    </div>
  );
}
