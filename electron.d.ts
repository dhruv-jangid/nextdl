interface Window {
  electronAPI: {
    onUpdateAvailable: (callback: () => void) => void;
    onUpdateDownloaded: (callback: () => void) => void;
    installUpdate: () => void;
    downloadMp3: (url: string) => void;
    downloadMp4: (url: string) => void;
    onProgress: (callback: (percent: number) => void) => void;
    onStatus: (callback: (msg: string) => void) => void;
    onComplete: (callback: (msg?: string) => void) => void;
    onError: (callback: (err: string) => void) => void;
    removeListeners: () => void;
  };
}
