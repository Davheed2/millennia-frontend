import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-xl gradient-text mb-6">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Have questions or need assistance? Our team is here to help. Reach
              out through any of the channels below.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
                <p className="text-muted-foreground mb-2">
                  Speak directly with our investment specialists
                </p>
                <a
                  href="tel:+18001234567"
                  className="text-invest font-medium hover:underline block"
                >
                  +1 (800) 123-4567
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  Monday-Friday, 8am-8pm EST
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground mb-2">
                  Send us a message anytime
                </p>
                <a
                  href="mailto:support@investo.com"
                  className="text-invest font-medium hover:underline block"
                >
                  support@investo.com
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  We typically respond within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="bg-invest/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-invest" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Office Location</h3>
                <p className="text-muted-foreground mb-2">
                  Visit our headquarters
                </p>
                <p className="text-invest font-medium">123 Financial Street</p>
                <p className="text-invest font-medium">New York, NY 10001</p>
                <p className="text-sm text-muted-foreground mt-2">
                  By appointment only
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8 mb-16">
            <div className="md:col-span-2 space-y-6">
              <h2 className="heading-md">Get in Touch</h2>
              <p className="text-muted-foreground">
                Fill out the form and one of our team members will get back to
                you as soon as possible.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-invest mt-1" />
                  <div>
                    <h4 className="font-medium">Business Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      Monday-Friday: 8am-8pm EST
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Saturday: 10am-4pm EST
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sunday: Closed
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-invest mt-1" />
                  <div>
                    <h4 className="font-medium">Departments</h4>
                    <p className="text-sm text-muted-foreground">
                      Customer Support: +1 (800) 123-4567
                    </p>
                    <p className="text-sm text-muted-foreground">
                      New Accounts: +1 (800) 987-6543
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Technical Support: +1 (800) 456-7890
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 space-y-6 bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold">Contact Form</h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiry">Type of Inquiry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="account">Account Support</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="investing">
                        Investment Advice
                      </SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe how we can help you"
                    rows={5}
                  />
                </div>

                <Button className="w-full bg-invest hover:bg-invest-secondary text-white">
                  Submit Message
                </Button>
              </form>
            </div>
          </div>

          <Separator className="my-16" />

          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  How quickly will I get a response?
                </h3>
                <p className="text-muted-foreground">
                  We strive to respond to all inquiries within 24 hours during
                  business days.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Can I schedule a consultation?
                </h3>
                <p className="text-muted-foreground">
                  Yes, you can schedule a virtual or in-person consultation with
                  one of our financial advisors.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  What information do I need for technical support?
                </h3>
                <p className="text-muted-foreground">
                  Please have your account number ready and describe any error
                  messages you&apos;re seeing.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Do you offer international support?
                </h3>
                <p className="text-muted-foreground">
                  Yes, we have representatives available for international
                  clients in multiple languages.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-invest/5 p-8 rounded-xl">
            <h2 className="heading-md text-center mb-6">
              Need Immediate Assistance?
            </h2>
            <p className="text-center mb-6">
              For urgent matters, please call our priority support line for
              faster service.
            </p>
            <div className="flex justify-center">
              <Button className="bg-invest hover:bg-invest-secondary text-white">
                <Phone className="mr-2 h-4 w-4" /> Call Priority Support
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
