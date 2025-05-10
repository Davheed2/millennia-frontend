"use client";

//import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Briefcase,
  Heart,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
//import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useSession } from "@/store/useSession";
import { callApi } from "@/lib/helpers";
import { ApiResponse, Wallet, UserInvestmentData } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useSession((state) => state);
  const [allInvestments, setAllInvestments] = useState<UserInvestmentData>([]);

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

  const {
    //isLoading,
    //error
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

      setAllInvestments(responseData.data);
      return responseData.data;
    },
  });

  const allocation = allInvestments.reduce(
    (
      acc: {
        crypto: number;
        stocks: number;
        etfs: number;
        retirement: number;
        totalCount: number;
      },
      investment: UserInvestmentData[number]
    ) => {
      switch (investment.type) {
        case "crypto":
          acc.crypto += 1;
          break;
        case "stocks":
          acc.stocks += 1;
          break;
        case "etfs":
          acc.etfs += 1;
          break;
        case "retirement":
          acc.retirement += 1;
          break;
      }
      return acc;
    },
    {
      crypto: 0,
      stocks: 0,
      etfs: 0,
      retirement: 0,
      totalCount: allInvestments.length,
    }
  );

  // Calculate percentages
  const percentages = {
    crypto:
      allocation.totalCount > 0
        ? (allocation.crypto / allocation.totalCount) * 100
        : 0,
    stocks:
      allocation.totalCount > 0
        ? (allocation.stocks / allocation.totalCount) * 100
        : 0,
    etfs:
      allocation.totalCount > 0
        ? (allocation.etfs / allocation.totalCount) * 100
        : 0,
    retirement:
      allocation.totalCount > 0
        ? (allocation.retirement / allocation.totalCount) * 100
        : 0,
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6 mt-16 lg:mt-0">
        <h1 className="text-2xl font-bold">
          Welcome back, {user && user[0].firstName}
        </h1>
        <div>
          <span className="text-sm text-gray-500">Last updated: </span>
          <span className="text-sm font-medium">
            {new Date().toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* KYC Alert if not verified */}
      {/* {user && !user[0]?.isKycVerified && (
        <Card className="mb-6 border-orange-100 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <p className="font-medium text-orange-800">
                  Complete your identity verification
                </p>
                <p className="text-sm text-orange-700 mt-1">
                  To unlock all features and start investing, please complete
                  your KYC verification.
                </p>
                <Button className="mt-3 bg-orange-500 hover:bg-orange-600 text-white">
                  <Link href="/dashboard/kyc">Verify Identity Now</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )} */}

      {/* Portfolio Summary */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">
              Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              $
              {balance && balance[0]?.portfolioBalance
                ? balance[0].portfolioBalance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "0.00"}
            </div>
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
              <span className="text-gray-500 ml-1.5">Today</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">
              Total Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              <span>
                $
                {user &&
                  user[0].totalProfit.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </span>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-green-500 font-medium">
                {allInvestments.length > 0 && user && (
                  <div className="flex items-center mt-1 text-xs">
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
                    (7.6%)
                  </div>
                )}
                
              </span>
              <span className="text-gray-500 ml-1.5">All time</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">
              Available Funds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              $
              {balance && balance[0]?.balance
                ? balance[0].balance.toLocaleString()
                : "0.00"}
            </div>
            <div className="flex justify-between mt-2">
              <Button
                variant="outline"
                size="sm"
                className="text-invest bg-invest/5 border-invest/20 hover:bg-invest/20 hover:text-invest-dark"
              >
                <Link href="/dashboard/add-funds" className="flex items-center">
                  Add Funds
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              >
                <Link href="/dashboard/withdraw" className="flex items-center">
                  Withdraw
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-0 flex flex-row items-center justify-between">
            <div>
              <CardTitle>Investment Overview</CardTitle>
              <CardDescription>Your current asset allocation</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-invest">
              <Link href="/dashboard/investments" className="flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <BarChart3 className="h-full w-full text-gray-300" />
              {/* This would be replaced with an actual chart component */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Portfolio breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1 text-sm">
                <span>Cryptocurrency</span>
                <span className="font-medium">
                  {percentages.crypto.toFixed(0)}%
                </span>
              </div>
              <Progress value={percentages.crypto} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1 text-sm">
                <span>Stocks</span>
                <span className="font-medium">
                  {percentages.stocks.toFixed(0)}%
                </span>
              </div>
              <Progress value={percentages.stocks} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1 text-sm">
                <span>ETFs</span>
                <span className="font-medium">
                  {percentages.etfs.toFixed(0)}%
                </span>
              </div>
              <Progress value={percentages.etfs} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1 text-sm">
                <span>Retirement</span>
                <span className="font-medium">
                  {percentages.retirement.toFixed(0)}%
                </span>
              </div>
              <Progress value={percentages.retirement} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/dashboard/investments" className="group">
              <div className="border rounded-lg p-4 hover:border-invest hover:shadow transition-all duration-200">
                <div className="flex flex-col items-center text-center">
                  <div className="p-2 rounded-full bg-invest/10 group-hover:bg-invest/20 mb-2 transition-all duration-200">
                    <Briefcase className="h-6 w-6 text-invest" />
                  </div>
                  <h3 className="text-sm font-medium">My Investments</h3>
                  <p className="text-xs text-gray-500 mt-1">View portfolio</p>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/watchlist" className="group">
              <div className="border rounded-lg p-4 hover:border-invest hover:shadow transition-all duration-200">
                <div className="flex flex-col items-center text-center">
                  <div className="p-2 rounded-full bg-invest/10 group-hover:bg-invest/20 mb-2 transition-all duration-200">
                    <Heart className="h-6 w-6 text-invest" />
                  </div>
                  <h3 className="text-sm font-medium">Watchlist</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Saved investments
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/transactions" className="group">
              <div className="border rounded-lg p-4 hover:border-invest hover:shadow transition-all duration-200">
                <div className="flex flex-col items-center text-center">
                  <div className="p-2 rounded-full bg-invest/10 group-hover:bg-invest/20 mb-2 transition-all duration-200">
                    <TrendingUp className="h-6 w-6 text-invest" />
                  </div>
                  <h3 className="text-sm font-medium">Transactions</h3>
                  <p className="text-xs text-gray-500 mt-1">Activity history</p>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/referrals" className="group">
              <div className="border rounded-lg p-4 hover:border-invest hover:shadow transition-all duration-200">
                <div className="flex flex-col items-center text-center">
                  <div className="p-2 rounded-full bg-invest/10 group-hover:bg-invest/20 mb-2 transition-all duration-200">
                    <TrendingDown className="h-6 w-6 text-invest" />
                  </div>
                  <h3 className="text-sm font-medium">Referrals</h3>
                  <p className="text-xs text-gray-500 mt-1">Invite friends</p>
                </div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
