import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Cookie Policy | Millennia Trades",
    content:
      "Learn how Millennia Trades uses cookies and similar technologies to enhance your experience. Review your rights and cookie preferences.",
    url: "https://millenniatrades.com/cookie-policy",
  });
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-invest/10 p-2 rounded-full">
              <Cookie className="h-6 w-6 text-invest" />
            </div>
            <h1 className="text-3xl font-bold">Cookie Policy</h1>
          </div>

          <div className="space-y-6 text-gray-700">
            <p>Last updated: April 9, 2025</p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                1. Introduction
              </h2>
              <p>
                This Cookie Policy explains how Millennia Trades
                (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses
                cookies and similar technologies to recognize you when you visit
                our website at millenniatrades.com (&quot;Website&quot;). It
                explains what these technologies are and why we use them, as
                well as your rights to control our use of them.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                2. What are cookies?
              </h2>
              <p>
                Cookies are small data files that are placed on your computer or
                mobile device when you visit a website. Cookies are widely used
                by website owners in order to make their websites work, or to
                work more efficiently, as well as to provide reporting
                information.
              </p>
              <p>
                Cookies set by the website owner (in this case, Millennia
                Trades) are called &quot;first-party cookies&quot;. Cookies set
                by parties other than the website owner are called
                &quot;third-party cookies&quot;. Third-party cookies enable
                third-party features or functionality to be provided on or
                through the website (e.g., advertising, interactive content, and
                analytics).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                3. Why do we use cookies?
              </h2>
              <p>
                We use first and third-party cookies for several reasons. Some
                cookies are required for technical reasons in order for our
                Website to operate, and we refer to these as
                &quot;essential&quot; or &quot;strictly necessary&quot; cookies.
                Other cookies also enable us to track and target the interests
                of our users to enhance the experience on our Website. Third
                parties serve cookies through our Website for advertising,
                analytics, and other purposes.
              </p>
              <p>
                The specific types of first and third-party cookies served
                through our Website and the purposes they perform are described
                below:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Essential website cookies:</strong> These cookies are
                  strictly necessary to provide you with services available
                  through our Website and to use some of its features, such as
                  access to secure areas.
                </li>
                <li>
                  <strong>Performance and functionality cookies:</strong> These
                  cookies are used to enhance the performance and functionality
                  of our Website but are non-essential to their use. However,
                  without these cookies, certain functionality may become
                  unavailable.
                </li>
                <li>
                  <strong>Analytics and customization cookies:</strong> These
                  cookies collect information that is used either in aggregate
                  form to help us understand how our Website is being used or
                  how effective our marketing campaigns are, or to help us
                  customize our Website for you.
                </li>
                <li>
                  <strong>Advertising cookies:</strong> These cookies are used
                  to make advertising messages more relevant to you. They
                  perform functions like preventing the same ad from
                  continuously reappearing, ensuring that ads are properly
                  displayed for advertisers, and in some cases selecting
                  advertisements that are based on your interests.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                4. How can you control cookies?
              </h2>
              <p>
                You have the right to decide whether to accept or reject
                cookies. You can exercise your cookie preferences by clicking on
                the appropriate opt-out links provided in the cookie table
                above.
              </p>
              <p>
                You can set or amend your web browser controls to accept or
                refuse cookies. If you choose to reject cookies, you may still
                use our website though your access to some functionality and
                areas of our website may be restricted. As the means by which
                you can refuse cookies through your web browser controls vary
                from browser-to-browser, you should visit your browser&apos;s
                help menu for more information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                5. How often will we update this Cookie Policy?
              </h2>
              <p>
                We may update this Cookie Policy from time to time in order to
                reflect, for example, changes to the cookies we use or for other
                operational, legal or regulatory reasons. Please therefore
                re-visit this Cookie Policy regularly to stay informed about our
                use of cookies and related technologies.
              </p>
              <p>
                The date at the top of this Cookie Policy indicates when it was
                last updated.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                6. Where can you get further information?
              </h2>
              <p>
                If you have any questions about our use of cookies or other
                technologies, please email us at support@millenniatrades.com or
                by post to:
              </p>
              <div className="py-2">
                <p>Millennia Trades</p>
                <p>123 Investment Avenue</p>
                <p>Financial District</p>
                <p>New York, NY 10001</p>
              </div>
            </section>
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/">
              <Button className="bg-invest hover:bg-invest-secondary text-white">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
