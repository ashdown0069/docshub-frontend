"use client";
import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useLogIn } from "@/app/(root)/services/user/logInUserService";
export const GuestLoginButton = () => {
  const router = useRouter();
  const logInMutation = useLogIn();
  const handleGuestLogin = async () => {
    logInMutation.mutate(
      {
        email: "test@test.com",
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
      <Button onClick={handleGuestLogin} type="submit" className="w-full">
        <CircleUser color="#ffffff" />
        <p>Guest Log-in for Testing</p>
      </Button>
    </div>
  );
};
