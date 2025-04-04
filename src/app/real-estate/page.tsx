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
import { Building, Home, TrendingUp, DollarSign } from "lucide-react";

export default function RealEstate() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-xl gradient-text mb-6">Real Estate</h1>
            <p className="text-lg text-muted-foreground">
              Invest in real estate without the hassle of property management.
              Our platform makes property investing accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-invest" />
                  REITs
                </CardTitle>
                <CardDescription>Real Estate Investment Trusts</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>High dividend yields</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Diversified property exposure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Low minimum investment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Liquid investment vehicle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Commercial, residential, and specialty REITs</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-invest hover:bg-invest-secondary text-white">
                  Explore REITs
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-invest" />
                  Crowdfunded Real Estate
                </CardTitle>
                <CardDescription>
                  Direct investment in property projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Invest in specific properties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Access to commercial and residential deals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Higher potential returns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Start with just $5,000</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>No property management headaches</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-invest hover:bg-invest-secondary text-white">
                  Browse Properties
                </Button>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-16" />

          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-center mb-12">
              Why invest in Real Estate?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Income</h3>
                <p className="text-muted-foreground">
                  Generate passive income through dividends and rental yields.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Appreciation</h3>
                <p className="text-muted-foreground">
                  Benefit from long-term property value appreciation.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Diversification</h3>
                <p className="text-muted-foreground">
                  Real estate typically has low correlation with other asset
                  classes.
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
