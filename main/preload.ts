import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  onUpdateAvailable: (cb) => ipcRenderer.on("update-available", cb),
  onUpdateDownloaded: (cb) => ipcRenderer.on("update-downloaded", cb),
  installUpdate: () => ipcRenderer.send("install-update"),
  downloadMp3: (url: any) => ipcRenderer.send("downloadMp3", url),
  downloadMp4: (url: any) => ipcRenderer.send("downloadMp4", url),
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
  },
} satisfies Window["electronAPI"]);
