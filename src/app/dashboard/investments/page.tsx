import DashboardInvestments from "@/components/DashboardInvestments";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Active Investments | Millennia Trades",
    content:
      "View your active investments, track their performance, and manage your investment portfolio. Stay updated on your investment growth and progress.",
    url: "https://millenniatrades.com/dashboard/investments",
  });
};

export default function Investments() {
  return (
    <>
      <DashboardInvestments />
    </>
  );
}
