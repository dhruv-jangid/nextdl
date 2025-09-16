"use client";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "./ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const VideoOptions = ({
  preferences,
  updatePreferences,
}: {
  preferences: Preferences;
  updatePreferences: (newPreferences: Preferences) => Promise<void>;
}) => {
  const { video } = preferences;

  return (
    <>
      <div className="flex items-center gap-1.5">
        <span className="text-muted-foreground">Quality: </span>
        <Select
          value={video.custom?.videoFormat?.format}
          onValueChange={(value: any) =>
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
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select quality" />
          </SelectTrigger>
          <SelectContent className="w-3xs">
            <Tooltip>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <SelectItem value="bv+ba/best">
                    <span>Best</span>
                  </SelectItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Best available</p>
                </TooltipContent>
              </Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="bv[height<=4320]+ba/best">
                  <span>4320p</span>
                </SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>UHD+ (8K)</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="bv[height<=2160]+ba/best">
                  <span>2160p</span>
                </SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>UHD (4K)</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="bv[height<=1440]+ba/best">
                  <span>1440p</span>
                </SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>FHD+ (2K)</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="bv[height<=1080]+ba/best">
                  <span>1080p</span>
                </SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>FHD</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="bv[height<=720]+ba/best">
                  <span>720p</span>
                </SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>HD</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="bv[height<=480]+ba/best">
                  <span>480p</span>
                </SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>SD+</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="bv[height<=360]+ba/best">
                  <span>360p</span>
                </SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>SD</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="bv[height<=240]+ba/best">
                  <span>240p</span>
                </SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pixelated+</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="bv[height<=144]+ba/best">
                  <span>144p</span>
                </SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pixelated</p>
              </TooltipContent>
            </Tooltip>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-muted-foreground">Container: </span>
        <Select
          onValueChange={(value: any) =>
            updatePreferences({
              ...preferences,
              video: {
                ...video,
                custom: {
                  ...video.custom,
                  videoFormat: {
                    ...video.custom?.videoFormat,
                    mergeOutputFormat: value,
                  },
                },
              },
            })
          }
          value={video.custom?.videoFormat?.mergeOutputFormat}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select container" />
          </SelectTrigger>
          <SelectContent>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="mp4">MP4</SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                  MPEG-4 Part 14
                </p>
                <p>Size: Small</p>
                <p>Compatibility: Excellent</p>
                <p>Processing Mode: Remux (Fast)</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="webm">WEBM</SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                  Web Media File
                </p>
                <p>Size: Small</p>
                <p>Compatibility: Good</p>
                <p>Processing Mode: Remux (Fast)</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="mkv">MKV</SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                  Matroska Video
                </p>
                <p>Size: Medium</p>
                <p>Compatibility: Moderate</p>
                <p>Processing Mode: Remux (Fast)</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="mov">MOV</SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                  Movie (Apple QuickTime File Format)
                </p>
                <p>Size: Large</p>
                <p>Compatibility: Excellent</p>
                <p>Processing Mode: Re-encode</p>
                <p className="text-red-600">
                  Note: Slow, Resource Heavy, Slows down PC
                </p>
              </TooltipContent>
            </Tooltip>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
