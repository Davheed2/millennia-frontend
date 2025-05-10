"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import CryptoSelector, {
  supportedCryptocurrencies,
} from "@/components/crypto/CryptoSelector";
import {
  Search,
  TrendingUp,
  Bitcoin,
  PieChart,
  // Badge,
  // DollarSign,
  Check,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge as UIBadge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ApiResponse, Stocks, ETFS, Investment } from "@/interfaces";
import { callApi } from "@/lib/helpers";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type CryptoPriceMap = {
  [id: string]: {
    price: number;
    change: number;
  };
};

// Investment plans with ROI information
const INVESTMENT_PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: 3000,
    roi: 147.5,
    isPopular: false,
    description: "Perfect for beginners",
    features: [
      "Commission-free stock trading",
      "Basic market research",
      "Educational resources",
      "Standard customer support",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    price: 7000,
    roi: 189.5,
    isPopular: true,
    description: "For active investors",
    features: [
      "All Basic features",
      "Advanced market research",
      "Real-time market data",
      "Automatic portfolio rebalancing",
      "Retirement planning tools",
      "Priority customer support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 15000,
    roi: 279.5,
    isPopular: false,
    description: "For serious investors",
    features: [
      "All Plus features",
      "Professional-grade research",
      "Tax-loss harvesting",
      "Dedicated financial advisor",
      "Custom investment strategies",
      "Exclusive investment opportunities",
      "24/7 premium support",
    ],
  },
];

