"use client";
import React, { useState } from "react";
import {
  AdvancedSearchSchema,
  AdvancedSearchType,
} from "./AdvancedSearchSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AdvancedSearchDialog from "./AdvancedSearchDialog";
import AdvancedSearchForm from "./AdvancedSearchForm";
import { useRouter } from "next/navigation";
import useBrowserParams from "@/hooks/useBrowserParams";

export default function AdvancedSearchContainer() {
  const { workspaceId } = useBrowserParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const form = useForm<AdvancedSearchType>({
    resolver: zodResolver(AdvancedSearchSchema),
    defaultValues: {
      fileName: "",
      contents: "",
      extension: ["docx", "pdf", "pptx", "txt", "xlsx"],
    },
  });

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      form.reset();
    }
  };

  const AdvancedSearchSubmit = async (values: AdvancedSearchType) => {
    handleOpenChange(false);
    const params = new URLSearchParams();
    params.append("fileName", values.fileName);
    params.append("contents", values.contents);
    values.extension.forEach((ext) => params.append("extension", ext));

    const queryString = params.toString();
    const url = `/workspace/${workspaceId}/browser/advancedsearch?${queryString}`;

    router.push(url);
  };

  return (
    <AdvancedSearchDialog open={open} setOpen={handleOpenChange}>
      <AdvancedSearchForm
        isLoading={false}
        form={form}
        onSubmit={AdvancedSearchSubmit}
      />
    </AdvancedSearchDialog>
  );
}
