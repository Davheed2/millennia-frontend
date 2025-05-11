import DashboardSettings from "@/components/DashboardSettings";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Account Settings | Your App",
    content:
      "Manage your account settings, including account status, sign out options, and account deletion. Ensure your preferences are up to date and secure.",
    url: "https://millenniatrades.com/dashboard/settings",
  });
};

export default function Settings() {
  return (
    <>
      <DashboardSettings />
    </>
  );
}
