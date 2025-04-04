"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-invest to-invest-accent">
            <div className="absolute inset-1 rounded-full bg-background flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-gradient-to-br from-invest to-invest-accent"></div>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <button className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors">
              Invest <ChevronDown size={16} />
            </button>
            <div className="absolute top-full left-0 mt-1 w-48 p-2 bg-background rounded-md shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                href="/stocks-etfs"
                className="block px-3 py-2 rounded-md hover:bg-muted transition-colors"
              >
                Stocks & ETFs
              </Link>
              <Link
                href="/cryptocurrency"
                className="block px-3 py-2 rounded-md hover:bg-muted transition-colors"
              >
                Cryptocurrency
              </Link>
              <Link
                href="/real-estate"
                className="block px-3 py-2 rounded-md hover:bg-muted transition-colors"
              >
                Real Estate
              </Link>
              <Link
                href="/retirement"
                className="block px-3 py-2 rounded-md hover:bg-muted transition-colors"
              >
                Retirement
              </Link>
            </div>
          </div>
          <Link
            href="/about"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/pricing"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/resources"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Resources
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/signin">
            <Button variant="outline" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              className="bg-invest hover:bg-invest-secondary text-white"
              size="sm"
            >
              Sign up
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden rounded-md p-2 hover:bg-muted transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="container py-4 flex flex-col space-y-4">
            <div className="py-2 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <span>Invest</span>
                <ChevronDown size={16} />
              </div>
              <div className="pl-4 mt-2 flex flex-col space-y-2">
                <Link href="/stocks-etfs" className="py-1">
                  Stocks & ETFs
                </Link>
                <Link href="/cryptocurrency" className="py-1">
                  Cryptocurrency
                </Link>
                <Link href="/real-estate" className="py-1">
                  Real Estate
                </Link>
                <Link href="/retirement" className="py-1">
                  Retirement
                </Link>
              </div>
            </div>
            <Link href="/about" className="py-2 border-b border-gray-200">
              About
            </Link>
            <Link href="/pricing" className="py-2 border-b border-gray-200">
              Pricing
            </Link>
            <Link href="/resources" className="py-2 border-b border-gray-200">
              Resources
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Link href="/signin">
                <Button variant="outline" className="w-full">
                  Sign in
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="w-full bg-invest hover:bg-invest-secondary text-white">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
