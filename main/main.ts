import {
  isValidUrl,
  bestAudioArgs,
  bestVideoArgs,
  getBundledBinary,
} from "./utils";
import os from "os";
import path from "path";
import { spawn } from "child_process";
import { autoUpdater } from "electron-updater";
import { app, BrowserWindow, ipcMain } from "electron/main";

let mainWindow: BrowserWindow;
const isWin = process.platform === "win32";
const YT_DLP = getBundledBinary(isWin ? "yt-dlp.exe" : "yt-dlp");
const FFMPEG = getBundledBinary(isWin ? "ffmpeg.exe" : "ffmpeg");
const DOWNLOAD_DIR = path.join(os.homedir(), "Downloads");
const outTemplate = path.join(DOWNLOAD_DIR, "%(title)s.%(ext)s");

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: { preload: path.join(__dirname, "preload.js") },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.once("ready-to-show", () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

autoUpdater.on("update-available", () => {
  if (mainWindow) {
    mainWindow.webContents.send("update-available");
  }
});

autoUpdater.on("update-downloaded", () => {
  if (mainWindow) {
    mainWindow.webContents.send("update-downloaded");
  }
});

ipcMain.on("install-update", () => {
  autoUpdater.quitAndInstall();
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("downloadMp4", (event, url) => {
  if (!isValidUrl(url)) {
    event.reply("download-error", "Invalid URL");
    return;
  }

  let proc;
  try {
    proc = spawn(YT_DLP, bestVideoArgs(url, outTemplate, FFMPEG), {
      windowsHide: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      event.reply("download-error", `Failed to spawn yt-dlp: ${error.message}`);
    } else {
      event.reply("download-error", "Something went wrong");
    }
    return;
  }

  let lastPercent = -1;
  const handleChunk = (chunk: { toString: () => any }) => {
    const raw = chunk.toString();
    let cleaned = raw
      .replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, "")
      .replace(/\r/g, "\n");
    const lines = cleaned.split(/\n/);

    for (let line of lines) {
      if (!line) continue;
      const text = line.trim();
      if (!text) continue;

      const m = text.match(/(\d+(?:\.\d+)?)%/);
      if (m) {
        const pct = parseFloat(m[1]);
        if (!isNaN(pct) && Math.abs(pct - lastPercent) >= 0.1) {
          lastPercent = pct;
          mainWindow.webContents.send("download-progress", pct);
        }
        const lineWithoutPercent = text.replace(/(\d+(?:\.\d+)?)%/, "").trim();
        if (lineWithoutPercent) {
          mainWindow.webContents.send("download-status", lineWithoutPercent);
        }
      } else {
        const status = text.replace(/^\[download\]\s*/i, "").trim();
        if (status) {
          mainWindow.webContents.send("download-status", status);
        }
      }
    }
  };

  proc.stdout.on("data", handleChunk);
  proc.stderr.on("data", handleChunk);

  proc.on("close", (code) => {
    if (code === 0) {
      mainWindow.webContents.send("download-progress", 100);
      mainWindow.webContents.send("download-complete", "MP4 Downloaded");
    } else {
      mainWindow.webContents.send(
        "download-error",
        `yt-dlp exited with code ${code}`
      );
    }
  });

  proc.on("error", (err) => {
    mainWindow.webContents.send("download-error", err.message);
  });
});

ipcMain.on("downloadMp3", (event, url) => {
  if (!isValidUrl(url)) {
    event.reply("download-error", "Invalid URL");
    return;
  }

  let proc;
  try {
    proc = spawn(YT_DLP, bestAudioArgs(url, outTemplate, FFMPEG), {
      windowsHide: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      event.reply("download-error", `Failed to spawn yt-dlp: ${error.message}`);
    } else {
      event.reply("download-error", "Something went wrong");
    }
    return;
  }

  let lastPercent = -1;
  const handleChunk = (chunk: { toString: () => any }) => {
    if (!mainWindow) return;

    const raw = chunk.toString();
    let cleaned = raw
      .replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, "")
      .replace(/\r/g, "\n");
    const lines = cleaned.split(/\n/);

    for (let line of lines) {
      if (!line) continue;
      const text = line.trim();
      if (!text) continue;

      const m = text.match(/(\d+(?:\.\d+)?)%/);
      if (m) {
        const pct = parseFloat(m[1]);
        if (!isNaN(pct) && Math.abs(pct - lastPercent) >= 0.1) {
          lastPercent = pct;
          mainWindow.webContents.send("download-progress", pct);
        }
        const lineWithoutPercent = text.replace(/(\d+(?:\.\d+)?)%/, "").trim();
        if (lineWithoutPercent) {
          mainWindow.webContents.send("download-status", lineWithoutPercent);
        }
      } else {
        const status = text.replace(/^\[download\]\s*/i, "").trim();
        if (status) {
          mainWindow.webContents.send("download-status", status);
        }
      }
    }
  };

  proc.stdout.on("data", handleChunk);
  proc.stderr.on("data", handleChunk);

  proc.on("close", (code) => {
    if (code === 0) {
      mainWindow.webContents.send("download-progress", 100);
      mainWindow.webContents.send("download-complete", "MP3 Downloaded");
    } else {
      mainWindow.webContents.send(
        "download-error",
        `yt-dlp exited with code ${code}`
      );
    }
  });

  proc.on("error", (error) => {
    mainWindow.webContents.send("download-error", error.message);
  });
});
