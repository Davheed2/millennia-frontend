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
import { Label } from "@/components/ui/label";

export default function Signup() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background image with blur effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
          alt="Financial background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 backdrop-blur-md bg-background/50"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto py-12">
          <div className="max-w-md mx-auto glass-card p-8 shadow-xl">
            <h1 className="heading-lg mb-6 text-center">
              Create your Investo account
            </h1>

            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Enter your email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
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
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="flex items-center text-sm">
                <input type="checkbox" id="terms" className="mr-2" />
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

              <Button className="w-full bg-invest hover:bg-invest-secondary text-white">
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p>
                Already have an account?{" "}
                <Link href="/signin" className="text-invest hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
