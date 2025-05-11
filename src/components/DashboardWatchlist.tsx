"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Heart, Search, TrendingUp, TrendingDown, X } from "lucide-react";
import { toast } from "sonner";
import { ApiResponse, Wishlist } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { callApi } from "@/lib/helpers";

export default function Watchlist() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWishlist = wishlist.filter(
    (item) =>
      item?.wishlist?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.wishlist?.symbol?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    //data: watchlist,
    //isLoading: loading,
    //error: queryError,
  } = useQuery<Wishlist[], Error>({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const { data: responseData, error } = await callApi<
        ApiResponse<Wishlist[]>
      >("/wishlist/user");
      if (error) {
        throw new Error(
          error.message ||
            "Something went wrong while fetching your watch list."
        );
      }
      if (!responseData?.data) {
        throw new Error("No watch list found");
      }
      // toast.success("Watch list Fetched", {
      //   description: "Successfully fetched watch list.",
      // });

      setWishlist(responseData.data);
      return responseData.data;
    },
  });

  const removeFromWishlist = async (id: string) => {
    setWishlist(wishlist.filter((item) => item.wishlist.id !== id));

    try {
      const { data: responseData, error } = await callApi<ApiResponse<null>>(
        `/wishlist/delete`,
        {
          wishlistId: id,
        }
      );

      if (error) throw new Error(error.message);
      if (responseData?.status === "success") {
        toast.success("Removed from watchlist", {
          description: "The investment has been removed from your watchlist.",
        });
        return true;
      }
      return false;
    } catch (err) {
      toast.error("Watch list removal Failed", {
        description:
          err instanceof Error ? err.message : "An unexpected error occurred.",
      });
      return false;
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 mt-16 lg:mt-0">
        <h1 className="text-xl sm:text-2xl font-bold">My Watchlist</h1>
        {/* <Button className="bg-invest hover:bg-invest-secondary text-white">
          <Plus className="h-4 w-4 mr-2" /> Add Investment
        </Button> */}
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
            <div className="text-center py-8 sm:py-12">
              <Heart className="h-10 sm:h-12 w-10 sm:w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900">
                Your wishlist is empty
              </h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">
                {searchTerm
                  ? "No matches found. Try a different search."
                  : "Add investments to keep track of them"}
              </p>
              {searchTerm && (
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="mx-auto"
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              {/* Desktop Header - Hidden on mobile */}
              <div className="hidden sm:grid grid-cols-5 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-500">
                <div className="col-span-2">Name</div>
                <div>Current Price</div>
                <div>Today&apos;s Change</div>
                <div>Actions</div>
              </div>
              <Separator className="hidden sm:block" />

              {/* Item List */}
              {filteredWishlist.map((item) => (
                <div key={item.wishlist.id}>
                  {/* Mobile view */}
                  <div className="sm:hidden p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{item.wishlist.name}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{item.wishlist.symbol}</span>
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-xs">
                            {item.wishlist.brand}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant={null}
                        size="icon"
                        onClick={() => removeFromWishlist(item.wishlist.id)}
                        className="text-gray-500 hover:text-red-500 mt-1"
                      >
                        <X className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div>
                        <div className="text-sm text-gray-500">Price:</div>
                        <div>${Number(item.metrics.price).toFixed(2)}</div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-500">Change:</div>
                        <div className="flex items-center">
                          {item.wishlist.brand === "Broad Market" ? (
                            Number(
                              (Number(item.metrics.performance_ytd) || 0) * 100
                            ) >= 0 ? (
                              <>
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-green-500">
                                  {Number(
                                    (Number(item.metrics.performance_ytd) ||
                                      0) * 100
                                  ).toFixed(2)}
                                  %
                                </span>
                              </>
                            ) : (
                              <>
                                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                                <span className="text-red-500">
                                  {Number(
                                    (Number(item.metrics.performance_ytd) ||
                                      0) * 100
                                  ).toFixed(2)}
                                  %
                                </span>
                              </>
                            )
                          ) : Number(item.metrics.change_percentage) > 0 ? (
                            <>
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                              <span className="text-green-500">
                                {Number(item.metrics.change_percentage).toFixed(
                                  2
                                )}
                                %
                              </span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                              <span className="text-red-500">
                                {Number(item.metrics.change_percentage).toFixed(
                                  2
                                )}
                                %
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push("/dashboard/new-investment")}
                      >
                        Buy
                      </Button>
                    </div>
                  </div>

                  {/* Desktop view */}
                  <div className="hidden sm:grid grid-cols-5 gap-4 p-4 items-center">
                    <div className="col-span-2">
                      <div className="font-medium">{item.wishlist.name}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{item.wishlist.symbol}</span>
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-xs">
                          {item.wishlist.brand}
                        </span>
                      </div>
                    </div>
                    <div>${Number(item.metrics.price).toFixed(2)}</div>
                    <div className="flex items-center">
                      {item.wishlist.brand === "Broad Market" ? (
                        Number(
                          (Number(item.metrics.performance_ytd) || 0) * 100
                        ) >= 0 ? (
                          <>
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-500">
                              {Number(
                                (Number(item.metrics.performance_ytd) || 0) *
                                  100
                              ).toFixed(2)}
                              %
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                            <span className="text-red-500">
                              {Number(
                                (Number(item.metrics.performance_ytd) || 0) *
                                  100
                              ).toFixed(2)}
                              %
                            </span>
                          </>
                        )
                      ) : Number(item.metrics.change_percentage) > 0 ? (
                        <>
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500">
                            {Number(item.metrics.change_percentage).toFixed(2)}%
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-red-500">
                            {Number(item.metrics.change_percentage).toFixed(2)}%
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Buy
                      </Button>
                      <Button
                        variant={null}
                        size="icon"
                        onClick={() => removeFromWishlist(item.wishlist.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-4 w-4 text-red-600" />
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
