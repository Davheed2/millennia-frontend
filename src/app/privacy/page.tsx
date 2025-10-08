import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Privacy Policy | Millennia Trades",
    content:
      "Review Millennia Trades' privacy policy to understand how we collect, use, and protect your personal information when you use our investment services.",
    url: "https://milleniatrades.com/privacy",
  });
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <div className="space-y-6 text-gray-700">
            <p>Last updated: April 4, 2025</p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                1. Introduction
              </h2>
              <p>
                At Millennia Trades, we respect your privacy and are committed
                to protecting your personal data. This Privacy Policy explains
                how we collect, use, and safeguard your information when you use
                our platform and services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                2. Information We Collect
              </h2>
              <p>
                We collect several types of information from and about our
                users, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Personal identifiers (name, email address, phone number)
                </li>
                <li>Account information (password)</li>
                <li>
                  Financial information (bank account details, investment
                  preferences)
                </li>
                <li>Usage data (how you interact with our platform)</li>
                <li>
                  Device information (IP address, browser type, operating
                  system)
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                3. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and manage your account</li>
                <li>
                  Communicate with you about your account, new features, or
                  changes to our policies
                </li>
                <li>
                  Monitor and analyze trends, usage, and activities in
                  connection with our services
                </li>
                <li>
                  Detect, prevent, and address technical issues and fraudulent
                  activities
                </li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                4. Information Sharing
              </h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service providers who perform services on our behalf</li>
                <li>Financial institutions to process transactions</li>
                <li>Legal and regulatory authorities as required by law</li>
                <li>
                  Business partners with your consent or to fulfill services you
                  have requested
                </li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                5. Data Security
              </h2>
              <p>
                We implement appropriate security measures to protect your
                personal information from unauthorized access, alteration,
                disclosure, or destruction. However, no method of transmission
                over the Internet or electronic storage is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                6. Your Data Protection Rights
              </h2>
              <p>
                Depending on your location, you may have the following rights
                regarding your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data</li>
                <li>Restrict or object to processing of your data</li>
                <li>Request transfer of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                7. Cookies and Tracking Technologies
              </h2>
              <p>
                We use cookies and similar tracking technologies to collect
                information about your browsing activities and to better
                understand how you use our platform. You can set your browser to
                refuse all or some browser cookies, but this may affect the
                functionality of our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                8. Children&apos;s Privacy
              </h2>
              <p>
                Our services are not intended for individuals under the age of
                18. We do not knowingly collect personal information from
                children. If you become aware that a child has provided us with
                personal information, please contact us immediately.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                9. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last updated&quot; date at the
                top. You are advised to review this Privacy Policy periodically
                for any changes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-invest">
                10. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or our data
                practices, please contact us at:
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
