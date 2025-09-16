"use client";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "./ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const AudioOptions = ({
  preferences,
  updatePreferences,
}: {
  preferences: Preferences;
  updatePreferences: (newPreferences: Preferences) => Promise<void>;
}) => {
  const { audio } = preferences;

  return (
    <>
      <div className="flex items-center gap-1.5">
        <span className="text-muted-foreground">Format: </span>
        <Select
          onValueChange={(value: any) =>
            updatePreferences({
              ...preferences,
              audio: {
                ...audio,
                custom: {
                  ...audio.custom,
                  postProcessing: {
                    ...audio.custom?.postProcessing,
                    audioFormat: value,
                  },
                },
              },
            })
          }
          value={audio.custom?.postProcessing?.audioFormat}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select quality" />
          </SelectTrigger>
          <SelectContent className="w-3xs">
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="best">Best</SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Best available</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="flac">FLAC</SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                  Free Lossless Audio Codec
                </p>
                <p>Size: Medium</p>
                <p>Quality: Lossless</p>
                <p>Compatibility: Good</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="alac">ALAC</SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                  Apple Lossless Audio Codec
                </p>
                <p>Size: Medium</p>
                <p>Quality: Lossless</p>
                <p>Compatibility: Excellent (Apple)</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="wav">WAV</SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                  Waveform Audio File Format
                </p>
                <p>Size: Large (Uncompressed)</p>
                <p>Quality: Lossless (RAW)</p>
                <p>Compatibility: Universal</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="opus">OPUS</SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                  OPUS
                </p>
                <p>Size: Very Small</p>
                <p>Quality: Very High</p>
                <p>Compatibility: Moderate</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="aac">AAC</SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                  Advanced Audio Coding
                </p>
                <p>Size: Small</p>
                <p>Quality: Very High</p>
                <p>Compatibility: Excellent</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="m4a">M4A</SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                  MPEG-4 Audio
                </p>
                <p>Size: Small</p>
                <p>Quality: Very High</p>
                <p>Compatibility: Excellent (Apple)</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="mp3">MP3</SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                  MPEG Audio Layer III
                </p>
                <p>Size: Small</p>
                <p>Quality: Good</p>
                <p>Compatibility: Universal</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value="vorbis">VORBIS</SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                  Ogg Vorbis
                </p>
                <p>Size: Small</p>
                <p>Quality: High</p>
                <p>Compatibility: Moderate</p>
              </TooltipContent>
            </Tooltip>
          </SelectContent>
        </Select>
      </div>
      {audio.custom?.postProcessing?.audioFormat === "mp3" && (
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">Quality: </span>
          <Select
            onValueChange={(value: any) =>
              updatePreferences({
                ...preferences,
                audio: {
                  ...audio,
                  custom: {
                    ...audio.custom,
                    postProcessing: {
                      ...audio.custom?.postProcessing,
                      audioQuality: value,
                    },
                  },
                },
              })
            }
            value={audio.custom?.postProcessing?.audioQuality}
          >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Select quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Best</SelectItem>
              <SelectItem value="320k">320k</SelectItem>
              <SelectItem value="256K">256k</SelectItem>
              <SelectItem value="224K">224k</SelectItem>
              <SelectItem value="192K">192k</SelectItem>
              <SelectItem value="160K">160k</SelectItem>
              <SelectItem value="128K">128k</SelectItem>
              <SelectItem value="96K">96k</SelectItem>
              <SelectItem value="64K">64k</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};
