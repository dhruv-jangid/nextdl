interface Window {
  electronAPI: {
    onUpdateAvailable: (callback: () => void) => void;
    onUpdateDownloaded: (callback: () => void) => void;
    installUpdate: () => void;
    selectDownloadLocation: () => Promise<string | null>;
    showSaveDialog: (
      defaultName: string,
      fileExtension: string
    ) => Promise<string | null>;
    downloadMp3: (url: string, filePath?: string) => void;
    downloadMp4: (url: string, filePath?: string) => void;
    onProgress: (callback: (percent: number) => void) => void;
    onStatus: (callback: (msg: string) => void) => void;
    onComplete: (callback: (msg?: string) => void) => void;
    onError: (callback: (err: string) => void) => void;
    removeListeners: () => void;
    getPreferences: () => Promise<{
      format: "mp3" | "mp4";
      locationMode: "ask" | "choose";
      downloadLocation: string;
    }>;
    setPreferences: (preferences: {
      format?: "mp3" | "mp4";
      locationMode?: "ask" | "choose";
      downloadLocation?: string;
    }) => Promise<boolean>;
  };
}
