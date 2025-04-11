import { Check, User, PiggyBank, ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const HowItWorks = () => {
  return (
    <section className="container section-padding">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="heading-lg">How Millennia Trades works</h2>
        <p className="text-foreground/70">
          Get started in minutes with our simple, straightforward investment
          process.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="relative flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-invest-light flex items-center justify-center mb-6">
            <User className="h-8 w-8 text-invest" />
          </div>
          <h3 className="text-xl font-semibold mb-3">1. Create Your Profile</h3>
          <p className="text-foreground/70">
            Answer a few questions about your financial goals, timeline, and
            risk tolerance.
          </p>
          <div className="hidden md:block absolute top-8 right-[-30px] z-10">
            <ArrowRight className="h-6 w-6 text-invest-secondary/40" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 text-center items-center">
            <div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-invest-accent mr-2" />
                <span>Risk assessment</span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-invest-accent mr-2" />
                <span>Goal setting</span>
              </div>
            </div>

            <div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-invest-accent mr-2" />
                <span>Time horizon</span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-invest-accent mr-2" />
                <span>Income details</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-invest-light flex items-center justify-center mb-6">
            <PiggyBank className="h-8 w-8 text-invest" />
          </div>
          <h3 className="text-xl font-semibold mb-3">2. Fund Your Account</h3>
          <p className="text-foreground/70">
            Connect your bank account and make your first deposit. Start with as
            little as $100.
          </p>
          <div className="hidden md:block absolute top-8 right-[-30px] z-10">
            <ArrowRight className="h-6 w-6 text-invest-secondary/40" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 text-center items-centerr">
            <div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-invest-accent mr-2" />
                <span>Bank linking</span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-invest-accent mr-2" />
                <span>Secure transfer</span>
              </div>
            </div>

            <div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-invest-accent mr-2" />
                <span>Low minimum</span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-invest-accent mr-2" />
                <span>Auto-deposits</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-invest-light flex items-center justify-center mb-6">
            <BarChart3 className="h-8 w-8 text-invest" />
          </div>
          <h3 className="text-xl font-semibold mb-3">
            3. Watch Your Money Grow
          </h3>
          <p className="text-foreground/70">
            Our algorithm creates and manages a personalized portfolio based on
            your goals.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-center items-center">
            <div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-invest-accent mr-2" />
                <span>Auto-rebalancing</span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-invest-accent mr-2" />
                <span>Performance tracking</span>
              </div>
            </div>

            <div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-invest-accent mr-2" />
                <span>Dividend reinvesting</span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-invest-accent mr-2" />
                <span>Tax optimization</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="inline-block bg-invest/10 text-invest px-4 py-2 rounded-full font-medium mb-4">
          Ready to start your investment journey?
        </div>
        <h3 className="heading-md mb-6">
          Join over 100,000 investors growing their wealth with Millennia Trades
        </h3>
        <Link href="/signin">
          <Button className="bg-invest hover:bg-invest-secondary py-5 text-white text-base px-8">
            Get Started Now
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HowItWorks;
