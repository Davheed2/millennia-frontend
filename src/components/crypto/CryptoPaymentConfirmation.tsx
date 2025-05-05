import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { Label } from "@/components/ui/label";
import { CryptoCurrency } from "./CryptoSelector";
import { toast } from "sonner";

// Mock wallet addresses for each cryptocurrency
const mockWalletAddresses: Record<string, string> = {
  bitcoin: "bc1q8zdvs4qsu5deyy7h7ety7truxryje0cv63zrz3",
  ethereum: "0x70E0Ae074dAf3E72DdCDED496375d47aF7E87987",
  litecoin: "ltc1qclelnklvzux8dvxw2u7ynncjs2wm5nawhp7e48",
  bnb: "0x70E0Ae074dAf3E72DdCDED496375d47aF7E87987",
  xrp: "r9AutR4JxiTeyGqzgQPtSCmYZbchNPT549",
  solana: "H2V9sW6rV7tB4HMZF52o2qTVr6bavX2hqkFRnxbD8gvZ",
  usdt_trc20: "TPP1oGf3XHooAmpcXCDwiVcogeoLiYuJ5k",
  usdt_erc20: "0x70E0Ae074dAf3E72DdCDED496375d47aF7E87987",
};

type CryptoPaymentConfirmationProps = {
  amount: string;
  selectedCrypto: CryptoCurrency;
  onConfirmPayment: (walletAddress: string) => void;
  onBack: () => void;
  setPaymentProof: (file: File) => void;
};

const CryptoPaymentConfirmation: React.FC<CryptoPaymentConfirmationProps> = ({
  amount,
  selectedCrypto,
  onConfirmPayment,
  onBack,
  setPaymentProof,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const walletAddress =
    mockWalletAddresses[selectedCrypto.id] || "Address not available";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentProof(file);
    }
  };

  const getQRCodeValue = () => {
    const amountFormatted = parseFloat(amount).toString();

    switch (selectedCrypto.id) {
      case "bitcoin":
        return `bitcoin:${walletAddress}?amount=${amountFormatted}`;

      case "ethereum":
        return `ethereum:${walletAddress}?value=${amountFormatted}`; // some wallets support this

      case "bnb":
        return `bnb:${walletAddress}?amount=${amountFormatted}`;

      case "solana":
        return `solana:${walletAddress}?amount=${amountFormatted}`;

      case "xrp":
        return `xrp:${walletAddress}`; // optional: add ?amount if supported by user wallet

      case "litecoin":
        return `litecoin:${walletAddress}?amount=${amountFormatted}`;

      case "usdt_trc20":
      case "usdt_erc20":
        return walletAddress; // TRC20/SPL don't commonly support URI schemes

      default:
        return walletAddress;
    }
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack} className="mb-4">
        &larr; Back to Selection
      </Button>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Payment Details</h3>
            <div className="text-sm text-gray-500 mb-4">
              Please send exactly{" "}
              <span className="font-bold">
                {amount} {selectedCrypto.symbol}
              </span>{" "}
              to the following address:
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <Label className="text-sm text-gray-700 mb-2 block">
              {selectedCrypto.name}{" "}
              {selectedCrypto.network ? `(${selectedCrypto.network})` : ""}{" "}
              Address:
            </Label>
            <div className="flex items-center gap-2">
              <Input
                value={walletAddress}
                readOnly
                className="font-mono text-sm bg-white"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(walletAddress);
                  toast.info("Copied", {
                    description: "Wallet Address Copied",
                  });
                }}
                className="shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c0-1.1.9-2 2-2h2" />
                  <path d="M4 12c0-1.1.9-2 2-2h2" />
                  <path d="M4 8c0-1.1.9-2 2-2h2" />
                </svg>
              </Button>
            </div>
          </div>

          <div className="flex justify-center py-4">
            <div className="bg-white p-4 rounded border">
              {/* <QrCode className="h-48 w-48" /> */}
              <QRCodeCanvas value={getQRCodeValue()} size={192} level="H" />

              <div className="text-center mt-2 text-sm text-gray-500">
                Scan to pay
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="proof" className="text-sm">
              Upload Payment Proof (Optional)
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="proof"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm"
              />
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-md text-sm text-amber-700 mt-4">
            <p className="font-medium">Important:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>
                Please ensure you&apos;re sending from a wallet that supports{" "}
                {selectedCrypto.network || selectedCrypto.name} network.
              </li>
              <li>
                The deposit will be credited to your account after network
                confirmation.
              </li>
              <li>
                For larger amounts, additional confirmations may be required.
              </li>
            </ul>
          </div>

          <Button
            onClick={() => {
              setIsSubmitted(true);
              onConfirmPayment(walletAddress);
            }}
            className="w-full bg-invest hover:bg-invest-secondary"
            disabled={isSubmitted}
          >
            {isSubmitted ? "Processing..." : "I've Made This Payment"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoPaymentConfirmation;
