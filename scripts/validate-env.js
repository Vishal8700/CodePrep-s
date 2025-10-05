#!/usr/bin/env node

/**
 * Environment validation script
 * Run this script to validate your environment configuration
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

console.log('🔍 Validating environment configuration...\n');

// Check if .env file exists
if (!fs.existsSync(envPath)) {
  console.error('❌ .env file not found!');
  console.log('📝 Please copy .env.example to .env and configure your variables:');
  console.log('   cp .env.example .env\n');
  process.exit(1);
}

// Load .env file
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

// Required variables
const requiredVars = [
  'REACT_APP_API_BASE_URL'
];

// Optional variables with defaults
const optionalVars = {
  'REACT_APP_API_TIMEOUT': '10000',
  'REACT_APP_YOUTUBE_API_BASE_URL': 'https://www.youtube.com',
  'REACT_APP_YOUTUBE_THUMBNAIL_BASE_URL': 'https://img.youtube.com/vi',
  'REACT_APP_DEFAULT_THUMBNAIL_QUALITY': 'hqdefault',
  'REACT_APP_ENABLE_API_CACHE_BUSTING': 'true'
};

let hasErrors = false;

// Check required variables
console.log('📋 Checking required variables:');
requiredVars.forEach(varName => {
  if (envVars[varName] && envVars[varName] !== 'your_api_base_url_here') {
    console.log(`✅ ${varName}: ${envVars[varName]}`);
  } else {
    console.log(`❌ ${varName}: Missing or not configured`);
    hasErrors = true;
  }
});

console.log('\n📋 Checking optional variables:');
Object.entries(optionalVars).forEach(([varName, defaultValue]) => {
  const value = envVars[varName] || defaultValue;
  const isDefault = !envVars[varName];
  console.log(`${isDefault ? '🔧' : '✅'} ${varName}: ${value}${isDefault ? ' (default)' : ''}`);
});

// Validate API URL format
if (envVars['REACT_APP_API_BASE_URL']) {
  const apiUrl = envVars['REACT_APP_API_BASE_URL'];
  if (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
    console.log('\n⚠️  Warning: API_BASE_URL should start with http:// or https://');
  }
}

// Validate timeout is a number
if (envVars['REACT_APP_API_TIMEOUT']) {
  const timeout = parseInt(envVars['REACT_APP_API_TIMEOUT']);
  if (isNaN(timeout) || timeout <= 0) {
    console.log('\n⚠️  Warning: API_TIMEOUT should be a positive number');
  }
}

console.log('\n' + '='.repeat(50));

if (hasErrors) {
  console.log('❌ Environment validation failed!');
  console.log('Please fix the issues above before running the application.\n');
  process.exit(1);
} else {
  console.log('✅ Environment validation passed!');
  console.log('Your application is ready to run.\n');
  console.log('Next steps:');
  console.log('  npm start    - Start development server');
  console.log('  npm run build - Build for production\n');
}