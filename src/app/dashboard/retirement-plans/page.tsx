import RetirementPlanss from "@/components/DashboardRetirement";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";
export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Retirement Plans | Millennia Trades",
    content:
      "Explore our comprehensive retirement plans designed to help you build a secure financial future. Choose from a variety of plans and account types to match your retirement goals and financial needs.",
    url: "https://millenniatrades.com/retirement-plans",
  });
};

export default function RetirementPlans() {
  return (
    <>
      <RetirementPlanss />
    </>
  );
}
