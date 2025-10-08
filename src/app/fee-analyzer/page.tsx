import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InvestmentFeeAnalyzer from "@/components/InvestmentFeeAnalyzer";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Investment Fee Analyzer | Millennia Trades",
    content:
      "Use our Investment Fee Analyzer to understand how management fees and expense ratios can affect your long-term investment returns. Discover low-cost investing with Millennia Trades.",
    url: "https://milleniatrades.com/tools/fee-analyzer",
  });
};

export default function InvestmentFeeAnalyzerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-xl mb-6">Investment Fee Analyzer</h1>
          <p className="text-lg mb-8">
            Understand how fees affect your long-term investment returns. Small
            differences in investment fees can have a significant impact on your
            portfolio value over time. Use this calculator to see how fees might
            affect your investment growth.
          </p>

          <InvestmentFeeAnalyzer />

          <div className="mt-16 p-6 bg-invest-light rounded-lg">
            <h2 className="heading-md mb-4">Understanding Investment Fees</h2>
            <p className="mb-4">
              Investment fees can significantly impact your long-term returns.
              Even a small difference in fees can compound over time,
              potentially reducing your retirement savings by tens or even
              hundreds of thousands of dollars.
            </p>
            <p className="mb-4">Common investment fees include:</p>
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2">Expense ratios on mutual funds and ETFs</li>
              <li className="mb-2">Advisory or management fees</li>
              <li className="mb-2">Transaction costs and trading fees</li>
              <li className="mb-2">Account maintenance fees</li>
              <li className="mb-2">Front-end or back-end load fees</li>
            </ul>
            <p>
              At Millennia Trades, we believe in transparent, low-cost
              investing. Our platform offers access to low-fee investment
              options to help maximize your returns over time.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
