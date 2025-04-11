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
import { PieChart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Explore ETFs | Millennia Trades",
};

const etfsData = {
  index: [
    {
      name: "S&P 500 ETF",
      ticker: "SPY",
      description: "Tracks the S&P 500 index of large-cap U.S. stocks.",
      image:
        "https://images.unsplash.com/photo-1468254095679-bbcba94a7066?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Vanguard Total Market ETF",
      ticker: "VTI",
      description: "Covers the entire U.S. stock market.",
      image:
        "https://images.unsplash.com/photo-1642543348745-03b1219733d9?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "iShares Russell 2000",
      ticker: "IWM",
      description: "Tracks small-cap U.S. stocks.",
      image:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1000&auto=format&fit=crop",
    },
  ],
  thematic: [
    {
      name: "ARK Innovation ETF",
      ticker: "ARKK",
      description: "Focuses on disruptive innovation and tech.",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Global X Robotics & AI",
      ticker: "BOTZ",
      description: "Invests in robotics and AI leaders.",
      image:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "iShares Global Clean Energy",
      ticker: "ICLN",
      description: "Clean and renewable energy exposure.",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop",
    },
  ],
  dividend: [
    {
      name: "Vanguard Dividend Appreciation",
      ticker: "VIG",
      description: "Focuses on companies with rising dividends.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Schwab U.S. Dividend Equity",
      ticker: "SCHD",
      description: "Tracks high-dividend U.S. companies.",
      image:
        "https://images.unsplash.com/photo-1607944024060-0450380ddd33?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "iShares Select Dividend",
      ticker: "DVY",
      description: "Focuses on high-yield U.S. dividend stocks.",
      image:
        "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1000&auto=format&fit=crop",
    },
  ],
};

export default function ETFsPage() {
  return (
    <>
      <Navbar />
      <div className="container py-12">
        <h1 className="heading-xl gradient-text text-center mb-8">
          Explore ETFs
        </h1>
        <div className="mb-8 flex justify-center">
          <Input
            placeholder="Search ETFs (e.g., SPY, QQQ)"
            className="max-w-md"
          />
        </div>
        <Tabs defaultValue="index" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-xl mx-auto mb-6">
            <TabsTrigger value="index">Index ETFs</TabsTrigger>
            <TabsTrigger value="thematic">Thematic</TabsTrigger>
            <TabsTrigger value="dividend">Dividend</TabsTrigger>
          </TabsList>

          {Object.entries(etfsData).map(([key, etfs]) => (
            <TabsContent value={key} key={key}>
              <div className="grid md:grid-cols-3 gap-6">
                {etfs.map((etf, i) => (
                  <Card
                    key={i}
                    className="hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <div className="relative w-full h-36">
                      <Image
                        src={etf.image}
                        alt={etf.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-2 left-4 text-white font-bold text-xl">
                        {etf.ticker}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-invest" /> {etf.name}
                      </CardTitle>
                      <CardDescription>Ticker: {etf.ticker}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {etf.description}
                      </p>
                      <Link href={`/etfs/${etf.ticker.toLowerCase()}`}>
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
