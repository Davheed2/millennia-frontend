import ResetPasswordSuccessPage from "@/components/auth/ResetPasswordSuccess";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Password Reset Successful - Millennia Trades",
    content: "You have successfully reset your password.",
    url: "https://milleniatrades.com/reset-password/success",
  });
};

export default function ForgotPassword() {
  return (
    <div className="">
      <ResetPasswordSuccessPage />
    </div>
  );
}
