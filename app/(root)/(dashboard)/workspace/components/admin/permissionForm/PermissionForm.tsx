"use client";

import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ConfirmButton } from "@/components/Button/Button";
import { PermissionData } from "@/types";

const UserRoleCheckbox = [
  {
    label: "다운로드",
    value: "canDownload",
  },
  {
    label: "업로드",
    value: "canUpload",
  },
  {
    label: "이름 변경",
    value: "canRename",
  },
  {
    label: "삭제",
    value: "canDelete",
  },
  {
    label: "이동",
    value: "canMove",
  },
  {
    label: "잠금",
    value: "canLock",
  },
];

const ManagerRoleCheckbox = [
  {
    label: "추방권한",
    value: "canRemoveMembers",
  },
  ...UserRoleCheckbox,
];
interface PermissionFormProps {
  form: UseFormReturn<PermissionData[]>;
  onSubmit: (data: any) => void;
}
export function PermissionForm({ form, onSubmit }: PermissionFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
        <h3>매니저 권한</h3>
        <div className="grid grid-cols-2 gap-0 sm:grid-cols-4 sm:gap-2 md:grid-cols-5">
          {ManagerRoleCheckbox.map((item) => (
            <FormField
              key={item.value}
              control={form.control}
              name={`0.${item.value}` as any}
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-3">
                    <FormControl>
                      <Checkbox
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>{item.label}</FormLabel>
                    </div>
                  </FormItem>
                </>
              )}
            />
          ))}
        </div>
        <div className="mt-5">유저 권한</div>
        <div className="grid grid-cols-2 gap-0 sm:grid-cols-4 sm:gap-2 md:grid-cols-5">
          {UserRoleCheckbox.map((item) => (
            <FormField
              key={item.value}
              control={form.control}
              name={`1.${item.value}` as any}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-3">
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{item.label}</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className="mr-5 mt-3 flex justify-end">
          <ConfirmButton TextType="confirm" />
        </div>
      </form>
    </Form>
  );
}
