import DashboardAcc from "@/components/Dashboard";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Dashboard | Millennia Trades",
    content:
      "View and manage your portfolio, investments, and transactions. Track your progress and make informed decisions with insights into your asset allocation, profits, and available funds.",
    url: "https://milleniatrades.com/dashboard",
  });
};

export default function Dashboard() {
  return (
    <>
      <DashboardAcc />
    </>
  );
}
