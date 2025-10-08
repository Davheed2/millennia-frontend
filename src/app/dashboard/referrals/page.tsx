import DashboardReferrals from "@/components/DashboardReferral";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Referrals | Millennia Trades",
    content:
      "Track your referral program and earn rewards by referring others to Millennia Trades. View your referral link, earnings, and progress to maximize your rewards.",
    url: "https://milleniatrades.com/dashboard/referrals",
  });
};

export default function Referrals() {
  return (
    <>
      <DashboardReferrals />
    </>
  );
}
