import ForgotPasswordPage from "@/components/auth/ForgotPassword";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Forgot Password - Millennia Trades",
    content:
      "Forgot your password? Reset it here to regain access to your Millennia Trades account.",
    url: "https://milleniatrades.com/forgot-password",
  });
};

export default function ForgotPassword() {
  return (
    <div className="">
      <ForgotPasswordPage />
    </div>
  );
}
