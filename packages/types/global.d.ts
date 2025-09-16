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

interface BaseRootPreferences {
  general?: {
    help?: boolean;
    version?: boolean;
    update?: boolean;
    noUpdate?: boolean;
    updateTo?: string;
    ignoreErrors?: boolean;
    noAbortOnError?: boolean;
    abortOnError?: boolean;
    dumpUserAgent?: boolean;
    listExtractors?: boolean;
    extractorDescriptions?: boolean;
    useExtractors?: string;
    defaultSearch?: "auto" | "auto_warning" | "error" | "fixup_error" | string;
    ignoreConfig?: boolean;
    noConfigLocations?: boolean;
    configLocations?: string;
    pluginDirs?: "default" | string;
    noPluginDirs?: boolean;
    flatPlaylist?: boolean;
    noFlatPlaylist?: boolean;
    liveFromStart?: boolean;
    noLiveFromStart?: boolean;
    waitForVideo?: string;
    noWaitForVideo?: boolean;
    markWatched?: boolean;
    noMarkWatched?: boolean;
    color?:
      | "always"
      | "auto"
      | "never"
      | "no_color"
      | "auto-tty"
      | "no_color-tty"
      | string;
    compatOptions?: string;
    alias?: string;
    presetAlias?: "mp3" | "aac" | "mp4" | "mkv" | "sleep";
  };

  network?: {
    proxy?: string;
    socketTimeout?: number;
    sourceAddress?: string;
    impersonate?:
      | "chrome"
      | "chrome-110"
      | "chrome:windows-10"
      | "safari"
      | "edge"
      | string;
    listImpersonateTargets?: boolean;
    forceIpv4?: boolean;
    forceIpv6?: boolean;
    enableFileUrls?: boolean;
  };

  geoRestriction?: {
    geoVerificationProxy?: string;
    xff?: "default" | "never" | string;
  };

  videoSelection?: {
    playlistItems?: string;
    minFilesize?: string;
    maxFilesize?: string;
    date?: string;
    datebefore?: string;
    dateafter?: string;
    matchFilters?: string;
    noMatchFilters?: boolean;
    breakMatchFilters?: string;
    noBreakMatchFilters?: boolean;
    noPlaylist?: boolean;
    yesPlaylist?: boolean;
    ageLimit?: number;
    downloadArchive?: string;
    noDownloadArchive?: boolean;
    maxDownloads?: number;
    breakOnExisting?: boolean;
    noBreakOnExisting?: boolean;
    breakPerInput?: boolean;
    noBreakPerInput?: boolean;
    skipPlaylistAfterErrors?: number;
  };

  download?: {
    concurrentFragments?: number;
    limitRate?: string;
    throttledRate?: string;
    retries?: number | "infinite";
    fileAccessRetries?: number | "infinite";
    fragmentRetries?: number | "infinite";
    retrySleep?: string;
    skipUnavailableFragments?: boolean;
    abortOnUnavailableFragments?: boolean;
    keepFragments?: boolean;
    noKeepFragments?: boolean;
    bufferSize?: string;
    resizeBuffer?: boolean;
    noResizeBuffer?: boolean;
    httpChunkSize?: string;
    playlistRandom?: boolean;
    lazyPlaylist?: boolean;
    noLazyPlaylist?: boolean;
    xattrSetFilesize?: boolean;
    hlsUseMpegts?: boolean;
    noHlsUseMpegts?: boolean;
    downloadSections?: string;
    downloader?:
      | "native"
      | "aria2c"
      | "avconv"
      | "axel"
      | "curl"
      | "ffmpeg"
      | "httpie"
      | "wget"
      | string;
    downloaderArgs?: string;
  };

