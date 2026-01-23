"use client";

import { useMemo, useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import mammoth from "mammoth";

interface DocxViewerProps {
  data: ArrayBuffer;
}

const DocxViewer = ({ data }: DocxViewerProps) => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [isConverting, setIsConverting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const convertDocx = async () => {
      try {
        setIsConverting(true);
        const result = await mammoth.convertToHtml({ arrayBuffer: data });
        setHtmlContent(result.value);
        setError(null);
      } catch (err) {
        console.error("DOCX 변환 오류:", err);
        setError("문서를 변환할 수 없습니다.");
      } finally {
        setIsConverting(false);
      }
    };

    convertDocx();
  }, [data]);

  if (isConverting) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full w-full">
      <div
        className="docx-preview p-6"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <style jsx global>{`
        .docx-preview {
          font-family: "Times New Roman", serif;
          line-height: 1.6;
          color: inherit;
        }
        .docx-preview h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }
        .docx-preview h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.83em 0;
        }
        .docx-preview h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 1em 0;
        }
        .docx-preview p {
          margin: 1em 0;
        }
        .docx-preview table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
        }
        .docx-preview th,
        .docx-preview td {
          border: 1px solid hsl(var(--border));
          padding: 8px;
          text-align: left;
        }
        .docx-preview th {
          background-color: hsl(var(--muted));
        }
        .docx-preview ul,
        .docx-preview ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        .docx-preview li {
          margin: 0.5em 0;
        }
        .docx-preview img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </ScrollArea>
  );
};

export default DocxViewer;
