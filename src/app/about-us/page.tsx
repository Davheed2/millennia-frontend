import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Users, BarChart, Shield, Lightbulb } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generatePageMetadata } from "@/components/common/PageMetaData";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return generatePageMetadata({
    title: "About Us | Millennia Trades – Trusted Since 2012",
    content:
      "Learn about Millennia Trades, a fintech pioneer democratizing investing since 2012. Meet our leadership team and explore the values that drive our client-first, secure, and innovative platform.",
    url: "https://millenniatrades.com/about-us",
  });
};

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="relative h-[400px] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop"
            alt="Team collaboration"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-3xl px-6">
              <h1 className="heading-xl mb-6">About Millennia Trades</h1>
              <p className="text-lg">
                We&apos;re on a mission to democratize investing and help
                everyone build a better financial future, regardless of their
                background or starting point.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg mb-6">Our Story</h2>
            <p className="mb-4 text-muted-foreground">
              Millennia Trades was founded in 2012 by a team of financial
              experts and technology innovators who believed that sophisticated
              investment strategies shouldn&apos;t be reserved for the
              ultra-wealthy.
            </p>
            <p className="mb-4 text-muted-foreground">
              We started with a simple idea: use cutting-edge technology to
              provide everyone access to intelligent investing tools that were
              previously available only to those with significant resources.
            </p>
            <p className="text-muted-foreground">
              Today, we serve hundreds of thousands of clients, managing
              billions in assets with the same commitment to accessibility,
              transparency, and customer service that drove our founding.
            </p>
          </div>

          <Separator className="my-16" />

          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg text-center mb-12">Our Values</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-invest/10 p-3 rounded-full flex items-center justify-center mt-1">
                  <Users className="h-6 w-6 text-invest" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Client First</h3>
                  <p className="text-muted-foreground">
                    We build every feature, make every decision, and structure
                    every offering with our clients&apos; best interests in
                    mind.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-invest/10 p-3 rounded-full flex items-center justify-center mt-1">
                  <Shield className="h-6 w-6 text-invest" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Trust & Security
                  </h3>
                  <p className="text-muted-foreground">
                    We safeguard your investments and personal information with
                    the highest security standards in the industry.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-invest/10 p-3 rounded-full flex items-center justify-center mt-1">
                  <BarChart className="h-6 w-6 text-invest" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Data-Driven</h3>
                  <p className="text-muted-foreground">
                    We make investment decisions based on rigorous research,
                    comprehensive data analysis, and proven financial theories.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-invest/10 p-3 rounded-full flex items-center justify-center mt-1">
                  <Lightbulb className="h-6 w-6 text-invest" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We continuously explore new technologies and strategies to
                    improve our platform and provide better outcomes for our
                    clients.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg text-center mb-12">Leadership Team</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Avatar className="h-40 w-40 mx-auto mb-4">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2787&auto=format&fit=crop"
                    alt="Michael Chen, CEO"
                    className="h-[125%]"
                  />
                  <AvatarFallback className="text-2xl">MC</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mb-1">Michael Chen</h3>
                <p className="text-invest mb-2 text-sm">CEO & Co-Founder</p>
                <p className="text-muted-foreground text-sm">
                  Former fintech executive with 15+ years of experience in
                  wealth management.
                </p>
              </div>

              <div className="text-center">
                <Avatar className="h-40 w-40 mx-auto mb-4">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2876&auto=format&fit=crop"
                    alt="Sarah Johnson, CTO"
                    className="object-cover h-[120%]"
                  />
                  <AvatarFallback className="text-2xl">SJ</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
                <p className="text-invest mb-2 text-sm">CTO & Co-Founder</p>
                <p className="text-muted-foreground text-sm">
                  AI researcher and software architect specializing in financial
                  algorithms.
                </p>
              </div>

              <div className="text-center">
                <Avatar className="h-40 w-40 mx-auto mb-4">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2787&auto=format&fit=crop"
                    alt="David Rodriguez, CIO"
                    className="object-cover h-[120%]"
                  />
                  <AvatarFallback className="text-2xl">DR</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mb-1">David Rodriguez</h3>
                <p className="text-invest mb-2 text-sm">
                  Chief Investment Officer
                </p>
                <p className="text-muted-foreground text-sm">
                  Former hedge fund manager with a focus on quantitative
                  investing strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
