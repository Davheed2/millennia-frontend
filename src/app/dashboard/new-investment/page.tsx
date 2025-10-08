import NewInvestmentPage from "@/components/NewInvestment";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "New Investment | Millennia Trades",
    content:
      "Create a new investment with Millennia Trades. Choose from various plans and start growing your portfolio with expert-led investment strategies.",
    url: "https://milleniatrades.com/dashboard/new-investment",
  });
};

export default function NewInvestment() {
  return (
    <>
      <NewInvestmentPage />
    </>
  );
}
