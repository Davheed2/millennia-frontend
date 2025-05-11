"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Filter,
  Plus,
  Search,
  Bitcoin,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ApiResponse, UserInvestmentData } from "@/interfaces";
import { useSession } from "@/store/useSession";
import { callApi } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import { UserInvestment, Wallet } from "@/interfaces/ApiResponse";

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
    USDT: { name: "USDT", coingeckoId: "tether" },
    USDT_TRC20: { name: "USDT (TRC20)", coingeckoId: "tether" },
    USDT_ERC20: { name: "USDT (ERC20)", coingeckoId: "tether" },
  };

export default function DashboardInvestments() {
  const [allInvestments, setAllInvestments] = useState<UserInvestmentData>([]);
  const router = useRouter();
  const { user } = useSession((state) => state);

  const {
    // data: investments,
    // isLoading: loading,
    // error: queryError,
  } = useQuery<UserInvestmentData, Error>({
    queryKey: ["investments"],
    queryFn: async () => {
      const { data: responseData, error } = await callApi<
        ApiResponse<UserInvestmentData>
      >("/investment/user");

      if (error) {
        throw new Error(
          error.message ||
            "Something went wrong while fetching investment data."
        );
      }

      if (!responseData?.data) {
        throw new Error("No investment found");
      }

      if (
        responseData?.status === "success" &&
        responseData?.data?.length >= 1
      ) {
        toast.success("Investments Fetched Successfully", {
          description: "Your Investments have been fetched successfully.",
        });
      }

      setAllInvestments(responseData.data);
      return responseData.data;
    },
  });

  const { data: cryptoPrices = {} } = useQuery<CryptoPriceMap, Error>({
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

  const {
    data: balance,
    //isLoading: loading,
    //error: queryError,
  } = useQuery<Wallet[], Error>({
    queryKey: ["balance"],
    queryFn: async () => {
      const { data: responseData, error } = await callApi<
        ApiResponse<Wallet[]>
      >("/wallet/user");
      if (error) {
        throw new Error(
          error.message ||
            "Something went wrong while fetching user wallet balance."
        );
      }
      if (!responseData?.data) {
        throw new Error("No wallet balance found");
      }

      return responseData.data;
    },
  });

  const handleNewInvestment = () => {
    router.push("/dashboard/new-investment");
  };

  const handleViewInvestment = (id: string) => {
    router.push(`/dashboard/investments/${id}`);
  };

  // Helper function to render investment cards for mobile view
  const renderMobileInvestmentCard = (investment: UserInvestment) => {
    const isCrypto = investment?.type === "crypto";
    const symbol = investment?.symbol.toUpperCase();
    const meta = isCrypto ? SUPPORTED_CRYPTOS[symbol] : null;
    const priceData = isCrypto ? cryptoPrices[symbol] : null;

    const price = isCrypto ? priceData?.price ?? 0 : Number(investment?.price);
    const change = isCrypto
      ? priceData?.change ?? 0
      : Number(investment?.change_percentage);
    const shares = Number(investment?.shares);
    const value = price * shares;

    return (
      <div key={investment?.id} className="p-4 border rounded-md mb-3 bg-white">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            {isCrypto && <Bitcoin className="h-4 w-4 text-amber-500" />}
            <div>
              <div className="font-medium">
                {meta?.name ?? investment?.name}
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <div className="text-sm text-gray-500">{symbol}</div>
                {investment?.isRetirement && (
                  <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                    Retirement
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-8 w-8"
            onClick={() => handleViewInvestment(investment?.id)}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-y-2 mt-3">
          <div>
            <div className="text-xs text-gray-500">Price</div>
            <div>${price.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Today</div>
            <div className="flex items-center">
              {change > 0 ? (
                <>
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500">{change.toFixed(2)}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-500">{change.toFixed(2)}%</span>
                </>
              )}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Shares</div>
            <div>{shares}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Value</div>
            <div>${value.toFixed(2)}</div>
          </div>
          <div>
            <div
              className={
                investment.percentageprofit > 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              ${(investment.dailyprofit ?? 0).toFixed(2)} (
              {(investment.percentageprofit ?? 0).toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>
    );
  };

  const totalChange = allInvestments.reduce((acc, investment) => {
    return acc + investment.percentageprofit;
  }, 0);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 mt-16 lg:mt-0">
        <h1 className="text-2xl font-bold">My Investments</h1>
        <Button
          className="bg-invest hover:bg-invest-secondary text-white w-full sm:w-auto"
          onClick={handleNewInvestment}
        >
          <Plus className="h-4 w-4 mr-2" /> New Investment
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-0">
          <CardTitle>Portfolio Summary</CardTitle>
          <CardDescription>
            Overview of your investment portfolio
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Total Value</p>
              <h3 className="text-2xl md:text-3xl font-bold">
                $
                {balance && balance[0]?.portfolioBalance
                  ? balance[0].portfolioBalance.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0.00"}
              </h3>
              <div className="flex items-center mt-1 text-sm">
                <span className="text-green-500 font-medium">
                  {/* +$589.77 (6.04%) */}
                  {allInvestments.length > 0 && user && (
                    <div className="flex items-center mt-1 text-sm">
                      {user[0].totalProfit >= 0 ? (
                        <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="text-red-500 h-4 w-4 mr-1" />
                      )}
                      <span
                        className={`font-medium ${
                          user[0].totalProfit >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {user[0].totalProfit >= 0 ? "+" : ""}
                        {user[0].totalProfit.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  )}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Today&apos;s Change</p>
              <h3 className="text-2xl md:text-3xl font-bold">
                +$
                {user &&
                  user[0].dailyProfitChange.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </h3>
              {allInvestments.length > 0 && (
                <div className="flex items-center mt-1 text-sm">
                  {totalChange >= 0 ? (
                    <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="text-red-500 h-4 w-4 mr-1" />
                  )}
                  <span
                    className={`font-medium ${
                      totalChange >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {totalChange >= 0 ? "+" : ""}
                    {totalChange.toFixed(2)}%
                  </span>
                </div>
              )}
            </div>

            <div className="sm:col-span-2 md:col-span-1">
              <p className="text-sm text-gray-500">Total Investments</p>
              <h3 className="text-2xl md:text-3xl font-bold">
                {allInvestments?.length}
              </h3>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700"
                >
                  {allInvestments?.filter((i) => i.type === "stocks").length}{" "}
                  Stocks
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-purple-50 hover:bg-purple-100 text-purple-700"
                >
                  {allInvestments?.filter((i) => i.type === "etfs").length} ETFs
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-amber-50 hover:bg-amber-100 text-amber-700"
                >
                  {allInvestments?.filter((i) => i.type === "crypto").length}{" "}
                  Crypto
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-green-50 hover:bg-green-100 text-green-700"
                >
                  {
                    allInvestments?.filter((i) => i.type === "retirement")
                      .length
                  }{" "}
                  Retirement
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col gap-4 mb-6">
          <TabsList className="flex w-full h-auto flex-wrap">
            <TabsTrigger value="all" className="flex-1 py-2">
              All
            </TabsTrigger>
            <TabsTrigger value="stocks" className="flex-1 py-2">
              Stocks
            </TabsTrigger>
            <TabsTrigger value="etfs" className="flex-1 py-2">
              ETFs
            </TabsTrigger>
            <TabsTrigger value="crypto" className="flex-1 py-2">
              Crypto
            </TabsTrigger>
            <TabsTrigger value="retirement" className="flex-1 py-2">
              Retirement
            </TabsTrigger>
          </TabsList>

          <div className="flex w-full gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search investments..."
                className="pl-9 w-full"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <div className="hidden md:block rounded-md border">
            <div className="grid grid-cols-8 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-500">
              <div className="col-span-2">Name</div>
              <div>Price</div>
              <div>Today</div>
              <div>Shares</div>
              <div>Value</div>
              <div>Profit/Loss</div>
              <div></div>
            </div>
            <Separator />
            {allInvestments?.map((investment) => {
              const isCrypto = investment.type === "crypto";
              const symbol = investment.symbol.toUpperCase();
              const meta = isCrypto ? SUPPORTED_CRYPTOS[symbol] : null;
              const priceData = isCrypto ? cryptoPrices[symbol] : null;

              const price = isCrypto
                ? priceData?.price ?? 0
                : Number(investment.price);
              const change = isCrypto
                ? priceData?.change ?? 0
                : Number(investment.change_percentage);
              const shares = Number(investment.shares);
              const value = price * shares;
              //const profit = value - Number(investment?.amount);
              const profitPercent = investment.percentageprofit;

              return (
                <div key={investment.id}>
                  <div className="grid grid-cols-8 gap-4 p-4 items-center">
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        {isCrypto && (
                          <Bitcoin className="h-4 w-4 text-amber-500" />
                        )}
                        <div>
                          <div className="font-medium">
                            {meta?.name ?? investment.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="text-sm text-gray-500">
                              {symbol}
                            </div>
                            {investment.isRetirement && (
                              <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                                Retirement
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>${price.toFixed(2)}</div>
                    <div className="flex items-center">
                      {change > 0 ? (
                        <>
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500">
                            {change.toFixed(2)}%
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-red-500">
                            {change.toFixed(2)}%
                          </span>
                        </>
                      )}
                    </div>
                    <div>{shares}</div>
                    <div>${value.toFixed(2)}</div>
                    <div
                      className={
                        profitPercent > 0 ? "text-green-500" : "text-red-500"
                      }
                    >
                      ${(investment.dailyprofit ?? 0).toFixed(2)} (
                      {(profitPercent ?? 0).toFixed(2)}%)
                    </div>
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewInvestment(investment.id)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                  <Separator />
                </div>
              );
            })}
          </div>

          <div className="md:hidden">
            {allInvestments.length === 0 ? (
              <div className="p-4 text-center text-gray-500 bg-white rounded-md border">
                No investments found.
              </div>
            ) : (
              allInvestments.map((investment) =>
                renderMobileInvestmentCard(investment)
              )
            )}
          </div>
        </TabsContent>

        <TabsContent value="stocks" className="m-0">
          <div className="hidden md:block rounded-md border">
            <div className="grid grid-cols-8 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-500">
              <div className="col-span-2">Name</div>
              <div>Price</div>
              <div>Today</div>
              <div>Shares</div>
              <div>Value</div>
              <div>Profit/Loss</div>
              <div></div>
            </div>
            <Separator />
            {allInvestments?.filter(
              (investment) => investment.type === "stocks"
            ).length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No stock investments found.
              </div>
            ) : (
              allInvestments
                .filter((investment) => investment.type === "stocks")
                .map((investment) => (
                  <div key={investment.id}>
                    <div className="grid grid-cols-8 gap-4 p-4 items-center">
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-medium">{investment.name}</div>
                            <div className="flex items-center gap-1">
                              <div className="text-sm text-gray-500">
                                {investment.symbol}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>${Number(investment.price).toFixed(2)}</div>
                      <div className="flex items-center">
                        {Number(investment.change_percentage) > 0 ? (
                          <>
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-500">
                              {Number(investment.change_percentage).toFixed(2)}%
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                            <span className="text-red-500">
                              {Number(investment.change_percentage).toFixed(2)}%
                            </span>
                          </>
                        )}
                      </div>
                      <div>{investment.shares}</div>
                      <div>
                        $
                        {(
                          Number(investment.price) * Number(investment.shares)
                        ).toFixed(2)}
                      </div>
                      <div
                        className={
                          investment.percentageprofit > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        ${(investment.dailyprofit ?? 0).toFixed(2)} (
                        {(investment.percentageprofit ?? 0).toFixed(2)}%)
                      </div>
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            router.push(
                              `/dashboard/investments/${investment.id}`
                            )
                          }
                        >
                          View
                        </Button>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))
            )}
          </div>

          <div className="md:hidden">
            {allInvestments.filter((investment) => investment.type === "stocks")
              .length === 0 ? (
              <div className="p-4 text-center text-gray-500 bg-white rounded-md border">
                No stock investments found.
              </div>
            ) : (
              allInvestments
                .filter((investment) => investment.type === "stocks")
                .map((investment) => renderMobileInvestmentCard(investment))
            )}
          </div>
        </TabsContent>

        <TabsContent value="etfs" className="m-0">
          <div className="hidden md:block rounded-md border">
            <div className="grid grid-cols-8 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-500">
              <div className="col-span-2">Name</div>
              <div>Price</div>
              <div>Today</div>
              <div>Shares</div>
              <div>Value</div>
              <div>Profit/Loss</div>
              <div></div>
            </div>
            <Separator />
            {allInvestments?.filter((investment) => investment.type === "etfs")
              .length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No ETF investments found.
              </div>
            ) : (
              allInvestments
                ?.filter((investment) => investment.type === "etfs")
                .map((investment) => (
                  <div key={investment.id}>
                    <div className="grid grid-cols-8 gap-4 p-4 items-center">
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-medium">{investment.name}</div>
                            <div className="flex items-center gap-1">
                              <div className="text-sm text-gray-500">
                                {investment.symbol}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>${Number(investment.price).toFixed(2)}</div>
                      <div className="flex items-center">
                        {Number(investment.performance_ytd) > 0 ? (
                          <>
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-500">
                              {Number(investment.performance_ytd).toFixed(2)}%
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                            <span className="text-red-500">
                              {Number(investment.performance_ytd).toFixed(2)}%
                            </span>
                          </>
                        )}
                      </div>
                      <div>{investment.shares}</div>
                      <div>
                        $
                        {(
                          Number(investment.price) * Number(investment.shares)
                        ).toFixed(2)}
                      </div>
                      <div
                        className={
                          investment.percentageprofit > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        ${(investment.dailyprofit ?? 0).toFixed(2)} (
                        {(investment.percentageprofit ?? 0).toFixed(2)}%)
                      </div>
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewInvestment(investment.id)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))
            )}
          </div>

          <div className="md:hidden">
            {allInvestments.filter((investment) => investment.type === "etfs")
              .length === 0 ? (
              <div className="p-4 text-center text-gray-500 bg-white rounded-md border">
                No ETF investments found.
              </div>
            ) : (
              allInvestments
                .filter((investment) => investment.type === "etfs")
                .map((investment) => renderMobileInvestmentCard(investment))
            )}
          </div>
        </TabsContent>

        <TabsContent value="crypto" className="m-0">
          <div className="hidden md:block rounded-md border">
            <div className="grid grid-cols-8 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-500">
              <div className="col-span-2">Name</div>
              <div>Price</div>
              <div>Today</div>
              <div>Shares</div>
              <div>Value</div>
              <div>Profit/Loss</div>
              <div></div>
            </div>
            <Separator />
            {allInvestments?.filter(
              (investment: UserInvestment) => investment.type === "crypto"
            ).length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No Crypto investments found.
              </div>
            ) : (
              allInvestments
                .filter((inv: UserInvestment) => inv.type === "crypto")
                .map((investment: UserInvestment) => {
                  const symbol = investment.symbol.toUpperCase();
                  const meta = SUPPORTED_CRYPTOS[symbol];
                  const priceData = meta ? cryptoPrices[symbol] : undefined;

                  const price = priceData?.price ?? 0;
                  const change = priceData?.change ?? 0;
                  const shares = Number(investment.shares);
                  const value = price * shares;

                  return (
                    <div key={investment.id}>
                      <div className="grid grid-cols-8 gap-4 p-4 items-center">
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <Bitcoin className="h-4 w-4 text-amber-500" />
                            <div>
                              <div className="font-medium">
                                {meta?.name ?? investment.name}
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="text-sm text-gray-500">
                                  {symbol}
                                </div>
                                {investment.isRetirement && (
                                  <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                                    Retirement
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>${price.toFixed(2)}</div>
                        <div className="flex items-center">
                          {change > 0 ? (
                            <>
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                              <span className="text-green-500">
                                {change.toFixed(2)}%
                              </span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                              <span className="text-red-500">
                                {change.toFixed(2)}%
                              </span>
                            </>
                          )}
                        </div>
                        <div>{shares}</div>
                        <div>${value.toFixed(2)}</div>
                        <div
                          className={
                            investment.percentageprofit > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          ${(investment.dailyprofit ?? 0).toFixed(2)} (
                          {(investment.percentageprofit ?? 0).toFixed(2)}%)
                        </div>
                        <div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewInvestment(investment.id)}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  );
                })
            )}
          </div>

          <div className="md:hidden">
            {allInvestments.filter((investment) => investment.type === "crypto")
              .length === 0 ? (
              <div className="p-4 text-center text-gray-500 bg-white rounded-md border">
                No crypto investments found.
              </div>
            ) : (
              allInvestments
                .filter((investment) => investment.type === "crypto")
                .map((investment) => renderMobileInvestmentCard(investment))
            )}
          </div>
        </TabsContent>

        <TabsContent value="retirement" className="m-0">
          <div className="hidden md:block rounded-md border">
            <div className="grid grid-cols-8 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-500">
              <div className="col-span-2">Name</div>
              <div>Price</div>
              <div>Today</div>
              <div>Shares</div>
              <div>Value</div>
              <div>Profit/Loss</div>
              <div></div>
            </div>
            <Separator />
            {allInvestments?.filter(
              (investment) => investment.type === "retirement"
            ).length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No retirement investments found.
              </div>
            ) : (
              allInvestments
                .filter((investment) => investment.type === "retirement")
                .map((investment) => (
                  <div key={investment.id}>
                    <div className="grid grid-cols-8 gap-4 p-4 items-center">
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          {investment.type === "crypto" && (
                            <Bitcoin className="h-4 w-4 text-amber-500" />
                          )}
                          <div>
                            <div className="font-medium">{investment.name}</div>
                            <div className="flex items-center gap-1">
                              <div className="text-sm text-gray-500">
                                {investment.symbol}
                              </div>
                              <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                                Retirement
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>${Number(investment.price).toFixed(2)}</div>
                      <div className="flex items-center">
                        {Number(investment.change_percentage) > 0 ? (
                          <>
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-500">
                              {Number(investment.change_percentage).toFixed(2)}%
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                            <span className="text-red-500">
                              {Number(investment.change_percentage).toFixed(2)}%
                            </span>
                          </>
                        )}
                      </div>
                      <div>{investment.shares}</div>
                      <div>
                        $
                        {(
                          Number(investment.price) * Number(investment.shares)
                        ).toFixed(2)}
                      </div>
                      <div
                        className={
                          investment.percentageprofit > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        ${(investment.dailyprofit ?? 0).toFixed(2)} (
                        {(investment.percentageprofit ?? 0).toFixed(2)}%)
                      </div>
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            router.push(
                              `/dashboard/investments/${investment.id}`
                            )
                          }
                        >
                          View
                        </Button>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))
            )}
          </div>

          <div className="md:hidden">
            {allInvestments.filter(
              (investment) => investment.type === "retirement"
            ).length === 0 ? (
              <div className="p-4 text-center text-gray-500 bg-white rounded-md border">
                No retirement investments found.
              </div>
            ) : (
              allInvestments
                .filter((investment) => investment.type === "retirement")
                .map((investment) => renderMobileInvestmentCard(investment))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
