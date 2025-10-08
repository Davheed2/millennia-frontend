import CryptoPage from "@/components/CryptoPage";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "All Cryptocurrencies | Millennia Trades",
    content:
      "Explore a complete list of supported cryptocurrencies on Millennia Trades. View details, prices, and trading availability.",
    url: "https://milleniatrades.com/crypto",
  });
};

export default function AllCryptocurrenciesPage() {
  return (
    <>
      <CryptoPage />
    </>
  );
}
