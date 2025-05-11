import DepositPage from "@/components/crypto/DepositPage";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Deposit Funds | Millennia Trades",
    content:
      "Deposit funds into your Millennia Trades account using your preferred cryptocurrency. Start investing today with seamless and secure deposits.",
    url: "https://millenniatrades.com/dashboard/add-funds",
  });
};

export default function AddFunds() {
  return (
    <>
      <DepositPage />
    </>
  );
}
