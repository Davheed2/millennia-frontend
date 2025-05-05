import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wallet } from "lucide-react";

export type CryptoCurrency = {
  id: string;
  name: string;
  symbol: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  network?: string;
};

export const supportedCryptocurrencies: CryptoCurrency[] = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", icon: Wallet },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", icon: Wallet },
  { id: "litecoin", name: "Litecoin", symbol: "LTC", icon: Wallet },
  { id: "bnb", name: "Binance Coin", symbol: "BNB", icon: Wallet },
  { id: "solana", name: "Solana", symbol: "SOL", icon: Wallet },
  {
    id: "usdt_trc20",
    name: "USDT",
    symbol: "USDT",
    network: "TRC20",
    icon: Wallet,
  },
  {
    id: "usdt_erc20",
    name: "USDT",
    symbol: "USDT",
    network: "ERC20",
    icon: Wallet,
  },
];

type CryptoSelectorProps = {
  selectedCrypto: string;
  onSelectCrypto: (value: string) => void;
};

const CryptoSelector: React.FC<CryptoSelectorProps> = ({
  selectedCrypto,
  onSelectCrypto,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="crypto-selector">Select Cryptocurrency</Label>
      <Select value={selectedCrypto} onValueChange={onSelectCrypto}>
        <SelectTrigger id="crypto-selector" className="w-full">
          <SelectValue placeholder="Select cryptocurrency" />
        </SelectTrigger>
        <SelectContent>
          {supportedCryptocurrencies.map((crypto) => {
            const Icon = crypto.icon;
            return (
              <SelectItem
                key={crypto.id}
                value={crypto.id}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>
                    {crypto.name} ({crypto.symbol})
                    {crypto.network && ` - ${crypto.network}`}
                  </span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CryptoSelector;
