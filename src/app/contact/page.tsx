import ContactUss from "@/components/ContactUs";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Contact Us | Millennia Trades",
    content:
      "Get in touch with the Millennia Trades team. Reach out for support, partnership inquiries, or general questions through our contact form.",
    url: "https://milleniatrades.com/contact",
  });
};

export default function ContactUs() {
  return (
    <>
      <ContactUss />
    </>
  );
}
