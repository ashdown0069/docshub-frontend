"use client";
import React, { useState } from "react";
import {
  CreateWorkspaceFormTypes,
  useCreateWorkspaceSchema,
} from "./CreateWorkspaceSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateWorkspaceDialog from "./CreateWorkspaceDialog";
import { CreateWorkspaceForm } from "./CreateWorkspaceForm";
import { useCreateWorkspace } from "@/app/(root)/services/workspace/createWorkspaceService";

export default function CreateWorkspaceContainer() {
  const createWorkspaceSchema = useCreateWorkspaceSchema();
  const createWorkspaceMutation = useCreateWorkspace();
  const [open, setOpen] = useState(false);
  const form = useForm<CreateWorkspaceFormTypes>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      description: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      form.reset();
    }
  };

  const createNewWorkspaceSubmit = async (values: CreateWorkspaceFormTypes) => {
    createWorkspaceMutation.mutate(
      {
        name: values.name,
        description: values.description,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      },
      {
        onSuccess: () => {
          handleOpenChange(false);
        },
        onError: (error) => {
          console.error("Error creating workspace:", error);
        },
      },
    );
  };
  return (
    <CreateWorkspaceDialog open={open} setOpen={handleOpenChange}>
      <CreateWorkspaceForm
        form={form}
        isLoading={createWorkspaceMutation.isPending}
        onSubmit={createNewWorkspaceSubmit}
      />
    </CreateWorkspaceDialog>
  );
}
