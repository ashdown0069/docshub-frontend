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
import type { JoinWorkspaceType } from "./PasswordDialogSchema";

interface PasswordFormProps {
  form: UseFormReturn<JoinWorkspaceType>;
  onSubmit: (values: JoinWorkspaceType) => Promise<void>;
  isLoading: boolean;
  placeholder: string;
}

export default function PasswordForm({
  form,
  onSubmit,
  isLoading,
  placeholder,
}: PasswordFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <Input placeholder={placeholder} type="password" {...field} />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />
        <div className="mt-9 flex justify-end gap-2">
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

{
  /* <div className="grid gap-4 py-4">
<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="name" className="text-right">
    Password
  </Label>
  <Input id="name" defaultValue="" className="col-span-3" />
</div>
</div>
<DialogFooter>
<DialogClose asChild>
  <DestructiveButton TextType="cancel" />
</DialogClose>
<ConfirmButton TextType="confirm" type="submit" />
</DialogFooter> */
}
