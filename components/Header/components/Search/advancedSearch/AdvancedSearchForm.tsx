import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import React from "react";
import { AdvancedSearchType } from "./AdvancedSearchSchema";
import { UseFormReturn } from "react-hook-form";
import { DialogClose } from "@/components/ui/dialog";
import { ConfirmButton, DestructiveButton } from "@/components/Button/Button";
import { Input } from "@/components/ui/input";

const items = [
  {
    id: "txt",
    label: ".txt",
  },
  {
    id: "pdf",
    label: ".pdf",
  },
  {
    id: "docx",
    label: ".docx",
  },
  {
    id: "pptx",
    label: ".pptx",
  },
  {
    id: "xlsx",
    label: ".xlsx",
  },
] as const;

interface AdvancedSearchFormProps {
  form: UseFormReturn<AdvancedSearchType>;
  onSubmit: (values: AdvancedSearchType) => Promise<void>;
  isLoading: boolean;
}
export default function AdvancedSearchForm({
  form,
  onSubmit,
  isLoading,
}: AdvancedSearchFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fileName"
          render={({ field }) => (
            <FormItem className="">
              <div className="mb-4">
                <FormLabel className="text-base">File Name</FormLabel>
              </div>
              <FormControl>
                <Input className="border-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contents"
          render={({ field }) => (
            <FormItem className="">
              <div className="mb-4">
                <FormLabel className="text-base">Include these words</FormLabel>
              </div>
              <FormControl>
                <Input className="border-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="extension"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">File Type</FormLabel>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="extension"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-center gap-2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id) ?? false}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...(field.value || []),
                                      item.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="!m-0 text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-5 flex justify-end gap-2">
          <DialogClose asChild>
            <DestructiveButton
              disabled={isLoading}
              TextType="cancel"
              type="button"
            />
          </DialogClose>
          <ConfirmButton
            disabled={isLoading}
            TextType="confirm"
            type="submit"
          />
        </div>
      </form>
    </Form>
  );
}
