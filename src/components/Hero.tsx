import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  LineChart,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="container pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 animate-fade-in">
          <h1 className="heading-xl">
            Modern Investing <br />
            for <span className="gradient-text">Everyone</span>
          </h1>
          <p className="text-lg text-foreground/80 max-w-md">
            Start building your future today with our smart, accessible
            investment platform. Low fees, expert guidance, and strategies
            tailored to your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button className="btn-primary flex items-center gap-2 text-base">
              Start Investing <ChevronRight size={18} />
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-base"
            >
              Learn More <ArrowRight size={18} />
            </Button>
          </div>
          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-invest" />
              <span className="text-sm font-medium">Secure & Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-invest-accent" />
              <span className="text-sm font-medium">
                Data-Driven Strategies
              </span>
            </div>
            <div className="flex items-center gap-2">
              <LineChart size={20} className="text-invest" />
              <span className="text-sm font-medium">Low 0.25% Fee</span>
            </div>
          </div>
        </div>

        <div className="relative animate-slide-up">
          <div className="relative w-full h-[400px] md:h-[450px]">
            {/* Main image with gradient overlay */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-invest/10 to-invest-accent/20 z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Investment analytics dashboard"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Floating cards */}
            <div
              className="absolute top-24 -left-8 z-20 glass-card p-4 w-56 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Portfolio Growth</h4>
                <TrendingUp size={16} className="text-invest-accent" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-invest-accent/20 text-invest-accent rounded-md px-2 py-1 text-xs font-medium">
                  +12.8%
                </div>
                <span className="text-xs text-foreground/70">This month</span>
              </div>
              <div className="h-2 bg-muted rounded-full mt-2">
                <div className="h-2 bg-gradient-to-r from-invest to-invest-accent rounded-full w-3/4"></div>
              </div>
            </div>

            <div
              className="absolute bottom-24 -right-8 z-20 glass-card p-4 w-56 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Strategy Mix</h4>
                <LineChart size={16} className="text-invest" />
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="bg-invest-light text-invest rounded-md p-1.5 text-xs font-medium text-center">
                  Stocks
                </div>
                <div className="bg-invest-light text-invest rounded-md p-1.5 text-xs font-medium text-center">
                  Bonds
                </div>
                <div className="bg-invest-light text-invest rounded-md p-1.5 text-xs font-medium text-center">
                  ETFs
                </div>
              </div>
              <div className="mt-2 flex">
                <div className="h-1.5 bg-invest w-1/2 rounded-l-full"></div>
                <div className="h-1.5 bg-invest-secondary w-1/4"></div>
                <div className="h-1.5 bg-invest-accent w-1/4 rounded-r-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
