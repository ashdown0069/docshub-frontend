"use client";
import React from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
interface UploadButtonProps {
  isLoading: boolean;
  upload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const UploadButton = ({ isLoading, upload }: UploadButtonProps) => {
  return (
    <div>
      <Label
        className="flex cursor-pointer items-center justify-center rounded-md border border-brand-400 bg-brand-300 p-3 text-white"
        htmlFor="upload"
      >
        Upload File
      </Label>
      <Input
        disabled={isLoading}
        onChange={upload}
        className="hidden"
        id="upload"
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.csv,.xls,.xlsx,.xlsm"
      />
    </div>
  );
};
