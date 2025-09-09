interface Window {
  electronAPI: {
    onUpdateAvailable: (callback: () => void) => void;
    onUpdateDownloaded: (callback: () => void) => void;
    onUpdateProgress: (callback: (percent: number) => void) => void;
    onUpdateError: (callback: (error: string) => void) => void;
    installUpdate: () => void;
    selectDownloadLocation: () => Promise<string | null>;
    showSaveDialog: (
      defaultName: string,
      fileExtension: string
    ) => Promise<string | null>;
    download: (url: string, filePath?: string) => void;
    cancelDownload: () => void;
    onProgress: (callback: (percent: number) => void) => void;
    onStatus: (callback: (msg: DownloadStatus) => void) => void;
    onComplete: (callback: (msg?: string) => void) => void;
    onError: (callback: (err: string) => void) => void;
    onCancelled: (callback: (msg?: string) => void) => void;
    removeListeners: () => void;
    getPreferences: () => Promise<Preferences>;
    setPreferences: (preferences: Preferences) => Promise<boolean>;
  };
}

type DownloadStatus = {
  status: string;
  progress?: number;
  eta?: string;
  speed?: string;
  size?: string;
};

type Preferences = {
  type: "audio" | "video";
  locationMode: "ask" | "choose";
  downloadLocation: string;
  preset: "best" | "custom";

  custom?: {
    general?: {
      help?: boolean; // -h, --help
      version?: boolean; // --version
      update?: boolean; // -U, --update
      noUpdate?: boolean; // --no-update
      updateTo?: string; // --update-to [CHANNEL]@[TAG] - channels: stable, nightly, master
      ignoreErrors?: boolean; // -i, --ignore-errors
      noAbortOnError?: boolean; // --no-abort-on-error (default)
      abortOnError?: boolean; // --abort-on-error
      dumpUserAgent?: boolean; // --dump-user-agent
      listExtractors?: boolean; // --list-extractors
      extractorDescriptions?: boolean; // --extractor-descriptions
      useExtractors?: string; // --use-extractors NAMES (comma-separated)
      defaultSearch?:
        | "auto"
        | "auto_warning"
        | "error"
        | "fixup_error"
        | string; // --default-search PREFIX
      ignoreConfig?: boolean; // --ignore-config
      noConfigLocations?: boolean; // --no-config-locations
      configLocations?: string; // --config-locations PATH
      pluginDirs?: "default" | string; // --plugin-dirs PATH
      noPluginDirs?: boolean; // --no-plugin-dirs
      flatPlaylist?: boolean; // --flat-playlist
      noFlatPlaylist?: boolean; // --no-flat-playlist
      liveFromStart?: boolean; // --live-from-start
      noLiveFromStart?: boolean; // --no-live-from-start
      waitForVideo?: string; // --wait-for-video MIN[-MAX]
      noWaitForVideo?: boolean; // --no-wait-for-video
      markWatched?: boolean; // --mark-watched
      noMarkWatched?: boolean; // --no-mark-watched
      color?:
        | "always"
        | "auto"
        | "never"
        | "no_color"
        | "auto-tty"
        | "no_color-tty"
        | string; // --color [STREAM:]POLICY
      compatOptions?: string; // --compat-options OPTS
      alias?: string; // --alias ALIASES OPTIONS
      presetAlias?: "mp3" | "aac" | "mp4" | "mkv" | "sleep"; // -t, --preset-alias PRESET
    };

    network?: {
      proxy?: string; // --proxy URL (empty string "" for direct connection)
      socketTimeout?: number; // --socket-timeout SECONDS
      sourceAddress?: string; // --source-address IP
      impersonate?:
        | "chrome"
        | "chrome-110"
        | "chrome:windows-10"
        | "safari"
        | "edge"
        | string; // --impersonate CLIENT[:OS]
      listImpersonateTargets?: boolean; // --list-impersonate-targets
      forceIpv4?: boolean; // -4, --force-ipv4
      forceIpv6?: boolean; // -6, --force-ipv6
      enableFileUrls?: boolean; // --enable-file-urls
    };

    geoRestriction?: {
      geoVerificationProxy?: string; // --geo-verification-proxy URL
      xff?: "default" | "never" | string; // --xff VALUE (IP block in CIDR notation or two-letter ISO 3166-2 country code)
    };

    videoSelection?: {
      playlistItems?: string; // -I, --playlist-items ITEM_SPEC (e.g., "1:3,7,-5::2")
      minFilesize?: string; // --min-filesize SIZE (e.g., "50k", "44.6M")
      maxFilesize?: string; // --max-filesize SIZE (e.g., "50k", "44.6M")
      date?: string; // --date DATE (YYYYMMDD or [now|today|yesterday][-N[day|week|month|year]])
      datebefore?: string; // --datebefore DATE
      dateafter?: string; // --dateafter DATE
      matchFilters?: string; // --match-filters FILTER
      noMatchFilters?: boolean; // --no-match-filters
      breakMatchFilters?: string; // --break-match-filters FILTER
      noBreakMatchFilters?: boolean; // --no-break-match-filters
      noPlaylist?: boolean; // --no-playlist
      yesPlaylist?: boolean; // --yes-playlist
      ageLimit?: number; // --age-limit YEARS
      downloadArchive?: string; // --download-archive FILE
      noDownloadArchive?: boolean; // --no-download-archive
      maxDownloads?: number; // --max-downloads NUMBER
      breakOnExisting?: boolean; // --break-on-existing
      noBreakOnExisting?: boolean; // --no-break-on-existing
      breakPerInput?: boolean; // --break-per-input
      noBreakPerInput?: boolean; // --no-break-per-input
      skipPlaylistAfterErrors?: number; // --skip-playlist-after-errors N
    };

    download?: {
      concurrentFragments?: number; // -N, --concurrent-fragments N
      limitRate?: string; // -r, --limit-rate RATE (e.g., "50K", "4.2M")
      throttledRate?: string; // --throttled-rate RATE (e.g., "100K")
      retries?: number | "infinite"; // -R, --retries RETRIES
      fileAccessRetries?: number | "infinite"; // --file-access-retries RETRIES
      fragmentRetries?: number | "infinite"; // --fragment-retries RETRIES
      retrySleep?: string; // --retry-sleep [TYPE:]EXPR (TYPE: http, fragment, file_access, extractor)
      skipUnavailableFragments?: boolean; // --skip-unavailable-fragments
      abortOnUnavailableFragments?: boolean; // --abort-on-unavailable-fragments
      keepFragments?: boolean; // --keep-fragments
      noKeepFragments?: boolean; // --no-keep-fragments
      bufferSize?: string; // --buffer-size SIZE (e.g., "1024", "16K")
      resizeBuffer?: boolean; // --resize-buffer
      noResizeBuffer?: boolean; // --no-resize-buffer
      httpChunkSize?: string; // --http-chunk-size SIZE (e.g., "10485760", "10M")
      playlistRandom?: boolean; // --playlist-random
      lazyPlaylist?: boolean; // --lazy-playlist
      noLazyPlaylist?: boolean; // --no-lazy-playlist
      xattrSetFilesize?: boolean; // --xattr-set-filesize
      hlsUseMpegts?: boolean; // --hls-use-mpegts
      noHlsUseMpegts?: boolean; // --no-hls-use-mpegts
      downloadSections?: string; // --download-sections REGEX
      downloader?:
        | "native"
        | "aria2c"
        | "avconv"
        | "axel"
        | "curl"
        | "ffmpeg"
        | "httpie"
        | "wget"
        | string; // --downloader [PROTO:]NAME
      downloaderArgs?: string; // --downloader-args NAME:ARGS
    };

    filesystem?: {
      batchFile?: string; // -a, --batch-file FILE ("-" for stdin)
      noBatchFile?: boolean; // --no-batch-file
      paths?: {
        home?: string; // -P home:PATH
        temp?: string; // -P temp:PATH
        output?: string; // -P output:PATH
        subtitles?: string;
        thumbnails?: string;
        description?: string;
        infojson?: string;
        annotations?: string;
        playlist?: string;
        pl_description?: string;
        pl_infojson?: string;
      }; // -P, --paths [TYPES:]PATH
      output?: string; // -o, --output [TYPES:]TEMPLATE
      outputNaPlaceholder?: string; // --output-na-placeholder TEXT
      restrictFilenames?: boolean; // --restrict-filenames
      noRestrictFilenames?: boolean; // --no-restrict-filenames
      windowsFilenames?: boolean; // --windows-filenames
      noWindowsFilenames?: boolean; // --no-windows-filenames
      trimFilenames?: number; // --trim-filenames LENGTH
      noOverwrites?: boolean; // -w, --no-overwrites
      forceOverwrites?: boolean; // --force-overwrites
      noForceOverwrites?: boolean; // --no-force-overwrites
      continue?: boolean; // -c, --continue
      noContinue?: boolean; // --no-continue
      part?: boolean; // --part
      noPart?: boolean; // --no-part
      mtime?: boolean; // --mtime
      noMtime?: boolean; // --no-mtime
      writeDescription?: boolean; // --write-description
      noWriteDescription?: boolean; // --no-write-description
      writeInfoJson?: boolean; // --write-info-json
      noWriteInfoJson?: boolean; // --no-write-info-json
      writePlaylistMetafiles?: boolean; // --write-playlist-metafiles
      noWritePlaylistMetafiles?: boolean; // --no-write-playlist-metafiles
      cleanInfoJson?: boolean; // --clean-info-json
      noCleanInfoJson?: boolean; // --no-clean-info-json
      writeComments?: boolean; // --write-comments
      noWriteComments?: boolean; // --no-write-comments
      loadInfoJson?: string; // --load-info-json FILE
      cookies?: string; // --cookies FILE
      noCookies?: boolean; // --no-cookies
      cookiesFromBrowser?:
        | "brave"
        | "chrome"
        | "chromium"
        | "edge"
        | "firefox"
        | "opera"
        | "safari"
        | "vivaldi"
        | "whale"
        | string; // --cookies-from-browser BROWSER[+KEYRING][:PROFILE][::CONTAINER]
      noCookiesFromBrowser?: boolean; // --no-cookies-from-browser
      cacheDir?: string; // --cache-dir DIR
      noCacheDir?: boolean; // --no-cache-dir
      rmCacheDir?: boolean; // --rm-cache-dir
    };

    thumbnail?: {
      writeThumbnail?: boolean; // --write-thumbnail
      noWriteThumbnail?: boolean; // --no-write-thumbnail
      writeAllThumbnails?: boolean; // --write-all-thumbnails
      listThumbnails?: boolean; // --list-thumbnails
    };

    internetShortcut?: {
      writeLink?: boolean; // --write-link
      writeUrlLink?: boolean; // --write-url-link
      writeWeblocLink?: boolean; // --write-webloc-link
      writeDesktopLink?: boolean; // --write-desktop-link
    };

    verbosity?: {
      quiet?: boolean; // -q, --quiet
      noQuiet?: boolean; // --no-quiet
      noWarnings?: boolean; // --no-warnings
      simulate?: boolean; // -s, --simulate
      noSimulate?: boolean; // --no-simulate
      ignoreNoFormatsError?: boolean; // --ignore-no-formats-error
      noIgnoreNoFormatsError?: boolean; // --no-ignore-no-formats-error
      skipDownload?: boolean; // --skip-download
      print?: string; // -O, --print [WHEN:]TEMPLATE
      printToFile?: string; // --print-to-file [WHEN:]TEMPLATE FILE
      dumpJson?: boolean; // -j, --dump-json
      dumpSingleJson?: boolean; // -J, --dump-single-json
      forceWriteArchive?: boolean; // --force-write-archive
      newline?: boolean; // --newline
      noProgress?: boolean; // --no-progress
      progress?: boolean; // --progress
      consoleTitle?: boolean; // --console-title
      progressTemplate?: string; // --progress-template [TYPES:]TEMPLATE
      progressDelta?: number; // --progress-delta SECONDS
      verbose?: boolean; // -v, --verbose
      dumpPages?: boolean; // --dump-pages
      writePages?: boolean; // --write-pages
      printTraffic?: boolean; // --print-traffic
    };

    workarounds?: {
      encoding?: string; // --encoding ENCODING
      legacyServerConnect?: boolean; // --legacy-server-connect
      noCheckCertificates?: boolean; // --no-check-certificates
      preferInsecure?: boolean; // --prefer-insecure
      addHeaders?: Record<string, string>; // --add-headers FIELD:VALUE
      bidiWorkaround?: boolean; // --bidi-workaround
      sleepRequests?: number; // --sleep-requests SECONDS
      sleepInterval?: number; // --sleep-interval SECONDS
      maxSleepInterval?: number; // --max-sleep-interval SECONDS
      sleepSubtitles?: number; // --sleep-subtitles SECONDS
    };

    videoFormat?: {
      format?: string; // -f, --format FORMAT
      formatSort?: string; // -S, --format-sort SORTORDER
      formatSortForce?: boolean; // --format-sort-force
      noFormatSortForce?: boolean; // --no-format-sort-force
      videoMultistreams?: boolean; // --video-multistreams
      noVideoMultistreams?: boolean; // --no-video-multistreams
      audioMultistreams?: boolean; // --audio-multistreams
      noAudioMultistreams?: boolean; // --no-audio-multistreams
      preferFreeFormats?: boolean; // --prefer-free-formats
      noPreferFreeFormats?: boolean; // --no-prefer-free-formats
      checkFormats?: boolean; // --check-formats
      checkAllFormats?: boolean; // --check-all-formats
      noCheckFormats?: boolean; // --no-check-formats
      listFormats?: boolean; // -F, --list-formats
      mergeOutputFormat?: "mkv" | "mov" | "mp4" | "webm"; // --merge-output-format FORMAT
    };

    subtitle?: {
      writeSubs?: boolean; // --write-subs
      noWriteSubs?: boolean; // --no-write-subs
      writeAutoSubs?: boolean; // --write-auto-subs
      noWriteAutoSubs?: boolean; // --no-write-auto-subs
      listSubs?: boolean; // --list-subs
      subFormat?: "best" | "srt" | "ass" | "vtt"; // --sub-format FORMAT
      subLangs?: string; // --sub-langs LANGS (comma-separated, supports regex)
    };

    authentication?: {
      username?: string; // -u, --username USERNAME
      password?: string; // -p, --password PASSWORD
      twofactor?: string; // -2, --twofactor TWOFACTOR
      netrc?: boolean; // -n, --netrc
      netrcLocation?: string; // --netrc-location PATH
      netrcCmd?: string; // --netrc-cmd NETRC_CMD
      videoPassword?: string; // --video-password PASSWORD
      apMso?: string; // --ap-mso MSO
      apUsername?: string; // --ap-username USERNAME
      apPassword?: string; // --ap-password PASSWORD
      apListMso?: boolean; // --ap-list-mso
      clientCertificate?: string; // --client-certificate CERTFILE
      clientCertificateKey?: string; // --client-certificate-key KEYFILE
      clientCertificatePassword?: string; // --client-certificate-password PASSWORD
    };

    postProcessing?: {
      extractAudio?: boolean; // -x, --extract-audio
      audioFormat?:
        | "best"
        | "aac"
        | "alac"
        | "flac"
        | "m4a"
        | "mp3"
        | "opus"
        | "vorbis"
        | "wav"; // --audio-format FORMAT
      audioQuality?:
        | "best"
        | "0"
        | "1"
        | "2"
        | "3"
        | "4"
        | "5"
        | "6"
        | "7"
        | "8"
        | "9"
        | "10"
        | string; // --audio-quality QUALITY (0-10 for VBR, specific bitrate like "128K")
      remuxVideo?:
        | "avi"
        | "flv"
        | "gif"
        | "mkv"
        | "mov"
        | "mp4"
        | "webm"
        | "aac"
        | "aiff"
        | "alac"
        | "flac"
        | "m4a"
        | "mka"
        | "mp3"
        | "ogg"
        | "opus"
        | "vorbis"
        | "wav"
        | string; // --remux-video FORMAT
      recodeVideo?:
        | "avi"
        | "flv"
        | "gif"
        | "mkv"
        | "mov"
        | "mp4"
        | "webm"
        | "aac"
        | "aiff"
        | "alac"
        | "flac"
        | "m4a"
        | "mka"
        | "mp3"
        | "ogg"
        | "opus"
        | "vorbis"
        | "wav"
        | string; // --recode-video FORMAT
      postprocessorArgs?: string; // --postprocessor-args NAME:ARGS
      keepVideo?: boolean; // -k, --keep-video
      noKeepVideo?: boolean; // --no-keep-video
      postOverwrites?: boolean; // --post-overwrites
      noPostOverwrites?: boolean; // --no-post-overwrites
      embedSubs?: boolean; // --embed-subs
      noEmbedSubs?: boolean; // --no-embed-subs
      embedThumbnail?: boolean; // --embed-thumbnail
      noEmbedThumbnail?: boolean; // --no-embed-thumbnail
      embedMetadata?: boolean; // --embed-metadata
      noEmbedMetadata?: boolean; // --no-embed-metadata
      embedChapters?: boolean; // --embed-chapters
      noEmbedChapters?: boolean; // --no-embed-chapters
      embedInfoJson?: boolean; // --embed-info-json
      noEmbedInfoJson?: boolean; // --no-embed-info-json
      parseMetadata?: string; // --parse-metadata [WHEN:]FROM:TO
      replaceInMetadata?: string; // --replace-in-metadata [WHEN:]FIELDS REGEX REPLACE
      xattrs?: boolean; // --xattrs
      concatPlaylist?: "never" | "always" | "multi_video"; // --concat-playlist POLICY
      fixup?: "never" | "warn" | "detect_or_warn" | "force"; // --fixup POLICY
      ffmpegLocation?: string; // --ffmpeg-location PATH
      exec?: string; // --exec [WHEN:]CMD
      noExec?: boolean; // --no-exec
      convertSubs?: "ass" | "lrc" | "srt" | "vtt" | "none"; // --convert-subs FORMAT
      convertThumbnails?: "jpg" | "png" | "webp" | "none" | string; // --convert-thumbnails FORMAT
      splitChapters?: boolean; // --split-chapters
      noSplitChapters?: boolean; // --no-split-chapters
      removeChapters?: string; // --remove-chapters REGEX
      noRemoveChapters?: boolean; // --no-remove-chapters
      forceKeyframesAtCuts?: boolean; // --force-keyframes-at-cuts
      noForceKeyframesAtCuts?: boolean; // --no-force-keyframes-at-cuts
      usePostprocessor?: string; // --use-postprocessor NAME[:ARGS]
    };

    sponsorblock?: {
      sponsorblockMark?: Array<
        | "sponsor"
        | "intro"
        | "outro"
        | "selfpromo"
        | "preview"
        | "filler"
        | "interaction"
        | "music_offtopic"
        | "poi_highlight"
        | "chapter"
        | "all"
        | "default"
      >; // --sponsorblock-mark CATS
      sponsorblockRemove?: Array<
        | "sponsor"
        | "intro"
        | "outro"
        | "selfpromo"
        | "preview"
        | "filler"
        | "interaction"
        | "music_offtopic"
        | "poi_highlight"
        | "chapter"
        | "all"
        | "default"
      >; // --sponsorblock-remove CATS
      sponsorblockChapterTitle?: string; // --sponsorblock-chapter-title TEMPLATE
      noSponsorblock?: boolean; // --no-sponsorblock
      sponsorblockApi?: string; // --sponsorblock-api URL
    };

    extractor?: {
      extractorRetries?: number | "infinite"; // --extractor-retries RETRIES
      allowDynamicMpd?: boolean; // --allow-dynamic-mpd
      ignoreDynamicMpd?: boolean; // --ignore-dynamic-mpd
      hlsSplitDiscontinuity?: boolean; // --hls-split-discontinuity
      noHlsSplitDiscontinuity?: boolean; // --no-hls-split-discontinuity
      extractorArgs?: Record<string, string>; // --extractor-args IE_KEY:ARGS
    };

    rawArgs?: string[]; // raw arguments to append to command
    rawOptions?: Record<string, string | boolean | number>; // key-value pairs for any options
  };
};
