"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { callApi } from "@/lib/helpers";
import { ApiResponse } from "@/interfaces";
import { SessionData } from "@/interfaces/ApiResponse";

export default function VerifyAccount() {
  const searchParams = useSearchParams();
  const verifyToken = searchParams.get("verify");
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const router = useRouter();

  useEffect(() => {
    const verifyAccount = async () => {
      if (!verifyToken) {
        setVerificationStatus("error");
        return;
      }

      try {
        const { data: responseData, error } = await callApi<
          ApiResponse<SessionData>
        >(`/auth/verify-account?verificationToken=${verifyToken}`);

        if (error) {
          throw new Error(error.message);
        }

        if (responseData?.status === "success") {
          setVerificationStatus("success");
          toast.success("Account verified successfully", {
            description: "You can now log in to your account",
          });
        }
      } catch (err) {
        setVerificationStatus("error");
        toast.error("Verification failed", {
          description:
            err instanceof Error
              ? err.message
              : "Unable to verify your account. Please try again.",
        });
      }
    };

    verifyAccount();
  }, [verifyToken]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 glass-card">
        {verificationStatus === "loading" && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-invest mx-auto"></div>
            <h2 className="mt-4 heading-md">Verifying your account...</h2>
            <p className="mt-2 text-gray-600">
              Please wait while we verify your email address.
            </p>
          </div>
        )}

        {verificationStatus === "success" && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <AlertTitle className="text-green-800">
              Account Verified!
            </AlertTitle>
            <AlertDescription className="text-green-700 mt-2">
              Your account has been successfully verified. You can now log in to
              access your account.
            </AlertDescription>
            <Button
              onClick={() => router.push("/sigin")}
              className="w-full mt-4 bg-invest hover:bg-invest-secondary text-white"
            >
              Continue to Login
            </Button>
          </Alert>
        )}

        {verificationStatus === "error" && (
          <Alert variant="destructive">
            <XCircle className="h-5 w-5" />
            <AlertTitle>Verification Failed</AlertTitle>
            <AlertDescription className="mt-2">
              We couldn&apos;t verify your account. The verification link may be
              invalid or expired.
            </AlertDescription>
            <div className="flex gap-4 mt-4">
              <Button
                onClick={() => router.push("/signup")}
                variant="outline"
                className="flex-1"
              >
                Sign Up Again
              </Button>
              <Button
                onClick={() => router.push("/contact")}
                className="flex-1 bg-invest hover:bg-invest-secondary text-white"
              >
                Contact Support
              </Button>
            </div>
          </Alert>
        )}
      </div>
    </div>
  );
}

// Wrap the component with Suspense if needed
VerifyAccount.getLayout = function getLayout(page: React.ReactNode) {
  return <Suspense fallback={<div>Loading...</div>}>{page}</Suspense>;
};
