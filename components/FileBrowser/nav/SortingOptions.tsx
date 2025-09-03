import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFileBrowser } from "@/store/useFileBrowser";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";

export function ASC() {
  const t = useTranslations("Browser.sort");
  const { setSortOptions } = useFileBrowser();
  const handleSortAsc = () => {
    setSortOptions("ASC");
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={handleSortAsc}
            variant={"outline"}
            asChild
            className="cursor-pointer p-2"
          >
            <ArrowUp size={40} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("asc")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function DESC() {
  const { setSortOptions } = useFileBrowser();
  const t = useTranslations("Browser.sort");
  const handleSortDesc = () => {
    setSortOptions("DESC");
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={handleSortDesc}
            variant={"outline"}
            asChild
            className="cursor-pointer p-2"
          >
            <ArrowDown size={40} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("desc")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
