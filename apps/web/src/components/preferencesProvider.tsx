"use client";

import { useToast } from "./toastProvider";
import { createContext, useContext, useEffect, useState } from "react";

type Preferences = {
  format: "mp3" | "mp4";
  locationMode: "ask" | "choose";
  downloadLocation: string;
};

type PreferencesContextType = {
  preferences: Preferences;
  updatePreferences: (newPreferences: Partial<Preferences>) => Promise<void>;
  isLoading: boolean;
};

const PreferencesContext = createContext<PreferencesContextType | null>(null);

export const PreferencesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [preferences, setPreferences] = useState<Preferences>({
    format: "mp3",
    locationMode: "ask",
    downloadLocation: "",
  });
  const { error: errorToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
      if (window.electronAPI) {
        try {
          const savedPreferences = await window.electronAPI.getPreferences();
          setPreferences(savedPreferences);
        } catch {
          errorToast({ title: "Failed to load preferences" });
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const updatePreferences = async (newPreferences: Partial<Preferences>) => {
    if (!window.electronAPI) {
      return;
    }

    try {
      const updatedPreferences = { ...preferences, ...newPreferences };
      await window.electronAPI.setPreferences(newPreferences);
      setPreferences(updatedPreferences);
    } catch {
      errorToast({ title: "Failed to update preferences" });
    }
  };

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        isLoading,
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
