import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  onUpdateAvailable: (cb) => ipcRenderer.on("update-available", cb),
  onUpdateDownloaded: (cb) => ipcRenderer.on("update-downloaded", cb),
  onUpdateProgress: (cb) =>
    ipcRenderer.on("update-progress", (_e: any, pct: any) => cb(pct)),
  onUpdateError: (cb) =>
    ipcRenderer.on("update-error", (_e: any, err: any) => cb(err)),
  installUpdate: () => ipcRenderer.send("install-update"),
  selectDownloadLocation: () => ipcRenderer.invoke("selectDownloadLocation"),
  showSaveDialog: (defaultName: string, fileExtension: string) =>
    ipcRenderer.invoke("showSaveDialog", defaultName, fileExtension),
  downloadMp3: (url: any, filePath?: string) =>
    ipcRenderer.send("downloadMp3", url, filePath),
  downloadMp4: (url: any, filePath?: string) =>
    ipcRenderer.send("downloadMp4", url, filePath),
  onProgress: (cb: (arg0: any) => any) =>
    ipcRenderer.on("download-progress", (_e: any, pct: any) => cb(pct)),
  onStatus: (cb: (arg0: any) => any) =>
    ipcRenderer.on("download-status", (_e: any, msg: any) => cb(msg)),
  onComplete: (cb: (arg0: any) => any) =>
    ipcRenderer.on("download-complete", (_e: any, msg: any) => cb(msg)),
  onError: (cb: (arg0: any) => any) =>
    ipcRenderer.on("download-error", (_e: any, err: any) => cb(err)),
  removeListeners: () => {
    ipcRenderer.removeAllListeners("download-progress");
    ipcRenderer.removeAllListeners("download-status");
    ipcRenderer.removeAllListeners("download-complete");
    ipcRenderer.removeAllListeners("download-error");
    ipcRenderer.removeAllListeners("update-progress");
    ipcRenderer.removeAllListeners("update-error");
  },
  getPreferences: () => ipcRenderer.invoke("getPreferences"),
  setPreferences: (preferences: any) =>
    ipcRenderer.invoke("setPreferences", preferences),
} satisfies Window["electronAPI"]);
