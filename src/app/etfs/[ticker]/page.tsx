"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ApiResponse, ETFS } from "@/interfaces";
import { callApi } from "@/lib/helpers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { wishlistType, zodValidator } from "@/lib/validators/validateWithZod";
import { WishlistData } from "@/interfaces/ApiResponse";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

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

export default function ETFDetails({ params }: { params: { ticker: string } }) {
  const etf = etfsData[params.ticker.toUpperCase() as ETFKey];
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    //watch,
    //setValue,
    formState: { isSubmitting },
  } = useForm<wishlistType>({
    resolver: zodResolver(zodValidator("wishlist")!),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    data: etfs,
    //isLoading: loading,
    //error: queryError,
  } = useQuery<ETFS[], Error>({
    queryKey: ["stocks"],
    queryFn: async () => {
      const { data: responseData, error } = await callApi<ApiResponse<ETFS[]>>(
        "/assets/etfs"
      );
      if (error) {
        throw new Error(
          error.message || "Something went wrong while fetching etf data."
        );
      }
      if (!responseData?.data) {
        throw new Error("No etf details found");
      }

      //console.log(responseData.data);
      return responseData.data;
    },
  });

  const onSubmit: SubmitHandler<wishlistType> = async (data: wishlistType) => {
    try {
      //setIsLoading(true);
      const { data: responseData, error } = await callApi<
        ApiResponse<WishlistData>
      >("/wishlist/create", {
        name: data.name,
        symbol: data.symbol,
        brand: data.brand,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (responseData?.status === "success") {
        toast.success("Watchlist Added", {
          description: "Ticker added to your watchlist successfully",
        });
        queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      }
    } catch (err) {
      toast.error("Watch list Addition Failed", {
        description:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
      reset();
    }
  };

  if (!etf) return notFound();

  // Market data and performance as of April 9, 2025 (based on search results and trends)
  const fundData = (etfs ?? []).reduce(
    (acc, etf) => {
      const ticker = etf.symbol.toUpperCase();
      acc.netAssets[ticker] = etf.net_assets
        ? `${(parseFloat(etf.net_assets) / 1e9).toFixed(1)}B`
        : "N/A";
      acc.expenseRatio[ticker] = etf.expense_ratio
        ? `${(parseFloat(etf.expense_ratio) * 100).toFixed(2)}%`
        : "N/A";
      acc.yield[ticker] = etf.yield
        ? `${(parseFloat(etf.yield) * 100).toFixed(1)}%`
        : "N/A";
      acc.inceptionDate[ticker] = etf.inception_date
        ? new Date(etf.inception_date).toLocaleDateString()
        : "N/A";
      acc.performance.YTD[ticker] = etf.performance_ytd
        ? `${(parseFloat(etf.performance_ytd) * 100).toFixed(2)}%`
        : "N/A";
      acc.performance["1-Year"][ticker] = etf.performance_1y
        ? `${(parseFloat(etf.performance_1y) * 100).toFixed(2)}%`
        : "N/A";
      acc.performance["3-Year"][ticker] = etf.performance_3y
        ? `${(parseFloat(etf.performance_3y) * 100).toFixed(2)}%`
        : "N/A";
      acc.performance["5-Year"][ticker] = etf.performance_5y
        ? `${(parseFloat(etf.performance_5y) * 100).toFixed(2)}%`
        : "N/A";
      return acc;
    },
    {
      netAssets: {},
      expenseRatio: {},
      yield: {},
      inceptionDate: {},
      performance: {
        YTD: {},
        "1-Year": {},
        "3-Year": {},
        "5-Year": {},
      },
    } as {
      netAssets: Record<string, string>;
      expenseRatio: Record<string, string>;
      yield: Record<string, string>;
      inceptionDate: Record<string, string>;
      performance: {
        YTD: Record<string, string>;
        "1-Year": Record<string, string>;
        "3-Year": Record<string, string>;
        "5-Year": Record<string, string>;
      };
    }
  );

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
              <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register("symbol")} value={ticker} />
                <input type="hidden" {...register("name")} value={etf.name} />
                <input
                  type="hidden"
                  {...register("brand")}
                  value="Broad Market"
                />
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
                <Button type="submit" variant="outline" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add to Watchlist"}
                </Button>
              </form>
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
                        (currentData.performance.YTD[ticker] ?? "").includes(
                          "-"
                        )
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
                        (
                          currentData.performance["1-Year"][ticker] ?? ""
                        ).includes("-")
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
                        (
                          currentData.performance["3-Year"][ticker] ?? ""
                        ).includes("-")
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
                        (
                          currentData.performance["5-Year"][ticker] ?? ""
                        ).includes("-")
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
