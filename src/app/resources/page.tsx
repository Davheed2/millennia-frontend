import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Book, Calculator, BarChart } from "lucide-react";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "Investing Resources | Millennia Trades",
    content:
      "Explore a library of resources to help you become a more confident, knowledgeable investor. Whether you're a beginner or experienced, we provide guides, calculators, and expert advice to support your investment journey.",
    url: "https://millenniatrades.com/resources",
  });
};

export default function Resources() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-xl mb-4 gradient-text">
              Investing Resources
            </h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Explore our library of resources designed to help you become a
              more confident, knowledgeable investor regardless of your
              experience level.
            </p>
          </div>

          <div className="space-y-16">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-invest/10 p-2 rounded-full">
                  <Book className="h-5 w-5 text-invest" />
                </div>
                <h2 className="heading-md">Investment Guides</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Getting Started with Investing",
                    description:
                      "Learn the fundamentals of investing, key terminology, and how to build your first portfolio.",
                    level: "Beginner",
                    link: "/resources/getting-started",
                    image:
                      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
                  },
                  {
                    title: "Understanding Market Cycles",
                    description:
                      "Explore how market cycles work and strategies for navigating different economic conditions.",
                    level: "Intermediate",
                    link: "/resources/market-cycles",
                    image:
                      "https://images.unsplash.com/photo-1500673922987-e212871fec22",
                  },
                  {
                    title: "Asset Allocation Strategies",
                    description:
                      "Discover how to effectively distribute your investments across different asset classes.",
                    level: "Intermediate",
                    link: "/resources/asset-allocation",
                    image:
                      "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
                  },
                  {
                    title: "Advanced Portfolio Construction",
                    description:
                      "Learn sophisticated approaches to building resilient, high-performing portfolios.",
                    level: "Advanced",
                    link: "/resources/advanced-construction",
                    image:
                      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
                  },
                ].map((guide, i) => (
                  <div
                    key={i}
                    className="glass-card overflow-hidden rounded-xl flex flex-col h-full transition-all hover:shadow-lg"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={`${guide.image}?q=80&w=800&auto=format&fit=crop`}
                        alt={guide.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold mb-2">
                        {guide.title}
                      </h3>
                      <p className="mb-4 text-foreground/80 flex-grow">
                        {guide.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${
                            guide.level === "Beginner"
                              ? "bg-green-100 text-green-800"
                              : guide.level === "Intermediate"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {guide.level}
                        </span>
                        <Link
                          href={guide.link}
                          className="text-invest flex items-center hover:underline"
                        >
                          Read more <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-invest/10 p-2 rounded-full">
                  <Calculator className="h-5 w-5 text-invest" />
                </div>
                <h2 className="heading-md">Financial Calculators</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Compound Interest Calculator",
                    description:
                      "See how your investments can grow over time with compound interest.",
                    link: "/compound-calculator",
                    icon: <BarChart className="h-12 w-12 text-invest mb-2" />,
                    image:
                      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
                  },
                  {
                    title: "Retirement Savings Calculator",
                    description:
                      "Plan for retirement by estimating how much you need to save monthly.",
                    link: "/retirement-calculator",
                    icon: <BarChart className="h-12 w-12 text-invest mb-2" />,
                    image:
                      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
                  },
                  {
                    title: "Investment Fee Analyzer",
                    description:
                      "Understand how fees affect your long-term investment returns.",
                    link: "/fee-analyzer",
                    icon: <BarChart className="h-12 w-12 text-invest mb-2" />,
                    image:
                      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
                  },
                ].map((tool, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 bg-white rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="relative h-40 w-full">
                      <Image
                        src={`${tool.image}?q=80&w=800&auto=format&fit=crop`}
                        alt={tool.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2">
                        {tool.title}
                      </h3>
                      <p className="text-foreground/80 mb-4">
                        {tool.description}
                      </p>
                      <Link
                        href={tool.link}
                        className="text-invest hover:text-invest-secondary transition-colors flex items-center"
                      >
                        Try Calculator <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-invest/5 rounded-xl p-8 text-center">
              <h2 className="heading-md mb-4">Need More Help?</h2>
              <p className="mb-6 max-w-lg mx-auto">
                Our team of financial experts is ready to assist you with
                personalized guidance for your investment journey.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-invest hover:bg-invest-secondary text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
