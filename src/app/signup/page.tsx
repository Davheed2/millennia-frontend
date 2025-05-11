import SignUp from "@/components/auth/SignUpForm";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";
export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Sign Up | Millennia Trades",
    content:
      "Create an account with Millennia Trades to start your investment journey. Gain access to a wide range of investment tools and resources to help you grow your wealth. Sign up now and take the first step towards financial success.",
    url: "https://millenniatrades.com/signup",
  });
};

export default function Signup() {
  return (
    <>
      <SignUp />
    </>
  );
}