  filesystem?: {
    batchFile?: string;
    noBatchFile?: boolean;
    paths?: {
      home?: string;
      temp?: string;
      output?: string;
      subtitles?: string;
      thumbnails?: string;
      description?: string;
      infojson?: string;
      annotations?: string;
      playlist?: string;
      pl_description?: string;
      pl_infojson?: string;
    };
    output?: string;
    outputNaPlaceholder?: string;
    restrictFilenames?: boolean;
    noRestrictFilenames?: boolean;
    windowsFilenames?: boolean;
    noWindowsFilenames?: boolean;
    trimFilenames?: number;
    noOverwrites?: boolean;
    forceOverwrites?: boolean;
    noForceOverwrites?: boolean;
    continue?: boolean;
    noContinue?: boolean;
    part?: boolean;
    noPart?: boolean;
    mtime?: boolean;
    noMtime?: boolean;
    writeDescription?: boolean;
    noWriteDescription?: boolean;
    writeInfoJson?: boolean;
    noWriteInfoJson?: boolean;
    writePlaylistMetafiles?: boolean;
    noWritePlaylistMetafiles?: boolean;
    cleanInfoJson?: boolean;
    noCleanInfoJson?: boolean;
    writeComments?: boolean;
    noWriteComments?: boolean;
    loadInfoJson?: string;
    cookies?: string;
    noCookies?: boolean;
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
      | string;
    noCookiesFromBrowser?: boolean;
    cacheDir?: string;
    noCacheDir?: boolean;
    rmCacheDir?: boolean;
  };

  thumbnail?: {
    writeThumbnail?: boolean;
    noWriteThumbnail?: boolean;
    writeAllThumbnails?: boolean;
    listThumbnails?: boolean;
  };

  internetShortcut?: {
    writeLink?: boolean;
    writeUrlLink?: boolean;
    writeWeblocLink?: boolean;
    writeDesktopLink?: boolean;
  };

  verbosity?: {
    quiet?: boolean;
    noQuiet?: boolean;
    noWarnings?: boolean;
    simulate?: boolean;
    noSimulate?: boolean;
    ignoreNoFormatsError?: boolean;
    noIgnoreNoFormatsError?: boolean;
    skipDownload?: boolean;
    print?: string;
    printToFile?: string;
    dumpJson?: boolean;
    dumpSingleJson?: boolean;
    forceWriteArchive?: boolean;
    newline?: boolean;
    noProgress?: boolean;
    progress?: boolean;
    consoleTitle?: boolean;
    progressTemplate?: string;
    progressDelta?: number;
    verbose?: boolean;
    dumpPages?: boolean;
    writePages?: boolean;
    printTraffic?: boolean;
  };

  workarounds?: {
    encoding?: string;
    legacyServerConnect?: boolean;
    noCheckCertificates?: boolean;
    preferInsecure?: boolean;
    addHeaders?: Record<string, string>;
    bidiWorkaround?: boolean;
    sleepRequests?: number;
    sleepInterval?: number;
    maxSleepInterval?: number;
    sleepSubtitles?: number;
  };

  authentication?: {
    username?: string;
    password?: string;
    twofactor?: string;
    netrc?: boolean;
    netrcLocation?: string;
    netrcCmd?: string;
    videoPassword?: string;
    apMso?: string;
    apUsername?: string;
    apPassword?: string;
    apListMso?: boolean;
    clientCertificate?: string;
    clientCertificateKey?: string;
    clientCertificatePassword?: string;
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
    >;
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
    >;
    sponsorblockChapterTitle?: string;
    noSponsorblock?: boolean;
    sponsorblockApi?: string;
  };

  extractor?: {
    extractorRetries?: number | "infinite";
    allowDynamicMpd?: boolean;
    ignoreDynamicMpd?: boolean;
    hlsSplitDiscontinuity?: boolean;
    noHlsSplitDiscontinuity?: boolean;
    extractorArgs?: Record<string, string>;
  };

  rawArgs?: string[];
  rawOptions?: Record<string, string | boolean | number>;
}

