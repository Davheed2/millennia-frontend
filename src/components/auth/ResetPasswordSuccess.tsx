"use client";

import Success from "../common/Success";
import Link from "next/link";
import { Button } from "../ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ResetPasswordSuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-sm sm:max-w-mdp-4 sm:p-6 md:p-8">
          <Success
            classNames={{
              description: "text-gray-600 text-xs sm:text-sm",
              wrapper: "w-full",
            }}
            description="Your password has been successfully reset."
          >
            <div className="mt-4 sm:mt-6">
              <Link href="/signin" className="w-full block">
                <Button className="w-full bg-invest hover:bg-invest-secondary text-white">
                  Sign in to continue
                </Button>
              </Link>
            </div>
          </Success>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPasswordSuccessPage;
