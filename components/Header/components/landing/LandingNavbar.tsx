import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { LandingPageNavigation } from "@/constant";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { toast } from "sonner";

export const LandingNavbar = () => {
  const t = useTranslations("LandingPage");
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {LandingPageNavigation.map((item) => (
          <NavigationMenuItem key={item.id}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                onClick={() => {
                  toast.message(
                    "지원하지 않는 기능입니다. 로그인 페이지로 이동합니다",
                  );
                }}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "nav-btn-hover-effect flex items-center bg-transparent pb-1 text-base text-black hover:bg-transparent hover:text-point focus:bg-transparent",
                )}
              >
                {t(item.title)}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
