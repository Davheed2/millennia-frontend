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
import { CheckCircle2, Wallet } from "lucide-react";
import { toast } from "sonner";
import CryptoSelector, {
  supportedCryptocurrencies,
} from "@/components/crypto/CryptoSelector";
import CryptoPaymentConfirmation from "@/components/crypto/CryptoPaymentConfirmation";
import { AddFundsType, zodValidator } from "@/lib/validators/validateWithZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { callApi } from "@/lib/helpers";
import { ApiResponse } from "@/interfaces";
import { FormErrorMessage } from "@/components/common";

export default function DepositPage() {
  const [amount, setAmount] = useState(0);
  const [success, setSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  const {
    //register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<AddFundsType>({
    resolver: zodResolver(zodValidator("addFunds")!),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  interface Cryptocurrency {
    id: string;
    symbol: string;
    name: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }

  //const amount = watch("amount");
  const selectedCryptoId = watch("crypto");

  const selectedCrypto: Cryptocurrency | undefined = selectedCryptoId
    ? supportedCryptocurrencies.find(
        (c: Cryptocurrency) => c.id === selectedCryptoId
      )
    : undefined;

  const onSubmit: SubmitHandler<AddFundsType> = async (data) => {
    if (!amount || !data.crypto) {
      toast.error("Missing information", {
        description: "Please enter an amount and select a cryptocurrency",
      });
      return;
    }
    setShowConfirmation(true); // Show confirmation page
  };

  const handleConfirmPayment = async (walletAddress: string) => {
    const formValues = getValues();

    const formData = new FormData();
    formData.append("crypto", formValues.crypto);
    formData.append("amount", amount.toString());
    formData.append("address", walletAddress); // Include the wallet address
    if (paymentProof) {
      formData.append("paymentProof", paymentProof);
    }

    try {
      const { data: responseData, error } = await callApi<
        ApiResponse<AddFundsType>
      >("/transaction/deposit", formData);

      if (error) throw new Error(error.message);

      if (responseData?.status === "success") {
        setSuccess(true);
        setShowConfirmation(false);
        toast.success("Payment confirmation received", {
          description: `Your deposit of ${amount} ${selectedCrypto?.symbol} will be processed shortly.`,
        });
      }
    } catch (err) {
      toast.error("Upload Failed", {
        description:
          err instanceof Error ? err.message : "Something went wrong",
      });
    } finally {
      reset();
      setPaymentProof(null);
    }
  };

  const handleQuickAmount = (value: number) => {
    setAmount(Number(value));
  };

  const handleBackToSelection = () => {
    setShowConfirmation(false);
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
                Payment Confirmation Received
              </h2>
              <p className="text-gray-600 mb-2">
                Your deposit of {amount} {selectedCrypto?.symbol} is being
                processed.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Funds will appear in your account after network confirmations
                are complete.
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
      ) : showConfirmation && selectedCrypto ? (
        <CryptoPaymentConfirmation
          amount={amount.toString()}
          selectedCrypto={selectedCrypto}
          onConfirmPayment={handleConfirmPayment}
          onBack={handleBackToSelection}
          setPaymentProof={setPaymentProof}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Add Funds with Cryptocurrency</CardTitle>
            <CardDescription>
              Deposit crypto to fund your investment account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <Label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium"
                >
                  Amount to Add (USD equivalent)
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
                      setAmount(parseFloat(value) || 0);
                    }}
                    required
                  />
                </div>

                <div className="grid grid-cols-4 gap-2 mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    className={
                      amount === 100 ? "border-invest text-invest" : ""
                    }
                    onClick={() => handleQuickAmount(100)}
                  >
                    $100
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={
                      amount === 500 ? "border-invest text-invest" : ""
                    }
                    onClick={() => handleQuickAmount(500)}
                  >
                    $500
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={
                      amount === 1000 ? "border-invest text-invest" : ""
                    }
                    onClick={() => handleQuickAmount(1000)}
                  >
                    $1,000
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={
                      amount === 5000 ? "border-invest text-invest" : ""
                    }
                    onClick={() => handleQuickAmount(5000)}
                  >
                    $5,000
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <CryptoSelector
                  selectedCrypto={selectedCryptoId}
                  onSelectCrypto={(value) => setValue("crypto", value)}
                />
                {errors.crypto && (
                  <FormErrorMessage
                    error={errors.crypto}
                    errorMsg={errors.crypto.message}
                  />
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start gap-2">
                <Wallet className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium">Crypto deposits processing time</p>
                  <p className="mt-1">
                    Deposits are typically credited after 1-6 network
                    confirmations depending on the cryptocurrency.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-invest hover:bg-invest-secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : `Continue to Payment`}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
