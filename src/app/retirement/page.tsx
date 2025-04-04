import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LineChart, Lock, TrendingUp, Calculator } from "lucide-react";

export default function Retirement() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-xl gradient-text mb-6">Retirement Planning</h1>
            <p className="text-lg text-muted-foreground">
              Secure your future with our retirement investment options.
              Start planning today for a comfortable tomorrow.
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
                    <span><strong>Traditional IRA:</strong> Tax-deferred growth potential</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span><strong>Roth IRA:</strong> Tax-free withdrawals in retirement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span><strong>SEP IRA:</strong> For self-employed individuals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span><strong>401(k) Rollovers:</strong> Consolidate old employer plans</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-invest hover:bg-invest-secondary text-white">
                  Open a Retirement Account
                </Button>
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
                    <span><strong>Target Date Funds:</strong> Automatically adjusts risk as you approach retirement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span><strong>Conservative Portfolio:</strong> Focused on capital preservation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span><strong>Balanced Portfolio:</strong> Mix of growth and income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span><strong>Growth Portfolio:</strong> Higher risk, higher potential return</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-invest hover:bg-invest-secondary text-white">
                  Explore Portfolio Options
                </Button>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-16" />

          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg text-center mb-12">Retirement Planning Tools</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Retirement Calculator</h3>
                <p className="text-muted-foreground">Estimate how much you need to save for a comfortable retirement.</p>
                <Button variant="outline" className="mt-4">Try Calculator</Button>
              </div>
              
              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Goal Planner</h3>
                <p className="text-muted-foreground">Set personalized retirement goals and track your progress.</p>
                <Button variant="outline" className="mt-4">Set Goals</Button>
              </div>
              
              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Social Security Estimator</h3>
                <p className="text-muted-foreground">Understand how Social Security will impact your retirement plan.</p>
                <Button variant="outline" className="mt-4">Estimate Benefits</Button>
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto bg-invest/5 p-8 rounded-xl">
            <h2 className="heading-md text-center mb-6">Schedule a Retirement Consultation</h2>
            <p className="text-center mb-6">
              Speak with our retirement specialists to build a personalized retirement strategy.
            </p>
            <div className="flex justify-center">
              <Button className="bg-invest hover:bg-invest-secondary text-white">
                Book a Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}