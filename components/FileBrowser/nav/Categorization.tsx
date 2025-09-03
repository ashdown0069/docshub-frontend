import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export function Categorization() {
  const t = useTranslations("Browser");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="body-2 flex items-center gap-2 rounded-md border bg-white px-2 py-1">
        <div>{t("type")}</div>
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem>PDF</DropdownMenuItem>
        <DropdownMenuItem>EXCEL</DropdownMenuItem>
        <DropdownMenuItem>WORD</DropdownMenuItem>
        <DropdownMenuItem>PPT</DropdownMenuItem>
        <DropdownMenuItem>TEXT</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
