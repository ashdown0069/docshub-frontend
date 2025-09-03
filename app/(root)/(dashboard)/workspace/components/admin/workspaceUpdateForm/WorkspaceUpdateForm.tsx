"use client";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { WorkspaceUpdateFormType } from "./WorkspaceUpdateFormSchema";
import { ConfirmButton } from "@/components/Button/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface WorkspaceUpdateFormProps {
  form: UseFormReturn<WorkspaceUpdateFormType>;
  onSubmit: (values: WorkspaceUpdateFormType) => Promise<void>;
  plan: "free" | "team" | "enterprise";
  t: (key: string) => string;
}

export default function WorkspaceUpdateForm({
  form,
  onSubmit,
  plan,
  t,
}: WorkspaceUpdateFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace Name</FormLabel>
              <FormControl>
                <Input className="max-w-[400px]" {...field} />
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
              <FormLabel>Workspace Description</FormLabel>
              <FormControl>
                <Input className="max-w-[400px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace Password</FormLabel>
              <FormControl>
                <Input className="max-w-[400px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
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
                      {t("record.description")}
                    </label>
                    {plan === "free" && (
                      <p className="text-[12px] text-error">
                        {t("record.notAvailable")}
                      </p>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mr-3 flex justify-end">
          <ConfirmButton type="submit" TextType="confirm" />
        </div>
      </form>
    </Form>
  );
}
