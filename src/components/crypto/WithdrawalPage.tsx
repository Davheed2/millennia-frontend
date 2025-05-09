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
import { AlertTriangle, Clock, Wallet, Info } from "lucide-react";
import { toast } from "sonner";
import CryptoWithdrawalForm from "@/components/crypto/CryptoWithdrawalForm";
import { supportedCryptocurrencies } from "@/components/crypto/CryptoSelector";
import {
  WithdrawFundsType,
  zodValidator,
} from "@/lib/validators/validateWithZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { callApi } from "@/lib/helpers";
import { ApiResponse, Wallet as IWallet } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";

export default function WithdrawalPage() {
  const [amount, setAmount] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [memo, setMemo] = useState("");
  const [success, setSuccess] = useState(false);
  const [availableBalance, setAvailableBalance] = useState<IWallet[]>([]);

  const {
    //register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<WithdrawFundsType>({
    resolver: zodResolver(zodValidator("withdrawFunds")!),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const selectedCryptoId = watch("crypto");

  const {
    //data: balance,
    //isLoading: loading,
    //error: queryError,
  } = useQuery<IWallet[], Error>({
    queryKey: ["balance"],
    queryFn: async () => {
      const { data: responseData, error } = await callApi<
        ApiResponse<IWallet[]>
      >("/wallet/user");
      if (error) {
        throw new Error(
          error.message ||
            "Something went wrong while fetching user wallet balance."
        );
      }
      if (!responseData?.data) {
        throw new Error("No wallet balance found");
      }
      setAvailableBalance(responseData?.data);
      return responseData.data;
    },
  });

  const onSubmit: SubmitHandler<WithdrawFundsType> = async (data) => {
    //e.preventDefault();

    // if (amount > availableBalance) {
    //   toast.error("Insufficient funds", {
    //     description: "The withdrawal amount exceeds your available balance.",
    //   });
    //   return;
    // }

    if (!walletAddress) {
      toast.error("Missing wallet address", {
        description: "Please enter a valid wallet address for withdrawal.",
      });
      return;
    }

    // const requiresMemo = ["stellar", "xrp"].includes(selectedCryptoId);
    // if (requiresMemo && !memo) {
    //   toast.error("Missing memo/tag", {
    //     description:
    //       "Please enter a memo or destination tag for this cryptocurrency.",
    //   });
    //   return;
    // }

    try {
      const { data: responseData, error } = await callApi<
        ApiResponse<WithdrawFundsType>
      >("/transaction/withdraw", {
        address: walletAddress,
        crypto: data.crypto,
        amount,
      });

      if (error) throw new Error(error.message);

      if (responseData?.status === "success") {
        setSuccess(true);
        toast.success("Withdrawal request submitted", {
          description: `Your withdrawal request for $${parseFloat(
            amount.toString()
          ).toLocaleString()} has been submitted.`,
        });
        setAmount(0);
        setWalletAddress("");
        setValue("crypto", "");
      }
    } catch (err) {
      toast.error("Withdrawal Failed", {
        description:
          err instanceof Error ? err.message : "Something went wrong",
      });
      setAmount(0);
      setWalletAddress("");
      setValue("crypto", "");
    } finally {
      reset();
    }
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value);
  };

  const handleMaxAmount = () => {
    setAmount(
      availableBalance[0].balance + availableBalance[0].portfolioBalance
    );
  };

  const selectedCrypto = supportedCryptocurrencies.find(
    (c: { id: string; symbol: string }) => c.id === selectedCryptoId
  );

  return (
    <>
      <div className="flex justify-between items-center mb-6 mt-16 lg:mt-0">
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
                Your withdrawal request for ${amount.toLocaleString()}
                {selectedCrypto && ` (${selectedCrypto.symbol})`} has been
                submitted.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                The funds will be transferred to your wallet within 1-24 hours.
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
              Withdraw funds from your investment account to your crypto wallet
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
                {availableBalance.length > 0
                  ? `$${(
                      availableBalance[0].balance +
                      availableBalance[0].portfolioBalance
                    ).toLocaleString()}`
                  : "$0.00"}
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <Label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium"
                >
                  Withdrawal Amount (USD)
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
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    required
                  />
                  {/* {errors.amount && (
                      <FormErrorMessage
                        error={errors.amount}
                        errorMsg={errors.amount.message}
                      />
                    )} */}
                </div>

                <div className="grid grid-cols-5 gap-2 mt-3">
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
                      amount === 2000 ? "border-invest text-invest" : ""
                    }
                    onClick={() => handleQuickAmount(2000)}
                  >
                    $2,000
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={
                      availableBalance.length > 0 &&
                      parseFloat(amount?.toString()) ===
                        availableBalance[0].balance +
                          availableBalance[0].portfolioBalance
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
                  <Wallet className="mr-2 h-4 w-4" />
                  <Label className="text-sm font-medium">
                    Withdrawal Method
                  </Label>
                </div>

                <CryptoWithdrawalForm
                  selectedCrypto={selectedCryptoId}
                  walletAddress={walletAddress}
                  memo={memo}
                  onCryptoChange={(value) => setValue("crypto", value)}
                  onWalletAddressChange={setWalletAddress}
                  onMemoChange={setMemo}
                />
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <div className="bg-amber-50 p-4 rounded-lg flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div className="text-sm text-amber-700">
                    <p className="font-medium">Withdrawal processing time</p>
                    <p className="mt-1">
                      Cryptocurrency withdrawals are typically processed within
                      1-24 hours.
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
                disabled={
                  isSubmitting ||
                  !selectedCryptoId ||
                  !walletAddress ||
                  amount <= 0
                }
              >
                {isSubmitting
                  ? "Processing..."
                  : `Withdraw $${
                      amount
                        ? parseFloat(amount.toString()).toLocaleString()
                        : "0.00"
                    }`}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
