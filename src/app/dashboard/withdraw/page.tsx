"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Building,
  AlertTriangle,
  Wallet,
  //CheckCircle2,
  Clock,
  Info,
} from "lucide-react";
//import { useToast } from "@/hooks/use-toast";

export default function WithdrawFunds() {
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  //const { toast } = useToast();

  // Mock available balance
  const availableBalance = 5678.9;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (parseFloat(amount) > availableBalance) {
      //   toast({
      //     title: "Insufficient funds",
      //     description: "The withdrawal amount exceeds your available balance.",
      //     variant: "destructive",
      //   });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      //   toast({
      //     title: "Withdrawal request submitted",
      //     description: `Your withdrawal request for $${parseFloat(
      //       amount
      //     ).toLocaleString()} has been submitted.`,
      //   });
    }, 2000);
  };

  const handleQuickAmount = (value: string) => {
    setAmount(value);
  };

  const handleMaxAmount = () => {
    setAmount(availableBalance.toString());
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Withdraw Funds</h1>
      </div>

      {success ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-10">
              <div className="bg-blue-100 rounded-full p-3 mb-4">
                <Clock className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Withdrawal Request Submitted
              </h2>
              <p className="text-gray-600 mb-2">
                Your withdrawal request for $
                {parseFloat(amount).toLocaleString()} has been submitted.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                The funds will be transferred to your bank account within 1-3
                business days.
              </p>
              <div className="flex gap-4">
                <Button onClick={() => setSuccess(false)} variant="outline">
                  New Withdrawal
                </Button>
                <Button className="bg-invest hover:bg-invest-secondary">
                  View Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Withdraw Funds</CardTitle>
            <CardDescription>
              Withdraw funds from your investment account to your bank account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-50 rounded-lg mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium">
                  Available for withdrawal:
                </span>
              </div>
              <span className="font-bold text-xl">
                ${availableBalance.toLocaleString()}
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <Label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium"
                >
                  Withdrawal Amount
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <Input
                    type="text"
                    id="amount"
                    className="pl-7"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => {
                      // Allow only numbers and decimal point
                      const value = e.target.value.replace(/[^0-9.]/g, "");
                      setAmount(value);
                    }}
                    required
                  />
                </div>

                <div className="grid grid-cols-5 gap-2 mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    className={
                      amount === "100" ? "border-invest text-invest" : ""
                    }
                    onClick={() => handleQuickAmount("100")}
                  >
                    $100
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={
                      amount === "500" ? "border-invest text-invest" : ""
                    }
                    onClick={() => handleQuickAmount("500")}
                  >
                    $500
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={
                      amount === "1000" ? "border-invest text-invest" : ""
                    }
                    onClick={() => handleQuickAmount("1000")}
                  >
                    $1,000
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={
                      amount === "2000" ? "border-invest text-invest" : ""
                    }
                    onClick={() => handleQuickAmount("2000")}
                  >
                    $2,000
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={
                      amount === availableBalance.toString()
                        ? "border-invest text-invest"
                        : ""
                    }
                    onClick={handleMaxAmount}
                  >
                    Max
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <Building className="mr-2 h-4 w-4" />
                  <Label className="text-sm font-medium">
                    Bank Account Details
                  </Label>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="bankName"
                      className="block mb-1 text-sm font-medium"
                    >
                      Bank Name
                    </Label>
                    <Input
                      type="text"
                      id="bankName"
                      placeholder="Enter bank name"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="accountName"
                      className="block mb-1 text-sm font-medium"
                    >
                      Account Holder Name
                    </Label>
                    <Input
                      type="text"
                      id="accountName"
                      placeholder="John Doe"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="accountNumber"
                      className="block mb-1 text-sm font-medium"
                    >
                      Account Number
                    </Label>
                    <Input
                      type="text"
                      id="accountNumber"
                      placeholder="Enter account number"
                      value={accountNumber}
                      onChange={(e) => {
                        // Allow only numbers
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        setAccountNumber(value);
                      }}
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="routingNumber"
                      className="block mb-1 text-sm font-medium"
                    >
                      Routing Number
                    </Label>
                    <Input
                      type="text"
                      id="routingNumber"
                      placeholder="Enter routing number"
                      value={routingNumber}
                      onChange={(e) => {
                        // Allow only numbers
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        setRoutingNumber(value);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <div className="bg-amber-50 p-4 rounded-lg flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div className="text-sm text-amber-700">
                    <p className="font-medium">Withdrawal processing time</p>
                    <p className="mt-1">
                      Withdrawal requests are processed within 1-3 business
                      days.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg flex items-start gap-2">
                  <Info className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium">Verification required</p>
                    <p className="mt-1">
                      For security purposes, you may be asked to verify your
                      identity for withdrawals over $1,000.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-invest hover:bg-invest-secondary"
                disabled={isSubmitting || !amount || parseFloat(amount) <= 0}
              >
                {isSubmitting
                  ? "Processing..."
                  : `Withdraw $${
                      amount ? parseFloat(amount).toLocaleString() : "0.00"
                    }`}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
