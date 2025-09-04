import { get } from "https";
import { join } from "path";
import { tmpdir } from "os";
import AdmZip from "adm-zip";
import { createWriteStream } from "fs";
import { mkdir, rm } from "fs/promises";

const BIN_DIR = "apps/desktop/src/binaries";

async function download(url: string, dest: string): Promise<void> {
  await mkdir(BIN_DIR, { recursive: true });

  return new Promise((resolve, reject) => {
    console.log(`Downloading ${url}`);
    const file = createWriteStream(dest);

    const doRequest = (link: string) => {
      get(link, (res) => {
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          doRequest(res.headers.location);
          return;
        }

        if (res.statusCode !== 200) {
          reject(
            new Error(`Failed to download: ${link} (status ${res.statusCode})`)
          );
          return;
        }

        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      }).on("error", reject);
    };

    doRequest(url);
  });
}

async function downloadYtDlp(): Promise<void> {
  const url =
    "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe";
  const dest = join(BIN_DIR, "yt-dlp.exe");
  await download(url, dest);
}

async function downloadFfmpeg(): Promise<void> {
  const url =
    "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip";
  const tmpZip = join(tmpdir(), "ffmpeg.zip");

  await download(url, tmpZip);

  console.log("Extracting ffmpeg & ffprobe");
  const zip = new AdmZip(tmpZip);
  const entries = zip.getEntries();

  for (const name of ["ffmpeg.exe", "ffprobe.exe"]) {
    const entry = entries.find((e) => e.entryName.endsWith(name));
    if (entry) {
      zip.extractEntryTo(entry.entryName, BIN_DIR, false, true);
      console.log(`Extracted ${name}`);
    }
  }

  await rm(tmpZip);
}

async function main(): Promise<void> {
  await rm(BIN_DIR, { recursive: true, force: true });
  await mkdir(BIN_DIR, { recursive: true });

  await downloadYtDlp();
  await downloadFfmpeg();
  console.log("All binaries downloaded into", BIN_DIR);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
