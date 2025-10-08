import DashboardAccount from "@/components/DasboardAccount";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Account Settings | Millennia Trades",
    content:
      "Update your personal details, change your password, and manage your account settings to keep your profile secure and up-to-date.",
    url: "https://milleniatrades.com/dashboard/account",
  });
};

export default function Account() {
  return (
    <>
      <DashboardAccount />
    </>
  );
}
