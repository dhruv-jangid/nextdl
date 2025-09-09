"use client";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { toast } from "sonner";
import { isValidUrl } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/themeToggle";
import { AudioOptions } from "@/components/audioOptions";
import { VideoOptions } from "@/components/videoOptions";
import { usePreferences } from "@/components/providers/preferencesProvider";
import { Download, FolderOpen, Settings2, Loader, XCircle } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [eta, setEta] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [speed, setSpeed] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const { preferences, updatePreferences, prefLoading } = usePreferences();

  useEffect(() => {
    setTimeout(() => {
      if (!window.electronAPI) {
        toast.warning("NO ELECTRON API");
        return;
      }

      window.electronAPI.onUpdateAvailable(() => {
        setLoading(true);
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

      if (preferences.locationMode === "ask") {
        const selectedPath = await window.electronAPI.selectDownloadLocation();
        if (!selectedPath) {
          return;
        } else {
          filePath = `${selectedPath}/%(title)s.%(ext)s`;
        }
      } else {
        if (!preferences.downloadLocation) {
          toast.warning("Please select a download folder first");
          return;
        } else {
          filePath = `${preferences.downloadLocation}/%(title)s.%(ext)s`;
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
      toast.error("Something went wrong");
    } finally {
      setUrl("");
    }
  };

  const chooseLocation = async () => {
    try {
      const selectedPath = await window.electronAPI.selectDownloadLocation();
      if (selectedPath) {
        updatePreferences({ ...preferences, downloadLocation: selectedPath });
        toast.success("Download location selected");
      }
    } catch {
      toast.error("Failed to select download location");
    }
  };

  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-16">
      <div className="flex flex-col gap-1.5 w-xs sm:w-xl md:w-2xl">
        <Input
          id="url"
          placeholder="https://youtu.be/..."
          className="font-mono"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        {loading ? (
          <>
            <div className="mt-2 w-full rounded-2xl border bg-background/50 backdrop-blur-md px-3.5 py-2.5">
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                <span className="text-muted-foreground">Status</span>
                <span
                  className="text-right font-medium truncate"
                  title={status}
                >
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
            <div className="mt-1.5 flex justify-end">
              <Button
                variant="outline"
                onClick={() => window.electronAPI.cancelDownload()}
                disabled={status === "Cancelling"}
              >
                <XCircle />{" "}
                {status === "Cancelling" ? "Cancelling..." : "Cancel"}
              </Button>
            </div>
          </>
        ) : prefLoading ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-center text-muted-foreground">
              Loading preferences...
            </p>
          </div>
        ) : (
          <div className="flex justify-end gap-1.5 w-full">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings2 /> Options
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Options</DialogTitle>
                  <DialogDescription>Settings are saved</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  <ThemeToggle />
                  <div className="flex gap-1.5 items-center">
                    <span className="text-muted-foreground">Type: </span>
                    <Select
                      onValueChange={(value: Preferences["type"]) =>
                        updatePreferences({ ...preferences, type: value })
                      }
                      value={preferences.type}
                    >
                      <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Select a format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-1.5 items-center">
                    <span className="text-muted-foreground">Download: </span>
                    <Select
                      onValueChange={(value: Preferences["locationMode"]) =>
                        updatePreferences({
                          ...preferences,
                          locationMode: value,
                        })
                      }
                      value={preferences.locationMode}
                    >
                      <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Select a mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ask">Ask (Each Time)</SelectItem>
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
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">Preset: </span>
                    <Select
                      onValueChange={(value: Preferences["preset"]) =>
                        updatePreferences({ ...preferences, preset: value })
                      }
                      value={preferences.preset}
                    >
                      <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="best">Best (Highest)</SelectItem>
                        <SelectItem value="custom">
                          Custom (Advanced)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {preferences.preset === "custom" &&
                    (preferences.type === "video" ? (
                      <VideoOptions
                        preferences={preferences}
                        updatePreferences={updatePreferences}
                      />
                    ) : (
                      <AudioOptions
                        preferences={preferences}
                        updatePreferences={updatePreferences}
                      />
                    ))}
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              disabled={!isValidUrl(url)}
              onClick={download}
              className="self-end mb-3.5"
            >
              <Download /> Download
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
