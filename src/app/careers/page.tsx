import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Code,
  DollarSign,
  Heart,
  LineChart,
  Users,
} from "lucide-react";
import Image from "next/image";

export default function Careers() {
  // Sample job listings
  const jobListings = [
    {
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "New York, NY (Hybrid)",
      type: "Full-time",
      description:
        "Build responsive, accessible UI components for our investment platform.",
    },
    {
      title: "Investment Analyst",
      department: "Investments",
      location: "Chicago, IL (On-site)",
      type: "Full-time",
      description:
        "Research and analyze investment opportunities across asset classes.",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote (US)",
      type: "Full-time",
      description:
        "Lead product development for our portfolio management features.",
    },
    {
      title: "Customer Success Specialist",
      department: "Customer Support",
      location: "Austin, TX (Hybrid)",
      type: "Full-time",
      description: "Provide exceptional support to clients using our platform.",
    },
    {
      title: "Data Scientist",
      department: "Data & Analytics",
      location: "Remote (US)",
      type: "Full-time",
      description:
        "Develop machine learning models to optimize investment strategies.",
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-time",
      description: "Drive growth through digital marketing channels.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="relative h-[400px] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2942&auto=format&fit=crop"
            alt="Team collaboration"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-3xl px-6">
              <h1 className="heading-xl text-white mb-6">Join Our Team</h1>
              <p className="text-xl text-white/85">
                Help us build the future of investing at one of the
                fastest-growing fintech companies
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg mb-6">Why Work at Investo?</h2>
            <p className="text-lg text-muted-foreground">
              We&apos;re building a company where talented, passionate people
              can thrive in an environment that values innovation,
              collaboration, and impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-invest" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Purpose-Driven</h3>
              <p className="text-muted-foreground">
                Make a real impact on people&apos;s financial lives and help
                build a more inclusive financial system.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-invest" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Competitive Compensation
              </h3>
              <p className="text-muted-foreground">
                Top-tier salaries, equity packages, and comprehensive benefits
                designed to reward excellence.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-invest" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inclusive Culture</h3>
              <p className="text-muted-foreground">
                A collaborative environment where diverse perspectives are
                valued and everyone belongs.
              </p>
            </div>
          </div>

          <Separator className="my-16" />

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="heading-lg text-center mb-12">Open Positions</h2>

            <div className="grid gap-6">
              {jobListings.map((job, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-1">
                          {job.title}
                        </CardTitle>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline" className="bg-invest/5">
                            {job.department}
                          </Badge>
                          <Badge variant="outline" className="bg-invest/5">
                            {job.location}
                          </Badge>
                          <Badge variant="outline" className="bg-invest/5">
                            {job.type}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-invest hover:bg-invest-secondary text-white"
                      >
                        Apply
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{job.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-center mb-8">Our Teams</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="bg-invest/10 p-3 rounded-full flex items-center justify-center mt-1">
                  <Code className="h-6 w-6 text-invest" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Engineering</h3>
                  <p className="text-muted-foreground">
                    Build cutting-edge technology that powers our investment
                    platform, from web and mobile apps to backend systems.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-invest/10 p-3 rounded-full flex items-center justify-center mt-1">
                  <LineChart className="h-6 w-6 text-invest" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Investments</h3>
                  <p className="text-muted-foreground">
                    Design and optimize investment strategies, research market
                    trends, and develop new financial products.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-invest/10 p-3 rounded-full flex items-center justify-center mt-1">
                  <Users className="h-6 w-6 text-invest" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Client Success</h3>
                  <p className="text-muted-foreground">
                    Support our clients throughout their investing journey,
                    providing expert guidance and solving complex problems.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-invest/10 p-3 rounded-full flex items-center justify-center mt-1">
                  <Building className="h-6 w-6 text-invest" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Operations</h3>
                  <p className="text-muted-foreground">
                    Keep our business running smoothly, from compliance and
                    legal to finance and administration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-invest/5 p-8 rounded-xl">
            <h2 className="heading-md text-center mb-6">
              Don&apos;t See the Right Role?
            </h2>
            <p className="text-center mb-6">
              We&apos;re always interested in connecting with talented people.
              Send us your resume and we&apos;ll keep you in mind for future
              opportunities.
            </p>
            <div className="flex justify-center">
              <Button className="bg-invest hover:bg-invest-secondary text-white">
                Submit General Application
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
