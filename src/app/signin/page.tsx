// "use client";

// import React from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";
// import { Input } from "@/components/ui/input";
// import { EyeOff, EyeClosed } from "lucide-react";

// export default function Login() {
//   const [showPassword, setShowPassword] = React.useState(false);

//   return (
//     <div className="min-h-screen flex flex-col relative">
//       {/* Background image with blur effect */}
//       <div className="absolute inset-0 z-0">
//         <Image
//           src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2070&auto=format&fit=crop"
//           alt="Investment background"
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
//             <h1 className="heading-lg mb-6 text-center">
//               Sign in to your account
//             </h1>

//             <form className="space-y-4">
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

//               <div className="flex justify-between items-center text-sm">
//                 <div className="flex items-center">
//                   <input type="checkbox" id="remember" className="mr-2" />
//                   <label htmlFor="remember">Remember me</label>
//                 </div>
//                 <Link
//                   href="/forgot-password"
//                   className="text-invest hover:underline"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>

//               <Button className="w-full bg-invest hover:bg-invest-secondary text-white">
//                 Sign in
//               </Button>
//             </form>

//             <div className="mt-6 text-center">
//               <p>
//                 Don&apos;t have an account?{" "}
//                 <Link href="/signup" className="text-invest hover:underline">
//                   Sign up
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
import { Input } from "@/components/ui/input";
import { EyeOff, EyeClosed } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

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

              <form className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address <span className="text-red-500">*</span>
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

                <Button className="w-full bg-invest hover:bg-invest-secondary text-white">
                  Sign in
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
}
