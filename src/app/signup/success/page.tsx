import SignUpSuccess from "@/components/auth/SignUpSuccess";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Sign Up Success | Millennia Trades",
    content:
      "Congratulations on successfully creating your account with Millennia Trades! You're now one step closer to achieving your investment goals. Start exploring our tools and resources to begin your wealth-building journey.",
    url: "https://milleniatrades.com/signup/success",
  });
};

export default function SignUpSuccessS() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUpSuccess />
    </div>
  );
}
