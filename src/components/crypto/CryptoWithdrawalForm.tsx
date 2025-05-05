import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";
import CryptoSelector, { supportedCryptocurrencies } from "./CryptoSelector";

type CryptoWithdrawalFormProps = {
  selectedCrypto: string;
  walletAddress: string;
  memo?: string;
  onCryptoChange: (value: string) => void;
  onWalletAddressChange: (value: string) => void;
  onMemoChange?: (value: string) => void;
};

const CryptoWithdrawalForm: React.FC<CryptoWithdrawalFormProps> = ({
  selectedCrypto,
  walletAddress,
  memo = "",
  onCryptoChange,
  onWalletAddressChange,
  onMemoChange,
}) => {
  const crypto = supportedCryptocurrencies.find((c) => c.id === selectedCrypto);
  const requiresMemo = ["stellar", "xrp"].includes(selectedCrypto);

  return (
    <div className="space-y-4">
      <CryptoSelector
        selectedCrypto={selectedCrypto}
        onSelectCrypto={onCryptoChange}
      />

      <div>
        <Label
          htmlFor="walletAddress"
          className="block mb-1 text-sm font-medium"
        >
          Wallet Address
        </Label>
        <Input
          type="text"
          id="walletAddress"
          placeholder={`Enter your ${
            crypto?.name || "cryptocurrency"
          } wallet address`}
          value={walletAddress}
          onChange={(e) => onWalletAddressChange(e.target.value)}
          required
        />
      </div>

      {requiresMemo && onMemoChange && (
        <div>
          <Label htmlFor="memo" className="block mb-1 text-sm font-medium">
            Memo/Tag (Required)
          </Label>
          <Input
            type="text"
            id="memo"
            placeholder="Enter memo or destination tag"
            value={memo}
            onChange={(e) => onMemoChange(e.target.value)}
            required
          />
        </div>
      )}

      <div className="bg-amber-50 p-4 rounded-lg flex items-start gap-2">
        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
        <div className="text-sm text-amber-700">
          <p className="font-medium">Important withdrawal information</p>
          <p className="mt-1">
            Please double-check your wallet address before submitting.
            Transactions sent to incorrect addresses cannot be recovered.
          </p>
          {requiresMemo && (
            <p className="mt-1">
              This cryptocurrency requires a memo/tag for correct routing.
              Missing or incorrect memo may result in lost funds.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoWithdrawalForm;
