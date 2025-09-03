import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { createSession } from "@/auth/auth-session";
import axiosInstance from "@/lib/axios";
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      {
        success: false,
        message: "email or password is missing",
      },
      { status: 400 },
    );
  }

  try {
    const res = await axiosInstance.post(`/auth/login`, {
      email: email,
      password: password,
    });

    const accessToken = res.data.access_token;
    const refreshToken = res.data.refresh_token;

    await createSession(accessToken, refreshToken);
    return NextResponse.json("success");
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error,
        test: "nextjs route error",
      },
      { status: error.status },
    );
  }
}
