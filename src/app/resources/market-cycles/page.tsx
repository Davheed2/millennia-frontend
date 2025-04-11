import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MarketCyclesGuide() {
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
            Understanding Market Cycles
          </h1>
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              Intermediate
            </span>
          </div>

          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              Market cycles are the natural rhythms of financial markets that
              influence asset prices, investor sentiment, and economic
              conditions. Understanding these cycles can help you make more
              informed investment decisions and potentially avoid common
              pitfalls.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              The Four Phases of Market Cycles
            </h2>

            <h3 className="text-xl font-medium mt-6 mb-3">
              1. Accumulation Phase
            </h3>
            <p className="text-base leading-relaxed mb-6">
              This phase occurs after a market bottom when sentiment is still
              negative, but informed investors begin to recognize value and
              accumulate positions. Key characteristics include:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                Market sentiment is generally pessimistic despite improving
                fundamentals
              </li>
              <li className="text-base leading-relaxed mb-2">
                Value investors start buying while prices remain relatively low
              </li>
              <li className="text-base leading-relaxed mb-2">
                Trading volume begins to increase gradually
              </li>
              <li className="text-base leading-relaxed mb-2">
                Economic indicators may start showing early signs of recovery
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">
              2. Mark-Up Phase (Bull Market)
            </h3>
            <p className="text-base leading-relaxed mb-6">
              During this phase, prices trend higher as more investors recognize
              improving conditions. Key characteristics include:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                Market sentiment shifts from neutral to increasingly positive
              </li>
              <li className="text-base leading-relaxed mb-2">
                Business metrics and earnings improve
              </li>
              <li className="text-base leading-relaxed mb-2">
                Trading volume increases significantly
              </li>
              <li className="text-base leading-relaxed mb-2">
                Economic growth accelerates
              </li>
              <li className="text-base leading-relaxed mb-2">
                Media coverage becomes increasingly positive
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">
              3. Distribution Phase
            </h3>
            <p className="text-base leading-relaxed mb-6">
              In this phase, informed investors begin to sell (distribute) their
              holdings as they perceive the market has become overvalued. Key
              characteristics include:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                Market sentiment becomes excessively bullish or euphoric
              </li>
              <li className="text-base leading-relaxed mb-2">
                High trading volume but prices struggle to make new highs
              </li>
              <li className="text-base leading-relaxed mb-2">
                Increasing volatility with wider price swings
              </li>
              <li className="text-base leading-relaxed mb-2">
                Economic indicators may begin to show mixed signals
              </li>
              <li className="text-base leading-relaxed mb-2">
                Media coverage often reaches peak optimism
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">
              4. Mark-Down Phase (Bear Market)
            </h3>
            <p className="text-base leading-relaxed mb-6">
              In this final phase, prices trend downward as negative sentiment
              takes hold. Key characteristics include:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                Declining prices across the market
              </li>
              <li className="text-base leading-relaxed mb-2">
                Pessimistic sentiment that often overshoots to the downside
              </li>
              <li className="text-base leading-relaxed mb-2">
                Trading volume may be high initially, then decrease
              </li>
              <li className="text-base leading-relaxed mb-2">
                Economic indicators deteriorate
              </li>
              <li className="text-base leading-relaxed mb-2">
                Media coverage becomes increasingly negative
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Economic Cycles and Market Cycles
            </h2>
            <p className="text-base leading-relaxed mb-6">
              Economic cycles and market cycles are related but don&apos;t move
              in perfect tandem. Markets are forward-looking and often
              anticipate economic changes 6-9 months in advance. The economic
              cycle typically consists of:
            </p>
            <ol className="list-decimal pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Expansion:</strong> Economic
                growth, low unemployment, rising corporate profits
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Peak:</strong> Maximum growth,
                potential inflation pressures
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Contraction:</strong> Declining
                economic activity, rising unemployment
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Trough:</strong> Bottom of
                economic activity before recovery begins
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Investment Strategies for Different Market Cycle Phases
            </h2>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Accumulation Phase Strategies
            </h3>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                Gradually increase equity exposure
              </li>
              <li className="text-base leading-relaxed mb-2">
                Focus on quality companies with strong balance sheets
              </li>
              <li className="text-base leading-relaxed mb-2">
                Consider sectors positioned for early-cycle growth
              </li>
              <li className="text-base leading-relaxed mb-2">
                Begin reducing fixed-income duration as interest rates may rise
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Mark-Up Phase Strategies
            </h3>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                Maintain significant equity exposure
              </li>
              <li className="text-base leading-relaxed mb-2">
                Consider cyclical sectors that benefit from economic growth
              </li>
              <li className="text-base leading-relaxed mb-2">
                Be mindful of position sizing as valuations increase
              </li>
              <li className="text-base leading-relaxed mb-2">
                Implement regular portfolio rebalancing
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Distribution Phase Strategies
            </h3>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                Begin taking profits in most speculative positions
              </li>
              <li className="text-base leading-relaxed mb-2">
                Shift toward more defensive sectors
              </li>
              <li className="text-base leading-relaxed mb-2">
                Consider increasing cash positions gradually
              </li>
              <li className="text-base leading-relaxed mb-2">
                Review and tighten stop-loss levels
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">
              Mark-Down Phase Strategies
            </h3>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                Increase allocation to defensive assets (quality bonds, cash)
              </li>
              <li className="text-base leading-relaxed mb-2">
                Focus on companies with stable earnings and dividends
              </li>
              <li className="text-base leading-relaxed mb-2">
                Consider defensive sectors (utilities, consumer staples,
                healthcare)
              </li>
              <li className="text-base leading-relaxed mb-2">
                Prepare watchlists of quality companies to purchase at lower
                valuations
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Common Indicators for Identifying Cycle Stages
            </h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Yield Curve:</strong> Often
                inverts before recessions
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">
                  Leading Economic Indicators:
                </strong>{" "}
                Provide forward-looking economic signals
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Market Breadth:</strong>{" "}
                Measures participation in market movements
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Volatility Indices:</strong>{" "}
                Often spike during transitions between phases
              </li>
              <li className="text-base leading-relaxed mb-2">
                <strong className="font-medium">Sentiment Indicators:</strong>{" "}
                Help identify extreme optimism or pessimism
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Long-Term Perspective
            </h2>
            <p className="text-base leading-relaxed mb-6">
              While understanding market cycles can improve your investing
              approach, attempting to time markets precisely is notoriously
              difficult. A disciplined, long-term investment strategy that
              adjusts tactically to changing conditions often proves most
              effective for most investors.
            </p>

            <div className="bg-invest-light p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold mb-2">
                Want a portfolio built for all market cycles?
              </h3>
              <p className="text-base leading-relaxed mb-4">
                Millennia Trades professional portfolio management helps navigate
                changing market conditions.
              </p>
              <Link
                href="/portfolio-management"
                className="inline-block bg-invest hover:bg-invest-secondary text-white px-6 py-3 rounded-md transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
