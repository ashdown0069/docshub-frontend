import {
  deleteSession,
  getToken,
  regenAccessToken,
  updateSession,
} from "@/auth/auth-session";
import { getLocale } from "@/i18n/request";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export interface customAxiosError
  extends AxiosError<{
    key: string;
    message: string;
    field?: string;
  }> {}
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL,
  timeout: 7000,
  withCredentials: true,
  // headers: {
  //   "Access-Control-Expose-Headers": "Content-Disposition",
  // },
});

export const axiosInstance__GuestUser = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  // maxRedirects: 2,
});
//요청 인터셉터
axiosInstance.interceptors.request.use(
  async (config) => {
    const tokens = await getToken();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token || "");
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 재시도한 요청이 아닐 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 토큰 갱신 중이면, 새로운 토큰을 기다리는 Promise를 반환
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = "Bearer " + token;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const tokens = await getToken();
        if (!tokens?.refreshToken) throw new Error("No refresh token");

        const newAccessToken = await regenAccessToken(tokens.refreshToken);
        await updateSession(newAccessToken);

        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;

        processQueue(null, newAccessToken);
        return axiosInstance(originalRequest);
      } catch (e: any) {
        processQueue(e, null);
        if (typeof window !== "undefined") {
          await deleteSession();
          window.location.href = "/login";
        }
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    // 403 에러 처리
    if (error.response?.status === 403) {
      if (typeof window !== "undefined") {
        const locale = await getLocale();
        toast.error(
          `${locale == "ko" ? "권한이 없습니다." : "You don't have permission."}`,
        );
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
