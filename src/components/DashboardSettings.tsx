"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiResponse } from "@/interfaces";
import { useInitSession } from "@/store/useSession";
import { callApi } from "@/lib/helpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { LogOut, Trash2, AlertCircle } from "lucide-react";

export default function DashboardSettings() {
  const router = useRouter();
  const actions = useInitSession((state) => state.actions);

  const handleDeleteAccount = async () => {
    try {
      const { error } = await callApi<ApiResponse>("/user/delete-account");

      if (error) {
        toast.error("Account deletion Failed", {
          description: error.message || "Something went wrong.",
        });
      } else {
        actions.clearSession();
        toast.success("Account Deleted", {
          description: "Your account has been successfully deleted.",
        });
        router.push("/");
      }
    } catch (err) {
      toast.error("Account deletion Failed", {
        description:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during account deletion.",
      });
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await callApi<ApiResponse>("/auth/sign-out");

      if (error) {
        toast.error("Logout Failed", {
          description: error.message || "Something went wrong.",
        });
      } else {
        actions.clearSession();
        toast.success("Logging Out", {
          description:
            "You have been successfully logged out from all sessions.",
        });
        //router.push("/");
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

  return (
    <>
      <div className="flex justify-between items-center mb-6 mt-16 lg:mt-0">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
            <CardDescription>Manage your account status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Account Status</p>
                  <p className="text-xs text-gray-500">
                    Your account is currently active
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  Active
                </Badge>
              </div>

              <Separator />

              <div>
                <Button
                  variant="outline"
                  className="w-full mb-4 flex items-center justify-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out of All Devices
                </Button>

                <div className="rounded-md border border-red-200 p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">
                        Delete Account
                      </p>
                      <p className="text-xs text-red-700 mt-1">
                        This action is permanent and cannot be undone. All of
                        your data will be permanently removed.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleDeleteAccount}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
