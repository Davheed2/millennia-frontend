"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Calendar,
  // Download,
  // Filter,
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ApiResponse, Transaction } from "@/interfaces";
import { callApi } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";

// Mock transaction data
// const allTransactions = [
//   {
//     id: 1,
//     type: "deposit",
//     amount: 5000,
//     status: "completed",
//     date: "2025-04-10T10:30:00",
//     method: "Bank Transfer",
//     reference: "DEP12345678",
//     description: "Deposit from Bank of America ****1234",
//   },
//   {
//     id: 2,
//     type: "withdrawal",
//     amount: 1000,
//     status: "completed",
//     date: "2025-04-05T14:15:00",
//     method: "Bank Transfer",
//     reference: "WTH87654321",
//     description: "Withdrawal to Bank of America ****1234",
//   },
//   {
//     id: 3,
//     type: "investment",
//     amount: 2500,
//     status: "completed",
//     date: "2025-04-03T09:45:00",
//     method: "Portfolio",
//     reference: "INV56781234",
//     description: "Purchase of Apple Inc. (AAPL) - 10 shares @ $250.00",
//   },
//   {
//     id: 4,
//     type: "deposit",
//     amount: 1500,
//     status: "pending",
//     date: "2025-04-01T16:20:00",
//     method: "Card Payment",
//     reference: "DEP43218765",
//     description: "Deposit from Visa ****5678",
//   },
//   {
//     id: 5,
//     type: "investment",
//     amount: 3000,
//     status: "completed",
//     date: "2025-03-28T11:10:00",
//     method: "Portfolio",
//     reference: "INV98761234",
//     description: "Purchase of Vanguard S&P 500 ETF (VOO) - 7 shares @ $428.57",
//   },
//   {
//     id: 6,
//     type: "withdrawal",
//     amount: 500,
//     status: "failed",
//     date: "2025-03-25T13:40:00",
//     method: "Bank Transfer",
//     reference: "WTH13579246",
//     description: "Withdrawal to Chase Bank ****5678 - Insufficient funds",
//   },
// ];

export default function Transactions() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [transaction, setTransaction] = useState<Transaction[]>([]);

  // Filter transactions based on active tab, search term, and status filter
  const filteredTransactions = transaction
    .filter((transaction) => {
      if (activeTab === "all") return true; // No filter for "all"
      return transaction.type === activeTab;
    })
    .filter(
      (transaction) =>
        transaction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((transaction) => {
      if (statusFilter === "all") return true; // No filter for "all"
      return transaction.status === statusFilter;
    });

  const {
    //data: watchlist,
    //isLoading: loading,
    //error: queryError,
  } = useQuery<Transaction[], Error>({
    queryKey: ["transaction"],
    queryFn: async () => {
      const { data: responseData, error } = await callApi<
        ApiResponse<Transaction[]>
      >("/transaction/user");
      if (error) {
        throw new Error(
          error.message ||
            "Something went wrong while fetching your transactions."
        );
      }
      if (!responseData?.data) {
        throw new Error("No transaction found");
      }
      toast.success("Transactions Fetched", {
        description: "Successfully fetched transactions.",
      });

      setTransaction(responseData.data);
      return responseData.data;
    },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Failed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Deposit":
        return <ArrowDownCircle className="h-4 w-4 text-green-500" />;
      case "withdrawal":
        return <ArrowUpCircle className="h-4 w-4 text-red-500" />;
      case "investment":
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View and filter your transaction history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <TabsList>
                <TabsTrigger value="all">All Transactions</TabsTrigger>
                <TabsTrigger value="Deposit">Deposits</TabsTrigger>
                <TabsTrigger value="withdrawal">Withdrawals</TabsTrigger>
                <TabsTrigger value="investment">Investments</TabsTrigger>
              </TabsList>

              <div className="flex w-full md:w-auto gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-9 w-full md:w-[240px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value={activeTab} className="m-0">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900">
                    No transactions found
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4">
                    {searchTerm || statusFilter
                      ? "Try changing your filters"
                      : "You don't have any transactions yet"}
                  </p>
                  {(searchTerm || statusFilter) && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("");
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-500">
                    <div className="lg:col-span-2">Description</div>
                    <div className="hidden lg:block">Date</div>
                    <div>Type</div>
                    <div>Amount</div>
                    <div>Status</div>
                  </div>
                  <Separator />
                  {filteredTransactions.map((transaction) => (
                    <div key={transaction.id}>
                      <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 p-4 items-center">
                        <div className="lg:col-span-2">
                          <div className="font-medium">
                            {transaction.description}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Ref: {transaction.reference}
                          </div>
                        </div>
                        <div className="hidden lg:block text-sm text-gray-500">
                          {transaction.created_at
                            ? formatDate(transaction.created_at)
                            : "N/A"}
                        </div>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(transaction.type)}
                          <span className="capitalize text-sm">
                            {transaction.type}
                          </span>
                        </div>
                        <div
                          className={`font-medium ${
                            transaction.type === "deposit"
                              ? "text-green-600"
                              : transaction.type === "withdrawal"
                              ? "text-red-600"
                              : "text-blue-600"
                          }`}
                        >
                          {transaction.type === "deposit"
                            ? "+"
                            : transaction.type === "withdrawal"
                            ? "-"
                            : ""}
                          ${transaction.amount.toLocaleString()}
                        </div>
                        <div>{getStatusBadge(transaction.status)}</div>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
