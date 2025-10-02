"use client";

import { Cog } from "lucide-react";
import { Button } from "./ui/button";
import { AudioTab } from "./audio-tab";
import { VideoTab } from "./video-tab";
import { GeneralTab } from "./general-tab";
import { AdvancedTab } from "./advanced-tab";
import { usePreferences } from "./providers/preferencesProvider";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { RadioToggleGroup, ToggleGroupItem } from "./ui/radio-toggle-group";

export const Options = () => {
  const { preferences, updatePreferences } = usePreferences();

  return (
    <div className="flex gap-2">
      <RadioToggleGroup
        onValueChange={(value) =>
          updatePreferences({
            ...preferences,
            type: value as Preferences["type"],
          })
        }
        value={preferences.type}
      >
        <ToggleGroupItem value="video" aria-label="Toggle video format">
          Video
        </ToggleGroupItem>
        <ToggleGroupItem value="audio" aria-label="Toggle audio format">
          Audio
        </ToggleGroupItem>
      </RadioToggleGroup>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Cog className="-mr-0.5" /> Options
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Tabs defaultValue={preferences.type} className="w-full">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="text-red-700 dark:text-red-700 dark:data-[state=active]:text-red-500"
              >
                Advanced (Beta)
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <GeneralTab
                preferences={preferences}
                updatePreferences={updatePreferences}
              />
            </TabsContent>
            <TabsContent value="video">
              <VideoTab
                preferences={preferences}
                updatePreferences={updatePreferences}
              />
            </TabsContent>
            <TabsContent value="audio">
              <AudioTab
                preferences={preferences}
                updatePreferences={updatePreferences}
              />
            </TabsContent>
            <TabsContent value="advanced">
              <AdvancedTab
                preferences={preferences}
                updatePreferences={updatePreferences}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};
