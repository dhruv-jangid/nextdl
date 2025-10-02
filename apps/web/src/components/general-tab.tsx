"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Card, CardContent } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { RadioToggleGroup, ToggleGroupItem } from "./ui/radio-toggle-group";
import { CircleQuestionMark, Eclipse, Folder, Moon, Sun } from "lucide-react";

export const GeneralTab = ({
  preferences,
  updatePreferences,
}: {
  preferences: Preferences;
  updatePreferences: (newPreferences: Preferences) => Promise<void>;
}) => {
  const { theme, setTheme } = useTheme();

  const chooseDownloadDir = async () => {
    try {
      const selectedPath = await window.electronAPI.chooseFolder();
      if (selectedPath) {
        updatePreferences({ ...preferences, downloadDir: selectedPath });
        toast.success("Download location selected");
      } else if (!preferences.downloadDir) {
        updatePreferences({
          ...preferences,
          downloadMode: "ask",
        });
      }
    } catch {
      toast.error("Failed to select download location");
      updatePreferences({
        ...preferences,
        downloadMode: "ask",
      });
    }
  };

  return (
    <Card>
      <CardContent className="grid gap-6">
        <div className="grid gap-1">
          <span className="ml-0.5">Theme</span>
          <RadioToggleGroup
            value={theme}
            onValueChange={(value) => setTheme(value)}
          >
            <ToggleGroupItem value="system" aria-label="Toggle system">
              <Eclipse /> System
            </ToggleGroupItem>
            <ToggleGroupItem value="light" aria-label="Toggle light">
              <Sun /> Light
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" aria-label="Toggle dark">
              <Moon /> Dark
            </ToggleGroupItem>
          </RadioToggleGroup>
        </div>
        <div className="grid gap-1">
          <span className="ml-0.5">Download Directory</span>
          <div className="flex items-center gap-2">
            <RadioToggleGroup
              value={preferences.downloadMode}
              onValueChange={(value) => {
                updatePreferences({
                  ...preferences,
                  downloadMode: value as Preferences["downloadMode"],
                });
              }}
            >
              <ToggleGroupItem value="ask" aria-label="Toggle ask">
                <CircleQuestionMark /> Ask (Each Time)
              </ToggleGroupItem>
              <ToggleGroupItem
                value="choose"
                aria-label="Toggle choose"
                onClick={() => !preferences.downloadDir && chooseDownloadDir()}
              >
                <Folder />
                {preferences.downloadDir ? (
                  <Tooltip>
                    <TooltipTrigger>
                      {preferences.downloadDir.slice(0, 15) +
                        (preferences.downloadDir.length > 15 ? "..." : "")}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{preferences.downloadDir}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  "Choose"
                )}
              </ToggleGroupItem>
            </RadioToggleGroup>
            {preferences.downloadDir && (
              <Button variant="secondary" onClick={chooseDownloadDir}>
                Change Directory
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
