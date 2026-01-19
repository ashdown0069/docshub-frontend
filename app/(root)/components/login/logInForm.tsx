"use client";
import { ConfirmButton, DestructiveButton } from "@/components/Button/Button";
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
import { LogInType } from "./logInSchema";
import { Button } from "@/components/ui/button";

interface LogInFormProps {
  form: UseFormReturn<LogInType>;
  onSubmit: (values: LogInType) => void;
  isLoading: boolean;
}

export default function LogInForm({
  form,
  onSubmit,
  isLoading,
}: LogInFormProps) {
  return (
    <Form {...form}>
      <form
        className="w-full space-y-12"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
        <Button
          className="w-full bg-brand-300 hover:bg-brand-400"
          disabled={isLoading}
          type="submit"
        >
          Log In
        </Button>
      </form>
    </Form>
  );
}
