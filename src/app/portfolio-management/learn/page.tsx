"use client";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function LearnRebalancingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="heading-xl gradient-text mb-6">
            Learn About Portfolio Rebalancing & Optimization
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            Discover how automated strategies and smart optimization can improve
            your returns while keeping your risk profile in check.
          </p>

          <div className="grid gap-12 text-left">
            <section>
              <h2 className="text-2xl font-semibold mb-3">
                🔄 What is Portfolio Rebalancing?
              </h2>
              <p className="text-muted-foreground">
                Rebalancing is the process of realigning the weightings of your
                assets to maintain your desired allocation. It helps you manage
                risk and stay on track with your financial goals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                ⚡ Smart Optimization Techniques
              </h2>
              <p className="text-muted-foreground">
                We use advanced algorithms based on modern portfolio theory and
                factor investing to find the optimal asset mix for you —
                maximizing returns while minimizing unnecessary risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                🚀 Ready to take control?
              </h2>
              <p className="text-muted-foreground mb-6">
                Get started by logging into your dashboard where you can set
                preferences, simulate strategies, and manage your portfolio.
              </p>
              <Button
                onClick={() => router.push("/signin")}
                className="bg-invest hover:bg-invest-secondary text-white"
              >
                Login to Dashboard
              </Button>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
