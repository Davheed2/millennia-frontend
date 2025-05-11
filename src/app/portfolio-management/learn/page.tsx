import LearnPage from "@/components/LearnPage";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Learn Portfolio Rebalancing & Optimization | Millennia Trades",
    content:
      "Understand how portfolio rebalancing and smart optimization can boost your returns while managing risk. Explore modern techniques and take control of your investments.",
    url: "https://millenniatrades.com/portfolio-management/learn",
  });
};

export default function LearnRebalancingPage() {
  return (
    <>
      <LearnPage />
    </>
  );
}
