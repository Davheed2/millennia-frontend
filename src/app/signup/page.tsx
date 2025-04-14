"use client";

import React, { useState } from "react";
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

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [phoneCountryOpen, setPhoneCountryOpen] = useState(false);

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="max-w-5xl mx-auto rounded-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <h1 className="text-2xl font-bold mb-2">Create a new account</h1>
              <p className="text-gray-600 text-sm mb-6">
                Kindly enter your personal details to create your account
              </p>

              <form className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    autoFocus
                    id="firstName"
                    aria-label="First Name"
                    placeholder="First Name"
                    className="min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    id="lastName"
                    aria-label="Last Name"
                    placeholder="Last Name"
                    className="min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    id="email"
                    aria-label="Email address"
                    placeholder="Email Address"
                    className="min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm"
                  />
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
                          className="min-h-[45px] w-[120px] justify-between border-gray-300 mr-1 bg-[#F8F8F8] focus:border-blue-500 focus:ring-blue-500"
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
                                      selectedPhoneCountry.value ===
                                        country.value
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
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      aria-label="Phone Number"
                      placeholder="Phone Number"
                      className="min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm flex-1"
                    />
                  </div>
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
                        className="min-h-[45px] w-full justify-between border-gray-300"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`fi fi-${selectedCountry.flagCode} h-4 w-6 rounded-sm object-cover`}
                          ></span>
                          <span>{selectedCountry.label}</span>
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
                      type={showPassword ? "text" : "password"}
                      id="password"
                      aria-label="Password"
                      placeholder="Password"
                      className="min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm"
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
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      aria-label="confirmPassword"
                      placeholder="Confirm Password"
                      className="min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <EyeClosed className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <input type="checkbox" id="terms" className="mr-2" />
                  <label htmlFor="terms">
                    I agree to the{" "}
                    <Link href="/terms" className="text-invest hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-invest hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button className="w-full bg-invest hover:bg-invest-secondary text-white">
                  Create Account
                </Button>

                <div className="text-center pt-2">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-invest hover:underline">
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
      </main>
      <Footer />
    </div>
  );
}

// "use client";

// import React from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { EyeOff, EyeClosed } from "lucide-react";

// export default function Signup() {
//   const [showPassword, setShowPassword] = React.useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow container mx-auto py-12">
//         <div className="max-w-5xl mx-auto rounded-xl overflow-hidden">
//           <div className="md:flex">
//             <div className="md:w-1/2 p-8">
//               <h1 className="text-2xl font-bold mb-2">Create a new account</h1>
//               <p className="text-gray-600 text-sm mb-6">
//                 Kindly enter your personal details to create your account
//               </p>

//               <form className="space-y-4">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="firstName"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     First Name <span className="text-red-500">*</span>
//                   </label>
//                   <Input
//                     type="text"
//                     autoFocus
//                     id="firstName"
//                     aria-label="First Name"
//                     placeholder="First Name"
//                     className={`min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="lastName"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Last Name <span className="text-red-500">*</span>
//                   </label>
//                   <Input
//                     type="text"
//                     id="lastName"
//                     aria-label="Last Name"
//                     placeholder="Last Name"
//                     className={`min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="email"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Email <span className="text-red-500">*</span>
//                   </label>
//                   <Input
//                     type="email"
//                     id="email"
//                     aria-label="Email address"
//                     placeholder="Email Address"
//                     className={`min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="phone"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Phone <span className="text-red-500">*</span>
//                   </label>
//                   <Input
//                     type="text"
//                     id="phone"
//                     aria-label="Phone Number"
//                     placeholder="Phone Number"
//                     className={`min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">
//                     Country <span className="text-red-500">*</span>
//                   </label>
//                   <Select>
//                     <SelectTrigger className="w-full min-h-[45px] border-gray-300 focus:ring-blue-500 hover:cursor-pointer">
//                       <SelectValue placeholder="Select your country" />
//                     </SelectTrigger>
//                     <SelectContent
//                       position="popper"
//                       className="max-h-60 overflow-y-auto z-50 bg-white shadow-md border border-gray-300 rounded-md w-full"
//                     >
//                       <SelectItem value="us">United States</SelectItem>
//                       <SelectItem value="ca">Canada</SelectItem>
//                       <SelectItem value="uk">United Kingdom</SelectItem>
//                       <SelectItem value="au">Australia</SelectItem>
//                       <SelectItem value="de">Germany</SelectItem>
//                       <SelectItem value="fr">France</SelectItem>
//                       <SelectItem value="jp">Japan</SelectItem>
//                       <SelectItem value="cn">China</SelectItem>
//                       <SelectItem value="in">India</SelectItem>
//                       <SelectItem value="br">Brazil</SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="password"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Password <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <Input
//                       type={showPassword ? "text" : "password"}
//                       id="password"
//                       aria-label="Password"
//                       placeholder="Password"
//                       className={`min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-3 flex items-center text-gray-500"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <EyeClosed className="h-4 w-4" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="confirmPassword"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Confirm Password <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <Input
//                       type={showConfirmPassword ? "text" : "password"}
//                       id="confirmPassword"
//                       aria-label="confirmPassword"
//                       placeholder="Confirm Password"
//                       className={`min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowConfirmPassword(!showConfirmPassword)
//                       }
//                       className="absolute inset-y-0 right-3 flex items-center text-gray-500"
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <EyeClosed className="h-4 w-4" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex items-center text-sm">
//                   <input type="checkbox" id="terms" className="mr-2" />
//                   <label htmlFor="terms">
//                     I agree to the{" "}
//                     <Link href="/terms" className="text-invest hover:underline">
//                       Terms of Service
//                     </Link>{" "}
//                     and{" "}
//                     <Link
//                       href="/privacy"
//                       className="text-invest hover:underline"
//                     >
//                       Privacy Policy
//                     </Link>
//                   </label>
//                 </div>

//                 <Button className="w-full bg-invest hover:bg-invest-secondary text-white">
//                   Create Account
//                 </Button>

//                 <div className="text-center pt-2">
//                   <p className="text-sm">
//                     Already have an account?{" "}
//                     <Link href="/login" className="text-invest hover:underline">
//                       Sign in
//                     </Link>
//                   </p>
//                 </div>
//               </form>
//             </div>
//             <div className="md:w-1/2 relative">
//               <Image
//                 src="https://images.unsplash.com/photo-1679583721525-658d164e609b?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 alt="Waal street"
//                 fill
//                 className="object-cover h-full"
//                 priority
//                 quality={100}
//               />
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }
