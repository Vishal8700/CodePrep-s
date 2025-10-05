import { YOUTUBE_CONFIG } from '../config/environment';

/**
 * YouTube utility functions
 */

/**
 * Get YouTube thumbnail URL from video ID
 * @param {string} videoId - YouTube video ID
 * @param {string} quality - Thumbnail quality (default, mqdefault, hqdefault, sddefault, maxresdefault)
 * @returns {string} Thumbnail URL
 */
export const getYouTubeThumbnail = (videoId, quality = YOUTUBE_CONFIG.DEFAULT_THUMBNAIL_QUALITY) => {
  if (!videoId) return '';
  return `${YOUTUBE_CONFIG.THUMBNAIL_BASE_URL}/${videoId}/${quality}.jpg`;
};

/**
 * Get multiple thumbnail qualities for a video
 * @param {string} videoId - YouTube video ID
 * @returns {object} Object with different quality thumbnails
 */
export const getYouTubeThumbnails = (videoId) => {
  if (!videoId) return {};
  
  return {
    default: `${YOUTUBE_CONFIG.THUMBNAIL_BASE_URL}/${videoId}/default.jpg`, // 120x90
    medium: `${YOUTUBE_CONFIG.THUMBNAIL_BASE_URL}/${videoId}/mqdefault.jpg`, // 320x180
    high: `${YOUTUBE_CONFIG.THUMBNAIL_BASE_URL}/${videoId}/hqdefault.jpg`, // 480x360
    standard: `${YOUTUBE_CONFIG.THUMBNAIL_BASE_URL}/${videoId}/sddefault.jpg`, // 640x480
    maxres: `${YOUTUBE_CONFIG.THUMBNAIL_BASE_URL}/${videoId}/maxresdefault.jpg` // 1280x720
  };
};

/**
 * Load YouTube API script dynamically
 * @returns {Promise} Promise that resolves when API is loaded
 */
export const loadYouTubeAPI = () => {
  return new Promise((resolve, reject) => {
    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
      return;
    }

    // Check if script is already loading
    if (window.onYouTubeIframeAPIReady) {
      // API is loading, wait for it
      const originalCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        originalCallback();
        resolve(window.YT);
      };
      return;
    }

    // Set up callback for when API loads
    window.onYouTubeIframeAPIReady = () => {
      resolve(window.YT);
    };

    // Load the script if not already present
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = `${YOUTUBE_CONFIG.API_BASE_URL}/iframe_api`;
      script.onerror = () => reject(new Error('Failed to load YouTube API'));
      document.head.appendChild(script);
    }
  });
};

/**
 * Create YouTube player with error handling
 * @param {HTMLElement} element - Container element
 * @param {object} options - Player options
 * @returns {Promise<YT.Player>} YouTube player instance
 */
export const createYouTubePlayer = async (element, options) => {
  try {
    const YT = await loadYouTubeAPI();
    
    return new Promise((resolve, reject) => {
      const player = new YT.Player(element, {
        ...options,
        events: {
          ...options.events,
          onReady: (event) => {
            resolve(player);
            if (options.events && options.events.onReady) {
              options.events.onReady(event);
            }
          },
          onError: (event) => {
            reject(new Error(`YouTube player error: ${event.data}`));
            if (options.events && options.events.onError) {
              options.events.onError(event);
            }
          }
        }
      });
    });
  } catch (error) {
    throw new Error(`Failed to create YouTube player: ${error.message}`);
  }
};