import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Explore Stocks | Millennia Trades",
};

const stocksData = {
  top: [
    {
      name: "Apple Inc.",
      ticker: "AAPL",
      description: "Leading tech company known for iPhones and Macs.",
      image:
        "https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Tesla Inc.",
      ticker: "TSLA",
      description: "Innovative electric vehicle and clean energy company.",
      image:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Amazon.com Inc.",
      ticker: "AMZN",
      description: "E-commerce and cloud computing giant.",
      image:
        "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=1000&auto=format&fit=crop",
    },
  ],
  tech: [
    {
      name: "NVIDIA Corporation",
      ticker: "NVDA",
      description: "Graphics processing and AI powerhouse.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Microsoft Corp.",
      ticker: "MSFT",
      description: "Software and cloud computing leader.",
      image:
        "https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Alphabet Inc.",
      ticker: "GOOGL",
      description: "Parent company of Google, dominates digital advertising.",
      image:
        "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=1000&auto=format&fit=crop",
    },
  ],
  growth: [
    {
      name: "Snowflake Inc.",
      ticker: "SNOW",
      description: "Cloud data platform with explosive growth potential.",
      image:
        "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Roku Inc.",
      ticker: "ROKU",
      description: "Leader in TV streaming platforms and ad tech.",
      image:
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Coinbase Global Inc.",
      ticker: "COIN",
      description: "Top crypto trading platform in the U.S.",
      image:
        "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?q=80&w=1000&auto=format&fit=crop",
    },
  ],
};

export default function StocksPage() {
  return (
    <>
      <Navbar />
      <div className="container py-12">
        <h1 className="heading-xl gradient-text text-center mb-8">
          Explore Stocks
        </h1>
        <div className="mb-8 flex justify-center">
          <Input
            placeholder="Search stocks (e.g., AAPL, TSLA)"
            className="max-w-md"
          />
        </div>
        <Tabs defaultValue="top" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-xl mx-auto mb-6">
            <TabsTrigger value="top">Top Stocks</TabsTrigger>
            <TabsTrigger value="tech">Tech Sector</TabsTrigger>
            <TabsTrigger value="growth">High Growth</TabsTrigger>
          </TabsList>

          {Object.entries(stocksData).map(([key, stocks]) => (
            <TabsContent value={key} key={key}>
              <div className="grid md:grid-cols-3 gap-6">
                {stocks.map((stock, i) => (
                  <Card
                    key={i}
                    className="hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <div className="relative w-full h-36">
                      <Image
                        src={stock.image}
                        alt={stock.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-2 left-4 text-white font-bold text-xl">
                        {stock.ticker}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-invest" />{" "}
                        {stock.name}
                      </CardTitle>
                      <CardDescription>Ticker: {stock.ticker}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {stock.description}
                      </p>
                      <Link href={`/stocks/${stock.ticker.toLowerCase()}`}>
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Footer />
    </>
  );
}
