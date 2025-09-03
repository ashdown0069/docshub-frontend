"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWorkspaceSortStore } from "@/store/useWorkSpaceStore";

export const SORT_LABELS = {
  ALPHABETICAL_ASC: "Name (A → Z)",
  ALPHABETICAL_DESC: "Name (Z → A)",
  CREATED_AT_ASC: "Created Date (Oldest First)",
  CREATED_AT_DESC: "Created Date (Newest First)",
  UPDATED_AT_ASC: "Updated Date (Oldest First)",
  UPDATED_AT_DESC: "Updated Date (Newest First)",
};

const WorkSpaceSort = () => {
  const { setSort, sort } = useWorkspaceSortStore();
  return (
    <Select
      onValueChange={(value) => {
        setSort(
          value as
            | "ALPHABETICAL_ASC"
            | "ALPHABETICAL_DESC"
            | "CREATED_AT_ASC"
            | "CREATED_AT_DESC"
            | "UPDATED_AT_ASC"
            | "UPDATED_AT_DESC",
        );
      }}
    >
      <SelectTrigger className="w-[250px] border-none text-xs focus:ring-0">
        <SelectValue placeholder={SORT_LABELS[sort]} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="text-xs">
          <SelectLabel className="text-xs text-light-100">Sort by</SelectLabel>
          {Object.entries(SORT_LABELS).map(([value, label]) => (
            <SelectItem className="text-xs" key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default WorkSpaceSort;
