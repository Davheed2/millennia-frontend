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
import { BarChart, LineChart, PieChart, Settings, Zap } from "lucide-react";

export default function PortfolioManagement() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-xl gradient-text mb-6">
              Portfolio Management
            </h1>
            <p className="text-lg text-muted-foreground">
              Take control of your financial future with our advanced portfolio
              management tools. Optimize your investments for your unique goals
              and risk tolerance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-invest" />
                  Automated Rebalancing
                </CardTitle>
                <CardDescription>
                  Keep your portfolio aligned with your investment goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Automatic portfolio drift monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Tax-efficient rebalancing strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Customizable rebalancing thresholds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Regular or on-demand rebalancing options</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-invest hover:bg-invest-secondary text-white">
                  Learn About Rebalancing
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-invest" />
                  Smart Optimization
                </CardTitle>
                <CardDescription>
                  Advanced algorithms for better returns at your risk level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Modern portfolio theory implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Risk-adjusted return optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Factor-based investment approaches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Diversification across asset classes</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-invest hover:bg-invest-secondary text-white">
                  Optimize Your Portfolio
                </Button>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-16" />

          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg text-center mb-12">Portfolio Insights</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BarChart className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Performance Analytics
                </h3>
                <p className="text-muted-foreground">
                  In-depth performance reporting to track your progress toward
                  goals.
                </p>
                <Button variant="outline" className="mt-4">
                  View Demo
                </Button>
              </div>

              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <PieChart className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Allocation Visualization
                </h3>
                <p className="text-muted-foreground">
                  See your asset allocation across sectors, regions, and
                  investment types.
                </p>
                <Button variant="outline" className="mt-4">
                  Interactive Demo
                </Button>
              </div>

              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <LineChart className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Trend Analysis</h3>
                <p className="text-muted-foreground">
                  Track long-term trends and progress toward your investment
                  goals.
                </p>
                <Button variant="outline" className="mt-4">
                  See Example
                </Button>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-invest/5 p-8 rounded-xl">
            <h2 className="heading-md text-center mb-6">
              Start Managing Your Portfolio Today
            </h2>
            <p className="text-center mb-6">
              Join thousands of investors who trust Investo to manage their
              portfolios with advanced technology and personalized strategies.
            </p>
            <div className="flex justify-center">
              <Button className="bg-invest hover:bg-invest-secondary text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
