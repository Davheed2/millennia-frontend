import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function Resources() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-xl mb-6">Investing Resources</h1>
          <p className="text-lg mb-12">
            Explore our library of resources designed to help you become a more
            confident, knowledgeable investor—regardless of your experience
            level.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="heading-md mb-4">Investment Guides</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Getting Started with Investing",
                    description:
                      "Learn the fundamentals of investing, key terminology, and how to build your first portfolio.",
                    level: "Beginner",
                  },
                  {
                    title: "Understanding Market Cycles",
                    description:
                      "Explore how market cycles work and strategies for navigating different economic conditions.",
                    level: "Intermediate",
                  },
                  {
                    title: "Asset Allocation Strategies",
                    description:
                      "Discover how to effectively distribute your investments across different asset classes.",
                    level: "Intermediate",
                  },
                  {
                    title: "Advanced Portfolio Construction",
                    description:
                      "Learn sophisticated approaches to building resilient, high-performing portfolios.",
                    level: "Advanced",
                  },
                ].map((guide, i) => (
                  <div key={i} className="glass-card p-6 flex flex-col h-full">
                    <h3 className="text-xl font-semibold mb-2">
                      {guide.title}
                    </h3>
                    <p className="mb-3 flex-grow">{guide.description}</p>
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
                      <a
                        href="#"
                        className="text-invest flex items-center hover:underline"
                      >
                        Read more <ArrowRight size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="heading-md mb-4">Webinars & Workshops</h2>
              <div className="glass-card p-6">
                <div className="space-y-6">
                  {[
                    {
                      title: "Investing in a Volatile Market",
                      date: "June 15, 2023",
                      time: "2:00 PM - 3:30 PM EST",
                      presenter:
                        "Dr. Sarah Johnson, Chief Investment Strategist",
                    },
                    {
                      title: "Retirement Planning for Millennials",
                      date: "June 22, 2023",
                      time: "1:00 PM - 2:00 PM EST",
                      presenter: "Michael Chen, Financial Planning Expert",
                    },
                    {
                      title: "Understanding Cryptocurrency Investments",
                      date: "July 5, 2023",
                      time: "11:00 AM - 12:30 PM EST",
                      presenter: "Aisha Patel, Crypto Research Analyst",
                    },
                  ].map((webinar, i) => (
                    <div
                      key={i}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b last:border-0"
                    >
                      <div>
                        <h3 className="font-semibold text-lg">
                          {webinar.title}
                        </h3>
                        <p className="text-foreground/70">
                          {webinar.date} • {webinar.time}
                        </p>
                        <p className="text-sm">{webinar.presenter}</p>
                      </div>
                      <button className="mt-3 md:mt-0 bg-invest hover:bg-invest-secondary text-white px-4 py-2 rounded-md transition-colors">
                        Register
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-12">
              <h2 className="heading-md mb-4">Financial Calculators</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Compound Interest Calculator",
                    description:
                      "See how your investments can grow over time with compound interest.",
                  },
                  {
                    title: "Retirement Savings Calculator",
                    description:
                      "Plan for retirement by estimating how much you need to save monthly.",
                  },
                  {
                    title: "Investment Fee Analyzer",
                    description:
                      "Understand how fees affect your long-term investment returns.",
                  },
                ].map((tool, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
                  >
                    <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                    <p className="text-foreground/80 mb-4">
                      {tool.description}
                    </p>
                    <button className="text-invest hover:text-invest-secondary transition-colors">
                      Try Calculator →
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
