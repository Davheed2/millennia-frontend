"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { ApiResponse, Investment } from "@/interfaces";
import { callApi } from "@/lib/helpers";
import { useQueryClient } from "@tanstack/react-query";

// Define plans with ROI information - same as in pricing page
const INVESTMENT_PLANS = [
  {
    id: "gold",
    name: "Gold",
    price: 10000,
    roi: 147.5,
    isPopular: false,
    description: "Conservative investors",
    features: [
      "Basic market research",
      "Educational resources",
      "Standard customer support",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 25000,
    roi: 189.5,
    isPopular: true,
    description: "Income investors",
    features: [
      "All Gold features plus RMD",
      "Advanced market research",
      "Real-time market data",
      "Retirement planning tools",
      "Priority customer support",
    ],
  },
  {
    id: "diamond",
    name: "Diamond",
    price: 50000,
    roi: 279.5,
    isPopular: false,
    description: "Growth investors",
    features: [
      "All Platinum features",
      "Professional-grade research",
      "Tax-loss harvesting",
      "Dedicated financial advisor",
      "Exclusive retirement opportunities",
      "24/7 premium support",
    ],
  },
];

// Define retirement account types
const RETIREMENT_ACCOUNT_TYPES = [
  {
    id: "traditional-ira",
    name: "Traditional IRA",
    description: "Tax-deferred retirement account",
    taxBenefits: "Tax-deductible contributions, tax-deferred growth",
    withdrawal: "Taxed as income upon withdrawal",
    earlyWithdrawal: "10% penalty before age 59½ (with exceptions)",
    contributionLimit: "$7,500 per year (2025), $8,000 if 50+",
  },
  {
    id: "roth-ira",
    name: "Roth IRA",
    description: "After-tax retirement account with tax-free growth",
    taxBenefits: "Tax-free growth and Tax free withdrawals",
    withdrawal: "Tax-free after age 59½ and 5+ years from first contribution",
    earlyWithdrawal: "Contributions can be withdrawn penalty-free anytime",
    contributionLimit: "$8,000 per year (2025)",
  },
  {
    id: "401k",
    name: "401(k)",
    description: "Employer-sponsored retirement plan",
    taxBenefits: "Tax-deferred contributions and growth",
    withdrawal: "Taxed as income upon withdrawal",
    earlyWithdrawal: "10% penalty before age 59½ (with exceptions)",
    contributionLimit: "$31,500 per year (2025) if 50+, $35,000 if 60+",
  },
  {
    id: "sep-ira",
    name: "SEP IRA",
    description: "Simplified Employee Pension for self-employed",
    taxBenefits: "Tax-deductible contributions, tax-deferred growth",
    withdrawal: "Taxed as income upon withdrawal",
    earlyWithdrawal: "10% penalty before age 59½ (with exceptions)",
    contributionLimit:
      "25% of compensation or $72,000 (2025)",
  },
];

export default function RetirementPlans() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedAccountType, setSelectedAccountType] = useState<string | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("plans");
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowModal(true);
  };

  const selectedInvestment = [
    {
      name: "Apple Inc.",
      symbol: "AAPL",
    },
    {
      name: "Tesla Inc.",
      symbol: "TSLA",
    },
    {
      name: "Amazon.com Inc.",
      symbol: "AMZN",
    },
    {
      name: "NVIDIA Corporation",
      symbol: "NVDA",
    },
    {
      name: "Microsoft Corp.",
      symbol: "MSFT",
    },
    {
      name: "Alphabet Inc.",
      symbol: "GOOGL",
    },
    {
      name: "Snowflake Inc.",
      symbol: "SNOW",
    },
    {
      name: "Roku Inc.",
      symbol: "ROKU",
    },
    {
      name: "Coinbase Global Inc.",
      symbol: "COIN",
    },
    {
      name: "S&P 500 ETF",
      symbol: "SPY",
    },
    {
      name: "Vanguard Total Market ETF",
      symbol: "VTI",
    },
    {
      name: "iShares Russell 2000",
      symbol: "IWM",
    },
    {
      name: "ARK Innovation ETF",
      symbol: "ARKK",
    },
    {
      name: "Global X Robotics & AI",
      symbol: "BOTZ",
    },
    {
      name: "iShares Global Clean Energy",
      symbol: "ICLN",
    },
    {
      name: "Vanguard Dividend Appreciation",
      symbol: "VIG",
    },
    {
      name: "Schwab U.S. Dividend Equity",
      symbol: "SCHD",
    },
    {
      name: "iShares Select Dividend",
      symbol: "DVY",
    },
  ];

  const handleAddToPortfolio = async () => {
    if (!selectedPlan || !selectedAccountType) return;

    const randomIndex = Math.floor(Math.random() * selectedInvestment.length);
    const randomInvestment = selectedInvestment[randomIndex];

    try {
      const { data: responseData, error } = await callApi<
        ApiResponse<Investment>
      >("/investment/create", {
        isRetirement: true,
        plan: selectedPlan,
        retirementAccountType: selectedAccountType,
        type: "retirement",
        symbol: randomInvestment.symbol,
        name: randomInvestment.name,
      });

      if (error) throw new Error(error.message);

      if (responseData?.status === "success") {
        toast.success("Investment Added Successfully", {
          description: "Investment Added Successfully.",
        });
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
      setSelectedAccountType(null);
      setSelectedPlan(null);
    } finally {
      setSelectedAccountType(null);
      setSelectedPlan(null);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6 mt-16 lg:mt-0">
        <h1 className="text-2xl font-bold">Retirement Plans</h1>
      </div>

      <div className="mb-6">
        <p className="text-gray-600">
          Our retirement plans are designed to help you build a secure financial
          future. Choose a plan that aligns with your retirement goals and risk
          tolerance.
        </p>
      </div>

      <Tabs
        defaultValue="plans"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-2 max-w-md">
          <TabsTrigger value="plans">Investment Plans</TabsTrigger>
          <TabsTrigger value="accounts">Account Types</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {INVESTMENT_PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all ${
                  selectedPlan === plan.id
                    ? "ring-2 ring-primary shadow-md"
                    : ""
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-invest text-white px-3 py-1 text-xs font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold">
                      ${plan.price.toLocaleString()}
                      <span className="text-base font-normal text-muted-foreground">
                        {" "}
                        /month
                      </span>
                    </div>

                    {/* <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-green-600" />
                      <span className="text-green-600 font-medium">
                        {plan.roi}% Est. ROI
                      </span>
                    </div> */}

                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="text-sm flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                    className={`w-full ${
                      selectedPlan === plan.id
                        ? "bg-invest hover:bg-invest-secondary text-white"
                        : ""
                    }`}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {RETIREMENT_ACCOUNT_TYPES.map((account) => (
              <Card
                key={account.id}
                className={`overflow-hidden transition-all ${
                  selectedAccountType === account.id
                    ? "ring-2 ring-primary shadow-md"
                    : ""
                }`}
              >
                <CardHeader>
                  <CardTitle>{account.name}</CardTitle>
                  <CardDescription>{account.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        {account.contributionLimit}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">
                          Tax Benefits:
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {account.taxBenefits}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Withdrawal:</span>
                        <p className="text-sm text-muted-foreground">
                          {account.withdrawal}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">
                          Early Withdrawal:
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {account.earlyWithdrawal}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={
                      selectedAccountType === account.id ? "default" : "outline"
                    }
                    className={`w-full ${
                      selectedAccountType === account.id
                        ? "bg-invest hover:bg-invest-secondary text-white"
                        : ""
                    }`}
                    onClick={() => setSelectedAccountType(account.id)}
                  >
                    {selectedAccountType === account.id
                      ? "Selected"
                      : "Select Account Type"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-center">
        <Button
          disabled={!selectedPlan || !selectedAccountType}
          onClick={handleAddToPortfolio}
          className="px-8 bg-invest hover:bg-invest-secondary text-white"
        >
          Add to My Portfolio
        </Button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Select Account Type</h3>
            <p className="mb-4">
              Please select a retirement account type to continue:
            </p>

            <div className="space-y-2 mb-6">
              {RETIREMENT_ACCOUNT_TYPES.map((account) => (
                <div
                  key={account.id}
                  className={`p-3 border rounded-md cursor-pointer ${
                    selectedAccountType === account.id
                      ? "border-invest bg-invest/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedAccountType(account.id)}
                >
                  <div className="font-medium">{account.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {account.description}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button
                className="bg-invest hover:bg-invest-secondary text-white"
                disabled={!selectedAccountType}
                onClick={() => {
                  setActiveTab("accounts");
                  setShowModal(false);
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
