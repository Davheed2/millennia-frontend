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
//     <div className="min-h-screen flex flex-col relative">
//       {/* Background image with blur effect */}
//       <div className="absolute inset-0 z-0">
//         <Image
//           src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
//           alt="Financial background"
//           fill
//           className="object-cover"
//           priority
//           quality={100}
//         />
//         <div className="absolute inset-0 backdrop-blur-md bg-background/50"></div>
//       </div>

//       <div className="relative z-10 flex flex-col min-h-screen">
//         <Navbar />
//         <main className="flex-grow container mx-auto py-12">
//           <div className="max-w-md mx-auto glass-card p-8 shadow-xl">
//             <h1 className="heading-lg mb-6 text-center">Create your account</h1>

//             <form className="space-y-4">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   {/* <Label htmlFor="firstName">First Name</Label> */}
//                   {/* <Input id="firstName" placeholder="First name" /> */}
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
//                     htmlFor="firstName"
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
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="email"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   Email Address <span className="text-red-500">*</span>
//                 </label>
//                 <Input
//                   type="email"
//                   id="email"
//                   aria-label="Email address"
//                   placeholder="Email Address"
//                   className={`min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="phone"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   Phone <span className="text-red-500">*</span>
//                 </label>
//                 <Input
//                   type="text"
//                   id="phone"
//                   aria-label="Phone Number"
//                   placeholder="Phone Number"
//                   className={`min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">
//                   Country <span className="text-red-500">*</span>
//                 </label>
//                 <Select>
//                   <SelectTrigger className="w-full min-h-[45px] border-gray-300 focus:ring-blue-500 hover:cursor-pointer">
//                     <SelectValue placeholder="Select your country" />
//                   </SelectTrigger>
//                   <SelectContent
//                     position="popper"
//                     className="max-h-60 overflow-y-auto z-50 bg-white shadow-md border border-gray-300 rounded-md w-full"
//                   >
//                     <SelectItem value="us">United States</SelectItem>
//                     <SelectItem value="ca">Canada</SelectItem>
//                     <SelectItem value="uk">United Kingdom</SelectItem>
//                     <SelectItem value="au">Australia</SelectItem>
//                     <SelectItem value="de">Germany</SelectItem>
//                     <SelectItem value="fr">France</SelectItem>
//                     <SelectItem value="jp">Japan</SelectItem>
//                     <SelectItem value="cn">China</SelectItem>
//                     <SelectItem value="in">India</SelectItem>
//                     <SelectItem value="br">Brazil</SelectItem>
//                     <SelectItem value="other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="name"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   Password<span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     aria-label="Password"
//                     placeholder="password"
//                     className={`min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-3 flex items-center text-gray-500"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <EyeClosed className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="name"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   Confirm Password<span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <Input
//                     //type="password"
//                     type={showConfirmPassword ? "text" : "password"}
//                     id="confirmPassword"
//                     aria-label="confirmPassword"
//                     placeholder="Confirm Password"
//                     className={`min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute inset-y-0 right-3 flex items-center text-gray-500"
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <EyeClosed className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <div className="flex items-center text-sm">
//                 <input type="checkbox" id="terms" className="mr-2" />
//                 <label htmlFor="terms">
//                   I agree to the{" "}
//                   <Link href="/terms" className="text-invest hover:underline">
//                     Terms of Service
//                   </Link>{" "}
//                   and{" "}
//                   <Link href="/privacy" className="text-invest hover:underline">
//                     Privacy Policy
//                   </Link>
//                 </label>
//               </div>

//               <Button className="w-full bg-invest hover:bg-invest-secondary text-white">
//                 Create Account
//               </Button>
//             </form>

//             <div className="mt-6 text-center">
//               <p>
//                 Already have an account?{" "}
//                 <Link href="/signin" className="text-invest hover:underline">
//                   Sign in
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { EyeOff, EyeClosed } from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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
                    className={`min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
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
                    className={`min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
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
                    className={`min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    id="phone"
                    aria-label="Phone Number"
                    placeholder="Phone Number"
                    className={`min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <Select>
                    <SelectTrigger className="w-full min-h-[45px] border-gray-300 focus:ring-blue-500 hover:cursor-pointer">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="max-h-60 overflow-y-auto z-50 bg-white shadow-md border border-gray-300 rounded-md w-full"
                    >
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="cn">China</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="br">Brazil</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
                      className={`min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
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
                      className={`min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
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
