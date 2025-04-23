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
import { TrendingUp, TrendingDown, Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Mock data for investments
const allInvestments = [
  {
    id: 1,
    name: "Apple Inc.",
    ticker: "AAPL",
    price: 175.34,
    change: 2.43,
    changePercent: 1.4,
    shares: 10,
    value: 1753.40,
    profit: 243.00,
    profitPercent: 16.1,
    type: "stock"
  },
  {
    id: 2,
    name: "Microsoft Corporation",
    ticker: "MSFT",
    price: 325.89,
    change: -3.21,
    changePercent: -0.98,
    shares: 5,
    value: 1629.45,
    profit: -48.15,
    profitPercent: -2.87,
    type: "stock"
  },
  {
    id: 3,
    name: "Vanguard S&P 500 ETF",
    ticker: "VOO",
    price: 412.67,
    change: 1.34,
    changePercent: 0.33,
    shares: 4,
    value: 1650.68,
    profit: 94.80,
    profitPercent: 6.09,
    type: "etf"
  },
  {
    id: 4,
    name: "Tesla, Inc.",
    ticker: "TSLA",
    price: 189.14,
    change: 4.67,
    changePercent: 2.53,
    shares: 8,
    value: 1513.12,
    profit: 182.40,
    profitPercent: 13.7,
    type: "stock"
  },
  {
    id: 5,
    name: "iShares Core Aggregate Bond ETF",
    ticker: "AGG",
    price: 108.24,
    change: -0.17,
    changePercent: -0.16,
    shares: 12,
    value: 1298.88,
    profit: -8.28,
    profitPercent: -0.63,
    type: "etf"
  },
  {
    id: 6,
    name: "Residential Property Fund",
    ticker: "RESI001",
    price: 1250.00,
    change: 10.50,
    changePercent: 0.85,
    shares: 2,
    value: 2500.00,
    profit: 125.00,
    profitPercent: 5.26,
    type: "property"
  },
];

export default function Investments() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Investments</h1>
        <Button className="bg-invest hover:bg-invest-secondary text-white">
          <Plus className="h-4 w-4 mr-2" /> New Investment
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-0">
          <CardTitle>Portfolio Summary</CardTitle>
          <CardDescription>Overview of your investment portfolio</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Total Value</p>
              <h3 className="text-3xl font-bold">$10,345.53</h3>
              <div className="flex items-center mt-1 text-sm">
                <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
                <span className="text-green-500 font-medium">+$589.77 (6.04%)</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Today&apos;s Change</p>
              <h3 className="text-3xl font-bold">+$153.06</h3>
              <div className="flex items-center mt-1 text-sm">
                <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
                <span className="text-green-500 font-medium">+1.49%</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Total Investments</p>
              <h3 className="text-3xl font-bold">{allInvestments.length}</h3>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="bg-blue-50 hover:bg-blue-100 text-blue-700">
                  {allInvestments.filter(i => i.type === "stock").length} Stocks
                </Badge>
                <Badge variant="outline" className="bg-purple-50 hover:bg-purple-100 text-purple-700">
                  {allInvestments.filter(i => i.type === "etf").length} ETFs
                </Badge>
                <Badge variant="outline" className="bg-orange-50 hover:bg-orange-100 text-orange-700">
                  {allInvestments.filter(i => i.type === "property").length} Property
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="etfs">ETFs</TabsTrigger>
            <TabsTrigger value="property">Real Estate</TabsTrigger>
          </TabsList>

          <div className="flex w-full md:w-auto gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search investments..."
                className="pl-9 w-full md:w-[240px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <div className="rounded-md border">
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
            {allInvestments.map((investment) => (
              <div key={investment.id}>
                <div className="grid grid-cols-8 gap-4 p-4 items-center">
                  <div className="col-span-2">
                    <div className="font-medium">{investment.name}</div>
                    <div className="text-sm text-gray-500">{investment.ticker}</div>
                  </div>
                  <div>${investment.price.toFixed(2)}</div>
                  <div className="flex items-center">
                    {investment.changePercent > 0 ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-green-500">{investment.changePercent.toFixed(2)}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-red-500">{investment.changePercent.toFixed(2)}%</span>
                      </>
                    )}
                  </div>
                  <div>{investment.shares}</div>
                  <div>${investment.value.toFixed(2)}</div>
                  <div className={investment.profitPercent > 0 ? "text-green-500" : "text-red-500"}>
                    ${investment.profit.toFixed(2)} ({investment.profitPercent.toFixed(2)}%)
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="stocks" className="m-0">
          <div className="rounded-md border">
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
            {allInvestments
              .filter(investment => investment.type === "stock")
              .map((investment) => (
                <div key={investment.id}>
                  <div className="grid grid-cols-8 gap-4 p-4 items-center">
                    <div className="col-span-2">
                      <div className="font-medium">{investment.name}</div>
                      <div className="text-sm text-gray-500">{investment.ticker}</div>
                    </div>
                    <div>${investment.price.toFixed(2)}</div>
                    <div className="flex items-center">
                      {investment.changePercent > 0 ? (
                        <>
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500">{investment.changePercent.toFixed(2)}%</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-red-500">{investment.changePercent.toFixed(2)}%</span>
                        </>
                      )}
                    </div>
                    <div>{investment.shares}</div>
                    <div>${investment.value.toFixed(2)}</div>
                    <div className={investment.profitPercent > 0 ? "text-green-500" : "text-red-500"}>
                      ${investment.profit.toFixed(2)} ({investment.profitPercent.toFixed(2)}%)
                    </div>
                    <div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                  <Separator />
                </div>
            ))}
          </div>
        </TabsContent>
        
        {/* Similar structure for other tabs */}
        <TabsContent value="etfs" className="m-0">
          <div className="rounded-md border">
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
            {allInvestments
              .filter(investment => investment.type === "etf")
              .map((investment) => (
                <div key={investment.id}>
                  <div className="grid grid-cols-8 gap-4 p-4 items-center">
                    <div className="col-span-2">
                      <div className="font-medium">{investment.name}</div>
                      <div className="text-sm text-gray-500">{investment.ticker}</div>
                    </div>
                    <div>${investment.price.toFixed(2)}</div>
                    <div className="flex items-center">
                      {investment.changePercent > 0 ? (
                        <>
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500">{investment.changePercent.toFixed(2)}%</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-red-500">{investment.changePercent.toFixed(2)}%</span>
                        </>
                      )}
                    </div>
                    <div>{investment.shares}</div>
                    <div>${investment.value.toFixed(2)}</div>
                    <div className={investment.profitPercent > 0 ? "text-green-500" : "text-red-500"}>
                      ${investment.profit.toFixed(2)} ({investment.profitPercent.toFixed(2)}%)
                    </div>
                    <div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                  <Separator />
                </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="property" className="m-0">
          <div className="rounded-md border">
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
            {allInvestments
              .filter(investment => investment.type === "property")
              .map((investment) => (
                <div key={investment.id}>
                  <div className="grid grid-cols-8 gap-4 p-4 items-center">
                    <div className="col-span-2">
                      <div className="font-medium">{investment.name}</div>
                      <div className="text-sm text-gray-500">{investment.ticker}</div>
                    </div>
                    <div>${investment.price.toFixed(2)}</div>
                    <div className="flex items-center">
                      {investment.changePercent > 0 ? (
                        <>
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500">{investment.changePercent.toFixed(2)}%</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-red-500">{investment.changePercent.toFixed(2)}%</span>
                        </>
                      )}
                    </div>
                    <div>{investment.shares}</div>
                    <div>${investment.value.toFixed(2)}</div>
                    <div className={investment.profitPercent > 0 ? "text-green-500" : "text-red-500"}>
                      ${investment.profit.toFixed(2)} ({investment.profitPercent.toFixed(2)}%)
                    </div>
                    <div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                  <Separator />
                </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}