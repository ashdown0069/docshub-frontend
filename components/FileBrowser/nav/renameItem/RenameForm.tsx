"use client";
import { ConfirmButton, DestructiveButton } from "@/components/Button/Button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { UseFormReturn } from "react-hook-form";
import { RenameFolderType } from "./RenameFormSchema";

interface RenameFormProps {
  form: UseFormReturn<RenameFolderType>;
  onSubmit: (values: RenameFolderType) => Promise<void>;
  isLoading: boolean;
  placeholder: string;
}

export default function RenameForm({
  form,
  onSubmit,
  isLoading,
  placeholder,
}: RenameFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <Input placeholder={placeholder} {...field} />
              </FormControl>
              <FormMessage className="absolute" />
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
          <ConfirmButton disabled={isLoading} TextType="create" type="submit" />
        </div>
      </form>
    </Form>
  );
}
