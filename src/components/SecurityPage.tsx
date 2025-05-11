"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Lock, Calculator, Info, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SocialSecurityPage() {
  const [age, setAge] = useState(40);
  const [yearlyIncome, setYearlyIncome] = useState(75000);
  const [retirementAge, setRetirementAge] = useState(67);
  const [calculatedBenefit, setCalculatedBenefit] = useState<{
    monthlyBenefit: number;
    yearlyBenefit: number;
    retirementAge: number;
    totalLifetimeBenefit: number;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Simple estimation formula (for demonstration purposes)
    // In reality, Social Security benefits are calculated based on a complex formula
    // that takes into account your 35 highest-earning years, indexed for inflation

    const workYears: number = retirementAge - Math.min(age, 22); // Assuming work starts at 22 at the latest
    const averageIndexedMonthlyEarnings: number = yearlyIncome / 12;

    let estimatedBenefit: number;

    // Very simplified version of the bend points formula
    if (averageIndexedMonthlyEarnings <= 1000) {
      estimatedBenefit = averageIndexedMonthlyEarnings * 0.9;
    } else if (averageIndexedMonthlyEarnings <= 6000) {
      estimatedBenefit = 900 + (averageIndexedMonthlyEarnings - 1000) * 0.32;
    } else {
      estimatedBenefit =
        900 + 1600 + (averageIndexedMonthlyEarnings - 6000) * 0.15;
    }

    // Adjustment for retirement age
    if (retirementAge < 67) {
      // Reduction for early retirement (very simplified)
      estimatedBenefit = estimatedBenefit * (1 - 0.05 * (67 - retirementAge));
    } else if (retirementAge > 67) {
      // Increase for delayed retirement (very simplified)
      estimatedBenefit = estimatedBenefit * (1 + 0.08 * (retirementAge - 67));
    }

    // Ensure work history is long enough
    if (workYears < 10) {
      estimatedBenefit = 0; // Not eligible with less than 10 years of work
    } else if (workYears < 35) {
      // Reduce benefit for less than 35 years of work
      estimatedBenefit = estimatedBenefit * (workYears / 35);
    }

    setCalculatedBenefit({
      monthlyBenefit: Math.round(estimatedBenefit),
      yearlyBenefit: Math.round(estimatedBenefit * 12),
      retirementAge: retirementAge,
      totalLifetimeBenefit: Math.round(estimatedBenefit * 12 * 20), // Assuming 20 years in retirement
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="bg-invest/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-10 w-10 text-invest" />
            </div>
            <h1 className="heading-xl mb-6">Social Security Estimator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understand how Social Security benefits will contribute to your
              retirement income and plan more effectively for your financial
              future.
            </p>
          </div>

          <Alert className="mb-8 border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription>
              This is a simplified estimate. For the most accurate information
              about your Social Security benefits, visit the{" "}
              <a
                href="https://www.ssa.gov/myaccount/"
                className="text-invest underline"
              >
                Social Security Administration&apos;s official website
              </a>
              .
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-invest" />
                  Estimate Your Benefits
                </CardTitle>
                <CardDescription>
                  Enter your information to get an estimate of your Social
                  Security benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentAge">Current Age</Label>
                    <Input
                      id="currentAge"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(parseInt(e.target.value))}
                      min={18}
                      max={100}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearlyIncome">
                      Current Yearly Income ($)
                    </Label>
                    <Input
                      id="yearlyIncome"
                      type="number"
                      value={yearlyIncome}
                      onChange={(e) =>
                        setYearlyIncome(parseInt(e.target.value))
                      }
                      min={0}
                      max={1000000}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retirementAge">
                      Expected Retirement Age
                    </Label>
                    <div className="grid grid-cols-3 gap-4">
                      {[62, 67, 70].map((age) => (
                        <Button
                          key={age}
                          type="button"
                          variant={
                            retirementAge === age ? "default" : "outline"
                          }
                          className={retirementAge === age ? "bg-invest" : ""}
                          onClick={() => setRetirementAge(age)}
                        >
                          {age}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      62: Early retirement (reduced benefits)
                      <br />
                      67: Full retirement age for those born after 1960
                      <br />
                      70: Maximum benefit (delayed retirement credits)
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-invest hover:bg-invest-secondary"
                  >
                    Calculate Estimate
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div>
              {calculatedBenefit ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Lock className="h-5 w-5 text-invest" />
                      Your Estimated Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                          Monthly Benefit at Age{" "}
                          {calculatedBenefit.retirementAge}
                        </h3>
                        <p className="text-3xl font-bold text-invest">
                          ${calculatedBenefit.monthlyBenefit.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                          Yearly Benefit
                        </h3>
                        <p className="text-2xl font-semibold">
                          ${calculatedBenefit.yearlyBenefit.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                          Estimated Lifetime Benefit (20 years)
                        </h3>
                        <p className="text-xl font-semibold">
                          $
                          {calculatedBenefit.totalLifetimeBenefit.toLocaleString()}
                        </p>
                      </div>

                      <Separator />

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex gap-2">
                          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-blue-700 mb-1">
                              Planning Considerations
                            </h3>
                            <p className="text-sm text-blue-700">
                              Social Security is designed to replace only about
                              40% of pre-retirement income. Consider additional
                              retirement savings to maintain your standard of
                              living.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full flex flex-col justify-center items-center p-8 bg-muted/20">
                  <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-center text-muted-foreground">
                    Enter your information and click &quot;Calculate
                    Estimate&quot; to see your projected Social Security
                    benefits.
                  </p>
                </Card>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">When to Claim</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  You can claim Social Security as early as age 62, but your
                  benefit will be reduced. Waiting until full retirement age (67
                  for most people) provides full benefits. Delaying until age 70
                  increases your benefit even more.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Maximizing Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  To maximize your Social Security benefit, consider working at
                  least 35 years, maximizing your earnings during your working
                  years, and carefully timing when you claim benefits.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Beyond Social Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Social Security is just one pillar of retirement income.
                  Consider IRAs, 401(k)s, and other investments to build a
                  complete retirement plan that meets your needs.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-invest/5 p-8 rounded-xl mt-12">
            <h2 className="heading-md text-center mb-6">
              Get Expert Advice on Social Security
            </h2>
            <p className="text-center mb-6 max-w-2xl mx-auto">
              Our financial advisors can help you understand the best strategy
              for claiming Social Security benefits as part of your overall
              retirement plan.
            </p>
            <div className="flex justify-center">
              <Button className="bg-invest hover:bg-invest-secondary text-white">
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
