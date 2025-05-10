"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

export default function ContactUs() {
  // State for form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

  // Handle form submission
  const onSubmit = () => {
    // Validate form fields
    if (!firstName || !lastName || !email || !message || !privacyPolicy) {
      toast.error(
        "Please fill out all required fields and agree to the privacy policy."
      );
      return;
    }

    // EmailJS parameters
    const templateParams = {
      firstName,
      lastName,
      email,
      phone,
      message,
    };

    emailjs
      .send(
        "service_d0z9ovc", // Replace with your EmailJS Service ID
        "template_w55187j", // Replace with your EmailJS Template ID
        templateParams,
        "P2z0a8wpFMsHunIT_" // Replace with your EmailJS User ID
      )
      .then(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (response) => {
          toast.success("Message sent successfully!");
          // Reset form
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
          setPrivacyPolicy(false);
        },
        (error) => {
          toast.error("Failed to send message. Please try again.");
          console.error("EmailJS error:", error);
        }
      );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <h1 className="heading-xl gradient-text mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              We&apos;d love to solve your problem. Kindly fill out this form.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact image */}
            <div className="relative rounded-lg overflow-hidden h-[500px] md:h-auto hidden md:flex">
              <Image
                src="/contact2.jpg"
                alt="Contact our team"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white p-4">
                <p className="font-medium">Millennia Trades</p>
              </div>
            </div>

            {/* Contact form */}
            <Card className="p-6 shadow-none">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      id="firstName"
                      aria-label="First Name"
                      placeholder="First Name"
                      className="min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      id="lastName"
                      aria-label="Last Name"
                      placeholder="Last Name"
                      className="min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    aria-label="Email address"
                    placeholder="Email Address"
                    className="min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone number
                  </label>
                  <Input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id="phone"
                    aria-label="Phone Number"
                    placeholder="Phone Number"
                    className="min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us your problem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="resize-none"
                    rows={5}
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="privacyPolicy"
                    checked={privacyPolicy}
                    onCheckedChange={() => {
                      setPrivacyPolicy(true);
                    }}
                  />
                  <label htmlFor="privacyPolicy" className="text-sm">
                    You agree to our friendly{" "}
                    <Link
                      href="/privacy"
                      className="text-invest hover:underline"
                    >
                      privacy policy
                    </Link>
                    .
                  </label>
                </div>

                <Button
                  type="button"
                  onClick={onSubmit}
                  className="w-full bg-[#1a5fb4] hover:bg-[#1552a0] text-white"
                >
                  Send message
                </Button>
              </form>
            </Card>
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
