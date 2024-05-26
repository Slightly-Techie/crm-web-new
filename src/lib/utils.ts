import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeElapsedOrDate(dateString: string): string {
  const now: Date = new Date();
  const date: Date = new Date(dateString);

  const timeDiff: number = now.getTime() - date.getTime();
  const secondsDiff: number = Math.abs(Math.floor(timeDiff / 1000));
  const minutesDiff: number = Math.abs(Math.floor(timeDiff / (1000 * 60)));
  const hoursDiff: number = Math.abs(Math.floor(timeDiff / (1000 * 60 * 60)));

  if (secondsDiff < 60) {
    return `${secondsDiff}s`;
  } else if (minutesDiff < 60) {
    return `${minutesDiff}m`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff}h`;
  } else {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }
}


export const logToConsole = (message?: any, ...optionalParams: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(message, ...optionalParams);
  }
};

export function getAccountUserName(
  link: string | null | undefined
): string | null {
  try {
    if (typeof link === "string") {
      const url = new URL(link);
      const pathParts = url.pathname.split("/");
      if (pathParts.length > 1) {
        return pathParts[1];
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}


export function getSkillsArray(inputValue: string | string[] | undefined) {
  let skillsArray: string[] = [];
  if (inputValue) {
    const result = Array.isArray(inputValue)
      ? inputValue.join(",")
      : inputValue;
    for (let value of result.split(",")) {
      const format = value.trim();
      if (!format.length) continue;
      else {
        skillsArray = [...skillsArray, format];
      }
    }
    return skillsArray;
  }
  return [];
}

