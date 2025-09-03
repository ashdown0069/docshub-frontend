import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Fragment } from "react";

interface FileBrowserBreadcrumbProps {
  workspaceId: string;
  data: { id: string; name: string }[];
}
export default function FileBrowserBreadcrumb({
  data,
  workspaceId,
}: FileBrowserBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/workspace/${workspaceId}/browser`}>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {data &&
          data.map((ancestor, idx: number) => {
            if (idx === data.length - 1) {
              //마지막 요소일 때
              return (
                <Fragment key={ancestor.id}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{ancestor.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </Fragment>
              );
            }
            return (
              <Fragment key={ancestor.id}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={`/workspace/${workspaceId}/browser/${ancestor.id}`}
                    >
                      {ancestor.name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// <BreadcrumbSeparator />
// <BreadcrumbItem>
//   <BreadcrumbLink href="/docs/components">
//     Components
//   </BreadcrumbLink>
// </BreadcrumbItem>
// <BreadcrumbSeparator />
// <BreadcrumbItem>
//   <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
// </BreadcrumbItem></>
