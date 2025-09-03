import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function formatCreatedAt(
//   createdAt: string,
//   locale: "ko" | "en",
// ): string {
//   const [year, month, day] = createdAt.slice(0, 10).split("-");
//   if ((locale = "ko")) return `${year}-${month}-${day}`;
//   else if ((locale = "en")) return `${month}-${day}-${year}`;
//   return "Error";
// }

export function formatCreatedAt(
  createAt: string,
  locale: "ko" | "en" = "ko",
  showTime: boolean = false,
) {
  const date = new Date(createAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (locale === "ko") {
    return showTime
      ? `${year}-${month}-${day} ${hours}:${minutes}`
      : `${year}-${month}-${day}`;
  } else if (locale === "en") {
    return showTime
      ? `${month}-${day}-${year} ${hours}:${minutes}`
      : `${month}-${day}-${year}`;
  }
  return "Error";
}

export function timeSinceUpdatedAt(
  updatedAt: string,
  locale: "ko" | "en",
): string {
  const updatedDate = new Date(updatedAt);
  const now = new Date();
  const diffMs = now.getTime() - updatedDate.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  if (locale == "ko") {
    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    return `${minutes}분 전`;
  } else if (locale == "en") {
    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    return `${minutes}분 전`;
  }

  return "Error";
}

/**
 * @description 1024 * 1024 * 1024 = 1gb
 * @example calStoragePercentage(1024 * 1024 * 1024, "free")
 */
export function calStoragePercentage(
  currentSizeInBytes: number,
  maximumSizeInBytes: number,
) {
  const percentage = (currentSizeInBytes / maximumSizeInBytes) * 100;
  return Number(percentage.toFixed(2));
}

/**
 * @example 1024 * 1024 * 1024 = 1gb
 */
// export const convertFileSize = (
//   currentSizeInBytes: number,
//   digits?: number,
// ) => {
//   if (currentSizeInBytes < 1024) {
//     return currentSizeInBytes + " Bytes"; // Less than 1 KB, show in Bytes
//   } else if (currentSizeInBytes < 1024 * 1024) {
//     const sizeInKB = currentSizeInBytes / 1024;
//     return sizeInKB.toFixed(digits || 1) + " KB"; // Less than 1 MB, show in KB
//   } else if (currentSizeInBytes < 1024 * 1024 * 1024) {
//     const sizeInMB = currentSizeInBytes / (1024 * 1024);
//     return sizeInMB.toFixed(digits || 1) + " MB"; // Less than 1 GB, show in MB
//   } else {
//     const sizeInGB = currentSizeInBytes / (1024 * 1024 * 1024);
//     return sizeInGB.toFixed(digits || 1) + " GB"; // 1 GB or more, show in GB
//   }
// };
// export const convertFileSize = (sizeInBytes: number, digits?: number) => {
//   if (sizeInBytes < 1024) {
//     return sizeInBytes + " Bytes"; // Less than 1 KB, show in Bytes
//   } else if (sizeInBytes < 1024 * 1024) {
//     const sizeInKB = sizeInBytes / 1024;
//     return sizeInKB.toFixed(digits || 1) + " KB"; // Less than 1 MB, show in KB
//   } else if (sizeInBytes < 1024 * 1024 * 1024) {
//     const sizeInMB = sizeInBytes / (1024 * 1024);
//     return sizeInMB.toFixed(digits || 1) + " MB"; // Less than 1 GB, show in MB
//   } else {
//     const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
//     return sizeInGB.toFixed(digits || 1) + " GB"; // 1 GB or more, show in GB
//   }
// };

export const convertFileSize = (sizeInBytes: number, digits?: number) => {
  const GB = 1024 * 1024 * 1024;
  const MB = 1024 * 1024;
  const KB = 1024;

  if (sizeInBytes >= GB) {
    const sizeInGB = sizeInBytes / GB;
    return sizeInGB.toFixed(digits || 1) + " GB";
  } else if (sizeInBytes >= MB) {
    const sizeInMB = sizeInBytes / MB;
    return sizeInMB.toFixed(digits || 1) + " MB";
  } else {
    const sizeInKB = sizeInBytes / KB;
    return sizeInKB.toFixed(digits || 1) + " KB";
  }
};

export function convertStorageSizeTextByPlan(
  plan: "free" | "team" | "enterprise",
) {
  switch (plan) {
    case "free":
      return "1GB"; // 1GB in bytes 1 * 1024 * 1024 * 1024
    case "team":
      return "100GB"; // 500GB in bytes 500 * 1024 * 1024 * 1024
    case "enterprise":
      return "1TB"; // 1TB in bytes 5000 * 1024 * 1024 * 1024
    default:
      return "1GB"; // Default
  }
}

// 삭제된 파일의 복구 가능 기간 계산 함수
export function calculateRestorePeriod(
  isDeleted: string,
  plan: "free" | "team" | "enterprise" = "free", // 기본값은 free로 설정
): string {
  // 삭제된 날짜 객체 생성
  const deletedDate = new Date(isDeleted);

  // 플랜별 복원 가능 일수 설정
  const restoreDays = {
    free: 30,
    team: 180,
    enterprise: 365,
  };

  // 플랜에 따른 복원 기간 계산
  const days = restoreDays[plan];

  // 복원 만료일 계산
  const expiryDate = new Date(deletedDate);
  expiryDate.setDate(deletedDate.getDate() + days);

  // 만료일 포맷팅 (YYYY-MM-DD)
  const formattedExpiry = expiryDate.toISOString().split("T")[0];

  // 오늘 날짜
  const today = new Date();

  // 남은 일수 계산
  const remainingDays = Math.ceil(
    (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  // 이미 만료된 경우
  if (remainingDays <= 0) {
    return "만료됨";
  }

  // 만료일과 남은 일수 표시
  return `${formattedExpiry} (${remainingDays}일 남음)`;
}
