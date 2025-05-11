"use client";

import { FormErrorMessage } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type ForgotPasswordType,
  zodValidator,
} from "@/lib/validators/validateWithZod";
import { callApi } from "@/lib/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ApiResponse } from "@/interfaces";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ForgotPasswordPage = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(zodValidator("forgotPassword")!),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordType) => {
    const { data: responseData, error } = await callApi<ApiResponse>(
      "/auth/password/forgot",
      {
        email: data.email.trim(),
      }
    );

    if (error) {
      toast.error("Error", {
        description: error.message,
      });
    } else {
      toast.success("Success", {
        description:
          responseData?.message || "Password reset link sent to your email.",
      });
      reset();
      router.push(
        `/forgot-password/sent?email=${encodeURIComponent(
          data.email.toLowerCase()
        )}`
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-sm sm:max-w-md p-4 sm:p-6 md:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">
            Forgot Password
          </h1>
          <p className="text-center text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            Reset your password. Follow the instructions on this page to get
            your account back!
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("email")}
                autoFocus
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`mt-1 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-xs sm:placeholder:text-sm ${
                  errors.email && "border-red-500 ring-2 ring-red-500"
                }`}
              />
              {errors.email?.message && (
                <FormErrorMessage
                  error={errors}
                  errorMsg={errors.email.message}
                />
              )}
            </div>

            <Button
              disabled={isSubmitting}
              className="w-full bg-invest hover:bg-invest-secondary text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>

          <div className="flex justify-between mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
            <div />
            <Link href="/signin" className="text-invest hover:underline">
              Back to sign in page
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
