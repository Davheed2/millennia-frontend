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
import { Bitcoin, Shield, Zap, Lock } from "lucide-react";

export default function Cryptocurrency() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-xl gradient-text mb-6">Cryptocurrency</h1>
            <p className="text-lg text-muted-foreground">
              Invest in the future of finance with our secure cryptocurrency
              platform. Buy, sell, and store digital assets with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bitcoin className="h-5 w-5 text-invest" />
                  Popular Cryptocurrencies
                </CardTitle>
                <CardDescription>
                  Invest in established digital assets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        ₿
                      </div>
                      <span>Bitcoin (BTC)</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Buy
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        Ξ
                      </div>
                      <span>Ethereum (ETH)</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Buy
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        S
                      </div>
                      <span>Solana (SOL)</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Buy
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        P
                      </div>
                      <span>Polkadot (DOT)</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Buy
                    </Button>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-invest hover:bg-invest-secondary text-white">
                  View All Cryptocurrencies
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-invest" />
                  Crypto Features
                </CardTitle>
                <CardDescription>
                  Secure and convenient crypto investing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Trading available 24/7/365</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Cold storage security for 95% of assets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Recurring investments available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Low transaction fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Easy fiat on/off ramps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Detailed price charts and analytics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-16" />

          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-center mb-12">
              Our Cryptocurrency Security Measures
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cold Storage</h3>
                <p className="text-muted-foreground">
                  95% of all crypto assets are stored offline in air-gapped cold
                  storage vaults.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Insurance</h3>
                <p className="text-muted-foreground">
                  Digital assets are insured against theft and cybersecurity
                  breaches.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Compliance</h3>
                <p className="text-muted-foreground">
                  We follow strict regulatory guidelines to ensure legal
                  compliance.
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
