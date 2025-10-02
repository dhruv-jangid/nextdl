"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Folder, Link as LinkIcon } from "lucide-react";

export const AdvancedTab = ({
  preferences,
  updatePreferences,
}: {
  preferences: Preferences;
  updatePreferences: (newPreferences: Preferences) => Promise<void>;
}) => {
  const chooseCookiesDir = async () => {
    try {
      const selectedPath = await window.electronAPI.chooseFolder();
      if (selectedPath) {
        updatePreferences({ ...preferences, cookiesDir: selectedPath });
        toast.warning("Cookies Directory selected");
      }
    } catch {
      toast.error("Failed to select cookies directory");
    }
  };

  const removeCookiesDir = async () => {
    try {
      updatePreferences({ ...preferences, cookiesDir: "" });
    } catch {
      toast.error("Failed to remove cookies directory");
    }
  };

  const openLink = (url: string) => {
    try {
      window.electronAPI.openLink(url);
    } catch {
      toast.error("Failed to open link");
    }
  };

  return (
    <Card>
      <CardContent className="grid gap-6">
        <div className="text-sm space-y-3">
          <div className="text-red-500 space-y-2 text-balance">
            <span>Note: </span>
            <p>
              If you're not an advanced user, please avoid using this feature.
              It's just a few hours of waiting — your patience won't kill you,
              but messing with cookies might kill your YouTube account hehe.
            </p>
            <p>
              If downloads fail due to rate limits, you can use your own cookies
              file as an alternative. However, please avoid sending excessive
              requests, as this may result in your account being suspended or
              banned. To use your own cookies, extract them from www.youtube.com
              using a browser extension, then select the folder containing your
              cookies.txt file.
            </p>
            <p>
              Please note that YouTube rotates cookies periodically, so a single
              cookie file won't work indefinitely. Do not share your cookies
              file with anyone, as it contains sensitive account information.
              For your safety and security, the cookies.txt file will be
              automatically deleted after each download.
            </p>
          </div>
          <div className="flex gap-6 text-muted-foreground">
            <span
              className="flex items-center gap-1.5 hover:underline underline-offset-4 cursor-pointer"
              onClick={() =>
                openLink(
                  "https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc"
                )
              }
            >
              <LinkIcon size={14} /> Extension for Chrome
            </span>
            <span
              className="flex items-center gap-1.5 hover:underline underline-offset-4 cursor-pointer"
              onClick={() =>
                openLink(
                  "https://addons.mozilla.org/en-US/firefox/addon/cookies-txt/"
                )
              }
            >
              <LinkIcon size={14} /> Extension for Firefox
            </span>
          </div>
        </div>
        <div className="grid gap-1">
          <span className="ml-0.5">Cookies Directory</span>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              className="w-fit"
              onClick={
                !preferences.cookiesDir ? chooseCookiesDir : removeCookiesDir
              }
            >
              <Folder /> {!preferences.cookiesDir ? "Choose" : "Remove"}
            </Button>
            <span className="text-sm text-muted-foreground">
              {preferences.cookiesDir}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
