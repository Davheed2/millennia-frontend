import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Getting Started with Investing | Millennia Trades",
    content:
      "A beginner-friendly guide to help you start your investment journey. Learn key investment concepts, build your first portfolio, and avoid common mistakes as you begin your path to financial growth.",
    url: "https://millenniatrades.com/resources/getting-started",
  });
};

export default function GettingStartedGuide() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/resources"
            className="flex items-center text-invest hover:text-invest-secondary mb-8"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Resources
          </Link>

          <h1 className="text-4xl font-bold mb-6">
            Getting Started with Investing
          </h1>
          <div className="mb-4">
            <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
              Beginner
            </span>
          </div>

          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              Investing can seem intimidating at first, but with the right
              knowledge and approach, anyone can start building wealth through
              investments. This guide will walk you through the fundamentals of
              investing, introduce key terminology, and help you build your
              first portfolio.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Why Should You Invest?
            </h2>
            <p className="text-base leading-relaxed mb-6">
              Investing is one of the most effective ways to build wealth over
              time. Unlike saving cash, which loses purchasing power due to
              inflation, investments have the potential to grow your money. Even
              modest returns can compound significantly over time.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Key Investment Concepts
            </h2>
            <h3 className="text-xl font-medium mt-6 mb-3">Risk and Return</h3>
            <p className="text-base leading-relaxed mb-6">
              Generally, higher potential returns come with higher risks.
              Understanding your own risk tolerance is essential to creating an
              investment strategy you can stick with.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">Diversification</h3>
            <p className="text-base leading-relaxed mb-6">
              Diversification involves spreading your investments across
              different asset classes to reduce overall portfolio risk. This
              means you won&apos;t have all your eggs in one basket if a
              particular sector or investment performs poorly.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">Compound Interest</h3>
            <p className="text-base leading-relaxed mb-6">
              Often called the &quot;eighth wonder of the world,&quot; compound
              interest is the process where the interest earned on your
              investment also earns interest over time. The longer your money
              compounds, the faster it can grow.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Types of Investment Accounts
            </h2>
            <h3 className="text-xl font-medium mt-6 mb-3">
              Retirement Accounts
            </h3>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">401(k) or 403(b):</strong>{" "}
                Employer-sponsored retirement plans with tax advantages.
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">
                  IRA (Traditional or Roth):
                </strong>{" "}
                Individual retirement accounts with different tax treatments.
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">Taxable Accounts</h3>
            <p className="text-base leading-relaxed mb-6">
              These are regular brokerage accounts without special tax
              advantages, but they offer more flexibility for accessing your
              money before retirement.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Building Your First Portfolio
            </h2>
            <p className="text-base leading-relaxed mb-6">
              A well-balanced starter portfolio typically includes:
            </p>
            <ol className="list-decimal pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Stocks:</strong> Ownership
                shares in companies that can provide growth.
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Bonds:</strong> Loans to
                companies or governments that typically provide steady income.
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Index Funds:</strong>{" "}
                Collections of stocks or bonds that track a market index.
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">
                  ETFs (Exchange-Traded Funds):
                </strong>{" "}
                Similar to index funds but traded like stocks.
              </li>
            </ol>

            <h3 className="text-xl font-medium mt-6 mb-3">
              The 3-Fund Portfolio Example
            </h3>
            <p className="text-base leading-relaxed mb-6">
              Many experts recommend starting with a simple three-fund
              portfolio:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                A total U.S. stock market index fund (e.g., VTI)
              </li>
              <li className="text-base leading-relaxed mb-2">
                A total international stock market index fund (e.g., VXUS)
              </li>
              <li className="text-base leading-relaxed mb-2">
                A total bond market index fund (e.g., BND)
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Getting Started: Step by Step
            </h2>
            <ol className="list-decimal pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">
                  Set clear financial goals
                </strong>{" "}
                (retirement, house down payment, education)
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">
                  Determine your time horizon
                </strong>{" "}
                (when you&apos;ll need the money)
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">
                  Assess your risk tolerance
                </strong>{" "}
                (conservative, moderate, aggressive)
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">
                  Open an appropriate investment account
                </strong>
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">
                  Start with a simple, diversified portfolio
                </strong>
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">
                  Set up automatic investments
                </strong>{" "}
                (dollar-cost averaging)
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">
                  Regularly review and rebalance
                </strong>{" "}
                your investments
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Common Beginner Mistakes to Avoid
            </h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                Trying to time the market
              </li>
              <li className="text-base leading-relaxed mb-2">
                Investing before establishing an emergency fund
              </li>
              <li className="text-base leading-relaxed mb-2">
                Neglecting fees and expenses
              </li>
              <li className="text-base leading-relaxed mb-2">
                Following investment trends without research
              </li>
              <li className="text-base leading-relaxed mb-2">
                Checking and reacting to short-term market fluctuations
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Next Steps</h2>
            <p className="text-base leading-relaxed mb-6">
              Once you&apos;ve established your initial portfolio, continue
              learning about different investment strategies, asset allocation,
              and how to adjust your approach as your financial situation and
              goals evolve.
            </p>

            <div className="bg-invest-light p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold mb-2">
                Ready to start investing?
              </h3>
              <p className="text-base leading-relaxed mb-4">
                Open an account with Millennia Trades to access low-fee funds
                and expert guidance.
              </p>
              <Link
                href="/signup"
                className="inline-block bg-invest hover:bg-invest-secondary text-white px-6 py-3 rounded-md transition-colors"
              >
                Open an Account
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
