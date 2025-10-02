"use client";

import { toast } from "sonner";
import { Download } from "lucide-react";
import { isValidUrl } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Loading } from "@/components/loading";
import { Options } from "@/components/options";
import { Button } from "@/components/ui/button";
import { InputUrl } from "@/components/input-url";
import { usePreferences } from "@/components/providers/preferencesProvider";

export default function Home() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [eta, setEta] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [speed, setSpeed] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const { preferences, prefLoading } = usePreferences();

  useEffect(() => {
    setTimeout(() => {
      if (!window.electronAPI) {
        toast.warning("NO ELECTRON API");
        return;
      }

      window.electronAPI.onUpdateAvailable(() => {
        setLoading(true);
        setIsUpdate(true);
        setProgress(0);
        setStatus("Downloading update");
        toast.info("Update available");
      });

      window.electronAPI.onUpdateProgress((percent) => setProgress(percent));

      window.electronAPI.onUpdateDownloaded(() => {
        setProgress(100);
        setStatus("Installing update");
        toast.success("Update downloaded");
        window.electronAPI.installUpdate();
      });

      window.electronAPI.onUpdateError((error) => {
        setLoading(false);
        setIsUpdate(false);
        setStatus("Update error: " + error);
        toast.error("Update failed");
      });

      window.electronAPI.onProgress((percent) =>
        setProgress(Number.isFinite(percent) ? percent : 0)
      );

      window.electronAPI.onStatus((data) => {
        const payload = data;
        setStatus(payload.status);
        setProgress(
          typeof payload.progress === "number" &&
            Number.isFinite(payload.progress)
            ? payload.progress
            : 0
        );
        setSize(payload.size || "");
        setSpeed(payload.speed || "");
        setEta(payload.eta || "");
      });

      window.electronAPI.onComplete((msg) => {
        setLoading(false);
        setProgress(100);
        setStatus(msg || "Done");
        setEta("");
        setSpeed("");
        toast.success("Download complete");
      });

      window.electronAPI.onCancelled((msg) => {
        setLoading(false);
        setStatus(msg || "Cancelled");
        setEta("");
        setSpeed("");
        setProgress(0);
        toast.error("Download cancelled");
      });

      window.electronAPI.onError((error) => {
        setLoading(false);
        setStatus("Error: " + error);
        setEta("");
        setSpeed("");
        toast.error("Download failed");
      });
    }, 0);

    return () => {
      window.electronAPI.removeListeners();
    };
  }, []);

  const download = async () => {
    if (!isValidUrl(url)) {
      toast.warning("Please enter a valid URL");
      return;
    }

    try {
      let filePath: string | null = null;
      const { downloadMode, downloadDir } = preferences;
      if (downloadMode === "ask") {
        const selectedPath = await window.electronAPI.chooseFolder();
        if (!selectedPath) {
          return;
        } else {
          filePath = `${selectedPath}/%(title)s.%(ext)s`;
        }
      } else {
        if (!downloadDir) {
          toast.warning("Please select a download folder first");
          return;
        } else {
          filePath = `${downloadDir}/%(title)s.%(ext)s`;
        }
      }

      if (!filePath) {
        toast.error("Download location not set");
        return;
      }

      setLoading(true);
      setProgress(0);
      setStatus("Starting download...");
      setSize("");
      setEta("");
      setSpeed("");

      window.electronAPI.download(url, filePath);
    } catch {
      if (!window.electronAPI) {
        toast.warning("NO ELECTRON API");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setUrl("");
    }
  };

  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2 w-xs sm:w-xl md:w-2xl">
        <InputUrl url={url} setUrl={setUrl} loading={loading} />
        {loading ? (
          <Loading
            size={size}
            speed={speed}
            eta={eta}
            progress={progress}
            status={status}
            isUpdate={isUpdate}
          />
        ) : prefLoading ? (
          <div className="text-sm text-center text-muted-foreground mt-2">
            Loading preferences...
          </div>
        ) : (
          <div className="flex justify-between w-full">
            <Options />
            <Button
              variant="outline"
              disabled={!isValidUrl(url)}
              onClick={download}
            >
              <Download /> Download
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
