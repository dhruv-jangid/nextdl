import path from "path";
import Store from "electron-store";
import { generateArgs } from "./generateArgs";
import { autoUpdater } from "electron-updater";
import { spawn, ChildProcess } from "child_process";
import { getBundledBinary, isValidUrl } from "./utils";
import { app, BrowserWindow, ipcMain, dialog } from "electron/main";

let mainWindow: BrowserWindow;
let currentDownloadProc: ChildProcess | null = null;
let wasCancelled = false;
const isWin = process.platform === "win32";
const YT_DLP = getBundledBinary(isWin ? "yt-dlp.exe" : "yt-dlp");
const FFMPEG = getBundledBinary(isWin ? "ffmpeg.exe" : "ffmpeg");

const store = new Store<Preferences>({
  defaults: {
    type: "audio",
    locationMode: "ask",
    downloadLocation: "",
    preset: "best",
    custom: {
      videoFormat: { format: "bv+ba/best", mergeOutputFormat: "mp4" },
      postProcessing: {
        audioFormat: "best",
        audioQuality: "best",
        ffmpegLocation: FFMPEG,
      },
    },
  },
});

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, "preload.js") },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.once("ready-to-show", () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
};

autoUpdater.on("update-available", () => {
  if (mainWindow) {
    mainWindow.webContents.send("update-available");
  }
});

autoUpdater.on("download-progress", ({ percent }) => {
  if (mainWindow) {
    mainWindow.webContents.send("update-progress", percent);
  }
});

autoUpdater.on("update-downloaded", () => {
  if (mainWindow) {
    mainWindow.webContents.send("update-downloaded");
  }
});

autoUpdater.on("error", (error) => {
  if (mainWindow) {
    mainWindow.webContents.send("update-error", error.message);
  }
});

ipcMain.on("install-update", () => {
  autoUpdater.quitAndInstall();
});

ipcMain.handle("selectDownloadLocation", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
    title: "Select Download Location",
    buttonLabel: "Select",
  });

  if (!canceled && filePaths.length > 0) {
    return filePaths[0];
  } else {
    return null;
  }
});

ipcMain.handle(
  "showSaveDialog",
  async (_, defaultName: string, fileExtension: string) => {
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      title: "Save File As",
      defaultPath: defaultName + fileExtension,
      buttonLabel: "Save",
      filters: [
        {
          name: fileExtension === ".mp3" ? "Audio Files" : "Video Files",
          extensions: [fileExtension.substring(1)],
        },
      ],
    });

    if (!canceled && filePath.length > 0) {
      return filePath;
    } else {
      return null;
    }
  }
);

ipcMain.handle("getPreferences", () => {
  return {
    type: store.get("type"),
    locationMode: store.get("locationMode"),
    downloadLocation: store.get("downloadLocation"),
    preset: store.get("preset"),
    custom: store.get("custom"),
  } as Preferences;
});

