"use client";
import { ConfirmButton } from "@/components/Button/Button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SignUpType } from "./signupSchema";

interface SignUpFormProps {
  form: UseFormReturn<SignUpType>;
  onSubmit: (values: SignUpType) => void;
  isLoading: boolean;
}

export default function SignUpForm({
  form,
  onSubmit,
  isLoading,
}: SignUpFormProps) {
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-neutral-800">Email</FormLabel>
              <FormControl>
                <Input placeholder={"test@test.com"} type="email" {...field} />
              </FormControl>
              <FormMessage className="body-3 absolute" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-neutral-800">Nickname</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage className="body-3 absolute" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-neutral-800">Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage className="body-3 absolute" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-neutral-800">
                Password Confirm
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage className="body-3 absolute" />
            </FormItem>
          )}
        />
        <div className="pt-6">
          <ConfirmButton
            className="w-full"
            disabled={isLoading}
            TextType="create"
            type="submit"
          />
        </div>
      </form>
    </Form>
  );
}