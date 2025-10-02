"use client";

import { Card, CardContent } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { RadioToggleGroup, ToggleGroupItem } from "./ui/radio-toggle-group";

export const VideoTab = ({
  preferences,
  updatePreferences,
}: {
  preferences: Preferences;
  updatePreferences: (newPreferences: Preferences) => Promise<void>;
}) => {
  const { video } = preferences;
  const isBest = video.preset === "best";

  return (
    <Card>
      <CardContent className="grid gap-6">
        <div className="grid gap-1">
          <span>Preset</span>
          <RadioToggleGroup
            value={preferences.video.preset}
            onValueChange={(value) =>
              updatePreferences({
                ...preferences,
                video: {
                  ...video,
                  preset: value as VideoPreferences["preset"],
                },
              })
            }
          >
            <ToggleGroupItem value="best" aria-label="Toggle best preset">
              <Tooltip>
                <TooltipTrigger>Best</TooltipTrigger>
                <TooltipContent>
                  <p>Peak available quality</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem value="custom" aria-label="Toggle custom preset">
              <Tooltip>
                <TooltipTrigger>Custom</TooltipTrigger>
                <TooltipContent>
                  <p>Full control over each setting</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
          </RadioToggleGroup>
        </div>
        <div className="grid gap-1">
          <span className={`${isBest && "opacity-50"}`}>Quality</span>
          <RadioToggleGroup
            disabled={isBest}
            value={video.custom?.videoFormat?.format}
            onValueChange={(value) =>
              updatePreferences({
                ...preferences,
                video: {
                  ...video,
                  custom: {
                    ...video.custom,
                    videoFormat: {
                      ...video.custom?.videoFormat,
                      format: value,
                    },
                  },
                },
              })
            }
          >
            <ToggleGroupItem value="bv+ba/best" aria-label="Toggle Best">
              <Tooltip>
                <TooltipTrigger>Best</TooltipTrigger>
                <TooltipContent>
                  <p>Best available</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="bv[height<=4320]+ba/best"
              aria-label="Toggle 8k"
            >
              <Tooltip>
                <TooltipTrigger>4320p</TooltipTrigger>
                <TooltipContent>
                  <p>UHD+ (8K)</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="bv[height<=2160]+ba/best"
              aria-label="Toggle 4k"
            >
              <Tooltip>
                <TooltipTrigger>2160p</TooltipTrigger>
                <TooltipContent>
                  <p>UHD (4K)</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="bv[height<=1440]+ba/best"
              aria-label="Toggle 2k"
            >
              <Tooltip>
                <TooltipTrigger>1440p</TooltipTrigger>
                <TooltipContent>
                  <p>FHD+ (2K)</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="bv[height<=1080]+ba/best"
              aria-label="Toggle 1080p"
            >
              <Tooltip>
                <TooltipTrigger>1080p</TooltipTrigger>
                <TooltipContent>
                  <p>FHD</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="bv[height<=720]+ba/best"
              aria-label="Toggle 720p"
            >
              <Tooltip>
                <TooltipTrigger>720p</TooltipTrigger>
                <TooltipContent>
                  <p>HD</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="bv[height<=480]+ba/best"
              aria-label="Toggle 480p"
            >
              <Tooltip>
                <TooltipTrigger>480p</TooltipTrigger>
                <TooltipContent>
                  <p>SD+</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="bv[height<=360]+ba/best"
              aria-label="Toggle 360p"
            >
              <Tooltip>
                <TooltipTrigger>360p</TooltipTrigger>
                <TooltipContent>
                  <p>SD</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="bv[height<=240]+ba/best"
              aria-label="Toggle 240p"
            >
              <Tooltip>
                <TooltipTrigger>240p</TooltipTrigger>
                <TooltipContent>
                  <p>Pixelated+</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="bv[height<=144]+ba/best"
              aria-label="Toggle 144p"
            >
              <Tooltip>
                <TooltipTrigger>144p</TooltipTrigger>
                <TooltipContent>
                  <p>Pixelated</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
          </RadioToggleGroup>
        </div>
        <div className="grid gap-1">
          <span className={`${isBest && "opacity-50"}`}>Container</span>
          <RadioToggleGroup
            disabled={isBest}
            value={preferences.video.custom?.videoFormat?.mergeOutputFormat}
            onValueChange={(value) =>
              updatePreferences({
                ...preferences,
                video: {
                  ...video,
                  custom: {
                    ...video.custom,
                    videoFormat: {
                      ...video.custom?.videoFormat,
                      mergeOutputFormat: value as any,
                    },
                  },
                },
              })
            }
          >
            <ToggleGroupItem value="mp4" aria-label="Toggle mp4">
              <Tooltip>
                <TooltipTrigger>MP4</TooltipTrigger>
                <TooltipContent>
                  <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                    MPEG-4 Part 14
                  </p>
                  <p>Compatibility: Excellent</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem value="mkv" aria-label="Toggle mkv">
              <Tooltip>
                <TooltipTrigger>MKV</TooltipTrigger>
                <TooltipContent>
                  <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                    Web Media File
                  </p>
                  <p>Compatibility: Good</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem value="webm" aria-label="Toggle webm">
              <Tooltip>
                <TooltipTrigger>WEBM</TooltipTrigger>
                <TooltipContent>
                  <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                    Web Media File
                  </p>
                  <p>Compatibility: Good</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
          </RadioToggleGroup>
        </div>
      </CardContent>
    </Card>
  );
};
