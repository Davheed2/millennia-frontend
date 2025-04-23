"use client";

//import { useState } from "react";
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
//import { useToast } from "@/hooks/use-toast";
// import { useAuth } from "@/contexts/AuthContext";

export default function Settings() {
  //const { logout } = useAuth();
  //const { toast } = useToast();

  const handleDeleteAccount = () => {
    // In a real app, this would open a confirmation modal first
    // toast({
    //   title: "Account deletion requested",
    //   description: "We'll send you an email with further instructions",
    //   variant: "destructive",
    // });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
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
                  //onClick={logout}
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
