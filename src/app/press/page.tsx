import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Mail } from "lucide-react";
import Image from "next/image";

export default function Press() {
  // Sample press releases
  const pressReleases = [
    {
      title: "Investo Raises $50M Series C to Expand Investment Platform",
      date: "April 1, 2025",
      excerpt:
        "Funding will fuel international expansion and new product development to make investing more accessible.",
    },
    {
      title: "Investo Launches ESG-Focused Portfolio Management Tools",
      date: "February 15, 2025",
      excerpt:
        "New features help investors align their portfolios with environmental and social values.",
    },
    {
      title: "Investo Reaches 500,000 Active Users Milestone",
      date: "November 20, 2024",
      excerpt:
        "Rapid growth demonstrates demand for accessible investment solutions.",
    },
    {
      title: "Investo Named to Forbes Fintech 50 List",
      date: "September 5, 2024",
      excerpt:
        "Recognition highlights company's innovation in democratizing investing.",
    },
  ];

  // Sample media coverage
  const mediaCoverage = [
    {
      source: "The Wall Street Journal",
      title: "How Investo is Disrupting Traditional Wealth Management",
      date: "March 12, 2025",
      logo: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop",
    },
    {
      source: "CNBC",
      title: "Investo CEO on the Future of Automated Investing",
      date: "January 28, 2025",
      logo: "https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=2070&auto=format&fit=crop",
    },
    {
      source: "Bloomberg",
      title:
        "Retail Investors Flock to Investo's Platform During Market Volatility",
      date: "October 18, 2024",
      logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    },
    {
      source: "TechCrunch",
      title: "Inside Investo's AI-Powered Investment Strategies",
      date: "August 7, 2024",
      logo: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-xl gradient-text mb-6">Press & Media</h1>
            <p className="text-lg text-muted-foreground">
              Find the latest news, press releases, and media resources about
              Investo. For press inquiries, please contact our media relations
              team.
            </p>
            <Button className="mt-6 bg-invest hover:bg-invest-secondary text-white">
              <Mail className="mr-2 h-4 w-4" /> Contact Press Team
            </Button>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="heading-lg mb-8">Press Releases</h2>

            <div className="grid gap-6">
              {pressReleases.map((release, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <Badge className="mb-2 bg-invest text-white">
                          {release.date}
                        </Badge>
                        <CardTitle className="text-xl">
                          {release.title}
                        </CardTitle>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-invest text-invest hover:bg-invest/10"
                      >
                        Read More
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{release.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline">View All Press Releases</Button>
            </div>
          </div>

          <Separator className="my-16" />

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="heading-lg mb-8">Media Coverage</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {mediaCoverage.map((article, index) => (
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative w-8 h-8 rounded overflow-hidden">
                        <Image
                          src={article.logo}
                          alt={article.source}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-semibold">{article.source}</span>
                    </div>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 flex-grow">
                    <p className="text-muted-foreground text-sm">
                      {article.date}
                    </p>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <Button variant="ghost" className="text-invest">
                      Read Article →
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="heading-lg mb-8">Media Resources</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-invest" />
                    Company Fact Sheet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Key information about Investo&apos;s mission, products, and
                    growth metrics.
                  </p>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-invest" />
                    Brand Assets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Download logos, screenshots, and other visual assets for
                    media use.
                  </p>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" /> Download ZIP
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-invest" />
                    Executive Bios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Professional backgrounds and photos of Investo&apos;s
                    leadership team.
                  </p>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-invest/5 p-8 rounded-xl">
            <h2 className="heading-md text-center mb-6">Press Contact</h2>
            <p className="text-center mb-6">
              For press inquiries, interview requests, or additional
              information, please contact our media relations team.
            </p>
            <div className="text-center space-y-2">
              <p className="font-medium">Media Relations</p>
              <p>
                <a
                  href="mailto:press@investo.com"
                  className="text-invest hover:underline"
                >
                  press@investo.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+12345678900"
                  className="text-invest hover:underline"
                >
                  +1 (234) 567-8900
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
