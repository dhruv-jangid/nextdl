"use client";

import { Button } from "./ui/button";
import { Loader, XCircle } from "lucide-react";

export const Loading = ({
  size,
  speed,
  eta,
  progress,
  status,
  isUpdate,
}: {
  size: string;
  speed: string;
  eta: string;
  progress: number;
  status: string;
  isUpdate: boolean;
}) => {
  return (
    <>
      <div className="mt-2 w-full rounded-2xl border bg-background/50 backdrop-blur-md px-3.5 py-2.5">
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
          <span className="text-muted-foreground">Status</span>
          <span className="text-right font-medium truncate" title={status}>
            {status || "—"}
          </span>
          <span className="text-muted-foreground">Size</span>
          <span className="text-right font-medium">{size || "—"}</span>
          <span className="text-muted-foreground">Speed</span>
          <span className="text-right font-medium">{speed || "—"}</span>
          <span className="text-muted-foreground">ETA</span>
          <span className="text-right font-medium">{eta || "—"}</span>
          <span className="text-muted-foreground">Progress</span>
          <span className="flex justify-end items-center gap-2">
            <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
            <span className="text-right font-medium">
              {Number.isFinite(progress) ? progress.toFixed(0) : "0"}%
            </span>
          </span>
        </div>
      </div>
      {!isUpdate && (
        <div className="mt-1.5 flex justify-end">
          <Button
            variant="outline"
            onClick={() => window.electronAPI.cancelDownload()}
            disabled={status === "Cancelling"}
          >
            <XCircle /> {status === "Cancelling" ? "Cancelling..." : "Cancel"}
          </Button>
        </div>
      )}
    </>
  );
};
