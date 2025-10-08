import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, PieChart, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Stocks & ETFs | Millennia Trades",
    content:
      "Build a diversified portfolio with Millennia Trades. Invest in individual stocks or curated exchange-traded funds (ETFs) to maximize growth potential. Start exploring stocks and ETFs to enhance your investment strategy today.",
    url: "https://milleniatrades.com/stocks-etfs",
  });
};

export default function StocksAndETFs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-xl gradient-text mb-6">Stocks & ETFs</h1>
            <p className="text-lg text-muted-foreground">
              Build a diversified portfolio with our selection of stocks and
              exchange-traded funds (ETFs). Invest in individual companies or
              track entire market segments with low fees.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="overflow-hidden">
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop"
                  alt="Stock trading chart"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-invest" />
                  Individual Stocks
                </CardTitle>
                <CardDescription>
                  Invest in shares of your favorite companies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Access to 1000+ global stocks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Zero commission trading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Fractional shares available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Real-time market data</span>
                  </li>
                </ul>
                <Link href="/stocks">
                  <Button className="w-full mt-6 bg-invest hover:bg-invest-secondary text-white">
                    Explore Stocks
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop"
                  alt="ETF investment portfolio"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-invest" />
                  Exchange-Traded Funds
                </CardTitle>
                <CardDescription>
                  Diversify with curated ETF portfolios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Hundreds of ETFs to choose from</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Sector, theme, and index ETFs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Low expense ratios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Automatic rebalancing</span>
                  </li>
                </ul>
                <Link href="/etfs">
                  <Button className="w-full mt-6 bg-invest hover:bg-invest-secondary text-white">
                    Explore ETFs
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-16" />

          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-center mb-12">
              Why invest in Stocks & ETFs with Millennia Trades?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Long-term Growth</h3>
                <p className="text-muted-foreground">
                  Historically, stocks have outperformed other asset classes
                  over long periods.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <PieChart className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Diversification</h3>
                <p className="text-muted-foreground">
                  Spread risk across different sectors, industries, and company
                  sizes.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Protection</h3>
                <p className="text-muted-foreground">
                  All investments are insured up to $500,000 through SIPC
                  protection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
