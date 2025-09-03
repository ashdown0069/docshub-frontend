"use server";
import { axiosInstance__GuestUser } from "@/lib/axios";
import * as jose from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export type Session = {
  user: {
    id: string;
    nickname: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
};

interface tokenPayload {
  email: string;
  nickname: string;
  sub: string;
  plan: "free" | "team" | "enterprise";
  iat: number;
  exp: number;
}
const secretKey = "thisismyprojectkey"; //replace to env secretKey
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(accessToken: string, refreshToken: string) {
  if (!accessToken || !refreshToken) return null;

  const { payload } = await jose.jwtVerify<tokenPayload>(
    accessToken,
    encodedKey,
  );

  const cookiesStore = cookies();
  cookiesStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    expires: new Date(payload.exp * 1000),
    path: "/",
  });

  cookiesStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일 후 만료
    path: "/",
  });
}
export async function getSession(retryCount = 0) {
  const MAX_RETRIES = 2;
  const cookiesStore = cookies();

  try {
    const Token = cookiesStore.get("accessToken")?.value;
    if (!Token) throw new Error("No access token");

    const { payload } = await jose.jwtVerify<tokenPayload>(Token, encodedKey);
    return {
      id: payload.sub,
      nickname: payload.nickname,
      email: payload.email,
      plan: payload.plan,
    };
  } catch (error) {
    if (retryCount >= MAX_RETRIES) {
      return redirect("/login");
    }

    try {
      const refreshToken = cookiesStore.get("refreshToken")?.value;
      if (!refreshToken) throw new Error("No refresh token");

      const newAccessToken = await regenAccessToken(refreshToken);
      const result = await updateSession(newAccessToken);

      if (!result) return redirect("/login");
      return getSession(retryCount + 1);
    } catch {
      return redirect("/login");
    }
  }
}

export async function regenAccessToken(refreshToken: string) {
  try {
    const res = await axiosInstance__GuestUser.post(
      "/auth/refresh",
      {
        refresh_token: refreshToken,
      },
      {},
    );
    return res.data.access_token;
  } catch (error) {
    return redirect("/login");
  }
}
export async function deleteSession() {
  const cookiesStore = cookies();
  cookiesStore.delete("accessToken");
  cookiesStore.delete("refreshToken");
  return true;
}

export const getToken = async () => {
  const cookieStore = cookies();
  try {
    return {
      accessToken: cookieStore.get("accessToken")?.value,
      refreshToken: cookieStore.get("refreshToken")?.value,
    };
  } catch {
    return null;
  }
};

export async function updateSession(accessToken: string) {
  if (!accessToken) return null;

  try {
    const { payload } = await jose.jwtVerify<tokenPayload>(
      accessToken,
      encodedKey,
    );

    const cookiesStore = cookies();
    cookiesStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(payload.exp * 1000),
      path: "/",
    });
    return true;
  } catch (error) {
    return false;
  }
}