ipcMain.handle("setPreferences", (_event, newPreferences: Preferences) => {
  const current: Preferences = {
    type: store.get("type"),
    locationMode: store.get("locationMode"),
    downloadLocation: store.get("downloadLocation"),
    preset: store.get("preset"),
    custom: store.get("custom"),
  } as Preferences;

  const merged: Preferences = {
    ...current,
    ...newPreferences,
    custom: { ...current.custom, ...newPreferences.custom },
  };

  store.set("type", merged.type);
  store.set("locationMode", merged.locationMode);
  store.set("downloadLocation", merged.downloadLocation);
  store.set("preset", merged.preset);
  if (merged.custom) {
    store.set("custom", merged.custom);
  }

  return true;
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("download", (event, url, filePath) => {
  if (!isValidUrl(url)) {
    event.reply("download-error", "Invalid URL");
    return;
  }

  if (!filePath) {
    event.reply("download-error", "No save location selected");
    return;
  }

  let outTemplate: string;
  if (filePath.includes("%(title)s.%(ext)s")) {
    outTemplate = filePath;
  } else {
    const downloadDir = path.dirname(filePath);
    const filename = path.basename(filePath, path.extname(filePath));
    outTemplate = path.join(downloadDir, filename + ".%(ext)s");
  }

  const preferences: Preferences = {
    type: store.get("type"),
    downloadLocation: store.get("downloadLocation"),
    locationMode: store.get("locationMode"),
    preset: store.get("preset"),
    custom: { ...store.get("custom"), filesystem: { output: outTemplate } },
  };

  let proc;
  try {
    proc = spawn(YT_DLP, generateArgs({ preferences, url }), {
      windowsHide: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      event.reply("download-error", `Failed to spawn yt-dlp: ${error.message}`);
    } else {
      event.reply("download-error", "Failed to load yt-dlp");
    }
    return;
  }

  currentDownloadProc = proc;
  wasCancelled = false;

  let lastPercent = -1;
  const handleChunk = (chunk: { toString: () => any }) => {
    if (!mainWindow) return;

    const raw = chunk.toString();
    let cleaned = raw
      .replace(/\x1B\[[0-?]*[ -\/]*[@-~]/g, "")
      .replace(/\r/g, "\n");
    const lines = cleaned.split(/\n/);

    for (let line of lines) {
      if (!line) continue;
      const text = line.trim();
      if (!text) continue;

      const percentMatch = text.match(/(\d+(?:\.\d+)?)%/);
      const lineWithoutBracket = text.replace(/^\[download\]\s*/i, "").trim();
      const percent = percentMatch ? parseFloat(percentMatch[1]) : undefined;
      const withoutPercent = lineWithoutBracket
        .replace(/(\d+(?:\.\d+)?)%/, "")
        .trim();

      const sizeMatch = withoutPercent.match(
        /of\s+([\d\.]+\s*(?:KiB|MiB|GiB|TiB|KB|MB|GB|TB))/i
      );
      const speedMatch = withoutPercent.match(
        /at\s+([^\s]+\s*(?:KiB|MiB|GiB|KB|MB|GB)\/?s)/i
      );
      const etaMatch = withoutPercent.match(
        /ETA\s+([0-9]{2}:[0-9]{2}(?::[0-9]{2})?)/i
      );

      let status = lineWithoutBracket;
      if (/Destination:/i.test(lineWithoutBracket)) status = "Preparing";
      else if (/ETA/i.test(lineWithoutBracket)) status = "Downloading";
      else if (/100%/i.test(lineWithoutBracket)) status = "Finalizing";

      const statusPayload: DownloadStatus = {
        status,
        progress:
          typeof percent === "number" && !isNaN(percent) ? percent : undefined,
        size: sizeMatch ? sizeMatch[1] : undefined,
        speed: speedMatch ? speedMatch[1] : undefined,
        eta: etaMatch ? etaMatch[1] : undefined,
      };

      if (
        typeof statusPayload.progress === "number" &&
        Math.abs(statusPayload.progress - lastPercent) >= 0.1
      ) {
        lastPercent = statusPayload.progress;
        mainWindow.webContents.send(
          "download-progress",
          statusPayload.progress
        );
      }

      mainWindow.webContents.send("download-status", statusPayload);
    }
  };

  proc.stdout.on("data", handleChunk);
  proc.stderr.on("data", handleChunk);

  proc.on("close", (code) => {
    if (wasCancelled) {
      mainWindow.webContents.send("download-cancelled", "Download cancelled");
    } else if (code === 0) {
      mainWindow.webContents.send("download-progress", 100);
      mainWindow.webContents.send("download-complete", "File Downloaded");
    } else {
      mainWindow.webContents.send(
        "download-error",
        `yt-dlp exited with code ${code}`
      );
    }
    currentDownloadProc = null;
  });

  proc.on("error", (error) => {
    mainWindow.webContents.send("download-error", error.message);
  });
});

ipcMain.on("cancel-download", () => {
  if (currentDownloadProc) {
    wasCancelled = true;
    mainWindow.webContents.send("download-status", { status: "Cancelling" });

    const killProcess = () => {
      try {
        if (process.platform === "win32") {
          spawn("taskkill", [
            "/pid",
            currentDownloadProc!.pid!.toString(),
            "/T",
            "/F",
          ]);
        } else {
          currentDownloadProc!.kill("SIGTERM");

          setTimeout(() => {
            if (currentDownloadProc) {
              try {
                currentDownloadProc.kill("SIGKILL");
              } catch {}
            }
          }, 2000);
        }
      } catch (error) {
        console.error("Error killing process:", error);
      }
    };

    killProcess();

    setTimeout(() => {
      if (currentDownloadProc) {
        currentDownloadProc = null;
      }
    }, 3000);
  }
});
