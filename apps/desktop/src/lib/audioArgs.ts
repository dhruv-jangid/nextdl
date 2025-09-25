export const audioArgs = ({
  preferences,
  url,
}: {
  preferences: AudioPreferences;
  url: string;
}): string[] => {
  const args: string[] = [];
  const { preset, custom } = preferences;

  // Mandatory fields validation
  const FFMPEG = custom?.postProcessing?.ffmpegLocation;
  const OUTPUTDIR = custom?.filesystem?.output;
  if (!FFMPEG || !OUTPUTDIR) {
    throw new Error(
      "FFMPEG location and output directory are mandatory for custom preferences"
    );
  }
  args.push("--ffmpeg-location", FFMPEG);
  args.push("--output", OUTPUTDIR);

  // Handle preset "best" configuration for audio
  if (preset === "best") {
    args.push(
      "-f",
      "bestaudio/best",
      "--extract-audio",
      "--audio-quality",
      "0",
      "--embed-thumbnail",
      "--embed-metadata",
      "--embed-chapters",
      "--embed-info-json",
      "--xattrs",
      "--add-metadata",
      "--force-keyframes-at-cuts"
    );

    args.push(url);
    return args;
  }

  // Custom preferences processing for audio

  if (custom) {
    // Audio-specific defaults for custom
    if (!custom.postProcessing?.audioFormat) {
      args.push("-f", "bestaudio/best");
      if (!custom.postProcessing?.audioQuality) {
        args.push("--audio-quality", "0");
      }
    } else {
      // Ensure extract-audio is set when a format is specified
      if (!custom.postProcessing?.extractAudio) {
        args.push("--extract-audio");
      }
    }

    // GENERAL OPTIONS
    if (custom.general) {
      const g = custom.general;
      if (g.help) args.push("--help");
      if (g.version) args.push("--version");
      if (g.update) args.push("--update");
      if (g.noUpdate) args.push("--no-update");
      if (g.updateTo) args.push("--update-to", g.updateTo);
      if (g.ignoreErrors) args.push("--ignore-errors");
      if (g.abortOnError) args.push("--abort-on-error");
      if (g.noAbortOnError) args.push("--no-abort-on-error");
      if (g.dumpUserAgent) args.push("--dump-user-agent");
      if (g.listExtractors) args.push("--list-extractors");
      if (g.extractorDescriptions) args.push("--extractor-descriptions");
      if (g.useExtractors) args.push("--use-extractors", g.useExtractors);
      if (g.defaultSearch) args.push("--default-search", g.defaultSearch);
      if (g.ignoreConfig) args.push("--ignore-config");
      if (g.noConfigLocations) args.push("--no-config-locations");
      if (g.configLocations) args.push("--config-locations", g.configLocations);
      if (g.pluginDirs) args.push("--plugin-dirs", g.pluginDirs);
      if (g.noPluginDirs) args.push("--no-plugin-dirs");
      if (g.flatPlaylist) args.push("--flat-playlist");
      if (g.noFlatPlaylist) args.push("--no-flat-playlist");
      if (g.liveFromStart) args.push("--live-from-start");
      if (g.noLiveFromStart) args.push("--no-live-from-start");
      if (g.waitForVideo) args.push("--wait-for-video", g.waitForVideo);
      if (g.noWaitForVideo) args.push("--no-wait-for-video");
      if (g.markWatched) args.push("--mark-watched");
      if (g.noMarkWatched) args.push("--no-mark-watched");
      if (g.color) args.push("--color", g.color);
      if (g.compatOptions) args.push("--compat-options", g.compatOptions);
      if (g.alias) args.push("--alias", g.alias);
      if (g.presetAlias) args.push("--preset-alias", g.presetAlias);
    }

    // NETWORK OPTIONS
    if (custom.network) {
      const n = custom.network;
      if (n.proxy) args.push("--proxy", n.proxy);
      if (n.socketTimeout !== undefined)
        args.push("--socket-timeout", n.socketTimeout.toString());
      if (n.sourceAddress) args.push("--source-address", n.sourceAddress);
      if (n.impersonate) args.push("--impersonate", n.impersonate);
      if (n.listImpersonateTargets) args.push("--list-impersonate-targets");
      if (n.forceIpv4) args.push("--force-ipv4");
      if (n.forceIpv6) args.push("--force-ipv6");
      if (n.enableFileUrls) args.push("--enable-file-urls");
    }

    // GEO RESTRICTION
    if (custom.geoRestriction) {
      const gr = custom.geoRestriction;
      if (gr.geoVerificationProxy)
        args.push("--geo-verification-proxy", gr.geoVerificationProxy);
      if (gr.xff) args.push("--xff", gr.xff);
    }

    // VIDEO SELECTION
    if (custom.videoSelection) {
      const vs = custom.videoSelection;
      if (vs.playlistItems) args.push("--playlist-items", vs.playlistItems);
      if (vs.minFilesize) args.push("--min-filesize", vs.minFilesize);
      if (vs.maxFilesize) args.push("--max-filesize", vs.maxFilesize);
      if (vs.date) args.push("--date", vs.date);
      if (vs.datebefore) args.push("--datebefore", vs.datebefore);
      if (vs.dateafter) args.push("--dateafter", vs.dateafter);
      if (vs.matchFilters) args.push("--match-filters", vs.matchFilters);
      if (vs.noMatchFilters) args.push("--no-match-filters");
      if (vs.breakMatchFilters)
        args.push("--break-match-filters", vs.breakMatchFilters);
      if (vs.noBreakMatchFilters) args.push("--no-break-match-filters");
      if (vs.noPlaylist) args.push("--no-playlist");
      if (vs.yesPlaylist) args.push("--yes-playlist");
      if (vs.ageLimit !== undefined)
        args.push("--age-limit", vs.ageLimit.toString());
      if (vs.downloadArchive)
        args.push("--download-archive", vs.downloadArchive);
      if (vs.noDownloadArchive) args.push("--no-download-archive");
      if (vs.maxDownloads !== undefined)
        args.push("--max-downloads", vs.maxDownloads.toString());
      if (vs.breakOnExisting) args.push("--break-on-existing");
      if (vs.noBreakOnExisting) args.push("--no-break-on-existing");
      if (vs.breakPerInput) args.push("--break-per-input");
      if (vs.noBreakPerInput) args.push("--no-break-per-input");
      if (vs.skipPlaylistAfterErrors !== undefined) {
        args.push(
          "--skip-playlist-after-errors",
          vs.skipPlaylistAfterErrors.toString()
        );
      }
    }

    // DOWNLOAD OPTIONS
    if (custom.download) {
      const d = custom.download;
      if (d.concurrentFragments !== undefined)
        args.push("--concurrent-fragments", d.concurrentFragments.toString());
      if (d.limitRate) args.push("--limit-rate", d.limitRate);
      if (d.throttledRate) args.push("--throttled-rate", d.throttledRate);
      if (d.retries !== undefined) args.push("--retries", d.retries.toString());
      if (d.fileAccessRetries !== undefined)
        args.push("--file-access-retries", d.fileAccessRetries.toString());
      if (d.fragmentRetries !== undefined)
        args.push("--fragment-retries", d.fragmentRetries.toString());
      if (d.retrySleep) args.push("--retry-sleep", d.retrySleep);
      if (d.skipUnavailableFragments) args.push("--skip-unavailable-fragments");
      if (d.abortOnUnavailableFragments)
        args.push("--abort-on-unavailable-fragments");
      if (d.keepFragments) args.push("--keep-fragments");
      if (d.noKeepFragments) args.push("--no-keep-fragments");
      if (d.bufferSize) args.push("--buffer-size", d.bufferSize);
      if (d.resizeBuffer) args.push("--resize-buffer");
      if (d.noResizeBuffer) args.push("--no-resize-buffer");
      if (d.httpChunkSize) args.push("--http-chunk-size", d.httpChunkSize);
      if (d.playlistRandom) args.push("--playlist-random");
      if (d.lazyPlaylist) args.push("--lazy-playlist");
      if (d.noLazyPlaylist) args.push("--no-lazy-playlist");
      if (d.xattrSetFilesize) args.push("--xattr-set-filesize");
      if (d.hlsUseMpegts) args.push("--hls-use-mpegts");
      if (d.noHlsUseMpegts) args.push("--no-hls-use-mpegts");
      if (d.downloadSections)
        args.push("--download-sections", d.downloadSections);
      if (d.downloader) args.push("--downloader", d.downloader);
      if (d.downloaderArgs) args.push("--downloader-args", d.downloaderArgs);
    }

    // FILESYSTEM OPTIONS
    if (custom.filesystem) {
      const fs = custom.filesystem;
      if (fs.batchFile) args.push("--batch-file", fs.batchFile);
      if (fs.noBatchFile) args.push("--no-batch-file");
      if (fs.restrictFilenames) args.push("--restrict-filenames");
      if (fs.noRestrictFilenames) args.push("--no-restrict-filenames");
      if (fs.windowsFilenames) args.push("--windows-filenames");
      if (fs.noWindowsFilenames) args.push("--no-windows-filenames");
      if (fs.trimFilenames !== undefined)
        args.push("--trim-filenames", fs.trimFilenames.toString());
      if (fs.noOverwrites) args.push("--no-overwrites");
      if (fs.forceOverwrites) args.push("--force-overwrites");
      if (fs.noForceOverwrites) args.push("--no-force-overwrites");
      if (fs.continue) args.push("--continue");
      if (fs.noContinue) args.push("--no-continue");
      if (fs.part) args.push("--part");
      if (fs.noPart) args.push("--no-part");
      if (fs.mtime) args.push("--mtime");
      if (fs.noMtime) args.push("--no-mtime");
      if (fs.writeDescription) args.push("--write-description");
      if (fs.noWriteDescription) args.push("--no-write-description");
      if (fs.writeInfoJson) args.push("--write-info-json");
      if (fs.noWriteInfoJson) args.push("--no-write-info-json");
      if (fs.writePlaylistMetafiles) args.push("--write-playlist-metafiles");
      if (fs.noWritePlaylistMetafiles)
        args.push("--no-write-playlist-metafiles");
      if (fs.cleanInfoJson) args.push("--clean-info-json");
      if (fs.noCleanInfoJson) args.push("--no-clean-info-json");
      if (fs.writeComments) args.push("--write-comments");
      if (fs.noWriteComments) args.push("--no-write-comments");
      if (fs.loadInfoJson) args.push("--load-info-json", fs.loadInfoJson);
      if (fs.cookies) args.push("--cookies", fs.cookies);
      if (fs.noCookies) args.push("--no-cookies");
      if (fs.cookiesFromBrowser)
        args.push("--cookies-from-browser", fs.cookiesFromBrowser);
      if (fs.noCookiesFromBrowser) args.push("--no-cookies-from-browser");
      if (fs.cacheDir) args.push("--cache-dir", fs.cacheDir);
      if (fs.noCacheDir) args.push("--no-cache-dir");
      if (fs.rmCacheDir) args.push("--rm-cache-dir");
    }

    // AUDIO POST-PROCESSING
    if (custom.postProcessing) {
      const pp = custom.postProcessing;
      if (pp.extractAudio) args.push("--extract-audio");
      if (pp.audioFormat) args.push("--audio-format", pp.audioFormat);
      if (pp.audioQuality) args.push("--audio-quality", pp.audioQuality);
      if (pp.postprocessorArgs)
        args.push("--postprocessor-args", pp.postprocessorArgs);
      if (pp.keepVideo) args.push("--keep-video");
      if (pp.noKeepVideo) args.push("--no-keep-video");
      if (pp.postOverwrites) args.push("--post-overwrites");
      if (pp.noPostOverwrites) args.push("--no-post-overwrites");
      if (pp.embedThumbnail) args.push("--embed-thumbnail");
      if (pp.noEmbedThumbnail) args.push("--no-embed-thumbnail");
      if (pp.embedMetadata) args.push("--embed-metadata");
      if (pp.noEmbedMetadata) args.push("--no-embed-metadata");
      if (pp.embedChapters) args.push("--embed-chapters");
      if (pp.noEmbedChapters) args.push("--no-embed-chapters");
      if (pp.embedInfoJson) args.push("--embed-info-json");
      if (pp.noEmbedInfoJson) args.push("--no-embed-info-json");
      if (pp.parseMetadata) args.push("--parse-metadata", pp.parseMetadata);
      if (pp.replaceInMetadata)
        args.push("--replace-in-metadata", pp.replaceInMetadata);
      if (pp.xattrs) args.push("--xattrs");
      if (pp.concatPlaylist) args.push("--concat-playlist", pp.concatPlaylist);
      if (pp.fixup) args.push("--fixup", pp.fixup);
      if (pp.exec) args.push("--exec", pp.exec);
      if (pp.noExec) args.push("--no-exec");
      if (pp.splitChapters) args.push("--split-chapters");
      if (pp.noSplitChapters) args.push("--no-split-chapters");
      if (pp.removeChapters) args.push("--remove-chapters", pp.removeChapters);
      if (pp.noRemoveChapters) args.push("--no-remove-chapters");
      if (pp.forceKeyframesAtCuts) args.push("--force-keyframes-at-cuts");
      if (pp.noForceKeyframesAtCuts) args.push("--no-force-keyframes-at-cuts");
      if (pp.usePostprocessor)
        args.push("--use-postprocessor", pp.usePostprocessor);
    }
  }

  // RAW ARGS & OPTIONS
  if (custom.rawArgs) {
    args.push(...custom.rawArgs);
  }

  if (custom.rawOptions) {
    for (const [key, value] of Object.entries(custom.rawOptions)) {
      if (typeof value === "boolean") {
        if (value) args.push(`--${key}`);
      } else {
        args.push(`--${key}`, value.toString());
      }
    }
  }

  // Add URL at the end for custom preset
  args.push(url);

  return args;
};
