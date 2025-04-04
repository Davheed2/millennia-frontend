import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Leaf, Globe, Heart } from "lucide-react";

export default function SociallyResponsible() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-xl gradient-text mb-6">
              Socially Responsible Investing
            </h1>
            <p className="text-lg text-muted-foreground">
              Align your investments with your values. Make a positive impact
              while building your wealth with our socially responsible investing
              options.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-invest" />
                  Environmental Focus
                </CardTitle>
                <CardDescription>
                  Invest in companies committed to environmental sustainability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Lower carbon footprint investments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Renewable energy companies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Water conservation and clean technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Sustainable resource management</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-invest hover:bg-invest-secondary text-white">
                  Explore Environmental Portfolio
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-invest" />
                  Social Impact
                </CardTitle>
                <CardDescription>
                  Support companies with positive social practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Fair labor practices and workers&apos; rights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Diversity and inclusion leaders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Community development initiatives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-invest">•</span>
                    <span>Health and wellness focused companies</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-invest hover:bg-invest-secondary text-white">
                  Explore Social Impact Portfolio
                </Button>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-16" />

          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg text-center mb-12">
              ESG Investment Approach
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Environmental</h3>
                <p className="text-muted-foreground">
                  Companies focused on reducing their environmental footprint
                  and developing sustainable solutions.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Social</h3>
                <p className="text-muted-foreground">
                  Organizations that prioritize fair treatment of employees,
                  customers, and communities.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Governance</h3>
                <p className="text-muted-foreground">
                  Businesses with ethical leadership, transparent practices, and
                  diverse boards.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-invest/5 p-8 rounded-xl">
            <h2 className="heading-md text-center mb-6">
              Invest According to Your Values
            </h2>
            <p className="text-center mb-6">
              Our socially responsible portfolios are designed to help you
              invest in companies that align with your values without
              sacrificing returns.
            </p>
            <div className="flex justify-center">
              <Button className="bg-invest hover:bg-invest-secondary text-white">
                Get Started with ESG Investing
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
