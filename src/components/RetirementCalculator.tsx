"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calculator } from "lucide-react";

// Define form schema
const formSchema = z.object({
  currentAge: z.coerce
    .number()
    .min(18, "Must be at least 18")
    .max(100, "Must be under 100"),
  retirementAge: z.coerce
    .number()
    .min(40, "Must be at least 40")
    .max(100, "Must be under 100"),
  currentSavings: z.coerce.number().min(0, "Must be a positive number"),
  monthlyContribution: z.coerce.number().min(0, "Must be a positive number"),
  expectedReturn: z.coerce
    .number()
    .min(0, "Must be a positive number")
    .max(20, "Must be under 20%"),
  retirementIncome: z.coerce.number().min(100, "Must be at least $100"),
  inflationRate: z.coerce
    .number()
    .min(0, "Must be a positive number")
    .max(10, "Must be under 10%"),
});

const RetirementCalculator = () => {
  const [result, setResult] = useState<{
    totalContributions: number;
    totalInterest: number;
    totalAmount: number;
    monthlyIncome: number;
    monthlyContributionNeeded: number;
    retirementSavingsGoal: number;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 10000,
      monthlyContribution: 500,
      expectedReturn: 7,
      retirementIncome: 5000,
      inflationRate: 2.5,
    },
  });

  // Calculate retirement values
  const calculateRetirement = (values: z.infer<typeof formSchema>) => {
    // Get values from form
    const {
      currentAge,
      retirementAge,
      currentSavings,
      monthlyContribution,
      expectedReturn,
      retirementIncome,
      inflationRate,
    } = values;

    // Validate inputs
    if (
      isNaN(currentAge) ||
      isNaN(retirementAge) ||
      isNaN(currentSavings) ||
      isNaN(monthlyContribution) ||
      isNaN(expectedReturn) ||
      isNaN(retirementIncome) ||
      isNaN(inflationRate)
    ) {
      return {
        totalContributions: 0,
        totalInterest: 0,
        totalAmount: 0,
        monthlyIncome: 0,
        monthlyContributionNeeded: 0,
        retirementSavingsGoal: 0,
      };
    }

    // Years until retirement
    const yearsToRetirement = retirementAge - currentAge;

    // Monthly rate of return (annual rate divided by 12)
    const monthlyRate = expectedReturn / 100 / 12;

    // Number of months until retirement
    const months = yearsToRetirement * 12;

    // Calculate future value of current savings
    const futureValueOfCurrentSavings =
      currentSavings * Math.pow(1 + monthlyRate, months);

    // Calculate future value of monthly contributions
    let futureValueOfContributions = 0;
    if (monthlyRate > 0) {
      futureValueOfContributions =
        monthlyContribution *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else {
      futureValueOfContributions = monthlyContribution * months;
    }

    // Total amount at retirement
    const totalAmount =
      futureValueOfCurrentSavings + futureValueOfContributions;

    // Total contributions made
    const totalContributions = currentSavings + monthlyContribution * months;

    // Total interest earned
    const totalInterest = totalAmount - totalContributions;

    // Calculate retirement savings needed for desired income
    // Using the 4% rule as a baseline (adjust as needed)
    const withdrawalRate = 0.04;
    const annualIncomeNeeded = retirementIncome * 12;
    const retirementSavingsGoal = annualIncomeNeeded / withdrawalRate;

    // Adjust for inflation
    const adjustedRetirementSavingsGoal =
      retirementSavingsGoal *
      Math.pow(1 + inflationRate / 100, yearsToRetirement);

    // Calculate monthly contribution needed to reach goal
    let monthlyContributionNeeded = 0;
    if (monthlyRate > 0) {
      monthlyContributionNeeded =
        (adjustedRetirementSavingsGoal -
          currentSavings * Math.pow(1 + monthlyRate, months)) /
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else {
      monthlyContributionNeeded =
        (adjustedRetirementSavingsGoal - currentSavings) / months;
    }

    // Make sure monthly contribution needed is not negative
    monthlyContributionNeeded = Math.max(0, monthlyContributionNeeded);

    // Monthly income in retirement (based on 4% withdrawal rule)
    const monthlyIncome = (totalAmount * withdrawalRate) / 12;

    return {
      totalContributions,
      totalInterest,
      totalAmount,
      monthlyIncome,
      monthlyContributionNeeded,
      retirementSavingsGoal: adjustedRetirementSavingsGoal,
    };
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const calculatedResult = calculateRetirement(data);
    if (
      calculatedResult &&
      !isNaN(calculatedResult.totalAmount) &&
      !isNaN(calculatedResult.monthlyIncome)
    ) {
      setResult(calculatedResult);
    } else {
      setResult(null);
    }
  };

  const formatCurrency = (amount: number) => {
    if (isNaN(amount)) return "$NaN";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="currentAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="30" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your current age in years.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="retirementAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Retirement Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="65" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your expected retirement age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentSavings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Savings ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="10000" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your current retirement savings.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyContribution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Contribution ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="500" {...field} />
                    </FormControl>
                    <FormDescription>
                      How much you save each month.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expectedReturn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Annual Return (%)</FormLabel>
                    <div className="flex items-center space-x-4">
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          min={0}
                          max={15}
                          step={0.5}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="flex-grow"
                        />
                      </FormControl>
                      <span className="w-16 text-center">{field.value}%</span>
                    </div>
                    <FormDescription>
                      Expected annual investment return.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="retirementIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Monthly Income ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="5000" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your desired monthly income in retirement.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inflationRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inflation Rate (%)</FormLabel>
                    <div className="flex items-center space-x-4">
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          min={0}
                          max={8}
                          step={0.1}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="flex-grow"
                        />
                      </FormControl>
                      <span className="w-16 text-center">{field.value}%</span>
                    </div>
                    <FormDescription>
                      Estimated annual inflation rate.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-invest hover:bg-invest-secondary"
            >
              <Calculator className="mr-2" /> Calculate Retirement Plan
            </Button>
          </form>
        </Form>
      </Card>

      {result && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            Your Retirement Projections
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-invest/10 rounded-lg">
              <h4 className="font-medium text-sm text-foreground/70 mb-1">
                Projected Retirement Savings
              </h4>
              <p className="text-2xl font-bold text-invest">
                {formatCurrency(result.totalAmount)}
              </p>
            </div>
            <div className="p-4 bg-invest/10 rounded-lg">
              <h4 className="font-medium text-sm text-foreground/70 mb-1">
                Monthly Income in Retirement
              </h4>
              <p className="text-2xl font-bold text-invest">
                {formatCurrency(result.monthlyIncome)}
              </p>
            </div>
            <div className="p-4 bg-invest/10 rounded-lg">
              <h4 className="font-medium text-sm text-foreground/70 mb-1">
                Monthly Contribution Needed
              </h4>
              <p className="text-2xl font-bold text-invest">
                {formatCurrency(result.monthlyContributionNeeded)}
              </p>
            </div>
            <div className="p-4 bg-invest/10 rounded-lg">
              <h4 className="font-medium text-sm text-foreground/70 mb-1">
                Retirement Savings Goal
              </h4>
              <p className="text-2xl font-bold text-invest">
                {formatCurrency(result.retirementSavingsGoal)}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium mb-2">
                Contributions vs. Interest
              </h4>
              <div className="bg-gray-100 h-8 rounded-lg overflow-hidden">
                <div
                  className="bg-invest h-full"
                  style={{
                    width: `${
                      (result.totalContributions / result.totalAmount) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <div>
                  <span className="inline-block w-3 h-3 bg-invest rounded-full mr-1"></span>
                  Contributions: {formatCurrency(result.totalContributions)}
                </div>
                <div>
                  <span className="inline-block w-3 h-3 bg-invest-accent rounded-full mr-1"></span>
                  Interest: {formatCurrency(result.totalInterest)}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-medium">Key Insights</h4>
              {result.monthlyContributionNeeded >
              form.getValues("monthlyContribution") ? (
                <p className="text-sm text-red-600">
                  You need to increase your monthly contribution by{" "}
                  {formatCurrency(
                    result.monthlyContributionNeeded -
                      form.getValues("monthlyContribution")
                  )}{" "}
                  to reach your retirement goal.
                </p>
              ) : (
                <p className="text-sm text-green-600">
                  You&apos;re on track to meet your retirement income goal! You
                  can even reduce your monthly contribution by{" "}
                  {formatCurrency(
                    form.getValues("monthlyContribution") -
                      result.monthlyContributionNeeded
                  )}{" "}
                  if needed.
                </p>
              )}
            </div>
          </div>
        </Card>
      )}

      <div className="p-6 border border-invest-light rounded-lg">
        <h3 className="text-xl font-semibold mb-4">
          Tips for Retirement Planning
        </h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>Start saving early to benefit from compound interest</li>
          <li>
            Contribute to tax-advantaged retirement accounts like 401(k)s and
            IRAs
          </li>
          <li>Diversify your investments to manage risk</li>
          <li>Regularly review and adjust your retirement plan</li>
          <li>
            Consider meeting with a financial advisor for personalized advice
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RetirementCalculator;
