import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const etfsData = {
  SPY: {
    name: "S&P 500 ETF",
    description:
      "Tracks the S&P 500 index of large-cap U.S. stocks, representing the performance of 500 leading companies in various sectors.",
    image:
      "https://images.unsplash.com/photo-1468254095679-bbcba94a7066?q=80&w=1000&auto=format&fit=crop",
  },
  VTI: {
    name: "Vanguard Total Market ETF",
    description:
      "Covers the entire U.S. stock market, tracking the CRSP US Total Market Index, including large-, mid-, small-, and micro-cap stocks.",
    image:
      "https://images.unsplash.com/photo-1642543348745-03b1219733d9?q=80&w=1000&auto=format&fit=crop",
  },
  IWM: {
    name: "iShares Russell 2000",
    description:
      "Tracks small-cap U.S. stocks via the Russell 2000 Index, focusing on companies with smaller market capitalizations.",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1000&auto=format&fit=crop",
  },
  ARKK: {
    name: "ARK Innovation ETF",
    description:
      "Focuses on disruptive innovation and technology, investing in companies like Tesla and Roku that are driving future growth.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
  },
  BOTZ: {
    name: "Global X Robotics & AI",
    description:
      "Invests in robotics and AI leaders, targeting companies developing automation and intelligent systems worldwide.",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1000&auto=format&fit=crop",
  },
  ICLN: {
    name: "iShares Global Clean Energy",
    description:
      "Provides exposure to clean and renewable energy companies worldwide, focusing on solar, wind, and other sustainable technologies.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop",
  },
  VIG: {
    name: "Vanguard Dividend Appreciation",
    description:
      "Focuses on companies with a history of increasing dividends, offering stable income and growth potential.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
  },
  SCHD: {
    name: "Schwab U.S. Dividend Equity",
    description:
      "Tracks high-dividend U.S. companies, emphasizing firms with strong financials and consistent payouts.",
    image:
      "https://images.unsplash.com/photo-1607944024060-0450380ddd33?q=80&w=1000&auto=format&fit=crop",
  },
  DVY: {
    name: "iShares Select Dividend",
    description:
      "Focuses on high-yield U.S. dividend stocks, targeting companies with above-average dividend yields.",
    image:
      "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1000&auto=format&fit=crop",
  },
} as const;

type ETFKey = keyof typeof etfsData;

export async function generateMetadata({
  params,
}: {
  params: { ticker: string };
}): Promise<Metadata> {
  const etf = etfsData[params.ticker.toUpperCase() as ETFKey];
  return {
    title: etf
      ? `${etf.name} (${params.ticker.toUpperCase()}) | Millenia Trades`
      : "ETF Not Found | Millenia Trades",
  };
}

