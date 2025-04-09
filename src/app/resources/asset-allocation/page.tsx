import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AssetAllocationGuide() {
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
            Asset Allocation Strategies
          </h1>
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              Intermediate
            </span>
          </div>

          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              Asset allocation is the practice of dividing your investment
              portfolio among different asset categories such as stocks, bonds,
              cash, real estate, and alternatives. Research has shown that asset
              allocation is responsible for the majority of a portfolio&apos;s
              long-term returns and volatility characteristics.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Why Asset Allocation Matters
            </h2>
            <p className="text-base leading-relaxed mb-6">
              The way you allocate your assets can have a more significant
              impact on your portfolio&apos;s performance than individual
              security selection. Different asset classes respond differently to
              economic conditions and market events, making a diversified
              approach crucial for:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                Managing overall portfolio risk
              </li>
              <li className="text-base leading-relaxed mb-2">
                Generating more consistent returns over time
              </li>
              <li className="text-base leading-relaxed mb-2">
                Aligning your investments with your financial goals and risk
                tolerance
              </li>
              <li className="text-base leading-relaxed mb-2">
                Creating multiple potential sources of return
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Major Asset Classes
            </h2>

            <h3 className="text-xl font-medium mt-6 mb-3">Equities (Stocks)</h3>
            <p className="text-base leading-relaxed mb-6">
              Stocks represent ownership in a company and historically have
              provided the highest long-term returns among major asset classes,
              though with higher volatility.
            </p>
            <p className="text-base leading-relaxed mb-6">
              Key subcategories include:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">
                  Large-cap, mid-cap, and small-cap:
                </strong>{" "}
                Based on company size
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Growth and value:</strong> Based
                on valuation and growth characteristics
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">
                  Domestic and international:
                </strong>{" "}
                Based on geographic location
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">
                  Developed markets and emerging markets:
                </strong>{" "}
                Based on economic development
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Sector-specific:</strong>{" "}
                Technology, healthcare, financials, etc.
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Fixed Income (Bonds)
            </h3>
            <p className="text-base leading-relaxed mb-6">
              Bonds are debt securities that typically provide income and less
              volatility than stocks, though usually with lower long-term
              returns.
            </p>
            <p className="text-base leading-relaxed mb-6">
              Key subcategories include:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Government bonds:</strong> U.S.
                Treasury securities, municipal bonds
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Corporate bonds:</strong>{" "}
                Investment-grade and high-yield (junk) bonds
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Duration:</strong> Short-term,
                intermediate-term, and long-term
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">International bonds:</strong>{" "}
                Developed and emerging market debt
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">
                  Inflation-protected securities:
                </strong>{" "}
                TIPS and similar instruments
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Cash and Cash Equivalents
            </h3>
            <p className="text-base leading-relaxed mb-6">
              Cash and cash equivalents offer stability and liquidity, though
              typically with minimal returns.
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                Money market funds
              </li>
              <li className="text-base leading-relaxed mb-2">
                Certificates of deposit (CDs)
              </li>
              <li className="text-base leading-relaxed mb-2">Treasury bills</li>
              <li className="text-base leading-relaxed mb-2">
                Short-term government bonds
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Alternative Investments
            </h3>
            <p className="text-base leading-relaxed mb-6">
              Alternative investments can provide diversification beyond
              traditional stocks and bonds.
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                Real estate and REITs
              </li>
              <li className="text-base leading-relaxed mb-2">Commodities</li>
              <li className="text-base leading-relaxed mb-2">Private equity</li>
              <li className="text-base leading-relaxed mb-2">Hedge funds</li>
              <li className="text-base leading-relaxed mb-2">
                Infrastructure investments
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Common Asset Allocation Strategies
            </h2>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Strategic Asset Allocation
            </h3>
            <p className="text-base leading-relaxed mb-6">
              This long-term approach involves setting target allocations for
              various asset classes based on expected returns, risk tolerance,
              and time horizon, then periodically rebalancing back to those
              targets.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Tactical Asset Allocation
            </h3>
            <p className="text-base leading-relaxed mb-6">
              This approach allows for short-term deviations from the strategic
              allocation to capitalize on market opportunities or reduce risk
              during unfavorable conditions.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Core-Satellite Asset Allocation
            </h3>
            <p className="text-base leading-relaxed mb-6">
              In this hybrid approach, a &quot;core&quot; portfolio of passive
              investments is complemented by &quot;satellite&quot; positions
              that can be more actively managed or focused on specific
              opportunities.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Age-Based Asset Allocation
            </h3>
            <p className="text-base leading-relaxed mb-6">
              This common approach adjusts the allocation based on age,
              typically becoming more conservative as retirement approaches. The
              traditional rule of thumb is to subtract your age from 100 to
              determine your stock allocation percentage, though modern
              variations often use 110 or 120 as the starting number to account
              for longer lifespans.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Risk-Based Asset Allocation
            </h3>
            <p className="text-base leading-relaxed mb-6">
              This approach focuses on the investor&apos;s risk tolerance rather
              than age, creating portfolios ranging from conservative (lower
              risk, lower potential return) to aggressive (higher risk, higher
              potential return).
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Determining Your Optimal Asset Allocation
            </h2>
            <p className="text-base leading-relaxed mb-6">
              Consider these key factors when determining your asset allocation:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Time horizon:</strong> How long
                until you need the money?
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Risk tolerance:</strong> How
                comfortable are you with market fluctuations?
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Financial goals:</strong> What
                are you investing for?
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">
                  Current financial situation:
                </strong>{" "}
                What are your income, expenses, and existing assets?
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Tax considerations:</strong> How
                will taxes affect different investment types?
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Rebalancing Your Portfolio
            </h2>
            <p className="text-base leading-relaxed mb-6">
              Regular rebalancing is essential to maintain your target asset
              allocation as market movements cause your portfolio to drift over
              time. Common rebalancing approaches include:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Calendar-based:</strong>{" "}
                Rebalance at regular intervals (quarterly, semi-annually,
                annually)
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Threshold-based:</strong>{" "}
                Rebalance when allocations drift beyond predetermined thresholds
                (e.g., ±5%)
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Hybrid approaches:</strong>{" "}
                Combine calendar-based checks with threshold triggers
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Common Asset Allocation Models
            </h2>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Conservative Portfolio (Example)
            </h3>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">20-30% Stocks</li>
              <li className="text-base leading-relaxed mb-2">50-60% Bonds</li>
              <li className="text-base leading-relaxed mb-2">10-20% Cash</li>
              <li className="text-base leading-relaxed mb-2">
                0-10% Alternatives
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Moderate Portfolio (Example)
            </h3>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">40-60% Stocks</li>
              <li className="text-base leading-relaxed mb-2">30-50% Bonds</li>
              <li className="text-base leading-relaxed mb-2">5-15% Cash</li>
              <li className="text-base leading-relaxed mb-2">
                0-15% Alternatives
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Aggressive Portfolio (Example)
            </h3>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">70-90% Stocks</li>
              <li className="text-base leading-relaxed mb-2">10-25% Bonds</li>
              <li className="text-base leading-relaxed mb-2">0-5% Cash</li>
              <li className="text-base leading-relaxed mb-2">
                0-20% Alternatives
              </li>
            </ul>

            <div className="bg-invest-light p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold mb-2">
                Want help with your asset allocation?
              </h3>
              <p className="text-base leading-relaxed mb-4">
                Millenia Trades advisors can help you create and maintain an
                optimal asset allocation strategy.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-invest hover:bg-invest-secondary text-white px-6 py-3 rounded-md transition-colors"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
