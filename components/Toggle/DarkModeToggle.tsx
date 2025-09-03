"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";
export function DarkModeToggle() {
  const { setTheme, theme } = useTheme();
  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <Toggle className="size-10" onClick={toggleDarkMode}>
      <Sun className="size-10 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-10 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Toggle>
  );
}
