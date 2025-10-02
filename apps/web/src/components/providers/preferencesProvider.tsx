"use client";

import { toast } from "sonner";
import { createContext, useContext, useEffect, useState } from "react";

const PreferencesContext = createContext<{
  preferences: Preferences;
  updatePreferences: (newPreferences: Preferences) => Promise<void>;
  prefLoading: boolean;
} | null>(null);

export const PreferencesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [preferences, setPreferences] = useState<Preferences>({
    type: "audio",
    downloadMode: "ask",
    downloadDir: "",
    cookiesDir: "",
    audio: {
      preset: "best",
      custom: {
        postProcessing: {
          extractAudio: true,
          audioFormat: "best",
          audioQuality: "0",
        },
      },
    },
    video: {
      preset: "best",
      custom: {
        videoFormat: {
          format: "bv+ba/best",
          mergeOutputFormat: "mp4",
        },
      },
    },
  });
  const [prefLoading, setPrefLoading] = useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
      if (window.electronAPI) {
        try {
          const savedPreferences = await window.electronAPI.getPreferences();
          setPreferences(savedPreferences);
        } catch {
          toast.error("Failed to load preferences");
        } finally {
          setPrefLoading(false);
        }
      } else {
        setPrefLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const updatePreferences = async (newPreferences: Preferences) => {
    if (!window.electronAPI) {
      toast.warning("NO ELECTRON API");
      return;
    }

    try {
      const updatedPreferences = { ...preferences, ...newPreferences };
      await window.electronAPI.setPreferences(newPreferences);
      setPreferences(updatedPreferences);
    } catch {
      toast.error("Failed to update preferences");
    }
  };

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        prefLoading,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
};
