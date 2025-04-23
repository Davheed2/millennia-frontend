"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Search, TrendingUp, TrendingDown, Plus, X } from "lucide-react";
//import { useToast } from "@/hooks/use-toast";

// Mock data for wishlist
const initialWishlist = [
  {
    id: 1,
    name: "Amazon.com Inc.",
    ticker: "AMZN",
    price: 178.35,
    change: 1.23,
    changePercent: 0.69,
    type: "stock",
    sector: "Technology",
  },
  {
    id: 2,
    name: "Vanguard Total Stock Market ETF",
    ticker: "VTI",
    price: 257.89,
    change: 0.56,
    changePercent: 0.22,
    type: "etf",
    sector: "Broad Market",
  },
  {
    id: 3,
    name: "Alphabet Inc.",
    ticker: "GOOGL",
    price: 145.62,
    change: -2.31,
    changePercent: -1.56,
    type: "stock",
    sector: "Technology",
  },
  {
    id: 4,
    name: "iShares Core S&P 500 ETF",
    ticker: "IVV",
    price: 464.87,
    change: 1.02,
    changePercent: 0.22,
    type: "etf",
    sector: "Large Cap",
  },
  {
    id: 5,
    name: "Johnson & Johnson",
    ticker: "JNJ",
    price: 147.32,
    change: -0.85,
    changePercent: -0.57,
    type: "stock",
    sector: "Healthcare",
  },
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [searchTerm, setSearchTerm] = useState("");
  //const { toast } = useToast();

  // Filter wishlist based on search term
  const filteredWishlist = wishlist.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
    // toast({
    //   title: "Removed from wishlist",
    //   description: "The investment has been removed from your wishlist.",
    // });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <Button className="bg-invest hover:bg-invest-secondary text-white">
          <Plus className="h-4 w-4 mr-2" /> Add Investment
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Investment Watchlist</CardTitle>
          <CardDescription>
            Keep track of investments you&apos;re interested in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search watchlist..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredWishlist.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">
                Your wishlist is empty
              </h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">
                {searchTerm
                  ? "No matches found. Try a different search."
                  : "Add investments to keep track of them"}
              </p>
              {searchTerm ? (
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="mx-auto"
                >
                  Clear Search
                </Button>
              ) : (
                <Button className="bg-invest hover:bg-invest-secondary text-white mx-auto">
                  <Plus className="h-4 w-4 mr-2" /> Add Investments
                </Button>
              )}
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-500">
                <div className="col-span-2">Name</div>
                <div>Current Price</div>
                <div>Today&apos;s Change</div>
                <div>Actions</div>
              </div>
              <Separator />
              {filteredWishlist.map((item) => (
                <div key={item.id}>
                  <div className="grid grid-cols-5 gap-4 p-4 items-center">
                    <div className="col-span-2">
                      <div className="font-medium">{item.name}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{item.ticker}</span>
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-xs">
                          {item.sector}
                        </span>
                      </div>
                    </div>
                    <div>${item.price.toFixed(2)}</div>
                    <div className="flex items-center">
                      {item.changePercent > 0 ? (
                        <>
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500">
                            {item.changePercent.toFixed(2)}%
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-red-500">
                            {item.changePercent.toFixed(2)}%
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Buy
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
