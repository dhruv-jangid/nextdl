"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Preferences {
  format: "mp3" | "mp4";
  locationMode: "ask" | "choose";
  downloadLocation: string;
}

interface PreferencesContextType {
  preferences: Preferences;
  updatePreferences: (newPreferences: Partial<Preferences>) => Promise<void>;
  isLoading: boolean;
}

const defaultPreferences: Preferences = {
  format: "mp3",
  locationMode: "ask",
  downloadLocation: "",
};

const PreferencesContext = createContext<PreferencesContextType | null>(null);

export const PreferencesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [preferences, setPreferences] =
    useState<Preferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
      if (window.electronAPI) {
        try {
          const savedPreferences = await window.electronAPI.getPreferences();
          setPreferences(savedPreferences);
        } catch (error) {
          console.error("Failed to load preferences:", error);
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
    if (!window.electronAPI) return;

    try {
      const updatedPreferences = { ...preferences, ...newPreferences };
      await window.electronAPI.setPreferences(newPreferences);
      setPreferences(updatedPreferences);
    } catch (error) {
      console.error("Failed to save preferences:", error);
    }
  };

  const value: PreferencesContextType = {
    preferences,
    updatePreferences,
    isLoading,
  };

  return (
    <PreferencesContext.Provider value={value}>
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
