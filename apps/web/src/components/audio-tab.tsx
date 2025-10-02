"use client";

import { Card, CardContent } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { RadioToggleGroup, ToggleGroupItem } from "./ui/radio-toggle-group";

export const AudioTab = ({
  preferences,
  updatePreferences,
}: {
  preferences: Preferences;
  updatePreferences: (newPreferences: Preferences) => Promise<void>;
}) => {
  const { audio } = preferences;
  const isBest = audio.preset === "best";

  return (
    <Card>
      <CardContent className="grid gap-6">
        <div className="grid gap-1">
          <span>Preset</span>
          <RadioToggleGroup
            value={preferences.audio.preset}
            onValueChange={(value) =>
              updatePreferences({
                ...preferences,
                audio: {
                  ...audio,
                  preset: value as AudioPreferences["preset"],
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
          <span className={`${isBest && "opacity-50"}`}>Format</span>
          <RadioToggleGroup
            disabled={isBest}
            value={audio.custom?.postProcessing?.audioFormat}
            onValueChange={(value) =>
              updatePreferences({
                ...preferences,
                audio: {
                  ...audio,
                  custom: {
                    ...audio.custom,
                    postProcessing: {
                      ...audio.custom?.postProcessing,
                      audioFormat: value as any,
                    },
                  },
                },
              })
            }
          >
            <ToggleGroupItem value="best" aria-label="Toggle best">
              <Tooltip>
                <TooltipTrigger>Best</TooltipTrigger>
                <TooltipContent>
                  <p>Best available</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem value="flac" aria-label="Toggle flac">
              <Tooltip>
                <TooltipTrigger>FLAC</TooltipTrigger>
                <TooltipContent>
                  <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                    Free Lossless Audio Codec
                  </p>
                  <p>Size: Medium</p>
                  <p>Quality: Lossless</p>
                  <p>Compatibility: Good</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem value="alac" aria-label="Toggle alac">
              <Tooltip>
                <TooltipTrigger>ALAC</TooltipTrigger>
                <TooltipContent>
                  <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                    Apple Lossless Audio Codec
                  </p>
                  <p>Size: Medium</p>
                  <p>Quality: Lossless</p>
                  <p>Compatibility: Excellent (Apple)</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem value="wav" aria-label="Toggle wav">
              <Tooltip>
                <TooltipTrigger>WAV</TooltipTrigger>
                <TooltipContent>
                  <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                    Waveform Audio File Format
                  </p>
                  <p>Size: Large (Uncompressed)</p>
                  <p>Quality: Lossless (RAW)</p>
                  <p>Compatibility: Universal</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem value="opus" aria-label="Toggle opus">
              <Tooltip>
                <TooltipTrigger>OPUS</TooltipTrigger>
                <TooltipContent>
                  <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                    OPUS
                  </p>
                  <p>Size: Very Small</p>
                  <p>Quality: Very High</p>
                  <p>Compatibility: Moderate</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem value="aac" aria-label="Toggle aac">
              <Tooltip>
                <TooltipTrigger>AAC</TooltipTrigger>
                <TooltipContent>
                  <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                    Advanced Audio Coding
                  </p>
                  <p>Size: Small</p>
                  <p>Quality: Very High</p>
                  <p>Compatibility: Excellent</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem value="m4a" aria-label="Toggle m4a">
              <Tooltip>
                <TooltipTrigger>M4A</TooltipTrigger>
                <TooltipContent>
                  <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                    MPEG-4 Audio
                  </p>
                  <p>Size: Small</p>
                  <p>Quality: Very High</p>
                  <p>Compatibility: Excellent (Apple)</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem value="mp3" aria-label="Toggle mp3">
              <Tooltip>
                <TooltipTrigger>MP3</TooltipTrigger>
                <TooltipContent>
                  <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                    MPEG Audio Layer III
                  </p>
                  <p>Size: Small</p>
                  <p>Quality: Good</p>
                  <p>Compatibility: Universal</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem value="vorbis" aria-label="Toggle vorbis">
              <Tooltip>
                <TooltipTrigger>VORBIS</TooltipTrigger>
                <TooltipContent>
                  <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
                    Ogg Vorbis
                  </p>
                  <p>Size: Small</p>
                  <p>Quality: High</p>
                  <p>Compatibility: Moderate</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
          </RadioToggleGroup>
        </div>
        <div className="grid gap-1">
          <span className={`${isBest && "opacity-50"}`}>Quality</span>
          <RadioToggleGroup
            disabled={
              isBest || audio.custom?.postProcessing?.audioFormat !== "mp3"
            }
            value={audio.custom?.postProcessing?.audioQuality}
            onValueChange={(value) =>
              updatePreferences({
                ...preferences,
                audio: {
                  ...audio,
                  custom: {
                    ...audio.custom,
                    postProcessing: {
                      ...audio.custom?.postProcessing,
                      audioQuality: value as any,
                    },
                  },
                },
              })
            }
          >
            <ToggleGroupItem value="0" aria-label="Toggle 0">
              Best
            </ToggleGroupItem>
            <ToggleGroupItem value="320k" aria-label="Toggle 320k">
              320k
            </ToggleGroupItem>
            <ToggleGroupItem value="256k" aria-label="Toggle 256k">
              256k
            </ToggleGroupItem>
            <ToggleGroupItem value="224K" aria-label="Toggle 224K">
              224K
            </ToggleGroupItem>
            <ToggleGroupItem value="192K" aria-label="Toggle 192K">
              192K
            </ToggleGroupItem>
            <ToggleGroupItem value="160K" aria-label="Toggle 160K">
              160K
            </ToggleGroupItem>
            <ToggleGroupItem value="128K" aria-label="Toggle 128K">
              128K
            </ToggleGroupItem>
            <ToggleGroupItem value="96K" aria-label="Toggle 96K">
              96K
            </ToggleGroupItem>
            <ToggleGroupItem value="64K" aria-label="Toggle 64K">
              64K
            </ToggleGroupItem>
          </RadioToggleGroup>
        </div>
      </CardContent>
    </Card>
  );
};
