"use client";

import { useDeferredValue, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { User, Shield } from "lucide-react";
import { EyeOff, EyeClosed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/store/useSession";
import {
  checkPasswordStrength,
  ResetPasswordType,
  UpdateProfileType,
  zodValidator,
} from "@/lib/validators/validateWithZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ApiResponse, SessionData } from "@/interfaces/ApiResponse";
import { callApi } from "@/lib/helpers";
import { CameraIcon } from "./common/svg";
import { FormErrorMessage } from "./common";

export default function DashboardAccount() {
  const {
    user,
    actions: { updateUser },
  } = useSession((state) => state);
  const [profileImage, setProfileImage] = useState(user && user[0].photo);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    email: user ? user[0].email : "",
    firstName: user ? user[0].firstName : "",
    lastName: user ? user[0].lastName : "",
    photo: undefined,
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileType>({
    resolver: zodResolver(zodValidator("updateProfile")!),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: initialValues,
  });

  const {
    handleSubmit: handleSubmit2,
    register: register2,
    watch: watch2,
    reset: reset2,
    formState: { errors: errors2, isSubmitting: isSubmitting2 },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(zodValidator("resetPassword")!),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (user && user[0]) {
      setProfileImage(user[0].photo || "");
      reset({
        email: user ? user[0].email : "",
        firstName: user ? user[0].firstName : "",
        lastName: user ? user[0].lastName : "",
        photo: undefined,
      });
    }
  }, [user, reset]);

  const formValues = watch();
  const hasChanges = () => {
    const { email, firstName, lastName, photo } = formValues;

    const textFieldsChanged =
      (email || "") !== (initialValues.email || "") ||
      (firstName || "") !== (initialValues.firstName || "") ||
      (lastName || "") !== (initialValues.lastName || "");
    const photoChanged = photo instanceof File;

    return textFieldsChanged || photoChanged;
  };

  const password = watch2("password", "");
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const deferredPassword = useDeferredValue(password);

  useEffect(() => {
    const checkStrength = async () => {
      if (deferredPassword) {
        const strength = await checkPasswordStrength(deferredPassword);
        setPasswordStrength(strength);
      }
    };
    checkStrength().catch(() => {
      // Silently ignore errors (e.g., if checkPasswordStrength fails)
    });
  }, [deferredPassword]);

  const onSubmit: SubmitHandler<UpdateProfileType> = async (
    data: UpdateProfileType
  ) => {
    try {
      setIsLoading(true);

      const profileUpdates = {
        email: data.email || undefined,
        firstName: data.firstName || undefined,
        lastName: data.lastName || undefined,
      };

      const filteredUpdates = Object.fromEntries(
        Object.entries(profileUpdates).filter(
          ([, value]) => value !== undefined && value !== ""
        )
      );

      let profileUpdated = false;
      let photoUpdated = false;

      if (Object.keys(filteredUpdates).length > 0) {
        const { data: responseData, error } = await callApi<
          ApiResponse<SessionData>
        >("/user/update-user", filteredUpdates);

        if (error) {
          throw new Error(error.message);
        }

        if (responseData?.status === "success") {
          toast.success("Profile Updated", {
            description: "Your profile has been updated successfully.",
          });
          profileUpdated = true;
        }

        if (responseData?.data) {
          updateUser({ user: responseData.data[0] });
        }
      }

      if (data.photo instanceof File) {
        const photoFormData = new FormData();
        photoFormData.append("photo", data.photo);

        const { data: photoResponse, error: photoError } = await callApi<
          ApiResponse<SessionData>
        >("/user/upload-profile-picture", photoFormData);

        if (photoError) {
          throw new Error(photoError.message);
        }

        if (photoResponse?.status === "success") {
          toast.success("Profile Photo Updated", {
            description: "Your profile photo has been updated successfully.",
          });
          photoUpdated = true;
        }

        if (photoResponse?.data) {
          updateUser({ user: photoResponse.data[0] });
          setProfileImage(photoResponse.data[0].photo ?? profileImage);
        }
      }

      if (profileUpdated || photoUpdated) {
        reset();
      }
    } catch (err) {
      toast.error("Profile Update Failed", {
        description:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit2 = async (data: ResetPasswordType) => {
    const { data: responseData, error } = await callApi<ApiResponse>(
      "/auth/password/change",
      {
        password: data.password,
        confirmPassword: data.confirmPassword,
      }
    );

    if (error) {
      toast.error("Error", {
        description: error.message,
        duration: 3000,
      });
    } else {
      toast.success("Success", {
        description: responseData?.message || "Password reset successful!",
      });
      reset2();
      //router.push('/reset-password/success');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setValue("photo", file, { shouldValidate: true });
    } else {
      setProfileImage(user && user[0].photo);
      setValue("photo", undefined, { shouldValidate: true });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6 mt-16 lg:mt-0">
        <h1 className="text-2xl font-bold">Account Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full max-w-md mb-6">
          <TabsTrigger value="profile" className="flex-1">
            <User className="h-4 w-4 mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex-1">
            <Shield className="h-4 w-4 mr-2" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6 flex items-center">
                  {/* <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-2xl font-medium text-gray-600 mr-6">
                    {firstName?.[0]}
                    {lastName?.[0]}
                  </div> */}

                  <label
                    htmlFor="profileUpload"
                    className="relative cursor-pointer mr-6"
                  >
                    <Avatar className="w-24 h-24 border">
                      <AvatarImage
                        src={profileImage || ""}
                        className="object-cover w-full h-full"
                      />
                      <AvatarFallback>
                        {user && user[0]
                          ? `${user[0].firstName?.[0] || ""}${
                              user[0].lastName?.[0] || ""
                            }`.toUpperCase()
                          : ""}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 bg-[#F8F8F8] p-1 rounded-full">
                      <CameraIcon className="text-black w-5 h-5" />
                    </span>
                  </label>
                  <input
                    type="file"
                    id="profileUpload"
                    accept="image/*"
                    {...register("photo", {
                      onChange: (e) => handleImageChange(e),
                    })}
                    className="hidden"
                  />

                  <div>
                    <h3 className="text-lg font-medium">
                      {user && user[0].firstName} {user && user[0].lastName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {user && user[0].email}
                    </p>

                    <div className="mt-1">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700"
                      >
                        Investor
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator className="mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <Input
                      {...register("firstName")}
                      type="text"
                      autoFocus
                      id="firstName"
                      aria-label="First Name"
                      placeholder="First Name"
                      className={`text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm ${
                        errors.firstName && "border-red-500 ring-2 ring-red-500"
                      }`}
                    />
                    {errors.firstName && (
                      <FormErrorMessage
                        error={errors.firstName}
                        errorMsg={errors.firstName.message}
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <Input
                      {...register("lastName")}
                      type="text"
                      id="lastName"
                      aria-label="Last Name"
                      placeholder="Last Name"
                      className={`text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm ${
                        errors.lastName && "border-red-500 ring-2 ring-red-500"
                      }`}
                    />
                    {errors.lastName && (
                      <FormErrorMessage
                        error={errors.lastName}
                        errorMsg={errors.lastName.message}
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Input
                    {...register("email")}
                    type="email"
                    id="email"
                    aria-label="Email"
                    placeholder="Email Address"
                    className={`text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm ${
                      errors.email && "border-red-500 ring-2 ring-red-500"
                    }`}
                  />
                  {errors.email && (
                    <FormErrorMessage
                      error={errors.email}
                      errorMsg={errors.email.message}
                    />
                  )}
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting || isLoading || !hasChanges()}
                    className="bg-invest hover:bg-invest-secondary"
                  >
                    {isSubmitting ? "Updating..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="w-full md:w-[70%]">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit2(onSubmit2)} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      New Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        {...register2("password")}
                        className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm ${
                          errors2.password &&
                          "border-red-500 ring-2 ring-red-500"
                        }`}
                        placeholder="Create a new password"
                        type={showPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <EyeClosed className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {password.length > 0 && (
                      <FormErrorMessage
                        isForPasswordStrength
                        result={passwordStrength}
                      />
                    )}
                    {errors2.password?.message && (
                      <FormErrorMessage
                        error={errors2}
                        errorMsg={errors2.password.message}
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-700"
                    >
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        {...register2("confirmPassword")}
                        className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm ${
                          errors2.confirmPassword &&
                          "ring-2 border-red-500 ring-red-500"
                        }`}
                        placeholder="Re-enter password"
                        type={showConfirmPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <EyeClosed className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors2.confirmPassword?.message && (
                      <FormErrorMessage
                        error={errors2}
                        errorMsg={errors2.confirmPassword.message}
                      />
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-invest hover:bg-invest-secondary"
                    disabled={isSubmitting2}
                  >
                    {isSubmitting2 ? "Updating..." : "Change Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