export default function NewInvestment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("stocks");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  //const [investmentAmount, setInvestmentAmount] = useState(100);
  const [stocksData, setStocksData] = useState<Stocks[]>([]);
  const [etfData, setEtfData] = useState<ETFS[]>([]);
  //const [isForRetirement, setIsForRetirement] = useState(false);
  const [showPlanSelection, setShowPlanSelection] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<{
    type: string;
    id: string;
    name: string;
    price: number;
    symbol: string;
  } | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<
    (typeof INVESTMENT_PLANS)[0] | null
  >(null);
  const queryClient = useQueryClient();

  // Get the plan from URL params if provided
  const planId = searchParams.get("plan");

  useEffect(() => {
    if (planId) {
      const plan = INVESTMENT_PLANS.find((p) => p.id === planId);
      if (plan) {
        setSelectedPlan(plan);
      }
    }
  }, [planId]);

  const {
    //data: stocks,
    //isLoading: loading,
    //error: queryError,
  } = useQuery<Stocks[], Error>({
    queryKey: ["stocks"],
    queryFn: async () => {
      const { data: responseData, error } = await callApi<
        ApiResponse<Stocks[]>
      >("/assets/stocks");
      if (error) {
        throw new Error(
          error.message || "Something went wrong while fetching stocks data."
        );
      }
      if (!responseData?.data) {
        throw new Error("No stock details found");
      }

      //console.log(responseData.data);
      setStocksData(responseData.data);
      return responseData.data;
    },
  });

  const {
    //data: etfs,
    //isLoading: loading,
    //error: queryError,
  } = useQuery<ETFS[], Error>({
    queryKey: ["etfs"],
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
      setEtfData(responseData.data);
      return responseData.data;
    },
  });

  const COINGECKO_IDS: Record<string, string> = {
    bitcoin: "bitcoin",
    ethereum: "ethereum",
    litecoin: "litecoin",
    bnb: "binancecoin",
    xrp: "ripple",
    solana: "solana",
    usdt_trc20: "tether",
    usdt_erc20: "tether",
  };

  const cryptoIds = Object.keys(COINGECKO_IDS);
  const {
    data: cryptoPrices,
    isLoading,
    //error,
  } = useQuery<CryptoPriceMap, Error>({
    queryKey: ["crypto-prices"],
    queryFn: async () => {
      const coingeckoIds = cryptoIds.map((id) => COINGECKO_IDS[id]).join(",");

      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoIds}&vs_currencies=usd&include_24hr_change=true`
      );

      const data = await res.json();

      const formatted: CryptoPriceMap = {};
      cryptoIds.forEach((id) => {
        const coinId = COINGECKO_IDS[id];
        if (data[coinId]) {
          formatted[id] = {
            price: data[coinId].usd,
            change: data[coinId].usd_24h_change,
          };
        }
      });

      return formatted;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const handleInvestmentSelect = (type: string, id: string) => {
    const itemDetails = {
      type,
      id,
      name: "",
      price: 0,
      symbol: "",
    };

    if (type === "crypto") {
      const crypto = supportedCryptocurrencies.find((c) => c.id === id);
      itemDetails.name = crypto ? `${crypto.name}` : id;
      itemDetails.price =
        cryptoPrices?.[id as keyof typeof cryptoPrices]?.price ?? 0;
      itemDetails.symbol = crypto ? `${crypto.symbol}` : id;
    } else if (type === "stocks") {
      const stock = (stocksData ?? []).find((s) => s.asset_id === id);
      itemDetails.name = stock ? `${stock.name}` : id;
      itemDetails.price = Number(stock?.price) || 0;
      itemDetails.symbol = stock ? `${stock.symbol}` : id;
    } else if (type === "etfs") {
      const etf = (etfData ?? []).find((s) => s.asset_id === id);
      itemDetails.name = etf ? `${etf.name}` : id;
      itemDetails.price = Number(etf?.net_assets) || 0;
      itemDetails.symbol = etf ? `${etf.symbol}` : id;
    }

    setSelectedInvestment(itemDetails);
    setShowPlanSelection(true);
  };

  const handleSelectPlan = (plan: (typeof INVESTMENT_PLANS)[0]) => {
    setSelectedPlan(plan);
  };

  const handleConfirmInvestment = async () => {
    if (!selectedInvestment || !selectedPlan) return;

    // Calculate estimated returns based on plan's ROI
    const estimatedAnnualReturn = (
      (selectedPlan.price * selectedPlan.roi) /
      100
    ).toFixed(2);

    try {
      const { data: responseData, error } = await callApi<
        ApiResponse<Investment>
      >("/investment/create", {
        isRetirement: false,
        plan: selectedPlan.id,
        //retirementAccountType,
        type: selectedInvestment.type,
        symbol: selectedInvestment.symbol,
        name: selectedInvestment.name,
      });

      if (error) throw new Error(error.message);

      if (responseData?.status === "success") {
        toast.success(
          <div className="space-y-2">
            <p className="font-medium">Investment Added Successfully</p>
            <p className="text-sm">{`${selectedInvestment.name} (${selectedPlan.name} Plan)`}</p>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span>{`Est. return: $${estimatedAnnualReturn} (${selectedPlan.roi}%)`}</span>
            </div>
          </div>
        );
        queryClient.invalidateQueries({ queryKey: ["investments"] });
      }

      setTimeout(() => {
        router.push("/dashboard/investments");
      }, 2000);
    } catch (err) {
      toast.error("Failed to add investment to portfolio", {
        description:
          err instanceof Error ? err.message : "Something went wrong",
      });
      setSelectedInvestment(null);
      setSelectedPlan(null);
    } finally {
      setSelectedInvestment(null);
      setSelectedPlan(null);
    }
  };

  const filterItems = (items: Stocks[]) => {
    if (!searchTerm) return items;
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.symbol &&
          item.symbol.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const filterEtfItems = (items: ETFS[]) => {
    if (!searchTerm) return items;
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.symbol &&
          item.symbol.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const filteredStocks = filterItems(stocksData);
  const filteredETFs = filterEtfItems(etfData);

  // If showing plan selection, render plan cards
  if (showPlanSelection) {
    return (
      <>
        <div className="space-y-6 mt-16 lg:mt-0">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Select Investment Plan</h1>
              <p className="text-muted-foreground mt-2">
                Choose a plan for your {selectedInvestment?.name} investment
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowPlanSelection(false)}
            >
              Back
            </Button>
          </div>

          {selectedInvestment && (
            <Card className="p-4 md:p-6 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                    {selectedInvestment.type === "crypto" ? (
                      <Bitcoin className="h-5 w-5 text-amber-500" />
                    ) : selectedInvestment.type === "etfs" ? (
                      <PieChart className="h-5 w-5 text-invest" />
                    ) : (
                      <TrendingUp className="h-5 w-5 text-invest" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedInvestment.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Current price:{" "}
                      {selectedInvestment.type === "etfs"
                        ? `$${(selectedInvestment.price / 1e9).toFixed(1)}B`
                        : `$${selectedInvestment.price.toFixed(2)}`}
                    </p>
                  </div>
                </div>
                {/* {isForRetirement && (
                  <UIBadge
                    variant="outline"
                    className="bg-invest/10 text-invest border-invest"
                  >
                    Retirement Portfolio
                  </UIBadge>
                )} */}
              </div>
            </Card>
          )}

          <div className="grid md:grid-cols-3 gap-8 relative">
            {INVESTMENT_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`border rounded-xl p-6 flex flex-col transition-all cursor-pointer ${
                  selectedPlan?.id === plan.id
                    ? "border-invest bg-invest/5 shadow-md"
                    : "border-gray-200 hover:border-invest/50 hover:shadow-sm"
                }`}
                onClick={() => handleSelectPlan(plan)}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-invest text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="relative">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-1">
                    ${plan.price.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={16} className="text-green-600" />
                    <span className="text-green-600 font-medium">
                      {plan.roi}% Est. ROI
                    </span>
                  </div>
                  <p className="text-foreground/70 mb-6">{plan.description}</p>

                  <ul className="mb-8 flex-grow space-y-3">
                    {plan.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check
                          size={18}
                          className="text-invest mr-2 mt-1 flex-shrink-0"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 3 && (
                      <li className="text-sm text-muted-foreground">
                        +{plan.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                {selectedPlan?.id === plan.id ? (
                  <Button
                    className="w-full bg-invest hover:bg-invest-secondary text-white mt-auto"
                    onClick={handleConfirmInvestment}
                  >
                    Confirm Selection
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full border-invest text-invest hover:bg-invest/5 mt-auto hover:bg-invest"
                    onClick={() => handleSelectPlan(plan)}
                  >
                    Select Plan
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="space-y-6 mt-16 lg:mt-0">
        <div>
          <h1 className="text-2xl font-bold">New Investment</h1>
          <p className="text-muted-foreground mt-2">
            Select from our wide range of investment options to build your
            portfolio
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for investments..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-sm font-medium">Add to Retirement</span>
            <button
              type="button"
              onClick={() => setIsForRetirement(!isForRetirement)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isForRetirement ? "bg-invest" : "bg-input"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${
                  isForRetirement ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div> */}
        </div>

        <Tabs
          defaultValue="stocks"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-8 w-full">
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="etfs">ETFs</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
          </TabsList>

          <TabsContent value="stocks" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {filteredStocks.length === 0 ? (
                <Card className="text-center p-6">
                  <p className="text-muted-foreground">No stocks found.</p>
                </Card>
              ) : (
                filteredStocks.map((stock) => (
                  <Card key={stock.asset_id} className="overflow-hidden">
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-invest" />
                          </div>
                          <div>
                            <h3 className="font-medium line-clamp-1">
                              {stock.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {stock.symbol}
                            </p>
                            <UIBadge
                              variant="outline"
                              className="text-xs bg-gray-100 font-normal"
                            >
                              Technology
                            </UIBadge>
                          </div>
                        </div>

                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                          <p className="font-medium">
                            ${Number(stock.price).toFixed(2)}
                          </p>
                          <p
                            className={`text-sm ${
                              Number(stock.change_percentage) >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            } ml-2 sm:ml-0`}
                          >
                            {Number(stock.change_percentage) >= 0 ? "+" : ""}
                            {Number(stock.change_percentage).toFixed(2)}%
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button
                          onClick={() =>
                            handleInvestmentSelect("stocks", stock.asset_id)
                          }
                          className="w-full bg-invest hover:bg-invest-secondary text-white"
                        >
                          Select & Continue
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="etfs" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {filteredETFs.length === 0 ? (
                <Card className="text-center p-6">
                  <p className="text-muted-foreground">No ETFs found.</p>
                </Card>
              ) : (
                filteredETFs.map((etf) => (
                  <Card key={etf.asset_id} className="overflow-hidden">
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                            <PieChart className="h-5 w-5 text-invest" />
                          </div>
                          <div>
                            <h3 className="font-medium line-clamp-1">
                              {etf.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                {etf.symbol}
                              </span>
                              <UIBadge
                                variant="outline"
                                className="text-xs bg-gray-100 font-normal"
                              >
                                Broad Market
                              </UIBadge>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                          <p className="font-medium">
                            ${(parseFloat(etf.net_assets) / 1e9).toFixed(1)}B
                          </p>
                          <p
                            className={`text-sm ${
                              Number(Number(etf.performance_ytd) * 100) >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            } ml-2 sm:ml-0`}
                          >
                            {Number(Number(etf.performance_ytd) * 100) >= 0
                              ? "+"
                              : ""}
                            ${(Number(etf.performance_ytd) * 100).toFixed(2)}%
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button
                          onClick={() =>
                            handleInvestmentSelect("etfs", etf.asset_id)
                          }
                          className="w-full bg-invest hover:bg-invest-secondary text-white"
                        >
                          Select & Continue
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="crypto" className="space-y-6">
            <Card className="p-4 md:p-6">
              <div className="mb-6">
                <CryptoSelector
                  selectedCrypto={selectedCrypto}
                  onSelectCrypto={setSelectedCrypto}
                />
              </div>

              {selectedCrypto && (
                <div className="mt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                        <Bitcoin className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">
                          {
                            supportedCryptocurrencies.find(
                              (c) => c.id === selectedCrypto
                            )?.name
                          }
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {
                            supportedCryptocurrencies.find(
                              (c) => c.id === selectedCrypto
                            )?.symbol
                          }
                          {supportedCryptocurrencies.find(
                            (c) => c.id === selectedCrypto
                          )?.network &&
                            ` (${
                              supportedCryptocurrencies.find(
                                (c) => c.id === selectedCrypto
                              )?.network
                            })`}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                      <p className="font-medium">
                        $
                        {isLoading || !cryptoPrices?.[selectedCrypto]
                          ? "Loading..."
                          : cryptoPrices[selectedCrypto].price.toFixed(2)}
                      </p>
                      <p
                        className={`text-sm ${
                          (cryptoPrices?.[selectedCrypto]?.change ?? 0) >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        } ml-2 sm:ml-0`}
                      >
                        {(cryptoPrices?.[selectedCrypto]?.change ?? 0) >= 0
                          ? "+"
                          : ""}
                        {(cryptoPrices?.[selectedCrypto]?.change ?? 0).toFixed(
                          2
                        )}
                        %
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() =>
                      handleInvestmentSelect("crypto", selectedCrypto)
                    }
                    className="w-full bg-invest hover:bg-invest-secondary text-white"
                  >
                    Select & Continue
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
