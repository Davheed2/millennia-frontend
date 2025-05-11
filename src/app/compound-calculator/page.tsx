import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompoundInterestCalculator from "@/components/CompoundCalculator";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Compound Interest Calculator | Millennia Trades",
    content:
      "Visualize the power of compounding on your investments with our Compound Interest Calculator. Plan your financial future with confidence using Millennia Trades' free, easy-to-use tool.",
    url: "https://millenniatrades.com/compound-calculator",
  });
};

export default function CompoundInterestCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-xl mb-6">Compound Interest Calculator</h1>
          <p className="text-lg mb-8">
            See how your investments can grow over time with the power of
            compound interest. This calculator helps you visualize the potential
            growth of your investments based on your initial deposit, regular
            contributions, time horizon, and expected rate of return.
          </p>

          <CompoundInterestCalculator />

          <div className="mt-16 p-6 bg-invest-light rounded-lg">
            <h2 className="heading-md mb-4">Understanding Compound Interest</h2>
            <p className="mb-4">
              Compound interest is the interest calculated on the initial
              principal and on the accumulated interest over previous periods.
              It&apos;s often described as &quot;interest on interest,&quot; and
              it&apos;s one of the most powerful concepts in investing.
            </p>
            <p className="mb-4">
              The longer you let your investments grow, the more dramatic the
              compounding effect becomes. This is why starting to invest early
              is so important for building wealth over time.
            </p>
            <p>
              Remember that this calculator provides estimates based on a
              constant rate of return. Actual investment returns will vary over
              time, and past performance is not indicative of future results.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
