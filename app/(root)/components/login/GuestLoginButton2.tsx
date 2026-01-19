"use client";
import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { useLogIn } from "@/app/(root)/services/user/logInUserService";
export const GuestLoginButton2 = () => {
  const router = useRouter();
  const logInMutation = useLogIn();
  const handleGuestLogin = async () => {
    logInMutation.mutate(
      {
        email: "test22@test.com",
        password: "123123123",
      },
      {
        onSuccess(data, variables, context) {
          router.push("/lobby");
        },
        onError(error, variables, context) {},
      },
    );
  };
  return (
    <div className="flex items-center">
      <Button onClick={handleGuestLogin} className="w-full" type="submit">
        <CircleUser color="#ffffff" />
        <p>Guest2 Log-in for Testing</p>
      </Button>
    </div>
  );
};
