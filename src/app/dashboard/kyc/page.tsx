import DashboardKyc from "@/components/Kyc";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "KYC Verification | Millennia Trades",
    content:
      "Complete your KYC (Know Your Customer) verification to access full account features and ensure secure transactions on Millennia Trades.",
    url: "https://milleniatrades.com/dashboard/kyc",
  });
};

export default function KYCVerification() {
  return (
    <>
      <DashboardKyc />
    </>
  );
}
