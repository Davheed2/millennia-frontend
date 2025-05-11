"use client";

import Success from "../common/Success";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ForgotPasswordSent() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const queryEmail = new URLSearchParams(window.location.search).get("email");
    setEmail(queryEmail);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-0 p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-sm pt-0 sm:max-w-md p-4 sm:p-6 md:p-8">
          <Success
            description={`We've sent a password reset link to ${
              email || "your email"
            }. Please check your inbox or spam folder.`}
            classNames={{
              description: "text-gray-600 text-xs sm:text-sm",
              wrapper: "w-full",
            }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
              <p className="mb-2 sm:mb-0">
                Didn&apos;t receive the email?{" "}
                <Link
                  href="/forgot-password"
                  className="text-invest hover:underline"
                >
                  Try again
                </Link>
              </p>
              <Link href="/signin" className="text-invest hover:underline">
                Back to sign in
              </Link>
            </div>
          </Success>
        </div>
      </div>
      <Footer />
    </div>
  );
}
