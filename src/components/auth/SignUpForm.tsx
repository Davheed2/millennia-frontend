"use client";

import React, { useEffect, useState, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { EyeOff, EyeClosed, Check, ChevronsUpDown } from "lucide-react";
import countries from "world-countries";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { useSession } from "@/store";
import { ApiResponse } from "@/interfaces";
import { callApi } from "@/lib/helpers";
import { toast } from "sonner";
import { SessionData } from "@/interfaces/ApiResponse";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpType, zodValidator } from "@/lib/validators/validateWithZod";
import { FormErrorMessage } from "../common";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

// Create a separate component for the content that needs useSearchParams
function SignUpContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [phoneCountryOpen, setPhoneCountryOpen] = useState(false);
  const router = useRouter();
  const { user } = useSession((state) => state);

  // Import useSearchParams here - this will be wrapped in Suspense
  const searchParams = useSearchParams();
  const referrerCode = searchParams.get("ref");

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpType>({
    resolver: zodResolver(zodValidator("signup")!),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<SignUpType> = async (data: SignUpType) => {
    try {
      setIsLoading(true);
      const payload: {
        email: string;
        password: string;
        phone: string;
        country: string;
        firstName: string;
        lastName: string;
        referrerCode?: string;
      } = {
        email: data.email,
        password: data.password,
        phone: data.phone,
        country: data.country,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      // Only add referrerCode if it exists
      if (referrerCode) {
        payload.referrerCode = referrerCode;
      }

      const { data: responseData, error } = await callApi<
        ApiResponse<SessionData>
      >("/auth/sign-up", payload);

      if (error) {
        throw new Error(error.message);
      }

      if (responseData?.data) {
        toast.success("Registration successful!", {
          description: "Check your email or spam to complete verification.",
        });

        const firstUser = responseData.data[0];
        if (!firstUser) {
          throw new Error("User data not found");
        }

        //updateUser({ user: firstUser });
        router.push("/signup/success");
      }
    } catch (err) {
      toast.error("Registration Failed", {
        description:
          err instanceof Error ? err.message : "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  // Format countries for selection with proper flag code
  const formattedCountries = countries
    .map((country) => ({
      value: country.cca2.toLowerCase(),
      label: country.name.common,
      flagCode: country.cca2.toLowerCase(),
      dialCode: country.idd.root + (country.idd.suffixes?.[0] || ""),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // Default country selection
  const [selectedCountry, setSelectedCountry] = useState(
    formattedCountries.find((c) => c.value === "us") || formattedCountries[0]
  );

  // Default country for phone
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState(
    formattedCountries.find((c) => c.value === "us") || formattedCountries[0]
  );

  return (
    <div className="max-w-5xl mx-auto rounded-xl overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-2">Create a new account</h1>
          <p className="text-gray-600 text-sm mb-6">
            Kindly enter your personal details to create your account
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("firstName")}
                type="text"
                autoFocus
                id="firstName"
                aria-label="First Name"
                placeholder="First Name"
                className={`min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm ${
                  errors.firstName && "border-red-500 ring-2 ring-red-500"
                }`}
              />
              {errors.firstName && (
                <FormErrorMessage
                  error={errors.firstName}
                  errorMsg={errors.firstName.message}
                />
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("lastName")}
                type="text"
                id="lastName"
                aria-label="Last Name"
                placeholder="Last Name"
                className={`min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm ${
                  errors.lastName && "border-red-500 ring-2 ring-red-500"
                }`}
              />
              {errors.lastName && (
                <FormErrorMessage
                  error={errors.lastName}
                  errorMsg={errors.lastName.message}
                />
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
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
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <Popover
                  open={phoneCountryOpen}
                  onOpenChange={setPhoneCountryOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={phoneCountryOpen}
                      className={`min-h-[45px] w-[120px] justify-between border-gray-300 mr-1 bg-[#F8F8F8] focus:border-blue-500 focus:ring-blue-500`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`fi fi-${selectedPhoneCountry.flagCode} h-4 w-6 rounded-sm object-cover`}
                        ></span>
                        <span>{selectedPhoneCountry.dialCode}</span>
                      </div>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[250px] p-0">
                    <Command>
                      <CommandInput placeholder="Search countries..." />
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandList className="max-h-[300px]">
                        <CommandGroup>
                          {formattedCountries.map((country) => (
                            <CommandItem
                              key={country.value}
                              value={country.label + country.dialCode}
                              onSelect={() => {
                                setSelectedPhoneCountry(country);
                                setPhoneCountryOpen(false);
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className={`fi fi-${country.flagCode} h-4 w-6 rounded-sm object-cover`}
                                ></span>
                                <span>{country.label}</span>
                                <span className="text-gray-500 ml-auto">
                                  {country.dialCode}
                                </span>
                              </div>
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  selectedPhoneCountry.value === country.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Input
                  {...register("phone")}
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  aria-label="Phone Number"
                  placeholder="Phone Number"
                  className={`min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm flex-1 ${
                    errors.phone && "border-red-500 ring-2 ring-red-500"
                  }`}
                />
              </div>
              {errors.phone && (
                <FormErrorMessage
                  error={errors.phone}
                  errorMsg={errors.phone.message}
                />
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Country <span className="text-red-500">*</span>
              </label>
              <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={countryOpen}
                    className={`min-h-[45px] w-full justify-between border-gray-300 ${
                      errors.country && "border-red-500 ring-2 ring-red-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`fi fi-${selectedCountry.flagCode} h-4 w-6 rounded-sm object-cover`}
                      ></span>
                      <span className="">{selectedCountry.label}</span>
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search countries..." />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandList className="max-h-[300px]">
                      <CommandGroup>
                        {formattedCountries.map((country) => (
                          <CommandItem
                            key={country.value}
                            value={country.label}
                            onSelect={() => {
                              setSelectedCountry(country);
                              setCountryOpen(false);
                              setValue("country", country.label, {
                                shouldValidate: true,
                              });
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`fi fi-${country.flagCode} h-4 w-6 rounded-sm object-cover`}
                              ></span>
                              <span>{country.label}</span>
                            </div>
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedCountry.value === country.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
                {errors.country && (
                  <FormErrorMessage
                    error={errors.country}
                    errorMsg={errors.country.message}
                  />
                )}
              </Popover>
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

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  aria-label="confirmPassword"
                  placeholder="Confirm Password"
                  className={`min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm ${
                    errors.confirmPassword &&
                    "border-red-500 ring-2 ring-red-500"
                  }`}
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
              {errors.confirmPassword && (
                <FormErrorMessage
                  error={errors.confirmPassword}
                  errorMsg={errors.confirmPassword.message}
                />
              )}
            </div>

            <div className="flex flex-col text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="mr-2"
                  {...register("isTerms", {
                    required: "You must agree to the terms and conditions",
                  })}
                />
                <label htmlFor="terms">
                  I agree to the{" "}
                  <Link href="/terms" className="text-invest hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-invest hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.isTerms && (
                <FormErrorMessage
                  error={errors.isTerms}
                  errorMsg={errors.isTerms.message}
                />
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-invest hover:bg-invest-secondary text-white"
            >
              {isSubmitting || isLoading ? "Creating..." : "Create Account"}
            </Button>

            <div className="text-center pt-2">
              <p className="text-sm">
                Already have an account?{" "}
                <Link href="/signin" className="text-invest hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="md:w-1/2 relative">
          <Image
            src="https://images.unsplash.com/photo-1679583721525-658d164e609b?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Waal street"
            fill
            className="object-cover h-full"
            priority
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}

// Loading component for Suspense
function SignUpLoading() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-invest"></div>
    </div>
  );
}

// Main component with Suspense boundary
const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <Suspense fallback={<SignUpLoading />}>
          <SignUpContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;

SignUp.protect = true;
