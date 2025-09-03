import React from "react";
import { UseFormReturn } from "react-hook-form";
import { AnnouncementFormType } from "./AnnouncementSchema";
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
import { Textarea } from "@/components/ui/textarea";
import { ConfirmButton } from "@/components/Button/Button";
interface WorkspaceUpdateFormProps {
  form: UseFormReturn<AnnouncementFormType>;
  onSubmit: (values: AnnouncementFormType) => Promise<void>;
}

export default function AnnouncementForm({
  form,
  onSubmit,
}: WorkspaceUpdateFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mr-3 flex justify-end">
          <ConfirmButton type="submit" TextType="create" />
        </div>
      </form>
    </Form>
  );
}
