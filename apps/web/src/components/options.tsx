"use client";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "./ui/dialog";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "./ui/select";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { ThemeToggle } from "./themeToggle";
import { AudioOptions } from "./audioOptions";
import { VideoOptions } from "./videoOptions";
import { FolderOpen, Settings2 } from "lucide-react";
import { usePreferences } from "./providers/preferencesProvider";

export const Options = () => {
  const { preferences, updatePreferences } = usePreferences();

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings2 /> Options
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Options</DialogTitle>
          <DialogDescription>Your preferences are saved</DialogDescription>
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
                className="h-9 px-4 py-2"
              >
                <FolderOpen />
              </Button>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Preset: </span>
            <Select
              value={
                preferences.type === "audio"
                  ? preferences.audio.preset
                  : preferences.video.preset
              }
              onValueChange={(value: string) => {
                if (preferences.type === "audio") {
                  updatePreferences({
                    ...preferences,
                    audio: {
                      ...preferences.audio,
                      preset: value as Preferences["audio"]["preset"],
                    },
                  });
                } else {
                  updatePreferences({
                    ...preferences,
                    video: {
                      ...preferences.video,
                      preset: value as Preferences["video"]["preset"],
                    },
                  });
                }
              }}
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best">Best (Available)</SelectItem>
                <SelectItem value="custom">Custom (Advanced)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {preferences.audio.preset === "custom" &&
            preferences.type === "audio" && (
              <AudioOptions
                preferences={preferences}
                updatePreferences={updatePreferences}
              />
            )}
          {preferences.video.preset === "custom" &&
            preferences.type === "video" && (
              <VideoOptions
                preferences={preferences}
                updatePreferences={updatePreferences}
              />
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
