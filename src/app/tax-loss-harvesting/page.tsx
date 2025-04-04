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
import { BarChart2, Calculator, DollarSign, FileText } from "lucide-react";

export default function TaxLossHarvesting() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-xl gradient-text mb-6">
              Tax-Loss Harvesting
            </h1>
            <p className="text-lg text-muted-foreground">
              Minimize your tax burden and potentially increase your after-tax
              returns with our automated tax-loss harvesting strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-invest" />
                  How Tax-Loss Harvesting Works
                </CardTitle>
                <CardDescription>
                  A strategic approach to tax efficiency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>
                      Automatically sells investments that have declined in
                      value
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>
                      Replaces them with similar investments to maintain your
                      strategy
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>
                      Captures losses to offset capital gains and reduce taxes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>
                      Maintains your investment strategy and risk profile
                    </span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-invest hover:bg-invest-secondary text-white">
                  See It In Action
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-invest" />
                  Potential Tax Savings
                </CardTitle>
                <CardDescription>
                  Maximizing after-tax returns over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Offset up to $3,000 of ordinary income per year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>
                      Reduce capital gains taxes on investment profits
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>
                      Save an estimated 0.5% to 1.5% annually in tax benefits
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Carry forward excess losses to future tax years</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-invest hover:bg-invest-secondary text-white">
                  Calculate Your Savings
                </Button>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-16" />

          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg text-center mb-12">
              Tax-Loss Harvesting Benefits
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tax Efficiency</h3>
                <p className="text-muted-foreground">
                  Potentially reduce your annual tax bill through strategic loss
                  harvesting.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BarChart2 className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Improved Returns</h3>
                <p className="text-muted-foreground">
                  Increase your after-tax returns without changing your
                  investment strategy.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Simplified Taxes</h3>
                <p className="text-muted-foreground">
                  We provide detailed tax documentation for all harvested
                  losses.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-invest/5 p-8 rounded-xl">
            <h2 className="heading-md text-center mb-6">
              Start Tax-Loss Harvesting
            </h2>
            <p className="text-center mb-6">
              Investo&apos;s automated tax-loss harvesting is available on all
              taxable investment accounts with no additional cost.
            </p>
            <div className="flex justify-center">
              <Button className="bg-invest hover:bg-invest-secondary text-white">
                Enable Tax-Loss Harvesting
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
