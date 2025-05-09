"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { format } from "date-fns";
import { ApiResponse } from "@/interfaces";
import { callApi } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import { UserInvestment } from "@/interfaces/ApiResponse";
import { Loader2 } from "lucide-react";

interface CryptoPriceData {
  price: number;
  change: number;
}

type CryptoPriceMap = Record<string, CryptoPriceData>;

const SUPPORTED_CRYPTOS: Record<string, { name: string; coingeckoId: string }> =
  {
    BTC: { name: "Bitcoin", coingeckoId: "bitcoin" },
    ETH: { name: "Ethereum", coingeckoId: "ethereum" },
    LTC: { name: "Litecoin", coingeckoId: "litecoin" },
    BNB: { name: "Binance Coin", coingeckoId: "binancecoin" },
    SOL: { name: "Solana", coingeckoId: "solana" },
    USDT_TRC20: { name: "USDT (TRC20)", coingeckoId: "tether" },
    USDT_ERC20: { name: "USDT (ERC20)", coingeckoId: "tether" },
  };

const getInvestmentPrice = (
  investment: UserInvestment,
  cryptoPrices: CryptoPriceMap
) => {
  if (investment.type === "crypto" && SUPPORTED_CRYPTOS[investment.symbol]) {
    return cryptoPrices[investment.symbol]?.price ?? Number(investment.price);
  }
  return Number(investment.price);
};

const getChangePercentage = (
  investment: UserInvestment,
  cryptoPrices: CryptoPriceMap
) => {
  if (investment.type === "crypto" && SUPPORTED_CRYPTOS[investment.symbol]) {
    return (
      cryptoPrices[investment.symbol]?.change ??
      Number(investment.change_percentage)
    );
  }
  return Number(investment.change_percentage);
};

const getTotalValue = (
  investment: UserInvestment,
  cryptoPrices: CryptoPriceMap
) => {
  const price = getInvestmentPrice(investment, cryptoPrices);
  return (price * Number(investment.shares)).toFixed(2);
};

export default function InvestmentDetail() {
  const params = useParams();
  const router = useRouter();
  const [investment, setInvestment] = useState<UserInvestment[] | null>(null);

  const { data: cryptoPrices = {}, isLoading: isCryptoLoading } = useQuery<
    CryptoPriceMap,
    Error
  >({
    queryKey: ["crypto-prices"],
    queryFn: async () => {
      const uniqueIds = Array.from(
        new Set(Object.values(SUPPORTED_CRYPTOS).map((c) => c.coingeckoId))
      );
      const ids = uniqueIds.join(",");
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );
      const data = await res.json();

      const formatted: CryptoPriceMap = {};
      Object.entries(SUPPORTED_CRYPTOS).forEach(([symbol, { coingeckoId }]) => {
        if (data[coingeckoId]) {
          formatted[symbol] = {
            price: data[coingeckoId].usd,
            change: data[coingeckoId].usd_24h_change,
          };
        }
      });

      return formatted;
    },
    refetchInterval: 30000,
  });

  const { isLoading, error } = useQuery<UserInvestment[], Error>({
    queryKey: ["investment", params.id],
    queryFn: async () => {
      const { data: responseData, error } = await callApi<
        ApiResponse<UserInvestment[]>
      >(`/investment/find?investmentId=${params.id}`);

      if (error) {
        throw new Error(error.message || "Failed to fetch investment data");
      }

      if (!responseData?.data) {
        throw new Error("No investment found");
      }

      setInvestment(responseData.data);
      return responseData.data;
    },
  });

  const handleBack = () => {
    router.push("/dashboard/investments");
  };

  const investmentDetails = useMemo(() => {
    if (!investment?.[0]) return null;

    const currentPrice = getInvestmentPrice(investment[0], cryptoPrices);
    const changePercentage = getChangePercentage(investment[0], cryptoPrices);
    const totalValue = getTotalValue(investment[0], cryptoPrices);

    return {
      currentPrice,
      changePercentage,
      totalValue,
      isPositive: changePercentage > 0,
    };
  }, [investment, cryptoPrices]);

  if (isLoading || isCryptoLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !investment) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl">
          {error ? "Error loading investment" : "Investment not found"}
        </h2>
        <Button onClick={handleBack} className="mt-4">
          Back to Investments
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6 mt-16 lg:mt-0">
        <div>
          <Button variant="ghost" onClick={handleBack} className="mb-2">
            ← Back to Investments
          </Button>
          <h1 className="text-2xl font-bold">{investment[0].name}</h1>
          <div className="flex items-center text-gray-500">
            <span className="text-lg">{investment[0].symbol}</span>
            {investment[0].type && (
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                {investment[0].type}
              </span>
            )}
          </div>
        </div>
        <Button
          className="bg-invest hover:bg-invest-secondary text-white"
          onClick={() => router.push(`/dashboard/new-investments`)}
        >
          Buy More
        </Button>
      </div>

      <div className="grid md:grid-cols-1 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Position</CardTitle>
            <CardDescription>Your investment details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Current Price</p>
                  <div className="flex items-center">
                    <h3 className="text-2xl font-bold">
                      ${investmentDetails?.currentPrice.toFixed(2)}
                    </h3>
                    <div className="flex items-center ml-2">
                      {investmentDetails?.isPositive ? (
                        <>
                          <ArrowUp className="h-4 w-4 text-green-500" />
                          <span className="text-green-500 text-sm">
                            {investmentDetails?.changePercentage.toFixed(2)}%
                          </span>
                        </>
                      ) : (
                        <>
                          <ArrowDown className="h-4 w-4 text-red-500" />
                          <span className="text-red-500 text-sm">
                            {Math.abs(
                              investmentDetails?.changePercentage ?? 0
                            ).toFixed(2)}
                            %
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Shares Owned</p>
                  <h3 className="text-2xl font-bold">{investment[0].shares}</h3>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Value</p>
                  <h3 className="text-2xl font-bold">
                    ${investmentDetails?.totalValue}
                  </h3>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Profit/Loss</p>
                  <div className="text-gray-500">
                    <h3 className="text-2xl font-bold">N/A</h3>
                    <div className="flex items-center">
                      <span>Not available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Investment Details</CardTitle>
          <CardDescription>
            Additional information about this investment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">About {investment[0].name}</h4>
              <p className="text-gray-500 text-sm">
                {investment[0].type === "stocks" &&
                  "Common stock representing ownership in the company."}
                {investment[0].type === "etfs" &&
                  "Exchange-traded fund that tracks an index, sector, or commodity."}
                {investment[0].type === "crypto" &&
                  "Digital cryptocurrency asset."}
                {investment[0].type === "retirement" &&
                  "Retirement plan designed to help you save for your future."}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Investment Type</h4>
              <div className="flex items-center">
                <span className="capitalize">{investment[0].type}</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Purchase Date</h4>
              <p className="text-gray-500">
                {investment[0].created_at &&
                  format(new Date(investment[0].created_at), "MMMM dd, yyyy")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
