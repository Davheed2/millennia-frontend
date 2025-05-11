import SocialSecurityPage from "@/components/SecurityPage";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Social Security Estimator | Millennia Trades",
    content:
      "Estimate your future Social Security benefits with our easy-to-use calculator. Understand how different retirement ages and income levels impact your monthly and yearly benefits. Start planning today for a secure retirement.",
    url: "https://millenniatrades.com/retirement/security-estimator",
  });
};
export default function SocialSecurityEstimator() {
  return (
    <>
      <SocialSecurityPage />
    </>
  );
}
