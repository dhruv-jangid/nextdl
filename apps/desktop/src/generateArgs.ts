export const generateArgs = ({
  preferences,
  url,
}: {
  preferences: Preferences;
  url: string;
}): string[] => {
  const args: string[] = [];

  const FFMPEG = preferences.custom?.postProcessing?.ffmpegLocation;
  const OUTPUTDIR = preferences.custom?.filesystem?.output;
  if (!FFMPEG || !OUTPUTDIR) {
    throw new Error("FFMPEG & OUTPUTDIR are mandatory");
  }
  args.push("--ffmpeg-location", FFMPEG);
  args.push("--output", OUTPUTDIR);

  // Handle preset "best" configuration based on type
  if (preferences.preset === "best") {
    if (preferences.type === "audio") {
      // Best audio configuration
      args.push("-f", "bestaudio/best");
      args.push("--extract-audio");
      args.push("--audio-format", "mp3");
      args.push("--audio-quality", "0"); // Best quality
      args.push("--embed-metadata");
      args.push("--embed-thumbnail");
    } else if (preferences.type === "video") {
      // Best video configuration
      args.push("-f", "bestvideo+bestaudio/best");
      args.push("--merge-output-format", "mp4");
      args.push("--embed-metadata");
      args.push("--embed-thumbnail");
      args.push("--embed-subs");
      args.push("--write-subs");
      args.push("--sub-langs", "en.*,en");
    }

    // Common best settings for both audio and video
    args.push("--no-playlist"); // Download single video only unless explicitly a playlist
    args.push("--restrict-filenames"); // Safe filenames
    args.push("--no-overwrites"); // Don't overwrite existing files

    // Handle download location
    if (preferences.locationMode === "choose" && preferences.downloadLocation) {
      args.push("--paths", `output:${preferences.downloadLocation}`);
    }

    // Add URL and return early for "best" preset
    args.push(url);
    return args;
  }

  // Custom preferences processing (only if not "best" preset)
  if (preferences.custom) {
    const { custom } = preferences;

    // Apply type-specific defaults for custom mode
    if (preferences.type === "audio" && !custom.postProcessing?.extractAudio) {
      // If audio type but extract-audio not explicitly set, add it
      args.push("--extract-audio");
      if (!custom.postProcessing?.audioFormat) {
        args.push("--audio-format", "mp3");
      }
    } else if (preferences.type === "video" && !custom.videoFormat?.format) {
      // Default video format if not specified
      args.push("-f", "bestvideo+bestaudio/best");
      if (!custom.videoFormat?.mergeOutputFormat) {
        args.push("--merge-output-format", "mp4");
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
      if (g.noAbortOnError) args.push("--no-abort-on-error");
      if (g.abortOnError) args.push("--abort-on-error");
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
      if (n.socketTimeout)
        args.push("--socket-timeout", n.socketTimeout.toString());
      if (n.sourceAddress) args.push("--source-address", n.sourceAddress);
      if (n.impersonate) args.push("--impersonate", n.impersonate);
      if (n.listImpersonateTargets) args.push("--list-impersonate-targets");
      if (n.forceIpv4) args.push("--force-ipv4");
      if (n.forceIpv6) args.push("--force-ipv6");
      if (n.enableFileUrls) args.push("--enable-file-urls");
    }

    // GEO-RESTRICTION
    if (custom.geoRestriction) {
      const geo = custom.geoRestriction;
      if (geo.geoVerificationProxy)
        args.push("--geo-verification-proxy", geo.geoVerificationProxy);
      if (geo.xff) args.push("--xff", geo.xff);
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
      if (vs.ageLimit) args.push("--age-limit", vs.ageLimit.toString());
      if (vs.downloadArchive)
        args.push("--download-archive", vs.downloadArchive);
      if (vs.noDownloadArchive) args.push("--no-download-archive");
      if (vs.maxDownloads)
        args.push("--max-downloads", vs.maxDownloads.toString());
      if (vs.breakOnExisting) args.push("--break-on-existing");
      if (vs.noBreakOnExisting) args.push("--no-break-on-existing");
      if (vs.breakPerInput) args.push("--break-per-input");
      if (vs.noBreakPerInput) args.push("--no-break-per-input");
      if (vs.skipPlaylistAfterErrors)
        args.push(
          "--skip-playlist-after-errors",
          vs.skipPlaylistAfterErrors.toString()
        );
    }

    // DOWNLOAD OPTIONS
    if (custom.download) {
      const d = custom.download;
      if (d.concurrentFragments)
        args.push("--concurrent-fragments", d.concurrentFragments.toString());
      if (d.limitRate) args.push("--limit-rate", d.limitRate);
      if (d.throttledRate) args.push("--throttled-rate", d.throttledRate);
      if (d.retries) {
        args.push(
          "--retries",
          d.retries === "infinite" ? "infinite" : d.retries.toString()
        );
      }
      if (d.fileAccessRetries) {
        args.push(
          "--file-access-retries",
          d.fileAccessRetries === "infinite"
            ? "infinite"
            : d.fileAccessRetries.toString()
        );
      }
      if (d.fragmentRetries) {
        args.push(
          "--fragment-retries",
          d.fragmentRetries === "infinite"
            ? "infinite"
            : d.fragmentRetries.toString()
        );
      }
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
      const f = custom.filesystem;
      if (f.batchFile) args.push("--batch-file", f.batchFile);
      if (f.noBatchFile) args.push("--no-batch-file");
      if (f.paths) {
        if (f.paths.home) args.push("--paths", `home:${f.paths.home}`);
        if (f.paths.temp) args.push("--paths", `temp:${f.paths.temp}`);
        if (f.paths.output) args.push("--paths", `output:${f.paths.output}`);
        if (f.paths.subtitles)
          args.push("--paths", `subtitles:${f.paths.subtitles}`);
        if (f.paths.thumbnails)
          args.push("--paths", `thumbnails:${f.paths.thumbnails}`);
        if (f.paths.description)
          args.push("--paths", `description:${f.paths.description}`);
        if (f.paths.infojson)
          args.push("--paths", `infojson:${f.paths.infojson}`);
        if (f.paths.annotations)
          args.push("--paths", `annotations:${f.paths.annotations}`);
        if (f.paths.playlist)
          args.push("--paths", `playlist:${f.paths.playlist}`);
        if (f.paths.pl_description)
          args.push("--paths", `pl_description:${f.paths.pl_description}`);
        if (f.paths.pl_infojson)
          args.push("--paths", `pl_infojson:${f.paths.pl_infojson}`);
      }
      if (f.outputNaPlaceholder)
        args.push("--output-na-placeholder", f.outputNaPlaceholder);
      if (f.restrictFilenames) args.push("--restrict-filenames");
      if (f.noRestrictFilenames) args.push("--no-restrict-filenames");
      if (f.windowsFilenames) args.push("--windows-filenames");
      if (f.noWindowsFilenames) args.push("--no-windows-filenames");
      if (f.trimFilenames)
        args.push("--trim-filenames", f.trimFilenames.toString());
      if (f.noOverwrites) args.push("--no-overwrites");
      if (f.forceOverwrites) args.push("--force-overwrites");
      if (f.noForceOverwrites) args.push("--no-force-overwrites");
      if (f.continue) args.push("--continue");
      if (f.noContinue) args.push("--no-continue");
      if (f.part) args.push("--part");
      if (f.noPart) args.push("--no-part");
      if (f.mtime) args.push("--mtime");
      if (f.noMtime) args.push("--no-mtime");
      if (f.writeDescription) args.push("--write-description");
      if (f.noWriteDescription) args.push("--no-write-description");
      if (f.writeInfoJson) args.push("--write-info-json");
      if (f.noWriteInfoJson) args.push("--no-write-info-json");
      if (f.writePlaylistMetafiles) args.push("--write-playlist-metafiles");
      if (f.noWritePlaylistMetafiles)
        args.push("--no-write-playlist-metafiles");
      if (f.cleanInfoJson) args.push("--clean-info-json");
      if (f.noCleanInfoJson) args.push("--no-clean-info-json");
      if (f.writeComments) args.push("--write-comments");
      if (f.noWriteComments) args.push("--no-write-comments");
      if (f.loadInfoJson) args.push("--load-info-json", f.loadInfoJson);
      if (f.cookies) args.push("--cookies", f.cookies);
      if (f.noCookies) args.push("--no-cookies");
      if (f.cookiesFromBrowser)
        args.push("--cookies-from-browser", f.cookiesFromBrowser);
      if (f.noCookiesFromBrowser) args.push("--no-cookies-from-browser");
      if (f.cacheDir) args.push("--cache-dir", f.cacheDir);
      if (f.noCacheDir) args.push("--no-cache-dir");
      if (f.rmCacheDir) args.push("--rm-cache-dir");
    }

    // THUMBNAIL OPTIONS
    if (custom.thumbnail) {
      const t = custom.thumbnail;
      if (t.writeThumbnail) args.push("--write-thumbnail");
      if (t.noWriteThumbnail) args.push("--no-write-thumbnail");
      if (t.writeAllThumbnails) args.push("--write-all-thumbnails");
      if (t.listThumbnails) args.push("--list-thumbnails");
    }

    // INTERNET SHORTCUT OPTIONS
    if (custom.internetShortcut) {
      const is = custom.internetShortcut;
      if (is.writeLink) args.push("--write-link");
      if (is.writeUrlLink) args.push("--write-url-link");
      if (is.writeWeblocLink) args.push("--write-webloc-link");
      if (is.writeDesktopLink) args.push("--write-desktop-link");
    }

    // VERBOSITY OPTIONS
    if (custom.verbosity) {
      const v = custom.verbosity;
      if (v.quiet) args.push("--quiet");
      if (v.noQuiet) args.push("--no-quiet");
      if (v.noWarnings) args.push("--no-warnings");
      if (v.simulate) args.push("--simulate");
      if (v.noSimulate) args.push("--no-simulate");
      if (v.ignoreNoFormatsError) args.push("--ignore-no-formats-error");
      if (v.noIgnoreNoFormatsError) args.push("--no-ignore-no-formats-error");
      if (v.skipDownload) args.push("--skip-download");
      if (v.print) args.push("--print", v.print);
      if (v.printToFile) args.push("--print-to-file", v.printToFile);
      if (v.dumpJson) args.push("--dump-json");
      if (v.dumpSingleJson) args.push("--dump-single-json");
      if (v.forceWriteArchive) args.push("--force-write-archive");
      if (v.newline) args.push("--newline");
      if (v.noProgress) args.push("--no-progress");
      if (v.progress) args.push("--progress");
      if (v.consoleTitle) args.push("--console-title");
      if (v.progressTemplate)
        args.push("--progress-template", v.progressTemplate);
      if (v.progressDelta)
        args.push("--progress-delta", v.progressDelta.toString());
      if (v.verbose) args.push("--verbose");
      if (v.dumpPages) args.push("--dump-pages");
      if (v.writePages) args.push("--write-pages");
      if (v.printTraffic) args.push("--print-traffic");
    }

    // WORKAROUNDS
    if (custom.workarounds) {
      const w = custom.workarounds;
      if (w.encoding) args.push("--encoding", w.encoding);
      if (w.legacyServerConnect) args.push("--legacy-server-connect");
      if (w.noCheckCertificates) args.push("--no-check-certificates");
      if (w.preferInsecure) args.push("--prefer-insecure");
      if (w.addHeaders) {
        Object.entries(w.addHeaders).forEach(([key, value]) => {
          args.push("--add-headers", `${key}:${value}`);
        });
      }
      if (w.bidiWorkaround) args.push("--bidi-workaround");
      if (w.sleepRequests)
        args.push("--sleep-requests", w.sleepRequests.toString());
      if (w.sleepInterval)
        args.push("--sleep-interval", w.sleepInterval.toString());
      if (w.maxSleepInterval)
        args.push("--max-sleep-interval", w.maxSleepInterval.toString());
      if (w.sleepSubtitles)
        args.push("--sleep-subtitles", w.sleepSubtitles.toString());
    }

    // VIDEO FORMAT OPTIONS
    if (custom.videoFormat) {
      const vf = custom.videoFormat;
      if (vf.format) args.push("--format", vf.format);
      if (vf.formatSort) args.push("--format-sort", vf.formatSort);
      if (vf.formatSortForce) args.push("--format-sort-force");
      if (vf.noFormatSortForce) args.push("--no-format-sort-force");
      if (vf.videoMultistreams) args.push("--video-multistreams");
      if (vf.noVideoMultistreams) args.push("--no-video-multistreams");
      if (vf.audioMultistreams) args.push("--audio-multistreams");
      if (vf.noAudioMultistreams) args.push("--no-audio-multistreams");
      if (vf.preferFreeFormats) args.push("--prefer-free-formats");
      if (vf.noPreferFreeFormats) args.push("--no-prefer-free-formats");
      if (vf.checkFormats) args.push("--check-formats");
      if (vf.checkAllFormats) args.push("--check-all-formats");
      if (vf.noCheckFormats) args.push("--no-check-formats");
      if (vf.listFormats) args.push("--list-formats");
      if (vf.mergeOutputFormat)
        args.push("--merge-output-format", vf.mergeOutputFormat);
    }

    // SUBTITLE OPTIONS
    if (custom.subtitle) {
      const s = custom.subtitle;
      if (s.writeSubs) args.push("--write-subs");
      if (s.noWriteSubs) args.push("--no-write-subs");
      if (s.writeAutoSubs) args.push("--write-auto-subs");
      if (s.noWriteAutoSubs) args.push("--no-write-auto-subs");
      if (s.listSubs) args.push("--list-subs");
      if (s.subFormat) args.push("--sub-format", s.subFormat);
      if (s.subLangs) args.push("--sub-langs", s.subLangs);
    }

    // AUTHENTICATION OPTIONS
    if (custom.authentication) {
      const a = custom.authentication;
      if (a.username) args.push("--username", a.username);
      if (a.password) args.push("--password", a.password);
      if (a.twofactor) args.push("--twofactor", a.twofactor);
      if (a.netrc) args.push("--netrc");
      if (a.netrcLocation) args.push("--netrc-location", a.netrcLocation);
      if (a.netrcCmd) args.push("--netrc-cmd", a.netrcCmd);
      if (a.videoPassword) args.push("--video-password", a.videoPassword);
      if (a.apMso) args.push("--ap-mso", a.apMso);
      if (a.apUsername) args.push("--ap-username", a.apUsername);
      if (a.apPassword) args.push("--ap-password", a.apPassword);
      if (a.apListMso) args.push("--ap-list-mso");
      if (a.clientCertificate)
        args.push("--client-certificate", a.clientCertificate);
      if (a.clientCertificateKey)
        args.push("--client-certificate-key", a.clientCertificateKey);
      if (a.clientCertificatePassword)
        args.push("--client-certificate-password", a.clientCertificatePassword);
    }

    // POST-PROCESSING OPTIONS
    if (custom.postProcessing) {
      const pp = custom.postProcessing;
      if (pp.extractAudio) args.push("--extract-audio");
      if (pp.audioFormat) args.push("--audio-format", pp.audioFormat);
      if (pp.audioQuality) args.push("--audio-quality", pp.audioQuality);
      if (pp.remuxVideo) args.push("--remux-video", pp.remuxVideo);
      if (pp.recodeVideo) args.push("--recode-video", pp.recodeVideo);
      if (pp.postprocessorArgs)
        args.push("--postprocessor-args", pp.postprocessorArgs);
      if (pp.keepVideo) args.push("--keep-video");
      if (pp.noKeepVideo) args.push("--no-keep-video");
      if (pp.postOverwrites) args.push("--post-overwrites");
      if (pp.noPostOverwrites) args.push("--no-post-overwrites");
      if (pp.embedSubs) args.push("--embed-subs");
      if (pp.noEmbedSubs) args.push("--no-embed-subs");
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
      if (pp.convertSubs) args.push("--convert-subs", pp.convertSubs);
      if (pp.convertThumbnails)
        args.push("--convert-thumbnails", pp.convertThumbnails);
      if (pp.splitChapters) args.push("--split-chapters");
      if (pp.noSplitChapters) args.push("--no-split-chapters");
      if (pp.removeChapters) args.push("--remove-chapters", pp.removeChapters);
      if (pp.noRemoveChapters) args.push("--no-remove-chapters");
      if (pp.forceKeyframesAtCuts) args.push("--force-keyframes-at-cuts");
      if (pp.noForceKeyframesAtCuts) args.push("--no-force-keyframes-at-cuts");
      if (pp.usePostprocessor)
        args.push("--use-postprocessor", pp.usePostprocessor);
    }

    // SPONSORBLOCK OPTIONS
    if (custom.sponsorblock) {
      const sb = custom.sponsorblock;
      if (sb.sponsorblockMark && sb.sponsorblockMark.length > 0) {
        args.push("--sponsorblock-mark", sb.sponsorblockMark.join(","));
      }
      if (sb.sponsorblockRemove && sb.sponsorblockRemove.length > 0) {
        args.push("--sponsorblock-remove", sb.sponsorblockRemove.join(","));
      }
      if (sb.sponsorblockChapterTitle)
        args.push("--sponsorblock-chapter-title", sb.sponsorblockChapterTitle);
      if (sb.noSponsorblock) args.push("--no-sponsorblock");
      if (sb.sponsorblockApi)
        args.push("--sponsorblock-api", sb.sponsorblockApi);
    }

    // EXTRACTOR OPTIONS
    if (custom.extractor) {
      const e = custom.extractor;
      if (e.extractorRetries) {
        args.push(
          "--extractor-retries",
          e.extractorRetries === "infinite"
            ? "infinite"
            : e.extractorRetries.toString()
        );
      }
      if (e.allowDynamicMpd) args.push("--allow-dynamic-mpd");
      if (e.ignoreDynamicMpd) args.push("--ignore-dynamic-mpd");
      if (e.hlsSplitDiscontinuity) args.push("--hls-split-discontinuity");
      if (e.noHlsSplitDiscontinuity) args.push("--no-hls-split-discontinuity");
      if (e.extractorArgs) {
        Object.entries(e.extractorArgs).forEach(([key, value]) => {
          args.push("--extractor-args", `${key}:${value}`);
        });
      }
    }

    // RAW OPTIONS
    if (custom.rawArgs) {
      args.push(...custom.rawArgs);
    }

    if (custom.rawOptions) {
      Object.entries(custom.rawOptions).forEach(([key, value]) => {
        if (typeof value === "boolean" && value) {
          args.push(`--${key}`);
        } else if (typeof value === "string" || typeof value === "number") {
          args.push(`--${key}`, value.toString());
        }
      });
    }
  }

  // Handle output location based on user preferences (for custom mode)
  if (preferences.locationMode === "choose" && preferences.downloadLocation) {
    args.push("--paths", `output:${preferences.downloadLocation}`);
  }

  // Add URL at the end
  args.push(url);

  return args;
};
