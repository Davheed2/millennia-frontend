import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, TrendingUp } from "lucide-react";
import Link from "next/link";

// Define plans with ROI information
const INVESTMENT_PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: 3000,
    roi: 147.5,
    isPopular: false,
    description: "Perfect for beginners",
    features: [
      "Commission-free stock trading",
      "Basic market research",
      "Educational resources",
      "Standard customer support",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    price: 7000,
    roi: 189.5,
    isPopular: true,
    description: "For active investors",
    features: [
      "All Basic features",
      "Advanced market research",
      "Real-time market data",
      "Automatic portfolio rebalancing",
      "Retirement planning tools",
      "Priority customer support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 15000,
    roi: 279.5,
    isPopular: false,
    description: "For serious investors",
    features: [
      "All Plus features",
      "Professional-grade research",
      "Tax-loss harvesting",
      "Dedicated financial advisor",
      "Custom investment strategies",
      "Exclusive investment opportunities",
      "24/7 premium support",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-foreground/80">
            Choose the plan that fits your investing style, with no hidden fees
            or surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {INVESTMENT_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`border ${
                plan.isPopular ? "border-invest bg-invest/5" : "border-gray-200"
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
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-green-600" />
                <span className="text-green-600 font-medium">
                  {plan.roi}% Est. Annual ROI
                </span>
              </div>
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

              <Link href={`/dashboard/new-investment?plan=${plan.id}`}>
                <Button className="w-full bg-invest hover:bg-invest-secondary text-white">
                  Select Plan
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Are there any hidden fees?",
                a: "No, we believe in complete transparency. The monthly subscription fee is all you pay for our service. There are no additional trading commissions or account fees.",
              },
              {
                q: "Can I upgrade or downgrade my plan?",
                a: "Yes, you can change your plan at any time. The new pricing will take effect at the start of your next billing cycle.",
              },
              {
                q: "Is there a free trial available?",
                a: "At the moment, we do not offer free trials. However, you can cancel your subscription at any time if you feel the service is not right for you.",
              },
              {
                q: "What payment methods do you accept?",
                a: "Currently, we only accept cryptocurrency payments for subscriptions. In the future, we hope to resolve this and offer more payment options.",
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-foreground/80">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
