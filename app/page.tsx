"use client";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { isValidUrl } from "@/lib/utils";
import { FolderOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/context/toastProvider";
import { Progress } from "@/components/ui/progress";
import { usePreferences } from "@/context/preferencesProvider";

export default function Home() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const { toast, success, error: errorToast } = useToast();
  const { preferences, updatePreferences, isLoading } = usePreferences();

  useEffect(() => {
    if (!window.electronAPI) {
      errorToast({ title: "Warning: NO ELECTRON API" });
      return;
    }

    const onProgress = (percent: number) => {
      const p = Number(percent);
      setProgress(Number.isFinite(p) ? p : 0);
    };

    const onStatus = (msg: string) => setStatus(msg);

    const onComplete = (msg?: string) => {
      setLoading(false);
      setProgress(100);
      setStatus(msg || "Done");
      success({ title: msg || "Download complete" });
    };

    const onError = (error: string) => {
      setLoading(false);
      errorToast({ title: error || "Error" });
      setStatus("Error: " + (error || "unknown"));
    };

    window.electronAPI.onUpdateAvailable(() => {
      setLoading(true);
      toast({ title: "Update available. Downloading..." });
    });

    window.electronAPI.onUpdateDownloaded(() => {
      toast({ title: "Update downloaded. Installing..." });
      window.electronAPI.installUpdate();
    });

    window.electronAPI.onProgress(onProgress);
    window.electronAPI.onStatus(onStatus);
    window.electronAPI.onComplete(onComplete);
    window.electronAPI.onError(onError);

    return () => {
      window.electronAPI.removeListeners();
    };
  }, []);

  const download = async () => {
    if (!isValidUrl(url)) {
      errorToast({ title: "Please enter a valid URL" });
      return;
    }

    try {
      let filePath: string | null = null;

      if (preferences.locationMode === "ask") {
        const selectedPath = await window.electronAPI.selectDownloadLocation();
        if (!selectedPath) {
          return;
        } else {
          filePath = `${selectedPath}/%(title)s.%(ext)s`;
        }
      } else {
        if (!preferences.downloadLocation) {
          errorToast({ title: "Please select a download folder first" });
          return;
        } else {
          filePath = `${preferences.downloadLocation}/%(title)s.%(ext)s`;
        }
      }

      if (!filePath) {
        return;
      }

      setLoading(true);
      setProgress(0);
      setStatus("Starting download...");

      if (preferences.format === "mp3") {
        window.electronAPI.downloadMp3(url, filePath);
      } else {
        window.electronAPI.downloadMp4(url, filePath);
      }
      setUrl("");
    } catch (error) {
      errorToast({ title: "Failed to start download" });
    }
  };

  const chooseLocation = async () => {
    try {
      const selectedPath = await window.electronAPI.selectDownloadLocation();
      if (selectedPath) {
        updatePreferences({ downloadLocation: selectedPath });
        success({ title: "Download location selected" });
      }
    } catch (error) {
      errorToast({ title: "Failed to select download location" });
    }
  };

  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-16 backgroundgradient">
      <div className="flex flex-col gap-1.5 w-xs sm:w-xl md:w-2xl">
        <Input
          id="url"
          placeholder="https://youtu.be/..."
          className="font-mono"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        <Button
          variant="outline"
          disabled={!isValidUrl(url)}
          onClick={download}
          className="w-full self-end mb-3.5"
        >
          Download
        </Button>
        {loading ? (
          <div className="mt-4 flex flex-col items-center gap-2 w-full">
            {status && <p className="text-sm text-center">{status}</p>}
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-center">
              {Number.isFinite(progress) ? progress.toFixed(1) : "0.0"}%
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-center text-muted-foreground">
              Loading preferences...
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex gap-1.5 items-center">
              <span className="text-muted-foreground">Format: </span>
              <Select
                onValueChange={(value) =>
                  updatePreferences({ format: value as "mp3" | "mp4" })
                }
                value={preferences.format}
              >
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mp3">MP3</SelectItem>
                  <SelectItem value="mp4">MP4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-1.5 items-center">
              <span className="text-muted-foreground">Download: </span>
              <Select
                onValueChange={(value) =>
                  updatePreferences({ locationMode: value as "ask" | "choose" })
                }
                value={preferences.locationMode}
              >
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Select a mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ask">Ask Each Time</SelectItem>
                  <SelectItem value="choose">
                    {preferences.downloadLocation
                      ? preferences.downloadLocation
                      : "Choose Location"}
                  </SelectItem>
                </SelectContent>
              </Select>
              {preferences.locationMode === "choose" && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={chooseLocation}
                  disabled={loading}
                  className="h-9 px-4 py-2"
                >
                  <FolderOpen />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
