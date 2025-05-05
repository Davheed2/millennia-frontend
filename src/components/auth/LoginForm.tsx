"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { EyeOff, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/store";
import { ApiResponse } from "@/interfaces";
import { callApi } from "@/lib/helpers";
import { toast } from "sonner";
import { SessionData } from "@/interfaces/ApiResponse";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginType, zodValidator } from "@/lib/validators/validateWithZod";
import { FormErrorMessage } from "../common";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { user } = useSession((state) => state);

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  const {
    actions: { updateUser },
  } = useSession((state) => state);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(zodValidator("login")!),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginType> = async (data: LoginType) => {
    try {
      setIsLoading(true);
      const { data: responseData, error } = await callApi<
        ApiResponse<SessionData>
      >("/auth/sign-in", {
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (responseData?.data) {
        toast.success("Sign in successful!", {
          description: "Successfully signed in.",
        });

        const firstUser = responseData.data[0];
        if (!firstUser) {
          throw new Error("User data not found");
        }

        updateUser({ user: firstUser });
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error("Sign In Failed", {
        description:
          err instanceof Error ? err.message : "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="max-w-5xl mx-auto rounded-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <h1 className="text-2xl font-bold mb-2">
                Sign in to your account
              </h1>
              <p className="text-gray-600 text-sm mb-6">
                Kindly enter your personal details to sign in
              </p>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    {...register("email")}
                    type="email"
                    id="email"
                    aria-label="Email address"
                    placeholder="Email Address"
                    className={`min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm ${
                      errors.email && "border-red-500 ring-2 ring-red-500"
                    }`}
                  />
                  {errors.email && (
                    <FormErrorMessage
                      error={errors.email}
                      errorMsg={errors.email.message}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      aria-label="Password"
                      placeholder="Password"
                      className={`min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm ${
                        errors.password && "border-red-500 ring-2 ring-red-500"
                      }`}
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
                  {errors.password && (
                    <FormErrorMessage
                      error={errors.password}
                      errorMsg={errors.password.message}
                    />
                  )}
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <input type="checkbox" id="remember" className="mr-2" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-invest hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full bg-invest hover:bg-invest-secondary text-white"
                >
                  {isSubmitting || isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="text-center pt-2">
                  <p className="text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-invest hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            <div className="md:w-1/2 relative">
              <Image
                src="https://images.unsplash.com/photo-1679583721525-658d164e609b?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Wall street"
                fill
                className="object-cover h-full"
                priority
                quality={100}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

Login.protect = true;
