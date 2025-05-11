import LoginForm from "@/components/auth/LoginForm";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Signin | Millennia Trades",
    content:
      "Log in to your Millennia Trades account to access investment opportunities, manage your portfolio, and track your financial growth. Secure, easy access to your wealth management dashboard.",
    url: "https://millenniatrades.com/signin",
  });
};

export default function Login() {
  return (
    <>
      <LoginForm />
    </>
  );
}
