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
import {
  LineChart,
  Lock,
  //TrendingUp,
  Calculator,
  Target,
  Bitcoin,
  Check,
} from "lucide-react";
import Link from "next/link";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Retirement Planning | Millennia Trades",
    content:
      "Explore personalized retirement planning tools, investment options, and tax-advantaged accounts. Start securing your financial future today with our retirement plans, including traditional IRAs, 401(k)s, and more.",
    url: "https://milleniatrades.com/retirement",
  });
};

const INVESTMENT_PLANS = [
  {
    id: "gold",
    name: "Gold",
    price: 10000,
    roi: 147.5,
    isPopular: false,
    description: "Conservative investors",
    features: [
      "Basic market research",
      "Educational resources",
      "Standard customer support",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 25000,
    roi: 189.5,
    isPopular: true,
    description: "Income investors",
    features: [
      "All Gold features plus RMD",
      "Advanced market research",
      "Real-time market data",
      "Retirement planning tools",
      "Priority customer support",
    ],
  },
  {
    id: "diamond",
    name: "Diamond",
    price: 50000,
    roi: 279.5,
    isPopular: false,
    description: "Growth investors",
    features: [
      "All Platinum features",
      "Professional-grade research",
      "Tax-loss harvesting",
      "Dedicated financial advisor",
      "Exclusive retirement opportunities",
      "24/7 premium support",
    ],
  },
];

export default function Retirement() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-xl gradient-text mb-6">
              Retirement Planning
            </h1>
            <p className="text-lg text-muted-foreground">
              Secure your future with our retirement investment options. Start
              planning today for a comfortable tomorrow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-invest" />
                  Tax-Advantaged Accounts
                </CardTitle>
                <CardDescription>
                  Maximize tax benefits while saving for retirement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>
                      <strong>Traditional IRA:</strong> Tax-deferred growth
                      potential
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>
                      <strong>Roth IRA:</strong> Tax-free withdrawals in
                      retirement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>
                      <strong>SEP IRA:</strong> For self-employed individuals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>
                      <strong>401(k) Rollovers:</strong> Consolidate old
                      employer plans
                    </span>
                  </li>
                </ul>
                <Link href="/dashboard/retirement-plans">
                  <Button className="w-full mt-6 bg-invest hover:bg-invest-secondary text-white">
                    Open a Retirement Account
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-invest" />
                  Retirement Portfolio Options
                </CardTitle>
                <CardDescription>
                  Professionally managed retirement portfolios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>
                      <strong>Target Date Funds:</strong> Automatically adjusts
                      risk as you approach retirement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>
                      <strong>Stock-ETF Mix:</strong> Balanced exposure to
                      equity markets
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>
                      <strong>Crypto-Enhanced:</strong> Digital assets
                      allocation for long-term growth
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>
                      <strong>Custom Allocation:</strong> Personally tailored to
                      your risk tolerance
                    </span>
                  </li>
                </ul>
                <Link href="/pricing">
                  <Button className="w-full mt-6 bg-invest hover:bg-invest-secondary text-white">
                    Explore Portfolio Options
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* New section showcasing the investment plans */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="heading-lg text-center mb-8">
              Retirement Plans
            </h2>
            <p className="text-center max-w-3xl mx-auto mb-10 text-muted-foreground">
              Choose an investment plan that aligns with your retirement goals.
              Each plan offers different features and estimated returns.
            </p>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {INVESTMENT_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`border ${
                    plan.isPopular
                      ? "border-invest bg-invest/5"
                      : "border-gray-200"
                  } rounded-xl p-8 flex flex-col transition-all ${
                    plan.isPopular ? "shadow-md" : "hover:shadow-md"
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-invest text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-1">
                    ${plan.price.toLocaleString()}
                    <span className="text-lg font-normal text-foreground/70">
                      /month
                    </span>
                  </div>
                  {/* <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={16} className="text-green-600" />
                    <span className="text-green-600 font-medium">
                      {plan.roi}% Est. ROI
                    </span>
                  </div> */}
                  <p className="text-foreground/70 mb-6">{plan.description}</p>

                  <ul className="mb-8 flex-grow space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check
                          size={18}
                          className="text-invest-accent mr-2 mt-1 flex-shrink-0"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/dashboard/retirement-plans`}>
                    <Button className="w-full bg-invest hover:bg-invest-secondary text-white">
                      Select Plan
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-16" />

          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg text-center mb-12">
              Retirement Planning Tools
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Goal Planner</h3>
                <p className="text-muted-foreground mb-4">
                  Set personalized retirement goals and track your progress.
                </p>
                <Link href="/retirement/goal-planner">
                  <Button
                    variant="outline"
                    className="bg-invest text-white hover:bg-invest-secondary"
                  >
                    Try Goal Planner
                  </Button>
                </Link>
              </div>

              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Retirement Calculator
                </h3>
                <p className="text-muted-foreground mb-4">
                  Estimate how much you need to save for a comfortable
                  retirement.
                </p>
                <Link href="/retirement-calculator">
                  <Button
                    variant="outline"
                    className="bg-invest text-white hover:bg-invest-secondary"
                  >
                    Try Calculator
                  </Button>
                </Link>
              </div>

              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Bitcoin className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Crypto Retirement Portfolio
                </h3>
                <p className="text-muted-foreground mb-4">
                  Explore how crypto can enhance your retirement strategy.
                </p>
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    className="bg-invest text-white hover:bg-invest-secondary"
                  >
                    Explore Options
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-invest/5 p-8 rounded-xl">
            <h2 className="heading-md text-center mb-6">
              Schedule a Retirement Consultation
            </h2>
            <p className="text-center mb-6">
              Speak with our customer care to help you to build a personalized
              retirement strategy.
            </p>
            <div className="flex justify-center">
              <Link href="/dashboard/support-chat">
                <Button className="bg-invest hover:bg-invest-secondary text-white">
                  Contact Customer Care
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
