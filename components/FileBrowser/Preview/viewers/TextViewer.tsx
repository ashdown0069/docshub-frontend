"use client";

import { useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TextViewerProps {
  data: ArrayBuffer;
}

const TextViewer = ({ data }: TextViewerProps) => {
  const textContent = useMemo(() => {
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(data);
  }, [data]);

  return (
    <ScrollArea className="h-full w-full">
      <pre className="whitespace-pre-wrap break-words p-4 font-mono text-sm">
        {textContent}
      </pre>
    </ScrollArea>
  );
};

export default TextViewer;