interface BaseAudioPreferences extends BaseRootPreferences {
  postProcessing?: {
    extractAudio?: boolean;
    audioFormat?:
      | "best"
      | "aac"
      | "alac"
      | "flac"
      | "m4a"
      | "mp3"
      | "opus"
      | "vorbis"
      | "wav";
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
      | "320K"
      | "256K"
      | "224K"
      | "192K"
      | "160K"
      | "128K"
      | "96K"
      | "64K";
    postprocessorArgs?: string;
    keepVideo?: boolean;
    noKeepVideo?: boolean;
    postOverwrites?: boolean;
    noPostOverwrites?: boolean;
    embedThumbnail?: boolean;
    noEmbedThumbnail?: boolean;
    embedMetadata?: boolean;
    noEmbedMetadata?: boolean;
    embedChapters?: boolean;
    noEmbedChapters?: boolean;
    embedInfoJson?: boolean;
    noEmbedInfoJson?: boolean;
    parseMetadata?: string;
    replaceInMetadata?: string;
    xattrs?: boolean;
    concatPlaylist?: "never" | "always" | "multi_video";
    fixup?: "never" | "warn" | "detect_or_warn" | "force";
    ffmpegLocation?: string;
    exec?: string;
    noExec?: boolean;
    splitChapters?: boolean;
    noSplitChapters?: boolean;
    removeChapters?: string;
    noRemoveChapters?: boolean;
    forceKeyframesAtCuts?: boolean;
    noForceKeyframesAtCuts?: boolean;
    usePostprocessor?: string;
  };
}

interface BaseVideoPreferences extends BaseRootPreferences {
  videoFormat?: {
    format?: string;
    formatSort?: string;
    formatSortForce?: boolean;
    noFormatSortForce?: boolean;
    videoMultistreams?: boolean;
    noVideoMultistreams?: boolean;
    audioMultistreams?: boolean;
    noAudioMultistreams?: boolean;
    preferFreeFormats?: boolean;
    noPreferFreeFormats?: boolean;
    checkFormats?: boolean;
    checkAllFormats?: boolean;
    noCheckFormats?: boolean;
    listFormats?: boolean;
    mergeOutputFormat?: "mkv" | "mov" | "mp4" | "webm";
  };

  subtitle?: {
    writeSubs?: boolean;
    noWriteSubs?: boolean;
    writeAutoSubs?: boolean;
    noWriteAutoSubs?: boolean;
    listSubs?: boolean;
    subFormat?: "best" | "srt" | "ass" | "vtt";
    subLangs?: string;
  };

  postProcessing?: {
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
      | string;
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
      | string;
    postprocessorArgs?: string;
    keepVideo?: boolean;
    noKeepVideo?: boolean;
    postOverwrites?: boolean;
    noPostOverwrites?: boolean;
    embedSubs?: boolean;
    noEmbedSubs?: boolean;
    embedThumbnail?: boolean;
    noEmbedThumbnail?: boolean;
    embedMetadata?: boolean;
    noEmbedMetadata?: boolean;
    embedChapters?: boolean;
    noEmbedChapters?: boolean;
    embedInfoJson?: boolean;
    noEmbedInfoJson?: boolean;
    parseMetadata?: string;
    replaceInMetadata?: string;
    xattrs?: boolean;
    concatPlaylist?: "never" | "always" | "multi_video";
    fixup?: "never" | "warn" | "detect_or_warn" | "force";
    ffmpegLocation?: string;
    exec?: string;
    noExec?: boolean;
    convertSubs?: "ass" | "lrc" | "srt" | "vtt" | "none";
    convertThumbnails?: "jpg" | "png" | "webp" | "none" | string;
    splitChapters?: boolean;
    noSplitChapters?: boolean;
    removeChapters?: string;
    noRemoveChapters?: boolean;
    forceKeyframesAtCuts?: boolean;
    noForceKeyframesAtCuts?: boolean;
    usePostprocessor?: string;
  };
}

type AudioPreferences = {
  preset: "best" | "custom";
  custom?: BaseAudioPreferences;
};

type VideoPreferences = {
  preset: "best" | "custom";
  custom?: BaseVideoPreferences;
};

type Preferences = {
  type: "audio" | "video";
  locationMode: "ask" | "choose";
  downloadLocation: string;
  audio: AudioPreferences;
  video: VideoPreferences;
};