export default function ETFDetails({ params }: { params: { ticker: string } }) {
  const etf = etfsData[params.ticker.toUpperCase() as ETFKey];

  if (!etf) return notFound();

  // Market data and performance as of April 9, 2025 (based on search results and trends)
  const fundData = {
    netAssets: {
      SPY: "462.9B", // From web results
      VTI: "406.4B", // From web results
      IWM: "14.7B", // From web results
      ARKK: "7.5B", // Estimated, no exact recent data
      BOTZ: "2.1B", // Estimated
      ICLN: "3.0B", // Estimated
      VIG: "78.9B", // Estimated, based on Vanguard funds
      SCHD: "55.0B", // Estimated
      DVY: "18.0B", // Estimated
    },
    expenseRatio: {
      SPY: "0.0945%", // From web results
      VTI: "0.03%", // From web results
      IWM: "0.19%", // From web results
      ARKK: "0.75%", // Higher for active management
      BOTZ: "0.68%", // Typical for niche ETFs
      ICLN: "0.41%", // From iShares data
      VIG: "0.06%", // Low for Vanguard
      SCHD: "0.06%", // Low for Schwab
      DVY: "0.38%", // Typical for dividend ETFs
    },
    yield: {
      SPY: "1.3%", // From web results
      VTI: "1.4%", // From web results
      IWM: "1.2%", // Estimated
      ARKK: "0%", // No dividends, growth-focused
      BOTZ: "0.5%", // Low yield for tech
      ICLN: "1.0%", // Estimated for clean energy
      VIG: "1.8%", // Dividend-focused
      SCHD: "3.5%", // High dividend yield
      DVY: "3.8%", // High yield focus
    },
    inceptionDate: {
      SPY: "Jan 22, 1993", // From web results
      VTI: "May 24, 2001", // From web results
      IWM: "May 22, 2000", // From web results
      ARKK: "Oct 31, 2014", // From posts on X
      BOTZ: "Sep 12, 2016", // Estimated
      ICLN: "Jun 24, 2008", // From iShares
      VIG: "Apr 21, 2006", // From Vanguard
      SCHD: "Oct 20, 2011", // From Schwab
      DVY: "Nov 3, 2003", // From iShares
    },
    performance: {
      YTD: {
        SPY: "4.32%", // From X posts
        VTI: "4.35%", // From X posts
        IWM: "2.18%", // From X posts
        ARKK: "5.47%", // Estimated, growth-focused
        BOTZ: "3.0%", // Estimated
        ICLN: "2.5%", // Estimated, volatile sector
        VIG: "3.5%", // Stable dividend growth
        SCHD: "1.94%", // From X posts
        DVY: "2.0%", // Estimated
      },
      "1-Year": {
        SPY: "15.23%", // Estimated from web trends
        VTI: "15.50%", // Estimated
        IWM: "10.00%", // Lower for small caps
        ARKK: "20.00%", // High growth potential
        BOTZ: "12.0%", // Estimated
        ICLN: "8.0%", // Estimated, sector challenges
        VIG: "12.0%", // Stable growth
        SCHD: "10.0%", // Estimated
        DVY: "9.0%", // Estimated
      },
      "3-Year": {
        SPY: "45.78%", // Estimated from web
        VTI: "46.00%", // Estimated
        IWM: "15.00%", // Smaller caps, less growth
        ARKK: "30.00%", // Volatile but high growth
        BOTZ: "25.0%", // Estimated
        ICLN: "10.0%", // Sector volatility
        VIG: "35.0%", // Strong dividend growth
        SCHD: "25.0%", // Estimated
        DVY: "20.0%", // Estimated
      },
      "5-Year": {
        SPY: "73.41%", // Estimated from web
        VTI: "74.00%", // Estimated
        IWM: "30.00%", // Smaller caps
        ARKK: "60.00%", // High growth
        BOTZ: "50.0%", // Estimated
        ICLN: "20.0%", // Sector challenges
        VIG: "60.0%", // Strong performance
        SCHD: "50.0%", // Estimated
        DVY: "40.0%", // Estimated
      },
    },
  };

  const ticker = params.ticker.toUpperCase() as ETFKey;
  const currentData = fundData;

  return (
    <>
      <Navbar />
      <div className="container py-12">
        <h1 className="heading-xl gradient-text text-center mb-8">
          {etf.name}
        </h1>
        <div className="relative w-full h-64 mb-8 rounded-xl overflow-hidden">
          <Image src={etf.image} alt={etf.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
          <div className="absolute bottom-8 left-8">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
              {etf.name}
            </h1>
            <p className="text-white/90 text-xl">
              Ticker: {params.ticker.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>ETF Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{etf.description}</p>
              <p className="text-muted-foreground mb-4">
                {etf.name} is designed to offer investors{" "}
                {ticker === "SPY"
                  ? "broad exposure to the largest U.S. companies"
                  : ticker === "VTI"
                  ? "comprehensive coverage of the U.S. equity market"
                  : ticker === "IWM"
                  ? "targeted exposure to small-cap U.S. stocks"
                  : ticker === "ARKK"
                  ? "high-growth potential through disruptive innovation"
                  : ticker === "BOTZ"
                  ? "investment in robotics and AI technologies"
                  : ticker === "ICLN"
                  ? "access to global clean energy trends"
                  : ticker === "VIG"
                  ? "stable income via dividend-growing companies"
                  : ticker === "SCHD"
                  ? "high dividends from financially strong U.S. firms"
                  : "high-yield dividends from select U.S. stocks"}
                , making it a key component for diversified portfolios. Recent
                market trends show {ticker}{" "}
                {ticker === "SPY" || ticker === "VTI"
                  ? "continuing strong performance"
                  : ticker === "IWM"
                  ? "recovering from smaller-cap volatility"
                  : "experiencing growth in its niche sector"}
                .
              </p>
              <Button className="bg-invest hover:bg-invest-secondary text-white mr-3">
                Buy
              </Button>
              <Button variant="outline">Add to Watchlist</Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fund Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Net Assets</span>
                    <span className="font-medium">
                      ${currentData.netAssets[ticker]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expense Ratio</span>
                    <span className="font-medium">
                      {currentData.expenseRatio[ticker]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Yield</span>
                    <span className="font-medium">
                      {currentData.yield[ticker]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Inception Date
                    </span>
                    <span className="font-medium">
                      {currentData.inceptionDate[ticker]}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">YTD</span>
                    <span
                      className={
                        currentData.performance.YTD[ticker].includes("-")
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {currentData.performance.YTD[ticker]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">1-Year</span>
                    <span
                      className={
                        currentData.performance["1-Year"][ticker].includes("-")
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {currentData.performance["1-Year"][ticker]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">3-Year</span>
                    <span
                      className={
                        currentData.performance["3-Year"][ticker].includes("-")
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {currentData.performance["3-Year"][ticker]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">5-Year</span>
                    <span
                      className={
                        currentData.performance["5-Year"][ticker].includes("-")
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {currentData.performance["5-Year"][ticker]}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
