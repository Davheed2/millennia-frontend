"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function ContactUs() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      privacyPolicy: false,
    },
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
    // Here you would typically send the form data to your backend
    alert("Message sent successfully!");
    //form.reset();
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
              {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white p-4">
                <p className="font-medium">Millennia Trades</p>
              </div>
            </div>

            {/* Contact form */}
            <Card className="p-6 shadow-none">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input
                      type="text"
                      autoFocus
                      id="firstName"
                      aria-label="First Name"
                      placeholder="First Name"
                      className={`min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input
                      type="text"
                      id="lastName"
                      aria-label="Last Name"
                      placeholder="Last Name"
                      className={`min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    aria-label="Email address"
                    placeholder="Email Address"
                    className={`min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone number
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      id="phone"
                      aria-label="Phone Number"
                      placeholder="Phone Number"
                      className={`min-h-[45px] text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us your problem..."
                    className="resize-none"
                    rows={5}
                    {...form.register("message", { required: true })}
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="privacyPolicy"
                    {...form.register("privacyPolicy", { required: true })}
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
                  type="submit"
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
