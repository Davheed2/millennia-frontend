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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define form schema
const formSchema = z.object({
  initialInvestment: z.coerce.number().min(0, "Must be a positive number"),
  monthlyContribution: z.coerce.number().min(0, "Must be a positive number"),
  years: z.coerce
    .number()
    .min(1, "Must be at least 1 year")
    .max(50, "Maximum 50 years"),
  interestRate: z.coerce
    .number()
    .min(0, "Must be a positive number")
    .max(30, "Must be under 30%"),
  compoundingFrequency: z.enum([
    "annually",
    "semiannually",
    "quarterly",
    "monthly",
  ]),
});

const CompoundInterestCalculator = () => {
  const [result, setResult] = useState<{
    futureValue: number;
    totalContributions: number;
    totalInterest: number;
    yearlyData: Array<{
      year: number;
      balance: number;
      contributions: number;
      interest: number;
    }>;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialInvestment: 1000,
      monthlyContribution: 100,
      years: 10,
      interestRate: 7,
      compoundingFrequency: "annually",
    },
  });

  // Calculate compound interest
  const calculateCompoundInterest = (values: z.infer<typeof formSchema>) => {
    const {
      initialInvestment,
      monthlyContribution,
      years,
      interestRate,
      compoundingFrequency,
    } = values;

    // Validate inputs
    if (
      isNaN(initialInvestment) ||
      isNaN(monthlyContribution) ||
      isNaN(years) ||
      isNaN(interestRate)
    ) {
      return {
        futureValue: 0,
        totalContributions: 0,
        totalInterest: 0,
        yearlyData: [],
      };
    }

    // Convert annual interest rate to decimal
    const r = interestRate / 100;

    // Determine number of compounds per year
    let compoundsPerYear = 1;
    switch (compoundingFrequency) {
      case "semiannually":
        compoundsPerYear = 2;
        break;
      case "quarterly":
        compoundsPerYear = 4;
        break;
      case "monthly":
        compoundsPerYear = 12;
        break;
    }

    // Calculate rate per period
    const ratePerPeriod = r / compoundsPerYear;

    // Calculate contribution per compounding period
    const contributionPerPeriod = monthlyContribution * (12 / compoundsPerYear);

    // Track yearly data for the chart
    const yearlyData = [];
    let currentBalance = initialInvestment;
    let totalContributions = initialInvestment;

    for (let year = 0; year <= years; year++) {
      if (year === 0) {
        yearlyData.push({
          year,
          balance: currentBalance,
          contributions: totalContributions,
          interest: 0,
        });
        continue;
      }

      const yearStartBalance = currentBalance;

      for (let period = 0; period < compoundsPerYear; period++) {
        // Add contribution at the start of the period (except last period of last year)
        if (!(year === years && period === compoundsPerYear - 1)) {
          currentBalance += contributionPerPeriod;
          totalContributions += contributionPerPeriod;
        }

        // Apply interest
        const interestEarned = currentBalance * ratePerPeriod;
        if (isNaN(interestEarned)) {
          console.error("Interest calculation resulted in NaN", {
            currentBalance,
            ratePerPeriod,
          });
          return {
            futureValue: NaN,
            totalContributions: NaN,
            totalInterest: NaN,
            yearlyData: [],
          };
        }
        currentBalance += interestEarned;
      }

      const yearInterest =
        currentBalance -
        yearStartBalance -
        contributionPerPeriod * compoundsPerYear;
      yearlyData.push({
        year,
        balance: currentBalance,
        contributions: totalContributions,
        interest: yearInterest,
      });
    }

    const futureValue = currentBalance;
    const totalInterest = futureValue - totalContributions;

    return {
      futureValue,
      totalContributions,
      totalInterest,
      yearlyData,
    };
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const calculatedResult = calculateCompoundInterest(data);
    if (calculatedResult && !isNaN(calculatedResult.futureValue)) {
      setResult(calculatedResult);
    } else {
      setResult(null);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    if (isNaN(amount)) return "$NaN";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const chartData =
    result?.yearlyData.map((data) => ({
      year: data.year,
      Balance: Number(data.balance.toFixed(2)),
      Contributions: Number(data.contributions.toFixed(2)),
      Interest: Number(data.interest.toFixed(2)),
    })) || [];

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="initialInvestment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Investment ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1000" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your starting investment amount.
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
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormDescription>
                      How much you&apos;ll add each month.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Period (Years)</FormLabel>
                    <div className="flex items-center space-x-4">
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          min={1}
                          max={50}
                          step={1}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="flex-grow"
                        />
                      </FormControl>
                      <span className="w-12 text-center">{field.value}</span>
                    </div>
                    <FormDescription>
                      Length of your investment.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interestRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Interest Rate (%)</FormLabel>
                    <div className="flex items-center space-x-4">
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          min={0}
                          max={20}
                          step={0.1}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="flex-grow"
                        />
                      </FormControl>
                      <span className="w-16 text-center">{field.value}%</span>
                    </div>
                    <FormDescription>
                      Expected annual return rate.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="compoundingFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compounding Frequency</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        {...field}
                      >
                        <option value="annually">Annually</option>
                        <option value="semiannually">Semi-Annually</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </FormControl>
                    <FormDescription>
                      How often interest is compounded.
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
              <Calculator className="mr-2" /> Calculate Compound Interest
            </Button>
          </form>
        </Form>
      </Card>

      {result && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Your Investment Growth</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-invest/10 rounded-lg">
              <h4 className="font-medium text-sm text-foreground/70 mb-1">
                Future Value
              </h4>
              <p className="text-2xl font-bold text-invest">
                {formatCurrency(result.futureValue)}
              </p>
            </div>
            <div className="p-4 bg-invest/10 rounded-lg">
              <h4 className="font-medium text-sm text-foreground/70 mb-1">
                Total Contributions
              </h4>
              <p className="text-2xl font-bold text-invest">
                {formatCurrency(result.totalContributions)}
              </p>
            </div>
            <div className="p-4 bg-invest/10 rounded-lg">
              <h4 className="font-medium text-sm text-foreground/70 mb-1">
                Total Interest Earned
              </h4>
              <p className="text-2xl font-bold text-invest">
                {formatCurrency(result.totalInterest)}
              </p>
            </div>
          </div>

          <div className="mt-8 h-80">
            <h4 className="text-lg font-medium mb-4">
              Investment Growth Over Time
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  label={{
                    value: "Years",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                  label={{
                    value: "Value ($)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Balance"
                  stroke="#1a5fb4"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="Contributions"
                  stroke="#2ecc71"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="Interest"
                  stroke="#e74c3c"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="3 3"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium mb-2">Key Insights</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                Your initial $
                {form.getValues("initialInvestment").toLocaleString()}{" "}
                investment plus $
                {form.getValues("monthlyContribution").toLocaleString()}
                /month will grow to {formatCurrency(result.futureValue)} in{" "}
                {form.getValues("years")} years.
              </li>
              <li>
                You&apos;ll contribute a total of{" "}
                {formatCurrency(result.totalContributions)} and earn{" "}
                {formatCurrency(result.totalInterest)} in interest.
              </li>
              <li>
                That&apos;s a{" "}
                {(
                  (result.totalInterest / result.totalContributions) *
                  100
                ).toFixed(1)}
                % return on your contributions.
              </li>
              {form.getValues("years") > 10 && (
                <li className="text-green-600">
                  The power of compounding becomes more significant after 10
                  years!
                </li>
              )}
            </ul>
          </div>
        </Card>
      )}

      <div className="p-6 border border-invest-light rounded-lg">
        <h3 className="text-xl font-semibold mb-4">
          Tips for Maximizing Compound Interest
        </h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>
            Start investing as early as possible to maximize the compounding
            effect
          </li>
          <li>Contribute regularly to accelerate your investment growth</li>
          <li>
            Reinvest dividends and interest payments rather than taking them as
            income
          </li>
          <li>
            Be patient - the most dramatic effects of compounding are seen in
            later years
          </li>
          <li>
            Consider tax-advantaged accounts to shelter your investment growth
            from taxes
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
