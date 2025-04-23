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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileCheck,
  Upload,
  Check,
  AlertCircle,
  Clock,
  ChevronRight,
  ChevronDown,
  Camera,
} from "lucide-react";
//import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export default function KYCVerification() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //const { toast } = useToast();
  const [identityType, setIdentityType] = useState("");
  const [identityFile, setIdentityFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [addressFile, setAddressFile] = useState<File | null>(null);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
    //   toast({
    //     title: "KYC documents submitted",
    //     description: "Your documents have been submitted for review.",
    //   });
    }, 2000);
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">KYC Verification</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Identity Verification</CardTitle>
          <CardDescription>
            Complete the verification process to unlock all features and start
            investing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <div className="text-sm font-medium">Progress</div>
              <div className="text-sm font-medium">
                {step > 3 ? "Complete" : `Step ${step} of 3`}
              </div>
            </div>
            <Progress value={(step / 3) * 100} className="h-2" />
          </div>

          {step === 1 && (
            <>
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      Why we need your information
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      To comply with financial regulations and protect your
                      account, we need to verify your identity before you can
                      start investing. This process is secure and your data is
                      protected.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Legal Name</label>
                  <Input placeholder="As it appears on your ID document" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date of Birth</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(
                          (day) => (
                            <SelectItem key={day} value={day.toString()}>
                              {day}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((month, i) => (
                          <SelectItem key={month} value={(i + 1).toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          { length: 100 },
                          (_, i) => new Date().getFullYear() - i - 18
                        ).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Nationality</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      {/* Add more countries as needed */}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input placeholder="Street address" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <Input placeholder="City" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Postal Code</label>
                    <Input placeholder="Postal/ZIP code" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    onClick={handleNext}
                    className="bg-invest hover:bg-invest-secondary"
                  >
                    Next Step <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Identity Document</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Please upload a clear photo or scan of your government-issued
                  ID
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Document Type</label>
                    <Select
                      value={identityType}
                      onValueChange={setIdentityType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="drivers_license">
                          Driver&apos;s License
                        </SelectItem>
                        <SelectItem value="national_id">
                          National ID Card
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Upload Document
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="file"
                        id="identity-document"
                        className="hidden"
                        accept="image/jpeg,image/png,application/pdf"
                        onChange={(e) => handleFileUpload(e, setIdentityFile)}
                      />
                      <label
                        htmlFor="identity-document"
                        className="cursor-pointer text-center w-full"
                      >
                        {identityFile ? (
                          <div className="flex items-center justify-center flex-col">
                            <FileCheck className="h-12 w-12 text-green-500 mb-2" />
                            <p className="text-sm font-medium text-gray-900">
                              {identityFile.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Click to change file
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center flex-col">
                            <Upload className="h-12 w-12 text-gray-400 mb-2" />
                            <p className="text-sm font-medium text-gray-900">
                              Click to upload
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              JPG, PNG or PDF (max. 10MB)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Take a Selfie</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="file"
                        id="selfie"
                        className="hidden"
                        accept="image/jpeg,image/png"
                        onChange={(e) => handleFileUpload(e, setSelfieFile)}
                      />
                      <label
                        htmlFor="selfie"
                        className="cursor-pointer text-center w-full"
                      >
                        {selfieFile ? (
                          <div className="flex items-center justify-center flex-col">
                            <FileCheck className="h-12 w-12 text-green-500 mb-2" />
                            <p className="text-sm font-medium text-gray-900">
                              {selfieFile.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Click to change file
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center flex-col">
                            <Camera className="h-12 w-12 text-gray-400 mb-2" />
                            <p className="text-sm font-medium text-gray-900">
                              Upload a selfie
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              JPG or PNG (max. 10MB)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-between">
                  <Button variant="outline" onClick={handlePrevious}>
                    <ChevronDown className="mr-1 h-4 w-4 rotate-90" /> Previous
                    Step
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!identityType || !identityFile || !selfieFile}
                    className="bg-invest hover:bg-invest-secondary"
                  >
                    Next Step <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Proof of Address</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Please upload a document showing your current residential
                  address (utility bill, bank statement, etc.)
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Address Document
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="file"
                        id="address-document"
                        className="hidden"
                        accept="image/jpeg,image/png,application/pdf"
                        onChange={(e) => handleFileUpload(e, setAddressFile)}
                      />
                      <label
                        htmlFor="address-document"
                        className="cursor-pointer text-center w-full"
                      >
                        {addressFile ? (
                          <div className="flex items-center justify-center flex-col">
                            <FileCheck className="h-12 w-12 text-green-500 mb-2" />
                            <p className="text-sm font-medium text-gray-900">
                              {addressFile.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Click to change file
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center flex-col">
                            <Upload className="h-12 w-12 text-gray-400 mb-2" />
                            <p className="text-sm font-medium text-gray-900">
                              Click to upload
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              JPG, PNG or PDF (max. 10MB)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-between">
                    <Button variant="outline" onClick={handlePrevious}>
                      <ChevronDown className="mr-1 h-4 w-4 rotate-90" />{" "}
                      Previous Step
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!addressFile || isSubmitting}
                      className="bg-invest hover:bg-invest-secondary"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Verification"}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verification Submitted</h3>
              <p className="text-sm text-gray-500 mb-6">
                Thank you for submitting your verification documents. We&apos;ll
                review them and update your account status as soon as possible.
              </p>
              <div className="flex items-center justify-center space-x-3 text-sm bg-blue-50 p-3 rounded-lg">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-blue-700">
                  Typical verification time: 1-2 business days
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
