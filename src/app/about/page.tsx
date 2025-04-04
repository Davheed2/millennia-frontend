import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-xl mb-6">About Investo</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">
              At Investo, we believe that everyone deserves the opportunity to
              build wealth through smart, accessible investing. Founded in 2022,
              we&apos;ve been on a mission to democratize finance and make
              intelligent investing available to all.
            </p>

            <h2 className="heading-md mt-10 mb-4">Our Mission</h2>
            <p className="mb-6">
              We&apos;re committed to breaking down the barriers that have
              traditionally made investing feel exclusive or complicated. Our
              platform combines powerful technology with straightforward
              education to help people at every stage of their financial
              journey.
            </p>

            <h2 className="heading-md mt-10 mb-4">Our Team</h2>
            <p className="mb-6">
              Our diverse team brings together expertise from finance,
              technology, and education. We&apos;re united by a passion for
              creating tools that empower people to take control of their
              financial futures.
            </p>

            <div className="my-12 grid md:grid-cols-2 gap-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Innovative Platform
                </h3>
                <p>
                  Our technology makes complex investment strategies accessible
                  through an intuitive interface designed for both beginners and
                  experienced investors.
                </p>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-2">Education First</h3>
                <p>
                  We believe knowledge is power. That&apos;s why we provide
                  comprehensive resources to help you make informed decisions
                  about your investments.
                </p>
              </div>
            </div>

            <h2 className="heading-md mt-10 mb-4">Our Values</h2>
            <ul className="list-disc pl-5 mb-8 space-y-2">
              <li>
                <strong>Transparency:</strong> Clear information about fees,
                risks, and performance.
              </li>
              <li>
                <strong>Accessibility:</strong> Tools and guidance for investors
                at every level.
              </li>
              <li>
                <strong>Education:</strong> Resources to build financial
                literacy and confidence.
              </li>
              <li>
                <strong>Innovation:</strong> Continuously improving our platform
                with cutting-edge technology.
              </li>
              <li>
                <strong>Security:</strong> Robust protection for your
                investments and personal information.
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
