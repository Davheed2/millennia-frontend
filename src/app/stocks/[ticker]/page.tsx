"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ApiResponse, Stocks } from "@/interfaces";
import { callApi } from "@/lib/helpers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { wishlistType, zodValidator } from "@/lib/validators/validateWithZod";
import { WishlistData } from "@/interfaces/ApiResponse";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const stocksData: Record<
  string,
  { name: string; description: string; image: string }
> = {
  AAPL: {
    name: "Apple Inc.",
    description:
      "Leading technology company known for its iPhone, iPad, Mac, Apple Watch, and services like Apple Music and iCloud. A pioneer in consumer electronics and software.",
    image:
      "https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=1000&auto=format&fit=crop",
  },
  TSLA: {
    name: "Tesla Inc.",
    description:
      "Innovative electric vehicle manufacturer and clean energy company, led by Elon Musk. Known for its Tesla cars, energy storage solutions, and advancements in autonomous driving technology.",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop",
  },
  AMZN: {
    name: "Amazon.com Inc.",
    description:
      "Global e-commerce and cloud computing leader, offering a wide range of products and services, including Amazon Web Services (AWS), Amazon Prime, and Alexa devices.",
    image:
      "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=1000&auto=format&fit=crop",
  },
  NVDA: {
    name: "NVIDIA Corporation",
    description:
      "Leader in graphics processing units (GPUs) and artificial intelligence, powering gaming, data centers, and AI applications across industries.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
  },
  MSFT: {
    name: "Microsoft Corp.",
    description:
      "Global technology leader specializing in software, cloud computing, and hardware, with products like Windows, Office 365, Azure, and Xbox.",
    image:
      "https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?q=80&w=1000&auto=format&fit=crop",
  },
  GOOGL: {
    name: "Alphabet Inc.",
    description:
      "Parent company of Google, dominating digital advertising, search, YouTube, and cloud computing through Google Cloud, with ventures in AI and quantum computing.",
    image:
      "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=1000&auto=format&fit=crop",
  },
  SNOW: {
    name: "Snowflake Inc.",
    description:
      "Cloud-based data platform that enables data storage, processing, and analytics, known for its rapid growth in the data cloud market.",
    image:
      "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=1000&auto=format&fit=crop",
  },
  ROKU: {
    name: "Roku Inc.",
    description:
      "Leading streaming platform for TV, offering devices and software that connect users to streaming services, with a growing presence in advertising technology.",
    image:
      "https://images.unsplash.com/photo-1593359677879-4bb92f829d1?q=80&w=1000&auto=format&fit=crop",
  },
  COIN: {
    name: "Coinbase Global Inc.",
    description:
      "Top U.S.-based cryptocurrency exchange platform, providing trading, custody, and other crypto-related financial services to millions of users.",
    image:
      "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?q=80&w=1000&auto=format&fit=crop",
  },
};

export default function StockDetails({
  params,
}: {
  params: { ticker: string };
}) {
  const stock = stocksData[params.ticker.toUpperCase()];
  const queryClient = useQueryClient();
  const router = useRouter();

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
    data: stocks,
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

  // Sample market data and metrics as of April 9, 2025 (approximate based on trends)
  const marketData = (stocks ?? []).reduce(
    (acc, stock) => {
      const ticker = stock.symbol.toUpperCase();
      acc.price[ticker] = parseFloat(stock.price);
      acc.change[
        ticker
      ] = `${stock.change_dollar} (${stock.change_percentage}%)`;
      acc.volume[ticker] = stock.volume ? `${stock.volume}M` : "N/A";
      acc.marketCap[ticker] = stock.market_cap
        ? `${(parseFloat(stock.market_cap) / 1e3).toFixed(1)}B`
        : "N/A";
      acc.peRatio[ticker] = stock.pe_ratio ? parseFloat(stock.pe_ratio) : 0;
      acc.dividendYield[ticker] = stock.dividend_yield
        ? `${stock.dividend_yield}%`
        : "N/A";
      acc.weekHigh[ticker] = stock.fifty_two_week_high
        ? parseFloat(stock.fifty_two_week_high)
        : 0;
      acc.weekLow[ticker] = stock.fifty_two_week_low
        ? parseFloat(stock.fifty_two_week_low)
        : 0;
      return acc;
    },
    {
      price: {},
      change: {},
      volume: {},
      marketCap: {},
      peRatio: {},
      dividendYield: {},
      weekHigh: {},
      weekLow: {},
    } as {
      price: Record<string, number>;
      change: Record<string, string>;
      volume: Record<string, string>;
      marketCap: Record<string, string>;
      peRatio: Record<string, number>;
      dividendYield: Record<string, string>;
      weekHigh: Record<string, number>;
      weekLow: Record<string, number>;
    }
  );

  const ticker = params.ticker.toUpperCase();
  const currentData = marketData;

  return (
    <>
      <Navbar />
      <div className="container py-12">
        <h1 className="heading-xl gradient-text text-center mb-8">
          {stock.name}
        </h1>
        <div className="relative w-full h-64 mb-8 rounded-xl overflow-hidden">
          <Image
            src={stock.image}
            alt={stock.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
          <div className="absolute bottom-8 left-8">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
              {stock.name}
            </h1>
            <p className="text-white/90 text-xl">
              Ticker: {params.ticker.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register("symbol")} value={ticker} />
                <input type="hidden" {...register("name")} value={stock.name} />
                <input
                  type="hidden"
                  {...register("brand")}
                  value="Technology"
                />
                <p className="text-muted-foreground mb-4">
                  {stock.description}
                </p>
                <p className="text-muted-foreground mb-4">
                  {stock.name} continues to innovate in its respective field,
                  maintaining a strong market position through strategic
                  investments and technological advancements. For example,{" "}
                  {stock.name} has recently focused on expanding its{" "}
                  {ticker === "AAPL"
                    ? "services and AI integration"
                    : ticker === "TSLA"
                    ? "electric vehicle production and autonomous driving"
                    : ticker === "AMZN"
                    ? "cloud computing and logistics"
                    : ticker === "NVDA"
                    ? "AI and GPU technologies"
                    : ticker === "MSFT"
                    ? "cloud services and AI"
                    : ticker === "GOOGL"
                    ? "AI and quantum computing"
                    : ticker === "SNOW"
                    ? "data cloud solutions"
                    : ticker === "ROKU"
                    ? "streaming and ad tech"
                    : "cryptocurrency services"}
                  , driving significant growth and investor interest.
                </p>
                <Button
                  className="bg-invest hover:bg-invest-secondary text-white mr-3"
                  onClick={() => router.push("/signin")}
                >
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
                <CardTitle>Market Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-medium">
                      ${currentData.price[ticker]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Change</span>
                    <span
                      className={
                        (currentData.change[ticker] ?? "").includes("-")
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {currentData.change[ticker]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volume</span>
                    <span className="font-medium">
                      {currentData.volume[ticker]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Market Cap</span>
                    <span className="font-medium">
                      ${currentData.marketCap[ticker]}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">P/E Ratio</span>
                    <span className="font-medium">
                      {currentData.peRatio[ticker]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Dividend Yield
                    </span>
                    <span className="font-medium">
                      {currentData.dividendYield[ticker]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">52-Week High</span>
                    <span className="font-medium">
                      ${currentData.weekHigh[ticker]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">52-Week Low</span>
                    <span className="font-medium">
                      ${currentData.weekLow[ticker]}
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
