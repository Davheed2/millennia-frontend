import LogoutPage from "@/components/auth/Logout";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Logout | Millennia Trades",
    content:
      "Log out of your Millennia Trades account. Ensure your session is safely ended before leaving the platform.",
    url: "https://milleniatrades.com/dashboard/logout",
  });
};

export default function Logout() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LogoutPage />
    </div>
  );
}
