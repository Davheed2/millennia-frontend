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
import { Calculator, TrendingUp } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// Define form schema
const formSchema = z.object({
  initialInvestment: z.coerce.number().min(1000, "Must be at least $1,000"),
  monthlyContribution: z.coerce.number().min(0, "Must be a positive number"),
  years: z.coerce
    .number()
    .min(1, "Must be at least 1 year")
    .max(50, "Maximum 50 years"),
  expectedReturn: z.coerce
    .number()
    .min(0, "Must be a positive number")
    .max(20, "Must be under 20%"),
  lowFeePercentage: z.coerce
    .number()
    .min(0, "Must be a positive number")
    .max(3, "Must be under 3%"),
  highFeePercentage: z.coerce
    .number()
    .min(0, "Must be a positive number")
    .max(3, "Must be under 3%"),
});

const InvestmentFeeAnalyzer = () => {
  const [result, setResult] = useState<{
    lowFeeTotalValue: number;
    highFeeTotalValue: number;
    feeDifference: number;
    feeDifferencePercentage: number;
    yearlyData: Array<{
      year: number;
      lowFeeValue: number;
      highFeeValue: number;
      feeDifference: number;
    }>;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialInvestment: 10000,
      monthlyContribution: 500,
      years: 30,
      expectedReturn: 7,
      lowFeePercentage: 0.1,
      highFeePercentage: 1.0,
    },
  });

  // Calculate fee impact
  const calculateFeeImpact = (values: z.infer<typeof formSchema>) => {
    const {
      initialInvestment,
      monthlyContribution,
      years,
      expectedReturn,
      lowFeePercentage,
      highFeePercentage,
    } = values;

    // Validate inputs
    if (
      isNaN(initialInvestment) ||
      isNaN(monthlyContribution) ||
      isNaN(years) ||
      isNaN(expectedReturn) ||
      isNaN(lowFeePercentage) ||
      isNaN(highFeePercentage)
    ) {
      return {
        lowFeeTotalValue: 0,
        highFeeTotalValue: 0,
        feeDifference: 0,
        feeDifferencePercentage: 0,
        yearlyData: [],
      };
    }

    // Convert percentages to decimals
    const expectedReturnDecimal = expectedReturn / 100;
    const lowFeeDecimal = lowFeePercentage / 100;
    const highFeeDecimal = highFeePercentage / 100;

    // Calculate net return rates
    const lowFeeReturn = expectedReturnDecimal - lowFeeDecimal;
    const highFeeReturn = expectedReturnDecimal - highFeeDecimal;

    // Track yearly data for the chart
    const yearlyData = [];
    let lowFeeValue = initialInvestment;
    let highFeeValue = initialInvestment;

    for (let year = 0; year <= years; year++) {
      // Calculate values at each year
      yearlyData.push({
        year,
        lowFeeValue,
        highFeeValue,
        feeDifference: lowFeeValue - highFeeValue,
      });

      if (year < years) {
        // Calculate next year's values
        lowFeeValue =
          lowFeeValue * (1 + lowFeeReturn) + monthlyContribution * 12;
        highFeeValue =
          highFeeValue * (1 + highFeeReturn) + monthlyContribution * 12;
      }
    }

    // Final calculations
    const feeDifference = lowFeeValue - highFeeValue;
    const feeDifferencePercentage =
      highFeeValue > 0 ? (feeDifference / highFeeValue) * 100 : 0;

    return {
      lowFeeTotalValue: lowFeeValue,
      highFeeTotalValue: highFeeValue,
      feeDifference,
      feeDifferencePercentage,
      yearlyData,
    };
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const calculatedResult = calculateFeeImpact(data);
    if (
      calculatedResult &&
      !isNaN(calculatedResult.lowFeeTotalValue) &&
      !isNaN(calculatedResult.highFeeTotalValue)
    ) {
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
      "Low Fee Portfolio": parseFloat(
        (Number(data.lowFeeValue) || 0).toFixed(2)
      ),
      "High Fee Portfolio": parseFloat(
        (Number(data.highFeeValue) || 0).toFixed(2)
      ),
      "Fee Difference": parseFloat(
        (Number(data.feeDifference) || 0).toFixed(2)
      ),
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
                      <Input type="number" placeholder="10000" {...field} />
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
                      <Input type="number" placeholder="500" {...field} />
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
                name="expectedReturn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Expected Annual Return (before fees) (%)
                    </FormLabel>
                    <div className="flex items-center space-x-4">
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          min={0}
                          max={15}
                          step={0.1}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="flex-grow"
                        />
                      </FormControl>
                      <span className="w-16 text-center">{field.value}%</span>
                    </div>
                    <FormDescription>
                      Expected annual return before fees.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lowFeePercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Low Fee Option (%)</FormLabel>
                    <div className="flex items-center space-x-4">
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          min={0}
                          max={1}
                          step={0.05}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="flex-grow"
                        />
                      </FormControl>
                      <span className="w-16 text-center">{field.value}%</span>
                    </div>
                    <FormDescription>
                      Annual fees for low-cost option.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="highFeePercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>High Fee Option (%)</FormLabel>
                    <div className="flex items-center space-x-4">
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          min={0.1}
                          max={2.5}
                          step={0.1}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="flex-grow"
                        />
                      </FormControl>
                      <span className="w-16 text-center">{field.value}%</span>
                    </div>
                    <FormDescription>
                      Annual fees for high-cost option.
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
              <Calculator className="mr-2" /> Analyze Fee Impact
            </Button>
          </form>
        </Form>
      </Card>

      {result && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Fee Impact Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-sm text-foreground/70 mb-1">
                Low Fee Portfolio ({form.getValues("lowFeePercentage")}%)
              </h4>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(result.lowFeeTotalValue)}
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="font-medium text-sm text-foreground/70 mb-1">
                High Fee Portfolio ({form.getValues("highFeePercentage")}%)
              </h4>
              <p className="text-2xl font-bold text-amber-600">
                {formatCurrency(result.highFeeTotalValue)}
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-medium text-sm text-foreground/70 mb-1">
                Cost of Higher Fees
              </h4>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(result.feeDifference)}
              </p>
              <p className="text-sm text-red-500">
                ({result.feeDifferencePercentage.toFixed(1)}% reduction)
              </p>
            </div>
          </div>

          <div className="mt-8 h-80">
            <h4 className="text-lg font-medium mb-4">
              Portfolio Value Comparison Over Time
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorLowFee" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorHighFee" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
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
                  tickFormatter={(value) =>
                    `$${(value / 1000).toLocaleString()}k`
                  }
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Low Fee Portfolio"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#colorLowFee)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="High Fee Portfolio"
                  stroke="#f59e0b"
                  fillOpacity={1}
                  fill="url(#colorHighFee)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 p-5 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-red-100 p-2">
                <TrendingUp className="text-red-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">
                  Fee Impact Over Time
                </h4>
                <p className="mb-3">
                  Over {form.getValues("years")} years, the difference between a{" "}
                  {form.getValues("lowFeePercentage")}% fee and a{" "}
                  {form.getValues("highFeePercentage")}% fee costs you{" "}
                  <span className="font-bold text-red-600">
                    {formatCurrency(result.feeDifference)}
                  </span>
                  .
                </p>
                <p className="text-sm">
                  This is equivalent to{" "}
                  {Math.round(
                    result.feeDifference /
                      (form.getValues("monthlyContribution") * 12)
                  )}{" "}
                  years of your monthly contributions.
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 border border-invest-light rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            How to Reduce Investment Fees
          </h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>Choose low-cost index funds and ETFs</li>
            <li>Compare expense ratios when selecting investments</li>
            <li>Consider direct indexing for larger portfolios</li>
            <li>Use commission-free brokerages for trading</li>
            <li>Minimize account maintenance and administrative fees</li>
          </ul>
        </div>

        <div className="p-6 border border-invest-light rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            When Higher Fees May Be Worth It
          </h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>Access to specialized investment strategies</li>
            <li>Comprehensive financial planning services</li>
            <li>Active management in less efficient markets</li>
            <li>Complex tax optimization strategies</li>
            <li>Estate planning and wealth transfer guidance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InvestmentFeeAnalyzer;
