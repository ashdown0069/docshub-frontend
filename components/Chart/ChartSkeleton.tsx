import React from "react";
import { Card } from "../ui/card";
import LoadingSpinner from "../Loading/LoadingSpinner";

export default function ChartSkeleton() {
  return (
    <Card className="flex h-72 flex-col items-center justify-center rounded-2xl bg-brand-200 p-5 text-white md:flex-row">
      <LoadingSpinner color="white" />
    </Card>
  );
}
