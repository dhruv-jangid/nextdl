"use client";

import { isValidUrl } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/context/toastProvider";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [mp3, setIsMp3] = useState(true);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const { toast, success, error: errorToast } = useToast();

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

  const download = () => {
    if (!isValidUrl(url)) {
      errorToast({ title: "Please enter a valid URL" });
      return;
    }
    setLoading(true);
    setProgress(0);
    setStatus("Starting download...");
    if (mp3) {
      window.electronAPI.downloadMp3(url);
    } else {
      window.electronAPI.downloadMp4(url);
    }
    setUrl("");
  };

  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-16 backgroundgradient">
      <div className="flex flex-col gap-1.5 w-xs sm:w-xl md:w-2xl">
        <div className="flex gap-1.5 items-center self-end">
          <span>MP4</span>
          <Switch checked={mp3} onCheckedChange={() => setIsMp3(!mp3)} />
          <span>MP3</span>
        </div>
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
          className="w-fit self-end mt-1.5"
        >
          Download
        </Button>
        {loading && (
          <div className="mt-4 flex flex-col items-center gap-2 w-full">
            {status && <p className="text-sm text-center">{status}</p>}
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-center">
              {Number.isFinite(progress) ? progress.toFixed(1) : "0.0"}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
