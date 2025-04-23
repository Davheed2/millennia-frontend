"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Copy,
  Share2,
  Facebook,
  Twitter,
  Mail,
  Gift,
} from "lucide-react";
//import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

// Mock referral data
const referrals = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    status: "Registered",
    date: "2025-04-02T10:15:00",
    invested: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    status: "Registered",
    date: "2025-03-28T14:30:00",
    invested: false,
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.davis@example.com",
    status: "Pending",
    date: "2025-03-15T09:45:00",
    invested: false,
  },
];

export default function Referrals() {
  //const { toast } = useToast();

  // Mock referral data
  const referralCode = "INVEST-FRI3ND";
  const referralLink = `https://investo.com/signup?ref=${referralCode}`;
  const totalReferrals = referrals.length;
  const successfulReferrals = referrals.filter((r) => r.invested).length;
  const pendingReferrals = referrals.filter(
    (r) => r.status === "Pending"
  ).length;

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    // toast({
    //   title: "Copied to clipboard",
    //   description: "Referral link has been copied to clipboard",
    // });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Referral Program</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total Referrals</p>
              <Users className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-3xl font-bold">{totalReferrals}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Successful Referrals</p>
              <Gift className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-3xl font-bold">{successfulReferrals}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Pending Invitations</p>
              <Mail className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-3xl font-bold">{pendingReferrals}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Refer Friends & Earn Rewards</CardTitle>
          <CardDescription>
            Share your referral link with friends and earn rewards when they
            invest
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-invest/5 rounded-lg mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Your Referral Link
                </p>
                <div className="flex items-center gap-2">
                  <Input value={referralLink} readOnly className="bg-white" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyReferralLink}
                    className="shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Referral Code
                </p>
                <div className="flex items-center gap-2">
                  <code className="relative rounded bg-muted px-[0.5rem] py-[0.4rem] font-mono text-sm font-semibold">
                    {referralCode}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(referralCode);
                      // toast({
                      //   title: "Copied to clipboard",
                      //   description:
                      //     "Referral code has been copied to clipboard",
                      // });
                    }}
                    className="shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-invest/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Share2 className="h-6 w-6 text-invest" />
                </div>
                <h4 className="font-medium mb-1">Share Your Link</h4>
                <p className="text-sm text-gray-500">
                  Share your unique referral link with friends and family
                </p>
              </div>
              <div className="text-center">
                <div className="bg-invest/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-invest" />
                </div>
                <h4 className="font-medium mb-1">Friends Sign Up</h4>
                <p className="text-sm text-gray-500">
                  When they create an account using your link
                </p>
              </div>
              <div className="text-center">
                <div className="bg-invest/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Gift className="h-6 w-6 text-invest" />
                </div>
                <h4 className="font-medium mb-1">Both Get Rewarded</h4>
                <p className="text-sm text-gray-500">
                  You both receive $50 in investment credit when they invest
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">Reward Progress</h3>
            <p className="text-sm text-gray-500 mb-4">
              Invite 5 friends who make an investment to earn a $250 bonus
            </p>

            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium">
                {successfulReferrals}/5 successful referrals
              </span>
              <span className="text-gray-500">
                {5 - successfulReferrals} more to earn $250 bonus
              </span>
            </div>
            <Progress
              value={(successfulReferrals / 5) * 100}
              className="h-2 mb-6"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Share Your Link</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Facebook className="h-4 w-4 text-blue-600" />
                <span>Facebook</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Twitter className="h-4 w-4 text-blue-400" />
                <span>Twitter</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-600" />
                <span>Email</span>
              </Button>
            </div>
          </div>

        

         
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Referral History</CardTitle>
          <CardDescription>Track the status of your referrals</CardDescription>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">
                No referrals yet
              </h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">
                Start inviting friends to earn rewards
              </p>
              <Button className="bg-invest hover:bg-invest-secondary">
                Invite Friends
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-500">
                <div>Name</div>
                <div>Email</div>
                <div>Date</div>
                <div>Status</div>
              </div>
              <Separator />
              {referrals.map((referral) => (
                <div key={referral.id}>
                  <div className="grid grid-cols-4 gap-4 p-4 items-center">
                    <div>{referral.name}</div>
                    <div className="text-sm text-gray-500">
                      {referral.email}
                    </div>
                    <div className="text-sm">{formatDate(referral.date)}</div>
                    <div>
                      {referral.invested ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Invested
                        </span>
                      ) : referral.status === "Registered" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Registered
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
