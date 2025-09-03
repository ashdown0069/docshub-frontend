"use client";

import { UseFormReturn } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../ui/input";
import { DialogClose } from "../../ui/dialog";
import { ConfirmButton, DestructiveButton } from "../../Button/Button";
import { useTranslations } from "next-intl";
import { CreateWorkspaceFormTypes } from "./CreateWorkspaceSchema";

interface CreateWorkspaceFormProps {
  form: UseFormReturn<CreateWorkspaceFormTypes>;
  onSubmit: (values: CreateWorkspaceFormTypes) => Promise<void>;
  isLoading: boolean;
}

export function CreateWorkspaceForm({
  form,
  isLoading,
  onSubmit,
}: CreateWorkspaceFormProps) {
  const t = useTranslations("Lobby");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="body-2">{t("create.name")}</FormLabel>
              <FormControl>
                <Input className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="body-2">
                {t("create.description")}
              </FormLabel>
              <FormControl>
                <Input className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="body-2">{t("create.password")}</FormLabel>
              <FormControl>
                <Input className="" type={"password"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="body-2">{t("create.confirm")}</FormLabel>
              <FormControl>
                <Input className="" type={"password"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="downloadRecord"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="body-2">Record</FormLabel>
              <FormControl>
                <div className="items-top flex space-x-2">
                  <Checkbox
                    disabled={plan === "free"}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="terms1"
                  />
                  <div className="grid gap-3 leading-none">
                    <label
                      htmlFor="terms1"
                      className={cn(
                        "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                        plan === "free" && "line-through",
                      )}
                    >
                      You agree to allow download activity to be recorded.
                    </label>
                    {plan === "free" && (
                      <p className="text-[12px] text-error">
                        This option is not available on the free plan.
                      </p>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <div className="flex grow gap-3 md:justify-end">
          <DialogClose asChild>
            <DestructiveButton TextType="cancel" />
          </DialogClose>
          <ConfirmButton TextType="create" disabled={isLoading} type="submit" />
        </div>
      </form>
    </Form>
  );
}
