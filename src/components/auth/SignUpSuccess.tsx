"use client";

import React from "react";
import dynamic from "next/dynamic"; // Import dynamic for disabling SSR
import successAnimation from "../../../public/assets/lottie/success.json"; // Your Lottie JSON
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const SignUpSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center space-y-6">
        <div className="w-60 h-40 mx-auto">
          <Lottie animationData={successAnimation} loop={false} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          Account Created Successfully!
        </h1>
        <p className="text-gray-600 text-sm">
          Your account has been created. Please check your email to complete the
          verification process.
        </p>
        <p className="text-xs text-gray-500">
          Didn&apos;t see the email? Be sure to check your{" "}
          <span className="font-semibold">Spam</span> or{" "}
          <span className="font-semibold">Promotions</span> folder.
        </p>
        <Link href="/signin">
          <Button className="bg-invest hover:bg-invest-secondary text-white w-full my-7">
            Back to Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SignUpSuccess;
