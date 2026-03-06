// src/utils/videoCompressionHelper.js
// Provides utilities for handling video compression and format selection

/**
 * Recommendations for video compression based on network speed
 * These serve as guidelines - actual implementation depends on hosting availability
 */
export const VIDEO_COMPRESSION_PROFILES = {
  // 2G/3G networks - minimal bandwidth
  mobile: {
    format: "mp4",
    bitrate: "350k",
    resolution: "430x240",
    duration: 6, // seconds
    estimatedSize: "260KB",
    description: "Ultra-compressed version for slow networks",
  },
  // LTE/decent 4G
  medium: {
    format: "webm",
    bitrate: "1200k",
    resolution: "960x540",
    estimatedSize: "900KB",
    description: "Medium quality with good compression (WebM recommended)",
  },
  // 4G+ networks
  high: {
    format: "mp4",
    bitrate: "3500k",
    resolution: "1920x1080",
    estimatedSize: "2.3MB",
    description: "Original high-quality version",
  },
};

/**
 * Get recommended video settings based on network type
 */
export function getVideoCompressionProfile(effectiveType) {
  switch (effectiveType) {
    case "2g":
    case "3g":
      return VIDEO_COMPRESSION_PROFILES.mobile;
    case "4g":
      return VIDEO_COMPRESSION_PROFILES.high;
    default:
      return VIDEO_COMPRESSION_PROFILES.medium;
  }
}

/**
 * Build video source path with fallback chain
 * Assumes video files are named: video.mp4, video.webm, video-low.mp4, etc.
 */
export function buildVideoSourceChain(baseName, effectiveType, isSlowNetwork) {
  const sources = [];

  if (effectiveType === "2g" || effectiveType === "3g" || isSlowNetwork) {
    // For slow networks, try lightweight formats first
    sources.push({
      src: `${baseName}-low.webm`,
      type: "video/webm",
    });
    sources.push({
      src: `${baseName}-low.mp4`,
      type: "video/mp4",
    });
  } else {
    // For fast networks, try high-quality formats first
    sources.push({
      src: `${baseName}.webm`,
      type: "video/webm",
    });
    sources.push({
      src: `${baseName}.mp4`,
      type: "video/mp4",
    });
  }

  return sources;
}

/**
 * FFmpeg command reference for local video compression
 * Run these commands to create compressed versions for deployment
 */
export const FFMPEG_COMPRESSION_COMMANDS = {
  // Create mobile version (350kbps bitrate)
  "mobile-mp4": `
    ffmpeg -i input.mp4 -b:v 350k -b:a 64k -vf "scale=430:240" output-low.mp4
  `,

  // Create medium WebM version (1200kbps bitrate, VP9 codec)
  "medium-webm": `
    ffmpeg -i input.mp4 -b:v 1200k -b:a 128k -c:v libvpx-vp9 -c:a libopus \\
    -vf "scale=960:540" -crf 40 output.webm
  `,

  // Create low WebM version (500kbps bitrate)
  "mobile-webm": `
    ffmpeg -i input.mp4 -b:v 500k -b:a 64k -c:v libvpx-vp9 -c:a libopus \\
    -vf "scale=430:240" -crf 45 output-low.webm
  `,

  // Create thumbnail/poster image
  "poster-image": `
    ffmpeg -i input.mp4 -ss 00:00:01 -vframes 1 -vf "scale=1920:1080" poster.jpg
  `,
};

/**
 * Check if browser supports a video format
 */
export function canPlayVideoType(format) {
  const video = document.createElement("video");

  switch (format.toLowerCase()) {
    case "webm":
      return !!video.canPlayType('video/webm;codecs="vp9"');
    case "mp4":
      return !!video.canPlayType('video/mp4;codecs="avc1.42E01E"');
    case "ogg":
      return !!video.canPlayType('video/ogg;codecs="theora"');
    default:
      return false;
  }
}

/**
 * Estimate download time for a video file
 */
export function estimateDownloadTime(fileSizeKB, downlinkMbps) {
  // downlink is in Mbps, return time in seconds
  if (!downlinkMbps || downlinkMbps <= 0) return null;

  const fileSizeMb = fileSizeKB / 1024;
  const downloadTimeSeconds = (fileSizeMb * 8) / downlinkMbps; // bits / bitrate

  return downloadTimeSeconds;
}

/**
 * Generate HTML5 video element with adaptive source chain
 */
export function generateVideoElement(baseName, effectiveType, options = {}) {
  const {
    autoplay = true,
    controls = true,
    muted = true,
    loop = false,
    poster = null,
    className = "",
  } = options;

  const sources = buildVideoSourceChain(baseName, effectiveType, false);

  const videoAttrs = [
    autoplay && "autoplay",
    controls && "controls",
    muted && "muted",
    loop && "loop",
    poster && `poster="${poster}"`,
  ]
    .filter(Boolean)
    .join(" ");

  const sourceTags = sources
    .map(({ src, type }) => `<source src="${src}" type="${type}">`)
    .join("\n    ");

  return `
    <video ${videoAttrs} class="${className}">
      ${sourceTags}
      Your browser doesn't support HTML5 video.
    </video>
  `.trim();
}
