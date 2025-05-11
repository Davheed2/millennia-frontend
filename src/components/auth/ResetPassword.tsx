"use client";

import { FormErrorMessage } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiResponse } from "@/interfaces";
import {
  checkPasswordStrength,
  type ResetPasswordType,
  zodValidator,
} from "@/lib/validators/validateWithZod";
import { callApi } from "@/lib/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EyeOff, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ResetPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const queryToken = new URLSearchParams(window.location.search).get("token");
    setToken(queryToken);
  }, []);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(zodValidator("resetPassword")!),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const password = watch("password", "");
  const deferredPassword = useDeferredValue(password);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  useEffect(() => {
    const checkStrength = async () => {
      if (deferredPassword) {
        const strength = await checkPasswordStrength(deferredPassword);
        setPasswordStrength(strength);
      }
    };
    checkStrength().catch(() => {});
  }, [deferredPassword]);

  const onSubmit = async (data: ResetPasswordType) => {
    if (!token) {
      toast.error("Request Failed", {
        description:
          "No reset token provided. Please use the link from your email.",
      });
      return;
    }

    const { data: responseData, error } = await callApi<ApiResponse>(
      "/auth/password/reset",
      {
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }
    );

    if (error) {
      toast.error("Error", { description: error.message });
    } else {
      toast.success("Success", {
        description: responseData?.message || "Password reset successful!",
      });
      router.push("/reset-password/success");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-sm sm:max-w-md sm:p-6 md:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">
            Reset Password
          </h1>
          <p className="text-center text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            Set a new password for your account
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-5"
          >
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a new password"
                  className={cn(
                    "w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-xs sm:placeholder:text-sm",
                    errors.password && "border-red-500 ring-2 ring-red-500"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <EyeClosed className="h-4 w-4" />
                  )}
                </button>
              </div>
              {password.length > 0 && (
                <FormErrorMessage
                  isForPasswordStrength
                  result={passwordStrength}
                />
              )}
              {errors.password?.message && (
                <FormErrorMessage
                  error={errors}
                  errorMsg={errors.password.message}
                />
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  className={cn(
                    "w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-xs sm:placeholder:text-sm",
                    errors.confirmPassword &&
                      "border-red-500 ring-2 ring-red-500"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <EyeClosed className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword?.message && (
                <FormErrorMessage
                  error={errors}
                  errorMsg={errors.confirmPassword.message}
                />
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-invest hover:bg-invest-secondary text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
