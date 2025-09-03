"use client";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export const DestructiveButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & {
    className?: string;
    TextType: "cancel" | "delete";
    isLoading?: boolean;
  }
>(({ className, TextType, ...props }, ref) => {
  const t = useTranslations("Button");
  return (
    <Button
      ref={ref}
      className={cn("px-8", className)}
      variant="destructive"
      type="button"
      {...props}
    >
      {t(`${TextType}`) ?? "Cancel"}
    </Button>
  );
});

DestructiveButton.displayName = "DestructiveButton";

export const ConfirmButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & {
    className?: string;
    TextType: "create" | "confirm";
  }
>(({ className, TextType, ...props }, ref) => {
  const t = useTranslations("Button");
  return (
    <Button
      ref={ref}
      className={cn(
        "bg-brand-300 px-8 hover:bg-brand-300 hover:brightness-105",
        className,
      )}
      variant="default"
      type="submit"
      {...props}
    >
      {t(TextType) ?? "Confirm"}
    </Button>
  );
});

ConfirmButton.displayName = "ConfirmButton";
