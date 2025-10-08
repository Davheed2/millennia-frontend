import SupportChatt from "@/components/SupportChat";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Support Chat | Millennia Trades",
    content:
      "Engage with our support team for assistance with your investments, portfolio management, and more. Our team is here to help with any questions or issues you may have.",
    url: "https://milleniatrades.com/dashboard/support-chat",
  });
};

export default function SupportChat() {
  return (
    <>
      <SupportChatt />
    </>
  );
}
