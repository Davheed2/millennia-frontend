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
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { ApiResponse, Kyc } from "@/interfaces";
import { callApi } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { KycType, zodValidator } from "@/lib/validators/validateWithZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { KycData } from "@/interfaces/ApiResponse";
import { FormErrorMessage } from "./common";

export default function DashboardKyc() {
  const [step, setStep] = useState(1);
  const [identityFile, setIdentityFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [addressFile, setAddressFile] = useState<File | null>(null);
  const [selectKey, setSelectKey] = useState(0);
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<KycType>({
    resolver: zodResolver(zodValidator("kyc")!),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const name = watch("name");
  const dob = watch("dob");
  const city = watch("city");
  const nationality = watch("nationality");
  const address = watch("address");
  const postalCode = watch("postalCode");
  const documentType = watch("documentType");

  const {
    data: kyc,
    //isLoading: loading,
    error: queryError,
  } = useQuery<Kyc[], Error>({
    queryKey: ["kyc"],
    queryFn: async () => {
      const { data: responseData, error } = await callApi<ApiResponse<Kyc[]>>(
        "/kyc/find"
      );
      if (error) {
        throw new Error(
          error.message || "Something went wrong while fetching kyc details."
        );
      }
      if (!responseData?.data) {
        throw new Error("No kyc details found");
      }
      //   toast.success("Referrals Fetched", {
      //     description: "Successfully fetched referrals.",
      //   });
      return responseData.data;
    },
  });

  useEffect(() => {
    if (queryError) {
      //   const errorMessage =
      //     queryError.message ||
      //     "An unexpected error occurred while fetching referrals.";
      //setError(errorMessage);
      //   toast.error("Failed to Kyc", {
      //     description: errorMessage,
      //   });
    }
  }, [queryError]);

  const onSubmit: SubmitHandler<KycType> = async (data: KycType) => {
    try {
      const formData = new FormData();
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("dob", data.dob);
      formData.append("document", data.document);
      formData.append("documentType", data.documentType);
      formData.append("name", data.name);
      formData.append("nationality", data.nationality);
      formData.append("postalCode", data.postalCode);
      formData.append("selfie", data.selfie);
      formData.append("proofOfAddress", data.proofOfAddress);

      const { data: responseData, error } = await callApi<ApiResponse<KycData>>(
        "/kyc/create",
        formData
      );

      if (error) {
        throw new Error(error.message);
      }

      if (responseData?.status === "success") {
        toast.success("KYC Submitted", {
          description: "Your kyc details has been submitted successfully.",
        });
      }
      setStep(4);
    } catch (err) {
      setStep(1);
      toast.error("KYC Upload Failed", {
        description:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setSelectKey((prev) => prev + 1);
      reset();
      setIdentityFile(null);
      setSelfieFile(null);
      setAddressFile(null);
    }
  };

  const updateDob = (d: string, m: string, y: string) => {
    if (d && m && y) {
      const formattedDob = `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
      setValue("dob", formattedDob, { shouldValidate: true });
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     //setIsSubmitting(true);

  //     // Simulate API call
  //     setTimeout(() => {
  //       //setIsSubmitting(false);
  //       setStep(4);
  //       //   toast({
  //       //     title: "KYC documents submitted",
  //       //     description: "Your documents have been submitted for review.",
  //       //   });
  //     }, 2000);
  //   };

  //   const handleFileUpload = (
  //     event: React.ChangeEvent<HTMLInputElement>,
  //     setFile: (file: File | null) => void
  //   ) => {
  //     const files = event.target.files;
  //     if (files && files.length > 0) {
  //       setFile(files[0]);
  //     }
  //   };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("document", file, { shouldValidate: true });
      setIdentityFile(file);
    }
  };

  const handleSelfieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("selfie", file, { shouldValidate: true });
      setSelfieFile(file);
    }
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("proofOfAddress", file, { shouldValidate: true });
      setAddressFile(file);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">KYC Verification</h1>
      </div>

      <Card className="mb-6">
        {kyc &&
        (kyc[0]?.status === "pending" || kyc[0]?.status === "rejected") ? (
          <div className="text-center py-8 px-8">
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
                Typical verification time: 1-3 business days
              </span>
            </div>
          </div>
        ) : kyc && kyc[0]?.status === "approved" ? (
          <div className="text-center py-8 px-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Verification Approved</h3>
            <p className="text-sm text-gray-500 mb-6">
              Congratulations! Your identity verification has been successfully
              completed. You now have full access to all features of Millennia
              Trades.
            </p>
            <div className="flex items-center justify-center space-x-3 text-sm bg-green-50 p-3 rounded-lg">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-green-700">
                Your account is now fully verified and active.
              </span>
            </div>
          </div>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Identity Verification</CardTitle>
              <CardDescription>
                Complete the verification process to unlock all features in
                Millennia Trades
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

              <form onSubmit={handleSubmit(onSubmit)}>
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
                            To comply with financial regulations and protect
                            your account, we need to verify your identity. This
                            process is secure and your data is protected.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Full Legal Name
                        </label>
                        <Input
                          {...register("name")}
                          type="text"
                          autoFocus
                          id="name"
                          aria-label="name"
                          placeholder="As it appears on your ID document"
                          className={`text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm ${
                            errors.name && "border-red-500 ring-2 ring-red-500"
                          }`}
                        />
                        {errors.name && (
                          <FormErrorMessage
                            error={errors.name}
                            errorMsg={errors.name.message}
                          />
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Date of Birth
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {/* Day */}
                          <Select
                            onValueChange={(value) => {
                              setDay(value);
                              updateDob(value, month, year);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Day" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 31 }, (_, i) => i + 1).map(
                                (d) => (
                                  <SelectItem key={d} value={d.toString()}>
                                    {d}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>

                          {/* Month */}
                          <Select
                            onValueChange={(value) => {
                              setMonth(value);
                              updateDob(day, value, year);
                            }}
                          >
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
                              ].map((monthName, index) => (
                                <SelectItem
                                  key={monthName}
                                  value={(index + 1).toString()}
                                >
                                  {monthName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {/* Year */}
                          <Select
                            onValueChange={(value) => {
                              setYear(value);
                              updateDob(day, month, value);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from(
                                { length: 100 },
                                (_, i) => new Date().getFullYear() - i - 18
                              ).map((y) => (
                                <SelectItem key={y} value={y.toString()}>
                                  {y}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Nationality
                        </label>

                        <Input
                          {...register("nationality")}
                          type="text"
                          //autoFocus
                          id="nationality"
                          aria-label="nationality"
                          placeholder="Select your nationality"
                          className={`text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm ${
                            errors.nationality &&
                            "border-red-500 ring-2 ring-red-500"
                          }`}
                        />
                        {errors.nationality && (
                          <FormErrorMessage
                            error={errors.nationality}
                            errorMsg={errors.nationality.message}
                          />
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Address</label>
                        <Input
                          {...register("address")}
                          type="text"
                          //autoFocus
                          id="address"
                          aria-label="address"
                          placeholder="Street address"
                          className={`text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm ${
                            errors.address &&
                            "border-red-500 ring-2 ring-red-500"
                          }`}
                        />
                        {errors.address && (
                          <FormErrorMessage
                            error={errors.address}
                            errorMsg={errors.address.message}
                          />
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">City</label>
                          <Input
                            {...register("city")}
                            type="text"
                            //autoFocus
                            id="city"
                            aria-label="city"
                            placeholder="City"
                            className={`text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm ${
                              errors.city &&
                              "border-red-500 ring-2 ring-red-500"
                            }`}
                          />
                          {errors.city && (
                            <FormErrorMessage
                              error={errors.city}
                              errorMsg={errors.city.message}
                            />
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Postal Code
                          </label>
                          <Input
                            {...register("postalCode")}
                            type="text"
                            //autoFocus
                            id="postalCode"
                            aria-label="postalCode"
                            placeholder="Postal/ZIP code"
                            className={`text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm ${
                              errors.postalCode &&
                              "border-red-500 ring-2 ring-red-500"
                            }`}
                          />
                          {errors.postalCode && (
                            <FormErrorMessage
                              error={errors.postalCode}
                              errorMsg={errors.postalCode.message}
                            />
                          )}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <Button
                          disabled={
                            !name ||
                            !city ||
                            !nationality ||
                            !postalCode ||
                            !address ||
                            !dob
                          }
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
                      <h3 className="text-lg font-medium mb-2">
                        Identity Document
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Please upload a clear photo or scan of your
                        government-issued ID
                      </p>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Document Type
                          </label>
                          <Select
                            key={selectKey}
                            onValueChange={(value) =>
                              setValue("documentType", value, {
                                shouldValidate: true,
                              })
                            }
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
                              accept="image/jpeg,image/jpg,image/png,application/pdf"
                              onChange={handleDocumentChange}
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
                          <label className="text-sm font-medium">
                            Take a Selfie
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                              type="file"
                              id="selfie"
                              className="hidden"
                              accept="image/jpeg,image/png,image/jpeg,"
                              onChange={handleSelfieChange}
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
                          <ChevronDown className="mr-1 h-4 w-4 rotate-90" />{" "}
                          Previous Step
                        </Button>
                        <Button
                          onClick={handleNext}
                          disabled={
                            !identityFile || !selfieFile || !documentType
                          }
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
                      <h3 className="text-lg font-medium mb-2">
                        Proof of Address
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Please upload a document showing your current
                        residential address (utility bill, bank statement, etc.)
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
                              onChange={handleAddressChange}
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
                            type="submit"
                            disabled={!addressFile || isSubmitting}
                            className="bg-invest hover:bg-invest-secondary"
                          >
                            {isSubmitting
                              ? "Submitting..."
                              : "Submit Verification"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
}
