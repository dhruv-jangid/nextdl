import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  onUpdateAvailable: (cb) => ipcRenderer.on("update-available", cb),
  onUpdateDownloaded: (cb) => ipcRenderer.on("update-downloaded", cb),
  onUpdateProgress: (cb) =>
    ipcRenderer.on("update-progress", (_e, pct) => cb(pct)),
  onUpdateError: (cb) => ipcRenderer.on("update-error", (_e, err) => cb(err)),
  installUpdate: () => ipcRenderer.send("install-update"),
  chooseFolder: () => ipcRenderer.invoke("chooseFolder"),
  showSaveDialog: (defaultName: string, fileExtension: string) =>
    ipcRenderer.invoke("showSaveDialog", defaultName, fileExtension),
  download: (url, filePath?: string) =>
    ipcRenderer.send("download", url, filePath),
  cancelDownload: () => ipcRenderer.send("cancel-download"),
  onProgress: (cb: (arg0: any) => any) =>
    ipcRenderer.on("download-progress", (_e, pct) => cb(pct)),
  onStatus: (cb: (arg0: any) => any) =>
    ipcRenderer.on("download-status", (_e, msg) => cb(msg)),
  onComplete: (cb: (arg0: any) => any) =>
    ipcRenderer.on("download-complete", (_e, msg) => cb(msg)),
  onError: (cb: (arg0: any) => any) =>
    ipcRenderer.on("download-error", (_e, err) => cb(err)),
  onCancelled: (cb: (arg0: any) => any) =>
    ipcRenderer.on("download-cancelled", (_e, msg) => cb(msg)),
  removeListeners: () => {
    ipcRenderer.removeAllListeners("download-progress");
    ipcRenderer.removeAllListeners("download-status");
    ipcRenderer.removeAllListeners("download-complete");
    ipcRenderer.removeAllListeners("download-error");
    ipcRenderer.removeAllListeners("download-cancelled");
    ipcRenderer.removeAllListeners("update-progress");
    ipcRenderer.removeAllListeners("update-error");
  },
  getPreferences: () => ipcRenderer.invoke("getPreferences"),
  setPreferences: (preferences: any) =>
    ipcRenderer.invoke("setPreferences", preferences),
  openLink: (url: string) => ipcRenderer.invoke("openLink", url),
} as Window["electronAPI"]);
