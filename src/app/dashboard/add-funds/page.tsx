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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Building, BanknoteIcon, CheckCircle2 } from "lucide-react";
//import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

export default function AddFunds() {
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankRoutingNumber, setBankRoutingNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  //const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    //   toast({
    //     title: "Funds added successfully",
    //     description: `$${parseFloat(
    //       amount
    //     ).toLocaleString()} has been added to your account.`,
    //   });
    }, 2000);
  };

  const handleQuickAmount = (value: string) => {
    setAmount(value);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return v;
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setCardExpiry(formatted);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add Funds</h1>
      </div>

      {success ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-10">
              <div className="bg-green-100 rounded-full p-3 mb-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Funds Added Successfully
              </h2>
              <p className="text-gray-600 mb-6">
                ${parseFloat(amount).toLocaleString()} has been added to your
                account.
              </p>
              <div className="flex gap-4">
                <Button onClick={() => setSuccess(false)} variant="outline">
                  Add More Funds
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
            <CardTitle>Add Funds to Your Account</CardTitle>
            <CardDescription>
              Choose your preferred payment method to add funds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <Label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium"
                >
                  Amount to Add
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

                <div className="grid grid-cols-4 gap-2 mt-3">
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
                      amount === "5000" ? "border-invest text-invest" : ""
                    }
                    onClick={() => handleQuickAmount("5000")}
                  >
                    $5,000
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <Label className="block mb-2 text-sm font-medium">
                  Payment Method
                </Label>
                <Tabs defaultValue="card" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="card" className="flex-1">
                      <CreditCard className="h-4 w-4 mr-2" /> Credit/Debit Card
                    </TabsTrigger>
                    <TabsTrigger value="bank" className="flex-1">
                      <Building className="h-4 w-4 mr-2" /> Bank Transfer
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="cardNumber"
                          className="block mb-1 text-sm font-medium"
                        >
                          Card Number
                        </Label>
                        <Input
                          type="text"
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                          required
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="cardName"
                          className="block mb-1 text-sm font-medium"
                        >
                          Cardholder Name
                        </Label>
                        <Input
                          type="text"
                          id="cardName"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="cardExpiry"
                            className="block mb-1 text-sm font-medium"
                          >
                            Expiry Date
                          </Label>
                          <Input
                            type="text"
                            id="cardExpiry"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            required
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="cardCvv"
                            className="block mb-1 text-sm font-medium"
                          >
                            CVV
                          </Label>
                          <Input
                            type="text"
                            id="cardCvv"
                            placeholder="123"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => {
                              // Allow only numbers
                              const value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                              setCardCvv(value);
                            }}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="bank" className="mt-4">
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
                          htmlFor="bankAccountNumber"
                          className="block mb-1 text-sm font-medium"
                        >
                          Account Number
                        </Label>
                        <Input
                          type="text"
                          id="bankAccountNumber"
                          placeholder="Enter account number"
                          value={bankAccountNumber}
                          onChange={(e) => {
                            // Allow only numbers
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            setBankAccountNumber(value);
                          }}
                          required
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="bankRoutingNumber"
                          className="block mb-1 text-sm font-medium"
                        >
                          Routing Number
                        </Label>
                        <Input
                          type="text"
                          id="bankRoutingNumber"
                          placeholder="Enter routing number"
                          value={bankRoutingNumber}
                          onChange={(e) => {
                            // Allow only numbers
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            setBankRoutingNumber(value);
                          }}
                          required
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start gap-2">
                <BanknoteIcon className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium">Funds processing time</p>
                  <p className="mt-1">
                    Credit/debit card deposits are processed instantly. Bank
                    transfers typically take 1-3 business days to clear.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-invest hover:bg-invest-secondary"
                disabled={isSubmitting || !amount}
              >
                {isSubmitting
                  ? "Processing..."
                  : `Add $${
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
