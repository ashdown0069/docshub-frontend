"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { setLocale } from "@/i18n/request";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function LanguageSelector({ savedLocale }: { savedLocale: string }) {
  const [position, setPosition] = useState(savedLocale);
  const { theme } = useTheme();
  const [color, setColor] = useState("#000000");
  useEffect(() => {
    if (theme == "dark") setColor("#ffffff");
    else setColor("#000000");
  }, [theme]);
  const handleLanguageChange = async (locale: string) => {
    setPosition(locale);
    await setLocale(locale as "en" | "ko");
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Languages color={color} size={32} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={handleLanguageChange}
        >
          <DropdownMenuRadioItem defaultChecked value="ko">
            한국어
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
