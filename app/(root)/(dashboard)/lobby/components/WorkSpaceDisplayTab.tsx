"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Menu } from "lucide-react";
import { useDisplayStore } from "@/store/useWorkSpaceStore";

export const WorkSpaceDisplayTab = () => {
  const setDisplay = useDisplayStore((state) => state.setDisplay);
  return (
    <Tabs
      defaultValue="grid"
      onValueChange={(value) => setDisplay(value as "grid" | "list")}
    >
      <TabsList className="grid w-full grid-cols-2 bg-transparent">
        <TabsTrigger value="grid" className="data-[state=active]:bg-brand-100">
          <LayoutGrid color="#333f4e" />
        </TabsTrigger>
        <TabsTrigger value="list" className="data-[state=active]:bg-brand-100">
          <Menu color="#333f4e" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
