/**
 * Environment configuration utility
 * Centralizes all environment variable handling and validation
 */

// API Configuration with fallbacks
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://api.sheetbest.com/sheets/670c12c6-ca89-4abd-8745-015d91064925',
  TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000,
  ENABLE_CACHE_BUSTING: process.env.REACT_APP_ENABLE_API_CACHE_BUSTING !== 'false', // Default to true
};

// YouTube Configuration
export const YOUTUBE_CONFIG = {
  API_BASE_URL: process.env.REACT_APP_YOUTUBE_API_BASE_URL || 'https://www.youtube.com',
  THUMBNAIL_BASE_URL: process.env.REACT_APP_YOUTUBE_THUMBNAIL_BASE_URL || 'https://img.youtube.com/vi',
  DEFAULT_THUMBNAIL_QUALITY: process.env.REACT_APP_DEFAULT_THUMBNAIL_QUALITY || 'hqdefault',
};

// Environment validation
const validateEnvironment = () => {
  const requiredVars = [
    'REACT_APP_API_BASE_URL',
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    console.error('Please check your .env file and ensure all required variables are set.');
    
    // In development, show a more helpful error
    if (process.env.NODE_ENV === 'development') {
      console.error('Copy .env.example to .env and fill in the required values.');
      console.error('After updating .env, restart your development server with: npm start');
    }
    
    // Show current environment for debugging
    console.log('Current environment variables:');
    Object.keys(process.env)
      .filter(key => key.startsWith('REACT_APP_'))
      .forEach(key => {
        console.log(`  ${key}: ${process.env[key] || 'undefined'}`);
      });
  }
  
  return missingVars.length === 0;
};

// Validate environment on module load
validateEnvironment();

// Export current environment
export const ENVIRONMENT = {
  NODE_ENV: process.env.NODE_ENV,
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
};