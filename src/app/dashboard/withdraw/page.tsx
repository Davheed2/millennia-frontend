import WithdrawalPage from "@/components/crypto/WithdrawalPage";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Withdraw Funds | Millennia Trades",
    content:
      "Withdraw your funds easily from your portfolio. This page allows you to initiate a withdrawal of your available balance to your preferred payment method or wallet address.",
    url: "https://millenniatrades.com/dashboard/withdraw",
  });
};

export default function WithdrawFunds() {
  return (
    <>
      <WithdrawalPage />
    </>
  );
}
