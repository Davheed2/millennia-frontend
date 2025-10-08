import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Terms of Service | Millennia Trades",
    content:
      "Review the Terms of Service for using Millennia Trades. Understand the rules, regulations, and responsibilities while using our platform for investment services. Your access and use of our services is governed by these terms.",
    url: "https://milleniatrades.com/terms",
  });
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <div className="space-y-6 text-gray-700">
            <p>Last updated: April 4, 2025</p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                1. Introduction
              </h2>
              <p>
                Welcome to Millennia Trades. These Terms of Service govern your
                use of our website and services. By accessing or using our
                platform, you agree to be bound by these Terms. If you disagree
                with any part of the Terms, then you may not access our
                services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                2. Account Registration
              </h2>
              <p>
                When you create an account with us, you must provide accurate,
                complete, and current information. You are responsible for
                safeguarding the password and for all activities that occur
                under your account. You agree to notify us immediately of any
                unauthorized use of your account.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                3. Investment Risks
              </h2>
              <p>
                All investments involve risk, including the possible loss of
                principal. Past performance does not guarantee future results.
                Millennia Trades does not provide personalized investment
                advice, and the information provided on our platform should not
                be construed as such.
              </p>
              <p>
                Before making any investment decisions, you should consult with
                a qualified financial advisor to discuss your specific situation
                and needs.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                4. User Conduct
              </h2>
              <p>You agree not to use our platform:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>In any way that violates applicable laws or regulations</li>
                <li>
                  To impersonate or attempt to impersonate Millennia Trades, a
                  Millennia Trades employee, or any other person
                </li>
                <li>
                  To engage in any conduct that restricts or inhibits
                  anyone&apos;s use of our services
                </li>
                <li>
                  To attempt to gain unauthorized access to our systems or user
                  accounts
                </li>
                <li>
                  To transmit any malicious code, such as viruses or malware
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                5. Intellectual Property
              </h2>
              <p>
                The content, features, and functionality of our platform are
                owned by Millennia Trades and are protected by copyright,
                trademark, and other intellectual property laws. You may not
                reproduce, distribute, modify, create derivative works of,
                publicly display, or use our intellectual property without our
                explicit permission.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                6. Termination
              </h2>
              <p>
                We may terminate or suspend your account and access to our
                services immediately, without prior notice, for any reason,
                including if you breach these Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                7. Disclaimer of Warranties
              </h2>
              <p>
                Our platform is provided &quot;as is&quot; and &quot;as
                available&quot; without warranties of any kind, either express
                or implied. We do not guarantee that our services will be
                uninterrupted, secure, or error-free.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                8. Limitation of Liability
              </h2>
              <p>
                In no event shall Millennia Trades be liable for any indirect,
                incidental, special, consequential, or punitive damages,
                including loss of profits, data, or goodwill, arising out of or
                in connection with your use of our platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                9. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms at any time. We will
                provide notice of any significant changes by updating the date
                at the top of these Terms and by maintaining a current version
                on our website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                10. Contact Us
              </h2>
              <p>
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <div className="py-2">
                <p>Email: support@milleniatrades.com</p>
                <p>
                  Address: 123 Investment Avenue, Financial District, New York,
                  NY 10001
                </p>
              </div>
            </section>
          </div>

          <div className="mt-10 text-center">
            <Link href="/signup">
              <Button className="bg-invest hover:bg-invest-secondary text-white">
                Return to Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
