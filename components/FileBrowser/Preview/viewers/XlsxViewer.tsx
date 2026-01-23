"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, FileWarning } from "lucide-react";
import * as XLSX from "xlsx";

interface XlsxViewerProps {
  data: ArrayBuffer;
}

interface SheetData {
  name: string;
  data: any[][];
}

const XlsxViewer = ({ data }: XlsxViewerProps) => {
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [activeSheet, setActiveSheet] = useState(0);
  const [isConverting, setIsConverting] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);

  useEffect(() => {
    const convertXlsx = async () => {
      try {
        setIsConverting(true);

        // 파일 크기 체크 (10MB)
        const MAX_FILE_SIZE = 10 * 1024 * 1024;
        if (data.byteLength > MAX_FILE_SIZE) {
          setFileSizeExceeded(true);
          setIsConverting(false);
          return;
        }

        // xlsx 파일 파싱
        const workbook = XLSX.read(data, { type: "array" });

        // 빈 워크북 체크
        if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
          setError("빈 스프레드시트입니다");
          setIsConverting(false);
          return;
        }

        // 모든 시트 파싱
        const parsedSheets = workbook.SheetNames.map((name) => ({
          name,
          data: XLSX.utils.sheet_to_json(workbook.Sheets[name], {
            header: 1,
            defval: "", // 빈 셀은 빈 문자열로
          }) as any[][],
        }));

        setSheets(parsedSheets);
        setError(null);
      } catch (err) {
        console.error("XLSX 변환 오류:", err);
        setError("파일을 읽을 수 없습니다");
      } finally {
        setIsConverting(false);
      }
    };

    convertXlsx();
  }, [data]);

  // 로딩 상태
  if (isConverting) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // 파일 크기 초과
  if (fileSizeExceeded) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <FileWarning className="h-12 w-12 text-muted-foreground" />
        <p className="font-medium text-muted-foreground">
          파일이 너무 커서 열람할 수 없습니다
        </p>
        <p className="text-sm text-muted-foreground">
          10MB 이하의 파일만 프리뷰할 수 있습니다
        </p>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <FileWarning className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  // 시트가 하나만 있는 경우
  if (sheets.length === 1) {
    return (
      <div className="h-full w-full overflow-auto">
        <SheetTable data={sheets[0].data} />
      </div>
    );
  }

  // 다중 시트
  return (
    <Tabs
      value={activeSheet.toString()}
      onValueChange={(value) => setActiveSheet(parseInt(value))}
      className="flex h-full flex-col"
    >
      <TabsList className="w-full justify-start overflow-x-auto">
        {sheets.map((sheet, index) => (
          <TabsTrigger key={index} value={index.toString()}>
            {sheet.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {sheets.map((sheet, index) => (
        <TabsContent
          key={index}
          value={index.toString()}
          className="flex-1 overflow-hidden"
        >
          <div className="h-full w-full overflow-auto">
            <SheetTable data={sheet.data} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

// 테이블 렌더링 컴포넌트
const SheetTable = ({ data }: { data: any[][] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">빈 시트입니다</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="even:bg-muted/30 hover:bg-muted/50"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="min-w-[100px] break-words whitespace-pre-wrap border border-border p-2 px-3"
                >
                  {cell !== null && cell !== undefined ? String(cell) : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default XlsxViewer;