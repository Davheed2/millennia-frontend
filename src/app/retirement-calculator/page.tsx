import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RetirementCalculator from "@/components/RetirementCalculator";

export default function RetirementCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-xl gradient-text mb-6">
            Retirement Calculator
          </h1>
          <p className="text-lg mb-8">
            Plan for your future with our retirement calculator. Estimate how
            much you need to save monthly to reach your retirement goals based
            on your current age, retirement age, and desired income.
          </p>

          <RetirementCalculator />

          <div className="mt-16 p-6 bg-invest-light rounded-lg">
            <h2 className="heading-md mb-4">
              Understanding Your Retirement Needs
            </h2>
            <p className="mb-4">
              Planning for retirement is one of the most important financial
              decisions you&apos;ll make. Our calculator helps you understand
              how much you need to save each month to achieve your retirement
              goals.
            </p>
            <p className="mb-4">
              The calculator takes into account your current age, retirement
              age, current savings, expected return on investments, and desired
              retirement income. It uses these inputs to calculate how much you
              need to save monthly to reach your goal.
            </p>
            <p>
              Remember that this is just an estimate. For a more personalized
              retirement plan, consider speaking with one of our financial
              advisors who can help you create a comprehensive retirement
              strategy.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
