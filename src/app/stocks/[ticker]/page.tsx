import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export async function generateMetadata({
  params,
}: {
  params: { ticker: string };
}): Promise<Metadata> {
  const stock = stocksData[params.ticker.toUpperCase()];
  return {
    title: stock
      ? `${stock.name} (${params.ticker.toUpperCase()}) | Millennia Trades`
      : "Stock Not Found | Millennia Trades",
  };
}

export default function StockDetails({
  params,
}: {
  params: { ticker: string };
}) {
  const stock = stocksData[params.ticker.toUpperCase()];

  if (!stock) return notFound();

  // Sample market data and metrics as of April 9, 2025 (approximate based on trends)
  const marketData = {
    price: {
      AAPL: 187.5, // Approx. based on recent trends
      TSLA: 424.77, // Recent high from search results
      AMZN: 185.0, // Approx. based on trends
      NVDA: 93.0, // Recent price from posts on X
      MSFT: 420.0, // Approx. based on trends
      GOOGL: 188.4, // From search results
      SNOW: 150.0, // Estimated, no exact recent data
      ROKU: 60.0, // Estimated, no exact recent data
      COIN: 250.0, // Estimated, no exact recent data
    } as Record<string, number>,
    change: {
      AAPL: "+0.50 (0.27%)", // Positive trend
      TSLA: "+5.00 (1.19%)", // Recent surge
      AMZN: "+1.20 (0.65%)", // Positive trend
      NVDA: "-1.00 (-1.06%)", // Slight decline
      MSFT: "+0.80 (0.19%)", // Stable
      GOOGL: "-3.59 (-1.87%)", // Recent decline
      SNOW: "+2.00 (1.35%)", // Estimated growth
      ROKU: "-0.50 (-0.83%)", // Slight decline
      COIN: "+3.00 (1.21%)", // Crypto volatility
    } as Record<string, string>,
    volume: {
      AAPL: "45.2M", // High trading volume
      TSLA: "35.6M", // High due to recent rally
      AMZN: "28.9M", // Strong volume
      NVDA: "50.0M", // High due to AI demand
      MSFT: "22.1M", // Stable volume
      GOOGL: "29.9M", // From search results
      SNOW: "5.0M", // Lower but growing
      ROKU: "3.5M", // Moderate volume
      COIN: "7.8M", // Crypto trading volume
    } as Record<string, string>,
    marketCap: {
      AAPL: "2.9T", // Trillion-dollar club
      TSLA: "1.35T", // Recently surpassed $1T
      AMZN: "1.9T", // Trillion-dollar club
      NVDA: "2.3T", // Growing rapidly
      MSFT: "3.1T", // Top-valued company
      GOOGL: "2.4T", // Trillion-dollar club
      SNOW: "50B", // Smaller cap
      ROKU: "8B", // Smaller cap
      COIN: "60B", // Growing crypto sector
    } as Record<string, string>,
    peRatio: {
      AAPL: 27.41, // From X posts
      TSLA: 108.85, // High P/E from X posts
      AMZN: 30.88, // From X posts
      NVDA: 32.77, // From X posts
      MSFT: 28.56, // From X posts
      GOOGL: 18.98, // Low P/E from X posts
      SNOW: 85.0, // High growth tech
      ROKU: 45.0, // High growth
      COIN: 70.0, // Volatile sector
    } as Record<string, number>,
    dividendYield: {
      AAPL: "0.55%", // Recent data
      TSLA: "0%", // No dividends
      AMZN: "0%", // No dividends
      NVDA: "0.03%", // Low yield
      MSFT: "0.70%", // Stable dividend
      GOOGL: "0%", // No dividends
      SNOW: "0%", // No dividends
      ROKU: "0%", // No dividends
      COIN: "0%", // No dividends
    } as Record<string, string>,
    weekHigh: {
      AAPL: 195.0, // Recent high
      TSLA: 430.0, // Recent record
      AMZN: 190.0, // Approx.
      NVDA: 95.0, // Recent high
      MSFT: 430.0, // Approx.
      GOOGL: 201.42, // From search results
      SNOW: 155.0, // Estimated
      ROKU: 65.0, // Estimated
      COIN: 260.0, // Estimated
    } as Record<string, number>,
    weekLow: {
      AAPL: 165.0, // Recent low
      TSLA: 150.0, // Recent low
      AMZN: 145.0, // Approx.
      NVDA: 70.0, // Recent low
      MSFT: 390.0, // Approx.
      GOOGL: 130.66, // From search results
      SNOW: 120.0, // Estimated
      ROKU: 50.0, // Estimated
      COIN: 200.0, // Estimated
    } as Record<string, number>,
  };

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
              <p className="text-muted-foreground mb-4">{stock.description}</p>
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
              <Button className="bg-invest hover:bg-invest-secondary text-white mr-3">
                Buy
              </Button>
              <Button variant="outline">Add to Watchlist</Button>
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
                        currentData.change[ticker].includes("-")
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
